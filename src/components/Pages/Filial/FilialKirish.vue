<template>
  <div class="container-fluid">
    <div class="card shadow">
      <div class="card-header text-center">
        <h3>{{ filial.name }}</h3>
        <div class="row text-center d-flex justify-content-center">
          <div class="col-md-3 mb-1">
            <div class="card shadow border-0">
              <a :href="'tel:+998' + filial.phone">
                <div class="card-body">
                  <span class="fa fa-phone" /> +998{{ filial.phone }}
                </div>
              </a>
            </div>
          </div>
          <div class="col-md-4 mb-1">
            <div class="card shadow border-0">
              <a data-toggle="modal"
                href="#filialMap" 
              >
                <div class="card-body">
                  <span class="fa fa-location-arrow" /> {{ filial.address }}
                </div>
              </a>
            </div>
          </div>
          <div class="col-md-3 mb-1">
            <div class="card shadow border-0">
              <router-link 
                :to="{
                  name: 'Hodimlar',
                  id: this.branch_id
                }"
                style="cursor: pointer"
              >
                <div class="card-body">
                  <span class="fa fa-user" /> {{ hodimlar }} ta hodim
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-sm-12">
            <div class="card shadow border-0">
              <div class="card-header text-center">
                <h4>Mahsulotlar</h4>
              </div>
              <div class="card-body">
                <span v-if="!secondTable">
                  <input class="form-control form-control-sm my-1 w-50 mx-auto" type="search" placeholder="Kategoriya boyicha qidiruv " v-model="search"/>
                  <span class="my-custom-scrollbar table-wrapper-scroll-y">
                    <table class="table table-sm table-hover table-borderless text-center">
                      <thead>
                        <tr>
                          <th>№</th>
                          <th>Nomi</th>
                          <th>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr 
                          v-for="(kategoriya, n) in filterK" 
                          :key="kategoriya"
                          @click="getProduct(kategoriya.id), secondTable = true"
                          style="cursor: pointer"
                        >
                          <td> {{ n + 1 }} </td>
                          <td> {{ kategoriya.name }} </td>
                          <td >
                            <span v-if="!kategoriya.category_id" class="fa fa-folder" />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </span>
                </span>
                <span v-if="secondTable">
                  <input class="form-control form-control-sm my-1 w-50 mx-auto" type="search" placeholder="Mahsulot boyicha qidiruv " v-model="search"/>
                  <span class="my-custom-scrollbar table-wrapper-scroll-y">
                    <table class="table table-sm table-hover table-borderless text-center">
                      <thead>
                        <tr>
                          <th>№</th>
                          <th>Mahsulot</th>
                          <th>Hajm</th>
                          <th>Minimal qoldiq</th>
                          <th>Kirim narx</th>
                          <th>Sotuv narx</th>
                          <th>Oxirgi narx</th>
                          <th @click="secondTable = false"  style="cursor: pointer">
                            <span class="fa fa-arrow-up"/>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr 
                          v-for="(mahsulot, n) in filterM" 
                          :key="mahsulot"
                          style="cursor: pointer"
                        >
                          <td> {{ n + 1 }} </td>
                          <td> {{ mahsulot.name }} {{ mahsulot.brand }} </td>
                          <td v-if="mahsulot.quantity_note &gt; mahsulot.quantity" class="bg-danger">
                            {{ mahsulot.quantity }} {{ mahsulot.measure }}
                          </td>
                          <td v-else-if="mahsulot.quantity_note == mahsulot.quantity" class="bg-warning">
                            {{ mahsulot.quantity }} {{ mahsulot.measure }}
                          </td>
                          <td v-else>
                            {{ mahsulot.quantity }} {{ mahsulot.measure }}
                          </td>
                          <td> {{ mahsulot.quantity_note }} {{ mahsulot.measure }} </td>
                          <td> {{ mahsulot.price }} {{ mahsulot.currency_id }} </td>
                          <td> {{ mahsulot.selling_price }} {{ mahsulot.currency_id_for_sell }} </td>
                          <td> {{ mahsulot.final_price }} {{ mahsulot.currency_id_for_final }} </td>
                          <td>
                            <span v-if="!mahsulot.category_id" class="fa fa-folder" />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="modal fade" id="filialMap">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h3>Filial joylashuvi</h3>
        </div>
        <div class="modal-body">
          <div id="map" style="width: 780px; height: 500px"></div>
        </div>
      </div>
    </div>
  </div>
  <isloading :isloading="isloading" :message="errorr" />
</template>

<script>
import { instance } from "../Api";
import isloading from "../../Anime/Anime.vue";
export default {
  components: { isloading },
  data() {
    return {
      role: localStorage.getItem("role"),
      branch_id: this.$route.params.id,
      filial: {},
      kategoriyalar: [],
      mahsulotlar: [],
      hodimlar: "",
      isloading: true,
      secondTable: false,
      errorr: "",
      search: "",
    };
  },
  methods: {
    getData() {
      instance
        .get("this_branch/" + this.branch_id)
        .then((res) => {
          this.filial = res.data;
          this.map(res.data.lat, res.data.long);
          this.isloading = false
        })
        .catch((err) => {
          this.isloading = false;
          this.errorr = err.message;
        })

      instance
        .get("branch_users/" + this.branch_id + "/false")
        .then((res) => {
          this.hodimlar = res.data.length;
          this.isloading = false
        })
        .catch((err) => {
          this.isloading = false;
          this.errorr = err.message;
        })

      instance.get("all_categories_branch/" + this.$route.params.id).then((response) => {
        this.kategoriyalar = response.data
        this.isloading = false
      })
        .catch((err) => {
          this.isloading = false;
          this.errorr = err.message;
        })
    },

    getProduct(id) {
      instance.get("all_products/" + id).then((response) => {
        this.mahsulotlar = response.data
      })
    },

    map(lat, long) {
      ymaps.ready(init);
      function init() {
        var myMap = new ymaps.Map("map", {
            center: [lat, long],
            zoom: 15,
          }),
          myGeoObject = new ymaps.GeoObject({
            geometry: {
              type: "Point",
              coordinates: [lat, long],
            },
          });
        myMap.geoObjects.add(myGeoObject);
      }
    },
    },


  computed: {
    filterK: function () {
      if (this.kategoriyalar) {
        return this.kategoriyalar.filter((kategoriya) => {
          return kategoriya.name.toLowerCase().match(this.search.toLowerCase());
        });
      }
    },
    filterM: function () {
      if (this.mahsulotlar) {
        return this.mahsulotlar.filter((kategoriya) => {
          return kategoriya.name.toLowerCase().match(this.search.toLowerCase());
        });
      }
    }
  },
  mounted() {
    console.clear()
    this.getData();
    if (this.role == "admin") {
      localStorage.setItem("branch_id", this.$route.params.id);
    }
  },
};
</script>

<style>
</style>