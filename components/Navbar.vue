<template>
  <nav class="card padded bright rounded m-h-auto m-b">
    <div class="text-faint">joshua.seigler.net</div>
    <div class="links">
      <NuxtLink class="link" :to="`/`">Home</NuxtLink>
      <NuxtLink class="link" :to="`/about`">About</NuxtLink>
      <NuxtLink class="link" :to="`/posts`">Posts</NuxtLink>
      <NuxtLink class="link" :to="`/timeline`">Timeline</NuxtLink>
    </div>
  </nav>
</template>

<style scoped>
nav {
  margin-top: calc(-1 * var(--gap));
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  display: flex;
  gap: 1ex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.text-faint, .links {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.links {
  gap: 1ex;
}
.nuxt-link-exact-active {
  text-decoration: none;
  color: inherit;
  pointer-events: none;
  cursor: default;
}
</style>
