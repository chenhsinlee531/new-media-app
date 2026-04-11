---
title: "AI and the Judgment Problem"
date: 2025-12-09
tags: [ai, product, judgment]
cardSize: "tall"
excerpt: "The question isn't whether a decision is high-stakes. It's whether the success criteria hold still long enough for an algorithm to learn them."
---

We keep building tools that automate decisions. We haven't figured out which decisions shouldn't be automated.

The easy answer is "high-stakes decisions." Medical, legal, financial. But that framing is too coarse. The real dividing line isn't stakes. It's *legibility*: how clear, measurable, and stable the success criteria are.

Spam filtering is automatable. Hiring is not. Not because the stakes are higher (they're comparable), but because what counts as a good hire shifts based on team dynamics, role evolution, and context the evaluator holds but the algorithm doesn't. The criteria move. That's what makes judgment hard to outsource.

The interesting tools are the ones that make this boundary explicit. They automate where legibility is high and hand control back where it isn't. They know where they stop.

Music recommendation is a useful test case. An algorithm can learn what genres and tempos someone returns to. That part is legible. But whether a listener wants the familiar thing or the surprising thing on a given Tuesday night is not. Diary studies in streaming have shown that people choose music based on the moment they're in: commuting, focusing, winding down. The context shifts daily. No historical preference model captures that reliably, because the criteria aren't stable enough to learn from.

The recommendation systems that handle this well don't try to nail it. They surface a mix that's mostly familiar with a few deliberate stretches, and they let the listener choose. The design acknowledges that taste has a component the system can't fully read. Spotify's Discover Weekly works on a version of this principle. So did the personalized feed work I saw at KKBOX, where the team structured the homepage to move from familiar content at the top to progressively more exploratory as you scrolled. The 80/20 ratio (recognition to novelty) came directly from user research, not from the algorithm's confidence score.

Most AI products skip this step entirely. They present a confident completion and wait to see if the human pushes back. That isn't judgment support. It's judgment outsourcing with plausible deniability.

The harder design question is what it would mean for a tool to surface its own uncertainty. Not a confidence score buried in the UI. An actual moment where the product says: this is where you should be deciding, not me. Descript does a version of this in video editing: it automates transcription and cuts, but it keeps the creator in the decision loop on every edit. The tool handles legible tasks (transcription accuracy, silence removal) and returns control where judgment is needed (pacing, tone, what to keep).

But that pattern hasn't spread to where it matters most: the everyday decisions where automation feels seamless and the human quietly stops checking.
