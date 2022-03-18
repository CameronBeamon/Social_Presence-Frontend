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
        axios.post("authorize_reddit", this.params).then((response) => {
          console.log(response.data);
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
