import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/:catchAll(.*)",
    meta: { requiresAuth: true , title: 'Sahifa Topilmadi • Medland'},
    name: "NotFound",
    component: () => import("../components/NotFound/NotFound.vue")
  },
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
    path: "/me",
    meta: { requiresAuth: true },
    name: "Me",
    component: () => import("../components/Pages/Me/Me.vue"),
  },
  
  {
    path: "/statistic",
    meta: { requiresAuth: true },
    name: "Statistic",
    component: () => import("../components/Pages/AsosiyKo'rsatkichlar/Statistic.vue"),
  },

  {
    path: "/hodimlar/:id",
      meta: { requiresAuth: true },
      name: "Hodimlar",
      component: () => import("../components/Pages/Hodimlar/Hodimlar.vue"),
    },
    {
    path: "/hodimHaqida/:id",
      meta: { requiresAuth: true },
      name: "HodimHaqida",
      component: () => import("../components/Pages/Hodimlar/HodimHaqida.vue"),
    },
  {
    path: "/blocklanganHodimlar/:id",
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
  
  // {
  //   path: "/mahsulotlar",
  //   meta: { requiresAuth: true },
  //   name: "Mahsulotlar",
  //   component: () => import("../components/Pages/Mahsulotlar/Mahsulotlar.vue"),
  // },
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
    path: "/tarix/:id",
    meta: { requiresAuth: true },
    name: "Tarix",
    component: () => import("../components/Pages/Ta'minot/Tarix.vue"),
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
  {
    path: "/mahsulotlar",
    meta: { requiresAuth: true },
    name: "mahsulotlar",
    component: () => import("../components/Pages/Kategoriya/Mahsulotlar.vue"),
  },

  {
    path: "/chiqim",
    meta: { requiresAuth: true },
    name: "Chiqim",
    component: () => import("../components/Pages/Chiqim/Chiqim.vue"),
  },

  {
    path: "/chiqimlartarixi",
    meta: { requiresAuth: true },
    name: "Chiqimlartarixi",
    component: () => import("../components/Pages/Chiqim/Chiqimlartarixi.vue"),
  },

  {
    path: "/idboyichachiqim/:id",
    meta: { requiresAuth: true },
    name: "idboyichachiqim",
    component: () => import("../components/Pages/Chiqim/idboyichachiqim.vue"),
  },
  
  {
    path: "/savdo",
    meta: { requiresAuth: true },
    name: "Savdo",
    component: () => import("../components/Pages/Savdo/Savdo.vue"),
  },

  {
    path: "/kassa",
    meta: { requiresAuth: true },
    name: "Kassa",
    component: () => import("../components/Pages/Kassa/Kassa.vue"),
  },
  {
    path: "/buyurtma/:id",
    meta: { requiresAuth: true },
    name: "Buyurtma",
    component: () => import("../components/Pages/Kassa/Buyurtma.vue"),
  },

  {
    path: "/mijozlar",
    meta: { requiresAuth: true },
    name: "Mijozlar",
    component: () => import("../components/Pages/Mijozlar/Mijozlar.vue"),
  },

  {
    path: "/mijozhaqida/:id",
    meta: { requiresAuth: true },
    name: "MijozHaqida",
    component: () => import("../components/Pages/Mijozlar/MijozHaqida.vue"),
  },

  {
    path: "/nasiya",
    meta: { requiresAuth: true },
    name: "Nasiya",
    component: () => import("../components/Pages/Nasiyalar/Nasiya.vue"),
  },

  {
    path: "/nasiyaMijoz/:id",
    meta: { requiresAuth: true },
    name: "NasiyaMijoz",
    component: () => import("../components/Pages/Nasiyalar/NasiyaMijoz.vue"),
  },

  {
    path: "/vozvrat",
    meta: { requiresAuth: true },
    name: "Vozvrat",
    component: () => import("../components/Pages/Vozvrat/Vozvrat.vue"),
  },

  {
    path: "/kirim/:id",
    meta: { requiresAuth: true },
    name: "kirim",
    component: () => import("../components/Pages/Nasiyalar/kirim.vue"),
  },

  {
    path: "/thisTrade/:id",
    meta: { requiresAuth: true, icon: "./1(2).png" },
    name: "ThisTrade",
    component: () => import("../components/Pages/Savdo/ThisTrade.vue"),
  },

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem('access_token') !== null

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!loggedIn) {
      next('/')
    }
    else {
      next()
    }
  }
  next()
})

export default router;