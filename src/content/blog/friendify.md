---
title: "Friendify: Music Sharing for Your Groupchat"
pubDate: 2026-05-15 10:00:00
tags: [friendify, spotify, react, supabase, product, music, side-project]
tag: Project
heroImage: ../../assets/hero-friendify.png
note: "your top five songs from Spotify base for your groupchat 📀"
marginNotes:
  - id: "01"
    text: "Built with my friend Tres."
  - id: "02"
    text: "Top fives come straight from the Spotify API: your most-played tracks over the last four weeks, no manual input."
  - id: "03"
    text: "\"Users\" here means my group chat. Six months in, still daily."
---

# The songs always get buried

My friends and I share music constantly. Someone drops a track in the group chat, says "this is so good," and for about ten minutes there's a little flurry of opinions or no response at all. Maybe someone changes the subject, and the song is gone, and then it's buried under memes, and whatever else our group chat does all day. A messaging group just isn't built for sharing music. 

So my friend Tres and I built [Friendify](https://github.com/elimchayseng/friendify-v2) to be that space. The core idea is to make sharing passive. You don't have to send anything, Friendify pulls your top five tracks from the last four weeks straight off the Spotify API and keeps them on your group page. At any moment you can see what everyone's actually listening to, no effort required. 

![The Friendify dashboard — shared tracks up top, everyone's top fives below](/blog-images/friendify-dashboard.png)

On top of that there are two features, and that's the whole app. The first is **Track of the Day**: every day it picks one random song out of everybody's top tracks and gives it a discussion board. It became a daily check-in — you log in to see what got pulled and to argue about it. The second is **Shared Tracks**, which runs across everyone's lists and surfaces overlaps — the songs two of us both have in our top five right now. It's a small thing, but seeing that you and a friend independently landed on the same track is a genuinely nice little hit of connection.

### Why I'm proud of something this small

Friendify is dead simple. There's no feed, no algorithm, no notifications begging for attention. And that's exactly why I like it. We've used it almost every day for over six months. We argue about each other's top fives, we use the board for the daily song, and it's just become a part of how the group chat operates. Someone will mention an artist they're into and I'll go "yeah, I saw — that's been in your top five all week."

The scale is small, but that's also the point. I had a real need and I built the smallest possible thing that met it well, then watched whether it actually stuck. It did.

From the product side, I think it's important to see a problem clearly, build something simple and genuinely *pleasant* to use, and have it earn a place in people's day. The payoff of that scales with the difficulty — the harder (technically) the problem, the better it feels to land a solution that disappears into the background. Friendify wasn't a necessarily a hard problem. To solve it cleanly, and for people I care about is the most satisfying kind of building I think there is.
