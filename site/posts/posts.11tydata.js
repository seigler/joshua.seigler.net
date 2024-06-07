module.exports = {
  layout: "post.njk",
  permalink: "/posts/{{ title | slugify }}/",
  tags: ["posts"],
  author: "Joshua Seigler",
  eleventyComputed: {
    date: "{{ page.date }}"
  }
};
