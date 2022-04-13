<template>
    <div class="container-fluid">
        <div class="card shadow">
            <div class="card-body">
                <table class="table table-hover table-borderless text-center">
                    <thead>
                        <tr>
                            <th>№</th>
                            <th>Mahsulot</th>
                            <th>Narx</th>
                            <th>Hajm</th>
                            <th>Sana</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(savdo, n) in savdolar" :key="savdo">
                            <td> {{ n + 1 }} </td>
                            <td> {{ savdo.product_name }} {{ savdo.product_brand }} </td>
                            <td> {{ Intl.NumberFormat().format(savdo.selling_price) }} so'm </td>
                            <td> {{ savdo.quantity }} {{ savdo.measure }} </td>
                            <td> {{ savdo.time.replace("T", " ") }} </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  <Anime :isloading="isloading" :message="error"/>
</template>

<script>
import { instance } from '../Api';
import Anime from "../../Anime/Anime.vue"
export default {
    components: {Anime},
  data() {
    return {
      savdolar: [],
      date: "",
      isloading: true,
      error: "",
    };
  },
  methods: {
      getData() {
          instance.get("this_order_trades/" + this.$route.params.id).then((respon) => {
              this.savdolar = respon.data
              this.isloading = false
          })
      },
  },
  mounted() {
      this.getData()
  },
};
</script>

<style>
</style>