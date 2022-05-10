<template>
  <h3 class="mb-4">
    <span>Mahsulotlar umumiy balansi:</span>
    <span class="float-right">
      {{ Intl.NumberFormat().format(umumiy_balans_uzs) }} so'm
      {{ Intl.NumberFormat().format(umumiy_balans_usd) }} dollar
    </span>
  </h3>
  <div>
    <table class="table table-sm table-hover table-borderless text-center">
      <thead>
        <tr>
          <th>№</th>
          <th>Mahsulot</th>
          <th>Narx</th>
          <th>Qoldiq</th>
          <th>Summa</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(mahsulot, n) in mahsulotlar" :key="mahsulot">
          <td>{{ n + 1 }}</td>
          <td>{{ mahsulot.name }} {{mahsulot.brand}}</td>
          <td>{{ Intl.NumberFormat().format(mahsulot.price)}} {{mahsulot.currency_id}}</td>
          <td>{{ mahsulot.quantity }} {{ mahsulot.measure }}</td>
          <td>{{ Intl.NumberFormat().format(mahsulot.price * mahsulot.quantity) }} {{ mahsulot.currency_id }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <isloading :isloading="isloading" :message="error" />
</template>

<script>
import swal from "sweetalert";
import { instance } from "../Api";
import isloading from "../../Anime/Anime.vue";
export default {
  name: "Mahsulotlar",
  components: { isloading },
  data() {
    return {
      isloading: false,
      error: null,
      mahsulotlar: null,
      umumiy_balans_uzs: null,
      umumiy_balans_usd: null,
    };
  },
  mounted() {
    this.getData();
    alert
  },
  methods: {
    getData() {
      this.mahsulotlar = [];
      this.umumiy_balans_uzs = 0;
      this.umumiy_balans_usd = 0;
      this.isloading = true;
      instance
        .get("all_categories")
        .then((res) => {
          res.data.forEach((category) => {
            instance
              .get("all_products/" + category.id)
              .then((res) => {
                res.data.forEach((product) => {
                  if (product.currency_id == "so'm") {
                    this.umumiy_balans_uzs += product.price * product.quantity;
                  } else if (product.currency_id == "dollar") {
                    this.umumiy_balans_usd += product.price * product.quantity;
                  }
                  this.mahsulotlar.push(product);
                });
                this.isloading = false;
              })
              .catch((error) => {
                this.isloading = false;
                this.error = error.message;
              });
          });
        })
        .catch((error) => {
          this.isloading = false;
          this.error = error.message;
        });
    },
  },
};
</script>

<style>
</style>