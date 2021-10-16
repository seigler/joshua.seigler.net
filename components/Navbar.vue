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
}
.links {
  margin-left: auto;
  display: flex;
}
.link {
  margin-left: 1ex;
}
.nuxt-link-exact-active {
  text-decoration: none;
  color: inherit;
  pointer-events: none;
  cursor: default;
}
</style>
