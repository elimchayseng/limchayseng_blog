---
title: "Tempo Tycoon: Full e2e Agentic Commerce w/ Blockchain Tx"
pubDate: 2026-05-30 12:00:00
tags: [tempo, blockchain, agents, ai, stablecoin, agentic-commerce, stripe, simulation, side-project]
tag: Project
heroImage: ../../assets/hero-tempo-tycoon.png
note: "Zoo Tycoon, but the guests have LLM brains and real wallets"
marginNotes:
  - id: "01"
    text: "Every purchase is a real on-chain AlphaUSD transfer on the Tempo testnet. Click any sale and you can actually see the on-chain tx info and reciepts"
  - id: "02"
    text: "The merchant is its own agent: claude haiku calls acp_adjust_prices to reprice inventory based on demand to create a real market."
  - id: "03"
    text: "ACP = the Agentic Commerce Protocol, recently folded into the broader Universal Commerce Protocol, so some of this is out of date."
---

# What happens when the buyer is an agent?

This one started with a deep curiosity about microtransactions — specifically the [Agentic Commerce Protocol](https://github.com/elimchayseng/stablecoin_zoo_tycoon). The premise behind it is simple: software agents, not people, discovering merchants and making purchases on your behalf. I wanted to actually *see* that happen end-to-end. Not read a spec — watch one agent decide it needs something, find a seller, make a price determination, and pay for it, with the whole reasoning loop and the settlement visible.

The part I most wanted to understand was the settlement. If agents are going to transact, where does the money actually move? So I used [Tempo](https://github.com/elimchayseng/stablecoin_zoo_tycoon), Stripe's new payments-focused blockchain, mostly because it had a public wallet and a public faucet, so it was everything I needed to run real transactions without real money.

### Why a zoo

I needed a use case interesting enough to demo a full commerce loop, and I kept coming back to a game I loved growing up: Zoo Tycoon. Guests, merchants, a little economy. So I built that — except every guest is an agent with an LLM brain and a wallet, and the gift shop is *also* an agent. The guests get hungry on a decay loop; when a need crosses a threshold they go shopping. The merchant watches demand and reprices its inventory. Out of that you get a tiny, self-running market.

![The Tempo Tycoon dashboard — LLM guests, a merchant repricing inventory, and live blockchain state](/blog-images/tempo-tycoon-dashboard.png)

The thing that made this a bit more real is that each wallet (guest and  merchant) is loaded with a set amount of AlphaUSD, and every purchase is a real transfer on the Tempo testnet. The dashboard shows you the model's actual context and reasoning — here's the merchant deciding that hotdogs and nachos are top performers and nudging prices up within a ceiling — and then the transaction itself flows through its lifecycle, on-chain, in front of you.

![A zoo purchase on the Tempo testnet — Send 3 AlphaUSD, memo: Zoo Purchase: Popcorn](/blog-images/tempo-tycoon-explorer.png)

And because it's a real chain, the receipt is real too. Click any sale and you land on the Tempo explorer: 3 AlphaUSD sent, memo *"Zoo Purchase: Popcorn,"* a fee of a fraction of a cent, success. The memo is the part that made it click for me — the protocol carries enough context that a purchase is self-describing on the ledger.

### What was actually hard

Getting the simulation to run correctly with concurrent agents meant real session management. It took some design to make sure three guests and a merchant all acting at once, against one chain, wouldn't clash with eachother.

The other challenge was tuning the LLM behavior. I needed enough variance that the agents felt alive and made different choices, but enough guardrails that they stayed sensible.Designing those test flows, the space between "too rigid to be interesting" and "too loose to function," was a lot of the actual work.

### Why I think this matters

This was the first time I'd seen a full visual of an agent-to-agent market actually running, and I think that vantage point is going to matter soon. The pieces are showing up everywhere: Cloudflare billing for crawls, ChatGPT adding commerce, Shopify integrations, pay-per-call API metering. They're all getting to the same question about the future: how do machines pay each other? Building the zoo gave me a concrete mental model for how that loop closes, from an agent's need all the way down to a settled transaction with a memo on it.
