<template>
    <v-app id="inspire">
      <v-main>
        <v-container fluid fill-height>
          <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
              <v-card class="elevation-12">
                <v-toolbar dark color="primary">
                  <v-toolbar-title>Login form</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                  <v-form>
                    <v-text-field
                      name="email"
                      label="Email"
                      type="email"
                      v-model="email"
                    ></v-text-field>
                    <v-text-field
                      id="password"
                      name="password"
                      label="Password"
                      type="password"
                      v-model="password"
                    ></v-text-field>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" @click="submitForm">Login</v-btn>
                  <v-btn color="primary" class="color"><NuxtLink to="/user/forgot">Home page</NuxtLink></v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-main>
    </v-app>
  </template>
  
  <script>
  // import axios from 'axios'
  export default {
    layout: "auth",
    name: "Login",
    props: {
      source: String,
    },
    data() {
      return {
        email: null,
        password: null,
      };
    },
    methods: {
       submitForm() {
        const config = {
      headers: {
        'Content-type': 'application/json',
      }
    }
         this.$axios
          .post("/v1/login",{
            email : this.email,
            password : this.password
          },config
          )
        .then((resp) => {
          console.log("resp",resp.data.success)
            
            if(resp?.data?.success== true )
            {
              localStorage.setItem('user_access_token', resp?.data?.data?.token)
              console.log(resp.data.data.user.id,'user_company_id')
              localStorage.setItem('user_company_id', resp?.data?.data?.user?.company_id)
              this.$router.push(`/user`);
            }
          })
      },
  },
  mounted() {
    console.log("page load")
    let auth = localStorage.getItem("user_access_token");
    if (auth) {
      console.log("user login")
      this.$router.push(`/user`);
    }
    else {
      console.log("user not  login")
    }
  }
  }
  </script>
  
  <style scoped>
  .v-application a{
   color: #fff !important; 
   text-decoration: none;
  }
  
  </style>

  