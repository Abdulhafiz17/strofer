<template>
  <div
    class="app"
    :class="mode"
    :style="[
      this.$route.name !== 'Login'
        ? { 'padding-top': '50px' }
        : { 'padding-top': '0' },
    ]"
  >
    <PageLoad />
    <Navbar
      v-if="this.$route.name !== 'Login'"
      @togglenav="navOpen = !navOpen"
      :mode="mode"
      @toggle="toggle"
    />
    <Sidebar
      v-if="this.$route.name !== 'Login'"
      :open="navOpen"
      @click="close_sidebar"
    />
    <div class="scroll">
      <div
        class="content"
        :style="[
          this.$route.name !== 'Login'
            ? { 'margin-top': contentTop }
            : { 'margin-top': '0' },
        ]"
      >
        <div
          id="content-app"
          :style="[
            this.$route.name !== 'Login'
              ? { 'margin-left': sidebarPadding }
              : { 'margin-left': '0' },
          ]"
        >
          <Router-view />
          <Footer />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Navbar from "./components/Header/Navbar.vue";
import Sidebar from "@/components/sidebar/Sidebar";
import {
  sidebarWidth,
  sidebarPadding,
  close_sidebar,
  collapsed,
} from "@/components/sidebar/state";
import { sidebarWidthContent } from "@/components/sidebar/state";
import { contentTop } from "@/components/sidebar/state";
import PageLoad from "./components/Preloader/PreloaderAnime.vue";
import Footer from "./components/Footer/Footer.vue";
export default {
  data: () => {
    return {
      navOpen: true,
      mode: "light",
    };
  },
  components: {
    Sidebar,
    Navbar,
    PageLoad,
    Footer,
  },
  setup() {
    return {
      sidebarWidth,
      sidebarWidthContent,
      contentTop,
      sidebarPadding,
      close_sidebar,
      collapsed,
    };
  },
  created() {
    window.addEventListener("keyup", this.keyPress);
  },
  methods: {
    keyPress(e) {
      if (e.key === "") {
        this.toggle();
      }
    },
    toggle() {
      if (this.mode === "dark") {
        this.mode = "light";
      } else {
        this.mode = "dark";
      }
    },
    timeDark() {
      var now = new Date().getHours();

      if (now >= 19 || now <= 6) {
        this.mode = "dark";
      } else {
        this.mode = "light";
      }
    },
  },
  mounted() {
    this.timeDark();
  },
};
</script>

<style>
:root {
  --success: #198754FF;
}

#content-app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
}

.dark textarea {
  background: #343a40;
  color: #fff;
}

.dark textarea:active,
.dark textarea:hover,
.dark textarea:focus {
  background: #343a40;
  color: #fff;
}

.dark .card .card-body .table table {
  background: #343a40;
  color: #fff;
}

.dark .card .card-body .table table tr:hover {
  color: #fff;
}

.dark div table tbody tr:hover {
  color: #fff;
}

table:hover {
  cursor: default;
}

.dark .footer hr {
  background: #fff;
}

.app {
  min-height: 100vh;
  padding: 50px 0 0 0;
}

.scroll {
  min-height: 100vh;
}

.card a {
  text-decoration: none;
 }

::-webkit-scrollbar {
  width: 15px;
  height: 15px;
}

::-webkit-scrollbar-track {
  background: #343a40;
}

::-webkit-scrollbar-thumb {
  background: grey;
  border-radius: 8px;
  border: 3px solid gray;
}
.dark {
  background: #343a40;
  color: white;
}

.dark .card {
  background: #3f4449;
  color: white;
}

.dark .btn {
  font-size: 16px;
  cursor: pointer;
}
.dark .btn:hover,
.dark .btn:active {
  color: #3f4449;
}

.dark table {
  color: white;
}

.dark a {
  background: #3f4449;
  color: white;
}

.form-control {
  border: 1px solid var(--success);
}

.form-control:active,
.form-control:hover,
.form-control:focus {
  border: 1px solid var(--success);
}

.dark input {
  background: #3f4449;
  color: white;
}
.dark input:hover,
.dark input:focus,
.dark input:active {
  background: #3f4449;
  color: white;
  border: 1px solid var(--success);
}

.dark select {
  background: #3f4449;
  color: white;
  border: 1px solid var(--success);
}

.dark select:hover,
.dark select:focus,
.dark select:active {
  background: #3f4449;
  color: white;
  border: 1px solid var(--success);
}

.modal-content {
  border: 1px solid var(--success);
}

.dark .modal-content {
  background: #3f4449;
  color: white;
}

.inputFile {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}
.blocks {
  width: 40px;
  line-height: 35px;
  text-align: center;
  border: 1px solid var(--success);
  display: inline-block;
  color: black;
}
.blocks:not(:first-child) {
  margin-left: 5px;
}
.blocks:first-child {
  border-radius: 10px 0 0 10px;
}
.blocks:last-child {
  border-radius: 0 10px 10px 0;
}
.blocks:hover {
  background-color: var(--success);
}
.inputFile + label {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  margin: 10px auto;
  font-size: 16px;

  border-radius: 50px;
  padding: 6px 24px;
  cursor: pointer;
}

#label {
  margin-left: 20px;
}

.form-control:active,
.form-control:focus,
.form-control:hover {
  box-shadow: none;
}

.card:hover {
  cursor: default;
}

.card {
  border: 1px solid var(--success);
}

.card-header {
  background: white;
  font-family: font-weight-light;
}

.card-footer {
  background: white;
}

.card-footer {
  border-bottom-left-radius: 20px;
}

.input-group-text {
  border: 1px solid var(--success);
  background: white;
}

.dark .card-header {
  background: #3f4449;
}

.dark .card-footer {
  background: #3f4449;
}

.dark .input-group .input-group-text {
  background: #3f4449;
  color: white;
}
</style>