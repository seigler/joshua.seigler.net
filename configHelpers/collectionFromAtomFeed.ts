import fetch from "@11ty/eleventy-fetch";
import { XMLValidator, XMLParser } from "fast-xml-parser";

const webrollSource = "https://links.apps.seigler.net/feed/atom?&searchtags=%24webroll"
const webrollText = await fetch(webrollSource, { duration: "0s", type: "text" });
const webrollValid = XMLValidator.validate(webrollText);
let webrollFeed;
if (webrollValid === true) {
  webrollFeed = new XMLParser({
    ignoreAttributes: false,
  }).parse(webrollText).feed.entry;
} else {
  throw new Error(`Invalid XML from webroll feed. Reason: ${webrollValid.err.msg}`);
}
console.log(webrollFeed);
const webrollPosts = webrollFeed.map(bookmark => {
  return {
    date: new Date(bookmark.published),
  }
});
