<script>
import axios from "axios";
export default {
  data: function () {
    return {
      params: {},
    };
  },
  created: function () {
    this.authReddit();
  },
  methods: {
    authReddit: function () {
      if (this.$route.query.code) {
        this.params.code = this.$route.query.code;
        axios.post("https://tranquil-lowlands-66033.herokuapp.com/authorize_reddit", this.params).then((response) => {
          console.log(response.data);
          localStorage.setItem("reddit_access_token", response.data.access_token);
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
