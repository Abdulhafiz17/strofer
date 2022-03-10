<template>
  <div class="container-fluid">
    <div class="card shadow">
      <div class="card-header text-center">
        <h3>{{ filial.name }}</h3>
        <div class="row text-center">
          <div class="col-md-3"></div>
          <div class="col-md-2">
            <div class="card shadow border-0">
              <a :href="'tel:+998' + filial.phone">
                <div class="card-body">
                  <span class="fa fa-phone" /> +998{{ filial.phone }}
                </div>
              </a>
            </div>
          </div>
          <div class="col-md-2">
            <div class="card shadow border-0">
              <a href="#filialMap" data-toggle="modal">
                <div class="card-body">
                  <span class="fa fa-location-arrow" /> {{ filial.address }}
                </div>
              </a>
            </div>
          </div>
          <div class="col-md-2">
            <div class="card shadow border-0">
              <a @click="shareToHodimlar()" style="cursor: pointer">
                <div class="card-body">
                  <span class="fa fa-user" /> {{ hodimlar }} ta hodim
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-sm-12">
            <div class="card shadow border-0">
              <div class="card-header text-center">
                <h4> Mahsulotlar </h4>
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
</template>

<script>
import { instance } from "../Api";
let filial
export default {
  data() {
    return {
      role: localStorage.getItem("role"),
      branch_id: this.$route.params.id,
      filial: {},
      hodimlar: "",
    };
  },
  methods: {
    getData() {
      instance.get("this_branch/" + this.branch_id).then((res) => {
        console.log(res.data)
        this.filial = res.data;
        this.map(res.data.lat, res.data.long)
      });

      instance
        .get("branch_users/" + this.branch_id + "/unblock")
        .then((res) => {
          this.hodimlar = res.data.length;
        });
    },

    shareToHodimlar() {
      this.$router.push({ name: "Hodimlar", params: { id: this.branch_id } });
    },

    map(lat, long) {
      console.log(lat, long)
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
  mounted() {
    this.getData();
    if (this.role == "admin") {
      localStorage.setItem("branch_id", this.$route.params.id)
    }
  },
};
</script>

<style>
</style>