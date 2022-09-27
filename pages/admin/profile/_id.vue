<template>
    <div class="row d-flex justify-content-center m-4">
      <div class="col-12 col-md-6 col-lg-8">
        <form class="form">
          <h2>Edit Admin Profile</h2>
          <div class="d-flex mt-2 ">
            <v-text-field class="m-20 " filled v-model="firstName" :error-messages="firstNameErrors" :counter="20"
              label="First Name" required @input="$v.firstName.$touch()"></v-text-field>
              <v-text-field class="m-20" v-model="lastName" filled :error-messages="lastNameErrors" :counter="15" label="Last Name"
              required @input="$v.lastName.$touch()" @blur="$v.lastName.$touch()"></v-text-field>
            </div>
           <div class="d-flex">
          
           <v-text-field class="m-20" v-model="designation" filled :error-messages="designationErrors" label="Designation Type"
              required @input="$v.designation.$touch()"></v-text-field>
              <v-text-field class="m-20" v-model="email" filled :error-messages="emailErrors" label="E-mail" required
                @input="$v.email.$touch()" @blur="$v.email.$touch()"></v-text-field>
           </div> 
          <v-btn class="mr-4 bg-primary" @click="submit">
            Edit
          </v-btn>
        </form>
      </div>
    </div>
  </template>
  <script>
  import { validationMixin } from 'vuelidate'
  import { required, maxLength, email } from 'vuelidate/lib/validators'
  export default {
    layout: 'default',
    name: "registerPage",
    mixins: [validationMixin],
    validations: {
      firstName: { required, maxLength: maxLength(20) },
      designation: { required },
      lastName: { required, maxLength: maxLength(15) },
      email: { required, email },
    },
  
    data: () => ({
      firstName: '',
      lastName: '',
      designation: '',
      email: '',
    }),
  
    computed: {
      firstNameErrors() {
        const errors = []
        if (!this.$v.firstName.$dirty) return errors
        !this.$v.firstName.maxLength && errors.push('First Name must be at most 10 characters long')
        !this.$v.firstName.required && errors.push('First Name is required.')
        return errors
      },
      lastNameErrors() {
        const errors = []
        if (!this.$v.lastName.$dirty) return errors
        !this.$v.lastName.maxLength && errors.push('Last Name must be at most 10 characters long')
        !this.$v.lastName.required && errors.push('Last Name is required.')
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
    },
  
    methods: {
      submit() {
        console.log(this.firstName, this.lastName ,this.email,this.designation)
        this.$v.$touch()
        const config = {
          headers: {
            'Content-type': 'application/json',
          }
        }
        // this.$axios
        //   .post("/v1/register-company", {
        //     company_name: this.companyName,
        //     company_type: this.companyType,
        //     domain_name: this.dominName,
        //     password: this.password,
        //     designation: this.designation,
        //     first_name: this.Name,
        //     email: this.email,
        //   }, config)
        //   .then((resp) => {
        //     console.log(resp.data.code)
        //     if(resp.data.code == 200)
        //     {
        //       this.snackbar = true;
        //       this.text = "Company register SuccessFully Wait for Admin Approval";
        //       this.$router.push("/login")
        //     }
        //     else{
        //       this.snackbar = true;
        //       this.text = "Something Wrong Please Check"
        //     }
        //   })
      },
      clear() {
        this.$v.$reset()
        this.firstName = ''
        this.email = ''
        this.lastName = ""
        this.designation = ''
      },
    },
  };
  </script>
  <style scoped>
    .m-20
    {
      margin-right: 20px;
    }
  </style>