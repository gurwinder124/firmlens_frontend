<template>
  <v-app >
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
    <v-list>
      <v-list-item
          v-for="(item,index) in dashboard"
          :key="index"
          :to="item.to"
          router
          exact
          class="text-decoration-none"
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>

      <v-list-group
        :value="false"
        prepend-icon="mdi-account-circle"
      >
        <template v-slot:activator>
          <v-list-item-title>Company List</v-list-item-title>
        </template>

        <v-list>
        <v-list-item
          v-for="(item,index) in company"
          :key="index"
          :to="item.to"
          router
          exact
          class="text-decoration-none"
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list> 
      </v-list-group>
      <!-- <v-list-item
          v-for="(item) in items"
          :key="3"
          :to="item.to"
          router
          exact
          class="text-decoration-none"
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item> -->
    </v-list>
    <!-- <v-list>
      <v-list-item
          v-for="(item) in profile "
          :key="2"
          :to="item.to"
          router
          exact
          class="text-decoration-none"
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
    </v-list> -->

    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="clipped = !clipped"
      >
         <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="fixed = !fixed"
      >
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn class="" 
      v-on:click="logout">
        Logout
      </v-btn>
      <v-btn
        icon
        @click.stop="rightDrawer = !rightDrawer"
      >
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer
      v-model="rightDrawer"
      :right="right"
      temporary
      fixed
    >
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light>
              mdi-repeat
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
     
    </v-navigation-drawer>
    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  
  </v-app>
   
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
Vue.use(axios)
export default {
  name: 'DefaultLayout',
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      dashboard:[
        {
          icon:'mdi-home',
          title: 'Dashboard',
          to:'/admin'
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
        // items: [
        //   {
        //     icon: 'mdi-account-multiple',
        //     title: 'User List',
        //     to: '/admin/userlist'
        //   },
        // ],
      // profile: [
      //   {
      //     icon: 'mdi-account-multiple',
      //     title: 'profile',
      //     to: '/admin/profile'
      //   },
      // ],
    
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Firmlens'
    }
  },
  methods:
{
   logout() {
      let auth = localStorage.getItem("access_token")
      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${auth}`,
        },
      };
       this.$axios
        .post("/admin/admin-logout",{},config)
        .then((response) => {
          if(response.status == 200)
          {
            this.$router.push(`/admin/login`);
            localStorage.removeItem('access_token');
          }
        }).catch((err)=>{
          console.log(err,"error massge")
        });
    },
  }
}
</script>
<style>
  .v-btn--is-elevated {
    box-shadow:none
  }
</style>