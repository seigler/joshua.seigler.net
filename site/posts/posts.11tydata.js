module.exports = {
  layout: "post.njk",
  permalink: "/posts/{{ slug | default:title | slugify }}/",
  tags: ["posts"],
  author: "Joshua Seigler",
  eleventyComputed: {
    date: "{{ page.date }}",
    slug: "{{ page.slug }}"
  }
};
