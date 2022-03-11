<script>
// import axios from "axios";
export default {
  data: function () {
    return {};
  },
  created: function () {
    console.log("hi");
  },
  methods: {
    postTweet: function () {
      console.log("hi!");
    },
  },
};
</script>
<template>
  <h1>Create a tweet!</h1>
  <div>
    <textarea name="tweet" id="tweet-box" cols="50" rows="5"></textarea>
    <div><button v-on:click="postTweet()">Tweet!</button></div>
  </div>
</template>
