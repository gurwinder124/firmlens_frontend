
<template>
  <v-main class="p-0 mt-4">
    <v-data-table :headers="headers" :items="desserts" sort-by="name" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Company List</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                New Item
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.name" label="Dessert name"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.type" label="type"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.domain" label="domain (g)"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.status" label="status (g)"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.action" label="action (g)"></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
                <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
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
            <v-snackbar v-model="snackbar" right top color="blue darken-1" class="v-snackbar-toast position">
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
  data: () => ({
    data1: "",
    dialog: false,
    dialogDelete: false,
    snackbar: false,
    text: ``,
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
    desserts: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      type: 0,
      domain: 0,
      status: 0,
      action: 0,
    },
    defaultItem: {
      name: "",
      type: 0,
      domain: 0,
      status: 0,
      action: 0,
    },
  }),

  mounted() {
    let auth = localStorage.getItem("access_token");
    if (auth) {
      console.log("user login")
      this.onload();
    }
    else {
      this.$router.push(`/admin/login`);
      console.log("usernot login")
    }
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
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
    async onload() {
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
          this.desserts = response?.data?.data.company_list;
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
          this.desserts = response?.data?.data;
          if (response.data.code == 200) {
            this.snackbar = true;
            this.text = "Company Accpet SuccessFully"
            this.onload();
          }
        }).catch((err) => {
          console.log("Something Wrong")
          this.snackbar = true;
          this.text = "Company Accpet SuccessFully"
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
          this.desserts = response?.data?.data;
          if (response.data.code == 200) {
            this.snackbar = true;
            this.text = "Company Decline SuccessFully";
            this.onload();
          }
          else {
            this.snackbar = true;
            this.text = "Something Wrong Please Check";
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

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
      this.close();
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
</style>