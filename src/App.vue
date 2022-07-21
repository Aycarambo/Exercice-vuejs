<script setup>
import Home from "./components/TheWelcome.vue";
import Posts from "./Posts.vue";
</script>

<script>
const routes = {
  "/": { route: Home, name: "Home" },
  "/posts": { route: Posts, name: "Posts" },
};
export default {
  data() {
    return {
      currentPath: window.location.hash,
    };
  },
  computed: {
    currentView() {
      return routes[this.currentPath.slice(1) || "/"].route || NotFound;
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
    <a
      v-for="(route, url) in routes"
      :key="route.name"
      class="header-item"
      :class="{ 'header-item-current': this?.currentPath === `#${url}` }"
      :href="`#${url}`"
    >
      {{ route.name }}
    </a>
  </header>
  <component class="content" :is="currentView" />
</template>

<style scoped>
@font-face {
  font-family: "Inter";
  src: local("Inter"), url(./fonts/Inter-V.ttf);
}
.header {
  text-align: center;
  vertical-align: middle;
  font-size: 20px;
  font-family: Inter;
  width: 100%;
  height: 100px;
  padding-top: 38px;
  position: fixed;
  border: 1px solid white;
  z-index: 1000;
  background-color: white;
}

.header-item {
  color: black;
  margin-right: 42px;
  font-weight: 500;
}

.header-item-current {
  font-weight: 800;
  border-bottom: 1px solid black;
  padding-bottom: 5px;
}
.header-item:hover {
  background-color: hsla(160, 100%, 0%, 0.2);
}
.content {
  padding-top: 100px;
  max-width: 1100px;
  margin-left: 50px;
  margin-right: 50px;
  font-size: 16px;
  font-weight: 400;
}
</style>
