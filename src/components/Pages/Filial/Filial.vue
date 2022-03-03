<template>
  <div class="container-fluid">
    <div class="card shadow">
      <div class="card-header">
        <div class="row">
          <div class="col-md">
            <h3>Filiallar</h3>
          </div>
          <div class="col-md">
            <input type="text" class="form-control" placeholder="Qidiruv" />
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
        <div class="row">
          <div class="col-md-4 mb-2" v-for="filial in filiallar" :key="filial">
            <div class="card shadow">
              <div class="card-header">
                <div class="row">
                  <div class="col-md">
                    <h4>{{ filial.name }}</h4>
                  </div>
                  <div class="col-md">
                    <button class="btn btn-sm btn-outline-warning float-right" 
                            @click="edit(filial.id, filial.name, filial.phone, filial.address, filial.lat, filial.long)"
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
                    <td>{{ filial.address }}</td>
                  </tr>
                </table>
              </div>
              <div class="card-footer">
                  <a class="btn btn-outline-success" :href="'/filialKirish/' + filial.id">
                      Kirish
                  </a>
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
            <h3> {{ editFilial.name }} ma'lumotlarini tahrirlash </h3>
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

  <Anime :isLoading="isLoading" />
</template>

<script>
import { instance } from "../Api";
import Anime from "../../Anime/Anime.vue";
export default {
  components: { Anime },
  data() {
    return {
      isLoading: false,
      filiallar: [],
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
        address: ""
      },
    };
  },
  methods: {
    getData() {
      this.isLoading = true;

        instance.get("all_branches")
        .then((res) => {
            this.filiallar = res.data
            console.log(res.data)
        })
        .finally(
            this.isLoading = false
        )
    },

    postData() {
      console.log(this.yangiFilial);
      this.isLoading = true;
        
        instance.post("branch_create", this.yangiFilial)
        .then((res) => {
            console.log(res.data)
            window.location.reload()
        })
        .finally(
            this.isLoading = false
        )
    },

    edit(id, name, phone, address, lat, long) {
        this.editFilial = {
            id: id,
            name: name,
            phone: phone,
            address: address,
            lat: lat,
            long: long,
        }
        console.log(this.editFilial)
    },

    putData() {
      console.log(this.editFilial);
      this.isLoading = true;

        instance.put("this_branch_update/" + this.editFilial.id, this.editFilial)
        .then((res) => {
            console.log(res.data)
            window.location.reload()
        })
        .finally(
            this.isLoading = false
        )
    },

    locatorButtonPressed() {
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
      } else {
        console.log("Siz_belgilagan_Geolakatsiya_notogri");
      }
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<style>
</style>