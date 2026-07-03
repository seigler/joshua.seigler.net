## Prerequisites

- node@20 or newer
- [mise](https://mise.jdx.dev/) (optional) to install dependencies

## Usage

### `npm run dev`

Serve the site with hot-reloads for development.

### `npm run build`

Build the site to `dist/`.

### `npm run publish`

Built the site, then push `dist/` to `gh-pages@origin`.

## Colophon

This is an Eleventy blog. The template and CSS are all original, with tag based collections and content committed as markdown.
It uses collection definitions (like `posts.11tydata.js`) to define common properties for each folder of markdown content and to attach tags or calculated values like keywords and permalink. There is an XML sitemap for Google and each collection has its own Atom feed, in addition to the main site feed which collects everything except for `pages` and `timeline`.