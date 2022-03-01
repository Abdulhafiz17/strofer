<template>
  <div class="container-fluid">
    <div class="card shadow">
      <div class="card-header">
        <div class="row">
          <div class="col-md-4 mb-2">
            <h3>Mijozlar</h3>
          </div>
          <div class="col-md-4 mb-2">
            <div class="input-group">
              <input
                type="text"
                v-model="search"
                class="form-control"
                placeholder="Search"
              />
              <div class="input-group-append">
                <span class="input-group-text">
                  <i class="fa fa-search"></i>
                </span>
              </div>
            </div>
          </div>
          <div class="col-md-4 mb-2 d-flex justify-content-around">
            <button
              class="btn btn-outline-warning"
              data-toggle="modal"
              data-target="#exampleModall"
            >
              <i class="fa fa-user-plus"></i> Mijoz qo'shish
            </button>
            <router-link
              class="btn btn-outline-danger"
              to="/bloklanganMijozlar"
            >
              <span class="fa fa-eye-slash"></span>
            </router-link>
          </div>
        </div>
      </div>
      <div class="card-body">
        <div class="row">
          <div
            class="col-md-4 mb-3"
            v-for="client in filteredCards"
            :key="client"
          >
            <div class="card shadow rounded-lg">
              <div class="card-body">
                <table class="table table-sm table-borderless">
                  <tbody>
                    <tr>
                      <th>
                        <span class="fa fa-user text-secondary"></span>
                      </th>
                      <td>
                        <strong>{{ client.name }}</strong>
                      </td>
                      <td>
                        <button
                          data-toggle="modal"
                          data-target="#exampleModal"
                          class="btn btn-sm btn-outline-warning float-right"
                          @click="
                            edit(
                              client.id,
                              client.name,
                              client.phone1,
                              client.phone2,
                              client.address,
                              client.orienter
                            )
                          "
                        >
                          <i class="fa fa-edit"></i>
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <span class="fa fa-phone text-secondary"></span
                        ><sub class="text-secondary">1</sub>
                      </th>
                      <td>
                        <a :href="'tel:+998' + client.phone1">
                          +998{{ client.phone1 }}
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <span class="fa fa-phone text-secondary"></span
                        ><sub class="text-secondary">2</sub>
                      </th>
                      <td>
                        <a :href="'tel:+998' + client.phone1">
                          +998{{ client.phone2 }}
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <th><span class="fa fa-map text-secondary"></span></th>
                      <td>{{ client.address }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div class="card-footer">
                <div class="row d-flex justify-content-around">
                  <router-link
                    to="/vazvrat"
                    class="btn btn-sm btn-outline-info"
                    style="width: 40px"
                  >
                    <i class="fa fa-sync-alt"></i>
                  </router-link>
                  <router-link
                    to="/buyurtmaOlish"
                    class="btn btn-sm btn-outline-success"
                    style="width: 40px"
                  >
                    <i class="fa fa-shopping-cart"></i>
                  </router-link>
                  <router-link
                    to="/mijozHaqida"
                    class="btn btn-sm btn-outline-primary"
                    style="width: 40px"
                  >
                    <i class="fa pl-2 pr-2 fa-info"></i>
                  </router-link>
                  <!-- <router-link
                    to="/mijozTayyorlov"  
                    class="btn btn-sm btn-outline-primary"
                    style="width: 40px"
                  >
                    <i class="fa fa-address-card"></i>
                  </router-link> -->
                  <button
                    class="btn btn-sm btn-outline-danger"
                    style="width: 40px"
                  >
                    <i class="fa fa-eye-slash"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal -->
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
            <h4 class="modal-title" id="exampleModalLabel">
              {{ editC.name }} ma'lumotlarini tahrirlash
            </h4>
          </div>
          <form @submit.prevent="editData(editC.id)" id="form2">
            <div class="modal-body">
              <div class="row">
                <div class="col-md-12">
                  <div class="form-group field-client-ism required">
                    <label>Ism</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Mijoz ismi"
                      v-model="editC.name"
                      required
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group field-client-manzil required">
                    <label>Manzil</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Mijoz manzili"
                      v-model="editC.address"
                      required
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Mo'ljal</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Mijoz mo'ljali"
                      v-model="editC.orienter"
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <label>Telefon</label>
                  <div class="form-group">
                    <div class="input-group">
                      <div class="input-group-append">
                        <span class="input-group-text">+998</span>
                      </div>
                      <input
                        type="phone"
                        class="form-control"
                        maxlength="9"
                        minlength="9"
                        v-model="editC.phone1"
                        required
                        placeholder="Telefon raqami"
                      />
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <label>Telefon 2</label>
                  <div class="form-group">
                    <div class="input-group">
                      <div class="input-group-append">
                        <span class="input-group-text">+998</span>
                      </div>
                      <input
                        type="phone"
                        class="form-control"
                        maxlength="9"
                        minlength="9"
                        v-model="editC.phone2"
                        required
                        placeholder="Telefon raqami 2"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
          <div class="modal-footer">
            <button type="submit" form="form2" class="btn btn-outline-primary">
              <span class="far fa-check-circle"></span>
              Tasdiqlash
            </button>
            <button
              class="btn btn-outline-danger"
              type="button"
              data-dismiss="modal"
            >
              <span class="far fa-times-circle"></span>
              Bekor qilish
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="exampleModall"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModallLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title" id="exampleModallLabel">Mijoz qo'shish</h4>
          </div>
          <form @submit.prevent="postData()" id="form1">
            <div class="modal-body">
              <div class="row">
                <div class="col-md-12">
                  <div class="form-group field-client-ism required">
                    <label>Ism</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Mijoz ismi"
                      v-model="data.name"
                      required
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group field-client-manzil required">
                    <label>Manzil</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Mijoz manzili"
                      v-model="data.address"
                      required
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Mo'ljal</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Mijoz mo'ljali"
                      v-model="data.orienter"
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <label>Telefon</label>
                  <div class="form-group">
                    <div class="input-group">
                      <div class="input-group-append">
                        <span class="input-group-text">+998</span>
                      </div>
                      <input
                        type="phone"
                        class="form-control"
                        maxlength="9"
                        minlength="9"
                        v-model="data.phone1"
                        required
                        placeholder="Telefon raqami"
                      />
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <label>Telefon 2</label>
                  <div class="form-group">
                    <div class="input-group">
                      <div class="input-group-append">
                        <span class="input-group-text">+998</span>
                      </div>
                      <input
                        type="phone"
                        class="form-control"
                        maxlength="9"
                        minlength="9"
                        v-model="data.phone2"
                        required
                        placeholder="Telefon raqami 2"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
          <div class="modal-footer">
            <button type="submit" form="form1" class="btn btn-outline-primary">
              <i class="far fa-check-circle"></i>
              Tasdiqlash
            </button>
            <button
              class="btn btn-outline-danger"
              type="button"
              data-dismiss="modal"
            >
              <i class="far fa-times-circle"></i>
              Bekor qilish
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { access_token } from "../../../DATA_BASE";
export default {
  data() {
    return {
      clients: [],
      data: {
        name: "",
        address: "",
        orienter: "",
        phone1: null,
        phone2: null,
        status: true,
      },
      editC: {
        id: 0,
        name: "",
        address: "",
        orienter: "",
        phone1: 0,
        phone2: 0,
        status: true,
      },
      search: "",
    };
  },
  methods: {
    getData() {
      const BASEURL = "https://oqsaroy.crud.uz/clients";
      axios
        .create({
          baseURL: BASEURL,
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
            Authorization: "Bearer " + access_token,
          },
        })
        .get(BASEURL)
        .then((res) => {
          this.clients = res.data;
          console.log(res.data);
        });
    },
    postData() {
      const BASEURL = "https://oqsaroy.crud.uz/client/create";
      axios
        .create({
          baseURL: BASEURL,
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
            Authorization: "Bearer " + access_token,
          },
        })
        .post(BASEURL, this.data)
        .then((res) => {
          console.log(res.data);
          window.location.reload();
        });
    },
    edit(id, name, phone1, phone2, address, orienter) {
      this.editC = {
        id: id,
        name: name,
        phone1: phone1,
        phone2: phone2,
        address: address,
        orienter: orienter,
      };
    },
    editData(id) {
      const BASEURL = "https://oqsaroy.crud.uz/client/update/";
      axios
        .create({
          baseURL: BASEURL,
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
            Authorization: "Bearer " + access_token,
          },
        })
        .put(BASEURL + id, this.editC)
        .then((res) => {
          console.log(res.data);
          window.location.reload();
        });
    },
  },
  computed: {
    filteredCards: function () {
      return this.clients.filter((clients) => {
        return clients.name.toLowerCase().match(this.search.toLowerCase());
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