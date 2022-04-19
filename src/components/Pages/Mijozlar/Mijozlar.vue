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
                type="search"
                class="form-control"
                v-model="search"
                placeholder="Qidiruv"
              />
              <div class="input-group-append">
                <select class="custom-select" v-model="comment">
                  <option value="Umumiy">Umumiy</option>
                  <option value="narx">Narx</option>
                  <option value="sifat">Sifat</option>
                  <option value="premium">Premium</option>
                </select>
              </div>
            </div>
          </div>
          <div class="col-md-4 mb-2 d-flex justify-content-around">
            <button
              class="btn btn-outline-success"
              data-toggle="modal"
              data-target="#exampleModall"
            >
              <i class="fa fa-user-plus"></i> Mijoz qo'shish
            </button>
          </div>
        </div>
      </div>
      <div class="card-body">
        <div class="row">
          <div
            class="col-md-4 mt-3"
            v-for="mijoz in filteredCards"
            :key="mijoz.id"
          >
            <div class="card shadow">
              <div class="card-body">
                <table class="table table-sm table-borderless">
                  <tbody>
                    <tr>
                      <th><span class="fa fa-user text-secondary" /></th>
                      <td>
                        <strong>{{ mijoz.name }}</strong>
                      </td>
                      <td>
                        <button
                          class="btn btn-sm btn-outline-warning float-right"
                          data-toggle="modal"
                          data-target="#example"
                          @click="editT = mijoz"
                        >
                          <span class="fa fa-edit" />
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <th><span class="fa fa-map-marker text-secondary" /></th>
                      <td>{{ mijoz.address }}</td>
                    </tr>
                    <tr>
                      <th><span class="fa fa-phone text-secondary" /></th>
                      <td>
                        <a :href="'tel:+998' + mijoz.phone"
                          >+998{{ mijoz.phone }}</a
                        >
                      </td>
                    </tr>
                    <tr>
                      <th><span class="fa fa-project-diagram text-secondary" /></th>
                      <td>{{ mijoz.comment }}</td>
                    </tr>
                  </tbody>
                </table>
                <div class="card-footer">
                  <router-link
                    :to="'/mijozhaqida/' + mijoz.id"
                    class="btn btn-outline-info btn-block mt-3"
                  >
                    <span class="fa fa-info" /> Mijoz haqida
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Modal edit -->
  <div
    class="modal fade"
    id="example"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title" id="exampleModalLabel">Tahrirlash</h4>
        </div>
        <form id="form2">
          <div class="modal-body">
            <div class="row">
              <div class="col-md-12">
                <div class="form-group field-client-ism required">
                  <label class="mt-3">Ism</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Mijoz ismi"
                    required
                    v-model="editT.name"
                  />

                  <label class="mt-3">Manzil</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Manzil"
                    required
                    v-model="editT.address"
                  />

                  <label class="mt-3">Telefon</label>
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span
                        class="input-group-text"
                        id="inputGroup-sizing-default"
                        >+998</span
                      >
                    </div>
                    <input
                      type="tel"
                      class="form-control"
                      placeholder="Tel"
                      min="0"
                      minlength="9"
                      maxlength="9"
                      required
                      v-model="editT.phone"
                      aria-label="Default"
                      aria-describedby="inputGroup-sizing-default"
                    />
                  </div>

                  <label class="mt-3">Toifa</label>
                  <div class="input-group">
                    <select class="custom-select" v-model="editT.comment">
                      <option value="Umumiy">Umumiy</option>
                      <option value="Narx">Narx</option>
                      <option value="Sifat">Sifat</option>
                      <option value="Premium">Premium</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
        <div class="modal-footer">
          <button
            type="button"
            form="form1"
            class="btn btn-outline-warning"
            data-dismiss="modal"
            v-on:click="putData(editT.id)"
          >
            <i class="far fa-check-circle"></i>
            Tahrirlash
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
  <!-- Modal Mijoz qo'shish -->
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
        <div class="modal-body">
          <div class="row">
            <div class="col-md-12">
              <div class="form-group field-client-ism required">
                <label>Ism</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Mijoz ismi"
                  required
                  v-model="mijozpost.name"
                />

                <label class="mt-3">Manzil</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Manzil"
                  required
                  v-model="mijozpost.address"
                />

                <label class="mt-3">Telefon</label>
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span
                      class="input-group-text"
                      id="inputGroup-sizing-default"
                      >+998</span
                    >
                  </div>
                  <input
                    type="tel"
                    class="form-control"
                    placeholder="Tel"
                    min="0"
                    minlength="9"
                    maxlength="9"
                    required
                    v-model="mijozpost.phone"
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                  />
                </div>

                <label class="mt-3">Toifa</label>
                <div class="input-group">
                  <select class="custom-select" v-model="mijozpost.comment">
                    <option value="Umumiy">Umumiy</option>
                    <option value="Narx">Narx</option>
                    <option value="Sifat">Sifat</option>
                    <option value="Premium">Premium</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button
            type="button"
            form="form1"
            class="btn btn-outline-success"
            data-dismiss="modal"
            @click="postData"
          >
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
  <isloading :isloading="isloading" :message="error" />
</template>

<script>
import { instance } from "../Api";
import _ from "underscore";
import isloading from "../../Anime/Anime.vue"
import swal from 'sweetalert';

export default {
  components: { isloading },
  data() {
    return {
      mijozpost: {
        name: "",
        phone: null,
        address: "",
        comment: "",
      },
      mijozget: [],
      editT: {},
      search: "",
      isloading: true,
      error: "",
      comment: ""
    };
  },

  methods: {
    postData() {
      this.isloading = true
      instance.post("customer_create", this.mijozpost).then((response) => {
        if (response.status == 200) {
          swal({icon: "success", timer: 1000}).then(() => {
            this.getData();
            // window.location.reload();
            this.mijozpost = {
              name: "",
              phone: null,
              address: "",
              comment: "",
            },
            this.isloading = false
          })
        }
      }).catch((err) => {
        this.error = err.message
        this.isloading = false
      })
    },

    getData() {
      instance.get("all_customers").then((response) => {
        this.mijozget = response.data;
        this.isloading = false
      }).catch((err) => {
        this.error = err.message
        this.isloading = false
      })
    },

    putData(id) {
      this.isloading = true
      instance
        .put("this_customer_update/" + id, this.editT)
        .then((response) => {
          if (response.status == 200) {
            swal({icon: "success", timer: 1000}).then(() => {
              this.getData();
              // window.location.reload();
              this.isloading = false
            })
          }
        });
    },
  },
  computed: {
    filteredCards: function () {
      return this.mijozget.filter((mijoz) => {
        return mijoz.name.toLowerCase().match(this.search.toLowerCase()) && mijoz.comment == this.comment
      });
    },
  },
  mounted() {
    console.clear()
    this.getData();
  },
};
</script>

<style>
</style>