<template>
  <v-main class="p-0 mt-4">
    <v-row>
      <v-col cols="4">
        <v-card class="pa-4">
          <v-row align="center" class="mx-0">
            <v-icon large left color="success">
              mdi-checkbox-marked-circle
            </v-icon>
            <v-card-title class="text-h5">Total Company</v-card-title>

          </v-row>
          <v-row align="center" class="mx-0">
            <v-card-title class="text-h4">{{companyCount.totalcomapny_list}}</v-card-title>
          </v-row>
        </v-card>
      </v-col>

      <v-col cols="4">
        <v-card class="pa-4">
          <v-row align="center" class="mx-0">
            <v-icon large left color="success">
              mdi-account-check-outline
            </v-icon>
            <v-card-title class="text-h5">Company Approved</v-card-title>

          </v-row>
          <v-row align="center" class="mx-0">
            <v-card-title class="text-h4">{{companyCount.totalapproved}}</v-card-title>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card class="pa-4">
          <v-row align="center" class="mx-0">
            <v-icon large left color="warning">
              mdi-account-clock-outline
            </v-icon>
            <v-card-title class="text-h5">Company Pending</v-card-title>
          </v-row>
          <v-row align="center" class="mx-0">
            <v-card-title class="text-h4">{{companyCount.totalpending}}</v-card-title>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

  </v-main>
</template>
  
  
<script>
export default {
  layout: 'default',
  name: "IndexPage",
  data: () => ({
    selection: 1,
    companyCount: [],
  }),

  methods: {
  },
  mounted() {
    let auth = localStorage.getItem("access_token");
    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${auth}`,
      },
    };
    if (auth) {
      console.log("user login")
      this.$axios.get('admin/comapny-count-list', config).then((Response) => {
        this.companyCount = Response.data.data
        console.log(this.companyCount, "mfdgjf")
      })
    }
    else {
      console.log("user not  login")
      this.$router.push(`/admin/login`);
    }
  }
};
</script>
  