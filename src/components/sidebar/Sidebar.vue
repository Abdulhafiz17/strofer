<script>
import SidebarLink from "./SidebarLink";
import { sidebarWidth, collapsed, toggleSidebar } from "./state";
const role = localStorage.getItem("role")
export default {
  components: { SidebarLink },
  setup() {
    return { collapsed, sidebarWidth, toggleSidebar, role };
  },
};
</script>

<template>
  <transition name="fade-SidebarLink">
    <div class="sidebar" :style="{ width: sidebarWidth }">
      <div class="sidebar-link SidebarLink">

        <SidebarLink to="/hodimlar" v-if="role == 'branch_admin'">
          <span class="fas fa-users"></span>
          <p class="ripple">Hodimlar</p>
        </SidebarLink>
        <SidebarLink to="/kurs" v-if="role == 'branch_admin'">
          <span class="fas fa-users"></span>
          <p class="ripple">Kurs</p>
        </SidebarLink>
        <SidebarLink to="/filialadmin" v-if="role == 'branch_admin'">
          <span class="fas fa-users"></span>
          <p class="ripple">Filial admin</p>
        </SidebarLink>
        
      </div>
    </div>
  </transition>
</template>

<style lang="css" scoped>
@import "./css/style.css";
</style>