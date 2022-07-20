<script>
export default {
  data() {
    return { posts: [], userName: "" };
  },
  created() {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((json) => {
        this.posts = json;
      });
    fetch(
      `https://jsonplaceholder.typicode.com/users/this.${route.query.userId}`
    )
      .then((response) => response.json())
      .then((json) => {
        this.userName = json.name;
      });
  },
};
</script>

<template>
  <main>
    <h1>Posts of {{ userName }}</h1>
    <div class="post" v-for="post in posts">
      <div class="post-content">
        <strong class="post-title">{{ post.title }}</strong>
        <p class="post-body">{{ post.body }}</p>
      </div>
    </div>
  </main>
</template>

<style scoped>
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
</style>
