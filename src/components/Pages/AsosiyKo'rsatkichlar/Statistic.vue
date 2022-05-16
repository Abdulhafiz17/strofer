<template>
  <div class="container-fluid">
    <div class="card shadow">
      <div class="card-header">
        <h4 v-if="this.$route.name == 'Vozvrat'">Vozvrat qilish</h4>
        <h4 v-else>Asosiy ko'rsatgichlar</h4>
      </div>
      <div class="card-body">
        <ul
          class="nav nav-pills mb-3"
          id="pills-tab"
          role="tablist"
          v-if="this.$route.name !== 'Vozvrat'"
        >
          <li class="nav-item" role="presentation">
            <button
              :class="tab == 'statistic' ? 'nav-link active' : 'nav-link'"
              id="pills-home-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-home"
              type="button"
              role="tab"
              aria-controls="pills-home"
              aria-selected="true"
              @click="setTab('statistic')"
            >
              Hisobotlar
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button
              :class="tab == 'product' ? 'nav-link active' : 'nav-link'"
              id="pills-products-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-products"
              type="button"
              role="tab"
              aria-controls="pills-products"
              aria-selected="true"
              @click="setTab('product')"
            >
              Mahsulotlar qoldig'i
            </button>
          </li>
        </ul>
        <div
          class="tab-content"
          id="pills-tabContent"
          v-if="this.$route.name !== 'Vozvrat'"
        >
          <div
            :class="
              tab == 'statistic' ? 'tab-pane fade show active' : 'tab-pane fade'
            "
            id="pills-home"
            role="tabpanel"
            aria-labelledby="pills-home-tab"
          >
            <div class="row">
              <div class="col-md-4 mb-1">
                <input
                  type="date"
                  class="form-control form-control-sm"
                  v-model="fromDate"
                />
              </div>
              <div class="col-md-4 mb-1">
                <input
                  type="date"
                  class="form-control form-control-sm"
                  v-model="toDate"
                />
              </div>
              <div class="col-md-4 mb-1">
                <div class="row">
                  <div class="col-md-6 mb-1">
                    <button
                      class="btn btn-sm btn-block btn-outline-success"
                      @click="
                        getStatistic();
                        getData();
                      "
                    >
                      <span class="far fa-circle-check" /> Qidirish
                    </button>
                  </div>
                  <div class="col-md-6">
                    <button
                      class="btn btn-sm btn-block btn-outline-success"
                      data-toggle="collapse"
                      href="#table"
                    >
                      <span class="fa fa-chevron-down" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="my-2">
              <div
                class="
                  table-responsive
                  text-center
                  my-custom-scrollbar
                  table-wrapper-scroll-y
                  collapse
                "
                style="max-height: 60vh"
                v-if="table"
                id="table"
              >
                <table class="table table-sm table-hover table-borderless">
                  <thead>
                    <tr>
                      <th>№</th>
                      <th>Summa</th>
                      <th>Sotuvchi</th>
                      <th>Mijoz</th>
                      <th>Sana</th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <!-- <tr>
                  <td>
                    <input
                      class="form-control form-control-sm"
                      type="text"
                      placeholder="Mahsulot bo'yicha"
                      v-model="searchN"
                      @keyup="searchByName(searchN)"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      class="form-control form-control-sm"
                      placeholder="Brend bo'yicha"
                      v-model="searchB"
                      @keyup="searchByBrand(searchB)"
                    />
                  </td>
                  <td>
                    <input
                      class="form-control form-control-sm"
                      type="text"
                      placeholder="Miqdor bo'yicha"
                      v-model="searchQ"
                      @keyup="searchByQuantity(searchQ)"
                    />
                  </td>
                  <td></td>
                  <td></td>
                  <td>
                    <input
                      class="form-control form-control-sm"
                      type="text"
                      placeholder="Sotuvchi bo'yicha"
                      v-model="searchS"
                      @keyup="searchBySeller(searchS)"
                    />
                  </td>
                  <td>
                    <input
                      class="form-control form-control-sm"
                      type="text"
                      placeholder="Mijoz bo'yicha"
                      v-model="searchC"
                      @keyup="searchByClient(searchC)"
                    />
                  </td>
                  <td></td>
                  <td v-if="role == 'cashier'"></td>
                </tr> -->
                    <tr v-for="(savdo, n) in savdolar || []" :key="savdo.id">
                      <td>{{ n + 1 }}</td>
                      <td>
                        {{ Intl.NumberFormat().format(savdo.order_price) }}so'm
                      </td>
                      <td>{{ savdo.owner_id }}</td>
                      <td>{{ savdo.client_id }}</td>
                      <td>{{ savdo.time.replace("T", " ") }}</td>
                      <td>
                        <button
                          class="btn btn-sm btn-success"
                          data-toggle="modal"
                          href="#products"
                          @click="mahsulotlar = savdo"
                        >
                          <span class="fa fa-info" />
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <hr />
            <Chart
              :statistic="statistic"
              v-if="
                (role == 'admin' || role == 'branch_admin') &&
                this.$route.name !== 'Vozvrat'
              "
            />
          </div>
          <div
            :class="
              tab == 'product' ? 'tab-pane fade show active' : 'tab-pane fade'
            "
            id="pills-products"
            role="tabpanel"
            aria-labelledby="pills-products-tab"
          >
            <Mahsulotlar />
          </div>
        </div>
        <span v-if="this.$route.name == 'Vozvrat'">
          <div class="row">
            <div class="col-md-4 mb-1">
              <input
                type="date"
                class="form-control form-control-sm"
                v-model="fromDate"
              />
            </div>
            <div class="col-md-4 mb-1">
              <input
                type="date"
                class="form-control form-control-sm"
                v-model="toDate"
              />
            </div>
            <div class="col-md-4 mb-1">
              <div class="row">
                <div class="col-md-6 mb-1">
                  <button
                    class="btn btn-sm btn-block btn-outline-success"
                    @click="
                      getStatistic();
                      getData();
                    "
                  >
                    <span class="far fa-circle-check" /> Qidirish
                  </button>
                </div>
                <div class="col-md-6">
                  <button
                    class="btn btn-sm btn-block btn-outline-success"
                    data-toggle="collapse"
                    href="#table"
                  >
                    <span class="fa fa-chevron-down" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="my-2">
            <div
              class="
                table-responsive
                text-center
                my-custom-scrollbar
                table-wrapper-scroll-y
                collapse
              "
              style="max-height: 60vh"
              v-if="table"
              id="table"
            >
              <table class="table table-sm table-hover table-borerless">
                <thead>
                  <tr>
                    <th>№</th>
                    <th>Summa</th>
                    <th>Sotuvchi</th>
                    <th>Mijoz</th>
                    <th>Sana</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <!-- <tr>
                  <td>
                    <input
                      class="form-control form-control-sm"
                      type="text"
                      placeholder="Mahsulot bo'yicha"
                      v-model="searchN"
                      @keyup="searchByName(searchN)"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      class="form-control form-control-sm"
                      placeholder="Brend bo'yicha"
                      v-model="searchB"
                      @keyup="searchByBrand(searchB)"
                    />
                  </td>
                  <td>
                    <input
                      class="form-control form-control-sm"
                      type="text"
                      placeholder="Miqdor bo'yicha"
                      v-model="searchQ"
                      @keyup="searchByQuantity(searchQ)"
                    />
                  </td>
                  <td></td>
                  <td></td>
                  <td>
                    <input
                      class="form-control form-control-sm"
                      type="text"
                      placeholder="Sotuvchi bo'yicha"
                      v-model="searchS"
                      @keyup="searchBySeller(searchS)"
                    />
                  </td>
                  <td>
                    <input
                      class="form-control form-control-sm"
                      type="text"
                      placeholder="Mijoz bo'yicha"
                      v-model="searchC"
                      @keyup="searchByClient(searchC)"
                    />
                  </td>
                  <td></td>
                  <td v-if="role == 'cashier'"></td>
                </tr> -->
                  <tr v-for="(savdo, n) in savdolar || []" :key="savdo.id">
                    <td>{{ n + 1 }}</td>
                    <td>
                      {{ Intl.NumberFormat().format(savdo.order_price) }}so'm
                    </td>
                    <td>{{ savdo.owner_id }}</td>
                    <td>{{ savdo.client_id }}</td>
                    <td>{{ savdo.time.replace("T", " ") }}</td>
                    <td>
                      <button
                        class="btn btn-sm btn-success"
                        data-toggle="modal"
                        href="#products"
                        @click="mahsulotlar = savdo"
                      >
                        <span class="fa fa-info" />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <hr />
          <Chart
            :statistic="statistic"
            v-if="
              (role == 'admin' || role == 'branch_admin') &&
              this.$route.name !== 'Vozvrat'
            "
          />
        </span>
      </div>
    </div>
  </div>

  <div class="modal fade" id="products">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h4>Ushbu savdo mahsulotlari</h4>
        </div>
        <div class="modal-body">
          <table
            class="table table-sm table-hover table-borderless text-center"
          >
            <thead>
              <tr>
                <th>№</th>
                <th>Mahsulot</th>
                <th>Hajm</th>
                <th>Narx</th>
                <th>Summa</th>
                <th v-if="this.$route.name == 'Vozvrat'"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(mahsulot, n) in mahsulotlar.data" :key="mahsulot">
                <td>{{ n + 1 }}</td>
                <td>{{ mahsulot.name }} {{ mahsulot.brand }}</td>
                <td>{{ mahsulot.quantity }} {{ mahsulot.measure }}</td>
                <td>
                  {{ Intl.NumberFormat().format(mahsulot.selling_price) }} so'm
                </td>
                <td>
                  {{
                    Intl.NumberFormat().format(
                      mahsulot.selling_price * mahsulot.quantity
                    )
                  }}
                  so'm
                </td>
                <td v-if="this.$route.name == 'Vozvrat'">
                  <button class="btn btn-sm" @click="returnProduct(mahsulot)">
                    <span class="fa fa-arrow-rotate-left" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <input type="hidden" id="close_modal" data-dismiss="modal" />
      </div>
    </div>
  </div>

  <isloading :isloading="isloading" :message="errorr" />
</template>

<script>
import { instance } from "../Api";
import isloading from "../../Anime/Anime.vue";
import swal from "sweetalert";
import Chart from "./Chart.vue";
import Mahsulotlar from "./Mahsulotlar.vue";
export default {
  components: { isloading, Chart, Mahsulotlar },
  data() {
    return {
      role: localStorage.getItem("role"),
      date: new Date(),
      fromDate: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        1
      ).toISOString(),
      toDate: new Date(
        new Date().getFullYear(),
        new Date().getMonth() + 1,
        0
      ).toISOString(),
      savdolar: [],
      mahsulotlar: [],
      savdolar2: [],
      productR: {},
      returnP: {
        quantity: null,
      },
      statistic: {},
      allIncomes: null,
      isloading: false,
      table: false,
      searchN: "",
      searchB: "",
      searchQ: "",
      searchS: "",
      searchC: "",
      errorr: "",
      tab: localStorage.getItem("tab"),
    };
  },
  methods: {
    setTab(tab) {
      localStorage.setItem("tab", tab);
    },
    getData() {
      this.savdolar = [];
      this.isloading = true;
      instance
        .get("all_orders/true")
        .then((orders) => {
          if (orders.data.length > 0) {
            orders.data.forEach((order) => {
              if (order.time >= this.fromDate && order.time <= this.toDate) {
                this.savdolar.push(order);
                this.table = true;
                this.isloading = false;
              } else {
                this.isloading = false;
              }
            });
          } else {
            this.isloading = false;
            swal({
              icon: "warning",
              title: "Qidiruv natijasi bo'sh !",
            });
          }
        })
        .catch((err) => {
          this.isloading = false;
          this.errorr = err.message;
        });
    },
    returnProduct(savdo) {
      console.log(savdo);
      this.returnP.quantity = Number(this.returnP.quantity);
      swal({
        title: savdo.name + " mahsulotidan qaytarib olish",
        text:
          "Ushbu mahsulotning savdodagi hajmi : " +
          savdo.quantity +
          " " +
          savdo.measure,
        content: {
          element: "input",
          attributes: {
            type: "number",
            placeholder: "Hajm: " + savdo.measure,
          },
        },
        closeOnClickOutside: false,
        closeOnEsc: false,
      }).then((value) => {
        value = Number(value);
        console.log(value);
        if (value < 0 || value > savdo.quantity) {
          swal({
            icon: "warning",
            title: "Noto'g'ri qiymat",
          });
        } else {
          this.returnP.quantity = value;
          instance
            .post("return_product/" + savdo.id, this.returnP)
            .then((response) => {
              console.log(response.data);
              if (
                response.status == 200 &&
                response.data !== "So'rovda xatolik"
              ) {
                swal({
                  icon: "success",
                  title: "Mahsulot qaytarib olindi",
                  timer: 800,
                }).then(() => {
                  if (response.data == "success") {
                    // location.reload()
                    document.querySelector("#close_modal").click();
                    this.getData();
                  } else {
                    location.href = "/nasiyaMijoz/" + response.data;
                  }
                });
              } else if (response.data == "So'rovda xatolik") {
                swal({ icon: "warning", title: response.data, timer: 800 });
              }
            })
            .catch((err) => {
              this.isloading = false;
              this.errorr = err.message;
            });
        }
      });
    },
    // searchByName(name) {
    //   let savdolar = [];
    //   if (name.length !== 0) {
    //     this.savdolar.forEach((savdo) => {
    //       if (savdo.product.toLowerCase().startsWith(name.toLowerCase())) {
    //         savdolar.push(savdo);
    //       }
    //     });
    //     this.savdolar = savdolar;
    //   } else if (name.length == 0) {
    //     this.savdolar = this.savdolar2;
    //   }
    // },
    // searchByBrand(brand) {
    //   let savdolar = [];
    //   if (brand.length !== 0) {
    //     this.savdolar.forEach((savdo) => {
    //       if (savdo.brand.toLowerCase().startsWith(brand.toLowerCase())) {
    //         savdolar.push(savdo);
    //       }
    //     });
    //     this.savdolar = savdolar;
    //   } else if (brand.length == 0) {
    //     this.savdolar = this.savdolar2;
    //   }
    // },
    // searchByQuantity(quantity) {
    //   let savdolar = [];
    //   if (quantity.length !== 0) {
    //     this.savdolar.forEach((savdo) => {
    //       if (String(savdo.quantity).startsWith(quantity)) {
    //         savdolar.push(savdo);
    //       }
    //     });
    //     this.savdolar = savdolar;
    //   } else if (quantity.length == 0) {
    //     this.savdolar = this.savdolar2;
    //   }
    // },
    // searchBySeller(seller) {
    //   let savdolar = [];
    //   if (seller.length !== 0) {
    //     this.savdolar.forEach((savdo) => {
    //       if (savdo.owner.toLowerCase().startsWith(seller.toLowerCase())) {
    //         savdolar.push(savdo);
    //       }
    //     });
    //     this.savdolar = savdolar;
    //   } else if (seller.length == 0) {
    //     this.savdolar = this.savdolar2;
    //   }
    // },
    // searchByClient(client) {
    //   let savdolar = [];
    //   if (client.length !== 0) {
    //     this.savdolar.forEach((savdo) => {
    //       if (savdo.client.toLowerCase().startsWith(client.toLowerCase())) {
    //         savdolar.push(savdo);
    //       }
    //     });
    //     this.savdolar = savdolar;
    //   } else if (client.length == 0) {
    //     this.savdolar = this.savdolar2;
    //   }
    // },

    getStatistic() {
      console.clear();
      this.isloading = true;
      instance
        .get("statistics_between_time/" + this.fromDate + "/" + this.toDate)
        .then((response) => {
          this.statistic = response.data;
          this.isloading = false;
        });
    },
  },
  mounted() {
    console.clear();
    this.getStatistic();

    // instance.get("all_products_for_trade_to_search").then((res) => {
    //   console.log(res.data)
    // })
  },
};
</script>
<style>
</style>