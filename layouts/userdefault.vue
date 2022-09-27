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
            v-for="(item) in dashboard"
            :key="item.title"
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
      v-on:click="userprofile">
        Profile
      </v-btn>
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
    name: 'userdefault',
    data () {
      return {
        clipped: true,
        drawer: false,
        fixed: false,
        dashboard:[
          {
            icon:'mdi-home',
            title: 'Dashboard',
            to:'/user'
          },
          {
            icon: 'mdi-account-multiple',
            title: 'Employee List',
            to: '/user/employeelist'
          },
          {
            icon:'mdi-bank',
            title:'Find Company',
            to:'/user/findCompany'
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
            icon:'mdi-account-multiple',
            title:'Find Company',
            to:'/user/findCompany'
          },
          {
            icon:'mdi-account-multiple',
            title:'test',
            to:'/user/test'
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
 async  logout() {
      let auth = localStorage.getItem("user_access_token")
      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${auth}`,
        },
      };
    const response = await  this.$axios
        .post("/v1/user-logout",{},config)
        if(response.status == 200)
          {
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
    userprofile()
    {
      console.log('user profile')
            this.$router.push(`/user/profile`);

    }
  }
  }
  </script>
  <style scoped>
     .v-navigation-drawer{
    /* box-shadow: 6px 9px 15px -4px rgba(0,0,0,0.65); */
    border-right: 1px solid #ada9a9;
    border-bottom: 1px solid #ada9a9;
    }
    .theme--light.v-list-item--active::before {
    opacity: 0.30;
    border-radius: 20px;
}
  </style>
  