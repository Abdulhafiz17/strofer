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
                  <div class="row">
                    <div class="col-sm-5 mx-auto">
                      <input
                        type="search"
                        class="form-control mb-2"
                        v-model="search"
                        placeholder="Qididruv"
                      />
                    </div>
                  </div>
                  <div class="table-responsive text-center">
                    <table
                      class="table table-sm table-hover table-bordered"
                      id="table"
                    >
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
                        <tr v-for="mahsulot in filteredRows" :key="mahsulot.id">
                          <td>
                            <b>{{ mahsulot.name }}</b>
                          </td>
                          <td>
                            <i>{{ mahsulot.brand }}</i>
                          </td>
                          <td>
                            {{
                              Intl.NumberFormat({ style: "currency" }).format(
                                mahsulot.selling_price
                              )
                            }} so'm
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
                      <th>Jami</th>
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
                      <td>
                        {{
                          Intl.NumberFormat({ style: "currency" }).format(
                            mahsulot.narx
                          )
                        }} so'm
                      </td>
                      <td>
                        {{
                          Intl.NumberFormat({ style: "currency" }).format(
                            mahsulot.narx * mahsulot.hajm
                          )
                        }} so'm
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
      </div>
    </div>
  </div>
  <isloading :isloading="isloading"/>
</template>

<script>
import { instance } from "../Api";
import swal from "sweetalert";
import isloading from "../../Anime/Anime.vue"
export default {
  components: { isloading },
  data() {
    return {
      role: localStorage.getItem("role"),
      buyurtmalar: [],
      mahsulotlar: [],
      buyurtmaMahsulotlar: [],
      tradesLength: 0,
      orderId: "",
      search: "",
      isloading: false,
    };
  },
  methods: {
    getBuyurtma() {
      this.isloading = true
      this.buyurtmalar = [];
      instance.get("all_orders/false").then((res) => {
        this.buyurtmalar = res.data;
        console.log(res.data);
      })
      .finally(this.isloading = false)
    },
    getMahsulotlar() {
      this.isloading = true
      this.mahsulotlar = [];
      instance.get("all_categories").then((res) => {
        res.data.forEach((element) => {
          instance.get("all_products_for_trade/" + element.id).then((res) => {
            console.log(res.data)
            res.data.forEach((e) => {
            this.mahsulotlar.push(e);
            });
          });
        });
      })
      .finally(this.isloading = false)
      console.log(this.mahsulotlar);
    },
    createOrder() {
      this.isloading = true
      instance.post("create_order").then(() => {
        setTimeout(() => {
          this.getBuyurtma();
        }, 400);
      })
      .finally(this.isloading = false)
    },
    deleteOrder(id) {
      this.isloading = true
      instance.delete("remove_this_order/" + id).then(() => {
        setTimeout(() => {
          this.getBuyurtma();
        }, 400);
      })
      .finally(this.isloading = false)
    },
    toTrade(mahsulot, order) {
      this.isloading = true
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
                console.log(res.data)
                this.getMahsulotlar()
                this.isloading = false
              });
            }
          })
          .finally(this.isloading = false)
        } else if (value > mahsulot.quantity) {
          swal({
            icon: "warning",
            title: "Miqdor qoldiqdan katta bo'lmasligi kerak",
          }).then(
            this.isloading = false
          )
        } else {
          this.isloading = false
        }
      });
    },
    getTrades(id) {
      this.isloading = true
      this.buyurtmaMahsulotlar = [];
      instance.get("this_order_trades/" + id).then((res) => {
        this.tradesLength = res.data.length;
        res.data.forEach((element) => {
          instance
            .get("this_product/empty/" + element.product_code)
            .then((response) => {
                  let mahsulot = {
                    code: element.product_code,
                    name: response.data[0].name,
                    brand: response.data[0].brand,
                    hajm: element.quantity,
                    olchov: response.data[0].measure,
                    narx: element.selling_price,
                    currency: element.currency_id,
                  };
                  this.buyurtmaMahsulotlar.push(mahsulot);
            });
        });
        console.log(this.buyurtmaMahsulotlar);
      })
      .finally(this.isloading = false)
    },
    deleteTrade(code) {
      this.isloading = true
      console.log(code, this.orderId);
      instance
        .delete("remove_this_trade/" + code + "/" + this.orderId)
        .then((res) => {
          console.log(res.data);
          this.getMahsulotlar();
        })
        .finally(this.isloading = false)
    },
  },
  computed: {
    filteredRows: function () {
      return this.mahsulotlar.filter((items) => {
        for (let item in items) {
          if (String(items[item]).toLowerCase().indexOf(this.search.toLowerCase()) !== -1) {
            return true;
          }
        }
        return false;
      });
    },
  },
  mounted() {
    this.getBuyurtma();
    this.getMahsulotlar();
  },
};
</script>

<style>
</style>