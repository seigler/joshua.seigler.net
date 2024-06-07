const fs = require("fs");
const path = require("path");
const md = require("markdown-it");
const mdAnchor = require("markdown-it-anchor");
const mdFootnote = require("markdown-it-footnote");
const prettier = require("prettier");
const clean = require("eleventy-plugin-clean");

module.exports = (config) => {
  const slugify = config.getFilter("slugify");
  const url = config.getFilter("url");
  const mdLib = md({
    html: true,
    breaks: true,
    linkify: true,
    typographer: true,
  })
    .use(mdAnchor, {
      permalink: mdAnchor.permalink.ariaHidden({
        placement: "before",
        symbol: "",
      }),
    })
    .use(mdFootnote)
  config.setLibrary("md", mdLib);
  config.addPassthroughCopy({
    "assets": "/"
  });

  // collection from music folder
  config.addPassthroughCopy("site/music", {
    rename: (filename) => {
      const ext = path.extname(filename);
      const base = path.basename(filename, ext);
      return `${slugify(base)}${ext}`;
    },
  });
  config.addCollection("music", () => {
    const musicFiles = fs.readdirSync("./site/music/").map((filename) => {
      const ext = path.extname(filename);
      const base = path.basename(filename, ext);
      const absUrl = `/music/${slugify(base)}${ext}`;
      return {
        data: {
          title: base,
          tags: ["music"],
        },
        url: url(absUrl),
      };
    });
    return musicFiles;
  });

  config.addTransform("prettier", (content, outputPath) => {
    if (typeof outputPath !== 'string') {
      return content
    }
    const extname = path.extname(outputPath);
    switch (extname) {
      case ".html":
      case ".css":
      case ".json":
        // Strip leading period from extension and use as the Prettier parser.
        const parser = extname.replace(/^./, "");
        return prettier.format(content, { parser });
      default:
        return content;
    }
  })

  clean.updateFileRecord("dist");
  return {
    dir: {
      input: "site",
      output: "dist",
    },
  };
};
