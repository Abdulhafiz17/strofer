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
                <th>№</th>
                <th class="col-md-3 text-center">Narx</th>
                <th class="col-md-4 text-center">Valyuta</th>
                <th class="col-md-4 text-center">Filial nomi</th>
                <th class="col-md-4 text-center">Izoh</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(chiqim, idx) in chiqimtarixi" :key="chiqim">
                <th>{{ idx + 1 }}</th>
                <td class="text-center">{{ chiqim.price }}</td>
                <td class="text-center">{{ chiqim.currency_id }}</td>
                <td class="text-center">{{ chiqim.branch_id }}</td>
                <td class="text-center">{{ chiqim.comment }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { instance } from "../Api";
import _ from "underscore";

export default {
  data() {
    return {
      chiqimtarixi:[],
    };
  },

  methods: {
    getData() {
      instance.get("variable_expenses").then((response) => {
        this.chiqimtarixi = response.data;
        console.log(response.data);
      });
    },
  },
  mounted() {
    this.getData();
  },
};
</script>