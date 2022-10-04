
<template>
    
  <v-main class="p-0 mt-4">
    <div v-if="loading" class="loading-page ">
        <div class="loading"></div>
         </div>
    <v-data-table :headers="headers" :search="search" :items="employee" loading-text="Loading... Please wait"
      sort-by="number" class="elevation-1 mytable">

      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Employee List</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details>
          </v-text-field>
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
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="addReview.description" label="Description"></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="reviewclose"> Cancel </v-btn>
                <v-btn color="success" @click="reviewsave"> Save </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialog" max-width="600px">
            <template v-slot:activator="{ on, attrs }">
              <!-- <v-btn color="primary" dark class="mb-2"> -->
              <!-- Add New Employee -->
              <v-icon color="primary" class="fs-48" dark right v-bind="attrs" v-on="on">mdi-plus-circle-outline</v-icon>
              <!-- </v-btn> -->

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
                <v-btn color="primary" class="text-white" @click="close"> Cancel </v-btn>
                <v-btn color="success" class="text-white" @click="save"> Save </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="518px" class="py-4">
            <v-card class="py-5">
              <v-card-title class="text-h5">Are you sure you want to remove Employee</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="success" class="text-white" @click="closeDelete">Cancel</v-btn>
                <v-btn color="error" class="text-white" @click="deleteItemConfirm">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
        <template>
          <div class="text-center ma-2 v-snack">
            <v-snackbar :timeout="timeout" :color="color" :top="y === 'top'" :bottom="y === 'bottom'"
              :right="x === 'right'" :left="x === 'left'" :vertical="mode === 'vertical'" v-model="snackbar"
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
      <template v-slot:item="{ item }">
  
        <tr class="border">
          <td>
            {{item.id}}
          </td>
          <td >
            {{item.first_name}}
          </td> 
          <td>
            {{item.email}}
          </td>
          <td>
            {{item.designation}}
          </td>
          <td>
            <nuxt-link :to="`/user/edit/${item.id}`" class="text-decoration-none text-dark">
          <v-icon color="primary" class="Heading 1" dark right> mdi-pencil </v-icon>
        </nuxt-link>
        <v-icon color="error" dark right class="Heading 1" @click="deleteItem(item)"> mdi-delete </v-icon>
        <v-icon color="success" dark right class="Heading 1" @click="review(item)"> mdi-star </v-icon>
          </td>
        </tr>
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
  middleware:'userauth',
  data: () => ({
    data1: "",
    userid: '',
    dialog: false,
    dialogDelete: false,
    reviewDialog: false,
    loading:false,
    headers: [
      {
        text: "S.no.",
        align: "start",
        sortable: false,
        value: "id",
      },
      { text: "First Name", value: "first_name" },
      { text: "Email", value: "email" },
      { text: "Designation", value: "designation" },
      { text: "Actions", value: "actions", sortable: true },
    ],
    employee: [],
    editedIndex: -1,
    editedItem: {
      first_name: "",
      email: "",
      last_name: "",
      official_email: "",
      designation: "",
      password: "",
    },
    addReview: {
      rating: '',
      description: ''
    },
    items: ['1', '2', '3', '4', '5'],
    snackbar: false,
    y: 'top',
    x: 'right',
    mode: '',
    timeout: 6000,
    color: 'error',
    text: '',
    search: '',
  }),
  mounted() {
    this.onload();
  },


  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Employees" : " ";
    },
    formReview() {
      return this.editedIndex === -1 ? "Reviews" : "Edit Review";
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
    click() {
      this.snackbar = true;

    },
    //Add New Reviews
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
            this.color = 'success'
            this.reviewDialog = false;
          }
          else {
            this.snackbar = true;
            this.text = `Something Wrong Please Check`;
            this.color = 'error'
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
      this.loading = true;
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
          console.log(response.data.code, "12323435456785654");
          this.employee = response?.data?.data;
          if(response.data.code == 200)
          {
            this.loading = false
          }
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
            this.color = 'success'
            this.close();
            this.onload();
          }
          else {
            this.snackbar = true;
            this.text = "Something Wrong Please Check"
            this.color = 'error'
          }
          this.employee = response?.data?.data;
        })
        .catch((err) => {
          console.log(err, 'error')
        });
    },

    // delete Sub user list

    deleteItem(item) {
      this.dialogDelete = true;
      this.data1 = item.id;
      console.log(this.data1)
    },

    async deleteItemConfirm() {
      console.log(this.data1);
      let auth = localStorage.getItem("user_access_token");
      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${auth}`,
        },
      };
      console.log(config)
      await this.$axios
        .post(
          "/v1/delete-sub-user",
          {
            id: this.data1,
          },
          config
        )
        .then((response) => {
          this.employee = response?.data?.data;
          if (response.data.code == 200) {
            this.snackbar = true;
            this.text = "Delete User SuccessFully"
            this.color = 'success'
            this.close();
            this.onload()
          }
        }).catch((err) => {
          console.log(err);
          this.snackbar = true;
          this.text = "Something Wrong Please Check"
          this.color = 'error'

        });
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
  // beforeMount() {
  //   let auth = localStorage.getItem("user_access_token");
  //   if (auth) {
  //     console.log("user login")
  //   }
  //   else {
  //     this.$router.push(`/login`);
  //     console.log("usernot login")
  //   }
  // },
};
</script>
  
<style scoped>
.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:not(:last-child) > td:not(.v-data-table__mobile-row){
  border-bottom: 1px solid grey !important;
}

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

.fs-48 {
  font-size: 48px;
}

.v-data-table__mobile-table-row {
  border-bottom: 1px solid grey !important;
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
