<template>
  <v-main class="p-0 mt-4">
    <v-row>
      <v-col cols="6">
        <v-card class="pa-4">
          <v-row align="center" class="mx-0">
            <v-icon large left color="success">
              mdi-account-outline
            </v-icon>
            <v-card-title class="text-h5">Total Employee</v-card-title>

          </v-row>
          <v-row align="center" class="mx-0">
            <v-card-title class="text-h4">{{count.emp_count}}</v-card-title>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card class="pa-4">
          <v-row align="center" class="mx-0">
            <v-icon large left color="success">
              mdi-account-outline
            </v-icon>
            <v-card-title class="text-h5">Total Reviews</v-card-title>

          </v-row>
          <v-row align="center" class="mx-0">
            <v-card-title class="text-h4">{{count.emp_review}}</v-card-title>
          </v-row>

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
      count: [],
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
      this.$axios.get('/v1/user-stats', config).then((response) => {
        console.log(response.data.data)
        this.count = response.data.data
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