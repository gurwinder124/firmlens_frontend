
<template>
  <v-main class="p-0 mt-4">
    <div v-if="loading" class="loading-page ">
        <div class="loading"></div>
         </div>
    <v-data-table :headers="headers" :items="desserts" sort-by="name" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Company Approved List</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
        </v-toolbar>
      </template>
      <template v-slot:item.company_name="{ item }">
        <nuxt-link :to="`/admin/company/${item.id}`" class="text-decoration-none text-dark">{{item.company_name}}
        </nuxt-link>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn class="pa-2" small color="primary" dark :to="`/admin/company/${item.id}`">
          Preview
          <v-icon class="subtitle-2" dark right>
            mdi-eye
          </v-icon>
        </v-btn>

      </template>
      <template v-slot:no-data>
        <v-btn color="primary">
          Reset
        </v-btn>
      </template>
    </v-data-table>
  </v-main>

</template>
  
<script>
export default {
  name: "companyapprovedlistPage",
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: 'S.no.',
        align: 'start',
        sortable: false,
        value: 'id',
      },
      { text: 'Company Name', value: 'company_name' },
      { text: 'Company Type', value: 'company_type' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    desserts: [],
    loading:false,

  }),
  mounted() {
    this.loading= true
    let auth = localStorage.getItem('access_token')
    if (auth) {
      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${auth}`,
        }
      }
      this.$axios
        .post("/admin/company-list", { status: "2" }, config)
        .then((response) => {
          console.log(response, "12323435456785654");
          this.desserts = response?.data?.data?.company_list;
          if(response.data.code == 200)
          {
            this.loading = false
          }
        });
    }
    else {
      this.$router.push(`/admin/login`);
      console.log("usernot login")
    }

  },
}
</script>
  
<style scoped>
.accpet {
  font-size: 10px;
  width: 79px;
}
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