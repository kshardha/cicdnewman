# About

Demonstrate use of code pipeline to build, deploy and test an API. The testing will conduct functional test suite against
our api using Postman collections and the Newman cli testing tool.


# 01 - manually develop and deploy your api


API creation and deployment

aws cloudformation package \
--region us-east-1 \
--template-file api.yaml \
--s3-bucket mb-root-dev \
--s3-prefix cicdnewman \
--output-template-file api-output.yaml
    
   
aws cloudformation deploy \
--region us-east-1 \
--template-file api-output.yaml \
--stack-name cicd-stack \
--capabilities CAPABILITY_IAM 


# 02 - use postman to test your api


# 03 - automate api deployment with code pipeline


# 04 - add automated fiunctional testing to pipeline with 


# 05 - record and report results



    




# References
~/dev/aws/aws-projects/aws-cookbook-serverless/serverless-ci-cd/api-testing

https://github.com/postmanlabs/newman

https://www.getpostman.com/docs/postman/collection_runs/command_line_integration_with_newman


AWS Lambda Sample for AWS CodeBuild -                   https://docs.aws.amazon.com/codebuild/latest/userguide/sample-lambda.html

Building a Pipeline for Your Serverless Application -   https://docs.aws.amazon.com/lambda/latest/dg/build-pipeline.html

Deploying Lambda-based Applications -                   https://docs.aws.amazon.com/lambda/latest/dg/deploying-lambda-apps.html

Automating Deployment of Lambda-based Applications -    https://docs.aws.amazon.com/lambda/latest/dg/automating-deployment.html


Lambda in Pipeline -                                    
- https://docs.aws.amazon.com/codepipeline/latest/userguide/actions-invoke-lambda-function.html
- 




# TODOs

