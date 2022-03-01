<script>
import SidebarLink from "./SidebarLink";
import { sidebarWidth, collapsed, toggleSidebar } from "./state";
export default {
  components: { SidebarLink },
  setup() {
    return { collapsed, sidebarWidth, toggleSidebar };
  },
};
</script>

<template>
  <transition name="fade-SidebarLink">
    <div class="sidebar" :style="{ width: sidebarWidth }">
      <div class="sidebar-link SidebarLink">

        <SidebarLink to="/hodimlar">
          <span class="fas fa-users"></span>
          <p class="ripple">Hodimlar</p>
        </SidebarLink>
        
      </div>
    </div>
  </transition>
</template>

<style lang="css" scoped>
@import "./css/style.css";
</style>