let newman = require('newman'); // require newman in your project
let AWS = require('aws-sdk');
let async = require("async");

//TODO: apiVersions?
let s3 = new AWS.S3({apiVersion: '2006-03-01'});
let cloudformation = new AWS.CloudFormation({apiVersion: '2010-05-15'});

let fs = require('fs');
let dateFormat = require('dateformat');


/**
 * Library to query json objects
 * https://github.com/dchester/jsonpath
 */
const jp = require('jsonpath');

/**
 * flatten a json structure
 */
const flatten = require('flat');

let postmanAPIRootFromCFNExport = {};

/**
 * This lambda function is called from code pipeline
 * and executes postman collections in order to
 * test api gateway endpoints.
 *
 * TODO: reduce package size
 * TODO: handle failure
 * TODO: environment variables
 * TODO: add policy to yaml to allow appropriate access to code pipeline, buckets, etc.
 */

/**
 * Main handler
 * @param event
 * @param context
 */
exports.handler = function(event, context) {

    console.log("Event from Code Pipeline --> " + JSON.stringify(event));

    let codepipeline = new AWS.CodePipeline();

    // Retrieve the Job ID from the Lambda action
    let jobId = event["CodePipeline.job"].id;

    // Notify AWS CodePipeline of a successful job
    let putJobSuccess = function(message) {
        let params = {
            jobId: jobId
        };
        codepipeline.putJobSuccessResult(params, function(err, data) {
            if(err) {
                context.fail(err);
            } else {
                context.succeed(message);
            }
        });
    };

    // Notify AWS CodePipeline of a failed job
    let putJobFailure = function(message) {
        let params = {
            jobId: jobId,
            failureDetails: {
                message: JSON.stringify(message),
                type: 'JobFailed',
                externalExecutionId: context.invokeid
            }
        };
        codepipeline.putJobFailureResult(params, function(err, data) {
            context.fail(message);
        });
    };

    /**
     * Gets postman collection from S3 bucket
     * TODO: use environment variables for bucket and key
     * https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/requests-using-stream-objects.html
     */
    let getPostmanCollection = function(callback){

        //TODO: environment variables
        let params = {
            Bucket: process.env.POSTMAN_BUCKET_ROOT,
            Key: 'postman-env-files/PostmanNewmanAPI.postman_collection.json'
        };

        console.log("fetching collection " + JSON.stringify(params));

        let file = fs.createWriteStream('/tmp/newman.s3.json');

        file.on('close', function(){

            console.log('done fetching postman collection from S3');  //prints, file created

            callback(null, 'one'); //async call back
        });


        //TODO: stop and return error
        s3.getObject(params).createReadStream().on('error', function(err){
            console.log("!!!! " + err);
        }).pipe(file);

    };

    /**
     * gets the postman environment configuration file from S3
     * TODO: use environment variables for bucket and key
     * @param callback
     */
    let getPostmanEnvironment = function(callback){

        if(fs.existsSync('/tmp/postman.s3.environment.json')) {
            console.log("/tmp/postman.s3.environment.json found - deleting it.");
            fs.unlinkSync('/tmp/postman.s3.environment.json');
        }

        //TODO: environment variables
        let params = {
            Bucket: process.env.POSTMAN_BUCKET_ROOT,
            Key: 'postman-env-files/PostmanNewmanEnvironment.postman_environment.json'
        };

        console.log("fetching environment " + JSON.stringify(params));

        let file = fs.createWriteStream('/tmp/postman.s3.environment.json');

        s3.getObject(params).createReadStream().on('error', function(err){
            console.log(err);
        }).pipe(file);

        //invoke callback on close
        file.on('close', function(){

            let obj = JSON.parse(fs.readFileSync('/tmp/postman.s3.environment.json', 'utf8'));

            console.log('done fetching postman environment file from S3 - ' + JSON.stringify(obj, null, '\t'));

            callback(null, 'done'); //async call back
        });

    };

    /**
     *
     * @param callback
     */
    let getCloudFormationExportValue = function(callback) {

        cloudformation.listExports({}, function(err, data) {

            if (err) {
                postmanAPIRootFromCFNExport = { Error: 'listStackResources call failed' };
                console.log(postmanAPIRootFromCFNExport.Error + ':\n', err);

            } else {
                data.Exports.forEach(function (output) {
                    if(output.Name.toUpperCase() === "POSTMANAPIROOT" ){
                        postmanAPIRootFromCFNExport['PostmanAPIRoot'] = output.Value;
                    }

                });
            }

            console.log('done fetching cloud formation exported api endpoint: ' + JSON.stringify(postmanAPIRootFromCFNExport) );

            callback(null, 'done'); //async call back
        });

    };

    /**
     *
     * @param callback
     */
    let updateAPIEndpointInEnvironmentFile = function(callback) {

        console.log('Updating environment file with API Endpoint');

        let obj = JSON.parse(fs.readFileSync('/tmp/postman.s3.environment.json', 'utf8'));

        obj['values'] = [
            {
                'key': 'apigw-root',
                'value': postmanAPIRootFromCFNExport.PostmanAPIRoot,
                'enabled': true,
                'type': 'text'
            }
        ];

        console.log("Updated env variables: " + JSON.stringify(obj, null, '\t'));

        let base64data = new Buffer(JSON.stringify(obj, null, '\t'), 'binary');

        //TODO: use environment variable
        s3.putObject({
            Bucket: process.env.POSTMAN_BUCKET_ROOT,
            Key: 'postman-env-files/PostmanNewmanEnvironment.postman_environment.json',
            Body: base64data
        },function (err, data) {

            if (err){
                console.log("** Error: " + err, err.stack);
            }else{
                console.log('done updating environment file with api endpoint - ' + JSON.stringify(obj, null, '\t'));
            }

            callback(null, 'done'); //async call back
        });

    };


    /**
     * Executes the postman collection tests and stores in /tmp folder
     * @param callback
     */
    let executePostmanCollection = function(callback){

        console.log('running postman collection tests using the following environment config: --> ');
        let obj = JSON.parse(fs.readFileSync('/tmp/postman.s3.environment.json', 'utf8'));
        console.log(JSON.stringify(obj, null, '\t'));

        // call newman.run to pass `options` object and wait for callback
        newman.run({
            collection: require('/tmp/newman.s3.json'),
            environment: require('/tmp/postman.s3.environment.json'),
            reporters: ['cli','json','html'], //cli output visible in cloudwatch logs
            reporter: {
                html: {export: '/tmp/results/output.html'},
                json: {export: '/tmp/results/output.json'}
            },
            iterationCount: 1
        }).on('start', function (err, args) { // on start of run, log to console

            console.log('executing collection...');

        }).on('done', function (err, summary) {

            if (err || summary.error) {

                console.error('collection run encountered an error.');

            } else {

                console.log('collection run completed.');
                callback(null, 'two'); //async call back
            }
        });


    };

    /**
     * pre process result file by flattening
     * @param callback
     */
    let preprocessPostmanResults = function(callback){

        let contents = fs.readFileSync('/tmp/results/output.json',{encoding: 'utf-8'});

        //get the stats object
        let stats = jp.value(JSON.parse(contents), '$..stats');

        //flatten
        let flatStats = flatten(stats, { delimiter: '_' });

        //add report date and time
        flatStats['report_date'] = dateFormat(new Date(), "yyyy/MM/dd");
        flatStats['report_time'] = dateFormat(new Date(), "HH:mm:ss");

        console.log(JSON.stringify(flatStats));

        let filepath = "/tmp/results/output.json";

        fs.writeFile(filepath, JSON.stringify(flatStats), function(error) {
            if (error) {
                console.error("write error:  " + error.message);
            } else {
                console.log("Successful Write to " + filepath);
                callback(null, 'preprocessPostmanResults'); //async call back
            }
        });

    };

    /**
     *
     * TODO: environment variable for test-results folder
     */
    let publishJSONResultsToS3 = function(callback){

        console.log('publishing results to S3');

        let keyDateTime = dateFormat(new Date(), "yyyymmdd_HMMss");
        let objectKey = 'test-results/'.concat(keyDateTime,'.json');

        fs.readFile('/tmp/results/output.json', function (err, data) {
            if (err) { throw err; }

            let base64data = new Buffer(data, 'binary');

            //TODO: use environment variable
            s3.putObject({
                Bucket: process.env.POSTMAN_BUCKET_ROOT,
                Key: objectKey,
                Body: base64data,
                ACL: 'public-read'
            },function (resp) {

                console.log('KKS Log')
                console.log('Successfully uploaded results to S3.');

                callback(null, 'done'); //async call back
            });

        });

    };

    /**
     * TODO: do i need call back for last function in series?
     * @param callback
     */
    let notifyCodePipeLine = function(callback){

        console.log(' >>>>> sending success callback to code pipeline');

        putJobSuccess("finished");

        callback(null, 'done'); //async call back

    };

    /**
     * cleanup needed?
     */
    let cleanUp = function(){

    };

    async.series(
        [
            //retrieve the postman collection file from S3 bucket
            getPostmanCollection,

            //retrieve the postman environment file from S3 bucket
            getPostmanEnvironment,

            //get the api root value from cloud formation export
            getCloudFormationExportValue,

            //update api endpoint in config file in S3 with value from stack export
            updateAPIEndpointInEnvironmentFile,

            //get updated environment file from S3
            getPostmanEnvironment,

            //execute the collection test run using newman API
            executePostmanCollection,

            preprocessPostmanResults,

            publishJSONResultsToS3,

            notifyCodePipeLine
        ]
    );
};
