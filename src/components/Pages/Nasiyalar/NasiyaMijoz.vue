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
                  <th></th>
              </tr>
          </thead>
          <tbody>
              <tr v-for="(nasiya, n) in nasiyalar" :key="nasiya">
                  <td> {{ n + 1 }} </td>
                  <td> {{ nasiya.time.replace("T", " ") }} </td>
                  <td> {{ Intl.NumberFormat().format(nasiya.price) }} so'm </td>
                  <td> {{ nasiya.return_date }} </td>
                  <td>
                    <button 
                      class="btn btn-sm btn-success"
                      data-toggle="modal"
                      href="#payLoan"
                      @click="tolov.id = nasiya.id"
                    >
                      <span class="fa fa-coins"/>
                    </button>
                  </td>
              </tr>
          </tbody>
      </table>
    </div>
  </div>
  <div class="modal fade" id="payLoan">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h4> Nasiya to'lash </h4>
        </div>
        <form @submit.prevent="payToLoan(tolov.id)">
          <div class="modal-body">
            <div class="input-group">
              <div class="input-group">
                <input class="form-control" type="number" min="0" placeholder="Summa" v-model="tolov.price"/>
                <div class="input-group-append">
                  <div class="input-group-text">
                    so'm
                  </div>
                </div>
              </div>
              <div class="input-group mt-1">
                <textarea class="form-control" cols="30" rows="2" placeholder="Izoh" v-model="tolov.comment"/>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-sm btn-outline-primary">
              <span class="far fa-circle-check"/> To'lash
            </button>
            <button 
              class="btn btn-sm btn-outline-danger"
              data-dismiss="modal"
            >
              <span class="far fa-circle-xmark"/> Bekor qilish
            </button>
            <input type="hidden" id="close_modal" data-dismiss="modal">
          </div>
        </form>
      </div>
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
      tolov: {
        id: "",
        price: null,
        comment: "",
      },
    };
  },
  methods: {
    getData() {
      instance
        .get("this_customer_loans/" + this.$route.params.id)
        .then((response) => {
          this.nasiyalar = response.data
          this.isloading = false;
        })
        .catch((err) => {
          this.isloading = false;
          this.error = err.message;
        });

      instance
        .get("this_customer/" + this.$route.params.id)
        .then((response) => {
          this.mijoz = response.data
        }).catch((err) => {
            this.isloading = false
            this.error = err.message
        })
    },

    payToLoan(id) {
      this.isloading = true
      instance.post("pay_to_loan/" + id, this.tolov).then((respon) => {
        if(respon.status == 200) {
          swal({
            icon: "success",
            timer: 1000,
          }).then(() => {
            document.querySelector("#close_modal").click()
            this.tolov = {},
            this.getData()
            this.isloading = false
          })
        }
      })
    },
  },
  mounted() {
    console.clear()
    this.getData();
  },
};
</script>

<style>
</style>