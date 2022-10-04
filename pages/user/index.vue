<template>
  <v-main class="p-0 mt-4">

    <v-row >
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
        <div v-if="loading" class="loading-page ">
        <div class="loading"></div>
        <p>Loading...</p>
         </div>
      </v-col>
    </v-row>
  </v-main>
</template>
<script>
// import userauth from '../../ middleware/userauth';

export default {
    layout: "userdefault",
    name: "Login",
    middleware:['userauth'],
    props: {
        source: String,
    },
    data() {
        return {
            email: null,
            password: null,
            count: [],
           loading : false
        };
    },
    methods: {
        async onload() {
            let auth = localStorage.getItem("user_access_token");
            let company_id = localStorage.getItem("user_company_id");
            const config = {
                headers: {
                    "Content-type": "application/json",
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
      this.loading = true;
        let auth = localStorage.getItem("user_access_token");
        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${auth}`,
            },
        };
        // if (auth) {
        //     console.log("user login");
            this.$axios.get("/v1/user-stats", config).then((response) => {
                console.log(response.data);
                this.count = response.data.data;
                if (response.data.code == 200) {
                  this.loading = false
                }
            }).catch((err) => console.log(err));
        // }
        // else {
        //     this.$router.push(`/login`);
        //     console.log("usernot login");
        // }
        this.onload();
    },
}

</script>
<style scoped>
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