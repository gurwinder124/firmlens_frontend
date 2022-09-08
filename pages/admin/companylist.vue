
<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    sort-by="calories"
    class="elevation-1"
  >
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
                    <v-text-field
                      v-model="editedItem.name"
                      label="Dessert name"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.calories"
                      label="Calories"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.fat"
                      label="Fat (g)"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.carbs"
                      label="Carbs (g)"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.protein"
                      label="Protein (g)"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions >
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
              <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card >
            <v-card-title class="text-h5"
              >Are you sure you want to D this item?</v-card-title
            >
            <v-card-actions >
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete"
                >Cancel</v-btn
              >
              <v-btn color="blue darken-1"  text @click="deleteItemConfirm()"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.request_status="{ item }">
      <v-btn
        class="status"
        color="warning"
        dark
        v-if="item.request_status == 1" 
      >
        Pending
      </v-btn>
      <v-btn
        class="status"
        color="primary"
        dark
        v-if="item.request_status == 2"
      >
        accpet
      </v-btn>
      <v-btn class="status" color="red" dark v-if="item.request_status == 3">
        Decline
      </v-btn>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-btn
        class="accpet"
        color="primary"
        dark
        v-if="item.request_status == 1"
      >
        Accept
        <v-icon class="subtitle-2" dark right>
          mdi-checkbox-marked-circle
        </v-icon>
      </v-btn>
      <v-btn
        class="accpet"
        color="red"
        dark
        v-if="item.request_status == 1"
        @click="deleteItem(item)"
      >
        Decline
        <v-icon dark right class="subtitle-2"> mdi-cancel </v-icon>
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
  data: () => ({
    dialog: false,
    dialogDelete: false,
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
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
    defaultItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
  }),
  async mounted() {
    this.onload();
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
          Authorization: `Bearer ${auth}`,
        },
      };
      await this.$axios
        .post("/admin/company-list", { status: this.status }, config)
        .then((response) => {
          console.log(response, "12323435456785654");
          this.desserts = response?.data?.data;
        });
    },
    async accpet(item) {
      console.log(item.id, "item data ");
      let auth = localStorage.getItem("access_token");
      const config = {
        headers: {
          Authorization: `Bearer ${auth}`,
        },
      };
      await this.$axios
        .post("/admin/update-company-status",{
          status: "2",
          id: item.id,
        }, config)
        .then((response) => {
          this.desserts = response?.data?.data;
          if (response.data.code == 200) {
        this.onload();
      }
        });
    },

    deleteItem(item) {
      this.dialogDelete = true;

      
    },

    deleteItemConfirm() {
      // this.desserts.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    }, 

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
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
  padding: 0px important;
  height: 16px !important;
}
</style>