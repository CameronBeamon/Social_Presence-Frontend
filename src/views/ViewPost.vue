<script>
import axios from "axios";
export default {
  data: function () {
    return {
      params: {},
      tweet: "",
    };
  },
  created: function () {
    this.getTweet();
  },

  methods: {
    getTweet: function () {
      this.params.tweet_id = this.$route.params.id;
      axios.get("all_tweets/" + this.params.tweet_id).then((response) => {
        console.log(response.data.data);
        this.tweet = response.data.data.text;
        console.log(this.tweet);
      });
    },
  },
};
</script>

<template>
  <h1>Your tweet</h1>
  <p>{{ tweet }}</p>
</template>
