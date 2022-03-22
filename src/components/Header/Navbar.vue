<template>
  <nav
    class="navbar fixed-top d-flex flex-row bg-dark p-2 shadow"
    style="height: 80px"
  >
    <div class="cont d-flex">
      <div class="text-center navbar-brand-wrapper">
        <img
          src="../../../public/photo_2021-11-12_17-55-00.jpg"
          alt="Logo"
          style="width: 50px; border-radius: 5px"
        />
      </div>
      <div class="icon">
        <span
          @click="toggleSidebar"
          id="bars"
          class="
            navbar-toggler navbar-toggler
            align-self-center
            m-2
            fas
            fa-bars
            text-secondary
          "
        ></span>
      </div>
    </div>

    <div class="inline-block d-flex justify-content-between align-items-center">

      <Notificaion/>

      <Toggle :mode="mode" @toggle="$emit('toggle')" />

      <div class="text-white logout ml-3" @click="logout">
        <span class="fas fa-right-from-bracket"></span>
      </div>
    </div>
  </nav>
</template>

<script>
import Toggle from "@/components/Mode/Toggle.vue";
import { collapsed, toggleSidebar } from "@/components/sidebar/state";
import Notificaion from './Notificaion.vue';
export default {
  data() {
    return {};
  },

  methods: {
    logout() {
      localStorage.removeItem("access_token");
      this.$router.push("/");
    },
  },

  props: ["mode"],
  components: {
    Notificaion,
    Toggle,
  },
  setup() {
    return { collapsed, toggleSidebar };
  },
};
</script>

<style>
.logout {
  cursor: pointer;
}

.fas {
  font-size: 20px;
  margin-right: 10px;
}

.sozlamalar {
  width: 120px;
  height: 170px;
  background: white;
  position: fixed;
  top: 80px;
  right: 20px;
  border-radius: 15px;
  color: black;
  box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
  border: 0;
  margin: 3px;
  display: flex;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.slide-in-up-enter-active,
.slide-in-up-leave-active {
  transition: all 0.5s;
  transform: translateY(0);
}
.slide-in-up-enter,
.slide-in-up-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

/* .img-responsive { */
/* height: 40px;
  width: 60px;
  padding-left: 11px; */
/* } */

.dropdown-menu {
  background: var(--dark);
}
</style>