<template>
  <div class="container-fluid">
    <div class="card shadow">
      <div class="card-body">
          {{idboyicha}}
      </div>
    </div>
  </div>
</template>

<script>
import { instance } from "../Api";

export default {
  data() {
    return {
      idboyicha: [],
    }
  },
  methods: {
    getData() {
      instance.get("this_fixed_expense"+this.$route.params.id).then((response) => {
        this.idboyicha = response.data;
        console.log(response.data);
      });
    },
  },
  mounted() {
    this.getData();
  },
};
</script>