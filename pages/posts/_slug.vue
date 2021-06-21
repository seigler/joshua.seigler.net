<script>
export default {
  async asyncData({ $content, params }) {
    const post = await $content('posts', params.slug).fetch()
    return { post }
  },
}
</script>

<template>
  <main class="card padded rounded bright">
    <h1>{{ post.title }}</h1>
    <nuxt-content :document="post" />
  </main>
</template>
