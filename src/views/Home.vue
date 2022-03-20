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
    this.getTweets();

    this.getReddit();
  },
  methods: {
    getTweets: function () {
      console.log("hi from get tweets");
      axios.get("all_tweets?access_token=" + localStorage.getItem("twitter_access_token")).then((response) => {
        // console.log("hi from axios get tweets");
        this.tweets = response.data.data;
        console.log(response);
      });
    },
    getReddit: function () {
      axios.get("all_reddit?access_token=" + localStorage.getItem("reddit_access_token")).then((response) => {
        // console.log("hi from axios get reddit");
        console.log(response.data.data.children);
        this.reddit = response.data.data.children;
      });
    },
    postTweet: function () {
      axios
        .post(`all_tweets?access_token=${localStorage.getItem("twitter_access_token")}&text=${this.params.text}`)
        .then((response) => {
          console.log(response.data);
        });
      setInterval(this.getTweets(), 10000);
    },

    deleteTweet: function (tweet_id) {
      axios
        .delete(`all_tweets/${tweet_id}?access_token=${localStorage.getItem("twitter_access_token")}`)
        .then((response) => {
          console.log(response.data);
        });
      setInterval(this.getTweets(), 10000);
    },
  },
};
</script>

<template>
  <div v-if="tweets == []">
    <a
      href="https://twitter.com/i/oauth2/authorize?response_type=code&client_id=TTdpSkc2VWpUQ2ROb0VRbElSWVo6MTpjaQ&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fauth_twitter&scope=tweet.read%20users.read%20follows.read%20follows.write%20tweet.write&state=state&code_challenge=challenge&code_challenge_method=plain"
    >
      Sign in with twitter
    </a>
  </div>

  <div v-if="reddit == []">
    <a
      href="https://www.reddit.com/api/v1/authorize?client_id=WowSbZkYVX1m_ylWm8dQKA&response_type=code&state=RANDOM_STRING&redirect_uri=http://localhost:8080/auth_reddit&duration=permanent&scope=privatemessages identity"
    >
      Sign in with Reddit
    </a>
  </div>
  <div class="card-group">
    <div class="card" style="width: 10px">
      <div>
        <textarea name="tweet" id="tweet-box" cols="50" rows="5" v-model="params.text"></textarea>
        <div><button v-on:click="postTweet()">Tweet!</button></div>
      </div>
      <h1>Twitter</h1>
      <div class="card text-dark bg-info mb-3" v-for="tweet in tweets" v-bind:key="tweet.id">
        <h5 class="card-title"></h5>

        <p class="card-text">
          {{ tweet.text }}
        </p>
        <a v-bind:href="`/view_post/${tweet.id}`" class="card-link">View</a>
        <a v-on:click="deleteTweet(tweet.id)" href="#" class="card-link">Delete</a>
      </div>
    </div>

    <div class="card" style="width: 10px">
      <div>
        <textarea name="tweet" id="tweet-box" cols="50" rows="5" v-model="params.text"></textarea>
        <div><button v-on:click="postReddit()">Post to reddit</button></div>
      </div>
      <h1>Reddit</h1>
      <div class="card text-white bg-danger mb-3" v-for="post in reddit" v-bind:key="post.id">
        <h5 class="card-title">{{ post.data.title }}</h5>

        <p class="card-text">
          {{ post.data.selftext }}
        </p>
        <a href="" class="card-link">View</a>
        <a v-on:click="deleteTweet()" href="#" class="card-link">Delete</a>
      </div>
    </div>
  </div>
</template>
