<template>
  <div class="container-fluid">
    <div class="row" v-if="alert === 'null'">
      <div class="col-md">
        <div class="alert alert-warning" role="alert">
          <strong
            >Bunday mahsulot bazada mavjud emas. Iltimos quyidagi formani
            to'ldiring !</strong
          >
          <button
            type="button"
            class="close btn"
            data-dismiss="alert"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      </div>
    </div>
    <router-link class="btn btn-outline-success btn-sm mb-2" to="/taminot">
      <span class="fa fa-arrow-left"></span> Ortga
    </router-link>
    <div class="card shadow">
      <div class="card-header">
        <div class="row">
          <div class="col-md">
            <h3>{{ taminotchi.name }}dan ta'minot olish</h3>
          </div>
          <!-- <div class="col-md">
            <router-link
              class="btn btn-outline-success float-right ml-3"
              to="/tolovTarixi"
            >
              <span class="far fa-clock"></span> To'lo'v tarixi
            </router-link>
            <router-link
              class="btn btn-outline-success float-right"
              to="/taminotTarixi"
            >
              <span class="far fa-clock"></span> Ta'minot tarixi
            </router-link>
          </div> -->
        </div>
      </div>
      <div class="card-body">
        <form @submit.prevent="postCode()">
          <div class="row my-3">
            <div class="col-sm-1">
              <button
                type="button"
                class="btn btn-block btn-outline-success"
                data-toggle="modal"
                data-target="#savat"
                @click="getTaminot()"
              >
                <span class="fa fa-shopping-cart" />
              </button>
            </div>
            <div class="col-sm-3 my-2 mx-auto">
              <input
                type="text"
                id="barcode"
                min="0"
                list="mahsulotlar"
                class="form-control"
                placeholder="code"
                v-model="barcode"
                required
              />
              <datalist id="mahsulotlar">
                <option
                  v-for="mahsulot in mahsulotlar"
                  :key="mahsulot"
                  :value="mahsulot.product_code"
                >
                  {{ mahsulot.name }} {{ mahsulot.brand }}
                </option>
              </datalist>
              <!-- <button type="submit" class="btn btn-outline-success">
                <span class="far fa-circle-check" />
              </button> -->
            </div>
            <div class="col-sm-1"></div>
          </div>
        </form>

        <form @submit.prevent="postTaminot()">
          <span v-if="openRow == true">
            <button
              type="button"
              class="btn btn-block"
              data-toggle="collapse"
              data-target="#collapseRow"
              @click="collapse = !collapse"
            >
              <span
                v-if="collapse == false"
                class="fa fa-arrow-down"
                data-toggle="collapse"
                data-target="#collapseRow"
              />
              <span
                v-if="collapse == true"
                class="fa fa-arrow-up"
                data-toggle="collapse"
                data-target="#collapseRow"
              />
            </button>
            <div class="collapse" id="collapseRow">
              <div class="row m-2 mb-2">
                <div class="col-sm">
                  <label> Nomi </label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="postMahsulot.product.name"
                    readonly
                  />
                </div>
                <div class="col-sm">
                  <label> Brend </label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="postMahsulot.product.brand"
                    readonly
                  />
                </div>
                <div class="col-sm">
                  <!-- <label> Kirim narx </label>
                  <div class="input-group">
                    <input
                      type="number"
                      class="form-control"
                      v-model="postMahsulot.product.price"
                      readonly
                      min="0"
                    />
                    <div class="input-group-append">
                      <span class="input-group-text">
                        {{ postMahsulot.product.currency }}
                      </span>
                    </div>
                  </div> -->
                  <label> Kategoriya </label>
                  <select
                    class="custom-select"
                    v-model="postMahsulot.product.category_id"
                    required
                  >
                    <option
                      v-for="kategoriya in kategoriyalar"
                      :key="kategoriya.id"
                      :value="kategoriya.id"
                    >
                      {{ kategoriya.name }}
                    </option>
                  </select>
                </div>
                <!-- <div class="col-sm">
                  <label> Yaroqlilik muddati </label>
                  <input
                    type="date"
                    class="form-control"
                    required
                    v-model="postMahsulot.product.validity_period"
                  />
                </div> -->
              </div>
              <div class="row m-2">
                <div class="col-sm">
                  <label> Sotuv narx </label>
                  <div class="input-group">
                    <input
                      type="number"
                      class="form-control"
                      v-model="postMahsulot.product.selling_price"
                      step="any"
                      min="0"
                    />
                    <select
                      class="custom-select"
                      v-model="postMahsulot.product.currency_id_for_sell"
                    >
                      <option value="dollar">dollar</option>
                      <option value="so'm">so'm</option>
                    </select>
                  </div>
                </div>
                <div class="col-sm">
                  <label> Oxirgi narx </label>
                  <div class="input-group">
                    <input
                      type="number"
                      class="form-control"
                      v-model="postMahsulot.product.final_price"
                      step="any"
                      min="0"
                    />
                    <select
                      class="custom-select"
                      v-model="postMahsulot.product.currency_id_for_final"
                    >
                      <option value="dollar">dollar</option>
                      <option value="so'm">so'm</option>
                    </select>
                  </div>
                </div>
                <div class="col-sm">
                  <label> Minimal qoldiq </label>
                  <div class="input-group">
                    <input
                      type="number"
                      class="form-control"
                      v-model="postMahsulot.product.quantity_note"
                      step="any"
                      min="0"
                      required
                    />
                    <div class="input-group-append">
                      <div class="input-group-text">
                        {{ postMahsulot.product.measure }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row m-3">
              <div class="col-sm">
                <label>Hajm</label>
                <div class="input-group">
                  <input
                    type="number"
                    step="any"
                    class="form-control"
                    v-model="postMahsulot.new_supply.quantity"
                    min="0"
                    required
                  />
                  <div class="input-group-append">
                    <div class="input-group-text">
                      {{ postMahsulot.product.measure }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-sm">
                <label>Kirim narx</label>
                <span id="kurs" style="display: none"></span>
                <div class="input-group">
                  <input
                    type="number"
                    id="income_price"
                    step="any"
                    min="0"
                    class="form-control"
                    placeholder="Narxi"
                    v-model="postMahsulot.new_supply.price"
                    required
                    @keyup="countCurrency"
                    @click="countCurrency"
                  />
                  <select
                    class="custom-select"
                    v-model="postMahsulot.new_supply.currency_id"
                    required
                  >
                    <option value="so'm" selected>so'm</option>
                    <option value="dollar">dollar</option>
                  </select>
                </div>
              </div>
            </div>
            <button class="btn btn-block btn-outline-success" type="submit">
              <span class="far fa-circle-check" />
            </button>
          </span>

          <span v-if="openRow == false">
            <div class="row m-2 mb-2">
              <div class="col-sm">
                <label> Nomi </label>
                <input
                  type="text"
                  class="form-control"
                  v-model="postMahsulot.product.name"
                  required
                />
              </div>
              <!-- <div class="col-sm">
                <label> Brend </label>
                <input
                  type="text"
                  class="form-control"
                  v-model="postMahsulot.product.brand"
                  required
                />
              </div> -->
              <div class="col-sm">
                <label> Kategoriya </label>
                <select
                  class="custom-select"
                  v-model="postMahsulot.product.category_id"
                  required
                >
                  <option
                    v-for="kategoriya in kategoriyalar"
                    :key="kategoriya.id"
                    :value="kategoriya.id"
                  >
                    {{ kategoriya.name }}
                  </option>
                </select>
              </div>
              <!-- <div class="col-sm">
                <label> Yaroqlilik muddati </label>
                <input
                  type="date"
                  class="form-control"
                  required
                  v-model="postMahsulot.product.validity_period"
                />
              </div> -->
            </div>
            <div class="row m-2">
              <div class="col-sm">
                <label> Sotuv narx </label>
                <div class="input-group">
                  <input
                    type="number"
                    step="any"
                    class="form-control"
                    v-model="postMahsulot.product.selling_price"
                    min="0"
                    required
                  />
                  <select
                    class="custom-select"
                    v-model="postMahsulot.product.currency_id_for_sell"
                    required
                  >
                    <option value="so'm" selected>so'm</option>
                    <option value="dollar">dollar</option>
                  </select>
                </div>
              </div>
              <div class="col-sm">
                <label> Oxirgi narx </label>
                <div class="input-group">
                  <input
                    type="number"
                    step="any"
                    class="form-control"
                    v-model="postMahsulot.product.final_price"
                    min="0"
                    required
                  />
                  <select
                    class="custom-select"
                    v-model="postMahsulot.product.currency_id_for_final"
                    required
                  >
                    <option value="so'm" selected>so'm</option>
                    <option value="dollar">dollar</option>
                  </select>
                </div>
              </div>
              <div class="col-sm">
                <label> Minimal qoldiq </label>
                <div class="input-group">
                  <input
                    type="number"
                    class="form-control"
                    step="any"
                    v-model="postMahsulot.product.quantity_note"
                    min="0"
                    required
                  />
                  <select
                    class="custom-select"
                    v-model="postMahsulot.product.measure"
                    required
                  >
                    <option value="dona" selected>dona</option>
                    <option value="kg">kg</option>
                    <option value="litr">litr</option>
                    <option value="metr">metr</option>
                  </select>
                </div>
              </div>
            </div>

            <div class="row m-3">
              <div class="col-sm">
                <label>Hajm</label>
                <div class="input-group">
                  <input
                    type="number"
                    step="any"
                    min="0"
                    class="form-control"
                    v-model="postMahsulot.new_supply.quantity"
                    required
                  />
                  <div class="input-group-append">
                    <div class="input-group-text">
                      {{ postMahsulot.product.measure }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-sm">
                <label>Kirim narx</label>
                <span id="kurs" style="display: none"></span>
                <div class="input-group">
                  <input
                    type="number"
                    id="income_price"
                    step="any"
                    min="0"
                    class="form-control w-50"
                    v-model="postMahsulot.new_supply.price"
                    @keyup="countCurrency()"
                    @click="countCurrency()"
                    required
                  />
                  <select
                    class="custom-select"
                    v-model="postMahsulot.new_supply.currency_id"
                    required
                  >
                    <option value="so'm" selected>so'm</option>
                    <option value="dollar">dollar</option>
                  </select>
                  <input
                    type="number"
                    placeholder="%"
                    step="any"
                    min="0"
                    class="form-control"
                    v-model="percent"
                    @keyup="count()"
                  />
                </div>
              </div>
            </div>
            <button class="btn btn-block btn-outline-success" type="submit">
              <span class="far fa-circle-check" />
            </button>
          </span>
        </form>
      </div>
    </div>
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
                  <th>Hajm</th>
                  <th>Narx</th>
                  <th>Summa</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(taminot, n) in taminotlar" :key="taminot.id">
                  <td>{{ n + 1 }}</td>
                  <td>{{ taminot.product }} {{ taminot.brand }}</td>
                  <td>{{ taminot.quantity }} {{ taminot.measure }}</td>
                  <td>
                    {{ Intl.NumberFormat().format(taminot.price) }}
                    {{ taminot.currency_id }}
                  </td>
                  <td>
                    {{
                      Intl.NumberFormat().format(
                        taminot.quantity * taminot.price
                      )
                    }}
                    {{ taminot.currency_id }}
                  </td>
                  <td>
                    <button
                      class="btn btn-sm btn-outline-danger"
                      @click="deleteTaminot(taminot)"
                    >
                      <span class="far fa-circle-xmark" />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="modal-footer">
          <button @click="confirmTaminot()" class="btn btn-outline-success">
            <span class="far fa-circle-check" /> Tasdiqlash
          </button>
          <button class="btn btn-outline-danger" data-dismiss="modal">
            <span class="far fa-circle-xmark" /> Bekor qilish
          </button>
        </div>
      </div>
    </div>
  </div>

  <isloading :isloading="isLoading" :message="errorr" />
</template>

<script type="text/javascript">
import swal from "sweetalert";
import { instance } from "../Api";
import isloading from "../../Anime/Anime.vue";
export default {
  components: { isloading },
  data() {
    return {
      isLoading: false,
      taminotchi: {},
      mahsulotlar: [],
      barcode: "",
      alert: "",
      postMahsulot: {
        product: {
          category_id: "",
          code: "",
          name: "",
          brand: "",
          price: null,
          currency_id: "so'm",
          selling_price: null,
          final_price: null,
          currency_id_for_sell: "so'm",
          currency_id_for_final: "so'm",
          quantity_note: null,
          measure: "dona",
          validity_period: "0",
        },
        new_supply: {
          quantity: null,
          price: null,
          currency_id: "so'm",
          market_id: this.$route.params.id,
        },
      },
      kategoriyalar: [],
      jami_summa: null,
      taminotlar: [],
      taminot: {
        id: "",
        mahsulot: "",
        hajm: null,
        olchov: "",
        narx: null,
        kurs: "",
      },
      kurs_id: {
        price_kurs: "",
        sellling_price_kurs: "",
      },
      openRow: Boolean,
      collapse: false,
      errorr: "",
      percent: null,
      currency: null,
    };
  },
  mounted() {
    console.clear();
    this.getData();
    this.getCurrency();
    document.querySelector("#barcode").focus()
  },
  methods: {
    countCurrency() {
      let span = document.querySelector("#kurs")
      let input = document.querySelector("#income_price")
      if (this.postMahsulot.new_supply.price) {
        span.style = `
        border: 1px solid gray;
        border-radius: 10px;
        background: var(--dark);
        color: white;
        padding: 5px 10px 5px 10px;
        bottom: 40px;
        
        position: absolute;
        z-index: 1;
        `
        if (this.postMahsulot.new_supply.currency_id == "so'm") {
          span.innerHTML = Intl.NumberFormat().format(this.postMahsulot.new_supply.price / this.currency.price) + " dollar"
        } else if (this.postMahsulot.new_supply.currency_id == "dollar") {
          span.innerHTML = Intl.NumberFormat().format(this.currency.price * this.postMahsulot.new_supply.price) + " so'm"
        }
      } else {
        span.style = "display: none"
      }

      input.addEventListener("change", () => {
        span.style = "display: none"
      })
    },
    getCurrency() {
      this.isLoading = true
      instance.get("this_currency/dollar")
      .then((response) => {
        this.currency = response.data
      })
      .catch((err) => {
        this.isLoading = false
        this.errorr = err.message
      })
    },
    getData() {
      this.isLoading = true;
      instance
        .get("this_market/" + this.$route.params.id)
        .then((res) => {
          this.taminotchi = res.data;
          instance
            .get("all_categories")
            .then((res) => {
              this.kategoriyalar = res.data;
              instance
                .get("all_products_for_trade_to_search")
                .then((response) => {
                  this.mahsulotlar = response.data;
                  this.isLoading = false;
                });
            })
            .catch((err) => {
              this.isloading = false;
              this.errorr = err.message;
            });
        })
        .catch((err) => {
          this.errorr = err.message;
          this.isLoading = false;
        });
    },
    postCode() {
      this.isloading = true;
      instance
        .get("this_product_codee/" + this.barcode)
        .then((res) => {
          if (res.data.length !== 0) {
            this.openRow = true;
            this.postMahsulot.product = {
              category_id: res.data[0].category_id,
              name: res.data[0].name,
              code: res.data[0].code,
              brand: res.data[0].brand,
              price: res.data[0].price,
              currency_id: res.data[0].currency_id,
              selling_price: res.data[0].selling_price,
              final_price: res.data[0].final_price,
              currency_id_for_sell: res.data[0].currency_id_for_sell,
              currency_id_for_final: res.data[0].currency_id_for_final,
              quantity_note: res.data[0].quantity_note,
              measure: res.data[0].measure,
            };
            this.getMahsulot(this.postMahsulot.product);
          } else {
            this.postMahsulot.product = {
              category_id: "",
              code: "",
              name: "",
              brand: "",
              price: null,
              currency_id: "so'm",
              selling_price: null,
              final_price: null,
              currency_id_for_sell: "so'm",
              currency_id_for_final: "so'm",
              quantity_note: null,
              measure: "dona",
              validity_period: "0",
            };
            this.openRow = false;
            this.alert = "null";
          }
        })
        .finally((this.isloading = false))
        .catch((err) => {
          this.isloading = false;
          this.errorr = err.message;
        });
    },
    getMahsulot(mahsulot) {
      this.isloading = true;
      instance
        .get("this_currency/" + mahsulot.currency_id)
        .then((res) => {
          this.kurs_id.price_kurs = res.data;
        })
        .finally((this.isloading = false))
        .catch((err) => {
          this.isloading = false;
          this.errorr = err.message;
        });
      this.isloading = true;
      instance
        .get("this_currency/" + mahsulot.currency_id_for_sell)
        .then((res) => {
          this.kurs_id.sellling_price_kurs = res.data;
        })
        .finally((this.isloading = false))
        .catch((err) => {
          this.isloading = false;
          this.errorr = err.message;
        });
    },
    postTaminot() {
      this.isloading = true;
      // console.log(this.postMahsulot);
      this.postMahsulot.product.code = String(this.barcode);
      this.postMahsulot.product.validity_period = "0";
      instance
        .post("take_supply", this.postMahsulot)
        .then((res) => {
          if (res.data == "Bunday mahsulot olinganlar royhatida mavjud") {
            swal({
              icon: "warning",
              title: "Bunday mahsulot ro'yxatga qo'shilgan !",
              closeOnClickOutside: false,
            });
            this.isLoading = false;
          } else if (res.data == "So'rovda xatolik") {
            swal({
              icon: "warning",
              title: res.data,
              timer: 1000,
            });
          } else if (res.status == 200) {
            swal({ icon: "success", timer: 1000 }).then(() => {
              this.openRow = null;
              this.barcode = "";
              this.alert = "";
              this.postMahsulot = {
                product: {
                  category_id: "",
                  code: "",
                  name: "",
                  brand: "",
                  price: null,
                  currency_id: "",
                  selling_price: null,
                  final_price: null,
                  currency_id_for_sell: "",
                  currency_id_for_final: "",
                  quantity_note: null,
                  measure: "",
                  validity_period: "0",
                },
                new_supply: {
                  quantity: null,
                  price: null,
                  currency_id: "",
                  market_id: this.$route.params.id,
                },
              };
              document.querySelector("#barcode").focus();
              this.isLoading = false;
            });
          }
        })
        .catch((err) => {
          this.isloading = false;
          this.errorr = err.message;
        });
    },
    getTaminot() {
      this.isLoading = true;
      this.taminotlar = [];
      instance
        .get("all_supplies/" + this.$route.params.id + "/false")
        .then((res) => {
          this.taminotlar = res.data;
        })
        .catch((err) => {
          this.errorr = err.message;
          this.isLoading = false;
        })
        .finally((this.isLoading = false));
    },
    deleteTaminot(taminot) {
      this.isLoading = true;
      instance
        .delete("remove_this_supply/" + taminot.id + "/" + "?vozvrat_quantity=" + taminot.quantity)
        .then((response) => {
          if (response.status == 200) {
            setTimeout(() => {
              swal({
                icon: "success",
                title: "O'chirildi !",
                timer: 700,
              }).then(() => {
                this.getTaminot();
                this.isLoading = false;
              });
            }, 300);
          }
        })
        .catch((err) => {
          this.isLoading = false;
          this.errorr = err.message;
        });
    },
    confirmTaminot() {
      this.isloading = true;
      let button = document.createElement("button");
      button.class = "btn btn-outline-succcess";
      if (this.taminotlar.length > 0) {
        instance
          .put("confirmation_all_supplies/" + this.$route.params.id)
          .then((res) => {
            if (res.status == 200) {
              swal({
                icon: "success",
                title: "Ta'minot olindi",
                closeOnClickOutside: false,
                timer: 1000,
              }).then(() => {
                window.location.reload();
              });
            }
            this.isloading = false;
          });
      } else {
        swal({
          icon: "warning",
          title: "Ta'minot bo'sh !",
          timer: 1000,
        });
      }
    },
    count() {
      this.postMahsulot.product.selling_price =
        (this.postMahsulot.new_supply.price / 100) * this.percent +
        this.postMahsulot.new_supply.price;
    },
  },
};
</script>

<style>
</style>