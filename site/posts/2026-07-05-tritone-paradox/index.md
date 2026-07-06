---
title: Cool musical illusion - tritone paradox
description: An ambiguous musical tone sequence where everyone hears one of two things.
date: 2026-07-06
tags:
  - music
  - learning
---

<link rel="preload" href="shepard-chromatic-c/01-C.mp3" as="audio" />
<link rel="preload" href="shepard-chromatic-c/02-Cs.mp3" as="audio" />
<link rel="preload" href="shepard-chromatic-c/03-D.mp3" as="audio" />
<link rel="preload" href="shepard-chromatic-c/04-Ds.mp3" as="audio" />
<link rel="preload" href="shepard-chromatic-c/05-E.mp3" as="audio" />
<link rel="preload" href="shepard-chromatic-c/06-F.mp3" as="audio" />
<link rel="preload" href="shepard-chromatic-c/07-Fs.mp3" as="audio" />
<link rel="preload" href="shepard-chromatic-c/08-G.mp3" as="audio" />
<link rel="preload" href="shepard-chromatic-c/09-Gs.mp3" as="audio" />
<link rel="preload" href="shepard-chromatic-c/10-A.mp3" as="audio" />
<link rel="preload" href="shepard-chromatic-c/11-As.mp3" as="audio" />
<link rel="preload" href="shepard-chromatic-c/12-B.mp3" as="audio" />

<script>
  const files = [
    "shepard-chromatic-c/01-C.mp3",
    "shepard-chromatic-c/02-Cs.mp3",
    "shepard-chromatic-c/03-D.mp3",
    "shepard-chromatic-c/04-Ds.mp3",
    "shepard-chromatic-c/05-E.mp3",
    "shepard-chromatic-c/06-F.mp3",
    "shepard-chromatic-c/07-Fs.mp3",
    "shepard-chromatic-c/08-G.mp3",
    "shepard-chromatic-c/09-Gs.mp3",
    "shepard-chromatic-c/10-A.mp3",
    "shepard-chromatic-c/11-As.mp3",
    "shepard-chromatic-c/12-B.mp3",
  ];
  const audios = files.map(f => new Audio(f));
  audios.forEach((x, i) => {
    x.addEventListener('play', () => {
      document.getElementById(`pitch-${i}`).classList.add("active");
    })
    x.addEventListener('ended', () => {
      document.getElementById(`pitch-${i}`).classList.remove("active");
    })
  })
  const controller = new AbortController();
  function playTone(index, clearOnended = true) {
    const tone = audios[index];
    if (clearOnended) {
      tone.onended = undefined
    }
    if (tone.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
      tone.pause();
      tone.currentTime = 0;
      tone.play();
    }
  }
  function playTritone(index1) {
    const index2 = (index1 + 6) % 12;
    const tone1 = audios[index1];
    const tone2 = audios[index2];
    tone1.onended = () => {
      playTone(index2, false);
    };
    tone2.onended = () => {
      tone1.onended = undefined;
      tone2.onended = undefined;
    }
    playTone(index1, false);
  }
</script>

Have you heard of "Shepard tones"? They are produced when you play a note in every octave at once, so the "pitch height" is ambiguous.

Well, if you play one of these shepard tones (just a single note, like a <button class="inline" onclick="playTone(0)">C</button>) and you then play its tritone <button class="inline" onclick="playTone(6)">F♯</button> which is half an octave away, some people will hear the second note as higher, and some will hear it as lower.

Try it! <button class="inline" onclick="playTritone(0)">C => F♯</button>

Which you hear seems to depend on your perception of the first note as high or low, which is connected with how you process pitch in language (and therefore is not something you can easily change). People tend to hear the same thing their mother hears, and there are regional tendencies as well (England vs California have opposite tendencies).

This would only be possible if _everyone has a latent sense of absolute pitch_!

If you arrange the pitches in a loop or circle, you generally hear up for half of the circle and down for the other half, with a little ambiguity in the middle where you might be able to hear it either way.

I find that if you listen to them too quickly, they all seem to be in the same direction. But if you pause between each one, or jump around, you can identify which tones you always hear strongly in one direction, and which ones you can hear both directions. Try it out! See if people around you hear things differently than you.

<style>
  #shepard-piano {
    width: 40ch;
    height: 40ch;
    margin-inline: auto;
    position: relative;
  }
  .piano-key {
    position: absolute;
    background-color: var(--c-accent);
    transition: background-color 0.2s ease;
    font-size: 1.5em;
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%) rotate(calc(var(--index) * 30deg)) translateY(-10rem) rotate(calc(var(--index) * -30deg));
    &.active {
      background-color: var(--c-text) !important;
    }
  }
</style>

## Tritone paradox piano

<div id="shepard-piano">
  <button class="piano-key" id="pitch-0" style="--index: 0" onclick="playTritone(0)">C</button>
  <button class="piano-key" id="pitch-1" style="--index: 1" onclick="playTritone(1)">C♯</button>
  <button class="piano-key" id="pitch-2" style="--index: 2" onclick="playTritone(2)">D</button>
  <button class="piano-key" id="pitch-3" style="--index: 3" onclick="playTritone(3)">D♯</button>
  <button class="piano-key" id="pitch-4" style="--index: 4" onclick="playTritone(4)">E</button>
  <button class="piano-key" id="pitch-5" style="--index: 5" onclick="playTritone(5)">F</button>
  <button class="piano-key" id="pitch-6" style="--index: 6" onclick="playTritone(6)">F♯</button>
  <button class="piano-key" id="pitch-7" style="--index: 7" onclick="playTritone(7)">G</button>
  <button class="piano-key" id="pitch-8" style="--index: 8" onclick="playTritone(8)">G♯</button>
  <button class="piano-key" id="pitch-9" style="--index: 9" onclick="playTritone(9)">A</button>
  <button class="piano-key" id="pitch-10" style="--index: 10" onclick="playTritone(10)">A♯</button>
  <button class="piano-key" id="pitch-11" style="--index: 11" onclick="playTritone(11)">B</button>
</div>

## References and notes

This effect was first discovered by psychologist Diana Deutsch - read more and see references on [the Wikipedia entry for Tritone paradox](https://en.wikipedia.org/wiki/Tritone_paradox). Thanks to Joseph Sardin for his [shepard tone generator](https://bigsoundbank.com/generator/shepard.html) which produced these sounds. To make the tones a little less harsh and make the illusion as salient as possible, I tried to center the octaves on the human vocal range, 80hz to 1000hz.
