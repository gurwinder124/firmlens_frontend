
<template>
  <v-main class="p-0 mt-4">
    <div v-if="loading" class="loading-page ">
        <div class="loading"></div>
         </div>
    <v-data-table :headers="headers" :items="company_list" sort-by="name" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat >
          <v-toolbar-title>Company List</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-divider class="mx-4" inset vertical></v-divider>

          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
          <v-select  class="selected mt-10" :items="company" v-model="e1" 
                            label="Select" item-text="status"
                             item-value="abbr"
                             v-on:change="changeRoute" 
                             ></v-select>
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
            <v-snackbar :timeout="timeout" :color="color" :top="y === 'top'" 
              :right="x === 'right'" :vertical="mode === 'vertical'" v-model="snackbar"
              class="v-snackbar-toast position">
              {{ text }}
              <template v-slot:action="{ attrs }">
                <v-btn color="white" text v-bind="attrs" @click="snackbar = false">
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
      <template v-slot:item.request_status="{ item }">
        <v-chip color="warning" outlined class="ma-2" v-if="item.request_status == 1">
          Pending
        </v-chip>
        <v-chip color="success" outlined class="ma-2" v-if="item.request_status == 2">
          accpeted
        </v-chip>
        <v-chip color="red" outlined class="ma-2" v-if="item.request_status == 3">
          Decline
        </v-chip>
      </template>
      <template v-slot:item.actions="{ item }">
        
        <v-btn color="primary" class="pa-2" small dark :to="`/admin/company/${item.id}`" >
          Preview
          <v-icon class="subtitle-2" dark right>
            mdi-eye
          </v-icon>
        </v-btn>
        
        <v-btn color="success" class="pa-2" small dark v-if="item.request_status == 1" @click="accpet(item)">
          Accept
          <v-icon class="subtitle-2" dark right>
            mdi-checkbox-marked-circle
          </v-icon>
        </v-btn>
        <v-btn color="error" class="pa-2" small dark v-if="item.request_status == 1" @click="deleteItem(item)">
          Decline
          <v-icon dark right class="subtitle-2"> mdi-cancel </v-icon>
        </v-btn>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary"> Reset </v-btn>
      </template>
    </v-data-table>
  </v-main>

</template>

<script>

export default {
  layout: "admin",
  middleware:['adminauth'],
  data: () => ({
    data1: "",
    dialog: false,
    dialogDelete: false,
    e1:null,
    headers: [
      {
        text: "S.no.",
        align: "start",
        sortable: false,
        value: "id",

      },
      { text: "Company Name", value: "company_name" },
      { text: "Company Type", value: "company_type" },
      { text: "Domain Name", value: "domain_name" },
      { text: "Status", value: "request_status" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    company_list: [],
    loading:false,
    company: [
        {
          'status': 'Company List',
          'abbr': '0'
        },
        {
          'status': 'Company Pending',
          'abbr': '1'
        },
        {
          'status': 'Company Approved',
          'abbr': '2'
        },
      ],
      snackbar: false,
    y: 'top',
    x: 'right',
    mode: '',
    timeout: 6000,
    color: '',
    text: '',
    search: '',
  }),

  mounted() {

    // let auth = localStorage.getItem("access_token");
    // if (auth) {
    //   console.log("user login")
      this.onload();
    // }
    // else {
    //   this.$router.push(`/admin/login`);
    //   console.log("usernot login")
    // }
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  methods: {
    async changeRoute(a) {
      let auth = localStorage.getItem("access_token");
      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${auth}`,
        },
      };
      await this.$axios
        .post("/admin/company-list", { status: a }, config)
        .then((response) => {
          this.company_list = response?.data?.data.company_list;
        });
      },
    async onload() {
      this.loading = true
      let auth = localStorage.getItem("access_token");
      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${auth}`,
        },
      };
      await this.$axios
        .post("/admin/company-list", { status: this.status }, config)
        .then((response) => {
          console.log(response.data);
          this.company_list = response?.data?.data.company_list;
          if(response.data.code == 200)
          {
            this.loading = false
          }
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
          this.company_list = response?.data?.data;
          if (response.data.code == 200) {
            this.snackbar = true;
            this.text = "Company Accpet SuccessFully"
            this.color = 'success'
            this.onload();
          }
        }).catch((err) => {
          console.log("Something Wrong")
          this.snackbar = true;
          this.text = "Something Please Check"
          this.color= 'error'
        });
    },


    deleteItem(item) {
      this.dialogDelete = true;
      this.data1 = item.id
    },

    async deleteItemConfirm() {
      console.log(this.data1)
      let auth = localStorage.getItem("access_token");
      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${auth}`,
        },
      };
      await this.$axios
        .post("/admin/update-company-status", {
          status: "3",
          id: this.data1,
        }, config)
        .then((response) => {
          console.log(response)
          this.company_list = response?.data?.data;
          if (response.data.code == 200) {
            this.snackbar = true;
            this.text = "Company Decline SuccessFully";
            this.color='success'
            this.onload();
          }
          else {
            this.snackbar = true;
            this.text = "Something Wrong Please Check";
            this.color = 'error '
          }
        }).catch((err) => {
          console.log(err)
        });
      this.closeDelete();
    },

    close() {
      this.dialog = false;
    },

    closeDelete() {
      this.dialogDelete = false;
    },
  },
  mounted() {
    this.onload();
  },
};
</script>

<style scoped>

.c-pointer {
  cursor: pointer;
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