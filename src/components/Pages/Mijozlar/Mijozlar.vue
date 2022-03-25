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
                <span class="input-group-text">
                  <i class="fa fa-search"></i>
                </span>
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
            v-for="mijozgets in filteredCards"
            :key="mijozgets.id"
          >
            <div class="card shadow">
              <div class="card-body">
                <div class="row">
                  <div class="col-md-12">
                    <h3 class="card-title">
                      <h4>
                        {{ mijozgets.name }}

                        <button
                          class="btn btn-warning float-right btn-sm"
                          data-toggle="modal"
                          data-target="#example"
                          @click="
                            editk(
                              mijozgets.id,
                              mijozgets.name,
                              mijozgets.phone,
                              mijozgets.address,
                              mijozgets.comment
                            )
                          "
                        >
                          <i class="fa fa-edit"></i>
                        </button>
                      </h4>
                    </h3>
                    <h4>
                      Tel: +998{{ mijozgets.phone }} <br />
                      Manzil: {{ mijozgets.address }} <br />
                      Izoh: {{ mijozgets.comment }}
                    </h4>
                  </div>
                </div>
                <div class="col">
                  <!-- <div class="card-footer">
                    <a
                      :href="'/mijozhaqida/' + mijozgets.id"
                      class="btn btn-outline-success btn-block mt-3"
                    >
                      Mijoz haqida
                    </a>
                  
                  </div> -->
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

                  <select v-model="editT.comment" class="form-control mt-4">
                    <option disabled value="">Iltimos, birini tanlang</option>
                    <option>A'lo</option>
                    <option>Yaxshi</option>
                    <option>Yomon</option>
                  </select>
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
                <label class="mt-3">Ism</label>
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
                    v-model="mijozpost.phone"
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                  />
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
</template>

<script>
import { instance } from "../Api";
import _ from "underscore";

export default {
  data() {
    return {
      mijozpost: {
        name: "",
        phone: null,
        address: "",
        comment: "",
      },
      mijozget: [],
      editT: [],
      search: "",
    };
  },

  methods: {
    postData() {
      instance.post("customer_create", this.mijozpost).then((response) => {
        console.log(response.data);
        this.getData();
        window.location.reload();
      });
    },

    getData() {
      instance.get("all_customers").then((response) => {
        this.mijozget = response.data;
        console.log(response.data);
      });
    },

    editk(id, name, phone, address, comment) {
      this.editT = {
        id: id,
        name: name,
        phone: phone,
        address: address,
        comment: comment,
      };
    },

    putData(id) {
      instance
        .put("this_customer_update/" + id, this.editT)
        .then((response) => {
          console.log(response.data);
          this.getData();
          window.location.reload();
        });
    },

    computed: {
      searchHandler: function () {
        return this.mijozget.filter((items) => {
          for (let item in items) {
            if (
              String(items[item])
                .toLowerCase()
                .indexOf(this.search.toLowerCase()) !== -1
            ) {
              return true;
            }
          }
          return false;
        });
      },
    },
  },
  computed: {
    filteredCards: function () {
      return this.mijozget.filter((taminotchis) => {
        return taminotchis.name.toLowerCase().match(this.search.toLowerCase());
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