import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import VWave from 'v-wave'
import store from '@/store'

createApp(App).use(router).use(VWave).use(store).mount("#app");
