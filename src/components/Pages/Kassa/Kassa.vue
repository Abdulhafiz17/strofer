<template>
  <div class="container-fluid">
    <div class="card shadow">
      <div class="card-header">
        <h3>Kassa</h3>
      </div>
      <div class="card-body">
        <nav>
          <div class="nav nav-pills" id="nav-tab" role="tablist">
            <button
              v-for="(tab, n) in buyurtmalar"
              :key="tab.id"
              :id="tab.id"
              class="nav-link"
              data-bs-toggle="tab"
              :href="'/#nav' + tab.id"
              type="button"
              role="tab"
              :aria-controls="'nav' + tab.id"
              aria-selected="true"
              @click="getTrades(tab.id), (orderId = tab.id)"
            >
              <button
                class="btn btn-sm text-danger"
                @click="deleteOrder(tab.id)"
              >
                <span class="far fa-circle-xmark" />
              </button>
              <center>
                {{ n + 1 }} - buyutma <br />
                {{ tab.time.split("T", 2)[1] }}
              </center>
            </button>
          </div>
        </nav>
        <hr />
        <span class="tab-content" id="nav-tabContent">
          <span
            v-for="(tab, n) in buyurtmalar"
            :key="tab.id"
            class="tab-pane fade"
            :id="'nav' + tab.id"
            role="tabpanel"
            :aria-labelledby="'nav' + tab.id"
          >
            <div class="container-fluid">
              <div class="card shadow mt-2">
                <div class="card-header text-center">
                  <div class="row">
                    <div class="col-sm"></div>
                    <div class="col-sm">
                      <h4>{{ n + 1 }} - buyurtma</h4>
                    </div>
                    <div class="col-sm">
                      <h5>{{ tab.time.replace("T", " ") }}</h5>
                    </div>
                  </div>
                </div>
                <div class="card-body">
                  <!-- <input class="form-control mb-1" id="searchInput" v-model="search" type="search" placeholder="Qidiruv"/> -->
                  <div class="table-responsive text-center">
                    <table class="table table-sm table-hover table-borderless">
                      <thead>
                        <tr>
                          <th>№</th>
                          <th>Mahsulot</th>
                          <th>Brend</th>
                          <th>Hajm</th>
                          <th>Narx</th>
                          <th>Summa</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(mahsulot, n) in buyurtmaMahsulotlar"
                          :key="mahsulot.id"
                        >
                          <td>{{ n + 1 }}</td>
                          <td>{{ mahsulot.name }}</td>
                          <td>{{ mahsulot.brand }}</td>
                          <td>
                            <div class="input-group input-group-sm">
                              <input
                                type="number"
                                class="form-control text-center"
                                v-model="mahsulot.hajm"
                                min="0"
                                required
                              />
                              <div class="input-group-append">
                                <div class="input-group-text">
                                  {{ mahsulot.olchov }}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div class="input-group input-group-sm">
                              <input
                                v-model="mahsulot.narx"
                                class="form-control text-center"
                                type="number"
                                :min="mahsulot.oxirgi_narx"
                                required
                              />
                              <div class="input-group-append">
                                <div class="input-group-text">
                                  {{ mahsulot.currency }}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td>
                            {{
                              Intl.NumberFormat({ style: "currency" }).format(
                                mahsulot.narx * mahsulot.hajm
                              )
                            }}
                            {{ mahsulot.currency }}
                          </td>
                          <td>
                            <button
                              class="btn btn-sm btn-outline-danger"
                              @click="
                                deleteTrade(mahsulot.code), getTrades(orderId)
                              "
                            >
                              <span class="far fa-circle-xmark" />
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { instance } from "../Api";
import swal from "sweetalert";
// import { getButtonListOpts } from 'sweetalert/typings/modules/options/buttons';
// import { setActionValue } from 'sweetalert/typings/modules/state';
export default {
  data() {
    return {
      role: localStorage.getItem("role"),
      buyurtmalar: [],
      mahsulotlar: [],
      buyurtmaMahsulotlar: [],
      tradesLength: 0,
      orderId: "",
      search: "",
    };
  },
  methods: {
    getBuyurtma() {
      this.buyurtmalar = [];
      instance.get("all_orders/false").then((res) => {
        this.buyurtmalar = res.data;
        console.log(res.data);
      });
    },
    deleteOrder(id) {
      instance.delete("remove_this_order/" + id).then(() => {
        setTimeout(() => {
          this.getBuyurtma();
        }, 400);
      });
    },
    toTrade(mahsulot, order) {
      swal({
        title: mahsulot.name + " " + mahsulot.brand + " hajmini kiriting",
        closeOnClickOutside: false,
        closeOnEsc: false,
        content: {
          element: "input",
          attributes: {
            type: "number",
            class: "form-control",
            placeholder: "Miqdor: " + mahsulot.measure,
            min: "0",
            max: mahsulot.quantity,
          },
        },
      }).then((value) => {
        // console.log(mahsulot, order)
        let product = {
          product_code: mahsulot.product_code,
          quantity: Number(value),
        };
        if (value > 0 && value < mahsulot.quantity) {
          instance.post("to_trade/" + order.id, product).then((res) => {
            if (res.status == 200) {
              swal({
                icon: "success",
                title: "Mahsulot qo'shildi",
              }).then(() => {
                console.log(res.data);
              });
            }
          });
        } else if (value > mahsulot.quantity) {
          swal({
            icon: "warning",
            title: "Miqdor qoldiqdan katta bo'lmasligi kerak",
          });
        }
      });
    },
    getTrades(id) {
      this.buyurtmaMahsulotlar = [];
      instance.get("this_order_trades/" + id).then((res) => {
        res.data.forEach((element) => {
          instance
            .get("this_product/empty/" + element.product_code)
            .then((response) => {
              instance
                .get("this_currency/" + element.currency_id_for_sell)
                .then((res) => {
                  let mahsulot = {
                    code: element.product_code,
                    name: response.data.name,
                    brand: response.data.brand,
                    hajm: element.quantity,
                    olchov: response.data.measure,
                    narx: element.selling_price,
                    oxirgi_narx: response.data.final_price,
                    currency: res.data.currency,
                  };
                  this.buyurtmaMahsulotlar.push(mahsulot);
                });
            });
        });
        console.log(this.buyurtmaMahsulotlar);
      });
    },
    deleteTrade(code) {
      console.log(code, this.orderId);
      instance
        .delete("remove_this_trade/" + code + "/" + this.orderId)
        .then((res) => {
          console.log(res.data);
        });
    },
  },
  computed: {
    even: function (arr) {
      // Set slice() to avoid to generate an infinite loop!
      return arr.slice().sort(function (a, b) {
        return a.position - b.position;
      });
    },
  },
  mounted() {
    this.getBuyurtma();
  },
};
</script>

<style>
</style>