
<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    sort-by="name"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Employee List</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="600px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
              Add New Employee
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
                    <v-text-field
                      v-model="editedItem.first_name"
                      label="First Name"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.last_name"
                      label="Last Name"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.email"
                      label="Email"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      type="password"
                      v-model="editedItem.password"
                      label="Password"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.designation"
                      label="Designation"
                    ></v-text-field>
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
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5"
              >Are you sure you want to D this item?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete"
                >Cancel</v-btn
              >
              <v-btn color="blue darken-1" text @click="deleteItemConfirm()"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>

    <template v-slot:item.actions="{item}">
      <v-btn class="accpet" color="primary" dark @click="accpet(item)">
        Edit
        <v-icon class="subtitle-2" dark right> mdi-pencil </v-icon>
      </v-btn>
      <v-btn class="accpet" color="red" dark @click="deleteItem(item)">
        Delete
        <v-icon dark right class="subtitle-2"> mdi-delete </v-icon>
      </v-btn>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary"> Reset </v-btn>
    </template>
  </v-data-table>
</template>
  </template>
  
  <script>
import axios from "axios";

export default {
  layout: "userdefault",
  data: () => ({
    data1: "",
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        
        text: "S.no.",
        align: "start",
        sortable: false,
        value: "id",
      },
      { text: "First Name", value: "first_name" },
      { text: "Email", value: "email" },
      { text: "Last Name ", value: "last_name" },
      { text: "Designation", value: "designation" },
      { text: "Actions", value: "actions", sortable: true },
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      first_name: "",
      email: "",
      last_name: "",
      official_email: "",
      designation: "",
      password: "",
    },
    // defaultItem: {
    //   name: "",
    //   calories: 0,
    //   fat: 0,
    //   carbs: 0,
    //   protein: 0,
    // },
  }),
  async mounted() {
    this.onload();
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "NEW EMPLOYEE" : "Edit EMPLOYEE";
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
    //create user
    async save() {
      console.log(this.editedItem, "add employee");
      let auth = localStorage.getItem("user_access_token");
      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${auth}`,
        },
      };
      await this.$axios
        .post(
          "/v1/create-sub-user",
          {
            first_name: this.editedItem.first_name,
            email: this.editedItem.email,
            password: this.editedItem.password,
            designation: this.editedItem.designation,
            last_name: this.editedItem.last_name,
          },
          config
        )
        .then((response) => {
          console.log(response.data.status, " create user");
          if (response.data.code == 200) {
            console.log("test");
            this.close();
            this.onload();
          }
          this.desserts = response?.data?.data;
        });
    },
    // show employee list
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
    },
    async accpet(item) {
      // this.editedIndex=1;
      console.log(item.id, "item data ");
      // let auth = localStorage.getItem("user_access_token");
      // const config = {
      //   headers: {
      //     Authorization: `Bearer ${auth}`,
      //   },
      // };
      // await this.$axios
      //   .post(
      //     "/v1/create-sub-user",
      //     {
      //       status: "2",
      //       id: item.id,
      //     },
      //     config
      //   )
      //   .then((response) => {
      //     this.desserts = response?.data?.data;
      //     if (response.data.code == 200) {
      //       this.onload();
      //     }
      //   });
    },

    deleteItem(item) {
      this.dialogDelete = true;
      this.data1 = item.id;
    },

    deleteItemConfirm() {
      console.log(this.data1);
      let auth = localStorage.getItem("access_token");
      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${auth}`,
        },
      };
      this.$axios
        .post(
          "/admin/update-company-status",
          {
            status: "3",
            id: this.data1,
          },
          config
        )
        .then((response) => {
          this.desserts = response?.data?.data;
          console.log(response.data.code, "dsgfd");
          if (response.data.code == 200) {
            this.close();
          }
        });
      // this.desserts.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      // this.$nextTick(() => {
      //   this.editedItem = Object.assign({}, this.defaultItem);
      //   this.editedIndex = -1;
      // });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    // save() {
    //   if (this.editedIndex > -1) {
    //     Object.assign(this.desserts[this.editedIndex], this.editedItem);
    //   } else {
    //     this.desserts.push(this.editedItem);
    //   }
    //   this.close();
    // },
  },
  mounted() {
    this.onload();
  },
};
</script>
  
  <style scoped>
.accpet {
  font-size: 10px;
  width: 79px;
}
.status {
  font-size: 10px;
  width: 54px;
  padding: 0px;
  padding: 0px !important;
  height: 16px !important;
}
</style>
