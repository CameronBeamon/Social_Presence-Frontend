<script>
import axios from "axios";
export default {
  data: function () {
    return {
      signUpParams: {},
    };
  },
  methods: {
    signUp: function () {
      axios.post("users", this.signUpParams).then((response) => {
        console.log(response.data);
        this.$router.push("/login");
      });
    },
  },
};
</script>

<template>
  <div>
    Name:
    <input type="text" v-model="signUpParams.email" />
  </div>
  <div>
    Email:
    <input type="text" v-model="signUpParams.email" />
  </div>
  <div>
    Password:
    <input type="password" v-model="signUpParams.password" />
  </div>
  <button v-on:click="signUp()">Sign up!</button>
</template>
