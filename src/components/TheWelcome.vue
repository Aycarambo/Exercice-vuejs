<script>
export default {
  methods:{
    signIn() {
      document?.getElementsByClassName("sign-in")?.[0].click()
    }
  }
}
</script>

<template>
  <div class="content">
    <h1 class="title">
      Welcome to this demo website using
      <a href="https://jsonplaceholder.typicode.com/">{JSON} Placeholder</a>
    </h1>
    <div class="flex" >
      <img class="main-image" src='./../assets/undraw_programming.svg' alt="depiction of a person programming" width='400'/>
      <ul>
        <li>
          <p class="text">
            You can start by browsing the placeholder <a href="#/posts">Posts</a>
            <p class="helper-text">Pro tip : you can filter posts by author by clicking on an
            author's username.</p>
          </p>
        </li>
        <li>
          <p class="text">
            You can also look at the pictures in <a href="#/albums">Albums</a>
            <p class="helper-text">Choose an album, then click on a picture to see it in full size !</p>
          </p>
        </li>
        <li>
          <p class="text">
            Don't forget to <a @click="signIn">Sign in</a> by choosing one of the placeholder accounts.
            <p class="helper-text">Then you will be able access that account's Todo list.</p>
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.content{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.main-image{
  margin-right: 40px;
}

.text{
  margin-top: 20px;
  font-size:24px
}
.title{
  margin-top: 8vh;
  font-weight: 800;
  margin-bottom: 8vh;
}

.helper-text{
  font-size:16px;
}
</style>
