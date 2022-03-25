<script>
import axios from "axios";
export default {
  data: function () {
    return {
      tweets: [],
      reddit: [],
      params: {
        reddit_title: "Title required",
      },
    };
  },
  created: function () {
    this.getTweets();

    this.getReddit();
  },

  methods: {
    getTweets: function () {
      console.log("hi from get tweets");
      axios
        .get(
          "https://tranquil-lowlands-66033.herokuapp.com/all_tweets?access_token=" +
            localStorage.getItem("twitter_access_token")
        )
        .then((response) => {
          // console.log("hi from axios get tweets");
          this.tweets = response.data.data;
        });
    },
    getReddit: function () {
      axios
        .get(
          "https://tranquil-lowlands-66033.herokuapp.com/all_reddit?access_token=" +
            localStorage.getItem("reddit_access_token")
        )
        .then((response) => {
          this.reddit = response.data.data.children;
        });
    },
    postTweet: function () {
      axios
        .post(
          `https://tranquil-lowlands-66033.herokuapp.com/all_tweets?access_token=${localStorage.getItem(
            "twitter_access_token"
          )}&text=${this.params.text}`
        )
        .then((response) => {
          console.log(response.data);
        });
      setInterval(this.getTweets(), 10000);
    },
    postReddit: function () {
      axios
        .post(
          `https://tranquil-lowlands-66033.herokuapp.com/all_reddit?access_token=${localStorage.getItem(
            "reddit_access_token"
          )}&text=${this.params.reddit_text}&title=${this.params.reddit_title}`
        )
        .then((response) => {
          console.log(response);
        });
    },

    deleteTweet: function (tweet_id) {
      axios
        .delete(
          `https://tranquil-lowlands-66033.herokuapp.com/all_tweets/${tweet_id}?access_token=${localStorage.getItem(
            "twitter_access_token"
          )}`
        )
        .then((response) => {
          console.log(response.data);
        });
      setInterval(this.getTweets(), 10000);
    },
  },
};
</script>

<template>
  <div class="card-group">
    <div class="card text-white bg-dark mb-3">
      <div>
        <textarea name="tweet" id="tweet-box" cols="30" rows="5" v-model="params.text"></textarea>
        <div><button v-on:click="postTweet()">Tweet!</button></div>
      </div>
      <div>
        <a
          href="https://twitter.com/i/oauth2/authorize?response_type=code&client_id=TTdpSkc2VWpUQ2ROb0VRbElSWVo6MTpjaQ&redirect_uri=https%3A%2F%2Fcosmic-naiad-083ba7.netlify.app%2Fauth_twitter&scope=tweet.read%20users.read%20follows.read%20follows.write%20tweet.write&state=state&code_challenge=challenge&code_challenge_method=plain"
        >
          Sign in with twitter
        </a>
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

    <div class="card text-white bg-dark mb-3">
      <div>
        <textarea name="tweet" id="reddit-box" cols="30" rows="5" v-model="params.reddit_text"></textarea>
        <div>
          <button v-on:click="postReddit()">Post to reddit</button>
          <input type="text" v-model="this.params.reddit_title" style="width: 150px" />
        </div>
      </div>
      <div>
        <a
          href="https://www.reddit.com/api/v1/authorize?client_id=WowSbZkYVX1m_ylWm8dQKA&response_type=code&state=RANDOM_STRING&redirect_uri=https://cosmic-naiad-083ba7.netlify.app/auth_reddit&duration=permanent&scope=privatemessages identity submit"
        >
          Sign in with Reddit
        </a>
      </div>
      <h1>Reddit</h1>
      <div class="card text-white bg-danger mb-3" v-for="post in reddit" v-bind:key="post.id">
        <h5 class="card-title">{{ post.data.title }}</h5>

        <p class="card-text">
          {{ post.data.selftext }}
        </p>
        <a href="" class="card-link">View</a>
        <a v-on:click="deleteReddit()" href="#" class="card-link">Delete</a>
      </div>
    </div>

    <div class="card text-white bg-dark mb-3">
      <div>
        <textarea name="tweet" id="face-box" cols="30" rows="5" v-model="params.face_text"></textarea>
        <div><button v-on:click="postFacebook()">Post to FaceBook</button></div>
      </div>
      <a href="#">Sign in with Facebook</a>
      <h1>Facebook</h1>
      <div class="card text-white bg-primary mb-3">
        <h5 class="card-title">Facebook post</h5>

        <p class="card-text">Facebook post</p>
        <a href="" class="card-link" style="color: white">View</a>
        <a v-on:click="deleteFace()" style="color: white" href="#" class="card-link">Delete</a>
      </div>
    </div>

    <div class="card text-white bg-dark mb-3">
      <div>
        <textarea name="tweet" id="insta-box" cols="30" rows="5" v-model="params.insta_text"></textarea>
        <div><button v-on:click="postInsta()">Post to Instagram</button></div>
      </div>
      <a href="#">Sign in with Instagram</a>
      <h1>Instagram</h1>
      <div class="card text-dark bg-warning mb-3">
        <h5 class="card-title">Instagram</h5>

        <p class="card-text">Instagram Post</p>
        <a href="" class="card-link">View</a>
        <a v-on:click="deleteInsta()" href="#" class="card-link">Delete</a>
      </div>
    </div>
  </div>
</template>

<style>
.card {
  padding: 10px;
}
.face-box {
  padding: 10px;
  border-color: rgb(255, 0, 13);
}
</style>
