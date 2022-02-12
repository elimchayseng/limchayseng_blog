---
title: Making a Hexo Blog
date: 2022-02-10 22:10:39
tags: [hexo, blog, nodejs, PHP, heroku]
---

# So I need to make a blog... 

I knew I wanted to start a blog - I was inspired after reading [The Long Game](https://www.goodreads.com/en/book/show/57511240-the-long-game) to work on a creative outlet. I've also started a few different web development projects as a function of learning new and cool things at my product management job at Salesforce. I spent a lot of time looking at different node.js and ejs frameworks to make a very vanilla and configurable blog. I spun up a few samples, but none of them had the feel I wanted. I looked at [hexo](https://hexo.io/) and based on the themes seemed like it could be cool so I went down the rabbit-hole of making one. They make it look easy, but to be honest I don't think it is. Hexo is at a weird intersection of giving you too many tools and then not enough, so you are stuck perfectly at the intersection of complexity and simplicity. 

It's very loosely a "node.js" blog framework. Hexo itself is an npm package, but then to operate the blog, you don't use any node commands. You use Hexo commands. You run a hexo server using `hexo -server`. It only gets more strange from there. You have a very simple config file in very readable code that you can alter and easily manipulate what pops out your localhost server. Downloading a theme, all you supposedly do is fill out your hexo config and your theme config and you're ready to rock -- not quite. 

In order to make a post, you use another hexo command: `hexo new post "post_name" -s slug_name` 
Run Hexo Server and checkout your cool page in localhost. It's all there and you think you're good to go. 

That's where the simplicity stops.

Now you have a page and our configs, but if you'd like to actually send or deploy your code anywhere other than your local server, it gets a little tricky. You have a `.gitignore` file that comes standard in the hexo app installed that ignores the public folder. What is the public folder? Well once you actually want to publish your blog, say to a heroku app for hosting, or even to github - you have to actually generate your blog using `hexo generate`. This actually assembles your blog based on your config and theme templates to barf out the actual HTML files that would be accessed by a web browser, and populates /public. On your localhost, using the hexo server, you're kinda faking your way through the actual files that power the blog. 

When you go to deploy, you can use the `hexo deploy` command, but given the public files aren't included, any place you're deploying too will be missing the actual .html files, like your homepage for example index.html. Once your code is deployed, without your html, you have your code out in the wild, but not with anything that actually can generate a blog on a web browsers. 

There's luckily some 3rd party packages that handle the behind the scenes work to make sure those files come through. Through digging they basically run a script that does `hexo generate` and `hexo server` to get your files generated in your remote repo. For the npm `hexo-deployer-heroku` package weirdly enough, it utilizes the PHP (???) buildpack and Procfile to build a PHP Heroku app that then runs your node.js Hexo package blog. I felt like I was taking crazy pills trying to piece together how all these pieces intertwined. 

<<<<<<< HEAD
At the time of this writing, I'm using that process above just because it's easy to use hexo deploy and automatically push a heroku build, PHP or otherwise. I'll look to improve my knowledge of how this works to hopefully make it easier on myself to keep constant deployments and clean up a bit of jumbled process. 
=======
At the time of this writing, I'm using that process above just because it's easy to use hexo deploy and automatically push a heroku build, PHP or otherwise. I'll look to improve my knowledge of how this works to hopefully make it easier on myself to keep constant deployments and clean up a bit of jumbled process. 

### 2-11-22 Update: 

After digging, I figured out how to do a more simple and controlled deployment. It's less automated, but I have a branch of my git repo that represents my heroku-host version of my blog, which is ONLY the public folder, the package.json dependencies, and the heroku Procfile. The procfile only contains the 1  command: `web: npm run-script server` and references the package.json file which has the script: `server: hexo server -p $PORT` Just this combo of files and commands will serve the the blog on the app without all the different looping hurdles. Now I simply push my updated public file from my computer to my Heroku branch, and its automatically built through heroku's automated deployments. This way is much more simple and direct in my opinion. 

>>>>>>> 1742df4 (Update config description and add md files)
