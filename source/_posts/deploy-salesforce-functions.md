---
title: Deploying Serverless Code  with Salesforce Functions
date: 2022-02-18 17:25:45
tags: [salesforce, serverless, lambda, functions, heroku, javascript]
---

Salesforce functions is Salesforce's variant of serverless compute that utilizes the Heroku stack of compute power to run synchronous and asynchronous functions. The primary benefit to SF Functions is that they are integrated with your Salesforce Org, so you can easily offload any heavy compute processes needed to manage data or perform complex operations, all within the Salesforce trust boundary. The functionality is very similar to Lambda, which I covered how to build and deploy in the [SAM Blog Post](https://www.limchayseng.com/2022/02/15/deploy-lambda-aws-sam/). This post is a companion post to the SAM one, and I will walk through the similar processes between the two methods, and then another post will follow to compare and contrast some of the differences (User Experience Wise, not technical wise) between the two serverless compute platforms: AWS vs. Heroku/Salesforce. For the purpose of this post though, we will only focus on Salesforce Functions following the guide found in the [Salesforce Documentation](https://developer.salesforce.com/docs/platform/functions/guide/index.html).

### Authentication and Login

You need to have a pretty solid understanding of how Salesforce works in order to get logged in and set up correctly. The most basic "architecture" of the platform you should know is the hierarchy of objects, app, and org.

Org is short for organization, and it refers to a specific instance of Salesforce. A company can have one or multiple orgs, and "scratch orgs" are created as a development instance of an org. Within an Org, there are several apps that are a set of objects, fields, and other functionality that supports a business process for the org. An object is the data that make up the app. To break it down further, an org contains several apps like the "sales" app and "marketing" app, which are then composed of objects such as Contacts, Locations, or Sales.

You need to make sure you have the right dependencies for the `sfdx` and `sf` CLI's. There are specific plugins for the `sf` CLI required to follow the quick start docs and actually generate and deploy your function. This caused me a lot of headaches to be able to start the basic commands.

The process to auth and set up the project isn't super straightforward because you need to be able to first: authenticate and log into your Org.

`sf login` or `sfdx login`

Once this is done, you need to enable DevHub, which allows you to create Scratch orgs (A scratch org is a source-driven and disposable deployment of Salesforce code and metadata. You'll use a scratch org to do your Salesforce Functions development and local testing) and make changes to the Org through the CLI.

{% asset_img dev_hub.png Salesforce DevHub %}

Then you also need to authenticate your CLI to the Function App, which is an additional step to authenticate.

`sf functions login`

There are probably reasons why you can't just log into your org and have the access you need, but the underlying reason isn't quite clear to me.

You'll need to log into a third environment to get all the access you will need. Using `sfdx` you'll log into/create a Devhub User using the following command:

```
elimchayseng@elimcha-ltmyf5h function_blog_post % sfdx auth:web:login —setdefaultdevhubusername —setalias eth_function_devhub
Successfully authorized [elimchayseng@functions.com](mailto:elimchayseng@functions.com) with org ID 00D8c000004fafvEAA

elimchayseng@elimcha-ltmyf5h function_blog_post % sfdx auth:list
=== authenticated orgs
ALIAS USERNAME ORG ID INSTANCE URL AUTH METHOD
─────────────────── ────────────────────────── ────────────────── ─────────────────────────────────────── ───────────
eth_function_devhub [elimchayseng@functions.com](mailto:elimchayseng@functions.com) 00D8c000004fafvEAA [https://functionscom7.my.salesforce.com](https://functionscom7.my.salesforce.com) web
```

So to recap:

1.  you need to 1. Login to your Org that has the Functions Feature enabled. This is done through the sfdx command:

`sf login` or `sfdx login`

2.  After you are logged into your org, you will need to authenticate the CLI and login to the Functions account to use the Functions Feature within your Org:

`sf functions login`

3.  After you are logged into your org and you've authenticated the Functions account/CLI, then you need to log into your Devhub (within the Org) using the following command:

`sfdx auth:web:login --setdefaultdevhubusername --setalias [your chosen alias name]`

### Start Setting Up and Creating

Now locally in your code editor or VS code, you will need to create a project which will auto-populate the applicable files needed for the next steps:

```
sf generate project -n sf_function_eth
```

Once that is set up, you'll need to create the scratch org (more details provided above). When doing any operation that requires manipulating the actual Org environment, you'll need to be using the `sfdx` CLI commands. You're also pulling from the newly created /config folder in your directory to generate the scratch org. This is where the function feature is also initiated. In this case to spin up a scratch org the command is then:

```
elimchayseng@elimcha-ltmyf5h function_blog_post % sfdx force:org:create -s -f config/project-scratch-def.json -a functions_blog_scratch_org

Successfully created scratch org: 00D1k000000I7AGEA0, username: [test-uwrpwmf2bjaa@example.com](mailto:test-uwrpwmf2bjaa@example.com)
```

You can now validate that you have you're main Org (with DevHub) and your Scratch Org enabled in your local environment:

```
elimchayseng@elimcha-ltmyf5h function_blog_post % sfdx force:org:list
=== Orgs
ALIAS USERNAME ORG ID CONNECTED STATUS
─── ─────────────────── ────────────────────────── ────────────────── ────────────────
(D) eth_function_devhub [elimchayseng@functions.com](mailto:elimchayseng@functions.com) 00D8c000004fafvEAA Connected

ALIAS USERNAME ORG ID EXPIRATION DATE
─── ────────────────────────── ───────────────────────────── ────────────────── ───────────────
(U) functions_blog_scratch_org [test-uwrpwmf2bjaa@example.com](mailto:test-uwrpwmf2bjaa@example.com) 00D1k000000I7AGEA0 2022-02-23
```

After you've created a scratch org, now you need to create a compute environment. A compute environment is where you will actually be running your function and is similar to spinning up a dyno instance in Heroku. This is the final layer you need to build and access to run your function code. You use the `sf` CLI command here as you are not altering any Org level data, but rather generating/creating within the scratch org.

```
elimchayseng@elimcha-ltmyf5h function_blog_post % sf env create compute -o functions_blog_scratch_org -a function_blog_compute_env

Creating compute environment for org ID 00D1k000000I7AGEA0... done
New compute environment created with ID functio-00d1k000000i7agea0-914
Connecting environments... done
Your compute environment with local alias function_blog_compute_env is ready.
```

With the compute environment ready, you can now generate your function. Again, `sf` is the CLI command here for generation.

```
elimchayseng@elimcha-ltmyf5h function_blog_post % sf generate function -n blogfunction -l javascript

Created javascript function blogfunction in /Users/elimchayseng/Desktop/Dev/sf_functions_eth/function_blog_post/functions/blogfunction.
```

Before creating Scratch Orgs for development, please ensure that:

1.  Enable Functions in your DevHub org
2.  Add Functions to the "features" list in your scratch org definition JSON file, e.g. `"features": ["Functions"]`

This creates a new directory sharing the name of your function (`blogfunction` in my case) with your function "infrastructure." From here, you can edit the `index.js` file to begin writing your actual serverless function in Javascript.

### Deploying

With your function written, you can now deploy the function code and permissions necessary to run your code in the compute enviornment connected to your Scratch Org.

#### Deploy permissions to edit Org Data (if needed)

Depending on your functions purpose, you may need to read or write to the Org you're connected to. In that case, you will need to allow the function to manipulate that data, and that's done by creating a permission set file in the "force app" directory - which covers the settings within your org. At this path `force-app/main/default/permissionsets`, you create the `Functions.permissionset-meta.xml` file

```
<?xml version="1.0" encoding="UTF-8"?>

<PermissionSet xmlns="[http://soap.sforce.com/2006/04/metadata](http://soap.sforce.com/2006/04/metadata)">
<hasActivationRequired>true</hasActivationRequired>
<label>Functions</label>
<objectPermissions>
<allowCreate>true</allowCreate>
<allowDelete>false</allowDelete>
<allowEdit>true</allowEdit>
<allowRead>true</allowRead>
<modifyAllRecords>false</modifyAllRecords>
<object>Account</object>
<viewAllRecords>false</viewAllRecords>
</objectPermissions>
</PermissionSet>
```

You then push this new file to your scratch org to give permissions to the function app to write/create/edit your org data using the `sfdx` command since you are pushing an org level change.

```
elimchayseng@elimcha-ltmyf5h function_blog_post % sfdx force:source:push -f -u functions_blog_scratch_org
*** Deploying with SOAP ***
Job ID | 0Af1k00001GNoGsCAL
SOURCE PROGRESS | ████████████████████████████████████████ | 1/1 Components
=== Pushed Source
STATE FULL NAME TYPE PROJECT PATH
───── ───────── ───────────── ──────────────────────────────────────────────────────────────────────
Add Functions PermissionSet force-app/main/default/permissionsets/Functions.permissionset-meta.xml
```

#### Deploy your project (containing the function) to the Compute Env.

Now that correct permission is given to the function, you can deploy your function to the compute env associated with that org. Technically, You deploy projects to your compute environment rather than individual Functions. For this guide we've created a DX project with a single Function, so we're only pushing one function.

You need to git commit your changes to the project directory to be able to push to the compute environment. Then you can use the `sf` cli to push the project containing the function to the compute environment.

```
elimchayseng@elimcha-ltmyf5h function_blog_post % git init
elimchayseng@elimcha-ltmyf5h function_blog_post % git add .
elimchayseng@elimcha-ltmyf5h function_blog_post % git commit -m "Initial project commit with blogfunction"
elimchayseng@elimcha-ltmyf5h function_blog_post % sf deploy functions -o functions_blog_scratch_org
remote: Verifying deploy... done.
remote: Building source:
[....]
To [https://git.heroku.com/functio-00d1k000000i7agea0-914.git](https://git.heroku.com/functio-00d1k000000i7agea0-914.git)

-   [new branch] master → master

Reference for function_blog_post-blogfunction created
Pushing changes to functions... done
```

With the above, you can actually see that you just push the commit files to a heroku.com git repository, similar to deploying to a regular Heroku app. The "heroku app name" in this case is your compute environment name. Your code is now deployed.

For Salesforce functions, you can now invoke your code through Apex invoking the function through the Apex Class using the following command:

```
echo "FunctionApex.test();" | sfdx force:apex:execute -f /dev/stdin
```

The results can be logged from the Javascript function and also viewed through the system debugger window in your Salesforce Org. You’ve now successfully built and deployed a function using Salesforce Functions and can perform tasks that interact directly within the Salesforce Trust Boundary of your Org.
