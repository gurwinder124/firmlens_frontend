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
      <div v-if="loading" class="loading-page ">
        <div class="loading"></div>
         </div>
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
    loading:false,
  }),

  methods: {
  },
  mounted() {
    this.loading = true;
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
        console.log(Response.data.code, "mfdgjf")
        if(Response.data.code == 200)
        {
          this.loading= false
        }
      })
    }
    else {
      console.log("user not  login")
      this.$router.push(`/admin/login`);
    }
  }
};
</script>
<style>
.loading-page {
    position: fixed;
    top: 345px;
    right: 622px;
    z-index: 1000;
    padding: 1rem;
    text-align: center;
    font-size: 4rem;
    font-family: sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
    
    .loading {
      display: inline-block;
      width: 3.5rem;
    height: 3.5rem;
      border: 4px solid rgba(9, 133, 81, 0.705);
      border-radius: 50%;
      border-top-color: #158876;
      animation: spin 1s ease-in-out infinite;
    }
    @keyframes spin {
      to {
        -webkit-transform: rotate(360deg);
      }
    }

</style>
  