const fs = require('fs');

module.exports = function (eleventyConfig) {
  const slugify = eleventyConfig.getFilter('slugify')
  eleventyConfig.addPassthroughCopy("assets")
  eleventyConfig.addPassthroughCopy("site/music", {
    rename: (fileName) => {
      const name = fileName.slice(0, -4)
      return `${slugify(name)}.pdf`
    }
  });
  const musicFiles = fs.readdirSync("./site/music/").filter(function (fileName) {
    return fileName.endsWith('.pdf')
  }).map(function (filename) {
    return filename.split('.pdf')[0]
  });
  eleventyConfig.addGlobalData('music', musicFiles);
  return {
    dir: {
      input: "site",
      output: "dist",
    },
  };
};
