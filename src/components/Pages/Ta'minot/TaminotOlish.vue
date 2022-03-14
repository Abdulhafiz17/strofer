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
      <span class="fa fa-arrow-left"></span> Orqaga
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
                type="number"
                class="form-control"
                placeholder="code"
                v-model="barcode"
                required
              />
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
                  <label> Kirim narx </label>
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
                        {{ kurs_id.price_kurs.currency }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row m-2">
                <div class="col-sm">
                  <label> Sotuv narx </label>
                  <div class="input-group">
                    <input
                      type="number"
                      class="form-control"
                      v-model="postMahsulot.product.selling_price"
                      min="0"
                    />
                    <select
                      class="custom-select"
                      v-model="postMahsulot.product.currency_id_for_sell"
                    >
                      <option
                        v-for="kurs in kurslar"
                        :key="kurs"
                        :value="kurs.id"
                      >
                        {{ kurs.currency }}
                      </option>
                      <option
                        v-for="kurs in kurslar"
                        :key="kurs.id"
                        :value="kurs.id"
                      >
                        {{ kurs.currency }}
                      </option>
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
                      min="0"
                    />
                    <select
                      class="custom-select"
                      v-model="postMahsulot.product.currency_id_for_sell"
                    >
                      <option
                        v-for="kurs in kurslar"
                        :key="kurs"
                        :value="kurs.id"
                      >
                        {{ kurs.currency }}
                      </option>
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
                <div class="input-group">
                  <input
                    type="number"
                    class="form-control"
                    placeholder="Narxi"
                    v-model="postMahsulot.new_supply.price"
                    required
                  />
                  <select
                    class="custom-select"
                    v-model="postMahsulot.new_supply.currency_id"
                  >
                    <option
                      v-for="kurs in kurslar"
                      :key="kurs"
                      :value="kurs.id"
                    >
                      {{ kurs.currency }}
                    </option>
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
              <div class="col-sm">
                <label> Brend </label>
                <input
                  type="text"
                  class="form-control"
                  v-model="postMahsulot.product.brand"
                  required
                />
              </div>
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
            </div>
            <div class="row m-2">
              <div class="col-sm">
                <label> Sotuv narx </label>
                <div class="input-group">
                  <input
                    type="number"
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
                    <option
                      v-for="kurs in kurslar"
                      :key="kurs.id"
                      :value="kurs.id"
                    >
                      {{ kurs.currency }}
                    </option>
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
                    min="0"
                    required
                  />
                  <select
                    class="custom-select"
                    v-model="postMahsulot.product.currency_id_for_sell"
                    required
                  >
                    <option
                      v-for="kurs in kurslar"
                      :key="kurs.id"
                      :value="kurs.id"
                    >
                      {{ kurs.currency }}
                    </option>
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
                    min="0"
                    required
                  />
                  <select
                    class="custom-select"
                    v-model="postMahsulot.product.measure"
                    required
                  >
                    <option value="dona">dona</option>
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
                <div class="input-group">
                  <input
                    type="number"
                    class="form-control"
                    v-model="postMahsulot.new_supply.price"
                    required
                  />
                  <select
                    class="custom-select"
                    v-model="postMahsulot.new_supply.currency_id"
                  >
                    <option
                      v-for="kurs in kurslar"
                      :key="kurs"
                      :value="kurs.id"
                    >
                      {{ kurs.currency }}
                    </option>
                  </select>
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

  <div class="modal fade" id="modal1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h3>Ta'minotni tasdiqlash</h3>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-md">
              <h4><small> Ta'minot summasi: </small> 42 150 000 so'm</h4>
            </div>
          </div>
          <!-- <button
            class="btn btn-outline-success btn-block"
            data-toggle="collapse"
            data-target="#collapse1"
          >
            To'lo'v qilish
          </button> -->
          <div class="" id="">
            <div class="input-group mt-3">
              <input
                type="text"
                class="form-control"
                value=""
                placeholder="0"
              />
              <div class="input-group-append">
                <span class="input-group-text"> so'm </span>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-outline-primary">
            <span class="far fa-circle-check"></span> Tasdiqlash
          </button>
          <button class="btn btn-outline-danger" data-dismiss="modal">
            <span class="far fa-xmark-circle"></span> Bekor qilish
          </button>
        </div>
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
              <table class="table table-sm table-hover table-bordered">
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
                    <td>{{ taminot.mahsulot }}</td>
                    <td>{{ taminot.hajm }} {{taminot.olchov}} </td>
                    <td>{{ taminot.narx }} {{ taminot.kurs }}</td>
                    <td>{{ taminot.hajm * taminot.narx }}</td>
                    <td>
                      <button
                        class="btn btn-sm btn-outline-danger"
                        @click="deleteTaminot(taminot.id)"
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

  <Anime :isLoading="isLoading" />
</template>

<script type="text/javascript">
import swal from "sweetalert"
import { instance } from "../Api";
import { Anime } from "../../Anime/Anime.vue";
export default {
  components: { Anime },
  data() {
    return {
      isLoading: false,
      taminotchi: {},
      barcode: "",
      alert: "",
      postMahsulot: {
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
          quantity_note: null,
          measure: "",
        },
        new_supply: {
          quantity: null,
          price: null,
          currency_id: "",
          market_id: this.$route.params.id,
        },
      },
      kurslar: [],
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
    };
  },
  methods: {
    getData() {
      this.isLoading = true;
      instance.get("this_market/" + this.$route.params.id).then((res) => {
        this.taminotchi = res.data;
      });
      instance.get("all_currencies").then((res) => {
        this.kurslar = res.data;
      });
      instance
        .get("all_categories")
        .then((res) => {
          this.kategoriyalar = res.data;
        })
        .finally((this.isLoading = false));
    },
    postCode() {
      instance.get("this_product/empty/" + this.barcode).then((res) => {
        // console.log(res.status)
        if (res.data !== null) {
          this.openRow = true;
          this.postMahsulot.product = {
            category_id: res.data.category_id,
            name: res.data.name,
            brand: res.data.brand,
            price: res.data.price,
            currency_id: res.data.currency_id,
            selling_price: res.data.selling_price,
            final_price: res.data.final_price,
            currency_id_for_sell: res.data.currency_id_for_sell,
            quantity_note: res.data.quantity_note,
            measure: res.data.measure,
          };
          this.getMahsulot(this.postMahsulot.product);
          console.log(res.data);
        } else {
          this.postMahsulot.product = {};
          this.openRow = false;
          this.alert = "null";
        }
      });
    },
    getMahsulot(mahsulot) {
      instance.get("this_currency/" + mahsulot.currency_id).then((res) => {
        this.kurs_id.price_kurs = res.data;
      });
      instance
        .get("this_currency/" + mahsulot.currency_id_for_sell)
        .then((res) => {
          this.kurs_id.sellling_price_kurs = res.data;
        });
    },
    postTaminot() {
      this.postMahsulot.product.code = String(this.barcode);
      // this.postMahsulot.push(this.product, this.new_supply);
      instance.post("take_supply", this.postMahsulot).then((res) => {
        console.log(res.data);
        if (res.data == "Bunday mahsulot olinganlar royhatida mavjud") {
          swal({
            icon: "warning",
            title: "Bunday mahsulot ro'yxatga qo'shilgan",
            closeOnClickOutside: false
          })
        }
        if (res.status == 200) {
          this.openRow = null;
          this.barcode = "";
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
              quantity_note: null,
              measure: "",
            },
            new_supply: {
              quantity: null,
              price: null,
              currency_id: "",
              market_id: this.$route.params.id,
            },
          };
        }
      });
      console.log(this.postMahsulot);
    },
    getTaminot() {
      this.taminotlar = [];
      instance
        .get("all_supplies/" + this.$route.params.id + "/false")
        .then((res) => {
          console.log(res.data);
          res.data.forEach((element) => {
              instance
                .get("this_currency/" + element.currency_id)
                .then((response) => {
                  instance
                    .get("this_product/" + element.product_id + "/empty")
                    .then((res) => {
                      this.taminot = {
                        id: element.id,
                        mahsulot: res.data.name,
                        hajm: element.quantity,
                        olchov: res.data.measure,
                        narx: element.price,
                        kurs: response.data.currency,
                      }
                      this.taminotlar.push(this.taminot);
                    });
                });
          });
          console.log(this.taminotlar);
        });
    },
    deleteTaminot(id) {
      instance.delete("remove_this_supply/" + id).then(() => {
        this.getTaminot();
      });
    },
    confirmTaminot() {
      let button = document.createElement("button")
      button.class = "btn btn-outline-succcess"
      instance
        .put("confirmation_all_supplies/" + this.$route.params.id)
        .then((res) => {
          console.log(res.data);
          if (res.status == 200) {
            swal({
              icon: "success",
              title: "Ta'minot olindi",
              closeOnClickOutside: false
            }).then(() => {
              window.location.reload()
            })
            // setTimeout(() => {
            //   window.location.reload();
            // }, 3000);
          }
        });
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<style>
</style>