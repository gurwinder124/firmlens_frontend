<template>
  <v-main class="p-0">
    <v-row>
      <v-col cols="4">
        <v-card>
          <!-- <img height="100" class="w-100" src="../../assets/imges/company_card.jpg" /> -->
          <div class="d-flex flex-column justify-content-around align-items-center">
          <v-card-title>Total Employee</v-card-title>
          <h5>dssf</h5>
          <!-- <h5>{{companyCount.totalcomapny_list}} df</h5> -->
        </div>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card>
          <div>
            <!-- <img height="100" class="w-100" src="../../assets/imges/company_card.jpg" /> -->
          <div class="d-flex flex-column justify-content-around align-items-center">
            <v-card-title>Company Approved</v-card-title>
            <h5>fsdfd</h5>
            <!-- <h5>{{companyCount.totalapproved}}fs</h5> -->
            </div>
          </div>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card>
          <!-- <img height="100" class="w-100" src="../../assets/imges/company_card.jpg" /> -->
          <div class=" d-flex flex-column justify-content-around align-items-center">
            <v-card-title>Company Pending</v-card-title>
            <h5>fsf</h5>
            <!-- <h5>{{companyCount.totalpending}}</h5> -->
          </div>
        </v-card>
      </v-col>
    </v-row>
    <!-- <v-row class="d-flex justify-content-around">
      <v-col cols="5">
        <template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            Name
          </th>
          <th class="text-left">
            Calories
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in desserts"
          :key="item.name"
        >
          <td>{{ item.name }}</td>
          <td>{{ item.calories }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>
      </v-col>
    
      <v-col cols="5">
        <template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            Name
          </th>
          <th class="text-left">
            Calories
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in desserts"
          :key="item.name"
        >
          <td>{{ item.name }}</td>
          <td>{{ item.calories }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>
      </v-col>
    </v-row> -->
  </v-main>
</template>
   <script>
    export default {
        layout: "userdefault",
      name: "Login",
      props: {
        source: String,
      },
      data() {
        return {
          email: null,
          password: null,
        };
      },
      methods: {
     
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
    }
    </script>