<template>
  <div>
  </div>
</template>

<script>
export default {
  mounted() {
    localStorage.setItem("tab", "statistic")
    if (localStorage.getItem("reloaded")) {
      localStorage.removeItem("reloaded");
    } else {
      localStorage.setItem("reloaded", "1");
      location.reload();
    }
  },
}
</script>

<style>

</style>