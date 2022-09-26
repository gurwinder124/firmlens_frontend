<template>
  <v-main class="p-0">
    <v-row> 
      <v-col cols="6" >
        <v-card class="border border-secondary">
          <div class="d-flex flex-column justify-content-around align-items-center">
            <v-card-title>Total Employee</v-card-title>
            <h5>{{count.emp_count}}</h5>
          </div>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card class="border border-secondary">
          <div>
            <div class="d-flex flex-column justify-content-around align-items-center">
              <v-card-title>Total Reviews</v-card-title>
              <h5>{{count.emp_review}}</h5>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>

  </v-main>
</template>
<script>
export default {
  layout: "userdefault",
  name: "Login",
  props: {
    source: String,
  },
  data() {
    return {
      email: null,
      password: null,
      count:[],
    };
  },
  methods: {
    async onload() {
      let auth = localStorage.getItem("user_access_token");
      let company_id = localStorage.getItem("user_company_id");
      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${auth}`,
        },
      };
      await this.$axios
        .post("/v1/employee-list", { company_id: company_id }, config)
        .then((response) => {
          console.log(response, "12323435456785654");
          this.desserts = response?.data?.data;
        });
    }
  },

  mounted() {
    let auth = localStorage.getItem("user_access_token");
    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${auth}`,
      },
    };
    if (auth) {
      console.log("user login")
      this.$axios.get('/v1/user-stats',config).then((response) => {
      console.log(response.data.data)
      this.count =  response.data.data
    }).catch((err) =>
      console.log(err)
    )
    }
    else {
      this.$router.push(`/login`);
      console.log("usernot login")
    }
    this.onload()

  },

}

</script>