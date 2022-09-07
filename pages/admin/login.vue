<template>
  <v-app id="inspire">
    <v-content>
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
                <v-btn color="primary" class="color"><NuxtLink to="/admin/forgot">Home page</NuxtLink></v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import axios from 'axios'
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
    axios.post(`http://127.0.0.1:8000/api/admin/login`, {
          email : this.email,
          password : this.password
        })
        .then((resp) => {
          
          if(resp?.data?.success== true )
          {
            localStorage.setItem('access_token', resp?.data?.data?.token)
            this.$router.push(`/admin`);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
}
}
</script>

<style scoped>
.v-application a{
 color: #fff !important; 
 text-decoration: none;
}

</style>

<!-- export default defineNuxtRouteMiddleware((to, from) => {
  const username = useState('username');

  if (!username.value) {
    process.client && alert('Sorry, you need to fill your username');
    return navigateTo('/');
  }
}); -->
