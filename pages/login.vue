
<template>
  <div class="">
    <div class="row">
      <div class="col-12 col-md-6 col-lg-4 ">
        <!-- <div class="d-flex height "> -->
          <div class="firstdiv">
            <div class="main-div">
              <div class="d-flex justify-content-between align-items-center">
                <NuxtLink to="/" class="text-decoration-none">
                  <h1 class="text-white">Firmlens</h1>
                </NuxtLink><span>
                  <v-icon class="text-white">mdi-home</v-icon>
                </span>
              </div>
              <p class="text-white content-text">We are LIVE in

                Chandigarh CCR & Gurgaon

                & will soon launch in 23 cities!!</p>
              <p class="text-white content-text">Click on below and share your details
                to be part of our exclusive network</p>
              <NuxtLink to="/register" class="text-decoration-none">
                <v-btn rounded class="text-dark px-4 py-4 mr-4 fs-5">Register</v-btn>
              </NuxtLink>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-6 col-lg-8">

          <form class="form">
            <h2>User Login</h2>

            <v-text-field as="email" v-model="email" :error-messages="emailErrors" label="E-mail" required
              @input="$v.email.$touch()" @blur="$v.email.$touch()"></v-text-field>

            <v-text-field v-model="password" type="password" :error-messages="passwordErrors" :counter="8 "
              label="password" required @input="$v.password.$touch()" @blur="$v.password.$touch()"></v-text-field>


            <v-btn class="mr-4 " @click="submit">
              Login
            </v-btn>
            <NuxtLink to="" class="text-decoration-underline ">Forgot Password?</NuxtLink>
          </form>
        </div>
      </div>
  </div>
</template>
      
<script>
import { validationMixin } from 'vuelidate'
import { required, email } from 'vuelidate/lib/validators'
export default {
  layout: 'auth',
  name: "loginPage",
  mixins: [validationMixin],
  validations: {
    email: { required, email },
    password: { required }
  },
  data: () => ({

    email: '',
    password: "",

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
    async submit() {
      this.$v.$touch()
      const config = {
        headers: {
          'Content-type': 'application/json',
        }
      }
      await this.$axios
        .post("/v1/login", {
          password: this.password,
          email: this.email,
        }, config)
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
}




.main-div {
  margin: 0px auto;
    display: flex;
    flex-direction: column;
    padding: 68px 69px;
    text-align: left;
    height: 100vh;
}

.form {
  width: 75%;
    align-items: center;
    margin: 20% auto;;
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
        