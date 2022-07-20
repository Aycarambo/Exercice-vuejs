<script>
export default {
  data() {
    return { posts: [], users: [] };
  },
  created() {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((json) => {
        this.posts = json;
        console.log(this.posts);
      });
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) => {
        this.users = json;
        console.log(this.users);
      });
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
