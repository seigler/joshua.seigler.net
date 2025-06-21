export default {
  layout: "post.njk",
  permalink: "/posts/{{ slug | default:title | slugify }}/",
  tags: ["posts"],
  author: "Joshua Seigler",
  eleventyComputed: {
    date: "{{ page.date }}",
    slug: "{{ page.slug }}",
    keywords: (data) => data.tags.join(", "),
    permalink: (data) => {
      if (process.env.ELEVENTY_RUN_MODE !== "build") return data.permalink;
      else return data.draft ? false : data.permalink;
    },
    eleventyExcludeFromCollections: (data) => {
      if (process.env.ELEVENTY_RUN_MODE !== "build") return false;
      else return data.draft ?? false;
    },
  },
};
