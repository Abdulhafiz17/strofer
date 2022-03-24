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
              @click="(orderId = tab.id), getTrades(orderId)"
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
                                @change="postOrder(mahsulot, tab)"
                                :max="mahsulot.qoldiq"
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
                                @change="postOrder(mahsulot, tab)"
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
                            so'm
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
                      <tfoot>
                        <tr
                          style="
                            border-top: 1px solid var(--success);
                            border-radius: 5px;
                          "
                        >
                          <th colspan="5">
                            <span class="float-right"> Jami summa: </span>
                          </th>
                          <td>
                            <span class="float-right">
                              {{
                                Intl.NumberFormat({ style: "currency" }).format(
                                  balance.selling_price
                                )
                              }} so'm
                              <span class="fa fa-coin" />
                            </span>
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                    <button
                      class="btn btn-outline-success m-2 float-right"
                      data-toggle="modal"
                      data-target="#cash"
                    >
                      <span class="far fa-circle-check" /> Tasdiqlash
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </span>
        </span>
      </div>
    </div>
    <div class="modal fade" id="cash">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h3>Savdoni tasdiqlash</h3>
          </div>
          <form @submit.prevent="payToCass(naxtSavdo, plastikSavdo)">
            <div class="modal-body">
              <ul
                class="nav nav-pills nav-justified mb-3"
                id="pills-tab"
                role="tablist"
              >
                <li class="nav-item" role="presentation">
                  <button
                    class="nav-link btn-sm"
                    id="pills-anonym-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-anonym"
                    type="button"
                    role="tab"
                    aria-controls="pills-anonym"
                    aria-selected="true"
                    @click="client = false"
                  >
                    Anonim
                  </button>
                </li>
                <li class="nav-item" role="presentation">
                  <button
                    class="nav-link btn-sm"
                    id="pills-client-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-client"
                    type="button"
                    role="tab"
                    aria-controls="pills-client"
                    aria-selected="true"
                    @click="client = true"
                  >
                    Mijoz
                  </button>
                </li>
              </ul>
              <strong class="my-2"> <center> Umumiy summa : {{ Intl.NumberFormat({style: "currency"}).format(balance.selling_price) }} so'm </center> </strong>
              <hr/>
              <div class="tab-content" id="pills-tabContent">
                <div
                  class="tab-pane fade"
                  id="pills-anonym"
                  role="tabpanel"
                  aria-labelledby="pills-anonym-tab"
                >
                  <div class="row mt-2">
                    <div class="col-md">
                      <label>Naxt</label>
                      <span class="input-group input-group-sm p-2">
                        <input
                          type="number"
                          class="form-control"
                          v-model="naxtSavdo.price"
                          @keyup="count1()"
                          min="0"
                          :max="balance.selling_price"
                        />
                        <div class="input-group-append">
                          <div class="input-group-text">
                            so'm
                          </div>
                        </div>
                      </span>
                    </div>
                    <div class="col-md">
                      <label>Plastik</label>
                      <span class="input-group input-group-sm p-2">
                        <input
                          type="number"
                          class="form-control"
                          v-model="plastikSavdo.price"
                          min="0"
                          :max="balance.selling_price"
                          @keyup="count2()"
                        />
                        <div class="input-group-append">
                          <div class="input-group-text">
                            so'm
                          </div>
                        </div>
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  class="tab-pane fade"
                  id="pills-client"
                  role="tabpanel"
                  aria-labelledby="pills-client-tab"
                >
                  <label> Mijoz </label>
                  <input
                    type="text"
                    class="form-control form-control-sm my-1"
                    list="mijozlar"
                    v-model="client_id"
                  />
                  <datalist id="mijozlar">
                    <option
                      v-for="mijoz in mijozlar"
                      :key="mijoz.id"
                      :value="mijoz.id"
                    >
                      {{ mijoz.name }}
                    </option>
                  </datalist>
                  <div class="row mt-2">
                    <div class="col-md">
                      <label>Naxt</label>
                      <span class="input-group input-group-sm p-2">
                        <input
                          type="number"
                          class="form-control"
                          v-model="naxtSavdo.price"
                          min="0"
                          :max="balance.selling_price"
                          @keyup="nasiya1()"
                        />
                        <div class="input-group-append">
                          <div class="input-group-text">
                            so'm
                          </div>
                        </div>
                      </span>
                    </div>
                    <div class="col-md">
                      <label>Plastik</label>
                      <span class="input-group input-group-sm p-2">
                        <input
                          type="number"
                          class="form-control"
                          v-model="plastikSavdo.price"
                          min="0"
                          :max="balance.selling_price"
                          @keyup="nasiya2()"
                        />
                        <div class="input-group-append">
                          <div class="input-group-text">
                            so'm
                          </div>
                        </div>
                      </span>
                    </div>
                  </div>
                  <div class="row mt-2" v-if="nasiyaSumma != 0">
                    <div class="col-md">
                      <label> Nasiya summa </label>
                      <div class="input-group input-group-sm p-2">
                        <input
                          type="number"
                          class="form-control"
                          v-model="nasiyaSumma"
                          readonly
                        />
                        <div class="input-group-append">
                          <div class="input-group-text bg-gray">
                            so'm
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-md">
                      <label> Nasiya sanasi </label>
                      <div class="p-2">
                        <input
                          type="date"
                          id="date"
                          class="form-control form-control-sm"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="submit" class="btn btn-outline-success">
                <span class="far fa-circle-check" /> Tasdiqlash
              </button>
              <button class="btn btn-outline-danger" data-dismiss="modal">
                <span class="far fa-circle-xmark" /> Bekor qilish
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <isloading :isloading="isloading"/>
</template>

<script>
import isloading from "../../Anime/Anime.vue"
import { instance } from "../Api";
import swal from "sweetalert";
// import { getButtonListOpts } from 'sweetalert/typings/modules/options/buttons';
// import { setActionValue } from 'sweetalert/typings/modules/state';
export default {
  components: { isloading },
  data() {
    return {
      role: localStorage.getItem("role"),
      buyurtmalar: [],
      mahsulotlar: [],
      buyurtmaMahsulotlar: [],
      balance: [],
      mijozlar: [],
      tradesLength: 0,
      orderId: "",
      client_id: "",
      client: false,
      search: "",
      isloading: false,
      naxtSavdo: {
        price: null,
        comment: "naxt"
      },
      plastikSavdo: {
        price: null,
        comment: "plastik"
      },
      nasiyaSumma: 0,
    };
  },
  methods: {
    getBuyurtma() {
      this.isloading = true
      this.buyurtmalar = [];
      instance.get("all_orders/false").then((res) => {
        this.buyurtmalar = res.data;
        // console.log(res.data);
      }).finally(
        this.isloading = false
      )

      this.isloading = true
      instance.get("all_customers").then((res) => {
        this.mijozlar = res.data;
      }).finally(
        this.isloading = false
      )
    },
    deleteOrder(id) {
      this.isloading = true
      instance.delete("remove_this_order/" + id).then(() => {
        setTimeout(() => {
          this.getBuyurtma();
        }, 400);
      }).finally(
        this.isloading = false
      )
    },
    getTrades(id) {
      this.isloading = true
      this.buyurtmaMahsulotlar = [];
      instance.get("this_order_trades/" + id).then((res) => {
        res.data.forEach((element) => {
          instance
            .get("this_product/empty/" + element.product_code)
            .then((response) => {
              let mahsulot = {
                code: element.product_code,
                name: response.data[0].name,
                brand: response.data[0].brand,
                hajm: element.quantity,
                qoldiq: response.data[0].quantity,
                olchov: response.data[0].measure,
                narx: element.selling_price,
                oxirgi_narx: response.data[0].final_price,
                currency: response.data[0].currency_id_for_sell,
              };
              this.buyurtmaMahsulotlar.push(mahsulot);
            });
        });
      }).finally(
        this.getBalances(this.orderId),
        this.isloading = false
      )
    },
    getBalances(id) {
      this.isloading = true,
      (this.balance = []),
        instance.get("this_order_balances/" + id).then((res) => {
          this.balance = res.data[0]
          // res.data.forEach((element) => {
          //   instance
          //       let buyurtmaBalance = {
          //         price: element.selling_price,
          //         currency_id: element.currency_id_for_sell,
          //       };
          //       this.balance.push(buyurtmaBalance);
          // });
        }).finally(
          this.isloading = false
        )
    },
    postOrder(mahsulot, order) {
      this.isloading = true
      if (mahsulot.hajm > mahsulot.qoldiq) {
        alert(
          "Ushbu mahsulotta yetarli qoldiq mavjud emas ! Qoldiq : " +
            mahsulot.qoldiq
        );
        mahsulot.hajm = mahsulot.qoldiq;
      } else {
        let product = {
          product_code: mahsulot.code,
          quantity: mahsulot.hajm,
          selling_price: mahsulot.narx,
          order_id: order.id,
        };
        instance.put("update_this_trade", product).then((res) => {
          mahsulot = {
            hajm: product.quantity,
            narx: product.selling_price,
          };
          // setTimeout(() => {
          //   this.getTrades(this.orderId)
          // }, 3000);
        }).then(() => {
          this.getBalances(this.orderId);
        }).finally(
          this.isloading = false
        )
      }
    },
    deleteTrade(code) {
      this.isloading = true
      console.log(code, this.orderId);
      instance
        .delete("remove_this_trade/" + code + "/" + this.orderId)
        .then((res) => {
          console.log(res.data);
        }).finally(
          this.isloading = false
        )
    },
    count1() {
      this.plastikSavdo.price = this.balance.selling_price - this.naxtSavdo.price
    },
    count2() {
      this.naxtSavdo.price = this.balance.selling_price - this.plastikSavdo.price
    },
    nasiya1() {
      this.nasiyaSumma = (this.balance.selling_price - this.plastikSavdo.price) - this.naxtSavdo.price
    },
    nasiya2() {
      this.nasiyaSumma = (this.balance.selling_price - this.naxtSavdo.price) - this.plastikSavdo.price
    },
    payToCass(naxt, plastik) {
      this.isloading = true
      // let date = new Date();
      let new_loan = {
        return_date: document.querySelector("#date").value
      };

      if (this.client == true && this.client_id == "") {
        swal({
          icon: "warning",
          title: "Mijoz tanlang !",
          timer: 2000,
          closeOnClickOutside: false,
          closeOnEsc: false,
        });
      } else if (this.client == false && this.client_id == "") {
        let new_incomes = [];
        if (naxt.price == 0 || naxt.price == null) {
          new_incomes.push(plastik)
        } else if (plastik.price == 0 || plastik.price == null) {
          new_incomes.push(naxt)
        } else {
          new_incomes.push(naxt, plastik)
        }
        instance
          .post("order_confirmation/" + this.orderId + "/unknown", {new_incomes, new_loan})
          .then((res) => {
            console.log(res.data);
            if (res.data == null || res.data == "success") {
              swal({
                icon: "success",
                title: "Savdo tugatildi",
                timer: 1500,
              }).then(
                window.location.reload()
              )
            }
          }).finally(
            this.isloading = false
          )
      } else {
        let new_incomes = [];
        if (naxt.price == 0 || naxt.price == null) {
          new_incomes = []
          new_incomes.push(plastik)
        } else if (plastik.price == 0 || plastik.price == null) {
          new_incomes = []
          new_incomes.push(naxt)
        } else {
          new_incomes = []
          new_incomes.push(naxt, plastik)
        }
        instance
          .post(
            "order_confirmation/" + this.orderId + "/" + this.client_id,
            {new_incomes, new_loan}
          )
          .then((res) => {
            console.log(res.data);
            if (res.data == null || res.data == "success") {
              swal({
                icon: "success",
                title: "Savdo tugatildi",
                timer: 1500,
              }).then(
                window.location.reload()
              )
            }
          }).finally(
            this.isloading = false
          )
      }
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