<template>
  <div class="container-fluid">
    <router-link class="btn btn-sm mb-2 btn-outline-success" to="/chiqim">
      <span class="fa fa-arrow-left"/> Ortga
    </router-link>
    <div class="card shadow">
      <div class="card-body">
        <h3 class="card-title">Doimiy chiqimlar</h3>
        <table class="table table-bordered table-hover">
          <thead>
            <tr>
              <th scope="col" class="text-center">№</th>
              <th scope="col" class="text-center">Narxi</th>
              <th scope="col" class="text-center">Izoh</th>
              <th scope="col" class="text-center">Vaqti</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(chiqim, idx) in idboyicha" :key="chiqim">
              <th scope="row" class="text-center">{{ idx + 1 }}</th>
              <td class="text-center">{{ Intl.NumberFormat().format(chiqim.price) }} so'm</td>
              <td class="text-center">{{ chiqim.comment }}</td>
              <td class="text-center">{{ chiqim.time.replace("T", " ") }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <isloading :isloading="isloading" :message="errorr"/>
</template>

<script>
import { instance } from "../Api";
import isloading from "../../Anime/Anime.vue";
export default {
  components: { isloading },
  data() {
    return {
      idboyicha: [],
      chiqim: {},
      isloading: true,
      errorr: "",
    };
  },
  methods: {
    getData() {
      instance
        .get("this_fixed_expense/" + this.$route.params.id)
        .then((response) => {
          this.idboyicha = response.data;
        })
        .catch((err) => {
          this.isloading = false;
          this.errorr = err.message;
        })
        .finally((this.isloading = false))
    },
  },
  mounted() {
    this.getData();
  },
};
</script>