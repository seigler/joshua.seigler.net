import fs from "fs"
import path from "path"
import md from "markdown-it"
import mdAnchor from "markdown-it-anchor"
import { spoiler as mdSpoiler } from "@mdit/plugin-spoiler"
import { footnote as mdFootnote } from "@mdit/plugin-footnote"
import mdLinkAttributes from "markdown-it-link-attributes"
import mdPrism from "markdown-it-prism"
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc.js"
import site from "./site/_data/site.js"
import clean from "eleventy-plugin-clean"
import toc from "eleventy-plugin-toc"
import { feedPlugin as EleventyFeedPlugin } from "@11ty/eleventy-plugin-rss"
import EleventyVitePlugin from "@11ty/eleventy-plugin-vite"
import { ViteMinifyPlugin } from "vite-plugin-minify"
import { execSync } from "child_process"
import fetch from "@11ty/eleventy-fetch"
import { XMLValidator, XMLParser } from "fast-xml-parser"

dayjs.extend(utc)

export default async (config) => {
  const slugify = config.getFilter("slugify")
  const url = config.getFilter("url")
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
      attrs: [["class", "aside"]],
    })
    .use(mdLinkAttributes, {
      matcher(href) {
        return href.match(/^https?:\/\//)
      },
      attrs: {
        target: "_blank",
        rel: "noopener",
      },
    })
    .use(mdPrism)
  mdLib.renderer.rules.render_footnote_anchor = (
    tokens,
    idx,
    options,
    env,
    slf
  ) => {
    let id = slf.rules.footnote_anchor_name(tokens, idx, options, env, slf)
    if (tokens[idx].meta.subId > 0) id += `:${tokens[idx].meta.subId}`
    /* ↩ with escape code to prevent display as Apple Emoji on iOS */
    return ` <a href="#fnref${id}" class="footnote-backref">\u21a9\uFE0E</a>`
  }
  config.setLibrary("md", mdLib)
  config.addPassthroughCopy({
    assets: "/",
  })

  // collection from music folder
  config.addPassthroughCopy("site/music", {
    rename: (filename) => {
      const ext = path.extname(filename)
      const base = path.basename(filename, ext)
      return `${slugify(base)}${ext}`
    },
  })
  config.addCollection("music", () => {
    const musicFiles = fs.readdirSync("./site/music/").map((filename) => {
      const ext = path.extname(filename)
      const base = path.basename(filename, ext)
      const absUrl = `/music/${slugify(base)}${ext}`
      return {
        data: {
          title: base,
          tags: ["music"],
        },
        url: url(absUrl),
      }
    })
    return musicFiles
  })

  config.addCollection("categories", (collectionApi) => {
    const posts = collectionApi
      .getFilteredByTag("posts")
      .filter((p) => !p.data.draft || process.env.ELEVENTY_RUN_MODE !== "build")

    const categories = posts.reduce((tags, post) => {
      post.data.tags
        .filter((tag) => tag !== "posts")
        .forEach((tag) => {
          const prev = tags[tag] ?? { id: Object.keys(tags).length, count: 0 }
          tags[tag] = { ...prev, count: prev.count + 1 }
        })
      return tags
    }, {})
    return Object.fromEntries(
      Object.entries(categories).sort((a, b) => {
        return b[1].count - a[1].count
      })
    )
  })

  config.addCollection("webroll", fetchShaarliWebroll)

  config.addFilter("toISOString", (dateString) => {
    return new Date(dateString).toISOString()
  })
  config.addFilter("formatDate", (date, format) => {
    return dayjs(date).utc().format(format)
  })
  config.addFilter("markdown", (markdownString) => {
    return mdLib.renderInline(String(markdownString ?? "").trim())
  })

  clean.updateFileRecord("dist")

  const buildTime = new Date().toISOString().replace(/[:.-]/g, "")
  config.addGlobalData("buildTime", buildTime)

  config.addPlugin(EleventyFeedPlugin, {
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
  })

  config.addPlugin(EleventyVitePlugin, {
    viteOptions: {
      appType: "mpa",
      publicDir: "assets/",
      server: {
        port: 8080,
        middleWareMode: true,
      },
      build: {
        mode: "production",
        emptyOutDir: true,
        sourcemap: true,
      },
      plugins: [ViteMinifyPlugin({})],
    },
  })

  config.addPlugin(toc)

  config.on("eleventy.after", () => {
    execSync(`npx pagefind --site dist --glob \"**/*.html\"`, {
      encoding: "utf-8",
    })
  })

  return {
    dir: {
      input: "site",
      output: "dist",
    },
  }
}

async function fetchShaarliWebroll() {
  const url = "https://links.apps.seigler.net/feed/atom?&searchtags=%24webroll"
  const urlTextContent = await fetch(url, { duration: "30s", type: "text" })
  const validation = XMLValidator.validate(urlTextContent)
  let feedContent
  if (validation === true) {
    feedContent = new XMLParser({
      ignoreAttributes: false,
    }).parse(urlTextContent).feed.entry
  } else {
    throw new Error(
      `Invalid XML from webroll feed. Reason: ${validation.err.msg}`
    )
  }
  const entries = feedContent.map((entry) => {
    return {
      url: entry.link["@_href"],
      data: {
        title: entry.title,
        date: new Date(entry.published),
        description: entry.content["#text"].split(
          '\n<br>&#8212; <a href="https://links.apps.seigler.net/'
        )[0],
        tags: entry.category
          .map((category) => category["@_label"])
          .filter((category) => category !== "$webroll"),
      },
    }
  })
  return entries
}
