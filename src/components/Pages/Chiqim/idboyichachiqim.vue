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
              <th scope="col" class="text-center">Valyuta</th>
              <th scope="col" class="text-center">Izoh</th>
              <th scope="col" class="text-center">Vaqti</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(chiqim, idx) in idboyicha" :key="chiqim">
              <th scope="row" class="text-center">{{ idx + 1 }}</th>
              <td class="text-center">{{ Intl.NumberFormat().format(chiqim.price) }}</td>
              <td class="text-center">{{ chiqim.currency_id }}</td>
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
          console.log(response.data)
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