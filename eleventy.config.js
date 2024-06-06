const fs = require("fs");
const path = require("path");

module.exports = (config) => {
  const slugify = config.getFilter("slugify");
  const url = config.getFilter("url");
  config.addPassthroughCopy("assets");

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
          tags: ['music'],
        },
        url: url(absUrl),
      };
    });
    return musicFiles;
  });

  return {
    dir: {
      input: "site",
      output: "dist",
    },
  };
};
