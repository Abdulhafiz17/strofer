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
                      <div class="input-group-append">
                        <div class="input-group-text">
                          <span class="fa fa-search"></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card-body">
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
                      <tr v-for="(tarix, n) in taminotTarix" :key="tarix.id">
                        <td>{{ n + 1 }}</td>
                        <td>{{ tarix.product }}</td>
                        <td>
                          {{
                            Intl.NumberFormat({ style: "currency" }).format(
                              tarix.price
                            )
                          }} {{ tarix.currency }}
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
          <div class="col-md-6">
            <div class="card shadow border-0">
              <div class="card-header">
                <h3>To'lov tarixi</h3>
                <div class="row">
                  <div class="col-md-4">
                    <input type="date" id="dan" class="form-control" />
                  </div>
                  <div class="col-md-4">
                    <input type="date" id="gacha" class="form-control" />
                  </div>
                  <div class="col-md-4">
                    <button class="btn btn-block btn-outline-success">
                      <span class="fa fa-search"></span>
                    </button>
                  </div>
                </div>
              </div>
              <div class="card-body">
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
</template>

<script>
import { instance } from "../Api";
export default {
  data() {
    return {
      taminotchi: {},
      tolovTarix: [],
      taminotTarix: [],
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
    };
  },
  methods: {
    getData() {
      instance.get("this_market/" + this.$route.params.id).then((res) => {
        this.taminotchi = res.data;
      });
      instance.get("market_expenses/" + this.$route.params.id).then((res) => {
        res.data.forEach((element) => {
          instance.get("this_currency/" + element.currency_id).then((res) => {
            this.tarix.currency = res.data.currency;
          });
          instance.get("this_user/" + element.owner_id).then((res) => {
            this.tarix.user = res.data.name;
          });
          this.tarix = {
            price: element.price,
            comment: element.comment,
            date_time: element.time.replace("T", " "),
          };
          this.tolovTarix.push(this.tarix);
        });
      });
    },
    getData2() {
      instance
        .get("all_supplies/" + this.$route.params.id + "/true")
        .then((res) => {
          console.log(res.data);
          res.data.forEach((element) => {
            instance.get("this_currency/" + element.currency_id).then((res) => {
              this.tarix.currency = res.data.currency;
            });
            instance.get("this_user/" + element.owner_id).then((res) => {
              this.tarix.user = res.data.name;
            });
            instance
              .get("this_product/" + element.product_id + "/empty")
              .then((res) => {
                this.tarix.product = res.data.name;
                this.tarix.hajm = res.data.measure;
              });
            this.tarix = {
              quantity: element.quantity,
              price: element.price,
              date_time: element.time.replace("T", " "),
            };
            this.taminotTarix.push(this.tarix);
            console.log(this.taminotTarix);
          });
        });
    },
  },
  mounted() {
    this.getData();
    this.getData2();
  },
  computed: {
    // filterHistory: function () {
    //   return this.taminotTarix.filter((t) => {
    //     return t.mahsulot.toLowerCase().match(this.search.toLowerCase());
    //   });
    // },
  },
};
</script>

<style>
</style>