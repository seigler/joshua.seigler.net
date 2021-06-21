<script>
export default {
  async asyncData({ $content, params }) {
    const index = await $content('index').fetch()
    const newPosts = await $content('posts')
      .only(['title', 'date', 'description', 'img', 'slug', 'author'])
      .sortBy('date', 'desc')
      .limit(4)
      .fetch()
    return { index, newPosts }
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
  <main>
    <article class="card padded bright rounded m-b">
      <nuxt-content :document="index" />
    </article>
    <div class="card padded bright rounded">
      <h2>Freshest Content</h2>
      <ul>
        <li v-for="post of newPosts" :key="post.slug">
          <div>
            <time>{{ formatDate(post.date) }}</time>
            <NuxtLink :to="{ name: 'posts-slug', params: { slug: post.slug } }">
              {{ post.title }}
            </NuxtLink>
            <p class="linkDescription">{{ post.description }}</p>
          </div>
        </li>
      </ul>
    </div>
  </main>
</template>

<style scoped>
time {
  float: right;
}
.linkDescription {
  margin-top: 0;
}
</style>
