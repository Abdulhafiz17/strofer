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
                <td class="text-center">{{ chiqim.narxi }}</td>
                <td class="text-center">{{ chiqim.valyuta }}</td>
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
        errorr: [],
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
          response.data.forEach((element) => {
            instance.get("this_currency/" + element.currency_id).then((res) => {
              this.chiqimtarix = {
                narxi: element.price,
                valyuta: res.data.currency,
                comment: element.comment,
              };
              this.chiqimtarixi.push(this.chiqimtarix);
            });
          });
          // this.chiqimtarixi = response.data;
          console.log(this.chiqimtarixi);
          // window.location.reload(this.getData)
          // this.chiqimtarixi = response.data;
          console.log(response.data);
        })
        .finally((this.isloading = false))
        .catch((err) => {
          this.isloading = false;
          this.errorr = err.message;
        });
    },
  },
  mounted() {
    this.getData();
  },
};
</script>