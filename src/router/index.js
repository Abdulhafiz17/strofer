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

  {
    path: "/kurs",
    meta: { requiresAuth: true },
    name: "kurs",
    component: () => import("../components/Pages/Kurs/Kurs.vue"),
  },

  {
    path: "/filialadmin",
    meta: { requiresAuth: true },
    name: "Filialadmin",
    component: () => import("../components/Pages/Filial admin/Filialadmin.vue"),
  },
  
  {
    path: "/mahsulotlar",
    meta: { requiresAuth: true },
    name: "Mahsulotlar",
    component: () => import("../components/Pages/Mahsulotlar/Mahsulotlar.vue"),
  },
  {
    path: "/taminot",
    meta: { requiresAuth: true },
    name: "Taminot",
    component: () => import("../components/Pages/Ta'minot/Taminot.vue"),
  },
  {
    path: "/taminotOlish/:id",
    meta: { requiresAuth: true },
    name: "TaminotOlish",
    component: () => import("../components/Pages/Ta'minot/TaminotOlish.vue"),
  },
  
  {
    path: "/filiallar",
    meta: { requiresAuth: true },
    name: "Filiallar",
    component: () => import("../components/Pages/Filial/Filial.vue"),
  },
  {
    path: "/filialKirish/:id",
    meta: { requiresAuth: true },
    name: "FilialKirish",
    component: () => import("../components/Pages/Filial/FilialKirish.vue"),
  },

  {
    path: "/kategoriya",
    meta: { requiresAuth: true },
    name: "Kategoriya",
    component: () => import("../components/Pages/Kategoriya/Kategoriya.vue"),
  },
  
  {
    path: "/kmahsulotlar/:id",
    meta: { requiresAuth: true },
    name: "kmahsulotlar",
    component: () => import("../components/Pages/Kategoriya/kmahsulotlar.vue"),
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