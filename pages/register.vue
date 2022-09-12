<template>
  <form class="form">
    <h2> Company Register</h2>
    <div class="d-flex mt-4">
      <v-text-field class="m-20" v-model="companyName" :error-messages="companyNameErrors" :counter="10"
        label="Company Name" required @input="$v.companyName.$touch()" @blur="$v.companyName.$touch()"></v-text-field>
      <v-text-field v-model="companyType" :error-messages="companyTypeErrors" :counter="10" label="Company Type"
        required @input="$v.companyType.$touch()" @blur="$v.companyType.$touch()"></v-text-field>
    </div>
    <div class="d-flex">
      <v-text-field class="m-20" v-model="Name" :error-messages="NameErrors" :counter="10" label="Name" required
        @input="$v.Name.$touch()" @blur="$v.Name.$touch()"></v-text-field>
      <v-text-field v-model="designation" :error-messages="designationErrors" :counter="10" label="designation Type"
        required @input="$v.designation.$touch()" @blur="$v.designation.$touch()"></v-text-field>

    </div>
    <div class="d-flex">
      <v-text-field class="m-20" v-model="email" :error-messages="emailErrors" label="E-mail" required
        @input="$v.email.$touch()" @blur="$v.email.$touch()"></v-text-field>
      <v-text-field v-model="dominName" :error-messages="dominNameErrors" :counter="10" label="Domain Name" required
        @input="$v.dominName.$touch()" @blur="$v.dominName.$touch()"></v-text-field>
    </div>
    <div class="d-flex">
      <v-text-field v-model="password" type="password"
 :error-messages="passwordErrors" :counter="10" label="password" required
        @input="$v.password.$touch()" @blur="$v.password.$touch()"></v-text-field>
      <!-- <v-text-field class="m-20"   name="password" label="Password"  v-model="password"></v-text-field> -->
    </div>

   
    <v-checkbox v-model="checkbox" :error-messages="checkboxErrors" label="Do you agree?" required
      @change="$v.checkbox.$touch()" @blur="$v.checkbox.$touch()"></v-checkbox>

    <v-btn class="mr-4" @click="submit">
      submit
    </v-btn>
    <v-btn @click="clear">
      clear
    </v-btn>
  </form>
</template>
<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength, email } from 'vuelidate/lib/validators'
export default {
  layout: 'user',
  name: "registerPage",
  mixins: [validationMixin],
  validations: {
    companyName: { required, maxLength: maxLength(10) },
    companyType: { required },
    designation: { required },
    Name: { required, maxLength: maxLength(10) },
    dominName: { required },
    email: { required, email },
    password:{required},
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
    password:"",
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

      this.$axios
        .post("/v1/registerCompany",{
          company_name:this.companyName,
          company_type:this.companyType,
          domain_name:this.dominName,
          password:this.password,
          designation:this.designation,
          name:this.Name,
          email:this.email,
        })
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
.d-flex {
  display: flex;
}

.form {
  width: 50%;
  text-align: center;
  align-items: center;
  margin: 6% auto;
}

.m-20 {
  margin-right: 15%;
}
</style>
  