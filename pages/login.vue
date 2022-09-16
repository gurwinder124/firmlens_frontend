
<template>

<div class="d-flex height ">
    <div class="firstdiv">
      <div class="main-div">
        <div class="d-flex justify-content-between align-items-center">
          <h1 class="text-white">Firmlens</h1><span>
            <v-icon class="text-white">mdi-home</v-icon>
          </span>
        </div>
        <p class="text-white content-text">We are LIVE in

          Chandigarh CCR & Gurgaon

          & will soon launch in 23 cities!!</p>
        <p class="text-white content-text">Click on below and share your details
          to be part of our exclusive network</p>
        <v-btn rounded class="text-dark px-4 py-4   mr-4 fs-5">get connected</v-btn>
      </div>
    </div>

  <form class="form">
    <h2>User Login</h2>
  
      <v-text-field as="email"   v-model="email" :error-messages="emailErrors" label="E-mail" required
        @input="$v.email.$touch()" @blur="$v.email.$touch()"></v-text-field>

        <v-text-field  v-model="password" type="password"
        :error-messages="passwordErrors" :counter="8 " label="password" required
        @input="$v.password.$touch()" @blur="$v.password.$touch()"></v-text-field>


    <v-btn class="mr-4 " @click="submit">
      Login
    </v-btn>
    <NuxtLink to="" class="text-decoration-underline ">Forgot Password?</NuxtLink>
  </form>
  </div>
</template>
      
<script>
import { validationMixin } from 'vuelidate'
import { required, email } from 'vuelidate/lib/validators'
export default {
  layout: 'user',
  name: "loginPage",
  mixins: [validationMixin],
  validations: {
    email: { required, email },
    password:{required}
  },
  data: () => ({
  
    email: '',
    password:"",
    
  }),
  computed: {
    emailErrors() {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Must be valid e-mail')
      !this.$v.email.required && errors.push('E-mail is required')
      return errors
    },

    passwordErrors() {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.required && errors.push('password is required')
      return errors
    },
  },

  methods: {
    submit() {
      this.$v.$touch()
      const config = {
        headers: {
          'Content-type': 'application/json',  
      }
    }
      this.$axios
        .post("/v1/login",{
          password:this.password,
          email:this.email,
        },config)
      .then((resp) => {
        console.log(resp)
        })
    },
    clear() {
      this.$v.$reset()
      this.email = ''
      this.password = ''
    
    },
  },

};
</script>
<style scoped>
  .firstdiv {
  background-image: url(https://ueibi.com/images/logon_secreen.png);
  width: 35%;
}
.d-flex {
  display: flex;
}
.d-flex {
  display: flex;
}
.main-div {
  margin: 50px auto;
  display: flex;
  flex-direction: column;
  padding: 49px;
  text-align: left;
}
.form {
  width: 30%;
  align-items: center;
  margin: 9% auto;
}

.m-20 {
  margin: 19px 15%;
}
.content-text {
  margin-bottom: 22px;
  padding: 27px 0px;
}

.height {
  height: 100vh;
}
</style>
        