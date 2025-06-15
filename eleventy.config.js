import fs from "fs";
import path from "path";
import md from "markdown-it";
import mdAnchor from "markdown-it-anchor";
import { spoiler as mdSpoiler } from "@mdit/plugin-spoiler";
import { footnote as mdFootnote } from "@mdit/plugin-footnote";
import mdLinkAttributes from "markdown-it-link-attributes";
import prettier from "prettier";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import clean from "eleventy-plugin-clean";
import site from "./site/_data/site.js";
import { feedPlugin } from "@11ty/eleventy-plugin-rss";
import { execSync } from 'child_process';
import eleventyAutoCacheBuster from "eleventy-auto-cache-buster";
import mdPrism from "markdown-it-prism";

dayjs.extend(utc);

export default (config) => {
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
    .use(mdSpoiler, {
      tag: "span",
      attrs: [["class", "aside"]]
    })
    .use(mdLinkAttributes, {
      matcher(href) {
        return href.match(/^https?:\/\//);
      },
      attrs: {
        target: "_blank",
        rel: "noopener",
      },
    })
    .use(mdPrism);
  mdLib.renderer.rules.render_footnote_anchor = (tokens, idx, options, env, slf) => {
    let id = slf.rules.footnote_anchor_name(tokens, idx, options, env, slf)
    if (tokens[idx].meta.subId > 0) id += `:${tokens[idx].meta.subId}`
    /* ↩ with escape code to prevent display as Apple Emoji on iOS */
    return ` <a href="#fnref${id}" class="footnote-backref">\u21a9\uFE0E</a>`
  };
  config.setLibrary("md", mdLib);
  config.addPassthroughCopy({
    assets: "/",
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
    if (typeof outputPath !== "string") {
      return content;
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
  });

  config.addFilter("absoluteURL", (url) => {
    return new URL(url, site.baseUrl).href;
  });
  config.addFilter("toISOString", (dateString) => {
    return new Date(dateString).toISOString();
  });
  config.addFilter("formatDate", (date, format) => {
    return dayjs(date).utc().format(format);
  });
  config.addFilter("markdown", (markdownString) => {
    return mdLib.renderInline(String(markdownString ?? "").trim());
  });

  clean.updateFileRecord("dist");

  const buildTime = new Date().toISOString().replace(/[:.-]/g, "");
  config.addGlobalData("buildTime", buildTime);

  config.addPlugin(feedPlugin, {
    type: "atom", // "atom", ""rss", or "json"
    outputPath: "/feed.xml",
    collection: {
      name: "posts", // iterate over `collections.posts`
      limit: 0, // 0 means no limit
    },
    metadata: {
      language: "en",
      title: site.title,
      subtitle: site.description,
      base: site.baseUrl,
      author: {
        name: "Joshua Seigler",
        // email: "", // Optional
      },
    },
    stylesheet: "/simple-atom.xslt",
  });

  config.addPlugin(eleventyAutoCacheBuster);

  config.on('eleventy.after', () => {
    execSync(`npx pagefind --site dist --glob \"**/*.html\"`, { encoding: 'utf-8' });
  });

  return {
    dir: {
      input: "site",
      output: "dist",
    },
  };
};
