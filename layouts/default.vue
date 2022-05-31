<template>
  <div>
    <Navbar />
    <div class="card wide m-h-auto">
      <Nuxt />
    </div>
  </div>
</template>

<style>
@font-face {
  font-family: 'Vollkorn';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: local('☺'), url(/fonts/Vollkorn_400_normal.woff2) format('woff2'),
    /* http://fonts.gstatic.com/s/vollkorn/v13/0ybgGDoxxrvAnPhYGzMlQLzuMasz6Df2MHGuHA.woff2 */
      url(/fonts/Vollkorn_400_normal.woff) format('woff'); /* http://fonts.gstatic.com/s/vollkorn/v13/0ybgGDoxxrvAnPhYGzMlQLzuMasz6Df2MHGuGg.woff */
}
@font-face {
  font-family: 'Vollkorn';
  font-style: italic;
  font-weight: 400;
  font-display: swap;
  src: local('☺'), url(/fonts/Vollkorn_400_italic.woff2) format('woff2'),
    /* http://fonts.gstatic.com/s/vollkorn/v13/0ybuGDoxxrvAnPhYGxksckM2WMCpRjDj-DJGWmmc.woff2 */
      url(/fonts/Vollkorn_400_italic.woff) format('woff'); /* http://fonts.gstatic.com/s/vollkorn/v13/0ybuGDoxxrvAnPhYGxksckM2WMCpRjDj-DJGWmma.woff */
}

:root {
  --textColor: #222;
  --textColorFaint: #0006;
  --backgroundColor: #ccc;
  --backgroundColorBright: #fff8;
  --backgroundOverlayColor: #ddd4;
  --gap: 1rem;
  --brightShadowColor: #fffc;
  --darkShadowColor: #0003;
  --maxWidth: 40rem;
  --fontPlus1: 1.333em;
  --fontPlus2: 1.777em;
  --fontPlus3: 2.369rem;
  --fontMinus1: 0.75em;
  --fontMinus2: 0.563em;
  --fontMinus3: 0.422em;
}

*,
::after,
::before {
  box-sizing: inherit;
  font-size: 1em;
}
body {
  margin: 0;
  font-size: 1rem;
  box-sizing: border-box;
}
h1,
h2,
h3,
h4,
h5,
h6,
.heading {
  font-weight: 700;
  margin: 0;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
th,
td {
  text-align: left;
  vertical-align: top;
}
img,
iframe {
  border: 0;
}
ul {
  list-style: none;
  padding: 0;
}

html {
  font-family: 'Vollkorn', serif;
  font-size: 120%;
  color: var(--textColor);
  height: 100%;
}
body {
  min-height: 100%;
  padding: var(--gap);
  background-image: url(/background.svg);
  background-position: center;
  background-size: cover;
  background-attachment: fixed;
}
@supports (backdrop-filter: blur(2rem)) {
  body {
    background-image: url(/background.jpg);
    backdrop-filter: blur(2rem);
  }
}
a {
  color: blue;
}
ul > li {
  padding-left: 1ch;
}
ul > li::before {
  position: absolute;
  margin-left: -1ch;
  content: '› ';
  color: var(--textColorFaint);
}
li > header {
  display: flex;
  justify-content: space-between;
}
sup {
  margin-top: -1ch;
  display: inline-block;
}
.fp1,
h3 {
  font-size: 1.333em;
}
.fp2,
h2 {
  font-size: 1.777em;
}
.fp3,
h1 {
  font-size: 2.369rem;
}
.fm1 {
  font-size: 0.75em;
}
.fm2 {
  font-size: 0.563em;
}
.fm3 {
  font-size: 0.422em;
}
.grid {
  display: grid;
  gap: var(--gap);
  grid-auto-flow: row dense;
  grid-template-columns: auto;
}
.gridFloatRight {
  grid-column-end: -1;
}
@media (min-width: 40rem) {
  .grid {
    grid-template-columns: 1fr 1fr;
  }
}
[hovertext]:hover::before {
  content: attr(hovertext);
  position: absolute;
  margin-top: -2em;
  padding: 0.25em;
  line-height: 1;
  border-radius: 0.25em;
  background-color: var(--backgroundColorBright);
}
.collectionItem + .collectionItem {
  margin-top: var(--gap);
}

.card {
  max-width: var(--maxWidth);
}
.padded {
  padding: var(--gap);
}
.spaced {
  margin: var(--gap);
}
.wide {
  width: 100%;
}
.m {
  margin: var(--gap);
}
.m-t {
  margin-top: var(--gap);
}
.m-b {
  margin-bottom: var(--gap);
}
.m-v {
  margin-top: var(--gap);
  margin-bottom: var(--gap);
}
.m-h {
  margin-left: var(--gap);
  margin-right: var(--gap);
}
.m-h-auto {
  margin-left: auto;
  margin-right: auto;
}
.text-faint {
  color: var(--textColorFaint);
}
.text-normal {
  color: var(--textColor);
}
.bright {
  background-color: var(--backgroundColorBright);
}
.rounded {
  border-radius: var(--gap);
}
</style>
