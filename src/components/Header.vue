<script setup>
import TheWelcome from "./TheWelcome.vue";
import Posts from "./../Posts.vue";
</script>

<script>
const routes = {
  "/": TheWelcome,
  "/posts": Posts,
};
export default {
  data() {
    return {
      currentPath: window.location.hash,
    };
  },
  computed: {
    currentView() {
      return routes[this.currentPath.slice(1) || "/"] || NotFound;
    },
  },
  mounted() {
    window.addEventListener("hashchange", () => {
      this.currentPath = window.location.hash;
    });
  },
};
</script>

<template>
  <header class="header">
    <a href="#/">Home</a> | <a href="#/posts">Posts</a>
  </header>
  <component class="content" :is="currentView" />
</template>

<style scoped>
.header {
  width: 100%;
  position: absolute;
  border: 1px solid white;
  height: 25px;
}

.content {
  margin-top: 25px;
}
</style>
