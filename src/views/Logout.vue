<script>
export default {
  data: function () {
    return {};
  },
  created: function () {
    this.removeJWT();
  },
  methods: {
    removeJWT: function () {
      localStorage.removeItem("jwt");
      this.$router.push("/login");
    },
  },
};
</script>

<template>
  <h1>Log out Successful!</h1>
</template>
