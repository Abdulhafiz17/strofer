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
    <!-- <PageLoad /> -->
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
          <Footer v-if="this.$route.name !== 'Login'"/>
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
// import PageLoad from "./components/Preloader/PreloaderAnime.vue";
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
    // PageLoad,
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
    console.clear()
    this.timeDark();
  },
};
</script>

<style>
@import url("./main.css");

/* .dark .btn {
  font-size: 16px;
  cursor: pointer;
} */

/* .inputFile {
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
} */

</style>