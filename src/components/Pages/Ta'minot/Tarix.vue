<template>
  <div class="container-fluid">
    <router-link class="btn btn-outline-success btn-sm mb-2" to="/taminot">
      <span class="fa fa-arrow-left"></span> Orqaga
    </router-link>
    <div class="card shadow">
      <div class="card-header">
        <div class="row">
          <div class="col-md-6">
            <h3>{{ taminotchi.name }} tarixi</h3>
          </div>
          <div class="col-md-6"></div>
        </div>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-md-6 mb-3">
            <div class="card shadow border-0">
              <div class="card-header">
                <h3>Ta'minot tarixi</h3>
                <div class="row">
                  <div class="col-md">
                    <div class="input-group">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Mahsulot orqali qidirish"
                        v-model="search"
                      />
                      <!-- <div class="input-group-append">
                        <div class="input-group-text">
                          <span class="fa fa-search"></span>
                        </div>
                      </div> -->
                    </div>
                  </div>
                </div>
              </div>
              <div class="card-body">
                <div class="table-wrapper-scrollbar my-custom-scrollbar">
                  <div class="table-responsive text-center">
                    <table class="table table-sm table-hover table-borderless">
                      <thead>
                        <th>№</th>
                        <th>Mahsulot</th>
                        <th>Narxi</th>
                        <th>Miqdori</th>
                        <th>Umumiy narxi</th>
                        <th>Sanasi</th>
                      </thead>
                      <tbody>
                        <tr v-for="(tarix, n) in filterRow || []" :key="tarix.id">
                          <td>{{ n + 1 }}</td>
                          <td>{{ tarix.product }}</td>
                          <td>
                            {{
                              Intl.NumberFormat({ style: "currency" }).format(
                                tarix.price
                              )
                            }}
                            {{ tarix.currency }}
                          </td>
                          <td>{{ tarix.quantity }} {{ tarix.hajm }}</td>
                          <td>
                            {{
                              Intl.NumberFormat({ style: "currency" }).format(
                                tarix.price * tarix.quantity
                              )
                            }}
                            {{ tarix.currency }}
                          </td>
                          <td>{{ tarix.date_time }}</td>
                        </tr>
                      </tbody>
                    </table>
                    <!-- <div class="text-center">
                    <a href="#" class="blocks">&laquo;</a>
                    <a href="#" class="blocks">1</a>
                    <a href="#" class="blocks">2</a>
                    <a href="#" class="blocks">3</a>
                    <a href="#" class="blocks">&raquo;</a>
                  </div> -->
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="card shadow border-0">
              <div class="card-header">
                <h3>To'lov tarixi</h3>
                <div class="row">
                  <div class="col-sm-4 mb-2">
                    <input type="date" v-model="dateFrom" class="form-control" />
                  </div>
                  <div class="col-sm-4 mb-2">
                    <input type="date" v-model="dateTo" class="form-control" />
                  </div>
                  <div class="col-sm-4">
                    <div class="row">
                      <div class="col-sm mb-2">
                        <button class="btn btn-block btn-outline-success" @click="searchByDate(dateFrom, dateTo)">
                          <span class="fa fa-search"></span>
                        </button>
                      </div>
                      <div class="col-sm">
                        <button class="btn btn-outline-primary btn-block" @click="getData()">
                          <span class="fa fa-sync"/>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card-body">
                <div class="table-wrapper-scrollbar-y my-custom-scrollbar">
                  <div class="table-responsive text-center">
                    <table class="table table-sm table-hover table-borderless">
                      <thead>
                        <th>№</th>
                        <th>To'lov summa</th>
                        <th>Sana</th>
                        <th>Izoh</th>
                        <th>Hodim</th>
                      </thead>
                      <tbody>
                        <tr v-for="(tarix, n) in tolovTarix" :key="tarix.id">
                          <td>{{ n + 1 }}</td>
                          <td>
                            {{
                              Intl.NumberFormat({ style: "currency" }).format(
                                tarix.price
                              )
                            }}
                            {{ tarix.currency }}
                          </td>
                          <td>{{ tarix.date_time }}</td>
                          <td>{{ tarix.comment }}</td>
                          <td>{{ tarix.user }}</td>
                        </tr>
                      </tbody>
                    </table>
                    <!-- <div class="text-center">
                      <a href="#" class="blocks">&laquo;</a>
                      <a href="#" class="blocks">1</a>
                      <a href="#" class="blocks">2</a>
                      <a href="#" class="blocks">3</a>
                      <a href="#" class="blocks">&raquo;</a>
                    </div> -->
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <isloading :isloading="isloading"/>
</template>

<script>
import { instance } from "../Api";
import isloading from "../../Anime/Anime.vue"
export default {
  components: { isloading },
  data() {
    return {
      taminotchi: {},
      tolovTarix: [],
      taminotTarix: [],
      dateFrom: "",
      dateTo: "",
      tarix: {
        user: "",
        product: "",
        quantity: null,
        hajm: "",
        price: null,
        currency: "",
        comment: "",
        date_time: "",
      },
      search: "",
      isloading: true
    };
  },
  methods: {
    getData() {
      this.tolovTarix = []
      instance.get("this_market/" + this.$route.params.id).then((res) => {
        this.taminotchi = res.data;
      })
      instance.get("market_expenses/" + this.$route.params.id).then((res) => {
        console.log(res.data)
        res.data.forEach((element) => {
          instance.get("this_user/" + element.owner_id).then((response) => {
              this.tolovTarix.push({
                currency: element.currency_id,
                price: element.price,
                comment: element.comment,
                date_time: element.time.replace("T", " "),
                user: response.data.name,
              });
              console.log(
                element.currency_id,
                element.price,
                element.comment,
                element.time.replace("T", " "),
                response.data.name,
              )
              this.isloading = false
          });
        });
      })
    },
    getData2() {
      this.taminotTarix = []
      instance
        .get("all_supplies/" + this.$route.params.id + "/true")
        .then((res) => {
          res.data.forEach((element) => {
            instance
              .get("this_currency/" + element.currency_id)
              .then((response) => {
                instance.get("this_user/" + element.owner_id).then((res) => {
                  instance
                    .get("this_product/" + element.product_id + "/empty")
                    .then((resp) => {
                      this.taminotTarix.push({
                        quantity: element.quantity,
                        price: element.price,
                        date_time: element.time.replace("T", " "),
                        product: resp.data.name,
                        hajm: resp.data.measure,
                        user: res.data.name,
                        currency: response.data.currency,
                      });
                      this.isloading = false
                    });
                });
              });
          });
        }).catch((err) => {
            this.isloading = false;
             this.errorr = err.message
          });
    },
    searchByDate(from, to) {
      this.isloading = true
      let tarix = []
      this.tolovTarix.forEach(element => {
        if (element.date_time >= from && element.date_time <= to) {
          tarix.push(element)
        }
      });
      this.tolovTarix = tarix
      this.isloading = false
    },
  },
  mounted() {
    setTimeout(() => {
      this.getData();
      this.getData2();
    }, 100);
  },
  computed: {
    filterRow: function () {
      return this.taminotTarix.filter((items) => {
        for (let item in items) {
          if (String(items[item]).toLowerCase().indexOf(this.search.toLowerCase()) !== -1) {
            return true;
          }
        }
        return false;
      });
    },
  },
};
</script>

<style>
</style>