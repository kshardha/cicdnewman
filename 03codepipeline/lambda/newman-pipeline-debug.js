let AWS = require('aws-sdk');

/**
 *
 * @param event
 * @param context
 */
exports.handler = function(event, context) {

    console.log(JSON.stringify(event));

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

    putJobSuccess("finished");
};