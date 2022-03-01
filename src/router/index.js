import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Login",
    component: () => import("../components/SignUp/Login.vue"),
  },
  {
    path: "/home",
    meta: { requiresAuth: true },
    name: "Home",
    component: () => import("../components/Pages/Home/Home.vue"),
  },

  {
    path: "/hodimlar",
    meta: { requiresAuth: true },
    name: "Hodimlar",
    component: () => import("../components/Pages/Hodimlar/Hodimlar.vue"),
  },
  
  {
    path: "/blocklanganHodimlar",
    meta: { requiresAuth: true },
    name: "BlocklanganHodimlar",
    component: () => import("../components/Pages/Hodimlar/BloklanganHodimlar.vue"),
  },

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// router.beforeEach((to, from, next) => {
//   const loggedIn = localStorage.getItem('access_token') != null

//   if (to.matched.some((record) => record.meta.requiresAuth)) {
//     if (!loggedIn) {
//       next('/')
//     }
//     else {
//       next()
//     }
//   }
//   next()
// })

export default router;