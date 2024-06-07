const isDev = process.env.ELEVENTY_ENV === "development";

const baseUrl = isDev ? "localhost:8080" : "https://joshua.seigler.net/";

module.exports = {
  title: "joshua.seigler.net",
  description: "Personal homepage of Joshua Seigler",
  baseUrl,
};
