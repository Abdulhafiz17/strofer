<template>
  <div class="container-fluid">
    <div class="card shadow">
      <div class="card-header">
        <div class="row">
          <div class="col-md-4">
            <h3>Hodimlar</h3>
          </div>
          <div class="col-md-4 mb-2">
            <div class="input-group">
              <input
                type="text"
                v-model="search"
                @keyup="filteredCards"
                class="form-control"
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
              data-toggle="modal"
              data-target="#exampleModall"
              class="btn btn-outline-success"
            >
              <span class="fa fa-user-plus"></span> Hodim qo'shish
            </button>
            <router-link
              class="btn btn-outline-danger"
              :to="'/blocklanganHodimlar/' + branch_id"
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
                          @click="edit(hodim)"
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
                      <td>
                        <span v-if="hodim.role == 'branch_admin'">
                          Filial admin
                        </span>
                        <span v-if="hodim.role == 'seller'"> Sotuvchi </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="card-footer">
                <div class="row d-flex justify-content-around">
                  <div class="col-md-6" style="width: 118px">
                    <button
                      class="btn btn-block btn-outline-danger"
                      @click="block(hodim.id)"
                    >
                      <i class="fa fa-user-slash"></i>
                    </button>
                  </div>
                  <div class="col-md-6" style="width: 118px">
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
                  <select
                    class="custom-select"
                    v-model="yangiHodim.role"
                    required
                  >
                    <option value="branch_admin">Filial admin</option>
                    <option value="seller">Sotuvchi</option>
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

    <div class="modal fade" id="exampleModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title" id="exampleModalLabel">
              Hodim ma'lumotlarini tahrirlash
            </h4>
          </div>
          <form id="form1" @submit.prevent="editPost(editHodim.id)">
            <div class="modal-body">
              <div class="row mb-2">
                <div class="col-md-6">
                  <label> Ismi </label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Ism"
                    v-model="editHodim.name"
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
                      v-model="editHodim.phone"
                      required
                    />
                  </div>
                </div>
              </div>
              <div class="row mb-2">
                <div class="col-md">
                  <label> Role </label>
                  <select class="custom-select" v-model="editHodim.role">
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
                    v-model="editHodim.username"
                    required
                  />
                </div>
                <div class="col-md-6">
                  <label> Parol </label>
                  <input
                    type="password"
                    class="form-control"
                    placeholder="Password"
                    v-model="editHodim.password"
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
    <Anime :isloading="isloading" />
  </div>
</template>

<script>
import { instance } from "../Api";
import Anime from "../../Anime/Anime.vue";
export default {
  components: { Anime },
  data() {
    return {
      branch_id: "",
      access_token: localStorage.getItem("access_token"),
      role: localStorage.getItem("role"),
      isloading: false,
      hodimlar: [],
      yangiHodim: {
        name: "",
        username: "",
        password: "",
        role: "",
        branch_id: this.branch_id,
        phone: null,
      },
      editHodim: {
        name: "",
        username: "",
        password: "",
        role: "",
        branch_id: this.branch_id,
        phone: null,
      },
      search: "",
    };
  },
  methods: {
    postData() {
      if (this.role == "admin") {
        this.branch_id = this.$route.params.id;
      }
      if (this.role == "branch_admin") {
        this.branch_id = localStorage.getItem("branch_id");
      }
      this.yangiHodim.branch_id = this.branch_id;
      console.log(this.yangiHodim);
      instance.post("user_create", this.yangiHodim).then((res) => {
        console.log(res.data);
        window.location.reload();
      });
    },

    getData() {
      if (this.role == "admin") {
        this.branch_id = this.$route.params.id;
      }
      if (this.role == "branch_admin") {
        this.branch_id = localStorage.getItem("branch_id");
      }
      instance
        .get("branch_users/" + this.branch_id + "/unblock")
        .then((res) => {
          this.hodimlar = res.data;
        })
        .finally
        // this.isLoading = false
        ();
    },
    edit(hodim) {
      this.editHodim = {
        id: hodim.id,
        name: hodim.name,
        phone: hodim.phone,
        role: hodim.role,
        username: hodim.username,
        password: "none",
        branch_id: localStorage.getItem("branch_id"),
      };
      console.log(this.editHodim);
    },
    editPost(id) {
      instance.put("this_user_update/" + id, this.editHodim).then((res) => {
        console.log(res.data);
        if (res.status == 200) {
          window.location.reload();
          // document.$("#exampleModal").modal("hide")
        }
      });
    },
    block(id) {
      instance.put("this_user_block/" + id).then((res) => {
        console.log(res.data);
        if (res.status == 200) {
          // window.location.reload();
          this.getData();
        }
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
</style>