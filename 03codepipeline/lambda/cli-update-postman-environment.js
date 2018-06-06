var AWS = require('aws-sdk');
AWS.config.update({region:'us-east-1'});

var cloudformation = new AWS.CloudFormation({apiVersion: '2010-05-15'});

let fs = require('fs');
let async = require("async");
let s3 = new AWS.S3({apiVersion: '2006-03-01'});

var postmanAPIRootFromCFNExport = {};


let getCloudFormationExportValue = function(callback) {

    cloudformation.listExports({}, function(err, data) {

        if (err) {
            postmanAPIRootFromCFNExport = { Error: 'listStackResources call failed' };
            console.log(responseData.Error + ':\n', err);

        } else {
            data.Exports.forEach(function (output) {
                if(output.Name.toUpperCase() === "POSTMANAPIROOT" ){
                    postmanAPIRootFromCFNExport['PostmanAPIRoot'] = output.Value;
                }

            });
        }

        console.log('done fetching cloud formation api endpoint: ' + JSON.stringify(postmanAPIRootFromCFNExport) );


        callback(null, 'done'); //async call back
    });

};

let getPostmanEnvironment = function(callback){

    //TODO: environment variables
    let params = {
        Bucket: 'postman-newman',
        Key: 'postman-env-files/PostmanNewmanEnvironment.postman_environment.json'
    };

    let file = fs.createWriteStream('/tmp/postman.s3.environment.json');

    s3.getObject(params).createReadStream().on('error', function(err){
        console.log(err);
    }).pipe(file);

    file.on('close', function(){

        var obj = JSON.parse(fs.readFileSync('/tmp/postman.s3.environment.json', 'utf8'));

        console.log('done fetching postman environment file from S3 - ' + JSON.stringify(obj, null, '\t'));

        callback(null, 'done'); //async call back
    });

};

let updateAPIEndpointInEnvironmentFile = function(callback) {

    var obj = JSON.parse(fs.readFileSync('/tmp/postman.s3.environment.json', 'utf8'));

    obj['values'] = [
        {
            'key': 'apigw-root',
            'value': postmanAPIRootFromCFNExport.PostmanAPIRoot,
            'enabled': true,
            'type': 'text'
        }
    ];

    let base64data = new Buffer(JSON.stringify(obj, null, '\t'), 'binary');

    //TODO: use environment variable
    s3.putObject({
        Bucket: 'postman-newman',
        Key: 'postman-env-files/PostmanNewmanEnvironment.postman_environment.json',
        Body: base64data,
        ACL: 'public-read'
    },function (err, data) {

        console.log('done updating environment file with actual api endpoint - ' + JSON.stringify(obj, null, '\t'));

        callback(null, 'done'); //async call back
    });

};


async.series(
    [
        //retrieve the postman collection file from S3 bucket
        getPostmanEnvironment,
        getCloudFormationExportValue,
        updateAPIEndpointInEnvironmentFile,
        getPostmanEnvironment
    ]
);