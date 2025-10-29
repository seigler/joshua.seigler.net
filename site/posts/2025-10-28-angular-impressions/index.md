---
title: Angular impressions
description: My opinions on Angular as a new user
date: 2025-10-29
tags:
  - technical
  - software
---

I've been working with Angular lately. Most of my experience is with React, starting back in 2018 just before the addition of hooks, and working with it heavily into 2025. I build web and mobile applications, and React or React Native was the tool of choice across a handful of companies small and large. I've also built some small personal projects with Vue and SolidJS as little learning experiments.

When I try a tool that challenges my comfortable ways of doing things, the initial feeling is generally bad. That's normal and expected. I'm using the tool, so I understand that in theory it can fit some need I have. But the way it goes about things often seems wrong because I'm not used to it. I haven't learned to look at things from the tool's particular perspective yet.

A good example of this discovery journey is Typescript. When I first started using Typescript, it seemed like the amount of hassle involved in making everything properly typed was not worth the occasional benefit of catching a type error. But once I got used to the language I quickly appreciated the value of working with types, and I ended up with a very positive opinion of the tool.

Getting "over the hump" and internalizing the tool's paradigm doesn't always mean liking the tool. Tailwind is a tool for organizing and applying CSS styles. It holds a middle position adjacent to Bootstrap and to inline styles. With Tailwind and other Atomic CSS tools, you don't write CSS, you apply utility classes. At first this struck me as nearly obscene. But a lot of smart people are huge fans, and I joined a project that was using it and didn't have the social capital to rip it out, so I gave it a shot. It wasn't as bad as I thought it would be, and I often enjoyed using it. But after becoming thoroughly familiar with Tailwind, I think that in most cases you can do better with CSS variables and scoped CSS. (I have a lot of thoughts about CSS architecture, but I'll save them for their own post.)

Since I've been using Angular for a few months now, I'm coming out of the "this feels bad because it's unfamiliar" stage and starting to have a sense of the Angular paradigm. To use [Trivium](/posts/the-trivium-a-tool-for-learning-anything/) terminology, I'm starting to shift my focus from Angular's grammar and logic to its rhetoric.

Here are some of my observations:
- Angular *really* loves dependency injection and decorators.
- Angular has evolved significantly over time, so there are a lot of old and new patterns coexisting: `*ngIf` and `@if`, `@Input` and `input()`,  `ngOnInit` and `effect()`. Since I'm just now learning it, I mostly use the modern patterns shown in Angular's docs.
- Angular is compiled, which lets you do creative things with template languages if you want.
- Angular depends on the DOM in a way React doesn't. Each Angular component is like a mini application with its own host element. The component's code renders its template into the host element. In React, a JSX component is more like a persistent function invocation. It has a location in the DOM, but it doesn't have its own host element. The component could easily emit nothing and be completely absent from the DOM. This is either difficult or impossible in Angular, it's not even something you would try to do.
- Angular is complex. Maybe I will come to appreciate DI and the Angular way eventually. But I already know that with a starkly simpler tool like React or especially Solid, I can efficiently accomplish the same result, while being able to understand how my framework functions.

Overall, I feel that Angular is certainly suitable for building web applications. But because of all the DI and decorators, it feels unnecessarily clever, which makes learning to use it more difficult, and makes deeply understanding how it works less likely. It is well tested and is as "batteries included" as it gets, which is nice for large projects.

It will be interesting to see how my feelings change with time. Stay posted.