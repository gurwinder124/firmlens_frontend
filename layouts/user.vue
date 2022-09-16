
    <template>
      <!-- <div>
        <v-app-bar
          color="accent-4"
          dense
          dark
        > 
          <v-toolbar-title class="ml-4">Firmlens</v-toolbar-title>
          <v-spacer></v-spacer>
          <div class="d-flex navbar" >
            <v-toolbar-title class=" h3 Subtitle 2" v-on:click="home">Home</v-toolbar-title>
            <v-toolbar-title class=" h3">About</v-toolbar-title>
            <v-toolbar-title class="h3" >Contact</v-toolbar-title>
            <v-toolbar-title class=" h3" v-on:click="signup">Sign up</v-toolbar-title>
             <v-toolbar-title class="h3"  v-on:click="login">Login</v-toolbar-title>
          </div>
        </v-app-bar>
       
      </div> -->
      <div class="Thbody">
      <div class="d-flex  align-center justify-content-between container">
        <div>
          <button class="h1 text-white">Firmlens</button>
        </div>
        <div class="navmenu">
          <v-btn class="bg-transparent text-light mr-4 fs-5" v-on:click="home">Home</v-btn>
          <v-btn class="bg-transparent text-light mr-4 fs-5"  v-on:click="blog">Blog</v-btn>
          <v-btn class="bg-transparent text-light mr-4 fs-5"  v-on:click="Contact">Contact us</v-btn>
          <v-btn class="bg-transparent text-light mr-4 fs-5" v-on:click="signup">Signup</v-btn>
          <v-btn class="bg-transparent text-light mr-4 fs-5" v-on:click="login">Login</v-btn>
        </div>
      </div>
      <div>
          <nuxt/>
        </div>
      </div>
      
    </template>

<script>

    export default {
      name: "user",
      methods: {
        signup() {
            console.log("click");
            this.$router.push(`/register`);
        },
        login() {
            console.log("click");
            this.$router.push(`/login`);
        },
        home() {
            console.log("click");
            this.$router.push(`/home`);
        },
        blog() {
            console.log("click");
            this.$router.push(`/blog`);
        },
        Contact() {
            console.log("click");
            this.$router.push(`/contact`);
        },
    },
    };
    </script>
    <style>
         .d-flex{
        display: flex;
      }
      .navbar{
        width: 40%;
          justify-content: space-around;
          cursor:pointer;
      }
      .Thbody {
  background-image: url(https://ueibi.com/images/logon_secreen.png);
  /* background-color: #607DF9; */
  background-size: cover;
  height: 100vh;
}
    </style>
  
