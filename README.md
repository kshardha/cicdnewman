# About

This post will demonstrate use of code pipeline to build, deploy and functionally test an API. The testing will conduct 
functional test suite using a postman collection against our api using Newman, a command line collection runner that 
can also be invoked programmatically via node js.

Why: proliferation of API's is obvious and the need to include functional testing of API's in the devops lifecycle is is a common 
customer ask. 


# 01 - api creation deployment

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


# 02 - use postman to test your api

Via the postman client

Via the CLI

newman run NewmanAPI.postman_collection.json \
--environment newman-postman-environment.postman_environment.json \
-r cli,json,html 

# 03 - automate api deployment with code pipeline

Pipeline currently setup manually via AWS console. 
TODO: cloud formation


# 04 - add automated functional testing to pipeline 

This is the lambda function responsible for executing a postman collection. 

The function:
- grabs the collection from an S3 bucket
- runs the test and places results first in lambda's /tmp folder
- TODO: normalize/cleanse output to make it easier to read with athena
- publishes cleansed results to s3 bucket

aws cloudformation package \
--region us-east-1 \
--template-file lambda-newman-tester.yaml \
--s3-bucket postman-newman \
--s3-prefix lambda-newman \
--output-template-file lambda-newman-tester-output.yaml
    
   
aws cloudformation deploy \
--region us-east-1 \
--template-file lambda-newman-tester-output.yaml \
--stack-name newman-lambda-function \
--capabilities CAPABILITY_IAM 

TODO
- [ ] more api endpoints, e.g. secured via cognito user pool, secured via sigv4, custom transformation, oauth, etc.

# 05 TODO: Using athena to query test results

CREATE EXTERNAL TABLE IF NOT EXISTS mb_athena.newman (
  `total` int,
  `pending` int,
  `failed` int 
)
ROW FORMAT SERDE 'org.openx.data.jsonserde.JsonSerDe'
WITH SERDEPROPERTIES (
  'serialization.format' = '1'
) LOCATION 's3://newmon-json-test/'
TBLPROPERTIES ('has_encrypted_data'='false');


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
