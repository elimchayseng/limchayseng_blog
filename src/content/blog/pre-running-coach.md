---
title: "PRE: Endurance Running Training Coach w/ Telegram, Strava, gCal, and Notion"
pubDate: 2026-06-05 09:00:00
tags: [pre, ai, agents, claude, strava, notion, running, side-project]
tag: Project
heroImage: ../../assets/hero-pre.png
note: "Custom Harness for a Running Coach Agent"
marginNotes:
  - id: "01"
    text: "Message PRE over Telegram.. I wanted it to feel like texting a coach, not opening an app."
  - id: "02"
    text: "SQLite as a durable the source of truth. Google Calendar and Notion are both one-way derived views written out of it."
  - id: "03"
    text: "The coach personality is modeled to not sugar coat or hold back, it even rags on me for running too fast."
---

# The problem with talking to a chatbot about training

For a while my "coaching setup" was just a very long conversation with Claude. I'd paste in a workout (or a screenshot of my strava), talk about how it felt, ask whether to move Thursday's tempo, and get a genuinely good answer. The problem is the conversation is the only place that knowledge lives and the context grows really fast. 

It doesn't know I ran this morning unless I tell it, it can't put intervals on my calendar, and it re-learns my PRs and injury history every time, because there's nothing underneath it that remembers.

I wanted to build a solution for that, and I also really wanted to experiment with building my own agent harness with tools and memory. I work on the agent harness at Salesforce, and I was curious what it would take to build my own from scratch. The whole project was originally seeded by a single topic, agentic memory. How does an agent actually carry context across time?

I started by evaluating [mem0](https://mem0.ai) as a memory provider. But I didn't want to test it against a toy, so I pointed it at something I genuinely want for myself: a personalized training coach. I was coming off the Boston Marathon and now I'm training for an ultra in Tahoe, so a coach that remembers my whole block (and my injury history) is a real value prop. I called it [PRE](https://github.com/elimchayseng/pre-running-coach-bot). I message it over Telegram, and I wanted it to feel like texting a coach who already knows my week.

![Texting PRE over Telegram — it logs the run, checks in, and lays out the week](/blog-images/pre-conversation-example.png)

### Where the memory actually lives

This is the part I came to learn. mem0 was the starting point, but as PRE developed I realized a general-purpose memory layer wasn't the right fit. The hard part of a coach isn't recalling relevant facts, it was maintaining a dependable *temporal state*: what's prescribed this week, what actually happened, what changed and when. A training plan is a timeline, not a pile of memories.

So I dropped the dedicated memory vendor and went the other way: one durable source of truth — a single SQLite database — that PRE loads into the conversation context every turn. Nothing else gets to be authoritative. Google Calendar and Notion are both one-way views written *out* of that database. I basically found that careful prompting against well-modeled state beat a general memory layer, and making one source authoritative is what made every integration after it cheap to add to use and manage the context correctly.

The Notion piece was its own curiosity. I'd been watching their developer platform and wanted a durable, browsable home for things like journal entries, plan changes, the long-form context I might not say out loud to the coach but still want it to have. It started as a read-only mirror and ended with one field syncing *back* into SQLite. I'll likely expand that later, but was blocked based on Pro plan requirements from Notion to experiment more. 

![The PRE Sessions mirror in Notion — every run with coach notes, laps, and a link back to Strava](/blog-images/pre-notion-example.png)

### What I actually got out of it

I use it every day. My runs get uploaded from Strava automatically, it reads the training load, adjusts the week, and the workouts show up on my phone next to everything else. Building it is also how I formed real opinions about harness design, the kind you only get from being the one who has to make the calendar event correct on race morning.

I feel like I got a lot of great hands on experience to inform design opinions and constraints when it comes to a agentic harness capabilites. I also got an app I use literlaly every day now, so win win.
