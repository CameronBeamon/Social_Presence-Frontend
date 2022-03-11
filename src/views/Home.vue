<script>
import axios from "axios";
export default {
  data: function () {
    return {
      tweets: [],
      params: {},
    };
  },
  created: function () {
    // console.log("hi from created");
    this.getTweets();

    // if (this.$route.query.code) {
    //   this.params.code = this.$route.query.code;
    //   this.authTwitter();
    // }
  },
  methods: {
    getTweets: function () {
      // console.log("hi from get tweets");
      axios.get("all_tweets").then((response) => {
        console.log("hi from axios get tweets");
        this.tweets = response.data.data;
        console.log(response);
      });
    },
    authTwitter: function () {
      axios.post("authorize", this.params).then((response) => {
        console.log(response.data);
        console.log(this.$route.query.code);
        this.$route.query.code = " ";
      });
    },
    deleteTweet: function () {
      console.log("hi!");
    },
  },
};
</script>

<template>
  <a
    href="https://twitter.com/i/oauth2/authorize?response_type=code&client_id=TTdpSkc2VWpUQ2ROb0VRbElSWVo6MTpjaQ&redirect_uri=http%3A%2F%2Flocalhost%3A8080&scope=tweet.read%20users.read%20follows.read%20follows.write&state=state&code_challenge=challenge&code_challenge_method=plain"
  >
    Sign in with twitter
  </a>

  <div class="card" style="width: 18rem">
    <div class="card-body" v-for="tweet in tweets" v-bind:key="tweet.id">
      <h5 class="card-title">Twitter</h5>
      <!-- <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6> -->
      <p class="card-text">
        {{ tweet.text }}
      </p>
      <a v-bind:href="`/view_post/${tweet.id}`" class="card-link">View</a>
      <a v-on:click="deleteTweet()" href="#" class="card-link">Delete</a>
    </div>
  </div>
</template>
