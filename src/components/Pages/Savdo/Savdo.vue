<template>
  <div class="container-fluid">
    <div class="card shadow">
      <div class="card-header">
        <h3>Savdo</h3>
      </div>
      <div class="card-body">
        <nav>
          <div class="nav nav-pills" id="nav-tab" role="tablist">
            <button
              v-for="(tab, n) in buyurtmalar"
              :key="tab.id"
              class="nav-link"
              data-bs-toggle="tab"
              :data-bs-target="'#nav' + tab.id"
              type="button"
              role="tab"
              :aria-controls="'nav' + tab.id"
              aria-selected="true"
              @click="getTrades(tab.id)"
            >
              {{ n + 1 }} - buyutma
              <button
                class="btn btn-sm text-danger"
                @click="deleteOrder(tab.id)"
              >
                <span class="far fa-circle-xmark" />
              </button>
            </button>
            <button class="btn" type="button" @click="createOrder()">
              <span class="fa fa-circle-plus text-success" />
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
                    <div class="col-sm">
                      <button
                        class="btn btn-outline-success float-left"
                        data-toggle="modal"
                        data-target="#savat"
                      >
                        <span class="fa fa-shopping-cart" /> 
                        <!-- <sup v-if="tradesLength != 0"> {{ tradesLength }} </sup> -->
                      </button>
                    </div>
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
                    <table class="table table-sm table-hover table-bordered" id="table">
                      <thead>
                        <tr>
                          <th>Nomi</th>
                          <th>Brend</th>
                          <th>Narx</th>
                          <th>Qoldiq</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="mahsulot in mahsulotlar" :key="mahsulot.id">
                          <td>
                            <b>{{ mahsulot.name }}</b>
                          </td>
                          <td>
                            <i>{{ mahsulot.brand }}</i>
                          </td>
                          <td>
                            {{ Intl.NumberFormat({style: "currency"}).format(mahsulot.selling_price) }}
                            {{ mahsulot.currency_id_for_sell }}
                          </td>
                          <td>
                            {{ mahsulot.quantity }} {{ mahsulot.measure }}
                          </td>
                          <td>
                            <button
                              class="btn btn-sm btn-outline-success"
                              @click="toTrade(mahsulot, tab)"
                            >
                              <span class="fa fa-coins" />
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
      <div class="modal fade" id="savat">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h3>Mahsulotlar</h3>
            </div>
            <div class="modal-body">
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
                      <td>{{ mahsulot.hajm }} {{ mahsulot.olchov }}</td>
                      <td> {{ Intl.NumberFormat({ style: "currency" }).format(mahsulot.narx) }} {{ mahsulot.currency }}</td>
                      <td> {{ Intl.NumberFormat({ style: "currency" }).format(mahsulot.narx * mahsulot.hajm) }} {{ mahsulot.currency }}</td>
                      <td>
                        <button class="btn btn-sm btn-outline-danger" @click="deleteTrade(mahsulot.code)">
                          <span class="far fa-circle-xmark"/>
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
      search: "",
    };
  },
  methods: {
    getBuyurtma() {
      this.buyurtmalar = [];
      instance.get("all_orders/false").then((res) => {
        this.buyurtmalar = res.data;
      });
    },
    getMahsulotlar() {
      this.mahsulotlar = [];
      instance.get("all_categories").then((res) => {
        res.data.forEach((element) => {
          instance.get("all_products/" + element.id).then((res) => {
            res.data.forEach((e) => {
              instance
                .get("this_currency/" + e.currency_id_for_sell)
                .then((res) => {
                  e.currency_id_for_sell = res.data.currency;
                  this.mahsulotlar.push(e);
                });
            });
          });
        });
      });
      console.log(this.mahsulotlar);
    },
    createOrder() {
      instance.post("create_order").then(() => {
        setTimeout(() => {
          this.getBuyurtma();
        }, 400);
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
      // let input = document.createElement("input")
      // input.className("form-control")
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
          product_code: mahsulot.code,
          quantity: Number(value),
        };
        if (value > 0 && value < mahsulot.quantity) {
          instance.post("to_trade/" + order.id, product).then((res) => {
            if (res.status == 200) {
              swal({
                icon: "success",
                title: "Mahsulot qo'shildi",
              });
              console.log(res.data);
              this.getMahsulotlar();
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
        this.tradesLength = res.data.length
        res.data.forEach((element) => {
          instance
            .get("this_product/empty/" + element.product_code)
            .then((response) => {
              instance
                .get("this_currency/" + element.currency_id_for_sell)
                .then((res) => {
                  let mahsulot = {
                    code: element.code,
                    name: response.data.name,
                    brand: response.data.brand,
                    hajm: element.quantity,
                    olchov: response.data.measure,
                    narx: element.selling_price,
                    currency: res.data.currency,
                  };
                  this.buyurtmaMahsulotlar.push(mahsulot)
                });
            });
        });
        console.log(this.buyurtmaMahsulotlar);
      });
    },
    deleteTrade(code) {
      instance.delete("remove_this_trade/" + code)
      .then((res) => {
        console.log(res.data)
      })
    },
  },
  computed: {
    filter: function() {
    },
  },
  mounted() {
    this.getBuyurtma();
    this.getMahsulotlar();
  },
};
</script>

<style>
@import url("./Savdo.css");
</style>