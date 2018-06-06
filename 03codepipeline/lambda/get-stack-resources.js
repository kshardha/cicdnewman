var AWS = require('aws-sdk');
AWS.config.update({region:'us-east-1'});

var cloudformation = new AWS.CloudFormation({apiVersion: '2010-05-15'});

var responseData = {};

var stackName = "postman-newman-api-stack";

cloudformation.listExports({}, function(err, data) {

    if (err) {
        responseData = { Error: 'listStackResources call failed' };
        console.log(responseData.Error + ':\n', err);

     } else {
        data.Exports.forEach(function (output) {
            if(output.Name.toUpperCase() === "POSTMANAPIROOT" ){
                responseData['PostmanAPIRoot'] = output.Value;
            }

        });
        console.log(responseData);
    }

});