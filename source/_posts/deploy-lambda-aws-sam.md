---
title: Build and Deploy a Serverless Lambda Function with AWS SAM
date: 2022-02-15 13:09:35
tags: [aws, Lambda, Serverless, SAM, s3, CloudFormation, nodejs]
---

# Lambda Basics - SAM + Deployments

What's SAM? Its a Serverless Application Model (SAM), and what it does at a very high level is allow you to write your code locally, build, and deploy your serverless function code and run it on AWS.

It takes the actual function code (say Javascript), and then packages and deploys the 1-N serverless functions you've written. The SAM app also bundles up all the associated infrastructure needed to be able to run on AWS.

To deploy your SAM app and function, there are some hoops that you need to jump through, and so the recipe is as follows:

1. **Initialize**: Start with a clean directory and initialize a SAM environment through the AWS CLI and using AWS Templates
2. **Write**: Write your actual Function Code in conjunction with configs established in the `template.yaml` file
3. **Build**: Build your SAM application - which is an application that houses your serverless function you want to run as well as all of the configs necessary to deploy it to AWS
4. **Package**: Package the Application following AWS rules, which creates an output template .yml file and then automatically uploads that file and the app to a S3 Bucket you've created
5. **Deploy**: Deploy your SAM Application to Cloud Formation: This grabs the that outputted .yml file from the S3 bucket and builds a "Stack" which is now contains your deployed functions and is live in AWS
6. **RUN**: Your application and functions are now deployed and available through AWS. You can invoke the function using whatever method you choose - web app, aws cli, HTTP requests, or Postman.

You can find applicable code to this project [here on my Github](https://github.com/elimchayseng/sample-aws-SAM-app).

### STEP 1: INITIALIZE

Initialize a local repository to import files (from AWS templates) needed to build the SAM Application and determine the function language/ runtime - JS/nodejs in this case:

```
elimchayseng@elimcha-ltmyf5h ethan_lambda_course % sam init --runtime nodejs14.x
Which template source would you like to use?
        1 - AWS Quick Start Templates
        2 - Custom Template Location
Choice: 1

Cloning from https://github.com/aws/aws-sam-cli-app-templates

Choose an AWS Quick Start application template
        1 - Hello World Example
        2 - Multi-step workflow
        3 - Standalone function
        4 - Scheduled task
        5 - Data processing
        6 - Serverless API
Template: 1

Based on your selections, the only Package type available is Zip.
We will proceed to selecting the Package type as Zip.

Based on your selections, the only dependency manager available is npm.
We will proceed copying the template using npm.

Project name [sam-app]:

    -----------------------
    Generating application:
    -----------------------
    Name: sam-app
    Runtime: nodejs14.x
    Architectures: x86_64
    Dependency Manager: npm
    Application Template: hello-world
    Output Directory: .

    Next steps can be found in the README file at ./sam-app/README.md


    Commands you can use next
    =========================
    [*] Create pipeline: cd sam-app && sam pipeline init --bootstrap
    [*] Test Function in the Cloud: sam sync --stack-name {stack-name} --watch

```

### STEP 2: WRITE

Write your function code using the desired language (I used JS w/ a node runtime)

The process is to create your function and edit the configs in the `template.yaml` file that include the following to build your function:

This is the basic framework of what the parameters of a serverless function for Lambda in the `template.yaml` file - my function is called ClockFunction

```
ClockFunction:
	Type: AWS:Serverless::Function
		Properties:
			CodeUri: clock/
			Handler: handler.clock
			Runtime: nodejs14.x
			Events:
				ClockApi:
				Type: Api
				Path: /clock
				Method: get

```

This corresponds to the name of my .js file `handler.js` in the /clock directory, and my function syntax begins with

```
exports.clock = async (event) => {
console.log("Clock function run!");
const message = moment().format();

const response = {
	statusCode: 200,
	body: JSON.stringify(message),
};

return response;
} ;
```

### STEP 3: BUILD

With your function code up and running, you can build your application, which draws from the .yaml (`/.aws-sam/build/template.yaml/`) file and other dependencies

Build the SAM Application

```
elimchayseng@elimcha-ltmyf5h sam-app % sam build
Building codeuri: /Users/elimchayseng/Desktop/Dev/ethan_lambda_course/sam-app/hello-world runtime: nodejs14.x metadata: {} architecture: x86_64 functions: ['HelloWorldFunction']
Building codeuri: /Users/elimchayseng/Desktop/Dev/ethan_lambda_course/sam-app/ClockFunction runtime: nodejs14.x metadata: {} architecture: x86_64 functions: ['ClockFunction']
Running NodejsNpmBuilder:NpmPack
Running NodejsNpmBuilder:CopyNpmrc
Running NodejsNpmBuilder:CopySource
Running NodejsNpmBuilder:NpmInstall
Running NodejsNpmBuilder:CleanUpNpmrc

Build Succeeded

Built Artifacts  : .aws-sam/build
Built Template   : .aws-sam/build/template.yaml

Commands you can use next
=========================
[*] Invoke Function: sam local invoke
[*] Test Function in the Cloud: sam sync --stack-name {stack-name} --watch
[*] Deploy: sam deploy --guided
```

### STEP 4: PACKAGE

First you need to have or create an S3 bucket for the package to be housed in.

```
elimchayseng@elimcha-ltmyf5h sam-app % aws s3 --region us-east-1 mb s3://lambda-course-sam-bucket-v1
make_bucket: lambda-course-sam-bucket-v1
```

Then you package the application which creates a output template file and delivers the package to the S3 Bucket

```
elimchayseng@elimcha-ltmyf5h sam-app % sam package --template-file template.yaml --output-template-file pck.yml --s3-bucket lambda-course-sam-bucket-v1
Uploading to ffcc67c4c941076384d78437332779b4  1510 / 1510  (100.00%)
Successfully packaged artifacts and wrote output template to file pck.yml.
Execute the following command to deploy the packaged template
sam deploy --template-file /Users/elimchayseng/Desktop/Dev/ethan_lambda_course/sam-app/pck.yml --stack-name <YOUR STACK NAME>
```

### STEP 5: DEPLOY

With your package in the S3 bucket and template files generated, you can now deploy your SAM application to Cloud Formation which creates a "Stack." The CLI shows you the deployment steps primarily consisting of IAM/permissions creation, function creation, and then the Gateway API creation.

<img src="https://d1.awsstatic.com/Products/product-name/diagrams/product-page-diagram_CloudFormation.ad3a4c93b4fdd3366da3da0de4fb084d89a5d761.png" alt="AWS CloudFormation Deployment Steps, Lambda, S3"> [AWS CloudFormation Deployment Steps](https://aws.amazon.com/cloudformation/)

```
elimchayseng@elimcha-ltmyf5h sam-app % sam deploy --region us-east-1 --capabilities CAPABILITY_IAM --template-file pck.yml --stack-name ethan-lambda-course

        Deploying with following values
        ===============================
        Stack name                   : ethan-lambda-course
        Region                       : us-east-1
        Confirm changeset            : False
        Disable rollback             : False
        Deployment s3 bucket         : None
        Capabilities                 : ["CAPABILITY_IAM"]
        Parameter overrides          : {}
        Signing Profiles             : {}

Initiating deployment
=====================

Waiting for changeset to be created..

CloudFormation stack changeset
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Operation                                                  LogicalResourceId                                          ResourceType                                               Replacement
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
+ Add                                                      ClockFunctionClockApiPermissionProd                        AWS::Lambda::Permission                                    N/A
+ Add                                                      ClockFunctionRole                                          AWS::IAM::Role                                             N/A
+ Add                                                      ClockFunction                                              AWS::Lambda::Function                                      N/A
+ Add                                                      HelloWorldFunctionHelloWorldPermissionProd                 AWS::Lambda::Permission                                    N/A
+ Add                                                      HelloWorldFunctionRole                                     AWS::IAM::Role                                             N/A
+ Add                                                      HelloWorldFunction                                         AWS::Lambda::Function                                      N/A
+ Add                                                      ServerlessRestApiDeployment6f1a1b8f3a                      AWS::ApiGateway::Deployment                                N/A
+ Add                                                      ServerlessRestApiProdStage                                 AWS::ApiGateway::Stage                                     N/A
+ Add                                                      ServerlessRestApi                                          AWS::ApiGateway::RestApi                                   N/A
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Changeset created successfully. arn:aws:cloudformation:us-east-1:405698139725:changeSet/samcli-deploy1644946616/34f1ebdf-d772-4832-b9c0-4551267d501d


2022-02-15 11:37:07 - Waiting for stack create/update to complete

CloudFormation events from stack operations
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
ResourceStatus                                             ResourceType                                               LogicalResourceId                                          ResourceStatusReason
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
CREATE_IN_PROGRESS                                         AWS::IAM::Role                                             ClockFunctionRole                                          -
CREATE_IN_PROGRESS                                         AWS::IAM::Role                                             HelloWorldFunctionRole                                     -
CREATE_IN_PROGRESS                                         AWS::IAM::Role                                             ClockFunctionRole                                          Resource creation Initiated
CREATE_IN_PROGRESS                                         AWS::IAM::Role                                             HelloWorldFunctionRole                                     Resource creation Initiated
CREATE_COMPLETE                                            AWS::IAM::Role                                             ClockFunctionRole                                          -
CREATE_COMPLETE                                            AWS::IAM::Role                                             HelloWorldFunctionRole                                     -
CREATE_IN_PROGRESS                                         AWS::Lambda::Function                                      ClockFunction                                              -
CREATE_IN_PROGRESS                                         AWS::Lambda::Function                                      HelloWorldFunction                                         -
CREATE_IN_PROGRESS                                         AWS::Lambda::Function                                      HelloWorldFunction                                         Resource creation Initiated
CREATE_IN_PROGRESS                                         AWS::Lambda::Function                                      ClockFunction                                              Resource creation Initiated
CREATE_COMPLETE                                            AWS::Lambda::Function                                      ClockFunction                                              -
CREATE_COMPLETE                                            AWS::Lambda::Function                                      HelloWorldFunction                                         -
CREATE_IN_PROGRESS                                         AWS::ApiGateway::RestApi                                   ServerlessRestApi                                          -
CREATE_IN_PROGRESS                                         AWS::ApiGateway::RestApi                                   ServerlessRestApi                                          Resource creation Initiated
CREATE_COMPLETE                                            AWS::ApiGateway::RestApi                                   ServerlessRestApi                                          -
CREATE_IN_PROGRESS                                         AWS::Lambda::Permission                                    ClockFunctionClockApiPermissionProd                        -
CREATE_IN_PROGRESS                                         AWS::Lambda::Permission                                    HelloWorldFunctionHelloWorldPermissionProd                 Resource creation Initiated
CREATE_IN_PROGRESS                                         AWS::Lambda::Permission                                    ClockFunctionClockApiPermissionProd                        Resource creation Initiated
CREATE_IN_PROGRESS                                         AWS::ApiGateway::Deployment                                ServerlessRestApiDeployment6f1a1b8f3a                      -
CREATE_IN_PROGRESS                                         AWS::Lambda::Permission                                    HelloWorldFunctionHelloWorldPermissionProd                 -
CREATE_COMPLETE                                            AWS::ApiGateway::Deployment                                ServerlessRestApiDeployment6f1a1b8f3a                      -
CREATE_IN_PROGRESS                                         AWS::ApiGateway::Deployment                                ServerlessRestApiDeployment6f1a1b8f3a                      Resource creation Initiated
CREATE_IN_PROGRESS                                         AWS::ApiGateway::Stage                                     ServerlessRestApiProdStage                                 -
CREATE_COMPLETE                                            AWS::ApiGateway::Stage                                     ServerlessRestApiProdStage                                 -
CREATE_IN_PROGRESS                                         AWS::ApiGateway::Stage                                     ServerlessRestApiProdStage                                 Resource creation Initiated
CREATE_COMPLETE                                            AWS::Lambda::Permission                                    ClockFunctionClockApiPermissionProd                        -
CREATE_COMPLETE                                            AWS::Lambda::Permission                                    HelloWorldFunctionHelloWorldPermissionProd                 -
CREATE_COMPLETE                                            AWS::CloudFormation::Stack                                 ethan-lambda-course                                        -
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

CloudFormation outputs from deployed stack
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Outputs
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Key                 HelloWorldFunctionIamRole
Description         Implicit IAM Role created for Hello World function
Value               arn:aws:iam::405698139725:role/ethan-lambda-course-HelloWorldFunctionRole-1309Z2AUKVOA1

Key                 HelloWorldApi
Description         API Gateway endpoint URL for Prod stage for Hello World function
Value               https://9xdsew9ji9.execute-api.us-east-1.amazonaws.com/Prod/hello/

Key                 HelloWorldFunction
Description         Hello World Lambda Function ARN
Value               arn:aws:lambda:us-east-1:405698139725:function:ethan-lambda-course-HelloWorldFunction-En4ROF3L4a5m
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Successfully created/updated stack - ethan-lambda-course in us-east-1
```

### STEP 6: RUN

Now the Serverless Function has been deployed to AWS once the stack is successfully created. The function is live, and by going to the AWS console, you can see the function (the name is a mashup of the SAM app and the function name you provided in the `template.yaml`, in this case: `ethan-lambda-course-ClockFunction-om95YvKnpdg5`. The API gateway is built that was also specified in the `template.yaml` file.

{% asset_img aws_sam_app_console.png SAM Application/Lambda Function in AWS Console %}

You can also view the code source as well which matches the code posted in Step. 2. You can know invoke the function through the API gateway using the CLI, a web application, or Postman to mock a get request. I used the Postman Method shown below:

{% asset_img sam_app_postman_200.png ClockFunction - Lambda Function Invoked from Postman %}

---

### Links and References:

[AWS SAM Documentation](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/what-is-sam.html)
[LinkedIn Learning Course](https://www.linkedin.com/learning/learning-amazon-web-services-lambda-2)
[AWS CloudFormation](https://aws.amazon.com/cloudformation/)
