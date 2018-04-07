# About

This post will demonstrate use of code pipeline to build, deploy and functionally
test an API. The testing will conduct functional test suite using a postman
collection against our api using Newman, a command line collection runner that can
also be invoked programmatically via node js.

Why: proliferation of API's is obvious and the need to include functional testing
of API's in the devops lifecycle is is a common customer ask.

# 01 - api creation deployment

First we will deploy a simple api and demonstrate how to test using Postman

aws cloudformation package \
--region us-east-1 \
--template-file postman-newman-api-stack.yaml \
--s3-bucket postman-newman \
--s3-prefix apistack \
--output-template-file postman-newman-api-stack-output.yaml
   
aws cloudformation deploy \
--region us-east-1 \
--template-file postman-newman-api-stack-output.yaml \
--stack-name postman-newman-api-stack \
--capabilities CAPABILITY_IAM

# 02 - use postman to test your api via the client and cli

- Via the postman client
-- create an environment and update postman with your api gateway url.
-- create 3 separate tests for each endpoint.
-- export both your postman collection and your environment so you can run via cli.

- Via the CLI

newman run NewmanAPI.postman_collection.json \
--environment newman-postman-environment.postman_environment.json \
-r cli,json,html 

# 03 - automate api deployment with code pipeline

This section demonstrates how to execute api gateway deployments using code pipeline.
In the next section we will automate postman collection testing.

- Manual Setup

- Cloud Formation setup


TODO: Pipeline currently setup manually via AWS console - create via cloud formation
TODO: Apply granular permissions according to least priv.


# 04 - add automated postman collection testing to pipeline
This section demonstrates how to add lambda function to run postman collections
via code pipeline stage.


This is the lambda function responsible for executing a postman collection. We
need to deploy it first before we can add it to a stage in code pipeline

This lambda function needs permissions that
- allow read access to S3 bucket to get postman collection and environment files
- allow write access to S3 bucket in order to store test results
- allow access to code pipeline so it can acknowledge successful execution to codepipeline

The function:
- grabs the collection/environment from an S3 bucket
- runs the test and places results first in lambda's /tmp folder
- publishes cleansed results to s3 bucket
- send confirmation to code pipeline

aws cloudformation package \
--region us-east-1 \
--template-file newman-lambda-runner.yaml \
--s3-bucket postman-newman \
--s3-prefix lambda-newman \
--output-template-file newman-lambda-runner-output.yaml
    
   
aws cloudformation deploy \
--region us-east-1 \
--template-file newman-lambda-runner-output.yaml \
--stack-name newman-lambda-function \
--capabilities CAPABILITY_IAM

TODO: make sure lambda has permission to S3 bucket
TODO: make sure lambda has permission to send acks to code pipeline.
TODO: Apply granular permissions according to least priv access.
TODO: normalize/cleanse output to make it easier to read with athena
TODO more api endpoints, e.g. secured via cognito user pool, secured via sigv4, custom transformation, oauth, etc.
TODO: After API created we need way to update collection file and environment file.

# 05 - Using athena to query test results

create the athena table pointing to test results bucket - see athena.sql


# 06 TODO: Using quick sight to visualize test results.


# 07 TODO: single page app to list reports
    


# References

Newman on Github                                        : https://github.com/postmanlabs/newman

Postman CLI Integration w/ Newman                       : https://www.getpostman.com/docs/postman/collection_runs/command_line_integration_with_newman

AWS Lambda Sample for AWS CodeBuild                     : https://docs.aws.amazon.com/codebuild/latest/userguide/sample-lambda.html

Building a Pipeline for Your Serverless Application     : https://docs.aws.amazon.com/lambda/latest/dg/build-pipeline.html

Deploying Lambda-based Applications                     : https://docs.aws.amazon.com/lambda/latest/dg/deploying-lambda-apps.html

Automating Deployment of Lambda-based Applications      : https://docs.aws.amazon.com/lambda/latest/dg/automating-deployment.html

Lambda in Pipeline                                      : https://docs.aws.amazon.com/codepipeline/latest/userguide/actions-invoke-lambda-function.html
