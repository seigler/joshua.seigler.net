const isDev = process.env.ELEVENTY_ENV === "development";

const baseUrl = isDev ? "http://localhost:8080/" : "https://joshua.seigler.net/";

export default {
  language: "en-US",
  title: "joshua.seigler.net",
  description: "Personal homepage of Joshua Seigler",
  baseUrl,
  author: "Joshua Seigler",
};
