<template>
  <div class="container-fluid">
    <div class="card shadow">
      <div class="card-header">
        <div class="row">
          <div class="col-md-2">
            <h3>Kurs</h3>
          </div>
          <div class="col-md-3 mb-2">
            <label>Narx :</label>
            <div class="form-group">
              <div class="input-group">
                <div class="input-group-prepend">
                  <div class="input-group-text text-dark">1 $ =</div>
                </div>
                <input
                  type="number"
                  class="form-control"
                  aria-required="true"
                />
              </div>
            </div>
          </div>
          <div class="col-md-3 mb-2">
            <label for="">Valyuta: </label>
            <input type="text" class="form-control" aria-required="true" />
          </div>
          <div class="col-md-4">
            <label class="mt-10"></label>
            <button
              class="btn btn-outline-dark btn-sm btn-block"
              style="margin-top: 10px"
            >
              <i class="fas fa-circle-check" form="form1"></i> Tasdiqlash
            </button>
          </div>
        </div>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="table-responsive mt-3">
            <table class="table table-borderless table-sm">
              <tbody>
                <tr>
                  <td></td>
                  <td>
                    <div class="input-group input-group-sm">
                      <div class="input-group-append">
                        <div class="input-group-text text-dark">1 $ =</div>
                      </div>
                      <input
                        class="form-control form-control-sm"
                        
                      />
                      <div class="input-group-append">
                        <input
                          type="text"
                          
                          class="form-control form-control-sm border-left-0"
                        />
                        <!-- {{ user.valyuta }} -->
                      </div>
                    </div>
                  </td>
                  <td>
                    <button
                      type="submit"
                      class="btn btn-outline-warning btn-sm"
                      
                    >
                      <i class="fa fa-edit"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
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
              <div class="row mb-2">
                <div class="col-md-6">
                  <label> Ismi </label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Ism"
                    v-model="yangiHodim.name"
                    required
                  />
                </div>
                <div class="col-md-6">
                  <label> Telefon raqami </label>
                  <div class="input-group">
                    <span class="input-group-prepend">
                      <span class="input-group-text"> +998 </span>
                    </span>
                    <input
                      type="tel"
                      class="form-control"
                      placeholder="Tel"
                      min="0"
                      minlength="9"
                      maxlength="9"
                      v-model="yangiHodim.phone"
                      required
                    />
                  </div>
                </div>
              </div>
              <div class="row mb-2">
                <div class="col-md">
                  <label> Role </label>
                  <select class="custom-select" v-model="yangiHodim.role">
                    <option value="branch_admin">Filial admin</option>
                  </select>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <label> Username </label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Username"
                    v-model="yangiHodim.username"
                    required
                  />
                </div>
                <div class="col-md-6">
                  <label> Parol </label>
                  <input
                    type="password"
                    class="form-control"
                    placeholder="Password"
                    v-model="yangiHodim.password"
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

    <!-- Modal -->

    <!-- <div
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
    </div> -->
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      branch_id: localStorage.getItem("branch_id"),
      access_token: localStorage.getItem("access_token"),
      hodimlar: [],
      yangiHodim: {
        name: "",
        username: "",
        password: "",
        role: "",
        branch_id: "",
        phone: null,
      },
      search: "",
    };
  },
  methods: {
    postData() {
      this.yangiHodim.branch_id = this.branch_id;
      console.log(this.yangiHodim);
      const BASEURL = "https://savdo.crud.uz/user_create";
      axios
        .create({
          baseURL: BASEURL,
          headers: {
            // Accept: "*/*",
            "Content-Type": "application/json",
            Authorization: "Bearer " + this.access_token,
          },
        })
        .post(BASEURL, this.yangiHodim)
        .then((res) => {
          console.log(res.data);
          window.location.reload();
        });
    },

    getData() {
      const BASEURL =
        "https://savdo.crud.uz/branch_users/" + this.branch_id + "/unblock";
      axios
        .create({
          baseURL: BASEURL,
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
            Authorization: "Bearer " + this.access_token,
          },
        })
        .get(BASEURL)
        .then((res) => {
          this.hodimlar = res.data;
          console.log(res.data);
        });
    },
    edit(id, name, phone, role, username) {
      this.yangiHodim = {
        id: id,
        name: name,
        phone: phone,
        role: role,
        username: username,
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
          window.location.reload();
        });
    },
    block(id) {
      const BASEURL = "https://savdo.crud.uz/this_user_block/";
      axios
        .create({
          baseURL: BASEURL,
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
            Authorization: "Bearer " + this.access_token,
          },
        })
        .put(BASEURL + id)
        .then((res) => {
          console.log(res.data);
          window.location.reload();
        });
    },
  },
  computed: {
    filteredCards: function () {
      return this.hodimlar.filter((taminotchis) => {
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