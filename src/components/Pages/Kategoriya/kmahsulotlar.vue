<template>
  <div class="container-fluid">
    <div class="card shadow">
      <div class="card-header">
        <div class="row">
          <div class="col-md-4"><h3>Mahsulotlar</h3></div>
          <div class="col-md-4">
            <input type="search" class="form-control" placeholder="qidiruv" />
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
                    <th scope="col">Brand</th>
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
                    v-for="(mahsulotlar, idx) in mahsulotlars"
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
                      so'm
                    </td>
                    <td>
                      {{
                        Intl.NumberFormat({ style: "currency" }).format(
                          mahsulotlar.selling_price
                        )
                      }}
                      so'm
                    </td>
                    <td>
                      {{
                        Intl.NumberFormat({ style: "currency" }).format(
                          mahsulotlar.final_price
                        )
                      }}
                      so'm
                    </td>
                    <td v-if="mahsulotlar.quantity_note &gt; mahsulotlar.quantity" class="bg-danger">{{ mahsulotlar.quantity }}</td>
                    <td v-else-if="mahsulotlar.quantity_note == mahsulotlar.quantity" class="bg-warning">{{ mahsulotlar.quantity }}</td>
                    <td v-else>{{ mahsulotlar.quantity }}</td>
                    <td>{{ mahsulotlar.quantity_note }}</td>
                    <td>
                      <span v-if="mahsulotlar.kpi">
                        <span v-if="mahsulotlar.kpi.percent == 0">
                          {{
                            Intl.NumberFormat({ style: "currency" }).format(
                              mahsulotlar.kpi.price
                            )
                          }}
                          {{ mahsulotlar.kpi.currency_id }}
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
                      >
                        <i class="fa fa-coins"></i>
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
              <input
                placeholder="Sotuv narx"
                type="number"
                class="form-control"
                v-model="editT.selling_price"
              />
            </div>
            <div class="col-sm">
              <label>Oxirgi narx:</label>
              <input
                placeholder="Oxirgi narx"
                type="number"
                class="form-control"
                v-model="editT.final_price"
              />
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
                <option value="dollar">dollar</option>
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
  <isloading :isloading="isloading" />
</template>

<script>
import { instance } from "../Api";
import isloading from "../../Anime/Anime.vue";
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
      isloading: false,
      backgroun: null,
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
        .finally((this.isloading = false));
    },

    getkpi() {
      this.isloading = true;
      instance
        .get("this_product_kpi/" + this.$route.params.id)
        .then((response) => {
          this.kpiget = response.data;
        })
        .finally((this.isloading = false));
    },

    getData() {
      this.isloading = true;
      this.mahsulotlars = [];
      instance
        .get("all_products/" + this.$route.params.id)
        .then((response) => {
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
                currency_id_for_sell: element.currency_id_for_sell,
                quantity: element.quantity,
                quantity_note: element.quantity_note,
                measure: element.measure,
                kpi: res.data,
              };
              this.mahsulotlars.push(mahsulot);
              this.isloading = false
            });
          });
          console.log(this.mahsulotlars);
        })
        .finally();
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
        .finally((this.isloading = false));
    },

    editk(mahsulot) {
      console.log(mahsulot);
      this.editT = {
        id: mahsulot.id,
        name: mahsulot.name,
        code: mahsulot.code,
        brand: mahsulot.brand,
        category_id: mahsulot.category_id,
        selling_price: mahsulot.selling_price,
        final_price: mahsulot.final_price,
        currency_id_for_sell: mahsulot.currency_id_for_sell,
        quantity_note: mahsulot.quantity_note,
        measure: mahsulot.measure,
        kpi: mahsulot.kpi,
      };
    },
  },
  mounted() {
    this.getData();
  },
};
</script>