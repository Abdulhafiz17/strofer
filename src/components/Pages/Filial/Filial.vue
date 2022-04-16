<template>
  <div class="container-fluid">
    <div class="card shadow">
      <div class="card-header">
        <div class="row">
          <div class="col-md">
            <h3>Filiallar</h3>
          </div>
          <div class="col-md">
            <input
              type="text"
              class="form-control"
              placeholder="Qidiruv"
              v-model="search"
            />
          </div>
          <div class="col-md">
            <button
              class="btn btn-outline-success float-right"
              data-toggle="modal"
              data-target="#yangiFilial"
              @click="locatorButtonPressed()"
            >
              <span class="fa fa-circle-plus" /> Filial qo'shish
            </button>
          </div>
        </div>
      </div>
      <div class="card-body">
        <div class="row" id="branches">
          <div
            class="col-md-4 mb-2"
            v-for="filial in filteredCards"
            :key="filial"
          >
            <div class="card shadow">
              <div class="card-header">
                <div class="row">
                  <div class="col-md-10">
                    <h4>{{ filial.name }}</h4>
                  </div>
                  <div class="col-md-2">
                    <button
                      class="btn btn-sm btn-outline-warning float-right"
                      @click="
                        edit(
                          filial.id,
                          filial.name,
                          filial.phone,
                          filial.address,
                          filial.lat,
                          filial.long
                        )
                      "
                      data-toggle="modal"
                      data-target="#editFilial"
                    >
                      <span class="fa fa-edit" />
                    </button>
                  </div>
                </div>
              </div>
              <div class="card-body">
                <table class="table table-sm table-borderless">
                  <tr>
                    <th><span class="fa fa-phone" /></th>
                    <td>
                      <a :href="'tel:+998' + filial.phone">
                        +998{{ filial.phone }}
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <th><span class="fa fa-map" /></th>
                    <td>
                      <a> {{ filial.address }} </a>
                    </td>
                    <!-- href="#filialMap" data-toggle="modal" @click="map(filial.lat, filial.long, filial.id);" -->
                  </tr>
                </table>
              </div>
              <div class="card-footer">
                <router-link
                  class="btn btn-outline-success btn-block"
                  :to="'/filialKirish/' + filial.id"
                >
                  Kirish
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="modal fade" id="yangiFilial">
    <div class="modal-dialog">
      <div class="modal-content">
        <form @submit.prevent="postData()">
          <div class="modal-header">
            <h3>Yangi filial qo'shish</h3>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-md">
                <label> Nomi </label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Nomi"
                  v-model="yangiFilial.name"
                  required
                />
              </div>
              <div class="col-md">
                <label> Telefon raqami </label>
                <div class="input-group">
                  <div class="input-group-prepend">
                    <div class="input-group-text">+998</div>
                  </div>
                  <input
                    type="tel"
                    min="0"
                    minlength="9"
                    maxlength="9"
                    class="form-control"
                    placeholder="Tel"
                    v-model="yangiFilial.phone"
                    required
                  />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md">
                <label> Manzil </label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Manzil"
                  v-model="yangiFilial.address"
                  required
                />
              </div>
            </div>
            <div class="row">
              <div class="col-md">
                <label> Uzunlik </label>
                <input
                  type="text"
                  class="form-control"
                  min="0"
                  placeholder="Uzunlik"
                  v-model="yangiFilial.lat"
                />
              </div>
              <div class="col-md">
                <label> Kenglik </label>
                <input
                  type="text"
                  class="form-control"
                  min="0"
                  placeholder="Kenglik"
                  v-model="yangiFilial.long"
                  required
                />
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-outline-primary" type="submit">
              <span class="far fa-circle-check" /> Tasdiqlash
            </button>
            <button class="btn btn-outline-danger" data-dismiss="modal">
              <span class="far fa-circle-xmark" /> Bekor qilish
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <div class="modal fade" id="editFilial">
    <div class="modal-dialog">
      <div class="modal-content">
        <form @submit.prevent="putData()">
          <div class="modal-header">
            <h3>{{ editFilial.name }} ma'lumotlarini tahrirlash</h3>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-md">
                <label> Nomi </label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Nomi"
                  v-model="editFilial.name"
                  required
                />
              </div>
              <div class="col-md">
                <label> Telefon raqami </label>
                <div class="input-group">
                  <div class="input-group-prepend">
                    <div class="input-group-text">+998</div>
                  </div>
                  <input
                    type="tel"
                    min="0"
                    minlength="9"
                    maxlength="9"
                    class="form-control"
                    placeholder="Tel"
                    v-model="editFilial.phone"
                    required
                  />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md">
                <label> Manzil </label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Manzil"
                  v-model="editFilial.address"
                  required
                />
              </div>
            </div>
            <div class="row">
              <div class="col-md">
                <label> Uzunlik </label>
                <input
                  type="text"
                  class="form-control"
                  min="0"
                  placeholder="Uzunlik"
                  v-model="editFilial.lat"
                />
              </div>
              <div class="col-md">
                <label> Kenglik </label>
                <input
                  type="text"
                  class="form-control"
                  min="0"
                  placeholder="Kenglik"
                  v-model="editFilial.long"
                  required
                />
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-outline-primary" type="submit">
              <span class="far fa-circle-check" /> Tasdiqlash
            </button>
            <button class="btn btn-outline-danger" data-dismiss="modal">
              <span class="far fa-circle-xmark" /> Bekor qilish
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <div class="modal fade" id="filialMap">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h3>Filial joylashuvi</h3>
          <button
            type="button"
            class="btn"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span class="fa fa-xmark" />
          </button>
        </div>
        <div class="modal-body">
          <div id="map" style="width: 780px; height: 500px"></div>
        </div>
      </div>
    </div>
  </div>
  <isloading :isLoading="isLoading" :message="errorr" />
</template>

<script>
import { instance } from "../Api";
import isloading from "../../Anime/Anime.vue";
import swal from 'sweetalert';
export default {
  components: { isloading },
  data() {
    return {
      role: localStorage.getItem("role"),
      search: "",
      isLoading: true,
      filiallar: [],
      showMap: "",
      yangiFilial: {
        name: "",
        phone: null,
        long: "",
        lat: "",
        address: "",
      },
      editFilial: {
        id: "",
        name: "",
        phone: null,
        long: "",
        lat: "",
        address: "",
      },
      errorr: "",
    };
  },
  methods: {
    getData() {
      console.log(this.role);
      this.filiallar = [];
      instance
        .get("all_branches")
        .then((res) => {
          console.log(res.data)
          this.filiallar = res.data;
        })
        .catch((err) => {
          this.isLoading = false;
          this.errorr = err.message;
        })
        .finally((this.isLoading = false));
    },

    postData() {
      this.isLoading = true;
      // document.querySelector("#yangiFilial").modal("hide")
      instance
        .post("branch_create", this.yangiFilial)
        .then((res) => {
          console.log(res.data);
          if (res.status == 200) {
            swal({icon: "success", timer: 1000}).then(() => {
              window.location.reload();
            })
          }
        })
        .catch((err) => {
          this.isloading = false;
          this.errorr = err.message;
        })
        .finally((this.isloading = false))
    },

    edit(id, name, phone, address, lat, long) {
      this.editFilial = {
        id: id,
        name: name,
        phone: phone,
        address: address,
        lat: lat,
        long: long,
      };
      // console.log(this.editFilial)
    },

    putData() {
      console.log(this.editFilial);
      this.isLoading = true;

      instance
        .put("this_branch_update/" + this.editFilial.id, this.editFilial)
        .then((res) => {
          console.log(res.data);
          if (res.status == 200) {
            swal({icon: "success", timer: 1000}).then(() => {
              window.location.reload();
            })
          }
        })
        .catch((err) => {
          this.isloading = false;
          this.errorr = err.message;
        })
        .finally((this.isLoading = false))
    },

    locatorButtonPressed() {
      this.isloading = true;
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.yangiFilial.lat = position.coords.latitude;
            this.yangiFilial.long = position.coords.longitude;
            console.log(position.coords.latitude, position.coords.longitude);
          },
          (error) => {
            console.log(error.message);
          }
        );
        this.isLoading = false;
      } else {
        alert("Siz_belgilagan_Geolakatsiya_notogri");
      }
    },
    map(lat, long, id) {
      this.isloading = true;
      if (this.showMap != id) {
        this.showMap = id;
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
        this.isLoading = false;
      } else if (this.showMap == id) {
        document.$("#filialMap").modal("show");
      }
    },
  },
  computed: {
    filteredCards: function () {
      if (this.filiallar) {
        return this.filiallar.filter((taminotchis) => {
          return taminotchis.name.toLowerCase().match(this.search.toLowerCase());
        });
      }
    },
  },
  mounted() {
    this.getData();
    // if (localStorage.getItem("reloaded")) {
    //   // The page was just reloaded. Clear the value from local storage
    //   // so that it will reload the next time this page is visited.
    //   localStorage.removeItem("reloaded");
    // } else {
    //   // Set a flag so that we know not to reload the page twice.
    //   localStorage.setItem("reloaded", "1");
    //   location.reload();
    // }
  },
};
</script>

<style>
</style>