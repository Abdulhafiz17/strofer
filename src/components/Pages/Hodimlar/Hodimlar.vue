<template>
  <div class="container-fluid">
    <div class="card shadow">
      <div class="card-header">
        <div class="row">
          <div class="col-md-4">
            <h3>Hodimlar {{ this.length }}</h3>
          </div>
          <div class="col-md-4 mb-2">
            <div class="input-group">
              <input
                type="text"
                v-model="search"
                @keyup="filteredCards"
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
              data-toggle="modal"
              data-target="#exampleModall"
              class="btn btn-outline-warning"
            >
              <span class="fa fa-user-plus"></span> Hodim qo'shish
            </button>
            <router-link
              class="btn btn-outline-danger"
              to="/bloklanganHodimlar"
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
            v-for="hodim in filteredCards"
            :key="hodim.name"
          >
            <div class="card shadow">
              <div class="card-body">
                <table class="table table-borderless table-sm">
                  <tbody>
                    <tr>
                      <th>
                        <span class="fa fa-user text-secondary"></span>
                      </th>
                      <td>
                        <strong>{{ hodim.name }}</strong>
                      </td>
                      <td>
                        <button
                          data-toggle="modal"
                          data-target="#exampleModal"
                          class="btn btn-sm btn-outline-warning float-right"
                          @click="
                            edit(
                              hodim.id,
                              hodim.name,
                              hodim.phone,
                              hodim.role,
                              hodim.seh_id
                            )
                          "
                        >
                          <span class="fa fa-edit"></span>
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <span class="fa fa-phone text-secondary"></span>
                      </th>
                      <td>
                        <a :href="'tel:+998' + hodim.phone">
                          +998{{ hodim.phone }}
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <span class="fa fa-industry text-secondary"></span>
                      </th>
                      <td>{{ hodim.role }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="card-footer">
                <div class="row d-flex justify-content-around">
                  <div class="col-md-6" style="width: 118px;">
                    <button
                      class="btn btn-block btn-outline-danger"
                      @click="block(hodim.id)"
                    >
                      <i class="fa fa-user-slash"></i>
                    </button>
                  </div>
                  <div class="col-md-6" style="width: 118px;">
                    <router-link
                      to="/kPITarixi"
                      class="btn btn-block btn-outline-primary"
                    >
                      <i class="fa fa-history"></i>
                    </router-link>
                  </div>
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
      id="exampleModall"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModallLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title" id="exampleModallLabel">Hodim qo'shish</h4>
          </div>
          <form id="form1" @submit.prevent="postData">
            <div class="modal-body">
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group field-client-ism required">
                    <label>Ism</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Hodim ismi"
                      v-model="data.name"
                      required
                    />
                  </div>
                  <div class="form-group field-client-manzil required">
                    <label for="">Vazifasi</label>
                    <select
                      name=""
                      id=""
                      v-model="data.role"
                      class="form-control"
                      required
                    >
                      <option value="tikiuvchi">Tikiuvchi</option>
                      <option value="dazmollovchi">Dazmollovchi</option>
                      <option value="upakovchi">Upakovchi</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                </div>
                <div class="col-md-6">
                  <label>Telefon</label>
                  <div class="form-group">
                    <div class="input-group">
                      <span class="input-group-append">
                        <span class="input-group-text">+998</span>
                      </span>
                      <input
                        type="phone"
                        min="0"
                        maxlength="9"
                        minlength="9"
                        v-model="data.phone"
                        class="form-control"
                        placeholder="Telefon raqami"
                        required
                      />
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="">Tseh</label>
                    <select
                      name=""
                      id=""
                      v-model="data.seh_id"
                      class="form-control"
                      required
                    >
                      <option v-for="seh in sehs" :key="seh.id" :value="seh.id">
                        {{ seh.name }}
                      </option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="submit"
                  form="form1"
                  class="btn btn-outline-primary"
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
          </form>
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
              Hodim ma'lumotlarini tahrirlash
            </h4>
          </div>
          <form id="form2" @submit.prevent="editPost(editH.id)">
            <div class="modal-body">
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group field-client-ism required">
                    <label>Ism</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="editH.name"
                    />
                  </div>
                  <div class="form-group">
                    <label>Vazifasi</label>
                    <select
                      name=""
                      id=""
                      v-model="editH.role"
                      class="form-control"
                      required
                    >
                      <option value="tikiuvchi">Tikiuvchi</option>
                      <option value="dazmollovchi">Dazmollovchi</option>
                      <option value="upakovchi">Upakovchi</option>
                    </select>
                  </div>
                </div>

                <div class="col-md-6">
                  <label>Telefon</label>
                  <div class="form-group">
                    <div class="input-group">
                      <div class="input-group-append">
                        <span class="input-group-text">+998</span>
                      </div>
                         <input
                        type="phone"
                        min="0"
                        maxlength="9"
                        minlength="9"
                        v-model="editH.phone"
                        class="form-control"
                        placeholder="Telefon raqami"
                        required
                      />
                    </div>
                  </div>
                  <div class="form-group field-client-manzil required">
                    <label>Tseh</label>
                    <select class="form-control" v-model="editH.seh_id">
                      <option v-for="seh in sehs" :key="seh">
                        {{ seh.name }}
                      </option>
                    </select>
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
  </div>
</template>

<script>
import axios from "axios";
import { access_token } from '../../../DATA_BASE';
export default {
  data() {
    return {
      hodims: [],
      sehs: [],
      length: "",
      data: {
        name: "",
        phone: "",
        role: "",
        seh_id: "",
      },
      search: "",
      editH: {
        id: "",
        name: "",
        role: "",
        phone: 0,
        seh_id: 0,
      },
    };
  },
  methods: {
    postData() {
      const TOKEN = localStorage.getItem("access_token");
      const BASEURL = "https://oqsaroy.crud.uz/hodim/create";
      axios
        .create({
          baseURL: BASEURL,
          headers: {
            // Accept: "*/*",
            "Content-Type": "application/json",
            Authorization: "Bearer " + TOKEN,
          },
        })
        .post(BASEURL, this.data)
        .then((res) => {
          console.log(res.data);
          window.location.reload();
        });
    },

    getData() {
      const TOKEN = localStorage.getItem("access_token");
      const BASEURL = "https://oqsaroy.crud.uz/hodimlar";
      axios
        .create({
          baseURL: BASEURL,
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
            Authorization: "Bearer " + TOKEN,
          },
        })
        .get(BASEURL)
        .then((res) => {
          this.hodims = res.data;
          this.length = res.data.length;
          console.log(res.data);
        });
      axios
        .create({
          baseURL: "https://oqsaroy.crud.uz/sehlar",
          headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
            Authorization: "Bearer " + TOKEN,
          },
        })
        .get("https://oqsaroy.crud.uz/sehlar")
        .then((res) => {
          this.sehs = res.data;
          // console.log(res.data);
        });
    },
    edit(id, name, phone, role, seh_id) {
      this.editH = {
        id: id,
        name: name,
        phone: phone,
        role: role,
        seh_id: seh_id,
      };
      console.log(this.editH);
    },
    editPost(id) {
      const TOKEN = localStorage.getItem("access_token");
      const BASEURL = "https://oqsaroy.crud.uz/hodim/update/";
      axios
        .create({
          baseURL: BASEURL,
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
            Authorization: "Bearer " + TOKEN,
          },
        })
        .put(BASEURL + id, this.editH)
        .then((res) => {
          console.log(res.data);
          window.location.reload()
        });
    },
    block(id) {
      // const TOKEN = localStorage.getItem("access_token");
      const BASEURL = "https://oqsaroy.crud.uz/hodim_block/";
      axios
        .create({
          baseURL: BASEURL,
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
            Authorization: "Bearer " + access_token,
          },
        })
        .get(BASEURL + id)
        .then((res) => {
          console.log(res.data);
          window.location.reload();
        });
    }
  },
  computed: {
    filteredCards: function () {
      return this.hodims.filter((taminotchis) => {
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
/* "https://oqsaroy.crud.uz/hodim/update */
</style>