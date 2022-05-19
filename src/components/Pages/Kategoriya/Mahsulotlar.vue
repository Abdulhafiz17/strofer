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
              placeholder="Qidiruv"
              v-model="search"
            />
          </div>
          <div class="col-md-4"></div>
        </div>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-md">
            <div class="table-responsive table-bordered text-center mt-3">
              <table
                class="table table-sm table-hover"
              >
                <thead>
                  <tr>
                    <th scope="col">№</th>
                    <th scope="col">Shtrix kodi</th>
                    <th scope="col">Mahsulot</th>
                    <th scope="col">Narx</th>
                    <th scope="col">Sotuv narx</th>
                    <th scope="col">Miqdor</th>
                    <th scope="col">Minimal qoldiq</th>
                    <!-- <th scope="col">KPI</th> -->
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(mahsulotlar, idx) in filteredCards"
                    :key="mahsulotlar"
                  >
                    <th scope="row">{{ idx + 1 }}</th>
                    <td>{{ mahsulotlar.product_code }}</td>
                    <td>{{ mahsulotlar.name }} {{ mahsulotlar.brand }}</td>
                    <td>{{Intl.NumberFormat().format(mahsulotlar.price)}} so'm</td>
                    <td>
                      {{
                        Intl.NumberFormat().format(mahsulotlar.selling_price)
                      }}
                      so'm
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
                    <!-- <td>
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
                    </td> -->
                    <td>
                      <button
                        class="btn btn-primary btn-sm"
                        data-toggle="modal"
                        data-target="#code"
                        @click="code(mahsulotlar)"
                      >
                        <span class="fa fa-barcode" />
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

  <div class="modal fade" id="code">
    <div class="modal-dialog modal-sm">
      <div class="modal-content">
        <div class="modal-body">
          <center
            id="price"
            style="
              color: black !important;
              margin: 0 !important;
              padding: 0 !important;
              display: flex;
              justify-content: center;
              align-items: center;
            "
          >
            <span style="display: flex; width: 100%">
              <span style="display: block; width: 30px; align-items: center">
                <img src="../../../components/pictures/1.png" width="100" style="transform: rotate(-90deg); margin-left: -30px; margin-top: 40px"/>
              </span>
              <!-- <strong v-if="uzunlik &lt 15 || uzunlik == 15" style="font-size: 30px">{{ mahsulot.name }} {{ mahsulot.brand }} <br> {{Intl.NumberFormat().format(mahsulot.selling_price)}} so'm</strong>
              <strong v-if="uzunlik &lt 20 && (uzunlik &gt 15 || uzunlik == 15)" style="font-size: 21px">{{ mahsulot.name }} {{ mahsulot.brand }} <br> {{Intl.NumberFormat().format(mahsulot.selling_price)}} so'm</strong>
              <strong v-if="(uzunlik &gt 20 || uzunlik == 20) && uzunlik &lt 30" style="font-size: 17px">{{ mahsulot.name }} {{ mahsulot.brand }} <br> {{Intl.NumberFormat().format(mahsulot.selling_price)}} so'm</strong>
              <strong v-if="(uzunlik &gt 30 || uzunlik == 30) && uzunlik &lt 40" style="font-size: 15px">{{ mahsulot.name }} {{ mahsulot.brand }} <br> {{Intl.NumberFormat().format(mahsulot.selling_price)}} so'm</strong>
              <strong v-if="(uzunlik &gt 40 || uzunlik == 40) && uzunlik &lt 50" style="font-size: 14px">{{ mahsulot.name }} {{ mahsulot.brand }} <br> {{Intl.NumberFormat().format(mahsulot.selling_price)}} so'm</strong>
              <strong v-if="uzunlik &gt 50 || uzunlik == 50" style="font-size: 14px">{{ mahsulot.name }} {{ mahsulot.brand }} <br> {{Intl.NumberFormat().format(mahsulot.selling_price)}} so'm</strong> -->
              <span style="display: block; align-items: center; justify-content: center">
                <span>
                  <br><span style="font-size: 12px">{{ mahsulot.name }} {{mahsulot.brand}} <b>{{Intl.NumberFormat().format(mahsulot.selling_price)}}so'm</b></span>
                  <div class="row">
                    <img id="barcode" class="" />
                  </div>
                </span>
              </span>
            </span>
          </center>
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
      uzunlik: null,
      errorr: "",
    };
  },

  methods: {
    getData() {
      this.mahsulotlars = [];
      instance
        .get("all_products_for_trade_to_search")
        .then((response) => {
            console.log(response.data)
            this.mahsulotlars = response.data
            this.isloading = false
        })
        .catch((err) => {
          this.isloading = false;
          this.errorr = err.message;
        })
    },

    code(mahsulot) {
      this.uzunlik = mahsulot.name.toString().length + mahsulot.brand.toString().length + mahsulot.selling_price.toString().length
      console.log(this.uzunlik)
      this.mahsulot = mahsulot;
      JsBarcode("#barcode", mahsulot.product_code, {
        height: 10,
        width: 1.5,
        displayValue: true,
      });
    },

    print() {
      let barcode = document.querySelector("#price").outerHTML;
      setTimeout(() => {
        let windowPrint = window.open(
          "_blank",
          "Barcode",
          "width=auto",
        );
        windowPrint.document.write(`${barcode}`);
        setTimeout(() => {
          windowPrint.print();
          windowPrint.window.close()
          this.isloading = false
        }, 100);
      }, 100);
    },
  },
  mounted() {
    console.clear();
    setTimeout(() => {
      this.getData();
    }, 100);
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
</style>