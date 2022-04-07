<template>
  <div class="container-fluid">
    <div class="card shadow">
      <div class="card-header">
        <h3 v-if="role == 'cashier'">Vozvrat qilish</h3>
        <h3 v-else>Asosiy ko'rsatgichlar</h3>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-md-4 mb-2">
            <input type="date"  class="form-control" min="2022-02-20" max="2032-02-20" v-model="fromDate" />
          </div>
          <div class="col-md-4 mb-2">
            <input type="date" class="form-control" v-model="toDate" />
          </div>
          <div class="col-md-4 mb-2">
            <button
              class="btn btn-block btn-outline-success"
              @click="getData()"
            >
              <span class="far fa-circle-check" /> Qidirish
            </button>
          </div>
        </div>
        <div class="my-2">
          <div
            class="
              table-responsive
              text-center
              table-bordered
              my-custom-scrollbar
              table-wrapper-scroll-y
            "
            v-if="table"
          >
            <table class="table-sm table-hover">
              <thead>
                <tr>
                  <th>Mahuslot</th>
                  <th>Brend</th>
                  <th>Miqdor</th>
                  <th>Narx</th>
                  <th>Summa</th>
                  <th>Sotuvchi</th>
                  <th>Mijoz</th>
                  <th>Sana</th>
                  <th v-if="role == 'cashier'"></th>
                </tr>
              </thead>
              <tbody>
                <tr>
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
                </tr>
                <tr v-for="savdo in savdolar || []" :key="savdo.id">
                  <td>{{ savdo.product }}</td>
                  <td>{{ savdo.brand }}</td>
                  <td>{{ savdo.quantity }} {{ savdo.measure }}</td>
                  <td>
                    {{
                      Intl.NumberFormat({ style: "currency" }).format(
                        savdo.selling_price
                      )
                    }}
                    so'm
                  </td>
                  <td>
                    {{
                      Intl.NumberFormat({ style: "currency" }).format(
                        savdo.selling_price * savdo.quantity
                      )
                    }}
                    so'm
                  </td>
                  <td>{{ savdo.owner }}</td>
                  <td>{{ savdo.client }}</td>
                  <td>{{ savdo.time }}</td>
                  <td v-if="role == 'cashier'">
                    <button
                      class="btn btn-sm btn-outline-primary"
                      @click="returnProduct(savdo)"
                      data-toggle="modal"
                      data-target="#returnProduct"
                    >
                      <span class="fa fa-undo" />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <hr />
        <Chart v-if="role == 'admin' || role == 'branch_admin'"/>
      </div>
    </div>
  </div>

  <isloading :isloading="isloading" :message="errorr" />
</template>

<script type="text/javascript">
import { instance } from "../Api";
import isloading from "../../Anime/Anime.vue";
import swal from "sweetalert";
import Chart from "./Chart.vue";
export default {
  components: { isloading, Chart },
  data() {
    return {
      role: localStorage.getItem("role"),
      fromDate: "",
      toDate: "",
      savdolar: [],
      savdolar2: [],
      productR: {},
      returnP: {
        quantity: null,
      },
      allIncomes: null,
      isloading: false,
      table: false,
      searchN: "",
      searchB: "",
      searchQ: "",
      searchS: "",
      searchC: "",
      errorr: "",
    };
  },
  methods: {
    getData() {
      this.savdolar = [];
      this.isloading = true;
      instance.get("all_orders/true").then((orders) => {
        console.log(orders.data)
        if (orders.data.length > 0) {
          orders.data.forEach((element) => {
            element.time = element.time.replace("T", " ");
            if (element.time >= this.fromDate && element.time <= this.toDate) {
              instance.get("this_order_trades/" + element.id).then((trades) => {
                trades.data.forEach((element2) => {
                  instance
                    .get("this_product/empty/" + element2.product_code)
                    .then((product) => {
                      this.savdolar.push({
                        trade_id: element2.id,
                        client: element.client_id,
                        owner: element.owner_id,
                        time: element.time,
                        quantity: element2.quantity,
                        selling_price: element2.selling_price,
                        product: product.data[0].name,
                        brand: product.data[0].brand,
                        measure: product.data[0].measure,
                      });
                      this.savdolar2 = this.savdolar;
                      this.isloading = false;
                      this.table = true;
                    })
                });
              });
            } else {
              swal({
                icon: "warning",
                title: "Joriy sana bo'yicha buyurtmalar topilmadi !",
              }).then(() => {
                this.isloading = false
              })
            }
          });
        } else {
          this.isloading = false
          swal({
            icon: "warning",
            title: "Qidiruv natijasi bo'sh !",
          })
        }
        })
        .catch((err) => {
          this.isloading = false;
          this.errorr = err.message;
        });
    },
    returnProduct(savdo) {
      this.returnP.quantity = Number(this.returnP.quantity);
      swal({
        title: savdo.product + " mahsulotidan qaytarib olish",
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
        value = Number(value)
        console.log(value)
        if (value < 0 || value > savdo.quantity) {
          swal({
            icon: "warning",
            title: "Noto'g'ri qiymat",
          });
        } else {
          this.returnP.quantity = value
          instance
            .post("return_product/" + savdo.trade_id, this.returnP)
            .then((response) => {
              console.log(response.data)
              if (response.status == 200) {
                if (response.data == "success") {
                  swal({
                    icon: "success",
                    title: "Mahsulot qaytarib olindi",
                    timer: 1000
                  }).then(
                    location.reload()
                  )
                } else {
                  swal({
                    icon: "success",
                    title: "Mahsulot qaytarib olindi",
                    timer: 1000
                  }).then(
                    location.href = "/nasiyaMijoz/" + response.data
                  )
                }
              }
            })
            .catch((err) => {
            this.isloading = false;
             this.errorr = err.message
          });
        }
      });
    },
    searchByName(name) {
      let savdolar = [];
      if (name.length !== 0) {
        this.savdolar.forEach((savdo) => {
          if (savdo.product.toLowerCase().startsWith(name.toLowerCase())) {
            savdolar.push(savdo);
          }
        });
        this.savdolar = savdolar;
      } else if (name.length == 0) {
        this.savdolar = this.savdolar2;
      }
    },
    searchByBrand(brand) {
      let savdolar = [];
      if (brand.length !== 0) {
        this.savdolar.forEach((savdo) => {
          if (savdo.brand.toLowerCase().startsWith(brand.toLowerCase())) {
            savdolar.push(savdo);
          }
        });
        this.savdolar = savdolar;
      } else if (brand.length == 0) {
        this.savdolar = this.savdolar2;
      }
    },
    searchByQuantity(quantity) {
      let savdolar = [];
      if (quantity.length !== 0) {
        this.savdolar.forEach((savdo) => {
          if (String(savdo.quantity).startsWith(quantity)) {
            savdolar.push(savdo);
          }
        });
        this.savdolar = savdolar;
      } else if (quantity.length == 0) {
        this.savdolar = this.savdolar2;
      }
    },
    searchBySeller(seller) {
      let savdolar = [];
      if (seller.length !== 0) {
        this.savdolar.forEach((savdo) => {
          if (savdo.owner.toLowerCase().startsWith(seller.toLowerCase())) {
            savdolar.push(savdo);
          }
        });
        this.savdolar = savdolar;
      } else if (seller.length == 0) {
        this.savdolar = this.savdolar2;
      }
    },
    searchByClient(client) {
      let savdolar = [];
      if (client.length !== 0) {
        this.savdolar.forEach((savdo) => {
          if (savdo.client.toLowerCase().startsWith(client.toLowerCase())) {
            savdolar.push(savdo);
          }
        });
        this.savdolar = savdolar;
      } else if (client.length == 0) {
        this.savdolar = this.savdolar2;
      }
    },

    getStatistic() {
      // this.isloading = true
      // this.allIncomes = 0
      // instance.get("all_orders/true").then((orders) => {
      //   console.log(orders.data)
      //   if (orders.data.length > 0) {
      //     orders.data.forEach((element) => {
      //       instance.get("this_order_incomes/" + element.id).then((incomes) => {
      //         incomes.data.forEach((element2) => {
      //           this.allIncomes += element2.price
      //         })
      //         this.isloading = false
      //         })
      //     })
      //   } else {
      //     this.isloading = false
      //   }
      // })
    },
  },
  mounted() {
    console.clear();
    this.getStatistic()
    
    // instance.get("all_products_for_trade_to_search").then((res) => {
    //   console.log(res.data)
    // })
  },
};
</script>
<style>
</style>