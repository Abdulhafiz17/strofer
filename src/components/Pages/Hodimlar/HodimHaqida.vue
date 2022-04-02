<template>
  <div class="container-fluid">
    <button @click="back" class="btn btn-sm btn-outline-success my-2">
      <i class="fa fa-arrow-left mr-2"></i> Chiqish
    </button>
    <div class="card shadow">
      <div class="card-header">
        <div class="row">
          <div class="col-md">
            <h3>{{ user.name }} tarixi</h3>
          </div>
          <div class="col-md">
            <div class="row">
              <div class="col-md-4 mb-2">
                <label for="dan">Dan</label>
                <input
                  type="date"
                  id="dan"
                  class="form-control"
                  v-model="dateFrom"
                />
              </div>
              <div class="col-md-4">
                <label for="gacha">Gacha</label>
                <input
                  type="date"
                  id="gacha"
                  class="form-control"
                  v-model="dateTo"
                />
              </div>
              <div class="col-md-4" style="margin-top: 33px">
                <div class="row">
                  <div class="col-md">
                    <button
                      class="btn btn-block btn-outline-success"
                      @click="sortByDate(dateFrom, dateTo)"
                    >
                      <span class="fa fa-search"></span>
                    </button>
                  </div>
                  <div class="col-md">
                    <button
                      class="btn btn-block btn-outline-primary"
                      @click="getData()"
                    >
                      <span class="fa fa-sync" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-md-6 mb-3">
            <div class="card shadow">
              <div class="card-header">
                <h4 class="card-title">
                  <span class="fas fa-coins"></span> To'lovlar tarixi
                </h4>
              </div>
              <div class="card-body">
                <div
                  class="
                    table-responsive
                    text-center
                    my-custom-scrollbar
                    table-wrapper-scroll-y
                  "
                >
                  <table class="table table-sm table-hover table-borderless">
                    <thead>
                      <tr>
                        <th>№</th>
                        <th>Summa</th>
                        <th>Sana</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(history, n) in payHistory" :key="history.id">
                        <td>{{ n + 1 }}</td>
                        <td>{{ history.price }} {{ history.currency_id }}</td>
                        <td>{{ history.time }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6 mb-3">
            <div class="card shadow">
              <div class="card-header">
                <h4 class="card-title">
                  <span class="fas fa-history"></span> Kpi tarixi
                </h4>
              </div>
              <div class="card-body">
                <div
                  class="
                    table-responsive
                    text-center
                    my-custom-scrollbar
                    table-wrapper-scroll-y
                  "
                >
                  <table class="table table-sm table-hover table-borderless">
                    <thead>
                      <tr>
                        <th>№</th>
                        <th>Narx</th>
                        <th>Sana</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(history, n) in kpiHistory"
                        :key="history.id"
                        @click="getThisTrade(history)"
                        data-toggle="modal"
                        data-target="#thisTrade"
                      >
                        <td>{{ n + 1 }}</td>
                        <td>{{ history.price }} {{ history.currency_id }}</td>
                        <td>{{ history.time }}</td>
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
  <div class="modal fade" id="thisTrade">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-body">
          <table class="table table-hover table-borderless text-center">
            <thead>
              <tr>
                <th>№</th>
                <th>Mahsulot</th>
                <th>Narx</th>
                <th>Miqdori</th>
                <th>Kpi</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(trade, n) in thisTrade" :key="trade">
                <td>{{ n + 1 }}</td>
                <td>{{ trade.product }}</td>
                <td>{{ trade.selling_price }} {{ trade.currency }}</td>
                <td>{{ trade.quantity }} {{ trade.measure }}</td>
                <td>{{ trade.kpi }} {{ trade.currency }}</td>
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
export default {
  components: { isloading },
  data() {
    return {
      user_id: this.$route.params.id,
      user: {},
      payHistory: [],
      kpiHistory: [],
      thisTrade: [],
      isloading: true,
      dateFrom: "",
      dateTo: "",
      errorr: "",
    };
  },
  methods: {
    back() {
      window.history.back();
    },
    getData() {
      instance
        .get("this_user_expense/" + this.user_id)
        .then((response) => {
          this.payHistory = response.data;
          this.isloading = false;
        })
        .catch((err) => {
          this.isloading = false;
          this.errorr = err.message;
        });

      instance
        .get("this_user/" + this.user_id)
        .then((response) => {
          this.user = response.data;
          this.isloading = false;
        })
        .catch((err) => {
          this.isloading = false;
          this.errorr = err.message;
        });

      this.isloading = true;
      instance
        .get("this_user_kpi_history/" + this.user_id)
        .then((response) => {
          this.kpiHistory = response.data;
          console.log(response.data);
          this.isloading = false;
        })
        .catch((err) => {
          this.isloading = false;
          this.errorr = err.message;
        });
    },
    getThisTrade(object) {
      this.thisTrade = [];
      instance.get("this_trade/" + object.trade_id).then((response) => {
        instance
          .get("this_product/empty/" + response.data.product_code)
          .then((res) => {
            console.log(res.data);
            res.data.forEach((element) => {
              let trade = {
                product_code: response.data.product_code,
                product: element.name,
                quantity: response.data.quantity,
                measure: element.measure,
                selling_price: response.data.selling_price,
                currency: element.currency_id,
                kpi: object.price,
              };
              this.thisTrade.push(trade);
            });
            console.log(this.thisTrade);
          })
          .catch((err) => {
            this.isloading = false;
            this.errorr = err.message;
          });
      });
    },
    sortByDate(from, to) {
      if (from !== "" && to !== "") {
        this.isloading = true;
        let tarix = [];
        let tarix2 = [];
        this.payHistory.forEach((element) => {
          if (element.time >= from && element.time <= to) {
            tarix.push(element);
          }
        });
        this.kpiHistory.forEach((element) => {
          if (element.time >= from && element.time <= to) {
            tarix2.push(element);
          }
        });
        this.payHistory = tarix;
        this.kpiHistory = tarix2;
        this.isloading = false;
      }
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<style scoped>
</style>