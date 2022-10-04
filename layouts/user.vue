
<template>
  <v-main class="mx-0 my-auto">
    <div class="Thbody  mx-0 my-0">
      <div class="d-flex  align-center justify-content-between container">
        <div>
          <button class="h1 text-white">Firmlens</button>
        </div>
        <div class="d-flex">
          <div>
            <v-btn class="bg-transparent text-light mr-4 fs-5" v-on:click="home">Home</v-btn>
            <v-btn class="bg-transparent text-light mr-4 fs-5" v-on:click="blog">Blog</v-btn>
            <v-btn class="bg-transparent text-light mr-4 fs-5" v-on:click="Contact">Contact us</v-btn>
            <!-- <v-btn class="bg-transparent text-light mr-4 fs-5" v-on:click="Company_profile">Company Profile</v-btn> -->
          </div>
          <div v-if="auth == null ">
            <v-btn class="bg-transparent text-light mr-4 fs-5" v-on:click="signup">Signup</v-btn>
            <v-btn class="bg-transparent text-light mr-4 fs-5" v-on:click="login">Login</v-btn>
          </div>
          <div v-else>
            <v-btn class="bg-transparent text-light mr-4 fs-5" v-on:click="dashboard">Dashboard</v-btn>
            <v-btn class="bg-transparent text-light mr-4 fs-5" v-on:click="logout">Logout</v-btn>
          </div>
        </div>
      </div>
      <div>
        <nuxt />
      </div>
    </div>
  </v-main>
</template>

<script>

export default {
  name: "user",
  data() {
    return {
      auth: '',
      auth1: '',

    }
  },
  methods: {
    signup() {
      this.$router.push(`/register`);
    },
    login() {
      this.$router.push(`/login`);
    },
    home() {
      this.$router.push(`/`);
    },
    blog() {
      this.$router.push(`/blog`);
    },
    // Company_profile(){
    //   this.$router.push('/companyprofile')
    // },
    Contact() {
      this.$router.push(`/contact`);
    },
    dashboard()
    {
      this.$router.push(`/user`);
    },
    logout()
    {
      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${this.auth}`,
        },
      };
       this.$axios
        .post("/v1/user-logout",{},config)
        .then((response) => {
          console.log(response)
          if(response.status == 200)
          {
            this.$router.push(`/login`);
            localStorage.removeItem('user_access_token');
          }
        }).catch((err)=>{
          console.log(err,"error massge")
        }); 
    }

  },
  mounted() {
    this.auth = localStorage.getItem("user_access_token")
    this.auth1 = localStorage.getItem("user_access_token")

  }
};
</script>
<style>
.d-flex {
  display: flex;
}

.navbar {
  width: 40%;
  justify-content: space-around;
  cursor: pointer;
}

.Thbody {
  background-image: url("../assets/imges/background.png");
  /* background-color: #607DF9; */
  background-size: cover;
  /* height: 100vh; */
  margin: 0px auto;
}

.v-btn--is-elevated{
  box-shadow: none;
}
</style>
  
