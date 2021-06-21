<script>
export default {
  async asyncData({ $content, params }) {
    const timeline = await $content('timeline')
      .only(['title', 'time', 'description'])
      .sortBy('time', 'desc')
      .fetch()

    return {
      timeline,
    }
  },
}
</script>

<template>
  <main>
    <div class="card bright rounded padded">
      <h1>Timeline</h1>
      <p>
        Here are some significant events from my life, focusing on my education
        and professional development.
      </p>
    </div>
    <ul>
      <li v-for="entry of timeline" :key="entry.time">
        <header>
          <h2>{{ entry.title }}</h2>
          <div>{{ entry.time }}</div>
        </header>
        <div>{{ entry.description }}</div>
      </li>
    </ul>
  </main>
</template>

<style scoped>
ul {
  list-style: none;
  padding: 0;
}
li {
  position: relative;
  margin: 0 0 2rem 3rem;
  padding: 1rem;
  background-color: var(--backgroundColorBright);
  border-radius: 1rem;
}
li::before {
  content: none;
}
header {
  display: flex;
  justify-content: space-between;
}
header::after,
header::before {
  content: '';
  position: absolute;
  left: -1.5rem;
  top: 1rem;
}
li:not(:last-child) header::after {
  box-sizing: content-box;
  width: 0.5rem;
  height: 100%;
  padding-bottom: 2rem;
  margin: 0.5rem 0 0 -0.25rem;
  background-color: var(--textColorFaint);
}
header::before {
  height: 1rem;
  width: 1rem;
  margin-left: -0.5rem;
  margin-top: 0.1rem;
  border-radius: 50%;
  background-color: var(--textColor);
  z-index: 1;
}
h2 {
  font-weight: bold;
  font-size: inherit;
}
h2::before {
  content: '';
  position: absolute;
  top: 1.1rem;
  right: 100%;
  border: 0.5rem solid transparent;
  border-right: 0.75rem solid var(--backgroundColorBright);
}
</style>
