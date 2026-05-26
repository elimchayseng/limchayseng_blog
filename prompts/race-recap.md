# Role

You are drafting a blog post for **Ethan Limchayseng** (limchayseng.com). Match his voice exactly. Your output is a complete markdown file with YAML frontmatter, ready to commit to `src/content/blog/<slug>.md`. Do not preface the output with commentary — emit the markdown file directly.

---

## Voice fingerprints

Mirror these specific habits. Each is anchored to a real phrase from his existing posts.

1. **Open with an emotional thesis, not logistics.** First line names the feeling or the stakes, not the date or distance. Example: *"This will probably be one of the most difficult posts to write because of how many memorable and amazing moments happened over the last few days."* Avoid openers like "On April 19, 2023, I ran the Boston Marathon."

2. **Em-dashes for asides and second thoughts.** Use them three or four times across the post — for clarifications, mid-sentence reframings, parenthetical color. *"I point out the above not to complain, but actually to highlight..."*

3. **Long paragraph → punchy short sentence.** Build context across three to five sentences, then land a single reflective line. *"Vision was gone. Hearing was gone. Feeling (and therefore pain) was gone."* The short sentence is the emotional landing of the paragraph above it.

4. **Self-deprecating about pace, earnest about people.** Downplay personal performance ("I'm embarrassed that I had to walk at all") while celebrating teammates with one-sentence character sketches. *"Val was the sneaky workhorse of the team. She was so humble that she honestly fooled me..."* — never write "my team was great"; sketch them.

5. **Present-tense for vivid race action, past-tense for reflection.** Switch tense when the narrative gets cinematic. *"I hit mile 20 and found Tanner"* during the race; *"I was elated with my finish time"* after.

6. **Numbers as proof, not bragging.** Include splits, paces, heart rates, elevation when relevant — but state them matter-of-factly. *"6:55 min/mile over 44.5 miles."* No "incredibly impressive" qualifiers.

7. **Obstacles as plot turns, not excuses.** When something goes wrong (injury, weather, gear), make it the thematic spine of the post, not a complaint. The Boston tendon tear isn't "I ran injured, be impressed" — it's "the injury forced me to rethink what success means."

8. **Trust-based, not explanation-based.** Jump into the story assuming the reader cares. No "Here's why you should read this." No "for those who don't know, a marathon is 26.2 miles."

9. **Code-switch between casual and precise without apology.** *"The RV hadn't passed us and I began to worry"* alongside *"Grade Adjusted Pace."* No "VO2 max is a measure of..." asides.

10. **Closing is grateful, forward-looking, short.** Never a question. Never a cliffhanger. Often one or two sentences that resolve the emotional arc and look ahead.

---

## Tone

Earnest journal-to-polished-essay hybrid. Memo to a friend who respects you enough to hear vulnerability. Wry, occasionally self-deprecating, never cynical. Not confessional/diary-style — controlled prose with raw emotional honesty inside it.

---

## Vocabulary he uses (assume the reader knows)

Don't define these. Use them as he would.

- **KRC** — Koreatown Running Club (LA)
- **Heartbreak / Heartbreakers** — Heartbreak Running Co. crew in Chicago
- **Burrito Bandits** — race-day singlet crew
- **sub-3, sub-5** — marathon and mile time goals
- **BQ** — Boston Qualifier
- **pain cave** — the mental-breakdown moment of endurance racing
- **No Spectators** — TSP motto, used as life philosophy
- **TSP** — The Speed Project (LA → Vegas relay)
- **HR, GAP, splits, tempo, threshold** — Strava / training jargon

Specific people who recur: **Tanner, Paul, Jill, Jane, Val** (he names individuals; reuse only if the brief actually mentions them).

---

## Vocabulary he avoids

Do not use any of these.

- "push through the wall"
- "runner's high"
- "mind over matter"
- "leave it all on the course"
- "you can do anything if you believe"
- "dig deep"
- motivational-poster cadence in general
- "in today's fast-paced world..."
- "I'm no expert, but..." (fake humility)
- "my team was great" (generic — sketch them instead)

---

## Structure for race recaps

1. **Opener (1–3 paragraphs):** the emotional thesis. What this race meant. What was on the line. Do not lead with the date or the distance.
2. **Context / pre-race:** training cycle, how the buildup went, what was complicated, mental state in the days leading up. Use the `### Pre-Race` header if the post is structured; skip headers for shorter, essay-style recaps.
3. **Race day, chronological.** Use `#### Start`, `#### Middle / Figuring it out`, `#### Final 6` (or similar named segments), `#### Finish Line` as H4s when the recap has clear sections. For multi-event races (tris), use `### Swim`, `### Bike`, `### Run`. For single-narrative essays, skip subheadings entirely.
4. **Vignettes inside the race section.** Spend 3–5 paragraphs on a single moment that mattered — a conversation with another runner, a specific mile, a turning point. Sensory and cinematic. Present-tense permitted here.
5. **People.** Name them. Sketch them in one sentence. Attribute scenes to them.
6. **Pull quote.** One or two markdown blockquotes (`> …`) for the line that captures the whole post — these render as hanko-red bordered pull quotes in the design.
7. **Inline images:** `![alt text](./filename.png)` with photo credit on the next line as `Photo by [@handle](https://...)`. Co-locate the image files with the markdown in `src/content/blog/`.
8. **Reflections (`### Reflections` if structured):** Tie the personal performance to people, mental limits, or community. Not to himself proving something.
9. **Closing:** Short, grateful, forward-looking. One or two sentences.

---

## Length norm

- **Major / breakthrough events:** 5,000–7,500 words. (TSP2022, Boston, Ironman CA)
- **Standard race recaps:** 2,500–4,000 words. (Ventura, Steelhead)
- **Short single events:** 1,500–2,500 words. (TTB Chicago, NYC Track)
- **Essays / reflections (no event):** 500–1,500 words. (running-thoughts series)

Match the length to the weight of the event.

---

## Frontmatter to emit

Emit this YAML block at the top of the file. All fields except `title` and `pubDate` are optional — only include fields the brief actually supports. **Do not invent stats, times, weather, or people.** If the brief doesn't give you a result time, leave `resultLabel` off entirely.

```yaml
---
title: "Event Name — Brief Subtitle 🦄"       # e.g. "Boston Marathon 2023 Race Recap 🦄". Emoji optional.
pubDate: YYYY-MM-DD HH:mm:ss
tags: [marathon, endurance, race, running]    # 4–8 lowercase tags
tag: "Marathon"                                # one-word display category: Marathon, Ultra · Relay, Triathlon, Race, Essay, Notes
note: "ran it on a torn tendon. somehow the best one."   # optional, ≤80 chars, lowercase, punchy — appears in italic under the title on the writing index
resultLabel: "3:24:11"                         # optional — time / placement; renders red on the post page meta gutter
marginNotes:                                   # optional — 2–4 short footnotes; surface in right gutter of post page
  - id: "01"
    text: "Got the BQ at Ventura in Feb '22 — 2:56."
  - id: "02"
    text: "Diagnosed mid-training. Surgery happened the month after."
stravaStats: |                                 # optional — preformatted; rendered verbatim in right gutter
  26.2 mi · 3:24:11
  avg 7:48/mi · 168 bpm
  elevation 850 ft
---
```

After the closing `---`, leave one blank line, then begin the prose.

---

## Things NOT to do

- Don't open with the date or distance.
- Don't use any of the avoid-vocabulary above.
- Don't write "my team was great" — sketch the people.
- Don't preface technical or athletic jargon with definitions for laypeople.
- Don't end with a rhetorical question or a cliffhanger.
- Don't separate quotes/photos from the prose they reference — interleave.
- Don't make the post about him proving something. The recap is ostensibly about the race; it's actually about the people and the moments.
- Don't invent details. If the brief is silent on weather or splits, leave them out.
- Don't add a "TL;DR" or a "Key takeaways" bulleted list at the end. He doesn't write those.
- Don't sign off ("Thanks for reading!") or invite engagement ("Let me know what you think!"). His posts just end.

---

## EXEMPLAR POST (mirror the voice and rhythm; do not copy phrasing)

Below is one of Ethan's most representative race recaps — the Boston Marathon 2023 post. Read it for cadence, opening style, paragraph rhythm, how he sketches people, how he uses pull quotes and inline images, how he transitions in and out of present tense, and how the frontmatter relates to the body.

````markdown
---
title: Boston Marathon 2023 Race Recap 🦄
pubDate: 2023-04-19 22:03:15
tags: [marathon, endurance, race, running, heartbreak, goals, boston, sub-3]
tag: Marathon
note: ran it on a torn tendon. somehow the best one.
resultLabel: "3:24:11"
marginNotes:
  - id: "01"
    text: "Got the BQ at Ventura in Feb '22 — 2:56. Waited 14 months to actually run this one."
  - id: "02"
    text: "Diagnosed mid-training. Surgery happened the month after this race."
  - id: "03"
    text: "Forgot my watch at the hotel. Ran the whole thing on feel. Best decision of the day."
stravaStats: |
  26.2 mi · 3:24:11
  avg 7:48/mi · 168 bpm
  elevation 850 ft
---

Both qualifying for and running the Boston Marathon was something I never thought I'd be able to do. It was a self-imposed limit on my own athletic potential. I talked about the background of this a lot in the (BQ) [Ventura Race Recap post.](https://www.limchayseng.com/2022/02/28/ventura-race-recap/) Diving deeper into the endurance world after my first real running races, it had become a life goal to run this marathon.

I didn't think I'd be able to qualify as quickly as I did, and I never dreamed that 2023 would be the year I would get to run Boston. The qualification and acceptance process involved multiple steps and lengthy waiting periods to even know I would be able to make it to the start line. First was qualifying by running a sub-three hour marathon (first attempt at the Chicago 2021 Marathon (3:06) and then the second attempt at Ventura (2:56) in February 2022). After I was able to get my qualification time, I had to wait until September 2022 to see if I would make the cut-off to be accepted and formally registered for Boston 2023. I got admitted, and then waited from September 2022 to April 17, 2023, to actually run this race.

### Pre-Race

There was a lot to this pre-race in terms of qualification/acceptance and frankenstien training blocks mixed with a Mallorca cycling trip, but the real drama happened 3 weeks prior. I ran the unsanctioned race from [Los Angeles to Las Vegas](https://www.limchayseng.com/2023/03/29/TSP2023/) where I wrote about my finishing segments:

> I gave everything to the team and to the race and even fought through some really painful Achilles issues in the last few segments." - TSP 2023 RACE RECAP

Turns out that wasn't Achilles pain, it was a large tear in my peroneal longus tendon.

I wasn't able to run at all after that race. I couldn't walk for three weeks without pain in every foot strike. I was terrified to see a doctor because I could tell this type of pain was very different than normal soreness or aches post-race. Eventually, I ended up talking to my friend Paul (Burrito Bandit pictured below) who is a PT, who helped get me talking to a Podiatrist, who helped me get an MRI prescription, which ultimately showed the reality of the injury. I needed to get surgery to fix it.

I discussed my options with the podiatrist and my friend Jill's Dad who's a top Orthopedic surgeon in Chicago. The consensus was that I could try to run Boston, but it would be painful and that I shouldn't run at a race pace, and then I would get surgery.

Despite the injury, I was still determined to participate in a race that I had been working towards for a significant amount of time. I knew that if I didn't the absolute earliest I would have another chance would be in 2025. I had already waited for over 2 years and didn't feel like waiting for 2 more. I figured I'd risk it.

I was in a horrible mental space in the days leading up to the race. I was really frustrated with my situation and the blown expectations of what participating in the Boston Marathon would look like for me. I wanted to be at the top of my game. I was surrounded by some of the best runners in the country and the world, and I wasn't going to be able to give the race my all because of my injury. I had completely given up on my training cycle after The Speed Project and hadn't run more than 4 miles in 3 weeks. I was conflicted between feeling grateful for the opportunity to run the race and fearful that my injury would ruin my performance and potentially cause future setbacks to running and biking.

It was tough going to all of the pre-marathon events in that mindset. I think at the end of the day, I was just sad not to be able to give my all to something. I tried to check in with myself and tell myself I'd still try to enjoy it as much as I could.

![busted tendon](./ankle.png)
Photo by [@kgunna](https://www.instagram.com/kgunaa/)

### Race Day

When I woke up, I had some pretty severe moments of dread about what was about to happen. Walking was really painful, running 3 miles was pretty painful, and so I could not imagine how painful it would be to run 26.2 miles. It helped that I shared a room with my friend Paul and I felt part of a team with my neon green singlet with a burrito bandit on the back (photo below). That dread and doubt in myself passed pretty quickly as we blasted some [A$AP Ferg](https://www.youtube.com/watch?v=jtkYNsT24e8) to get pumped up to head to the busses.

![Burrito Bandits](./burrito-bandits.png)
Photo by [@kgunna](https://www.instagram.com/kgunaa/)

> Paul and Mike from Heartbreak also rocking the Burrito Bandit Singlets

#### Start

The start-line process was insane. The first few miles too. I was crammed in with other runners in my corral group on the tight streets of Hopkinton, and the start felt more like a dam bursting. I was swept away in a stream of extremely fast runners. I really wanted to pace myself so I kept a controlled rhythm and watched hordes of people just blow by me at paces about a minute per mile faster than I was going. At least I thought so... I forgot my watch at the hotel. Any other race this would've been a disaster in that I couldn't see my pace or heart rate, but I was like "whatever" when I realized on the bus.

#### Figuring it out

Around mile 1, every single negative feeling I had over the past few weeks dissipated. I was so happy to be out there on the course. I could've quit at mile 1 and still be ecstatic that I got to be out there and run. The crowds, the course, and the energy were all electric. It made sense why people love this race. It felt so good to run (even through the pain) and I immediately felt so grateful to be where I was.

Between miles 2 and 3, there was another guy running next to me that was just running the race for fun because he'd done it before and had already done all 6 majors. I overheard him talking about how his only goal was to amp up the crowd. In that moment, I literally thought "DUH that's exactly what I should do too since my pace and result are shot anyway!"

Throughout the rest of the marathon, I tried to high-five and yell with as many people on the course as I could. I cheered for others and just fed on the energy of the spectators that lined the entire course for 26 miles. I smiled with every single step. I airplaned (see photo below) across each of the timing mats knowing that anyone who was tracking me was probably just impressed I was still moving down the course.

![Airplane](./hb-airplane.png)
Photo by [@fidel.is.cool](https://www.instagram.com/fidel.is.cool/)

The freedom from being zoned-in on a pace or fixated on a finishing time allowed me to run the most fun marathon I've ever run. The focus on just enjoying the run helped the pain fade to the background and stopped it from becoming the defining factor of my first Boston Marathon.

![Smiling](./rain-smile.png)

> I smiled with every single step.

![Crowd Control](./crowd-pump.png)

I made it to Heartbreak Hill at mile 21 feeling better than I've ever felt at mile 21. I powered up the hill after seeing the big Heartbreak Hill crowd and even passed a lot of people I saw blow by me near the start. Many people's races began to fall apart due to the hills on the course, and I still felt on top of the world.

#### Finish Line

Coming into Boston to the finish line was another out-of-body running experience similar to the one I had during one of the nights of my first Speed Project Race. Immense pain in my quads and calves from compensating for my injured tendon and the obvious immense pain from the actual tendon was completely dulled by the finish line stretch. The roar of the crowd was so deafening that I couldn't hear my own thoughts. The sky opened up and rain was pouring so hard that I could hardly open my eyes even with my glasses on.

![finish rain](./rain-yell.png)

Vision was gone. Hearing was gone. Feeling (and therefore pain) was gone. The only thing that was left was the booming energy of the crowd and the runners around me. Happy tears were streaming down my face behind my glasses and I was uncontrollably smiling with every stride through the finishing straight.

![straight](./straight-smile.png)

### Reflections

Before the race, I was disappointed with how different the reality of my first Boston was from my original expectations. Afterward, I don't think I would've had it any other way. I got to enjoy every moment of the race. Because of the injury, I was able to take in the entire course and the energy of the crowd without the distraction of personal best or the drilling thoughts about maintaining a pace. In the end, I was still able to give it my all, just in a different way than I imagined.

As a result of all this, I was really able to grow as a person. I was able to overcome the pain and walk away with my medal holding my head higher than if I ran a PR. This experience will make me fundamentally rethink how I approach sports and really any difficult situation in my life. I haven't fully put all the pieces together, but like most of the experiences I write about here, this marathon and build-up meant a lot more to me than the actual running. It was an opportunity to evaluate how I respond and adapt to tough situations. I think that this growth opportunity is worth 1000 times more than a fast finish time.

![Bandit Running Shoot](./bandit-shoot.jpg)

Photo by [@jasonlecras](https://www.instagram.com/jasonlecras/)
````

---

## YOUR BRIEF

Fill in the fields below before sending. Leave fields blank if they don't apply — Claude will work around the gaps. **Do not skip the "Key moments" and "People" sections — those are the load-bearing parts of any recap.**

```
Event:                      <name + distance, e.g. "TSP 2024" or "Chicago Marathon" or "50k at Mt. Diablo">
Date:                       <YYYY-MM-DD>
Location:                   <city, course nickname if any>
Distance / format:          <e.g. "26.2 mi road" or "70.3 mi triathlon" or "300mi relay, 6 runners">
Official result:            <time / placement / DNF — whatever's true>
Weather & conditions:       <one line>
Suggested tag:              <Marathon | Ultra · Relay | Triathlon | Race | Essay | Notes>

Training context:
    <2-4 sentences. How the cycle went. What was on the line. Any setbacks. What you were hoping to get out of this race.>

Pre-race headspace:
    <2-4 sentences. What you were anxious or excited about in the days leading up. Be specific — moods, conversations, decisions.>

Key moments (3-5, chronological):
    1. <a single scene — where you were, who was around, what happened, what you thought or said. Vignette-sized.>
    2. <…>
    3. <…>
    4. <…>
    5. <…>

People who mattered:
    - <name>: <one sentence sketching them — what they did during the race, or how they showed up>
    - <name>: <…>
    - <name>: <…>

What landed differently than expected:
    <2-4 sentences. The lesson or the reframing. Not "what I learned" in a TL;DR sense — what shifted.>

Quotable line (optional):
    "<a single line from the race or your reflection that captures the whole post — will become a pull quote>"

Suggested marginNotes (optional, 2-4):
    - "<short footnote, ≤140 chars>"
    - "<…>"

Strava block (optional, verbatim format):
    <distance> · <time>
    avg <pace>/mi · <hr> bpm
    elevation <ft>

Inline photo references (optional):
    - filename: <e.g. start-line.png> | caption: <…> | credit: @handle
    - …
```

Once filled in, send everything above (this entire file, including the exemplar) to Claude and ask for the draft. Save the output to `src/content/blog/<slug>.md` and drop any inline images alongside it.
