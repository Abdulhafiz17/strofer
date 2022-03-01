<script>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { collapsed } from "./state";


export default {
  props: {
    to: { type: String, required: true },
  },
  setup(props) {
    const route = useRoute();
    const isActive = computed(() => route.path === props.to);

    return { isActive , collapsed };
  },
};
</script>

<template>
<router-link :to="to" class="link" v-wave :class="{ active: isActive }">
    <transition name="fade">
      <span v-if="!collapsed">
        <slot />
      </span>
    </transition>
  </router-link>
</template>

<style scoped>
.link {
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
  font-weight: 400;
  user-select: none;
  margin: 0 0;
  padding: 0 0;
  height: 1.5em;
  color: white;
  text-decoration: none;
  padding: 1.4rem;
  transition: 0.5s;
}


.link span {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  margin-left: -10px;
  font-size: 25px;
  /* margin-top: 13px; */
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>