<template>
  <div class="container-fluid">
    <div class="card shadow">
      <div class="card-body">
        <h3 class="card-title">Doimiy chiqimlar</h3>
        <table class="table table-bordered table-hover">
          <thead>
            <tr>
              <th scope="col" class="text-center">№</th>
              <th scope="col" class="text-center">Narxi</th>
              <th scope="col" class="text-center">Vaqti</th>
              <th scope="col" class="text-center">Izoh</th>
              
            </tr>
          </thead>
          <tbody>
            <tr v-for="(get, idx) in gets" :key="get">
              <th scope="row" class="text-center">{{ idx +1 }}</th>
              <td class="text-center">{{ get.price }}</td>
              <td class="text-center">{{ get.time }}</td>
              <td class="text-center">{{ get.comment }}</td>
              
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <!-- <isloading :isloading="isloading" /> -->
</template>

<script>
import { instance } from "../Api";

export default {
  data() {
    return {
      gets: [],
    };
  },
  methods: {
    getData() {
      // console.log(this.gets);
      instance
        .get("this_loan_incomes/" + this.$route.params.id)
        .then((response) => {
          this.gets = response.data;
          console.log(response.data)
        });
    },
  },
  mounted() {
    this.getData();
  },
};
</script>