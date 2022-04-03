<template>
  <div class="container-fluid">
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
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(loan, idx) in loans" :key="loan">
                        <td>{{ idx + 1 }}</td>
                        <td>{{ Intl.NumberFormat().format(loan.price) }} so'm</td>
                        <td>{{ loan.time.replace("T", " ") }}</td>
                        <td>{{ loan.return_date }}</td>
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
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(customers, idx) in customer" :key="customers">
                        <td>{{ idx + 1 }}</td>
                        <td
                          data-toggle="modal"
                          data-target="#exampleModal"
                          @click="getData1(customers)"
                        >
                          {{ customers.time }}
                        </td>
                        <td> {{ Intl.NumberFormat().format(customers.balance) }} so'm</td>
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
                <td class="text-center">{{ tradis.name }}</td>
                <td class="text-center">{{ tradis.brand }}</td>
                <td class="text-center">{{ Intl.NumberFormat().format(tradis.selling_price) }} so'm</td>
                <td class="text-center">{{ tradis.quantity }} {{ tradis.measure }}</td>
                <td class="text-center"> {{ Intl.NumberFormat().format(tradis.selling_price * tradis.quantity) }} so'm </td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <th colspan="3" class="text-center"> Jami : </th>
                <th colspan="2"> {{ Intl.NumberFormat().format(tradeBalance) }} so'm </th>
              </tr>
            </tfoot>
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
          if (response.data.length > 0) {
            this.isloading = false
            response.data.forEach((element) => {
              instance.get("this_order_balances/" + element.id).then((balance) => {
                this.customer.push({
                  id: element.id,
                  time: element.time.replace("T", " "),
                  balance: balance.data[0].selling_price,
                })
              })
            })
          }
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
        if (response.data.length > 0) {
          response.data.forEach((element) => {
            instance
              .get("this_product/empty/" + element.product_code)
              .then((response) => {
                this.tradies.push({
                  name: response.data[0].name,
                  brand: response.data[0].brand,
                  quantity: element.quantity,
                  selling_price: element.selling_price,
                  measure: response.data[0].measure,
                });
                this.isloading = false
              })
              .catch((err) => {
                this.isloading = false;
                this.errorr = err.message;
              });
          });
        } else {
          this.isloading = false
        }
      });
    },
  },
  mounted() {
    console.clear()
    this.getData();
  },
};
</script>