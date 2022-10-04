<template>
  <v-app>
    <v-navigation-drawer dark color="#0b0b0b" v-model="drawer" :mini-variant="miniVariant" :clipped="clipped" fixed app>
      <v-list>
        <v-list-item v-for="(item,index) in dashboard" :key="index" :to="item.to" router exact
          class="text-decoration-none">
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>

        <v-list-group :value="false" prepend-icon="mdi-domain">
          <template v-slot:activator>
            <v-list-item-title>Company List</v-list-item-title>
          </template>

          <v-list>
            <v-list-item v-for="(item,index) in company" :key="index" :to="item.to" router exact
              class="text-decoration-none">
              <v-list-item-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title v-text="item.title" />
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-list-group>
        
      </v-list>
      

    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <!-- <v-btn icon @click.stop="fixed = !fixed">
        <v-icon>mdi-minus</v-icon>
      </v-btn> -->
      <v-toolbar-title v-text="title" />

      <v-spacer />
      <v-btn class="" v-on:click="profile">
        Profile
      </v-btn>
      <v-btn class="" v-on:click="logout">
        Logout
      </v-btn>

    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
 

  </v-app>

</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      clipped: true,
      drawer: false,
      fixed: false,
      dashboard: [
        {
          icon: 'mdi-home',
          title: 'Dashboard',
          to: '/admin'
        }
      ],
      company: [
        {
          // icon: 'mdi-domain',
          title: 'Company List',
          to: '/admin/companylist'
        },
        {
          // icon: 'mdi-domain',
          title: 'Company Pending',
          to: '/admin/companypendinglist'
        },
        {
          // icon: 'mdi-account-multiple',
          title: 'Company Approved',
          to: '/admin/companyapprovedlist'
        },
      ],
      

      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Firmlens'
    }
  },
  methods:
  {
    async logout() {
      let auth = localStorage.getItem("access_token")
      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${auth}`,
        },
      };
      const response = await this.$axios
        .post("/admin/admin-logout", {}, config)

      if (response.status == 200) {
        this.$router.push(`/admin/login`);
        localStorage.removeItem('access_token');
      }
      // .then((response) => {

      // }).catch((err)=>{
      //   console.log(err,"error massge")
      // });
    },
    profile() {
      console.log("edit admin profile");
      this.$router.push(`/admin/profile`);
    }
  }
}
</script>
<style>
/* .v-btn--is-elevated {
    box-shadow:none
  } */
.v-navigation-drawer {
  /* box-shadow: 6px 9px 15px -4px rgba(0,0,0,0.65); */
  border-right: 1px solid #ada9a9;
  border-bottom: 1px solid #ada9a9;
}

.theme--light.v-list-item--active::before {
  opacity: 0.30;
  border-radius: 20px;
}
.loading-page {
      position: fixed;
      top: 230px;
    right: 494px;
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
      width: 8.5rem;
    height: 8.5rem;
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