<script setup>
import TheWelcome from "./components/TheWelcome.vue";
import Posts from "./Posts.vue";
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
  <notifications />
  <header class="header">
    <a href="#/">Home</a> | <a href="#/posts">Posts</a>
  </header>
  <component class="content" :is="currentView" />
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 25px;
  width: 100%;
  height: 50px;
  position: fixed;
  border: 1px solid white;
  z-index: 1000;
  background-color: var(--color-background);
}

.content {
  padding-top: 70px;
  max-width: 1100px;
  margin-left: 50px;
  margin-right: 50px;
}
</style>
