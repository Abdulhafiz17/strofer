<script>
import SidebarLink from "./SidebarLink";
import { sidebarWidth, collapsed, toggleSidebar } from "./state";
export default {
  components: { SidebarLink },
  data() {
    return {
      role: localStorage.getItem("role"),
      branch_id: localStorage.getItem("branch_id"),
    }
  },
  setup() {
    return { collapsed, sidebarWidth, toggleSidebar };
  },
};
</script>

<template>
  <transition name="fade-SidebarLink">
    <div class="sidebar" :style="{ width: sidebarWidth }">
      <div class="sidebar-link SidebarLink">

        <SidebarLink to="/kassa" v-if="role === 'branch_admin'">
          <span class="fas fa-cash-register"></span>
          <p class="ripple">Kassa</p>
        </SidebarLink>

        <SidebarLink to="/savdo" v-if="role === 'branch_admin'">
          <span class="fas fa-shopping-cart"></span>
          <p class="ripple">Savdo</p>
        </SidebarLink>

        <SidebarLink to="/filiallar" v-if="role === 'admin'">
          <span class="fas fa-code-branch"></span>
          <p class="ripple">Filiallar</p>
        </SidebarLink>
        
        <SidebarLink :to="'/hodimlar/' + branch_id" v-if="role === 'branch_admin'">
          <span class="fas fa-users"></span>
          <p class="ripple">Hodimlar</p>
        </SidebarLink>

        <SidebarLink to="/kurs" v-if="role == 'branch_admin'">
          <span class="fas fa-coins"></span>
          <p class="ripple">Kurs</p>
        </SidebarLink>
       
        <SidebarLink to="/taminot" v-if="role === 'branch_admin'">
          <span class="fas fa-truck-loading"></span>
          <p class="ripple">Ta'minotchilar</p>
        </SidebarLink>

        <SidebarLink to="/kategoriya" v-if="role === 'branch_admin'">
          <span class="fas fa-box-open"></span>
          <p class="ripple">Kategoriya</p>
        </SidebarLink>

        <SidebarLink to="/chiqim" v-if="role === 'branch_admin'">
          <span class="fas fa-wallet"></span>
          <p class="ripple">Chiqim</p>
        </SidebarLink>
        
        <SidebarLink to="/me">
          <span class="fas fa-user-circle"></span>
          <p class="ripple">Shaxsiy sahifa</p>
        </SidebarLink>
        
      </div>
    </div>
  </transition>
</template>

<style lang="css" scoped>
@import "./css/style.css";
</style>