<script>
export default {
  async asyncData({ $content, params }) {
    const about = await $content('about').fetch()
    return { about }
  },
}
</script>

<template>
  <main>
    <article class="card padded bright rounded m-b">
      <nuxt-content :document="about" />
    </article>
  </main>
</template>
