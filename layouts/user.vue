
    <template>
      <div>
        <v-app-bar
          color="accent-4"
          dense
          dark
        >
          <v-app-bar-nav-icon></v-app-bar-nav-icon>
    
          <v-toolbar-title>Firmlens</v-toolbar-title>
    
          <v-spacer></v-spacer>
          <div class="d-flex navbar" >
            <v-toolbar-title class="mr-6">Home</v-toolbar-title>
            <v-toolbar-title class="mr-5">Blog</v-toolbar-title>
            <v-toolbar-title class="mr-5" >Contact</v-toolbar-title>
            <v-toolbar-title class="mr-5" v-on:click="signup">Sign up</v-toolbar-title>
             <v-toolbar-title class="mr-5"  v-on:click="login">Login</v-toolbar-title>
          </div>
        </v-app-bar>
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
        // blog() {
        //     console.log("click");
        //     this.$router.push(`/blog`);
        // }
    },
    };
    </script>
    <style>
         .d-flex{
        display: flex;
      }
      .navbar{
        width: 50%;
          justify-content: space-around;
          cursor:pointer;
      }
    </style>
  
