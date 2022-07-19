<script setup>
import HelloWorld from "./components/HelloWorld.vue";
import TheWelcome from "./components/TheWelcome.vue";
</script>

<script>
export default {
  data() {
    return { posts: [], users: [] };
  },
  created() {
    /*fetch("https://jsonplaceholder.typicode.com/todos/1")
      .then((response) => response.json())
      .then((json) => console.log(json));*/
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((json) => {
        this.posts = json;
        console.log(this.posts);
      });
    /*fetch("https://jsonplaceholder.typicode.com/comments")
      .then((response) => response.json())
      .then((json) => console.log(json));*/
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) => {
        this.users = json;
        console.log(this.users);
      });
    /* fetch("https://jsonplaceholder.typicode.com/albums")
      .then((response) => response.json())
      .then((json) => console.log(json));
    fetch("https://jsonplaceholder.typicode.com/photos")
      .then((response) => response.json())
      .then((json) => console.log(json));*/
  },
};
</script>

<template>
  <main>
    <div class="post" v-for="post in posts">
      <div class="post-user">{{ users[post.userId - 1].name }}</div>
      <div class="post-content">
        <strong class="post-title">{{ post.title }}</strong>
        <p class="post-body">{{ post.body }}</p>
      </div>
    </div>
  </main>
  <!-- <header>
    <h1>{{ data }}</h1>
    <img
      alt="Vue logo"
      class="logo"
      src="./assets/logo.svg"
      width="125"
      height="125"
    />

    <div class="wrapper">
      <HelloWorld :msg="data" />
    </div>
  </header>

  <main>
    <TheWelcome />
  </main> -->
</template>

<style scoped>
strong {
  font-weight: bold;
}

.post {
  padding: 5px;
  border: 1px solid white;
  margin-bottom: 20px;
  display: flex;
}

.post-user {
  min-width: 100px;
}

.post-content {
  display: flex;
  flex-direction: column;
}

.post-title {
  font-size: 30px;
}

.post-body {
  font-size: 24px;
}

@media (min-width: 1024px) {
  /* laptop specific styling */
}
</style>
