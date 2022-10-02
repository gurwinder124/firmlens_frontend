
<template>
  <v-main class="p-0 mt-4">
    <v-data-table :headers="headers" :items="desserts" sort-by="name" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Employee List</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="reviewDialog" max-width="600px">
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formReview }}</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-select :items="items" v-model="addReview.rating" label="Rating"></v-select>
                      <!-- <v-text-field v-model="addReview.rating" label="Rating"></v-text-field> -->
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="addReview.description" label="Description"></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="reviewclose"> Cancel </v-btn>
                <v-btn color="blue darken-1" text @click="reviewsave"> Save </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialog" max-width="600px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="blue darken-1" dark class="mb-2" v-bind="attrs" v-on="on">
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
                      <v-text-field v-model="editedItem.first_name" label="First Name"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.last_name" label="Last Name"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.email" label="Email"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field type="password" v-model="editedItem.password" label="Password"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.designation" label="Designation"></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" class="text-white" @click="close"> Cancel </v-btn>
                <v-btn color="green lighten-2" class="text-white" @click="save"> Save </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="550px" class="py-4">
            <v-card class="py-5">
              <v-card-title class="text-h5">Are you sure you want to Remove Employee</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" class="text-white" @click="closeDelete">Cancel</v-btn>
                <v-btn color="green lighten-2" class="text-white" @click="deleteItemConfirm">OK</v-btn>
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

      <template v-slot:item.actions="{item}">
        <nuxt-link :to="`/user/edit/${item.id}`" class="text-decoration-none text-dark">
          <v-btn class="accpet" color="blue darken-1" dark>
            Edit
            <v-icon class="subtitle-2" dark right> mdi-pencil </v-icon>
          </v-btn>
        </nuxt-link>
        <v-btn class="accpet" color="red" dark @click="deleteItem(item)">
          Delete
          <v-icon dark right class="subtitle-2"> mdi-delete </v-icon>
        </v-btn>
        <v-btn class="accpet" color="green lighten-2" dark @click="review(item)">
          Review
          <v-icon dark right class="subtitle-2"> mdi-star </v-icon>
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
  layout: "userdefault",
  // middleware:'userauth',
  data: () => ({
    data1: "",
    userid: '',
    dialog: false,
    dialogDelete: false,
    reviewDialog: false,
    snackbar: false,
    text: ``,
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
    defaultItem: {
      name: "first_name",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
    addReview: {
      rating: '',
      description: ''
    },
    items: ['1', '2', '3', '4', '5'],
  }),
  mounted() {
    this.onload();
  },


  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "NEW EMPLOYEE" : " ";
    },
    formReview() {
      return this.editedIndex === -1 ? "New Review" : "Edit Review";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
    reviewDialog(val) {
      val || this.reviewclose();

    }

  },
  methods: {
    review(item) {
      this.reviewDialog = true;
      this.userid = item.id;
      console.log(item.id, "item data")
    },
    async reviewsave() {
      console.log(this.addReview, "Add reviws")
      let auth = localStorage.getItem("user_access_token");
      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${auth}`,
        },
      };
      await this.$axios.post('/v1/add-review', {

        user_id: this.userid,
        rating: this.addReview.rating,
        description: this.addReview.description
      }, config)
        .then((response) => {
          console.log(response.data, "response")
          if (response.data.code == 200) {
            this.snackbar = true;
            this.text = `Add Review Success`;
            this.reviewDialog = false;
          }
          else {
            this.snackbar = true;
            this.text = `Something Wrong Please Check`;
          }
        })
        .catch((err) => {
          console.log(err.data.error, 'error')
        })


    },
    reviewclose() {
      this.reviewDialog = false;
    },


    // Get Single Sub-user-list
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
        })
        .catch((err) => {
          console.log(err, 'error')
        })
    },
    //create  New Sub-user
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
          console.log(response.data.status, "create user");
          if (response.data.code == 200) {
            this.snackbar = true;
            this.text = "User Create SuccessFully"
            this.close();
            this.onload();
          }
          this.desserts = response?.data?.data;
        })
        .catch((err) => {
          console.log(err, 'error')
        });
    },

    // delete Sub user list

    deleteItem(item) {
      this.dialogDelete = true;
      this.data1 = item.id;
    },

    async deleteItemConfirm() {
      console.log(this.data1);
      let auth = localStorage.getItem("access_token");
      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${auth}`,
        },
      };
      await this.$axios
        .post(
          "/v1/delete-sub-user",
          {
            id: this.data1,
          },
          config
        )
        .then((response) => {
          this.desserts = response?.data?.data;
          if (response.data.code == 200) {
            this.snackbar = true;
            this.text = "Delete User SuccessFully"
            this.close();
            this.onload()
          }
        }).catch((err) => {
          console.log(err);
          this.snackbar = true;
          this.text = "Something Wrong Please Check"

        });
      // this.desserts.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
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
