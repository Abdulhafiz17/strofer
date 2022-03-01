<template>
  <div class="container-fluid">
    <div class="card shadow">
      <div class="card-header">
        <div class="row">
          <div class="col-md">
            <h3>Ta'minotchilar</h3>
          </div>
          <div class="col-md mb-2">
            <input
              type="text"
              class="form-control"
              v-model="search"
              placeholder="Qidiruv"
              @keyup="filteredCards"
            />
          </div>
          <div class="col-md">
            <button
              type="button"
              data-toggle="modal"
              data-target="#modal1"
              class="btn btn-outline-warning float-right"
            >
              <span class="fa fa-user-plus"></span> Ta'minotchi qo'shish
            </button>
          </div>
        </div>
      </div>
      <div class="card-body">
        <div class="row">
          <div
            class="col-md-4 mb-3"
            v-for="taminotchi in filteredCards"
            :key="taminotchi"
          >
            <div class="card shadow">
              <div class="card-body">
                <div class="table-responsive"></div>
                <table class="table table-sm table-borderless">
                  <tbody>
                    <tr>
                      <th>
                        <span class="fa fa-user text-secondary"></span>
                      </th>
                      <td>
                        <strong>{{ taminotchi.name }}</strong>
                        <button
                          class="btn btn-sm btn-outline-warning float-right"
                          @click="
                            edit(
                              taminotchi.id,
                              taminotchi.name,
                              taminotchi.phone
                            )
                          "
                          data-toggle="modal"
                          data-target="#modal3"
                        >
                          <span class="fa fa-edit"></span>
                        </button>
                      </td>
                      <!-- <td>
                      </td> -->
                    </tr>
                    <tr>
                      <th><span class="fa fa-phone text-secondary"></span></th>
                      <td>
                        <a :href="'tel: +998' + taminotchi.phone">
                          +998{{ taminotchi.phone }}
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <th><span class="fa fa-coins text-secondary"></span></th>
                      <td
                        :class="
                          taminotchi.balance >= 0
                            ? 'text-success'
                            : 'text-danger'
                        "
                      >
                        {{
                          Intl.NumberFormat({ style: "currency" }).format(
                            taminotchi.balance
                          )
                        }}
                        $
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="card-footer text-center">
                <div class="row d-flex justify-content-around">
                  <div class="col-sm-4" style="width: 78px">
                    <router-link
                      class="btn btn-block btn-outline-success mt-2"
                      to="/taminotOlish"
                    >
                      <span class="fa fa-box"></span>
                    </router-link>
                  </div>
                  <div class="col-sm-4" style="width: 78px">
                    <button
                      class="btn btn-block btn-outline-primary mt-2"
                      data-toggle="modal"
                      data-target="#modal2"
                    >
                      <span class="fa fa-coins"></span>
                    </button>
                  </div>
                  <div class="col-sm-4" style="width: 78px">
                    <router-link
                      class="btn btn-block btn-outline-warning mt-2"
                      to="tarix"
                    >
                      <span class="fa fa-clock"></span>
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="modal fade" id="modal1">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h3>Ta'minotchi qo'shish</h3>
        </div>
        <form @submit.prevent="postData()" id="form1">
          <div class="modal-body">
            <div class="px-1 d-felx justify-content-around">
              <input
                type="text"
                name=""
                id=""
                class="form-control"
                placeholder="Ismi"
                v-model="data.name"
                required
              />
              <div class="input-group mt-2">
                <div class="input-group-prepend">
                  <span class="input-group-text">+998</span>
                </div>
                <input
                  type="phone"
                  name=""
                  id=""
                  class="form-control"
                  placeholder="Tel"
                  maxlength="9"
                  minlength="9"
                  v-model="data.phone"
                  required
                />
              </div>
            </div>
          </div>
        </form>
        <div class="modal-footer">
          <button type="submit" form="form1" class="btn btn-outline-primary">
            <span class="fas fa-check-circle"></span>Tasdiqlash
          </button>
          <button class="btn btn-outline-danger" data-dismiss="modal">
            <span class="fa fa-circle-xmark"></span> Bekor qilish
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="modal fade" id="modal2">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h3>Ta'minotchiga pul berish</h3>
        </div>
        <div class="modal-body">
          <div class="row px-3">
            <div class="input-group">
              <input
                type="number"
                min="0"
                name=""
                id=""
                class="form-control"
                placeholder="Summa"
              />
              <div class="input-group-append">
                <span class="input-group-text border-warning">so'm</span>
              </div>
            </div>
            <textarea
              class="form-control mt-2"
              name=""
              id=""
              cols="70"
              rows="2"
              placeholder="Izoh"
            />
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-outline-primary">
            <span class="fa fa-check-circle"></span> Tasdiqlash
          </button>
          <button class="btn btn-outline-danger" data-dismiss="modal">
            <span class="fa fa-circle-xmark"></span> Bekor qilish
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="modal fade" id="modal3">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h3>{{ editT.name }} ma'lumotlarini tahrirlash</h3>
        </div>
        <form @submit.prevent="editData(editT.id)" id="form2">
          <div class="modal-body">
            <input type="text" class="form-control" v-model="editT.name" />
            <div class="input-group mt-2">
              <div class="input-group-prepend">
                <span class="input-group-text">+998</span>
              </div>
              <input
                type="number"
                name=""
                id=""
                maxlength="9"
                class="form-control"
                placeholder="Tel"
                v-model="editT.phone"
              />
            </div>
          </div>
        </form>
        <div class="modal-footer">
          <button type="submit" form="form2" class="btn btn-outline-primary">
            <span class="far fa-circle-check"></span> Tasdiqlash
          </button>
          <button class="btn btn-outline-danger" data-dismiss="modal">
            <span class="far fa-circle-xmark"></span> Bekor qilish
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { access_token } from "../../../DATA_BASE";
import axios from "axios";
export default {
  data() {
    return {
      taminotchis: [],
      data: {
        name: "",
        phone: null,
      },
      editT: {
        id: 0,
        name: "",
        phone: 0,
      },
      search: "",
    };
  },
  methods: {
    getData() {
      const BASEURL = "https://oqsaroy.crud.uz/suppliers";
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
          this.taminotchis = res.data;
          console.log(res.data);
        });
    },
    postData() {
      const BASEURL = "https://oqsaroy.crud.uz/supplier/create";
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
    edit(id, name, phone) {
      this.editT = {
        id: id,
        name: name,
        phone: phone,
      };
    },
    editData(id) {
      const BASEURL = "https://oqsaroy.crud.uz/supplier/update/";
      axios
        .create({
          baseURL: BASEURL,
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
            Authorization: "Bearer " + access_token,
          },
        })
        .put(BASEURL + id, this.editT)
        .then((res) => {
          console.log(res.data);
          window.location.reload();
        });
    },
  },
  computed: {
    filteredCards: function () {
      return this.taminotchis.filter((taminotchis) => {
        return taminotchis.name.toLowerCase().match(this.search.toLowerCase());
        // taminotchis.tel.match(this.search)
      });
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<style scoped>
</style>