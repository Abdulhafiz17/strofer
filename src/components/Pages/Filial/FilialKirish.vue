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
          <div class="col-md-3 mb-1">
            <div class="card shadow border-0">
              <a data-toggle="modal"
              >
                <!-- href="#filialMap"  -->
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
                <table class="table table-hover table-borderless text-center">
                  <thead>
                    <tr>
                      <th>№</th>
                      <th>Nomi</th>
                      <th>
                        <span class="fa fa-arrow-up"/>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(kategoriya, n) in kategoriyalar" :key="kategoriya">
                      <td> {{ n + 1 }} </td>
                      <td> {{ kategoriya.name }} </td>
                      <td>
                        <span v-if="!kategoriya.category_id" class="fa fa-folder" />
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

<script type="text/javascript">
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
      hodimlar: "",
      isloading: true,
      errorr: "",
    };
  },
  methods: {
    getData() {
      instance
        .get("this_branch/" + this.branch_id)
        .then((res) => {
          this.filial = res.data;
          res.data.lat = Number(res.data.lat)
          res.data.long = Number(res.data.long)
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
        console.log(response.data)
        this.kategoriyalar = response.data
        this.isloading = false
      })
        .catch((err) => {
          this.isloading = false;
          this.errorr = err.message;
        })
    },

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
  mounted() {
    this.getData();
    if (this.role == "admin") {
      localStorage.setItem("branch_id", this.$route.params.id);
    }
  },
};
</script>

<style>
</style>