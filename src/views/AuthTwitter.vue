<script>
import axios from "axios";
export default {
  data: function () {
    return {
      params: {},
    };
  },
  created: function () {
    this.authTwitter();
  },
  methods: {
    authTwitter: function () {
      console.log("Hi from auth twitter");
      if (this.$route.query.code) {
        this.params.code = this.$route.query.code;
        console.log(this.params);
        axios.post("https://tranquil-lowlands-66033.herokuapp.com/authorize", this.params).then((response) => {
          localStorage.setItem("twitter_access_token", response.data.access_token);
          this.$router.push("/");
        });
      } else {
        console.log("There is no code in the query");
        this.$router.push("/");
      }
    },
  },
};
</script>
