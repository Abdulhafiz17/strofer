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

    // Taminot >

  {
    path: "/taminot",
    meta: { requiresAuth: true },
    name: "Taminot",
    component: () => import("../components/Pages/Ta'minot/Taminot.vue"),
  },
  {
    path: "/taminotOlish",
    meta: { requiresAuth: true },
    name: "TaminotOlish",
    component: () => import("../components/Pages/Ta'minot/TaminotOlish.vue"),
  },
  {
    path: "/tarix",
    meta: { requiresAuth: true },
    name: "Tarix",
    component: () => import("../components/Pages/Ta'minot/Tarix.vue"),
  },
  {
    path: "/taminotTarixi",
    meta: { requiresAuth: true },
    name: "TaminotTarixi",
    component: () => import("../components/Pages/Ta'minot/TaminotTarixi.vue"),
  },
  {
    path: "/tolovTarixi",
    meta: { requiresAuth: true },
    name: "TolovTarixi",
    component: () => import("../components/Pages/Ta'minot/TolovTarixi.vue"),
  },

    // Taminot >|

    {
      path: "/ishVaqti",
      meta: { requiresAuth: true },
      name: "IshVaqti",
      component: () => import("../components/Pages/IshVaqti/IshVaqti.vue"),
    },
    {
      path: "/mahsulotlar",
      meta: { requiresAuth: true },
      name: "Mahsulotlar",
      component: () => import("../components/Pages/Mahsulotlar/Mahsulotlar.vue"),
    },
    {
      path: "/mahsulotlarMain/:id",
      meta: { requiresAuth: true },
      name: "MahsulotlarMain",
      component: () => import("../components/Pages/Mahsulotlar/Mahsulotlarmain.vue"),
    },
  {
    path: "/homashio",
    meta: { requiresAuth: true },
    name: "Homashio",
    component: () => import("../components/Pages/Mahsulotlar/Homashio.vue"),
  },
  {
    path: "/tseh",
    meta: { requiresAuth: true },
    name: "Tseh",
    component: () => import("../components/Pages/Tseh/Tseh.vue"),
  },
  {
    path: "/tsehKirish",
    meta: { requiresAuth: true },
    name: "TsehKirish",
    component: () => import("../components/Pages/Tseh/TsehKirish.vue"),
  },
  {
    path: "/ishTarixi",
    meta: { requiresAuth: true },
    name: "IshTarixi",
    component: () => import("../components/Pages/BajarilganIsh/IshTarixi.vue"),
  },
  {
    path: "/bajarilganIsh",
    meta: { requiresAuth: true },
    name: "BajarilganIsh",
    component: () => import("../components/Pages/BajarilganIsh/BajarilganIshJarayoni.vue"),
  },
  {
    path: "/bajarilganIshKirish",
    meta: { requiresAuth: true },
    name: "BajarilganIshKirish",
    component: () => import("../components/Pages/BajarilganIsh/BajarilganIshJarayoniKirish.vue"),
  },
  {
    path: "/ish/:id",
    meta: { requiresAuth: true },
    name: "Ish",
    component: () => import("../components/Pages/Mahsulotlar/Ish.vue"),
  },
  {
    path: "/mijozlar",
    meta: { requiresAuth: true },
    name: "Mijozlar",
    component: () => import("../components/Pages/Mijozlar/Mijozlar.vue"),
  },
  {
    path: "/ombor",
    meta: { requiresAuth: true },
    name: "Ombor",
    component: () => import("../components/Pages/Ombor/Ombor.vue"),
  },  
  {
    path: "/mijozTahrirlash",
    meta: { requiresAuth: true },
    name: "MijozTahrirlash",
    component: () => import("../components/Pages/Mijozlar/MijozTahrirlash.vue"),
  },
  {
    path: "/mijozTayyorlov",
    meta: { requiresAuth: true },
    name: "MijozTayyorlov",
    component: () => import("../components/Pages/Mijozlar/MijozTayyorlov.vue"),
  },
  {
    path: "/tayyorlov",
    meta: { requiresAuth: true },
    name: "Tayyorlov",
    component: () => import("../components/Pages/Tayyorlov/Tayyorlov.vue"),
  },
  {
    path: "/omborKirish",
    meta: { requiresAuth: true },
    name: "OmborKirish",
    component: () => import("../components/Pages/Ombor/OmborKirish.vue"),
  },
  {
    path: "/bloklanganMijozlar",
    meta: { requiresAuth: true },
    name: "BloklanganMijozlar",
    component: () => import("../components/Pages/Mijozlar/BloklanganMijozlar.vue"),
  },
  {
    path: "/buyurtmaOlish",
    meta: { requiresAuth: true },
    name: "BuyurtmaOlish",
    component: () => import("../components/Pages/Mijozlar/BuyurtmaOlish.vue"),
  },
  {
    path: "/mijozHaqida",
    meta: { requiresAuth: true },
    name: "MijozHaqida",
    component: () => import("../components/Pages/Mijozlar/MijozHaqida.vue"),
  },
  {
    path: "/mijozQoshish",
    meta: { requiresAuth: true },
    name: "MijozQoshish",
    component: () => import("../components/Pages/Mijozlar/MijozQoshish.vue"),
  },
  {
    path: "/qogoz",
    meta: { requiresAuth: true },
    name: "Qogoz",
    component: () => import("../components/Pages/Ombor/Qog'oz.vue"),
  },
 
  {
    path: "/vazvrat",
    meta: { requiresAuth: true },
    name: "Vazvrat",
    component: () => import("../components/Pages/Mijozlar/Vazvrat.vue"),
  },
  {
    path: "/vazvratQalam",
    meta: { requiresAuth: true },
    name: "VazvratQalam",
    component: () => import("../components/Pages/Mijozlar/VazvratQalam.vue"),
  },
  {
    path: "/transport",
    meta: { requiresAuth: true },
    name: "Transport",
    component: () => import("../components/Pages/Transport/Transport.vue"),
  },
  {
    path: "/transportMijoz",
    meta: { requiresAuth: true },
    name: "TransportMijoz",
    component: () => import("../components/Pages/Transport/TransportMijoz.vue"),
  },
  {
    path: "/ombor",
    meta: { requiresAuth: true },
    name: "Ombor",
    component: () => import("../components/Pages/Ombor/Ombor.vue"),
  },
  {
    path: "/jarayon",
    meta: { requiresAuth: true },
    name: "Jarayon",
    component: () => import("../components/Pages/Mahsulotlar/Jarayon.vue"),
  },
  {
    path: "/users",
    meta: { requiresAuth: true },
    name: "Users",
    component: () => import("../components/Pages/Hodimlar/Users.vue"),
  },
  {
    path: "/usersBlock",
    meta: { requiresAuth: true },
    name: "UsersBlock",
    component: () => import("../components/Pages/Hodimlar/UserBlock.vue"),
  },
  {
    path: "/hodimlar",
    meta: { requiresAuth: true },
    name: "Hodimlar",
    component: () => import("../components/Pages/Hodimlar/Hodimlar.vue"),
  },
  {
    path: "/kPITarixi",
    meta: { requiresAuth: true },
    name: "KPITarixi",
    component: () => import("../components/Pages/Hodimlar/KPITarixi.vue"),
  },
  {
    path: "/bloklanganHodimlar",
    meta: { requiresAuth: true },
    name: "BloklanganHodimlar",
    component: () => import("../components/Pages/Hodimlar/BloklanganHodimlar.vue"),
  },
  {
    path: "/homashiotarixi",
    meta: { requiresAuth: true },
    name: "Homashiotarixi",
    component: () => import("../components/Pages/Mahsulotlar/Homashiotarixi.vue"),
  },
  {
    path: "/tayyormahsulot",
    meta: { requiresAuth: true },
    name: "Tayyormahsulot",
    component: () => import("../components/Pages/Tayyormahsulot/Tayyormahsulot.vue"),
  },
  {
    path: "/TMkirish",
    meta: { requiresAuth: true },
    name: "TMkirish",
    component: () => import("../components/Pages/Tayyormahsulot/TMkirish.vue"),
  },
  {
    path: "/tayyormahsulot",
    meta: { requiresAuth: true },
    name: "Tayyormahsulot",
    component: () => import("../components/Pages/Tayyormahsulot/Tayyormahsulot.vue"),
  },
  {
    path: "/salfetka",
    meta: { requiresAuth: true },
    name: "Salfetka",
    component: () => import("../components/Pages/Tayyormahsulot/Salfetka.vue"),
  },
  {
    path: "/tmkirish",
    meta: { requiresAuth: true },
    name: "TMkirish",
    component: () => import("../components/Pages/Tayyormahsulot/TMkirish.vue"),
  },
  {
    path: "/qabulqilish",
    meta: { requiresAuth: true },
    name: "Qabulqilish",
    component: () => import("../components/Pages/Tayyormahsulot/Qabulqilish.vue"),
  },
  {
    path: "/tmkirish",
    meta: { requiresAuth: true },
    name: "TMkirish",
    component: () => import("../components/Pages/Tayyormahsulot/TMkirish.vue"),
  },
  {
    path: "/sozlamalar",
    meta: { requiresAuth: true },
    name: "sozlamalar",
    component: () => import("../components/Pages/Sozlamalar/Sozlamalar.vue"),
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