# About

This post will demonstrate use of code pipeline to build, deploy and functionally test an API. A stage within code pipeline will execute a functional test suite created with Postman. Results are made available for analysis with Athena and Quicksight

![Postman Collection](readme_images/0_1_automated-api-testing.png)

# 01 - API deployment

First we will deploy a very simple api to test using Postman. And I do mean simple: 2 endpoints backed by lambda to test simple get methods. This should be enough to illustrate the concept and be the basis for your own tests.

* Using our command line navigate to directory (01api) containing the source code for our api and yaml template used to package and deploy our api. 
* From there you will execute the following commands to deploy the api. 
  * NOTE: please specify your own region, s3 bucket and s3 bucket prefix.

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


  <details><summary>Screenshot: Cloud Formation Creation</summary><p>

  ![Postman Collection](readme_images/1_1_cloudformation_output.png)

  </p></details><p/>

* When your stack creation is complete you will have an api to test.
* Take a look at the API Gateway and Lambda consoles to see what the cloudformation tempaltes created.


# 02 - API testing with Postman client and cli

In this section we will use the Postman client and the CLI to test our api and make sure it meets our functional requirements.

#### via the postman client

* create a new collection in postman and name it PostmanNewmanAPI

    <details><summary>Screenshot: Postman Collection</summary><p>

    ![Postman Collection](readme_images/2_1_postman.png)

    </p></details><p/>


    <details><summary>Screenshot: Postman Empty Collection</summary><p>

    ![Postman Empty Collection](readme_images/2_2_postman_empty_collection.png)

    </p></details><p/>

* create an environment configuration called PostmanNewmanEnvironment 

    <details><summary>Screenshot: Postman Environment</summary><p>

    ![Postman Environment](readme_images/2_3_environment_cog.png)

    </p></details><p/>


  * add your api gateway url. Key="apigw-root" Value = <api gateway root url from console\>


    <details><summary>Screenshot: Getting API Gateway URL</summary><p>

    ![Environment Variables](readme_images/2_4_api_gateway_url.png)

    </p></details><p/>


    <details><summary>Screenshot: Postman Environment Variables</summary><p>

    ![Environment Variables](readme_images/2_4_environment_variables.png)

    </p></details><p/>

* create your api request to function one. 
  * create a get request to function one using your environment variable, i.e. {{apigw-root}}/one
  * Make sure to select the created environment configuration (PostmanNewmanEnvironmnet) from the environment drop down - see screen shots.
  * You can execute this call now and observe the response from API Gateway
    * in the "Body" pane you should have a response similar to:
        {
            "message": "Successful response from function 2 - v1.0"
        }
    * This response is coded in your lambda function. We use it to validate specific text in response body in future tests.
    * In the "Headers" pane you can see the headers returned by API Gateway.
    
      <details><summary>Screenshot: Single Get Request</summary><p>

      ![Environment Variables](readme_images/2_5_single_endpoint_request.png)

      </p></details><p/>
  * Lets save this request as part of your collection.
    * Make sure to save the request as part of your "PostmanNewmanAPI" collection.

      <details><summary>Screenshot: Save Request</summary><p>

      ![Save Request](readme_images/2_6_save_request_to_collection.png)

      </p></details><p/>

* add the following test script under the "Tests" pane 
  * In this particular test we are looking for a 200 response, a Content-Type header and a specific string to be included in the response body. 

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

      <details><summary>Screenshot: Testing</summary><p>

      ![Testing](readme_images/2_8_tests.png)

      </p></details><p/>

  * Repeat these steps to make and save single get request to the second endpoint, i.e. {{apigw-root}}/two
  * Your Postman Collection should now be saved with 2 get requests for 2 endpoints.

      <details><summary>Screenshot: Postman Collection with 2 get requests</summary><p>

      ![Save Request](readme_images/2_7_postman_collection_saved.png)

      </p></details><p/>

You now have an api with 2 endpoints and a way to test those endpoints for specific functional requirements using Postman. We will now move on to execute via cli.

#### via the newman cli

NOTE: please refer to the following for newman installation instructions: 
https://www.getpostman.com/docs/v6/postman/collection_runs/command_line_integration_with_newman

* cd into the "02postman" directory.
* export both your postman collection and your postman environment into this directory (02postman) so you can run via cli. 
  * NOTE: select "Collection v2.1 (recommended)" when prompted

    <details><summary>Screenshot: Export Collection</summary><p>

    ![Export Collection](readme_images/2_9_export_collection.png)

    </p></details><p/>

    <details><summary>Screenshot: Export Environment</summary><p>

    ![Export Env](readme_images/2_10_export_environment.png)

    </p></details><p/>

  * You should now have 2 files in your 02postman directory: a postman collection file and a postman environment file.
  
    <details><summary>Screenshot: Postman Files</summary><p>

    ![Export Env](readme_images/2_11_postman_files.png)

    </p></details><p/>

  * execute the following command
  
```
newman run PostmanNewmanAPI.postman_collection.json \
--environment PostmanNewmanEnvironment.postman_environment.json \
-r cli,json,html 
```
  * you should see a new directory "newman" containing both json and html reports with test results. 
  * Notice that results where also shown via the cli since we asked for cli output via "-r cli,json,html"

You should now have a pretty good sense of what you can do with postman both manually via the client and via the command line. Later on we will also execute these tests programmatically allowing us to automate test execution via code pipeline

# 03 - automated api deployment with code pipeline

On to our next baby step before automating postman in code pipeline. Here
we will show how to execute api gateway deployments using code pipeline.

* go into cloud formation and delete the stack you used to create the initial API Gateway deployment.

* go into AWS Console --> Services --> Code Pipeline and click "Get Started"

* Create pipeline: pipeline name

    <details><summary>Screenshot: Create Pipeline step 1</summary><p>

    ![Export Env](readme_images/3_3_pipeline_create.png)

    </p></details><p/>

* Create pipeline: select source repo.
  * For our source repo we will point to our github repository. You will be prompted to connect to your github account and select your repo.

    <details><summary>Screenshot: Create Pipeline step 2 - select source repo</summary><p>

    ![Export Env](readme_images/3_4_pipeline_create_2.png)

    </p></details><p/>

* Create pipeline: create build project.

    <details><summary>Screenshot: Create Pipeline step 3 - build project</summary><p>

    ![Export Env](readme_images/3_5_pipeline_create_3.png)

    </p></details><p/>

* after pressing "Save build project" you will see the following scree shot where you will click on "View project details" to open the code build project details page.
    <details><summary>Screenshot: Create Pipeline step 3 - saved build project</summary><p>

    ![Export Env](readme_images/3_6_pipeline_build_saved.png)

    </p></details><p/>

* A new browser tab will open showing the code build project page. Press "Edit Project" button to edit the build project details.
* In the "Environment: How to build" section press "Update build specification" in order to edit the "Buildspec name" setting. Update "Buildspec name" to "01api/buildspec.yml" to reflect the location of our buildspec file - see screen shot below.

    <details><summary>Screenshot: Create Pipeline step 3 - edit build project</summary><p>

    ![Export Env](readme_images/3_8_pipeline_build_edit.png)

    </p></details><p/>

* Update the service role used by this code build project by adding an inline policy to allow access to your S3 bucket. Without this permission code build will not be able to store builds in S3 and the pipeline will fail.

    <details><summary>IAM Policy: Allow Code Build access to your S3 bucket</summary><p>
    
      ```
      {
          "Version": "2012-10-17",
          "Statement": [
              {
                  "Effect": "Allow",
                  "Resource": [
                      "arn:aws:s3:::<your_bucket>*"
                  ],
                  "Action": [
                      "s3:PutObject",
                      "s3:GetObject",
                      "s3:GetObjectVersion"
                  ]
              }
          ]
      }
      ```

    </p></details><p/>


* We will now set up the cloud formation deployment.

    <details><summary>Screenshot: Create Pipeline step 4 - deploy</summary><p>

    ![Export Env](readme_images/3_8_pipeline_deploy.png)

    </p></details><p/>

* Pipeline service role (TODO)

    <details><summary>Screenshot: Create Pipeline step 4 - service role</summary><p>

    ![Export Env](readme_images/3_9_pipeline_service_role.png)

    </p></details><p/>

* Confirm and create pipline

    <details><summary>Screenshot: Create Pipeline step 4 - create pipeline</summary><p>

    ![Export Env](readme_images/3_10_pipeline_save_confirm.png)

    </p></details><p/>

* At this point you should have an API that is automatically deployed anytime you commit a change to your project.
* You can now grab the new API endpoint form the AWS API Gateway console and update your postman enviornment file to this new endpoint.
  * Make sure you save your new environment file.
* You can now test your updated api via postman client and cli as we did earlier.

TODO: Apply granular permissions according to least priv.


# 04 - automated postman collection testing

This section demonstrates how to execute postman collections via code pipeline and store our test results in S3. We will deploy a lambda function responsible for executing Postman collections.

NOTE: This lambda function needs permissions to
- allow read access to S3 bucket to get postman collection and environment files
- allow write access to S3 bucket in order to store test results
- ability to call codepipeline:PutJobSuccessResult to acknowledge successful execution to code pipeline.

The function 
- grabs the postman collection and environment file from an S3 bucket
- runs the test and places results first in lambda's /tmp folder
- publishes cleansed results to s3 bucket
- send confirmation to code pipeline

* cd into 03codepipeline/lambda folder
* put your postman collection and environment json files in a bucket of your choosing. In my case I will add it to same bucket (postman-newman) I used to package my api lamabda functions. I will place these files in a postman-env-files subfolder. You will need to update our runner test function with these values.

* Update the lambda function code (newman-pipeline.js) pointing to the bucket and key of your postman collection and environment file. You are looking for this code to update with your specific bucket and key.
    
  ```
  let params = {
      Bucket: 'postman-newman',
      Key: 'postman-env-files/PostmanNewmanAPI.postman_collection.json'
  };

  let params = {
      Bucket: 'postman-newman',
      Key: 'postman-env-files/PostmanNewmanEnvironment.postman_environment.json'
  };
  ```

  TODO: replace this with environment variables and instructions to update env variables.

* Update the IAM policy that will be deployed with this function that allows access to S3 bukets (to get postman config and store test results) as well as make calls to code pipeline to inidcate sucess or failure. 
  * we will update newman-lambda-runner.yaml
  * edit the "Resource" attribute with your bucket, i.e. replace arn:aws:s3:::postman-newman* with your bucket name arn:aws:s3:::<my bucket>*
* execute the following command to build and package this lambda function
  ```
  aws cloudformation package \
  --region us-east-1 \
  --template-file newman-lambda-runner.yaml \
  --s3-bucket postman-newman \
  --s3-prefix newman-lambda-runner \
  --output-template-file newman-lambda-runner-output.yaml
  ```

* execute the following to deploy the function
  ```
  aws cloudformation deploy \
  --region us-east-1 \
  --template-file newman-lambda-runner-output.yaml \
  --stack-name newman-lambda-function \
  --capabilities CAPABILITY_IAM
  ```

* you will now add this function as a stage in code pipeline.
* Go back tou your AWS Code pipeline
  * Click "Edit" to edit your pipe line
  * Add a new stage by clicking the lower "+ Stage" button at bottom of pipeline after the "Staging" stage.
  * Name this added stage as "Testing".
  * Lets add the lambda action by pressing the "+ Action" button on this stage.
  * Take a look at screen capture to see what your screen should be displaying in addition to the attribute values for this step.

    <details><summary>Screenshot: Update Pipeline step 1 - add stage</summary><p>

    ![Export Env](readme_images/4_1_update_pipeline_stage.png)

    </p></details><p/>
 
   * Press the blue "Add action" button at the bottom to add this action to your pipeline.
   * Press "Save pipeline changes" to save your pipeline.
   * execute your pipeline now and when complete you should have test results in your S3 bucket. 


# 05 - Using athena to query test results

* create the athena table pointing to test results bucket

    <details><summary>Code: Athena SQL</summary><p>

    ```sql
      CREATE EXTERNAL TABLE `test_results`(
        `iterations_total` int ,
        `iterations_pending` int ,
        `iterations_failed` int ,
        `items_total` int ,
        `items_pending` int ,
        `items_failed` int ,
        `scripts_total` int ,
        `scripts_pending` int ,
        `scripts_failed` int ,
        `prerequests_total` int ,
        `prerequests_pending` int ,
        `prerequests_failed` int ,
        `requests_total` int ,
        `requests_pending` int ,
        `requests_failed` int ,
        `tests_total` int ,
        `tests_pending` int ,
        `tests_failed` int ,
        `assertions_total` int ,
        `assertions_pending` int ,
        `assertions_failed` int ,
        `testscripts_total` int ,
        `testscripts_pending` int ,
        `testscripts_failed` int ,
        `prerequestscripts_total` int ,
        `prerequestscripts_pending` int ,
        `prerequestscripts_failed` int ,
        `report_date` string ,
        `report_time` string )
      ROW FORMAT SERDE
        'org.openx.data.jsonserde.JsonSerDe'
      WITH SERDEPROPERTIES (
        'paths'='assertions_failed,assertions_pending,assertions_total,items_failed,items_pending,items_total,iterations_failed,iterations_pending,iterations_total,prerequestScripts_failed,prerequestScripts_pending,prerequestScripts_total,prerequests_failed,prerequests_pending,prerequests_total,report_date,report_time,requests_failed,requests_pending,requests_total,scripts_failed,scripts_pending,scripts_total,testScripts_failed,testScripts_pending,testScripts_total,tests_failed,tests_pending,tests_total')
      STORED AS INPUTFORMAT
        'org.apache.hadoop.mapred.TextInputFormat'
      OUTPUTFORMAT
        'org.apache.hadoop.hive.ql.io.HiveIgnoreKeyTextOutputFormat'
      LOCATION
        's3://postman-newman/test-results/'
    ```

* You can now query your test results. 


# 06 Using quick sight to visualize test results.


# 07 Creating single page app to list reports


# References

[Newman on Github](https://github.com/postmanlabs/newman)

[Postman CLI Integration w/ Newman](https://www.getpostman.com/docs/postman/collection_runs/command_line_integration_with_newman)

[AWS Lambda Sample for AWS CodeBuild](https://docs.aws.amazon.com/codebuild/latest/userguide/sample-lambda.html)

[Building a Pipeline for Your Serverless Application](https://docs.aws.amazon.com/lambda/latest/dg/build-pipeline.html)

[Deploying Lambda-based Applications](https://docs.aws.amazon.com/lambda/latest/dg/deploying-lambda-apps.html)

[Automating Deployment of Lambda-based Applications](https://docs.aws.amazon.com/lambda/latest/dg/automating-deployment.html)

[Lambda in Pipeline](https://docs.aws.amazon.com/codepipeline/latest/userguide/actions-invoke-lambda-function.html)

[Athena and JSON](https://aws.amazon.com/blogs/big-data/create-tables-in-amazon-athena-from-nested-json-and-mappings-using-jsonserde/)

[Quick Sight & JSON](https://docs.aws.amazon.com/quicksight/latest/user/supported-data-sources.html#json-data-sources)
