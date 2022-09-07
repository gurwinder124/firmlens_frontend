const router = new VueRouter({
    routes: [
      ...
      {
        path: "/protected",
        name: "protected",
        component: import(/* webpackChunkName: "protected" */ './Protected.vue'),
        beforeEnter(to, from, next) {
            if (store.getters["auth/hasPermission"]) {
                next()
              } else {
                next({
                  name: "dashboard" // back to safety route //
                });
              }
        }
    ]
  })