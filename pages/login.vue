
<template>
  <form class="form">
    <h2>User Login</h2>
  
      <v-text-field class="m-20" v-model="email" :error-messages="emailErrors" label="E-mail" required
        @input="$v.email.$touch()" @blur="$v.email.$touch()"></v-text-field>
        <v-text-field class="m-20" v-model="password" type="password"
        :error-messages="passwordErrors" :counter="10" label="password" required
        @input="$v.password.$touch()" @blur="$v.password.$touch()"></v-text-field>


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
  name: "loginPage",
  mixins: [validationMixin],
  validations: {
    email: { required, email },
    password:{required}
  },
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
      this.$axios
        .post("/v1/login",{
          password:this.password,
          email:this.email,
        })
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
.d-flex {
  display: flex;
}
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
  margin: 19px 15%;
}
</style>
        