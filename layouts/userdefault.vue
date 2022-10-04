<template>
  <v-app>
    <v-navigation-drawer dark color="#0b0b0b" v-model="drawer" :mini-variant="miniVariant" :clipped="clipped" fixed app>
      <v-list>
        <v-list-item v-for="(item) in dashboard" :loading="loading" :key="item.title" :to="item.to" router exact
          class="text-decoration-none">
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
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
      <v-btn icon @click.stop="fixed = !fixed">
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn class="" v-on:click="userprofile">
        Profile
      </v-btn>
      <v-btn class="" v-on:click="logout">
        Logout
      </v-btn>
      <!-- <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn> -->
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>

    <!-- <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer> -->

  </v-app>

</template>
<script>
import Vue from 'vue'
import axios from 'axios'
Vue.use(axios)
export default {
  name: 'userdefault',
  data() {
    return {
      clipped: true,
      drawer: false,
      fixed: false,
      loading: false,
      dashboard: [
        {
          icon: 'mdi-home',
          title: 'Dashboard',
          to: '/user',
          onclick:()=>{
            this.loading=true;
          }
        },
        {
          icon: 'mdi-account-multiple',
          title: 'Employee List',
          to: '/user/employeelist'
        },
        {
          icon: 'mdi-bank',
          title: 'Find Company',
          to: '/user/findCompany',
        
        },
        // {
        //   icon:'mdi-account-multiple',
        //   title:'test',
        //   to:'/user/test'
        // }
      ],

      items: [
        {
          icon: 'mdi-account-multiple',
          title: 'Employee List',
          to: '/user/employeelist'
        },
        {
          icon: 'mdi-account-multiple',
          title: 'Find Company',
          to: '/user/findCompany',
          onclick:()=>{
            this.loading=true;
          }
        },
        {
          icon: 'mdi-account-multiple',
          title: 'test',
          to: '/user/test'
        }
      ],

      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Firmlens'
    }
  },
  methods:
  {
    dialog1 (val) {
        if (!val) return
        setTimeout(() => (this.dialog1 = false), 4000)
      },
    async logout() {
      let auth = localStorage.getItem("user_access_token")
      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${auth}`,
        },
      };
      const response = await this.$axios
        .post("/v1/user-logout", {}, config)
      if (response.status == 200) {
        this.$router.push(`/login`);
        localStorage.removeItem('user_access_token');
      }
      // .then((response) => {
      //   console.log(response)
      //   if(response.status == 200)
      //   {
      //     this.$router.push(`/login`);
      //     localStorage.removeItem('user_access_token');
      //   }
      // }).catch((err)=>{
      //   console.log(err,"error massge")
      // });
    },
    userprofile() {
      console.log('user profile')
      this.$router.push(`/user/profile`);

    }
  }
}
</script>
<style scoped>
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
      top: 334px;
    right: 536px;
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
      width: 11.5rem;
    height: 11.5rem;
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
  