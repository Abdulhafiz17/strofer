<template>
  <div class="container-fluid">
    <router-link class="btn btn-sm mb-2 btn-outline-success" to="/kassa">
      <span class="fa fa-arrow-left" /> Ortga
    </router-link>
    <!-- <button class="btn" @click="printCheck()">Print</button> -->
    <button
      class="btn btn-sm btn-success float-right"
      data-toggle="modal"
      href="#confirm"
    >
      <span class="fa fa-circle-check" /> Tasdiqlash
    </button>
    <div class="card shadow">
      <div class="card-header">
        <div class="row text-center">
          <div class="col-md-4">
            <div class="row">
              <div class="col-3">
                <h4> № {{buyurtma.number}} </h4>
              </div>
              <div class="col">
                <h4> <span class="fa fa-user"/> <span>{{buyurtma.owner}}</span> </h4>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="input-group">
              <input
                class="form-control"
                id="barcode"
                list="products"
                placeholder="Code"
                @change="addProduct(barcode)"
                v-model="barcode"
                autocomplete="false"
              />
              <datalist id="products">
                <option
                  v-for="mahsulot in mahsulotlar"
                  :key="mahsulot"
                  :value="mahsulot.product_code"
                >
                  {{ mahsulot.name }} {{ mahsulot.brand }}
                </option>
              </datalist>
              <div class="input-group-append">
                <div class="input-group-text" @dblclick="final_price = !final_price">
                  
                  <span class="fa fa-barcode" />
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <h4>{{ Intl.NumberFormat().format(buyurtma.order_price) }} so'm</h4>
          </div>
        </div>
      </div>
      <div class="card-body">
        <div class="my-custom-scrollbar table-wrapper-scroll-y">
          <table
            class="table table-sm table-hover table-borderless text-center"
          >
            <thead>
              <tr>
                <th>№</th>
                <th>Mahsulot</th>
                <th>Qoldiq</th>
                <th>Hajm</th>
                <th>Narx</th>
                <th v-if="final_price">Narx</th>
                <th>Summa</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(mahsulot, n) in buyurtma.data" :key="mahsulot">
                <td>{{ n + 1 }}</td>
                <td>{{ mahsulot.name }} {{ mahsulot.brand }}</td>
                <td>
                  <span
                    >{{ mahsulot.quantity + mahsulot.qoldiq }}
                    {{ mahsulot.measure }}</span
                  >
                </td>
                <td @dblclick="showInput()">
                  <span id="default"
                    >{{ mahsulot.quantity }} {{ mahsulot.measure }}</span
                  >
                  <form
                    @submit.prevent="updateThisTrade(mahsulot, n)"
                    id="input"
                    style="display: none"
                  >
                    <div class="input-group input-group-sm w-75 mx-auto">
                      <input
                        type="number"
                        step="any"
                        min="0"
                        class="form-control text-center"
                        placeholder="Hajm"
                        required
                        v-model="mahsulot.quantity"
                      />
                      <div class="input-group-append">
                        <div class="input-group-text">
                          {{ mahsulot.measure }}
                        </div>
                      </div>
                    </div>
                  </form>
                </td>
                <td @dblclick="showInput()">
                  <span id="default">
                    {{ Intl.NumberFormat().format(mahsulot.selling_price) }}
                    so'm
                  </span>
                  <form
                    @submit.prevent="updateThisTrade(mahsulot)"
                    id="input"
                    style="display: none"
                  >
                    <span :class="'tooltipText ' + n"></span>
                    <div class="input-group input-group-sm w-75 mx-auto">
                      <input
                        type="number"
                        step="any"
                        min="0"
                        :id="'price' + n"
                        class="form-control text-center"
                        placeholder="Narx"
                        required
                        v-model="mahsulot.selling_price"
                        @keyup="tooltip(n)"
                        @click="tooltip(n)"
                        @focusout="hide(n)"
                      />
                      <div class="input-group-append">
                        <div class="input-group-text">so'm</div>
                      </div>
                    </div>
                  </form>
                </td>
                <td v-if="final_price">
                  {{ Intl.NumberFormat().format(mahsulot.price) }}
                </td>
                <td>
                  {{
                    Intl.NumberFormat().format(
                      mahsulot.quantity * mahsulot.selling_price
                    )
                  }}
                  so'm
                </td>
                <td>
                  <button
                    class="btn btn-sm btn-outline-danger"
                    @click="deleteTrade(mahsulot.code)"
                  >
                    <span class="far fa-circle-xmark" />
                  </button>
                </td>
              </tr>
              <tr v-if="adding">
                <td></td>
                <td>{{ product.name }} {{ product.brand }}</td>
                <td>
                  <span>{{ product.quantity }} {{ product.measure }}</span>
                </td>
                <td>
                  <div class="input-group input-group-sm w-75 mx-auto">
                    <input
                      type="number"
                      id="hajm"
                      step="any"
                      placeholder="Hajm"
                      class="form-control text-center"
                      v-model="product.hajm"
                      required
                      min="0"
                      @change="toTrade(product)"
                    />
                    <div class="input-group-append">
                      <div class="input-group-text">
                        {{ product.measure }}
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  {{ Intl.NumberFormat().format(product.selling_price) }} so'm
                </td>
                <td v-if="final_price">
                  {{ Intl.NumberFormat().format(product.final_price) }} so'm
                </td>
                <td>
                  {{
                    Intl.NumberFormat().format(
                      product.quantity * product.selling_price
                    )
                  }}
                  so'm
                </td>
                <td>
                  <button
                    class="btn btn-sm btn-outline-danger"
                    @click="(adding = false), (product = {})"
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

  <div class="modal fade" id="confirm">
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
                {{ Intl.NumberFormat().format(buyurtma.order_price) }}
                so'm
                <div class="input-group input-group-sm w-75 my-2">
                  <input
                    class="form-control"
                    type="number"
                    step="any"
                    min="0"
                    :max="buyurtma.order_price"
                    v-model="orderdiscount.discount"
                    placeholder="Chegirma summa"
                    @change="discount()"
                  />
                  <div class="input-group-append">
                    <div class="input-group-text">so'm</div>
                  </div>
                </div>
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
                      href="#exampleModall1803"
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
                        :max="buyurtma.order_price - plastikSavdo.price"
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
                        step="any"
                        class="form-control"
                        v-model="plastikSavdo.price"
                        min="0"
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
            <input type="hidden" data-dismiss="modal" id="close_modal1" />
          </div>
        </form>
      </div>
    </div>
  </div>

  <div
    class="modal fade"
    id="exampleModall1803"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModallLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title" id="exampleModallLabel">Mijoz qo'shish</h4>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-md-12">
              <div class="form-group field-client-ism required">
                <label>Ism</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Mijoz ismi"
                  required
                  v-model="mijozpost.name"
                />

                <label class="mt-3">Manzil</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Manzil"
                  required
                  v-model="mijozpost.address"
                />

                <label class="mt-3">Telefon</label>
                <div class="input-group">
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
                    v-model="mijozpost.phone"
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                  />
                </div>

                <!-- <label class="mt-3">Toifa</label>
                <div class="input-group">
                  <select class="custom-select" v-model="mijozpost.comment">
                    <option value="Umumiy">Umumiy</option>
                    <option value="Narx">Narx</option>
                    <option value="Sifat">Sifat</option>
                    <option value="Premium">Premium</option>
                  </select>
                </div> -->
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
            @click="mijozQoshish"
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

  <span id="receipent" style="display: none" v-if="receipentValue">
    <center>
      <img
        src="./1.png"
        width="120"
        style="margin: 20px"
      />
      <ul style="list-decoration: none; margin: 0; padding: 0">
        <li style="display: flex; justify-content: space-between">
          <strong>Asosiy tel: </strong>
          <span>+998732400401</span>
        </li>
        <li style="display: flex; justify-content: space-between">
          <strong>Filial tel: </strong>
          <span>+998{{ buyurtma.branch_tel }}</span>
        </li>
        <li style="display: flex; justify-content: space-between">
          <strong>Sana: </strong>
          <span>{{ buyurtma.time.replace("T", " ") }}</span>
        </li>
        <li style="display: flex; justify-content: space-between">
          <strong> Mijoz: </strong> <span> {{ buyurtma.client }} </span>
        </li>
        <li style="display: flex; justify-content: space-between">
          <strong> Sotuvchi: </strong> <span> {{ buyurtma.owner }} </span>
        </li>
      </ul>
      <hr />
      <table
        border="1px"
        style="border-collapse: collapse; font-size: 13px; width: 100%"
      >
        <thead>
          <tr>
            <th>Mahsulot</th>
            <th>Hajm</th>
            <th>Narx</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="mahsulot in buyurtma.data" :key="mahsulot">
            <th>{{ mahsulot.name }} {{ mahsulot.brand }}</th>
            <td>{{ mahsulot.quantity }} {{ mahsulot.measure }}</td>
            <td>
              {{ Intl.NumberFormat().format(mahsulot.selling_price) }} so'm
            </td>
          </tr>
        </tbody>
      </table>
      <br />
      <ul style="list-decoration: none; margin: 0; padding: 0">
        <li style="display: flex; justify-content: space-between">
          <strong>To'lov summa: </strong>
          <strong>
            {{ Intl.NumberFormat().format(buyurtma.order_price) }} so'm
          </strong>
        </li>
        <hr />
        <li
          style="display: flex; justify-content: space-between"
          v-if="buyurtma.discount !== 0"
        >
          <strong>Chegirma: </strong>
          <strong>{{ Intl.NumberFormat().format(buyurtma.discount) }} so'm</strong>
        </li>
        <li
          style="display: flex; justify-content: space-between"
          v-if="buyurtma.naxt"
        >
          <strong>Naxt: </strong>
          <strong>{{ Intl.NumberFormat().format(buyurtma.naxt) }} so'm</strong>
        </li>
        <li
          style="display: flex; justify-content: space-between"
          v-if="buyurtma.plastik"
        >
          <strong>Plastik: </strong>
          <strong
            >{{ Intl.NumberFormat().format(buyurtma.plastik) }} so'm</strong
          >
        </li>
        <li
          style="display: flex; justify-content: space-between"
          v-if="buyurtma.loan_price !== 0"
        >
          <strong>Nasiya: </strong>
          <strong>
            {{ Intl.NumberFormat().format(-buyurtma.loan_price) }} so'm
          </strong>
        </li>
        <li
          style="display: flex; justify-content: space-between"
          v-if="buyurtma.loan_price !== 0"
        >
          <strong>Nasiya qaytarish sanasi: </strong>
          <strong>
            {{ buyurtma.loan_data }}
          </strong>
        </li>
      </ul>
      <!-- <img id="barcodeReceipent" class="" /> -->
      <div id="demo" style="padding: 20px" />
    </center>
  </span>

  <isloading :isloading="isloading" :message="error" />
</template>

<script type="text/javascript">
import swal from "sweetalert";
import isloading from "../../Anime/Anime.vue";
import { instance } from "../Api";

export default {
  components: { isloading },
  data() {
    return {
      isloading: true,
      error: "",
      buyurtma: {},
      mahsulotlar: [],
      barcode: "",
      product: {},
      final_price: false,
      adding: false,
      receipentValue: false,
      client: false,
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
      mijozlar: [],
      client_id: "",
      mijozpost: {
        name: "",
        phone: null,
        address: "",
        comment: "Umumiy",
      },
      orderdiscount: {
        discount: null,
      },
    };
  },
  watch: {
    receipentValue() {
    }
  },
  mounted() {
    console.clear();
    this.getData();
    document.querySelector("#barcode").focus()
  },
  methods: {
    getData() {
      instance
        .get("this_order/" + this.$route.params.id)
        .then((response) => {
          this.buyurtma = response.data;
          console.log(response.data)
          instance
            .get("all_products_for_trade_to_search")
            .then((response) => {
              this.mahsulotlar = response.data;
              instance
                .get("all_customers")
                .then((res) => {
                  this.mijozlar = res.data;
                  this.isloading = false;
                })
                .catch((err) => {
                  this.isloading = false;
                  this.errorr = err.message;
                });
            })
            .catch((err) => {
              this.isloading = false;
              this.error = err.message;
            });
        })
        .catch((err) => {
          this.isloading = false;
          this.error = err.message;
        });
    },
    addProduct(barcode) {
      instance
        .get("this_product/empty/" + barcode)
        .then((response) => {
          if (response.data.length > 0) {
            this.product = response.data[0];
            this.product.hajm = null;
            this.adding = true;
            this.barcode = "";
            setTimeout(() => {
              document.querySelector("#hajm").focus();
            }, 100);
          } else {
            swal({
              icon: "warning",
              title: "Bunday mahsulot mavjud emas !",
              timer: 2000,
            }).then(() => {
              document.querySelector("#barcode").value = null;
              document.querySelector("#barcode").focus();
            });
          }
        })
        .catch((err) => {
          this.isloading = false;
          this.error = err.message;
        });
    },
    toTrade(product) {
      this.isloading = true;
      let data = {
        product_code: product.product_code,
        quantity: product.hajm,
      };
      instance
        .post("to_trade/" + this.$route.params.id, data)
        .then((response) => {
          console.log(response.data);
          if (response.status == 200) {
            if (response.data == "So'rovda xatolik_kata") {
              swal({
                icon: "warning",
                title: "Hajmda xatolik",
                timer: 1000,
              }).then(() => {
                this.isloading = false;
                document.querySelector("#hajm").focus();
              });
            } else {
              swal("", "", "success", { timer: 700 }).then(() => {
                this.buyurtma = response.data;
                this.adding = false;
                this.product = {};
                this.isloading = false;
              });
            }
          }
        })
        .catch((err) => {
          this.isloading = false;
          this.error = err.message;
        });
    },
    deleteTrade(code) {
      this.isloading = true;
      instance
        .delete("remove_this_trade/" + code + "/" + this.$route.params.id)
        .then((response) => {
          if (response.status == 200) {
            swal({
              icon: "success",
              timer: 700,
            }).then(() => {
              this.buyurtma = response.data;
            });
          }
          this.isloading = false;
        })
        .catch((err) => {
          this.isloading = false;
          this.error = err.message;
        });
    },
    showInput() {
      let span = document.querySelectorAll("#default");
      let input = document.querySelectorAll("#input");
      span.forEach((span) => {
        span.style = "display: none";
      });
      input.forEach((input) => {
        input.style = "display: block";
      });
    },
    tooltip(id) {
      let input = document.querySelector("#price" + id);
      let sum = Intl.NumberFormat().format(input.value);
      let tooltip = document.querySelector(
        "span[class='tooltipText " + id + "']"
      );
      tooltip.style = `
        border: 1px solid gray;
        border-radius: 10px;
        background: var(--dark);  
        color: white;
        padding: 5px 10px 5px 10px;
        bottom: 50px;
        
        position: absolute;
        z-index: 1;
  `;
      tooltip.innerHTML = `
        ${sum}
      `;
      if (sum == 0) {
        tooltip.style = "display: none";
      }
    },
    hide(id) {
      let tooltip = document.querySelector(
        "span[class='tooltipText " + id + "']"
      );
      tooltip.style = "display: none";
    },
    updateThisTrade(mahsulot, n) {
      if (n !== undefined) {
        let span = document.querySelectorAll("#default");
        let input = document.querySelectorAll("#input");
        span.forEach((span) => {
          span.style = "display: block";
        });
        input.forEach((input) => {
          input.style = "display: none";
        });
        this.putThisTrade(mahsulot);
      } else {
        let span = document.querySelectorAll("#default");
        let input = document.querySelectorAll("#input");
        span.forEach((span) => {
          span.style = "display: block";
        });
        input.forEach((input) => {
          input.style = "display: none";
        });
        this.putThisTrade(mahsulot);
      }
    },
    putThisTrade(mahsulot) {
      this.isloading = true;
      let data = {
        product_code: mahsulot.code,
        quantity: mahsulot.quantity,
        selling_price: mahsulot.selling_price,
        order_id: this.$route.params.id,
      };
      instance
        .put("update_this_trade", data)
        .then((response) => {
          if (response.status == 200) {
            swal({
              icon: "success",
              timer: 700,
            }).then(() => {
              this.buyurtma = response.data;
              this.isloading = false;
            });
          }
        })
        .catch((err) => {
          this.isloading = false;
          this.error = err.message;
        });
    },
    printCheck() {
      this.receipentValue = true;
      setTimeout(() => {
        document.querySelector("#demo").innerHTML = "";
        var qrcode = new QRCode(document.querySelector("#demo"), {
          text: this.$route.params.id,
          width: 90, //default 128
          height: 90,
          colorDark: "#000000",
          colorLight: "#ffffff",
          correctLevel: QRCode.CorrectLevel.H,
        })
        setTimeout(() => {
          let receipent = document.querySelector("#receipent");
          let check = window.open("_blank", "Check", "width=auto");
          check.document.write(`${receipent.innerHTML}`);
          setTimeout(() => {
            check.print();
            check.close()
            this.isloading = false;
            this.$router.push({path: "/kassa"})
          }, 100);
        }, 100);
      }, 100);
    },
    count1() {
      this.plastikSavdo.price =
        this.buyurtma.order_price - this.naxtSavdo.price;
    },
    count2() {
      this.naxtSavdo.price =
        this.buyurtma.order_price - this.plastikSavdo.price;
    },
    nasiya1() {
      this.nasiyaSumma =
        this.buyurtma.order_price -
        this.plastikSavdo.price -
        this.naxtSavdo.price;
    },
    nasiya2() {
      this.nasiyaSumma =
        this.buyurtma.order_price -
        this.naxtSavdo.price -
        this.plastikSavdo.price;
    },
    discount() {
      this.buyurtma.order_price = this.buyurtma.order_price - this.orderdiscount.discount;
    },
    payToCass(naxt, plastik) {
      this.isloading = true;
      // let date = new Date();
      let new_loan = {
        return_date: this.new_loan,
      };
      let orderdiscount = this.orderdiscount.discount == null ? {discount: 0} : this.orderdiscount

      if (this.client == true && this.client_id == "") {
        swal({
          icon: "warning",
          title: "Mijoz tanlang !",
          timer: 1000,
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
          .post("order_confirmation/" + this.$route.params.id + "/unknown", {
            new_incomes,
            new_loan,
            orderdiscount
          })
          .then((res) => {
            if (res.status == 200) {
              swal({
                icon: "success",
                title: "Savdo tugatildi",
                timer: 700,
              }).then(
                document.querySelector("#close_modal1").click(),
                this.getData(),
                this.printCheck()
              );
            }
          })
          .catch((err) => {
            this.isloading = false;
            this.errorr = err.message;
          });
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
        console.log(new_incomes,new_loan,orderdiscount)
        instance
          .post(
            "order_confirmation/" +
              this.$route.params.id +
              "/" +
              this.client_id,
            {
              new_incomes,
              new_loan,
              orderdiscount
            }
          )
          .then((res) => {
            console.log(res.data);
            if (res.status == 200) {
              swal({
                icon: "success",
                title: "Savdo tugatildi",
                timer: 700,
              }).then(
                document.querySelector("#close_modal1").click(),
                this.getData(),
                this.printCheck()
              );
            }
          })
          .catch((err) => {
            this.isloading = false;
            this.errorr = err.message;
          });
      }
    },
    mijozQoshish() {
      this.isloading = true;
      instance
        .post("customer_create", this.mijozpost)
        .then((response) => {
          if (response.status == 200) {
            swal({ icon: "success", timer: 700 })
            .then(() => {
              this.getData();
              // window.location.reload();
              (this.mijozpost = {
                name: "",
                phone: null,
                address: "",
                comment: "",
              }),
                (this.isloading = false);
            });
          }
        })
        .catch((err) => {
          this.error = err.message;
          this.isloading = false;
        });
    },
  },
};
</script>

<style scoped>
</style>