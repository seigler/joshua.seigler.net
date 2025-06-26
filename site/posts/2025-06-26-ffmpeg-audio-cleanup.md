---
title: FFmpeg audio cleanup
description: A script to apply dynamic compression and noise reduction to audio files
date: 2025-06-26
slug: ffmpeg-audio-cleanup
tags:
  - technical
  - ffmpeg
---

I recently needed to process 20+ phone audio recordings. The files are mp3 recordings in stereo, made in an environment with echoes and noise from fans/heaters.

Although I could do it easily with [Tenacity](https://tenacityaudio.org/) I didn't want to use a manual process, since it would take days. So I tried using FFmpeg filters and Bash scripting.

I found an FFmpeg filter called [compand](https://ffmpeg.org/ffmpeg-filters.html#compand) which lets you map an input decibel range to an output decibel range. I also used the [anlmdn](https://ffmpeg.org/ffmpeg-filters.html#anlmdn) filter to reduce noise, and the [highpass](https://ffmpeg.org/ffmpeg-filters.html#highpass) filter to help with clarity.

I ran into a couple gotchas.

1. `mpv` does something special for audio playback that prevents audio from clipping. `vlc` plays the file as it is.
2. Because the compressor has an attack and decay (which is necessary for things to sound good) it can cause clipping if the volume rises sharply. Applying a `delay` parameter with half the duration of the attack length fixed this.

Here is the script:

```bash
#!/bin/bash
if [ "$#" == "0" ]; then
  echo "Error: no arguments provided."
  echo "Usage: $0 file1 file2 file3 ..."
  echo "   or: $0 *.ext"
  exit 1
fi

trap "exit" INT

while [ "$#" != "0" ]; do
  base="${1%%.*}"
  ext="${1##*.}"
  outfile="./normalized--$base.$ext"
  if [ ! -f "$outfile" ]; then
    echo "Processing $1"
    ffmpeg -i "$1" -v warning -ac 1 -af "compand=attacks=0.3:decays=0.3:delay=0.15:points=-80/-300|-45/-25|-27/-15|0/-12|20/-12,anlmdn=s=10,highpass=f=500" -threads 4 "$outfile"
  else
    echo "Skipping $1, already processed."
  fi
  shift
done
```

If this is useful to you please leave a comment or send an email, I would love to hear about it.