<template>
  <div class="container-fluid">
    <div class="card shadow">
      <div class="card-body">
        <div class="row">
          <div class="col-md-4">
            <h3 class="card-title">Bir martalik chiqim tarixi</h3>
          </div>
        </div>
        <div class="row">
          <table class="table table-bordered table-hover">
            <thead>
              <tr>
                <th scope="col" class="text-center">№</th>
                <th class="col-md-3 text-center">Narx</th>
                <th class="col-md-4 text-center">Valyuta</th>

                <th class="col-md-4 text-center">Izoh</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(chiqim, idx) in chiqimtarixi" :key="chiqim">
                <th class="text-center">{{ idx + 1 }}</th>
                <td class="text-center">{{ Intl.NumberFormat().format(chiqim.price) }}</td>
                <td class="text-center">{{ chiqim.currency_id }}</td>
                <td class="text-center">{{ chiqim.comment }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <isloading :isloading="isloading" :message="errorr"/>
</template>

<script>
import { instance } from "../Api";
import _ from "underscore";
import isloading from "../../Anime/Anime.vue";
export default {
  components: { isloading },
  data() {
    return {
      chiqimtarixi: [],
      chiqimtarix: {
        narxi: null,
        valyuta: "",
        comment: "",
        errorr: "",
      },
      isloading: false,
    };
  },

  methods: {
    getData() {
      this.isloading = true;
      instance
        .get("variable_expenses")
        .then((response) => {
          this.chiqimtarixi = response.data
          console.log(response.data)
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