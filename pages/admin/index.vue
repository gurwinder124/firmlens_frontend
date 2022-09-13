<template>
    <div>
        fwefwefdDADAdasdadds
    </div>
  
  </template>
  
  <script>
  export default {
    name: "IndexPage",
    mounted() {
    let auth = localStorage.getItem("access_token");
    if (auth) {
      console.log("user login")
    }
    else {
      console.log("user not  login")
      this.$router.push(`/admin/login`);

    }
  }
  };
  </script>
  