---
title: Tools of the trade
slug: tools-of-the-trade
description: Some dev tools I find most useful
draft: true
---

Everyone has different tools that they find especially effective. Here are some I have found with a few words about why I like them.

## [mise-en-place](https://mise.jdx.dev/)
Universal dev tool version manager

This is [asdf](https://asdf-vm.com/) with a much better DX. Specify tool versions in a config file and this tool can ensure that they are installed and active when entering the project directory. Amazing for getting a new dev environment set up in seconds. Replaces `asdf`, `nvm`, `pyenv`, `venv`, `rbenv`, and many other tool-specific version managers.

It also supports installing specific global tools, like `angular-cli` from `npm`, or `stack-pr` from `pipx`.

## [stack-pr](https://github.com/modular/stack-pr)
Open source tool for [stacking PRs](https://www.stacking.dev/).

PR stacks are, as far as I can tell, the best way to manage large features in git. I first heard about this practice in a series of blog posts from Graphite, a company offering free PR-stacking software and related paid services. But you don't need a custom CI flow or managed service for stacking to work - this CLI tool or one of the others at stacking.dev can take care of this.

If you start using PR stacks your whole company will start copying you.

## [pd2slack](https://github.com/sidpremkumar/pd2slack)
Simple python script to update the members of a Slack group such as `@oncall` to match the active member(s) of a PagerDuty schedule. This replaces several expensive SAAS services.

