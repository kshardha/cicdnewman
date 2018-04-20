# About

This post will demonstrate use of code pipeline to build, deploy and functionally
test an API. The testing will execute a functional test suite using a postman
collection against our api using Newman, a command line postman collection runner that can
also be invoked programmatically via node js.

Why: proliferation of API's is obvious and the need to include functional testing
of API's in the devops lifecycle is is a common customer ask.

# 01 - api creation deployment

First we will deploy a simple api and demonstrate how to test using Postman. Using our command line
navigate to directory (01api) containing the source and yaml template for our simple api. From there
you will execute the following commands to deploy the api.

Execute the following command to package your api

NOTE: please specify your own region, s3 bucket and prefix in your account.

```
aws cloudformation package \
--region us-east-1 \
--template-file postman-newman-api.yaml \
--s3-bucket postman-newman \
--s3-prefix api-code \
--output-template-file postman-newman-api-output.yaml
```

Execute the following to deploy your api
```
aws cloudformation deploy \
--region us-east-1 \
--template-file postman-newman-api-output.yaml \
--stack-name postman-newman-api-stack \
--capabilities CAPABILITY_IAM
```

# 02 - use postman to test your api via the client and cli

#### via the postman client

* create a new collection in postman and name it PostmanNewmanAPI
* create an environment configuration called PostmanNewmanEnvironment 
  * add your api gateway url. Key="apigw-root" Value = <api gateway root url from console\>
  
* create your api request to function one. 
  * using your environment configuration you should define your request as a get request to 
  {{apigw-root}}/one
  * You can execute this call now and observe the response from API Gateway
    * in the "Body" pane you should have a response as follows:
        {
            "message": "Successful response from function 2 - v1.0"
        }
    * In the "Headers" pane you can see the headers returned by API Gateway.

* add the following test script under the "Tests" pane 
  * In this particular test we are looking for a 200 response, a Content-Type header 
  and a specific string to be included in the response body. 

        pm.test("Status code is 200", function () {
            pm.response.to.have.status(200);
        });
        
        var contentTypeHeaderExists = responseHeaders.hasOwnProperty("Content-Type");
        
        tests["Has Content-Type"] = contentTypeHeaderExists;
        
        pm.test("Body matches string", function () {
            pm.expect(pm.response.text()).to.include("v1.0");
        });
  
  * When you execute the get request Postman will now test the response to make sure it 
  contains the correct response code, header and body content as defined in our test script.

That was a simple test illustrating how to use postman to manually validate API response 
requirements. We will now move on to execute via cli.

#### via the cli

NOTE: please refer to the following for newman installation instructions: 
https://www.getpostman.com/docs/v6/postman/collection_runs/command_line_integration_with_newman

* cd into the "02postman" directory.
* export both your postman collection and your postman environment so you can run via cli.
* NOTE: this directory contains examples from existing runs: you can delete these or 
overwrite with yours.

  * execute the following command
  
```
newman run PostmanNewmanAPI.postman_collection.json \
--environment PostmanNewmanEnvironment.postman_environment.json \
-r cli,json,html 
```
  * you should see a new directory "newman" containing both json and html reports 
  with test results.
  * you should also see report output in the cli based on our options "-r cli,json,html"

You should now have a pretty good sense of what you can do with postman both manually via
the client and via the command line. Later on we will also execute these tests programmatically
allowing us to automate test execution via code pipeline

# 03 - automate api deployment with code pipeline

On to our next baby step before automating postman in code pipeline. Here
we will show how to execute api gateway deployments using code pipeline.

- Manual Setup
TODO: screen shots and instructions.

- Cloud Formation setup
TODO: Pipeline currently setup manually via AWS console - create via cloud formation


TODO: Apply granular permissions according to least priv.


# 04 - add automated postman collection testing to pipeline
This section demonstrates how to add lambda function to run postman collections
via code pipeline stage. This is the lambda function responsible for executing a 
postman collection. We need to deploy it first before we can add it to a stage in code pipeline

NOTE: This lambda function needs permissions to
- allow read access to S3 bucket to get postman collection and environment files
- allow write access to S3 bucket in order to store test results
- allow access to code pipeline so it can acknowledge successful execution to code pipeline

The function 
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
