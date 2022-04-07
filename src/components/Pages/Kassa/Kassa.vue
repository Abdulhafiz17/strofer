<template>
  <div class="container-fluid">
    <div class="card shadow">
      <div
        class="alert alert-warning fade show"
        role="alert"
        v-if="alert == 'price'"
      >
        <strong>Mahsulot sotuv narxi oxirgi narxdan past belgilandi !</strong>
      </div>
      <div class="card-header">
        <div class="row">
          <div class="col">
            <h3>Kassa</h3>
          </div>
          <div class="col">
            <button class="btn btn-primary float-right" @click="getBuyurtma()">
              <span class="fa fa-sync" />
            </button>
          </div>
        </div>
      </div>
      <div class="card-body">
        <nav>
          <div class="nav nav-pills" id="nav-tab" role="tablist">
            <button
              v-for="tab in buyurtmalar"
              :key="tab.id"
              :id="tab.id"
              class="nav-link"
              data-bs-toggle="tab"
              :href="'/#nav' + tab.id"
              type="button"
              role="tab"
              :aria-controls="'nav' + tab.id"
              aria-selected="true"
              @click="orderId = tab.id"
            >
              <button
                class="btn btn-sm text-danger"
                @click="deleteOrder(tab.id)"
              >
                <span class="far fa-circle-xmark" />
              </button>
              <center v-if="tab">
                {{ tab.number }} - buyutma <br />
                {{ tab.time.substr(11, 8) }}
              </center>
            </button>
            <button class="btn btn-sm" @click="createOrder()">
              <span class="fa fa-circle-plus" />
            </button>
          </div>
        </nav>
        <hr />
        <span class="tab-content" id="nav-tabContent">
          <span
            v-for="tab in buyurtmalar"
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
                        class="btn btn-sm btn-outline-success float-left"
                        data-toggle="modal"
                        href="#addProduct"
                      >
                        <span class="fa fa-barcode" />
                      </button>
                    </div>
                    <div class="col-sm">
                      <h4>{{ tab.number }} - buyurtma</h4>
                    </div>
                    <div class="col-sm">
                      <h5>{{ tab.time.replace("T", " ") }}</h5>
                    </div>
                  </div>
                </div>
                <div class="card-body">
                  <!-- <input class="form-control mb-1" id="searchInput" v-model="search" type="search" placeholder="Qidiruv"/> -->
                  <div
                    class="table-responsive text-center"
                    v-if="tab.order_price"
                  >
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
                          v-for="(mahsulot, n) in tab.data"
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
                                v-model="mahsulot.quantity"
                                min="0"
                                required
                              />
                              <div class="input-group-append">
                                <div class="input-group-text">
                                  {{ mahsulot.measure }}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div class="input-group input-group-sm">
                              <span :class="'tooltiptext ' + tab.id"></span>
                              <input
                                v-model="mahsulot.selling_price"
                                class="form-control text-center"
                                @keyup="countPrice(mahsulot), tooltip(tab.id)"
                                min="0"
                                type="number"
                                :id="'currency' + tab.id"
                                required
                              />
                              <div class="input-group-append">
                                <div class="input-group-text">so'm</div>
                              </div>
                            </div>
                          </td>
                          <td>
                            {{
                              Intl.NumberFormat({ style: "currency" }).format(
                                mahsulot.selling_price * mahsulot.quantity
                              )
                            }}
                            so'm
                          </td>
                          <td>
                            <button
                              class="btn btn-sm btn-outline-success"
                              @click="postOrder(mahsulot, tab)"
                            >
                              <span class="far fa-circle-check" />
                            </button>
                            <button
                              class="btn btn-sm btn-outline-danger"
                              type="button"
                              @click="deleteTrade(mahsulot.code)"
                            >
                              <span class="far fa-circle-xmark" />
                            </button>
                          </td>
                        </tr>
                      </tbody>
                      <tfoot v-if="tab.order_price">
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
                              {{ Intl.NumberFormat().format(tab.order_price) }}
                              so'm
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
                      @click="balance = tab.order_price"
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
                    class="nav-link active btn-sm"
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
              <strong class="my-2">
                <center>
                  Umumiy summa :
                  {{ Intl.NumberFormat({ style: "currency" }).format(balance) }}
                  so'm
                </center>
              </strong>
              <hr />
              <div class="tab-content" id="pills-tabContent">
                <div
                  class="tab-pane fade show active"
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
                          :max="balance"
                          id="currency"
                        />
                        <div class="input-group-append">
                          <div class="input-group-text">so'm</div>
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
                          :max="balance"
                          @keyup="count2()"
                          id="currency"
                        />
                        <div class="input-group-append">
                          <div class="input-group-text">so'm</div>
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
                  <!-- <input
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
                  </datalist> -->
                  <div class="input-group">
                    <select
                      class="custom-select custom-select-sm"
                      v-model="client_id"
                    >
                      <option>
                        <input
                          type="text"
                          placeholder="Qidiruv . . ."
                          class="form-control form-control-sm"
                        />
                      </option>
                      <option
                        v-for="mijoz in mijozlar"
                        :key="mijoz.id"
                        :value="mijoz.id"
                      >
                        {{ mijoz.name }}
                      </option>
                    </select>
                    <div class="input-group-append">
                      <button
                        type="button"
                        class="btn btn-sm btn-success"
                        data-toggle="modal"
                        href="#mijozQoshish"
                      >
                        <span class="fa fa-circle-plus" />
                      </button>
                    </div>
                  </div>
                  <div class="row mt-2">
                    <div class="col-md">
                      <label>Naxt</label>
                      <span class="input-group input-group-sm p-2">
                        <input
                          type="number"
                          class="form-control"
                          v-model="naxtSavdo.price"
                          min="0"
                          :max="balance - plastikSavdo.price"
                          @keyup="nasiya1()"
                          id="currency"
                        />
                        <div class="input-group-append">
                          <div class="input-group-text">so'm</div>
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
                          :max="balance - naxtSavdo.price"
                          @keyup="nasiya2()"
                          id="currency"
                        />
                        <div class="input-group-append">
                          <div class="input-group-text">so'm</div>
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
                          min="0"
                          class="form-control"
                          v-model="nasiyaSumma"
                          readonly
                        />
                        <div class="input-group-append">
                          <div class="input-group-text bg-gray">so'm</div>
                        </div>
                      </div>
                    </div>
                    <div class="col-md">
                      <label> Nasiya sanasi </label>
                      <div class="p-2">
                        <input
                          type="date"
                          id="date"
                          v-model="new_loan"
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
  <div class="modal fade" id="mijozQoshish">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title" id="exampleModallLabel">Mijoz qo'shish</h4>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-md-12">
              <div class="form-group field-client-ism required">
                <label class="mt-3">Ism</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Mijoz ismi"
                  required
                  v-model="yangiMijoz.name"
                />

                <label class="mt-3">Manzil</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Manzil"
                  required
                  v-model="yangiMijoz.address"
                />

                <label class="mt-3">Telefon</label>
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span
                      class="input-group-text"
                      id="inputGroup-sizing-default"
                      >+998</span
                    >
                  </div>
                  <input
                    type="tel"
                    class="form-control"
                    placeholder="Tel"
                    min="0"
                    minlength="9"
                    maxlength="9"
                    required
                    v-model="yangiMijoz.phone"
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button
            type="button"
            form="form1"
            class="btn btn-outline-success"
            data-dismiss="modal"
            @click="mijozQoshish()"
          >
            <i class="far fa-check-circle"></i>
            Tasdiqlash
          </button>
          <button
            class="btn btn-outline-danger"
            type="button"
            data-dismiss="modal"
          >
            <i class="far fa-times-circle"></i>
            Bekor qilish
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="modal fade" id="addProduct">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h4>Mahsulot qo'shish</h4>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col">
              <div class="input-group">
                <input
                  class="form-control"
                  type="number"
                  min="0"
                  id="barcode"
                  placeholder="Code"
                  @change="addProduct()"
                />
                <div class="input-group-append">
                  <div class="input-group-text">
                    <span class="fa fa-barcode" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row my-3" v-if="product">
            <table
              class="table table-lg table-borderless table-hover text-center"
            >
              <tbody>
                <tr>
                  <th>Mahsulot:</th>
                  <td>{{ product.name }}</td>
                </tr>
                <tr>
                  <th>Brend:</th>
                  <td>{{ product.brand }}</td>
                </tr>
                <tr>
                  <th>Sotuv narx:</th>
                  <td>
                    {{ Intl.NumberFormat().format(product.selling_price) }} so'm
                  </td>
                </tr>
                <tr>
                  <th>Qoldiq:</th>
                  <td>{{ product.quantity }} {{ product.measure }}</td>
                </tr>
              </tbody>
            </table>
            <div class="col">
              <div class="row">
                <div class="col">
                  <div class="input-group">
                    <input
                      type="number"
                      step="any"
                      min="0"
                      class="form-control"
                      id="quantity"
                      placeholder="Hajm"
                      required
                      @change="toTrade(product)"
                    />
                    <div class="input-group-append">
                      <div class="input-group-text">
                        {{ product.measure }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <input type="hidden" data-dismiss="modal" id="close_modal" />
        </div>
      </div>
    </div>
  </div>
  <isloading :isloading="isloading" :message="errorr" />
</template>

<script>
import isloading from "../../Anime/Anime.vue";
import { instance } from "../Api";
import swal from "sweetalert";
import { stringifyQuery } from "vue-router";

export default {
  components: { isloading },
  data() {
    return {
      role: localStorage.getItem("role"),
      buyurtmalar: [],
      mahsulotlar: [],
      buyurtmaMahsulotlar: [],
      balance: {},
      mijozlar: [],
      tradesLength: 0,
      orderId: "",
      client_id: "",
      client: false,
      search: "",
      isloading: true,
      naxtSavdo: {
        price: null,
        comment: "naxt",
      },
      plastikSavdo: {
        price: null,
        comment: "plastik",
      },
      nasiyaSumma: 0,
      new_loan: "",
      errorr: "",
      yangiMijoz: {
        name: "",
        phone: null,
        address: "",
        comment: "string",
      },
      alert: String,
      product: null,
    };
  },
  methods: {
    getBuyurtma() {
      this.isloading = true;
      this.alert = String;
      this.buyurtmalar = [];
      this.buyurtmaMahsulotlar = [];
      instance
        .get("all_orders/false")
        .then((res) => {
          console.log(res.data);
          this.buyurtmalar = res.data;
          this.isloading = false;
        })
        .catch((err) => {
          this.isloading = false;
          this.errorr = err.message;
        });
    },
    createOrder() {
      this.isloading = true;
      instance.post("create_order").then((response) => {
        console.log(response.data);
        this.buyurtmalar = response.data;
        this.isloading = false;
      });
    },
    getMijozlar() {
      instance
        .get("all_customers")
        .then((res) => {
          this.mijozlar = res.data;
        })
        .catch((err) => {
          this.isloading = false;
          this.errorr = err.message;
        })
        .finally((this.isloading = false));
    },
    deleteOrder(id) {
      this.isloading = true;
      this.buyurtmalar = [];
      instance
        .delete("remove_this_order/" + id)
        .then((res) => {
          if (res.status == 200) {
            swal({
              icon: "success",
              title: "Buyurtma o'chirildi !",
              timer: 800,
            });
          }
          this.buyurtmalar = res.data;
        })
        .catch((err) => {
          this.isloading = false;
          this.errorr = err.message;
        })
        .finally((this.isloading = false));
    },
    postOrder(mahsulot, order) {
      this.isloading = true;
      let product = {
        product_code: mahsulot.code,
        quantity: mahsulot.quantity,
        selling_price: mahsulot.selling_price,
        order_id: order.id,
      };
      instance
        .put("update_this_trade", product)
        .then((res) => {
          console.log(res.data);
          if (res.data[0] == "So'rovda xatolik") {
            swal({
              icon: "warning",
              title: "Mahsulot qoldig'ida xatolik",
              timer: 1000,
            }).then(() => {
              mahsulot.quantity = res.data[1];
              let product = {
                product_code: mahsulot.code,
                quantity: mahsulot.quantity,
                selling_price: mahsulot.selling_price,
                order_id: order.id,
              };
              instance.put("update_this_trade", product).then((res) => {
                console.log(res.data);
              });
            });
          }
        })
        .catch((err) => {
          this.isloading = false;
          this.errorr = err.message;
        })
        .finally((this.isloading = false));
    },
    deleteTrade(code) {
      this.isloading = true;
      console.log(code, this.orderId);
      instance
        .delete("remove_this_trade/" + code + "/" + this.orderId)
        .then((res) => {
          console.log(res.data);
          if (res.status == 200) {
            swal({
              icon: "success",
              timer: 1000,
            }).then(() => {
              this.getBuyurtma();
            });
          }
        })
        .catch((err) => {
          this.isloading = false;
          this.errorr = err.message;
        })
        .finally((this.isloading = false));
    },
    count1() {
      this.plastikSavdo.price = this.balance - this.naxtSavdo.price;
    },
    count2() {
      this.naxtSavdo.price = this.balance - this.plastikSavdo.price;
    },
    nasiya1() {
      this.nasiyaSumma =
        this.balance - this.plastikSavdo.price - this.naxtSavdo.price;
    },
    nasiya2() {
      this.nasiyaSumma =
        this.balance - this.naxtSavdo.price - this.plastikSavdo.price;
    },
    payToCass(naxt, plastik) {
      this.isloading = true;
      // let date = new Date();
      let new_loan = {
        return_date: this.new_loan,
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
          new_incomes.push(plastik);
        } else if (plastik.price == 0 || plastik.price == null) {
          new_incomes.push(naxt);
        } else {
          new_incomes.push(naxt, plastik);
        }
        instance
          .post("order_confirmation/" + this.orderId + "/unknown", {
            new_incomes,
            new_loan,
          })
          .then((res) => {
            console.log(res.data);
            if (res.status == 200) {
              swal({
                icon: "success",
                title: "Savdo tugatildi",
                timer: 1000,
              }).then(window.location.reload());
            }
          })
          .catch((err) => {
            this.isloading = false;
            this.errorr = err.message;
          })
          .finally((this.isloading = false));
      } else {
        let new_incomes = [];
        if (naxt.price == 0 || naxt.price == null) {
          new_incomes = [];
          new_incomes.push(plastik);
        } else if (plastik.price == 0 || plastik.price == null) {
          new_incomes = [];
          new_incomes.push(naxt);
        } else {
          new_incomes = [];
          new_incomes.push(naxt, plastik);
        }
        instance
          .post("order_confirmation/" + this.orderId + "/" + this.client_id, {
            new_incomes,
            new_loan,
          })
          .then((res) => {
            console.log(res.data);
            if (res.status == 200) {
              swal({
                icon: "success",
                title: "Savdo tugatildi",
                timer: 1500,
              }).then(window.location.reload());
            }
          })
          .catch((err) => {
            this.isloading = false;
            this.errorr = err.message;
          })
          .finally((this.isloading = false));
      }
    },
    mijozQoshish() {
      instance
        .post("customer_create", this.yangiMijoz)
        .then((response) => {
          swal({
            icon: "success",
            timer: 1000,
          }).then(() => {
            this.getMijozlar();
          });
        })
        .catch((err) => {
          this.errorr = err.message;
          this.isloading = false;
        });
    },
    addProduct() {
      let code = document.querySelector("#barcode").value;
      instance.get("this_product/empty/" + code).then((response) => {
        console.log(response.data);
        if (response.data) {
          this.product = response.data[0];
        }
      });
    },
    toTrade(product) {
      this.isloading = true;
      let quantity = document.querySelector("#quantity").value;
      let data = {
        product_code: product.product_code,
        quantity: quantity,
      };
      instance.post("to_trade/" + this.orderId, data).then((response) => {
        if (response.status == 200) {
          console.log(response.data);
          swal("", "", "success", { timer: 1000 }).then(() => {
            this.getBuyurtma();
            document.querySelector("#close_modal").click();
            (document.querySelector("#barcode").value = null),
              (this.product = null),
              (this.isloading = false);
          });
        }
      });
    },
    countPrice(mahsulot) {
      if (mahsulot.selling_price < mahsulot.final_price) {
        this.alert = "price";
      } else {
        this.alert = String;
      }
    },
    tooltip(id) {
      let input = document.querySelector("#currency" + id);
      let sum = Intl.NumberFormat().format(Number(input.value));
      let tooltip = document.querySelector(
        "span[class='tooltiptext " + id + "']"
      );
      tooltip.style = `
        border: 1px solid gray;
        border-radius: 10px;
        background: var(--dark);
        color: white;
        padding: 5px 10px 5px 10px;
        top: 100px;
        
        position: absolute;
        z-index: 1;
  `;
      tooltip.innerHTML = `${sum}`;
      // if (sum == 0) {
      //   tooltip.style = "display: none";
      // }
      console.log(tooltip)
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
    console.clear();
    this.getBuyurtma();
    this.getMijozlar();
  },
};
</script>

<style scoped>
.alert-warning {
  position: absolute;
  width: 95%;
  margin: auto;
  z-index: 1;
  bottom: 85%;
  left: 10px;
  right: 10px;

  border: 1px solid gold;
  color: black;
}
</style>