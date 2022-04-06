<template>
  <div class="container-fluid">
    <div class="card shadow">
      <div class="card-header">
          <h3> {{ mijoz.name }} nasiyalari </h3>
      </div>
      <table class="table table-hover table-borderless text-center">
          <thead>
              <tr>
                  <th>№</th>
                  <th>Sana</th>
                  <th>Summa</th>
                  <th>Qaytarish sanasi</th>
              </tr>
          </thead>
          <tbody>
              <tr v-for="(nasiya, n) in nasiyalar" :key="nasiya">
                  <td> {{ n + 1 }} </td>
                  <td> {{ nasiya.time.replace("T", " ") }} </td>
                  <td> {{ Intl.NumberFormat().format(nasiya.price) }} so'm </td>
                  <td> {{ nasiya.return_date }} </td>
              </tr>
          </tbody>
      </table>
    </div>
  </div>
  <AnimeVue :isloading="isloading" :message="error" />
</template>

<script>
import swal from "sweetalert";
import { instance } from "../Api";
import AnimeVue from "../../Anime/Anime.vue";
export default {
  components: { AnimeVue },
  data() {
    return {
      mijoz: {},
      nasiyalar: [],
      isloading: true,
      error: "",
    };
  },
  methods: {
    getData() {
      instance
        .get("this_customer_loans/" + this.$route.params.id)
        .then((response) => {
          console.log(response.data);
          this.nasiyalar = response.data
          this.isloading = false;
        })
        .catch((err) => {
          this.isloading = false;
          this.error = err.message;
        });

      instance
        .get("this_customer/" + "1ae8d3a5-13b3-4393-ab48-c5e72cd9a592")
        .then((response) => {
          console.log(response.data);
          this.mijoz = response.data
        }).catch((err) => {
            this.isloading = false
            this.error = err.message
        })
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<style>
</style>