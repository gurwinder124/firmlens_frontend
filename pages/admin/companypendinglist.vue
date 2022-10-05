
<template>
  <v-main class="p-0 mt-4">
    <div v-if="loading" class="loading-page ">
        <div class="loading"></div>
         </div>
    <v-data-table :headers="headers" :items="desserts" sort-by="calories" class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Company Pending List</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialogDelete" max-width="576px" class="py-4">
          <v-card class="py-5">
            <v-card-title class="text-h5">Are you sure you want to Decline the Company?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn class="btn btn-success" text @click="closeDelete">Cancel</v-btn>
              <v-btn class="btn btn-danger" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
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
    </template>
    <template v-slot:item.company_name="{ item }">
      <nuxt-link :to="`/admin/company/${item.id}`" class="text-decoration-none text-dark">{{item.company_name}}
      </nuxt-link>
    </template>
    <template v-slot:item.actions="{item}">
      <nuxt-link :to="`/admin/company/${item.id}`" class="text-decoration-none">
        <v-btn class="pa-2" small color="primary" dark>
          Preview
          <v-icon class="subtitle-2" dark right>
            mdi-eye
          </v-icon>
        </v-btn>
      </nuxt-link>
      <v-btn class="pa-2" small color="success" dark v-if="item.request_status == 1" @click="accpet(item)">
        Accept
        <v-icon class="subtitle-2" dark right>
          mdi-checkbox-marked-circle
        </v-icon>
      </v-btn>
      <v-btn class="pa-2" small color="error" dark v-if="item.request_status == 1" @click="deleteItem(item)">
        Decline
        <v-icon dark right class="subtitle-2"> mdi-cancel </v-icon>
      </v-btn>
    </template>
  </v-data-table>
  </v-main>
  
</template>
  
<script>
export default {
  name: "companypendinglistPage",
  middleware:['adminauth'],
  data: () => ({
    dialog: false,
    dialogDelete: false,
    snackbar: false,
    text: ``,
    headers: [
      {
        text: 'S.no.',
        align: 'start',
        sortable: false,
        value: 'id',
      },
      { text: 'Company Name', value: 'company_name' },
      { text: 'Company Type', value: 'company_type' },
      { text: 'Domain Name', value: 'domain_name' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    desserts: [],
    editedIndex: -1,
    loading:false,
    // editedItem: {
    //   name: '',
    //   calories: 0,
    //   fat: 0,
    //   carbs: 0,
    //   protein: 0,
    // },
    // defaultItem: {
    //   name: '',
    //   calories: 0,
    //   fat: 0,
    //   carbs: 0,
    //   protein: 0,
    // },
  }),
  mounted() {
    this.loading = true;
    let auth = localStorage.getItem('access_token')
    // if (auth) {
      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${auth}`,
        }
      }
      this.$axios
        .post("/admin/company-list", { status: "1" }, config)
        .then((response) => {
          console.log(response.data.code, "12323435456785654");
          this.desserts = response?.data?.data?.company_list;
          if(response.data.code == 200)
          {
            this.loading = false;
          }
        });
    // }
    // else {
    //   this.$router.push(`/admin/login`);
    //   console.log("usernot login")
    // }


  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },
  methods: {
    async onload() {
      let auth = localStorage.getItem("access_token");
      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${auth}`,
        },
      };
      await this.$axios
        .post("/admin/company-list", { status: 1 }, config)
        .then((response) => {
          console.log(response, "12323435456785654");
          this.desserts = response?.data?.data?.company_list;
        });
    },

    async accpet(item) {
      console.log(item.id, "item data ");
      let auth = localStorage.getItem("access_token");
      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${auth}`,
        },
      };
      await this.$axios
        .post("/admin/update-company-status", {
          status: "2",
          id: item.id,
        }, config)
        .then((response) => {
          console.log(response)
          this.desserts = response?.data?.data?.company_list;
          if (response.data.code == 200) {
            this.snackbar = true;
            this.text = "Company Accpet SuccessFully"
            this.onload();
          }
        }).catch((err) => {
          console.log("Something Wrong", err)
          this.snackbar = true;
          this.text = "Something  Wrong Please Check"
        });
    },

    editItem(item) {
      // this.editedIndex = this.desserts.indexOf(item)
      // this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.dialogDelete = true;
      this.data1 = item.id
    },

    deleteItemConfirm() {
      console.log(this.data1)
      let auth = localStorage.getItem("access_token");
      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${auth}`,
        },
      };
      this.$axios
        .post("/admin/update-company-status", {
          status: "3",
          id: this.data1,
        }, config)
        .then((response) => {
          this.desserts = response?.data?.data?.company_list;
          if (response.data.code == 200) {
            this.onload();
            this.snackbar = true;
            this.text = "Company Decline SuccessFully"
          }
          else {
            this.snackbar = true;
            this.text = "Something Wrong Please Check"
          }
        }).catch((err) => {
          console.log(err)
        });
      // this.desserts.splice(this.editedIndex, 1);
      this.closeDelete();
    },


    close() {
      this.dialog = false
      // this.$nextTick(() => {
      //   this.editedItem = Object.assign({}, this.defaultItem)
      //   this.editedIndex = -1
      // })
    },

    closeDelete() {
      this.dialogDelete = false
      // this.$nextTick(() => {
      //   this.editedItem = Object.assign({}, this.defaultItem)
      //   this.editedIndex = -1
      // })
    },

    save() {
      // if (this.editedIndex > -1) {
      //   Object.assign(this.desserts[this.editedIndex], this.editedItem)
      // } else {
      //   this.desserts.push(this.editedItem)
      // }
      this.close()
    },
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