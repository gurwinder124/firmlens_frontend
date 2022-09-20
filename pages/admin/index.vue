<template>
  <v-main class="p-0">
    <v-row>
      <v-col cols="4">
        <v-card>
          <div class="d-flex flex-column justify-content-around align-items-center">
          <v-card-title>Total Company</v-card-title>
          <!-- <h5>dssf</h5> -->
          <h5>{{companyCount.totalcomapny_list}}</h5>
        </div>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card>
          <div>
          <div class="d-flex flex-column justify-content-around align-items-center">
            <v-card-title>Company Approved</v-card-title>
            <!-- <h5>fsdfd</h5> -->
            <h5>{{companyCount.totalapproved}}</h5>
            </div>
          </div>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card>
          <div class=" d-flex flex-column justify-content-around align-items-center">
            <v-card-title>Company Pending</v-card-title>
            <!-- <h5>fsf</h5> -->
            <h5>{{companyCount.totalpending}}</h5>
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
  layout: 'default',
  name: "IndexPage",
  data: () => ({
    loading: false,
    selection: 1,
    companyCount: [],
        desserts: [
          {
            name: 'Frozen Yogurt',
            calories: 159,
          },
          {
            name: 'Ice cream sandwich',
            calories: 237,
          },
          {
            name: 'Eclair',
            calories: 262,
          },
          {
            name: 'Cupcake',
            calories: 305,
          },
          {
            name: 'Gingerbread',
            calories: 356,
          },
          {
            name: 'Jelly bean',
            calories: 375,
          },
          {
            name: 'Lollipop',
            calories: 392,
          },
          {
            name: 'Honeycomb',
            calories: 408,
          },
          {
            name: 'Donut',
            calories: 452,
          },
          {
            name: 'KitKat',
            calories: 518,
          },
        ],
  }),

  methods: {
  },
  mounted() {
    let auth = localStorage.getItem("access_token");
    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${auth}`,
      },
    };
    if (auth) {
      console.log("user login")
      this.$axios.get('admin/comapny-count-list', config).then((Response) => {
        this.companyCount = Response.data.data
        console.log(this.companyCount, "mfdgjf")
      })
    }
    else {
      console.log("user not  login")
      this.$router.push(`/admin/login`);
    }
  }
};
</script>
  