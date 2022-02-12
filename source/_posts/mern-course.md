---
title: MERN Course on LinkedIn Learning
date: 2022-02-12 17:33:07
tags: [mern, node, mongodb, express, react, linkedin, HTML]
---

# MERN Course on LinkedIn Learning

My Saturday has gone the way most Chicago Saturdays have started for me lately. 18 mi run with the Heartbreak Crew in -1 degree weather with ice patches galore, and then trying to work on the coding skills.

Working with Tres, we both are interested in learning more about React to build out the UI and front end for a Strava API web app we're developing. We have a good handle of node.js and Mongo, but the syntax and rules of React are still a bit of a mystery. We found this [essentials course](https://www.linkedin.com/learning-login/share?account=105361410&forceAccount=false&redirect=https%3A%2F%2Fwww.linkedin.com%2Flearning%2Fmern-essential-training%3Ftrk%3Dshare_ent_url%26shareId%3DyAd%252F9odeRiK3YnBjI9OUDg%253D%253D) which was valuable for it's short duration.

I wanted to write this post to recap the major learnings and missteps I took a long the way. You can see the Github code+project files [here](https://github.com/elimchayseng/MERN_learning_project)

### 1. HTML / Javascript dependencies are brutal to troubleshoot

```
ERROR in src/Components/Player/PlayerList.js
Line 8:20: 'players' is missing in props validation react/prop-types
Line 8:28: 'players.map' is missing in props validation react/prop-types
Line 10:32: 'updateCurrentPlayer' is missing in props validation react/prop-types
Line 10:52: 'updateCurrentPlayer.bind' is missing in props validation react/prop-types``
```

The above error blocked my React build, and jammed me up for almost an hour trying to trouble shoot. I was able to learn a lot about the importance of proper indentation for front end code. That's what originally caused the error, but it later came back even when everything seemed right. The final way to address this was in my `package.json` file where I needed to remove `"plugin:react/recommended"` from the eslint configs. this allowed me to move forward with my props the way they were. Yay, linting errors.

When it comes to the all the `<div></div>` drama and formatting, it helps to have the VS Code feature [format on save](https://linuxpip.org/vscode-format-on-save/) enabled in your workspace.

### 2. React Nuances

You gotta forgo the camelCase and capitalize the first word in a a `class` variable in React - period.

There's still more I need to learn to fully understand constructors and props and the React hooks, but that will probably be it's own post.

### 3. The non-dependencies between front end and back end

Building this whole back end in Node.js and Express ultimately meant nothing for the actual user experience in our case. Because React is using Axios to make the HTTP requests to our DB, it doesn't really matter what's pulling the strings in the API. It's not referenced or used in the front end at all from what I could find. This could be considered a benefit assuming you want a React front end, but not a JS back-end.

The 18mi Run:

<iframe height='405' width='590' frameborder='0' allowtransparency='true' scrolling='no' src='https://www.strava.com/activities/6672493424/embed/2ce029844d6f4a117ab8379485940465534bdaa7'></iframe>
