/**
 * https://github.com/postmanlabs/newman
 */

let newman = require('newman'); // require newman in your project
let AWS = require('aws-sdk');
let async = require("async");
let s3 = new AWS.S3({apiVersion: '2006-03-01'});
let fs = require('fs');

/**
 * Gets postman collection from S3 bucket
 * https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/requests-using-stream-objects.html
 */
let getCollection = function(callback){

    let params = {
        Bucket: 'postmancollections',
        Key: 'NewmanAPI.postman_collection.json'
    };

    let file = fs.createWriteStream('./newman.s3.json');

    file.on('close', function(){

        console.log('done fetching collection');  //prints, file created

        callback(null, 'one'); //async call back
    });


    s3.getObject(params).createReadStream().on('error', function(err){
        console.log(err);
    }).pipe(file);

};

let runAPITest = function(callback){
    // call newman.run to pass `options` object and wait for callback
    newman.run({
        collection: require('./newman.s3.json'),
        reporters: ['cli','json','html'],
        reporter: {
            html: {export: './results/output.html'},
            json: {export: './results/output.json'}
        },
        iterationCount: 1
    }).on('start', function (err, args) { // on start of run, log to console

        console.log('running a collection...');

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
 * https://gist.github.com/homam/8646090
 */
let publishResults = function(callback){

    fs.readFile('./results/output.json', function (err, data) {
        if (err) { throw err; }

        let base64data = new Buffer(data, 'binary');

        s3.putObject({
            Bucket: 'postmancollections',
            Key: 'output.json',
            Body: base64data,
            ACL: 'public-read'
        },function (resp) {

            console.log(arguments);
            console.log('Successfully uploaded package.');

            callback(null, 'three'); //async call back
        });

    });

};

let cleanUp = function(){

};

async.series(
    [
        getCollection,
        runAPITest,
        publishResults
    ]
);