<template>
  <v-main class="p-0">
    <v-row>
      <v-col cols="6">
        <v-card class="border border-secondary">
          <!-- <img height="100" class="w-100" src="../../assets/imges/company_card.jpg" /> -->
          <div class="d-flex flex-column justify-content-around align-items-center">
            <v-card-title>Total Employee</v-card-title>
            <h5>dssf</h5>
            <!-- <h5>{{companyCount.totalcomapny_list}} df</h5> -->
          </div>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card class="border border-secondary">
          <div>
            <!-- <img height="100" class="w-100" src="../../assets/imges/company_card.jpg" /> -->
            <div class="d-flex flex-column justify-content-around align-items-center">
              <v-card-title>Total Reviews</v-card-title>
              <h5>fsdfd</h5>
              <!-- <h5>{{companyCount.totalapproved}}fs</h5> -->
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
  middleware: 'userauth',
  name: "Login",
  props: {
    source: String,
  },
  data() {
    return {
      email: null,
      password: null,
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
  beforeMount() {
    let auth = localStorage.getItem("user_access_token");
    if (auth) {
      console.log("user login")
    }
    else {
      this.$router.push(`/login`);
      console.log("usernot login")
    }
  },
mounted(){
  this.onload()
}
}
    
</script>