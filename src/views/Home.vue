<script>
import axios from "axios";
export default {
  data: function () {
    return {
      tweets: [],
      reddit: [],
      params: {},
    };
  },
  created: function () {
    if (this.$route.query.code) {
      this.authTwitter();
      this.$route.query.code = "";
    }
    this.getTweets();

    this.getReddit();

    // if (this.$route.query.code) {
    //   this.params.code = this.$route.query.code;
    //   this.authTwitter();
    // }
  },
  methods: {
    getTweets: function () {
      console.log("hi from get tweets");
      axios.get("all_tweets?access_token=" + localStorage.getItem("access_token")).then((response) => {
        console.log("hi from axios get tweets");
        this.tweets = response.data.data;
        console.log(response);
      });
    },
    getReddit: function () {
      // console.log("hi from get tweets");
      axios.get("all_reddit").then((response) => {
        console.log("hi from axios get reddit");
        console.log(response.data.data.children);
        this.reddit = response.data.data.children;
      });
    },
    authReddit: function () {
      this.params.code = this.$route.query.code;
      axios.post("authorize_reddit", this.params).then((response) => {
        console.log(response.data);
      });
      console.log(`Hi from authreddit ${this.$route.query.code}`);
    },
    // getRedditUser: function () {
    //   axios.get(/)
    // },
    authTwitter: function () {
      this.params.code = this.$route.query.code;
      axios.post("authorize", this.params).then((response) => {
        console.log(response.data);
        localStorage.setItem("access_token", response.data.access_token);
        // console.log(this.$route.query.code);
        // this.$route.query.code = " ";
      });
    },
    deleteTweet: function () {
      console.log("hi!");
    },
  },
};
// href="https://www.reddit.com/api/v1/authorize?client_id=WowSbZkYVX1m_ylWm8dQKA&response_type=code&state=randstringmyapp&redirect_uri=http://localhost:8080&duration=permanent&scope=read"
</script>

<template>
  <a
    href="https://twitter.com/i/oauth2/authorize?response_type=code&client_id=TTdpSkc2VWpUQ2ROb0VRbElSWVo6MTpjaQ&redirect_uri=http%3A%2F%2Flocalhost%3A8080&scope=tweet.read%20users.read%20follows.read%20follows.write&state=state&code_challenge=challenge&code_challenge_method=plain"
  >
    Sign in with twitter
  </a>
  <div>
    <a
      href="https://www.reddit.com/api/v1/authorize?client_id=WowSbZkYVX1m_ylWm8dQKA&response_type=code&state=RANDOM_STRING&redirect_uri=http://localhost:8080&duration=permanent&scope=privatemessages identity"
    >
      Sign in with Reddit
    </a>
    <button v-on:click="authReddit()">auth reddit</button>
    <button v-on:click="authTwitter()">auth twitter</button>
  </div>
  <div class="card-group">
    <div class="card" style="width: 18rem">
      <h1>Twitter</h1>
      <div class="card text-dark bg-info mb-3" v-for="tweet in tweets" v-bind:key="tweet.id">
        <h5 class="card-title"></h5>
        <!-- <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6> -->
        <p class="card-text">
          {{ tweet.text }}
        </p>
        <a v-bind:href="`/view_post/${tweet.id}`" class="card-link">View</a>
        <a v-on:click="deleteTweet()" href="#" class="card-link">Delete</a>
      </div>
    </div>

    <div class="card" style="width: 18rem">
      <h1>Reddit</h1>
      <div class="card text-white bg-danger mb-3" v-for="post in reddit" v-bind:key="post.id">
        <h5 class="card-title">{{ post.data.title }}</h5>
        <!-- <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6> -->
        <p class="card-text">
          {{ post.data.selftext }}
        </p>
        <a href="" class="card-link">View</a>
        <a v-on:click="deleteTweet()" href="#" class="card-link">Delete</a>
      </div>
    </div>
  </div>
</template>
