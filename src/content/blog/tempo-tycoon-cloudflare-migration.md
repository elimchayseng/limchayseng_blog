---
title: "Tempo Tycoon migration from Railway to Cloudflare in a single PR"
pubDate: 2026-11-07 12:00:00
tags: [tempo, cloudflare, durable-objects, workers, railway, claude-code, side-project]
tag: Project
heroImage: ../../assets/hero-tempo-tycoon.png
---

I ended up migrating my mini-agentic commerce/Tempo blockchain demo over from Railway to Cloudflare to see how hard it would be to lift and shift something running on a full server over to a DO. Turns out it was pretty easy, and everything was done in one PR and about 15min of Claude Code mashing.

If you haven't seen it: [Tempo Tycoon](https://tempo-tycoon.com/) is a retro Zoo Tycoon clone where guest agents buy food from merchant agents over ACP, and every purchase settles on the Tempo testnet. There's one zoo, one simulation, and however many people are watching it over WebSockets.

## Fitting to a Durable Object

On Railway the server was a long-running Node process. The AgentRunner, account store, checkout sessions and WebSocket clients all lived as module-level singletons, because there was only ever one process and one zoo.

A Durable Object fits that shape: a single instance with its own memory and WebSockets. One global DO (`ZooServer`) now plays the role of the Node process. A Worker sits in front of it, serves the frontend, and forwards `/api/*` and `/ws` to the DO. Every request hits the same instance, so the existing Hono app and its singletons run inside it unchanged.

One thing i struggled with in the server was doing session management. With a DO the agents are all in one place. Guests and merchants run in the same instance, so the agent loop, wallets, and checkout state never sync across processes, and agent ACP calls go straight into the app instead of out over localhost.

One DO worked pretty well because there's one shared zoo. Tempo Tycoon probably could move to a zoo per user, where the path is a DO per zoo (`idFromName(zooId)`), with those singletons moved onto the instance first, but felt not needed for such a tiny demo "room."

The interesting piece with DO was the keep-alive. The simulation should keep going when nobody's watching, so while one is running the DO re-arms an alarm every 10 seconds to stay in memory. To test it I disconnected every viewer and let it run for 150 seconds: 14 purchases, 2 restocks, 0% errors.

## What actually changed

Most of the work was Workers runtime rules, not architecture. Workers don't allow timers or I/O at module load, so agent setup and cleanup jobs now start lazily. A few Node-isms like `readFileSync` and `Buffer` got swapped out, state storage became pluggable (files locally, memory on Workers), and the frontend is embedded in the Worker bundle so a deploy is one upload. The same app still runs on Node for local dev.

Then I deleted `railway.toml` and every Railway reference in the repo. All 130 tests still pass, and deploying is three commands: set the admin secret, clear `dist`, run `cf:deploy`.

It's live at [tempo-tycoon.com](https://tempo-tycoon.com), and the full diff is in [PR #20](https://github.com/elimchayseng/tempo_tycoon/pull/20).
