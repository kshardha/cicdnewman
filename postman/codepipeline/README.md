# About

This is the lambda function responsible for executing a postman collection. 
The function:
- grabs the collection from an S3 bucket
- runs the test and places results first in lambda's /tmp folder
- publishes results to s3 bucket
- 

# Required IAM Permissions

- write to S3 bucket
- codepipeline:PutJobSuccessResult


# Package Deploy

aws cloudformation package \
--region us-east-1 \
--template-file lambda-codepipeline.yaml \
--s3-bucket mb-root-dev \
--s3-prefix cicdnewman \
--output-template-file lambda-codepipeline-output.yaml
    
   
aws cloudformation deploy \
--region us-east-1 \
--template-file lambda-codepipeline-output.yaml \
--stack-name lambda-codepipeline \
--capabilities CAPABILITY_IAM 


# TODO

- reduce deployment size
- 
