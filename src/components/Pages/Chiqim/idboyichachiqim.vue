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
              <td class="text-center">{{ chiqim.narxi }}</td>
              <td class="text-center">{{ chiqim.valyuta }}</td>
              <td class="text-center">{{ chiqim.comment }}</td>
              <td class="text-center">{{ chiqim.sana }}</td>
            </tr>
          </tbody>
        </table>
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


      chiqim:{
        narxi: null,
        valyuta: "",
        comment: "",
        sana: "",
      }
    };
  },
  methods: {
    getData() {
      instance
        .get("this_fixed_expense/" + this.$route.params.id)
        .then((response) => {
          response.data.forEach(element => {
            instance.get("this_currency/" + element.currency_id)
            .then((res)=>{
              this.chiqim = {
                narxi: element.price,
                valyuta: res.data.currency,
                comment: element.comment,
                sana: element.time.replace('T',' ')
              }
              this.idboyicha.push(this.chiqim)
            })
          });
          // this.idboyicha = response.data;
          console.log(this.idboyicha);
        });
    },
  },
  mounted() {
    this.getData();
  },
};
</script>