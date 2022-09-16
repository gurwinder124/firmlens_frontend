<template>
  <div class="d-flex height">
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
      <h2> Company Registration</h2>
      <p>Start your journey with us</p>
      <div class="d-flex mt-2 ">
        <v-text-field class="m-20" filled v-model="companyName" :error-messages="companyNameErrors" :counter="10"
          label="Company Name" required @input="$v.companyName.$touch()"></v-text-field>
        <v-text-field v-model="companyType" filled :error-messages="companyTypeErrors" :counter="10" label="Company Type"
          required @input="$v.companyType.$touch()" ></v-text-field>
      </div>
      <div class="d-flex">
        <v-text-field class="m-20" v-model="Name" filled :error-messages="NameErrors" :counter="10" label="Name" required
          @input="$v.Name.$touch()" @blur="$v.Name.$touch()"></v-text-field>
        <v-text-field v-model="designation" filled :error-messages="designationErrors" :counter="10" label="designation Type"
          required @input="$v.designation.$touch()"></v-text-field>

      </div>
      <div class="d-flex">
        <v-text-field class="m-20" v-model="email" filled :error-messages="emailErrors" label="E-mail" required
          @input="$v.email.$touch()" @blur="$v.email.$touch()"></v-text-field>
        <v-text-field v-model="dominName" filled :error-messages="dominNameErrors" :counter="10" label="Domain Name" required
          @input="$v.dominName.$touch()"></v-text-field>
      </div>
      <div class="d-flex">
        <v-text-field v-model="password" filled type="password" :error-messages="passwordErrors" :counter="10" label="password"
          required @input="$v.password.$touch()" ></v-text-field>
        <!-- <v-text-field class="m-20"   name="password" label="Password"  v-model="password"></v-text-field> -->
      </div>


      <v-checkbox v-model="checkbox" filled :error-messages="checkboxErrors" label="Do you agree?" required
        @change="$v.checkbox.$touch()"></v-checkbox>

      <v-btn class="mr-4" @click="submit">
        submit
      </v-btn>
      <v-btn @click="clear">
        clear
      </v-btn>
      <p class="mt-3">Already have an account <NuxtLink to="/login">Login</NuxtLink>
      </p>
    </form>
  </div>

</template>
<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength, email } from 'vuelidate/lib/validators'
export default {
  layout: 'auth',
  name: "registerPage",
  mixins: [validationMixin],
  validations: {
    companyName: { required, maxLength: maxLength(10) },
    companyType: { required },
    designation: { required },
    Name: { required, maxLength: maxLength(10) },
    dominName: { required },
    email: { required, email },
    password: { required },
    checkbox: {
      checked(val) {
        return val
      },
    },
  },

  data: () => ({
    companyName: '',
    companyType: '',
    Name: '',
    designation: '',
    email: '',
    dominName: "",
    password: "",
    checkbox: false,
  }),

  computed: {
    checkboxErrors() {
      const errors = []
      if (!this.$v.checkbox.$dirty) return errors
      !this.$v.checkbox.checked && errors.push('You must agree to continue!')
      return errors
    },
    companyNameErrors() {
      const errors = []
      if (!this.$v.companyName.$dirty) return errors
      !this.$v.companyName.maxLength && errors.push('companyName must be at most 10 characters long')
      !this.$v.companyName.required && errors.push('companyName is required.')
      return errors
    },
    companyTypeErrors() {
      const errors = []
      if (!this.$v.companyType.$dirty) return errors
      !this.$v.companyType.required && errors.push('company Type is required.')

      return errors
    },
    NameErrors() {
      const errors = []
      if (!this.$v.Name.$dirty) return errors
      !this.$v.Name.maxLength && errors.push('Name must be at most 10 characters long')
      !this.$v.Name.required && errors.push('Name is required.')
      return errors
    },
    designationErrors() {
      const errors = []
      if (!this.$v.designation.$dirty) return errors
      !this.$v.designation.required && errors.push('designation is required.')
      return errors
    },

    emailErrors() {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Must be valid e-mail')
      !this.$v.email.required && errors.push('E-mail is required')
      return errors
    },
    dominNameErrors() {
      const errors = []
      if (!this.$v.dominName.$dirty) return errors
      !this.$v.dominName.required && errors.push('Domain Name is required')
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
        .post("/v1/registerCompany", {
          company_name: this.companyName,
          company_type: this.companyType,
          domain_name: this.dominName,
          password: this.password,
          designation: this.designation,
          name: this.Name,
          email: this.email,
        }, config)
        .then((resp) => {
          console.log(resp)
        })


    },
    clear() {
      this.$v.$reset()
      this.companyName = ''
      this.email = ''
      this.Name = ""
      this.companyType = ''
      this.designation = ''
      this.password = ''
      this.checkbox = false
    },
  },
};
</script>
<style scoped>


.form {
  width: 40%;
  align-items: center;
  margin: 6% auto;
}

.m-20 {
  margin-right: 15%;
}

.firstdiv {
  background-image: url(https://ueibi.com/images/logon_secreen.png);
  width: 35%;
}

.main-div {
  margin: 50px auto;
  display: flex;
  flex-direction: column;
  padding: 49px;
  text-align: left;
}

.content-text {
  margin-bottom: 22px;
  padding: 27px 0px;
}

.height {
  height: 100vh;
}
</style>
  