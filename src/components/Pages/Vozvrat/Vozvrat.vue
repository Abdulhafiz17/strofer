<template>
  <Vozvrat/>
  <div class="container-fluid mt-2">
    <div class="card shadow">
      <div class="card-header">
        <div class="row">
          <div class="col-md">
            <h3>Vozvrat</h3>
          </div>
        </div>
      </div>
      <div class="card-body">
        <div class="table-reponsive text-center table-bordered">
          <table class="table table-sm table-hover">
            <thead>
              <tr>
                <th>№</th>
                <th>Mahsulot</th>
                <th>Brend</th>
                <th>Miqdor</th>
                <th>Mijoz</th>
                <th>Sotuvchi</th>
                <th>Narx</th>
                <th>Summa</th>
                <th>Sana</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(vozvrat, n) in vozvratlar" :key="vozvrat.id">
                <td>{{ n + 1 }}</td>
                <td>{{ vozvrat.product }}</td>
                <td>{{ vozvrat.brand }}</td>
                <td>{{ vozvrat.quantity }} {{ vozvrat.measure }}</td>
                <td>{{ vozvrat.customer }}</td>
                <td>{{ vozvrat.user }}</td>
                <td>{{ Intl.NumberFormat({style: "currency"}).format(vozvrat.price) }} so'm</td>
                <td>{{ Intl.NumberFormat({style: "currency"}).format(vozvrat.price * vozvrat.quantity) }} so'm</td>
                <td>{{ vozvrat.time.substr("T", 10) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <isloading :isloading="isloading" />
</template>

<script>
import { instance } from "../Api";
import isloading from "../../Anime/Anime.vue";
import Vozvrat from "../AsosiyKo'rsatkichlar/Statistic.vue"
export default {
  components: { isloading, Vozvrat },
  data() {
    return {
      vozvratlar: [],
      isloading: false,
    };
  },
  methods: {
    getData() {
      this.vozvratlar = [];
      this.isloading = true;
      instance.get("all_returned_products").then((products) => {
        if (products.data.length > 0) {
          products.data.forEach((element) => {
                instance.get("this_user/" + element.owner_id).then((user) => {
                  instance
                    .get("this_product/" + element.product_id + "/empty")
                    .then((product) => {
                      this.vozvratlar.push({
                        product: product.data.name,
                        brand: product.data.brand,
                        measure: product.data.measure,
                        user: user.data.name,
                        price: element.price,
                        customer: element.customer,
                        quantity: element.quantity,
                        time: element.time,
                      });
                      this.isloading = false;
                    });
                });
          });
        } else {
          this.isloading = false
        }
      });
    },
  },
  mounted() {
    console.clear();
    this.getData();
  },
};
</script>