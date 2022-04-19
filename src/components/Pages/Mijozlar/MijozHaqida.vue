<template>
  <div class="container-fluid">
    <router-link class="btn btn-sm mb-2 btn-outline-success" to="/mijozlar">
      <span class="fa fa-arrow-left"/> Ortga
    </router-link>
    <div class="card shadow">
      <div class="card-header"><h3>Mijoz haqida</h3></div>
      <div class="card-body">
        <div class="row">
          <div class="col-md-6 mb-3">
            <div class="card shadow mb-4">
              <div class="card-header">
                <h4 class="card-title">
                  <span class="fas fa-coins"></span> Nasiyalar
                </h4>
              </div>
              <div class="card-body">
                <div class="table-responsive text-center my-custom-scrollbar table-wrapper-scroll-y">
                  <table class="table table-sm table-hover table-borderless">
                    <thead>
                      <tr>
                        <th>№</th>
                        <th>Summa</th>
                        <th>Yozilgan sana</th>
                        <th>Qaytarish sanasi</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(loan, idx) in loans" :key="loan">
                        <td>{{ idx + 1 }}</td>
                        <td>{{ Intl.NumberFormat().format(loan.price) }} so'm</td>
                        <td>{{ loan.time.substr("T", 10) }}</td>
                        <td>{{ loan.return_date }}</td>
                        <td>
                          <button 
                            class="btn btn-sm btn-info"
                            data-toggle="modal"
                            href="#loanInfo"
                            @click="getLoanInfo(loan.id)"
                          >
                            <span class="fa fa-info"/>
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6 mb-3">
            <div class="card shadow mb-4">
              <div class="card-header">
                <h4 class="card-title">
                  <span class="fas fa-history"></span> Buyurtmalar tarixi
                </h4>
              </div>
              <div class="card-body">
                <div class="table-responsive text-center my-custom-scrollbar table-wrapper-scroll-y">
                  <table class="table table-sm table-borderless table-hover">
                    <thead>
                      <tr>
                        <th>№</th>
                        <th>Sana</th>
                        <th>Summa</th>
                        <th>Nasiya summa</th>
                        <th>Hodim</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(tarix) in customer" :key="tarix">
                        <td>{{ tarix.number }}</td>
                        <td>
                          {{ tarix.time.replace("T", " ") }}
                        </td>
                        <td> {{ Intl.NumberFormat().format(tarix.price) }} so'm</td>
                        <td> {{ Intl.NumberFormat().format(tarix.loan_price) }} so'm </td>
                        <td> {{ tarix.user }} </td>
                        <td>
                          <button 
                            class="btn btn-sm btn-info"
                            data-toggle="modal"
                            data-target="#exampleModal"
                            @click="getData1(tarix)"
                          >
                            <span class="fa fa-info"/>
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Modal buyrutma tarixi -->
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Buyurtma mahsulotlari</h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <table class="table table-sm table-borderless table-hover">
            <thead>
              <tr>
                <th>Mahsulot</th>
                <th>Brend</th>
                <th>Sotuv narxi</th>
                <th>Hajm</th>
                <th>Summa</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="tradis in tradies" :key="tradis">
                <td class="text-center">{{ tradis.product_name }}</td>
                <td class="text-center">{{ tradis.product_brand }}</td>
                <td class="text-center">{{ Intl.NumberFormat().format(tradis.selling_price) }} so'm</td>
                <td class="text-center">{{ tradis.quantity }} {{ tradis.measure }}</td>
                <td class="text-center"> {{ Intl.NumberFormat().format(tradis.selling_price * tradis.quantity) }} so'm </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            Close
          </button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div> -->
      </div>
    </div>
  </div>
  <!-- Modal buyrutma tarixi end -->
  <div class="modal fade" id="loanInfo">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h4> Nasiya to'lovlari </h4>
        </div>
        <div class="modal-body">
          <table class="table table-sm table-hover table-borderless text-center">
            <thead>
              <tr>
                <th>№</th>
                <th>Sana</th>
                <th>Summa</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(kirim, n) in kirimlar" :key="kirim">
                <td> {{ n + 1 }} </td>
                <td> {{ kirim.time.replace("T", " ") }} </td>
                <td> {{ Intl.NumberFormat().format(kirim.price) }} so'm </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <isloading :isloading="isloading" :message="errorr" />
</template>

<script>
import { instance } from "../Api";
import isloading from "../../Anime/Anime.vue";
import swal from 'sweetalert';
export default {
  components: { isloading },
  data() {
    return {
      isloading: true,
      customer: [],
      loans: [],
      tradies: [],
      kirimlar: [],
      tradeBalance: Number,
      errorr: "",
    };
  },
  methods: {
    getData() {
      this.customer = []
      instance
        .get("this_customer_orders/" + this.$route.params.id)
        .then((response) => {
          this.customer = response.data
        })
        .catch((err) => {
          this.isloading = false;
          this.errorr = err.message;
        });

      instance
        .get("this_customer_loans/" + this.$route.params.id)
        .then((response) => {
          this.loans = response.data;
          this.isloading = false
        })
        .catch((err) => {
          this.isloading = false;
          this.errorr = err.message;
        });
    },
    getData1(object) {
      this.isloading = true
      this.tradeBalance = object.balance
      this.tradies = [];
      instance.get("this_order_trades/" + object.id).then((response) => {
        this.tradies = response.data
        this.isloading = false
      });
    },
    getLoanInfo(id) {
      this.isloading = true
      instance.get("this_loan_incomes/" + id).then((response) => {
        this.kirimlar = response.data
        this.isloading = false
      })
    },
  },
  mounted() {
    console.clear()
    this.getData();
  },
};
</script>