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
              class="nav-link btn-sm"
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
            <button class="btn btn-sm" type="button" @click="createOrder()">
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
                    <!-- <div class="col-sm-1"></div> -->
                    <div class="col-sm-5 mx-auto">
                      <div class="input-group mb-2">
                        <input
                          type="search"
                          class="form-control"
                          v-model="search"
                          placeholder="Qididruv"
                        />
                        <div class="input-group-append">
                          <div class="input-group-text">
                            <span class="fa fa-search"/>
                          </div>
                        </div>
                      </div>
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
                      <td>{{ mahsulot.quantity }} {{ mahsulot.measure }}</td>
                      <td>
                        {{
                          Intl.NumberFormat({ style: "currency" }).format(
                            mahsulot.selling_price
                          )
                        }} so'm
                      </td>
                      <td>
                        {{
                          Intl.NumberFormat({ style: "currency" }).format(
                            mahsulot.selling_price * mahsulot.quantity
                          )
                        }} so'm
                      </td>
                      <td>
                        <button
                          class="btn btn-sm btn-outline-danger"
                          @click="
                            deleteTrade(mahsulot.code)
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
      orderId: "",
      search: "",
      isloading: false,
    };
  },
  methods: {
    getProducts() {
      this.isloading = true
      this.mahsulotlar = []
      instance.get("all_categories").then((response) => {
        response.data.forEach((element) => {
          instance.get("all_products_for_trade/" + element.id).then((respon) => {
            respon.data.forEach((elemen) => {
              this.mahsulotlar.push(elemen)
            })
          })
        })
      })
    },
    getOrders() {
      this.isloading = true
      instance.get("all_orders/false")
      .then((response) => {
        this.buyurtmalar = response.data
        this.isloading = false
      })
    },
    deleteOrder(id) {
      if (confirm("Ushbu buyurtma o'chirilsinmi ?")) {
        this.isloading = true
        instance.delete("remove_this_order/" + id)
        .then((response) => {
          this.buyurtmalar = response.data
        }).finally(this.isloading = false)
      } else {
        this.isloading = false
      }
    },
    createOrder() {
      this.isloading = true
      instance.post("create_order")
      .then((response) => {
        this.buyurtmalar = response.data
        this.isloading = false
      })
    },
    toTrade(mahsulot, tab) {
      // console.log(mahsulot, tab)
      swal({
        title: mahsulot.name + " hajmini belgilang",
        content: {
          element: "input",
          attributes: {
            type: "number",
            min: "0",
            placeholder: "Hajm: " + mahsulot.measure,
          }
        }
      }).then((value) => {
        if (value < mahsulot.quantity) {
          this.isloading = true
          instance.post("to_trade/" + tab.id, {product_code: mahsulot.product_code, quantity: Number(value)}).then((response) => {
            this.isloading = false
            if (response.status == 200) {
              this.mahsulotlar = response.data[response.data.length - 1].products
              let mahsulotlar = response.data
              this.sortProducts(mahsulotlar)
              swal({
                icon: "success",
                title: "Mahsulot qo'shildi"
              })
            }
          })
        } else if (value > mahsulot.quantity) {
          swal({
            icon: "warning",
            title: "Bu mahsulotda yetarli hajm mavjud emas !",
            text: "Hajm : " + mahsulot.quantity + " " + mahsulot.measure
          })
        }
      })
    },
    sortProducts(mahsulotlar) {
      this.isloading = true
      this.buyurtmaMahsulotlar = []
      mahsulotlar.forEach((element) => {
        instance.get("this_product/empty/" + element.product_code).then((response) => {
          let mahsulot = {
            code: response.data[0].product_code,
            name: response.data[0].name,
            brand: response.data[0].brand,
            selling_price: response.data[0].selling_price,
            quantity: element.quantity,
            measure: response.data[0].measure,
          }
          this.buyurtmaMahsulotlar.push(mahsulot)
          this.isloading = false
        })
      })
      console.log(this.buyurtmaMahsulotlar)
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
    console.clear()
    this.getOrders()
    this.getProducts()
  },
};
</script>

<style>
</style>