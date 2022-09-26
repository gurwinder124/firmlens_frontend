<template>
  <div class="row d-flex justify-content-center m-4">
    <div class="col-12 col-md-6 col-lg-8">
      <form class="form">
        <h2>Edit Employee</h2>
        <div class="d-flex mt-2 ">
          <v-text-field class="m-20 " filled v-model="edituser.first_name" :error-messages="edituser.first_nameErrors" :counter="20"
            label="First Name" required @input="$v.first_name.$touch()"></v-text-field>
            <v-text-field class="m-20" v-model="edituser.last_name" filled :error-messages="edituser.last_nameErrors" :counter="15" label="Last Name"
            required @input="$v.last_name.$touch()" @blur="$v.last_name.$touch()"></v-text-field>
          </div>
         <div class="d-flex">
        
         <v-text-field class="m-20" v-model="edituser.designation" filled :error-messages="edituser.designationErrors" label="Designation Type"
            required @input="$v.designation.$touch()"></v-text-field>
            <v-text-field class="m-20" v-model="edituser.email" filled :error-messages="edituser.emailErrors" label="E-mail" required
              @input="$v.email.$touch()" @blur="$v.email.$touch()"></v-text-field>
         </div> 
        <v-btn class="mr-4 bg-primary" @click="submit">
          Edit
        </v-btn>
      </form>
      <template>
        <div class="text-center ma-2 v-snack">
          <v-snackbar v-model="snackbar" right top class="v-snackbar-toast position">
            {{ text }}

            <template v-slot:action="{ attrs }">
              <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
                Close
              </v-btn>
            </template>
          </v-snackbar>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength, email } from 'vuelidate/lib/validators'
export default {
  layout: 'userdefault',
 
  mixins: [validationMixin],
  validations: {
    first_name: { required, maxLength: maxLength(20) },
    designation: { required },
    last_name: { required, maxLength: maxLength(15) },
    email: { required, email },
  },
  data() {
    return {
      snackbar: false,
    text: ``,
edituser:{
  first_name: '',
  last_name: '',
  designation: '',
  email: '',
}
    }
  },
  computed: {
    first_nameErrors() {
      const errors = []
      if (!this.$v.edituser.first_name.$dirty) return errors
      !this.$v.edituser.first_name.maxLength && errors.push('First Name must be at most 10 characters long')
      !this.$v.edituser.first_name.required && errors.push('First Name is required.')
      return errors
    },
    last_nameErrors() {
      const errors = []
      if (!this.$v.edituser.last_name.$dirty) return errors
      !this.$v.edituser.last_name.maxLength && errors.push('Last Name must be at most 10 characters long')
      !this.$v.edituser.last_name.required && errors.push('Last Name is required.')
      return errors
    },
    designationErrors() {
      const errors = []
      if (!this.$v.edituser.designation.$dirty) return errors
      !this.$v.edituser.designation.required && errors.push('designation is required.')
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
  mounted()
  {    let auth = localStorage.getItem("user_access_token");
      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${auth}`,
        },
      };
    console.log('bsdkhbaskjd')
    console.log(`${this.$route.params.id}`);
    this.$axios.get(`v1/sub-user/${this.$route.params.id}`,config).then((resp)=>{
        console.log(resp,"nfskjsdfkjbdksj");
        this.edituser = resp.data.user
        console.log(this.edituser.first_name,"nfskjsdfkjbdksj");

      })
    },

  methods: {
  async  submit() {
      console.log(this.edituser,"fksdnfkjsdbg")
      this.$v.$touch()
      let auth = localStorage.getItem("user_access_token");
      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${auth}`,
        },
      };
     await this.$axios
        .post("v1/update-sub-user", {
          id:this.$route.params.id,
          first_name:this.edituser.first_name,
         last_name :this.edituser.last_name,
         designation:this.edituser.designation,
         email:this.edituser.email,
        }, config)
        .then((resp) => {
          console.log(resp)
          if(resp.data.code == 200)
          {
            this.snackbar = true;
            this.text = `${resp.data.msg}`;
            this.$router.push("/user/employeelist")
          }
          else{
            this.snackbar = true;
            this.text = "Something Wrong Please Check"
          }
        })
    },
    // clear() {
    //   this.$v.$reset()
    //   this.first_name = ''
    //   this.email = ''
    //   this.last_name = ""
    //   this.designation = ''
    // },
  },
}
</script>
<style scoped>
  .m-20
  {
    margin-right: 20px;
  }
</style>