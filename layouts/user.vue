
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
      <div>
          <nuxt/>
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
    </style>
  
