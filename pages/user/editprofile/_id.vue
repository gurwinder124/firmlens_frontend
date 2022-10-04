<template>
  <div class="row d-flex justify-content-center m-4">
    <div class="col-12 col-md-6 col-lg-8">
      <form class="form">
        <h2>Edit Company Profile</h2>
        <div class="d-flex mt-2 ">
          <v-text-field class="m-20 " filled v-model="edituser.company_name"
            :error-messages="edituser.company_nameErrors" :counter="20" label="Company Name" required
            @input="$v.company_name.$touch()"></v-text-field>
          <v-text-field class="m-20" v-model="edituser.company_type" filled
            :error-messages="edituser.company_typeErrors" :counter="15" label="Company Type" required
            @input="$v.company_type.$touch()"></v-text-field>
        </div>
        <div class="d-flex">
          <v-text-field class="m-20" v-model="edituser.domain_name" filled :error-messages="edituser.domain_nameErrors"
            label="abc.com" required @input="$v.domain_name.$touch()"></v-text-field>
          <v-text-field type="file" truncate-length="15" v-model="edituser.company_logo"
          :error-messages="edituser.company_logoErrors"  @input="$v.company_logo.$touch()"  @blur="$v.company_logo.$touch()"
          ></v-text-field>
        </div>
        <v-btn class="mr-4" color="success" @click="submit">
          Edit
        </v-btn>
      </form>
    </div>
    <template>
        <div class="text-center ma-2 v-snack">
          <v-snackbar v-model="snackbar" right top  color="blue darken-1"  class="v-snackbar-toast position"> 
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

</template>
<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength } from 'vuelidate/lib/validators'
export default {
  layout: 'userdefault',
  mixins: [validationMixin],
  validations: {
    company_name: { required, maxLength: maxLength(20) },
    domain_name: { required },
    company_type: { required, maxLength: maxLength(15) },
    company_logo: { required },
  },

  data() {
    return {
      edituser: {
        company_name: '',
        company_type: '',
        domain_name: '',
        company_logo: [],
      },
      snackbar:false,
      text: ``
      
    }
  },

  computed: {
    company_nameErrors() {
      const errors = []
      if (!this.$v.company_name.$dirty) return errors
      !this.$v.company_name.maxLength && errors.push('First Name must be at most 10 characters long')
      !this.$v.company_name.required && errors.push('First Name is required.')
      return errors
    },
    company_typeErrors() {
      const errors = []
      if (!this.$v.company_type.$dirty) return errors
      !this.$v.company_type.maxLength && errors.push('Last Name must be at most 10 characters long')
      !this.$v.company_type.required && errors.push('Last Name is required.')
      return errors
    },
    domain_nameErrors() {
      const errors = []
      if (!this.$v.domain_name.$dirty) return errors
      !this.$v.domain_name.required && errors.push('domain_name is required.')
      return errors
    },

    company_logoErrors() {
      const errors = []
      if (!this.$v.company_logo.$dirty) return errors
      !this.$v.company_logo.required && errors.push('Company Logo is required')
      return errors
    },
  },
  mounted() {
    let auth = localStorage.getItem("user_access_token");
    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${auth}`,
      },
    };
    this.$axios.get(`/v1/edit-company`, config).then((resp) => {
      this.edituser = resp.data.data
    })
  },
  methods: {
    submit() {
      console.log(this.edituser)
      this.$v.$touch()
      let auth = localStorage.getItem("user_access_token");
      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${auth}`,
        },
      };
      this.$axios
        .post("/v1/update-company", {
          id: this.$route.params.id,
          company_name: this.edituser.company_name,
          company_type: this.edituser.company_type,
          domain_name: this.edituser.domain_name,
          company_logo:this.edituser.company_logo,
        }, config)
        .then((resp) => {
          console.log(resp,"edit response");
          if(resp.data.code == 200)
          {
            this.snackbar = true;
            this.text = `${resp.data.data}`;
            this.$router.push("/user/profile")
          }
          else{
            this.snackbar = true;
            this.text = "Something Wrong Please Check"
          }
        }
        )
    },
    clear() {
      this.$v.$reset()
      this.company_name = ''
      this.company_logo = ''
      this.company_type = ""
      this.domain_name = ''
    },
  },

};
</script>
<style scoped>
.m-20 {
  margin-right: 20px;
}
</style>