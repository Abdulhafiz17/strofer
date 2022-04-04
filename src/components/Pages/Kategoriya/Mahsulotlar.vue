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
            <div class="table-responsive table-bordered text-center mt-3">
              <table
                class="table table-sm table-hover"
              >
                <thead>
                  <tr>
                    <th scope="col">№</th>
                    <th scope="col">Shtrix kodi</th>
                    <th scope="col">Mahsulot</th>
                    <th scope="col">Brend</th>
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
                    <td>{{ mahsulotlar.name }}</td>
                    <td>{{ mahsulotlar.brand }}</td>
                    <td>
                      {{
                        Intl.NumberFormat({ style: "currency" }).format(
                          mahsulotlar.selling_price
                        )
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
      this.mahsulot = mahsulot;
      JsBarcode("#barcode", mahsulot.product_code, {
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