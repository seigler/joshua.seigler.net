---
title: Angular impressions update
description: TLDR; Six months in, Angular is not too bad
date: 2026-03-27
tags:
  - technical
  - software
---

This is a six-months-later follow up to [Angular impressions](/posts/angular-impressions/)

It's not so bad. Using modern Angular development practices helps a whole lot -- dependency injection is less mysterious with `inject`, state management is actually great since I can use signals, and it looks like in a version or two maybe even Observables will be basically optional. I've accepted that Angular does more for you than React, and that helps with the daily experience as well.

I do miss being able to pass around components as values; in Angular if you want to make a component that accepts another component which it will use to do its rendering (maybe the user can provide a wrapper for table cells), you will be using templates. Not as elegant or simple.

But Angular finally feels expressive, and I'm no longer spending effort fighting with it.