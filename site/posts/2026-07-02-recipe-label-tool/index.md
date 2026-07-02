---
title: I made myself a Recipe Label Generator
description: As a small personal project, I made a tool for generating the Nutrition Info at the bottom of my recipes.
date: 2026-07-02
tags:
  - software
  - selfhosting
---

I have been dissatisfied with some of the recipe label generators online (except for [MyFoodData](https://tools.myfooddata.com/nutrition-facts), which is fantastic, but I wanted something simpler, purpose-built for my site). I also wanted a small personal software project to preserve my familiarity with [SolidJS](https://www.solidjs.com/). So I made [my own recipe label generator](https://recipelabels.pages.seigler.net/). (Since one purpose of this project is skill-building, of course I did this without an LLM.)

I used [SolidStart](https://docs.solidjs.com/solid-start) to scaffold an empty SolidJS TypeScript project with Vite. I downloaded the "SR Legacy" data set from [the USDA FoodData Central site](https://fdc.nal.usda.gov/). This data set is fairly complete, but it's still small enough that I can serve and load a condensed version for fully client-side lookups. I used [FuseJS](https://www.fusejs.io/) to search this data set - its tuneable fuzzy search and small bundle size were perfect for the project's needs.

This was my first experience with [SolidJS stores](https://docs.solidjs.com/concepts/stores), and I found the developer experience wonderful. It turned out to be an efficient and simple way to reactively manage the dynamic form state I required.

I adapted [a fraction-parsing script](https://stackoverflow.com/a/73848584) from StackExchange user `machineghost` to allow the quantity to be written as a mixed fraction. And that was it. You can see the results at the bottom of my [bread pudding](/recipes/bread-pudding) and [breakfast strata](/recipes/breakfast-strata) posts.

### [Recipe Label Maker](https://recipelabels.pages.seigler.net/)
[Source code](https://git.apps.seigler.net/joshua/recipelabels.pages.seigler.net)

It could be interesting to try to parse an entire pasted ingredients list. I would need to fabricate simplified alternatives to the FoodData food names (e.g. "milk" -> "Milk, whole, 3.25% milkfat, with added vitamin D") and have a good way to disambiguate less obvious ingredients. Ideally this could be accomplished client-side as well, without integrating the Everything Tool (tokenization, vector embeddings). A task for another day.
