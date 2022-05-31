<script>
export default {
  async asyncData({ $content, params }) {
    const posts = await $content('posts')
      .only(['title', 'date', 'description', 'slug', 'author'])
      .sortBy('date', 'desc')
      .fetch()

    return {
      posts,
    }
  },
  methods: {
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString('en', options)
    },
  },
}
</script>

<template>
  <main class="card rounded padded bright">
    <h1>Posts</h1>
    <ul>
      <li v-for="post of posts" :key="post.slug">
        <div>
          <time>{{ formatDate(post.date) }}</time>
          <NuxtLink :to="{ name: 'posts-slug', params: { slug: post.slug } }">
            {{ post.title }}
          </NuxtLink>
          <p>{{ post.description }}</p>
        </div>
      </li>
    </ul>
  </main>
</template>

<style scoped>
time {
  float: right;
}
p {
  margin-top: 0;
}
</style>
