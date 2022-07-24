<script setup>
import Home from "./components/TheWelcome.vue";
import Posts from "./Posts.vue";
import Todos from "./Todos.vue";
import Albums from "./Albums.vue";
</script>

<script>
const routes = {
  "/": { route: Home, name: "Home" },
  "/posts": { route: Posts, name: "Posts" },
  "/albums": { route: Albums, name: "Albums" },
  "/todos": { route: Todos, name: "Todos" },
};
export default {
  data: {
    currentPath: "",
  },
  data() {
    return {
      users: [],
      currentPath: window.location.hash || "",
      currentUser: { signedIn: false, user: {} },
      showSignInModal: false,
    };
  },
  computed: {
    currentView() {
      return routes[this.currentPath.slice(1) || "/"].route || NotFound;
    },
  },
  created() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) => {
        this.users = json;
      });
  },
  mounted() {
    window.addEventListener("hashchange", () => {
      this.currentPath = window.location.hash || "";
    });
  },
  methods: {
    signIn(userId) {
      this.currentUser.signedIn = true;
      this.currentUser.user = this.users?.[userId - 1];
      this.showSignInModal = false;
    },
    signOut() {
      this.currentUser.signedIn = false;
      this.currentUser.user = {};
      if (this.currentPath === "#/todos") {
        window.location.hash = "/";
      }
    },
  },
};
</script>

<template>
  <notifications />
  <header class="header">
    <span v-for="(route, url) in routes" :key="route.name">
      <a
        class="header-item"
        :class="{ 'header-item-current': currentPath === `#${url}` }"
        :href="`#${url}`"
        v-if="url !== '/todos' || currentUser.signedIn"
      >
        {{ route.name }}
      </a>
    </span>
    <div v-if="currentUser.signedIn" class="flex-col">
      <a @click="signOut">Sign out</a>
      <p>{{ currentUser.user.username }}</p>
    </div>
    <a
      v-if="!currentUser.signedIn"
      class="sign-in"
      @click="showSignInModal = true"
      >Sign in</a
    >
  </header>
  <div v-if="showSignInModal" class="sign-in-modal">
    <button class="back-button" @click="showSignInModal = false">⤌</button>
    <h1>Sign in as :</h1>
    <ul>
      <li v-for="user in users" :key="user.id" class="user">
        <a @click="signIn(user.id)">{{ user.username }}</a>
      </li>
    </ul>
  </div>
  <component class="content" :is="currentView" :user="currentUser.user" />
</template>

<style scoped>
@font-face {
  font-family: "Inter";
  src: local("Inter"), url(./fonts/Inter-V.ttf);
}

.sign-in {
  height: 32px;
}

.sign-in-modal {
  z-index: 99999;
  position: fixed;
  top: 5%;
  left: 5%;
  width: 90%;
  height: 90%;
  background-color: #f2f2f2;
  border-radius: 25px;
  border: 1px solid white;
  text-align: center;
  overflow-y: auto;
}

.sign-in-modal ul {
  list-style-type: none;
}

.sign-in-modal h1 {
  margin-top: 5%;
  margin-bottom: 50px;
}

.user {
  font-size: 20px;
  margin-bottom: 5px;
}
.back-button {
  position: absolute;
  top: 10px;
  left: 25px;
  border: none;
  background-color: #f2f2f2;
  font-size: 35px;
  cursor: pointer;
}
.header {
  display: flex;
  justify-content: center;
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

.header p {
  line-height: 10px;
  font-size: 14px;
}

.header-item {
  color: black;
  margin-right: 42px;
  font-weight: 500;
}

.header-item-current {
  font-weight: 800;
  border-bottom: 3px solid black;
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
