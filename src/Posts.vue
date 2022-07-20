<script>
import { notify } from "@kyvg/vue3-notification";
export default {
  data() {
    return {
      posts: [],
      unfilteredPosts: [],
      users: [],
      arePostsFiltered: false,
    };
  },
  created() {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((json) => {
        this.posts = json;
        this.unfilteredPosts = json;
        console.log(this.posts);
      });
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) => {
        this.users = json;
        console.log(this.users);
      });
  },
  methods: {
    filterPostsByUser(userId) {
      if (userId) {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });

        notify({ title: `Posts de ${this.users[userId - 1].name} seulement` });
        this.arePostsFiltered = true;
        this.posts = this.posts.filter((p) => p.userId === userId);
      }
    },
    unfilterPosts() {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });

      notify({ title: `Tous les posts` });
      this.arePostsFiltered = false;
      this.posts = this.unfilteredPosts;
    },
  },
};
</script>

<template>
  <main>
    <button @click="unfilterPosts" class="reset-button" v-if="arePostsFiltered">
      Voir tous les posts
    </button>
    <div class="post" v-for="post in posts" :key="post.id">
      <div class="post-user">
        <a @click="filterPostsByUser(post.userId)">
          {{ users[post.userId - 1]?.name || "" }}
        </a>
      </div>
      <div class="post-content">
        <strong class="post-title">{{ post.title }}</strong>
        <p class="post-body">{{ post.body }}</p>
      </div>
    </div>
  </main>
</template>

<style scoped>
.reset-button {
  cursor: pointer;
  position: fixed;
  z-index: 1000;
  top: 50px;
  right: 0;
  height: 30px;
}
.post {
  padding: 5px;
  border: 1px solid white;
  margin-bottom: 20px;
  display: flex;
}

a {
  cursor: pointer;
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
