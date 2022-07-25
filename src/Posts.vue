<script>
import { notify } from "@kyvg/vue3-notification";
export default {
  data() {
    return {
      posts: [],
      unfilteredPosts: [],
      users: [],
      arePostsFiltered: false,
      maximizedPost: {
        isAPostSelected: false,
        post: {},
        comments: [],
      },
    };
  },
  created() {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((json) => {
        this.posts = json;
        this.unfilteredPosts = json;
      });
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) => {
        this.users = json;
      });
  },
  methods: {
    selectPost(postId) {
      this.maximizedPost.isAPostSelected = true;
      this.maximizedPost.post = this.unfilteredPosts[postId - 1];
      fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
        .then((response) => response.json())
        .then((json) => {
          this.maximizedPost.comments = json;
        });
    },
    unselectPost() {
      this.maximizedPost.isAPostSelected = false;
      this.maximizedPost.post = {};
      this.maximizedPost.comments = [];
    },
    filterPostsByUser(userId, e) {
      e.preventDefault();
      if (userId) {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });

        notify({ title: `Posts from ${this.users[userId - 1].name} only` });
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

      notify({ title: `All posts` });
      this.arePostsFiltered = false;
      this.posts = this.unfilteredPosts;
    },
    showAllPosts() {
      this.unfilterPosts();
      this.unselectPost();
    },
  },
};
</script>

<template>
  <main>
    <button
      @click="showAllPosts"
      class="reset-button"
      v-if="arePostsFiltered || maximizedPost.isAPostSelected"
    >
      ⤌ See all posts
    </button>
    <div
      v-if="!maximizedPost.isAPostSelected"
      class="post"
      v-for="post in posts"
      :key="post.id"
      @click="selectPost(post.id)"
    >
      <div class="post-user">
        <a @click.stop="filterPostsByUser(post.userId, $event)">
          {{ users[post.userId - 1]?.name || "" }}
        </a>
      </div>
      <div class="post-content">
        <strong class="post-title">{{ post.title }}</strong>
        <p class="post-body">{{ post.body }}</p>
      </div>
    </div>

    <div v-if="maximizedPost.isAPostSelected">
      <div class="post-maximized">
        <div class="post-user">
          <p>
            {{ users[maximizedPost.post.userId - 1]?.name || "" }}
          </p>
        </div>
        <div class="post-content">
          <strong class="post-title">{{ maximizedPost.post.title }}</strong>
          <p class="post-body">{{ maximizedPost.post.body }}</p>
        </div>
      </div>
      <div
        v-for="comment in maximizedPost.comments"
        :key="comment.id"
        class="comment"
      >
        ↪
        <div class="comment-content">
          <div class="comment-user">{{ comment.email.split("@")[0] }}</div>
          <div class="comment-body">{{ comment.body }}</div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.reset-button {
  cursor: pointer;
  height: 30px;
  border: none;
  background-color: white;
  color: #00bd7e;
}

.post-maximized {
  padding: 5px;
  border: 1px solid white;
  margin-bottom: 20px;
  display: flex;
  background-color: #f2f2f2;
  border-radius: 25px;
  font-size: 20px;
}

.comment {
  display: flex;
  font-size: 25px;
  margin-left: 20px;
}
.comment-content {
  padding: 5px;
  border: 1px solid white;
  margin-bottom: 20px;
  margin-left: 20px;
  display: flex;
  background-color: #f2f2f2;
  border-radius: 15px;
  font-size: 16px;
}

.comment-user {
  margin-left: 34px;
  max-width: 100px;
  text-align: center;
  min-width: 100px;
  padding: 5px;
  text-overflow: ellipsis;
  overflow: hidden;
}

.comment-body {
  margin-left: 50px;
  text-align: left;
}
.post {
  padding: 5px;
  border: 1px solid white;
  margin-bottom: 20px;
  display: flex;
  background-color: #f2f2f2;
  border-radius: 25px;
  cursor: pointer;
}

a {
  cursor: pointer;
}
.post-user {
  margin-left: 34px;
  max-width: 100px;
  text-align: center;
  min-width: 100px;
  padding: 5px;
  text-overflow: ellipsis;
  overflow: hidden;
}

.post-content {
  margin-left: 50px;
  text-align: left;
  display: flex;
  flex-direction: column;
}

.post-title {
  font-weight: 700;
}

.post-body {
}
</style>
