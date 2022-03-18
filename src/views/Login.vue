<script>
import axios from "axios";
export default {
  data: function () {
    return {
      loginParams: {},
    };
  },
  methods: {
    login: function () {
      axios.post("sessions", this.loginParams).then((response) => {
        console.log(response.data);
        localStorage.setItem("jwt", response.data["jwt"]);
        this.$router.push("/");
      });
    },
  },
};
</script>

<template>
  <div>
    Email:
    <input type="text" v-model="loginParams.email" />
  </div>
  <div>
    Password:
    <input type="password" v-model="loginParams.password" />
  </div>
  <button v-on:click="login()">Log in!</button>
</template>
