<template>
  <div class="container-fluid">
    <div class="card shadow">
      <div class="card-header">
        <div class="row">
          <div class="col-md-4"><h3>Mahsulotlar</h3></div>
          <div class="col-md-4">
            <input
              type="search"
              class="form-control"
              placeholder="qidiruv"
              v-model="search"
            />
          </div>
          <div class="col-md-4"></div>
        </div>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-md">
            <div class="table-responsive mt-3">
              <table
                class="table table-bordered table-sm table-hover text-center"
              >
                <thead>
                  <tr>
                    <th scope="col">№</th>
                    <th scope="col">Shtrix kodi</th>
                    <th scope="col">Mahsulot</th>
                    <th scope="col">Brend</th>
                    <th scope="col">Narx</th>
                    <th scope="col">Sotuv narx</th>
                    <th scope="col">Oxirgi narx</th>
                    <th scope="col">Miqdor</th>
                    <th scope="col">Minimal qoldiq</th>
                    <th scope="col">KPI</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(mahsulotlar, idx) in filteredCards"
                    :key="mahsulotlar"
                  >
                    <th scope="row">{{ idx + 1 }}</th>
                    <td>{{ mahsulotlar.code }}</td>
                    <td>{{ mahsulotlar.name }}</td>
                    <td>{{ mahsulotlar.brand }}</td>
                    <td>
                      {{
                        Intl.NumberFormat({ sytle: "currency" }).format(
                          mahsulotlar.price
                        )
                      }}
                      {{ mahsulotlar.currency_id }}
                    </td>
                    <td>
                      {{
                        Intl.NumberFormat({ style: "currency" }).format(
                          mahsulotlar.selling_price
                        )
                      }}
                      {{ mahsulotlar.currency_id_for_sell }}
                    </td>
                    <td>
                      {{
                        Intl.NumberFormat({ style: "currency" }).format(
                          mahsulotlar.final_price
                        )
                      }}
                      {{ mahsulotlar.currency_id_for_final }}
                    </td>
                    <td
                      v-if="mahsulotlar.quantity_note &gt; mahsulotlar.quantity"
                      class="bg-danger"
                    >
                      {{ mahsulotlar.quantity }} {{ mahsulotlar.measure }}
                    </td>
                    <td
                      v-else-if="
                        mahsulotlar.quantity_note == mahsulotlar.quantity
                      "
                      class="bg-warning"
                    >
                      {{ mahsulotlar.quantity }} {{ mahsulotlar.measure }}
                    </td>
                    <td v-else>
                      {{ mahsulotlar.quantity }} {{ mahsulotlar.measure }}
                    </td>
                    <td>
                      {{ mahsulotlar.quantity_note }} {{ mahsulotlar.measure }}
                    </td>
                    <td>
                      <span v-if="mahsulotlar.kpi">
                        <span v-if="mahsulotlar.kpi.percent == 0">
                          {{
                            Intl.NumberFormat({ style: "currency" }).format(
                              mahsulotlar.kpi.price
                            )
                          }}
                          {{ mahsulotlar.kpi.currency_id }} so'm
                        </span>
                        <span v-else> {{ mahsulotlar.kpi.percent }} % </span>
                      </span>
                    </td>
                    <td>
                      <button
                        class="btn btn-outline-success btn-sm"
                        data-toggle="modal"
                        data-target="#exampleModal"
                        @click="kpi.product_id = mahsulotlar.id"
                        v-if="!mahsulotlar.kpi"
                      >
                        <i class="fa fa-coins"></i>
                      </button>

                      <button
                        class="btn btn-primary btn-sm"
                        data-toggle="modal"
                        data-target="#code"
                        @click="code(mahsulotlar)"
                      >
                        <span class="fa fa-barcode" />
                      </button>

                      <button
                        class="btn btn-outline-warning btn-sm"
                        data-toggle="modal"
                        data-target=".bd-example-modal-lg"
                        @click="editk(mahsulotlar)"
                      >
                        <i class="fa fa-edit"></i>
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
  <!-- Modal tahrirlash-->
  <div
    class="modal fade bd-example-modal-lg"
    tabindex="-1"
    role="dialog"
    aria-labelledby="myLargeModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h3>Tahrirlash</h3>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm">
              <label class="mt-4">Mahsulot nomi:</label>
              <input
                placeholder="Mahsulot nomi"
                type="text"
                class="form-control"
                v-model="editT.name"
              />
            </div>
            <div class="col-sm">
              <label class="mt-4">Brand:</label>
              <input
                placeholder="Brand"
                type="text"
                class="form-control"
                v-model="editT.brand"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-sm">
              <label>Shtrix kod:</label>
              <input
                placeholder="Shtrix kod"
                type="text"
                class="form-control"
                v-model="editT.code"
              />
            </div>
            <div class="col-sm">
              <label>Minimal qoldiq:</label>
              <input
                placeholder="Minimal qoldiq"
                type="number"
                class="form-control"
                v-model="editT.quantity_note"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-sm">
              <label>Sotuv narx:</label>
              <div class="input-group">
                <input
                  placeholder="Sotuv narx"
                  type="number"
                  class="form-control"
                  v-model="editT.selling_price"
                />
                <div class="input-group-append">
                  <select class="form-control" v-model="editT.currency_id_for_sell">
                    <option value="so'm">so'm</option>
                    <option value="dollar">dollar</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="col-sm">
              <label>Oxirgi narx:</label>
              <div class="input-group">
                <input
                  placeholder="Oxirgi narx"
                  type="number"
                  class="form-control"
                  v-model="editT.final_price"
                />
                <div class="input-group-append">
                  <select class="form-control" v-model="editT.currency_id_for_final">
                    <option value="so'm">so'm</option>
                    <option value="dollar">dollar</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div class="row" v-if="editT.kpi">
            <div class="col-sm">
              <label> Kpi </label>
              <div class="input-group" v-if="editT.kpi.percent">
                <input
                  type="number"
                  class="form-control"
                  v-model="editT.kpi.percent"
                  required
                />
                <div class="input-group-append">
                  <div class="input-group-text">%</div>
                </div>
              </div>
              <div class="input-group" v-else>
                <input
                  type="number"
                  class="form-control"
                  v-model="editT.kpi.price"
                  required
                />
                <div class="input-group-append">
                  <div class="input-group-text">
                    {{ editT.kpi.currency_id }}
                  </div>
                </div>
              </div>
            </div>
            <!-- <div class="col-sm">
              <label> Yaroqlilik muddati </label>
              <input
                type="date"
                class="form-control"
                v-model="editT.validity_period"
                required
              />
            </div> -->
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-warning"
            @click="putData(editT.id)"
            data-dismiss="modal"
          >
            Tahrirlash
          </button>
          <button
            type="button"
            class="btn btn-outline-danger"
            data-dismiss="modal"
          >
            Bekor qilish
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- Modal end -->

  <!-- Modal post KPI -->
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            Mahsulotga kpi biriktirish
          </h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="input-group">
            <input type="text" class="form-control" v-model="kpi.price" />
            <div class="input-group-append">
              <select
                id="currency"
                class="custom-select"
                v-model="kpi.currency_id"
              >
                <option value="so'm">so'm</option>
                <option value="percent">%</option>
              </select>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-danger"
            data-dismiss="modal"
          >
            Bekor qilish
          </button>
          <button
            type="button"
            class="btn btn-outline-success"
            @click="kpipost"
            data-dismiss="modal"
          >
            Tasdiqlash
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- Modal KPI -->

  <!-- Modal put KPI -->
  <div
    class="modal fade"
    id="exampleModalkpi"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">KPI tahrirlash</h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <label>kpi</label>
          <input type="text" class="form-control" />
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            Close
          </button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>
  <!-- Modal put KPI end -->
  <div class="modal fade" id="code">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-body d-flex justify-content-center">
          <div id="price">
            <table
              class="table table-hover table-borderless"
              style="font-size: 25px"
            >
              <tbody>
                <tr>
                  <th>Mahsulot :</th>
                  <td>{{ mahsulot.name }}</td>
                </tr>
                <tr>
                  <th>Brend :</th>
                  <td>{{ mahsulot.brand }}</td>
                </tr>
                <tr>
                  <th>Sotuv narx :</th>
                  <td>
                    {{
                      Intl.NumberFormat({ style: "currency" }).format(
                        mahsulot.selling_price
                      )
                    }}
                    {{ mahsulot.currency_id }}
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="row">
              <img id="barcode" class="col-md-10 mx-auto" />
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-primary" @click="print()">
            <span class="fa fa-print" />
          </button>
        </div>
      </div>
    </div>
  </div>
  <isloading :isloading="isloading" :message="errorr" />
</template>

<script>
import { instance } from "../Api";
import isloading from "../../Anime/Anime.vue";
import JsBarcode from "jsbarcode";
import swal from 'sweetalert';

export default {
  components: { isloading },
  data() {
    return {
      mahsulotlars: [],
      kurs: [],
      kpi: {
        price: null,
        currency_id: "",
        percent: null,
        product_id: "",
      },
      editT: [],
      kpiget: [],
      isloading: true,
      backgroun: null,
      search: "",
      mahsulot: {},
      errorr: [],
    };
  },

  methods: {
    kpipost() {
      this.isloading = true;
      if (this.kpi.currency_id == "percent") {
        (this.kpi.percent = Number(this.kpi.price)),
          (this.kpi.price = 0),
          (this.kpi.currency_id = "string");
      } else {
        this.kpi.percent = 0;
      }
      console.log(this.kpi);
      instance
        .post("kpi_create", this.kpi)
        .then((response) => {
          console.log(response.data);
          this.getData();
          this.getkpi();
          if (response.status == 200) {
          }
        })
        .catch((err) => {
          this.isloading = false;
          this.errorr = err.message;
        })
        .finally((this.isloading = false))
    },

    getkpi() {
      this.isloading = true;
      instance
        .get("this_product_kpi/" + this.$route.params.id)
        .then((response) => {
          this.kpiget = response.data;
        })
        .catch((err) => {
          this.isloading = false;
          this.errorr = err.message;
        })
        .finally((this.isloading = false))
    },

    getData() {
      this.mahsulotlars = [];
      instance
        .get("all_products/" + this.$route.params.id)
        .then((response) => {
          if (response.data.length > 0) {
            response.data.forEach((element) => {
              instance.get("this_product_kpi/" + element.id).then((res) => {
                let mahsulot = {
                  id: element.id,
                  name: element.name,
                  code: element.code,
                  brand: element.brand,
                  price: element.price,
                  category_id: element.category_id,
                  selling_price: element.selling_price,
                  final_price: element.final_price,
                  currency_id: element.currency_id,
                  currency_id_for_sell: element.currency_id_for_sell,
                  currency_id_for_final: element.currency_id_for_final,
                  quantity: element.quantity,
                  quantity_note: element.quantity_note,
                  measure: element.measure,
                  kpi: res.data,
                };
                this.mahsulotlars.push(mahsulot);
                this.isloading = false;
              });
            });
          } else {
            this.isloading = false;
            swal({
              icon: "warning",
              title: "Ushbu kategoriya bo'sh !"
            })
          }
          console.log(this.mahsulotlars);
        })
        .catch((err) => {
          this.isloading = false;
          this.errorr = err.message;
        })
        .finally()
    },

    putData(id) {
      this.isloading = true;
      console.log(this.editT);
      instance
        .put("this_product_update/" + id, this.editT)
        .then((response) => {
          this.getData();
          console.log(response.data);
        })
        .catch((err) => {
          this.isloading = false;
          this.errorr = err.message;
        })
        .finally((this.isloading = false))

      console.log(this.editT.kpi);
      // if (this.editT.kpi.currency_id == "percent") {
      //   (this.editT.kpi.percent = Number(this.editT.kpi.price)),
      //     (this.editT.kpi.price = 0),
      //     (this.editT.kpi.currency_id = "string");
      // } else {
      //   this.editT.kpi.percent = 0;
      // }
      if (this.editT.kpi) {
        instance
          .put("this_kpi_update/" + this.editT.kpi.id, this.editT.kpi)
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => {
            this.isloading = false;
            this.errorr = err.message;
          })
      }
    },

    editk(mahsulot) {
      console.log(mahsulot);
      // this.editT = {
      //   id: mahsulot.id,
      //   name: mahsulot.name,
      //   code: mahsulot.code,
      //   brand: mahsulot.brand,
      //   category_id: mahsulot.category_id,
      //   selling_price: mahsulot.selling_price,
      //   final_price: mahsulot.final_price,
      //   currency_id: mahsulot.currency_id,
      //   currency_id_for_sell: mahsulot.currency_id_for_sell,
      //   quantity_note: mahsulot.quantity_note,
      //   measure: mahsulot.measure,
      //   kpi: mahsulot.kpi,
      //   validity_period: mahsulot.validity_period
      // };
      this.editT = mahsulot;
    },

    code(mahsulot) {
      this.mahsulot = mahsulot;
      JsBarcode("#barcode", mahsulot.code, {
        height: 50,
        width: 3,
        displayValue: true,
      });
    },
    print() {
      let barcode = document.querySelector("#price").outerHTML;
      let windowPrint = window.open(
        "_blank",
        "Barcode",
        "width=400; height=600"
      );
      windowPrint.document.write(
        `
            <head>
              <title> Barcode </title>
              <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
              integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
            </head>
        ` + barcode
      );
      windowPrint.print();
      document.addEventListener("#price", (e) => {
        ctrkay;
      });
    },
  },
  mounted() {
    console.clear();
    setTimeout(() => {
      this.getData();
    }, 500);
  },
  computed: {
    filteredCards: function () {
      return this.mahsulotlars.filter((mahsulot) => {
        return mahsulot.name.toLowerCase().match(this.search.toLowerCase());
      });
    },
  },
};
</script>

<style scoped>
#price {
  width: 350px;
  height: 550px;
  margin: 10px;
  padding: 10px;
  border: 1px solid var(--success);
  background: white;
}

#price * {
  color: black !important;
}

#barcode {
  width: 310px;
  height: 100px;
}
</style>