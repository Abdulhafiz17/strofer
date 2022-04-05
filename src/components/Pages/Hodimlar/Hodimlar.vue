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
                        <span v-if="hodim.role == 'cashier'"> Kassir </span>
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <span class="fa fa-coins text-secondary"></span>
                      </th>
                      <td v-if="hodim.balance">
                        {{
                          Intl.NumberFormat({ style: "currency" }).format(
                            hodim.balance
                          )
                        }}
                        so'm
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="card-footer">
                <div class="row d-flex justify-content-around">
                  <div class="col-md" :style="role == 'admin' ? 'width: 100%' : hodim.role == 'branch_admin' ? 'width: 100%' : 'width: 84px'">
                    <button
                      class="btn btn-block btn-outline-danger"
                      @click="block(hodim.id)"
                    >
                      <i class="fa fa-user-slash"></i>
                    </button>
                  </div>
                  <div class="col-md" style="width: 84px" v-if="role !== 'admin' && hodim.role !== 'branch_admin'">
                    <button
                      class="btn btn-block btn-outline-success"
                      data-toggle="modal"
                      data-target="#payToUser"
                      @click="payUser.user_id = hodim.id"
                    >
                      <span class="fa fa-coins" />
                    </button>
                  </div>
                  <div class="col-md" style="width: 84px" v-if="role !== 'admin' && hodim.role !== 'branch_admin'">
                    <router-link
                      :to="'/hodimHaqida/' + hodim.id"
                      class="btn btn-block btn-outline-info"
                    >
                      <i class="fa fa-info"></i>
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
          <form id="form1" @submit.prevent="postData()">
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
                    v-if="role !== 'admin'"
                  >
                    <option value="seller">Sotuvchi</option>
                    <option value="cashier">Kassir</option>
                  </select>
                  <select
                    class="custom-select"
                    v-model="yangiHodim.role"
                    required
                    v-else
                  >
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
                    <option value="seller">Sotuvchi</option>
                    <option value="kassir">Kassir</option>
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

    <div class="modal fade" id="payToUser">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4>Hodimga pul berish</h4>
          </div>
          <form @submit.prevent="payToUser(payUser)">
          <div class="modal-body">
            <div class="row mb-2">
              <div class="input-group input-group-sm mb-2">
                <span id="tooltiptext"> {{ sum }} </span>
                <input
                  id="moneyUser"
                  type="number"
                  step="any"
                  class="form-control"
                  placeholder="Summa"
                  min="0"
                  v-model="payUser.price"
                  required
                  @keyup="currency(this)"
                />
                <div class="input-group-append">
                  <div class="input-group-text">
                    {{ payUser.currency_id }}
                  </div>
                </div>
              </div>
              <div class="input-group input-group-sm">
                <textarea
                  type="textarea"
                  class="form-control"
                  placeholder="Izoh"
                />
              </div>
              <div class="row">
              </div>
            </div>
            </div>
            <div class="modal-footer">
              <button type="submit" class="btn btn-outline-primary">
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
    <isloading :isloading="isloading" :message="errorr" />
  </div>
</template>

<script>
import { instance } from "../Api";
import isloading from "../../Anime/Anime.vue";
import swal from "sweetalert";
export default {
  components: { isloading },
  data() {
    return {
      branch_id: "",
      access_token: localStorage.getItem("access_token"),
      role: localStorage.getItem("role"),
      isloading: true,
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
      payUser: {
        user_id: "",
        price: null,
        currency_id: "so'm",
        comment: "",
      },
      search: "",
      errorr: "",
      sum: null,
    };
  },
  methods: {
    postData() {
      this.isloading = true;
      if (this.role == "admin") {
        this.branch_id = this.$route.params.id;
      }
      if (this.role == "branch_admin") {
        this.branch_id = localStorage.getItem("branch_id");
      }
      this.yangiHodim.branch_id = this.branch_id;
      console.log(this.yangiHodim);
      instance
        .post("user_create", this.yangiHodim)
        .then((res) => {
          console.log(res.data);
          if (res.status == 200) {
            if (res.data == "success") {
              swal({
                icon: "success",
                timer: 1000
              }).then(() => {
                window.location.reload();
              });
            } else if (
              (res.data = "Bu username bilan avval ham ro`yxatga olingan")
            ) {
              swal({
                icon: "warning",
                title: "Bunday foydalanuvchi nomiga ega hodim mavjud !",
                closeOnClickOutside: false,
                closeOnEsc: false,
              }).then(() => {
                window.location.reload();
              });
            }
          }
        })
        .finally((this.isloading = false))
        .catch((err) => {
          this.isloading = false;
          this.errorr = err.message;
        });
    },
    getData() {
      this.hodimlar = [];
      if (this.role == "admin") {
        this.branch_id = this.$route.params.id;
      }
      if (this.role == "branch_admin") {
        this.branch_id = localStorage.getItem("branch_id");
      }
      instance
        .get("branch_users/" + this.branch_id + "/false")
        .then((response) => {
          // console.log(response.data)
          this.hodimlar = response.data
        })
        .catch((err) => {
          this.isloading = false;
          this.errorr = err.message;
        })
        .finally((this.isloading = false))
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
      this.isloading = true;
      instance
        .put("this_user_update/" + id, this.editHodim)
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
    block(id) {
      this.isloading = true;
      instance
        .put("this_user_block/" + id)
        .then((res) => {
          console.log(res.data);
          if (res.status == 200) {
            swal({icon: "success", timer: 800}).then(() => {
              this.getData();
            })
          }
        })
        .catch((err) => {
          this.isloading = false;
          this.errorr = err.message;
        })
        .finally((this.isloading = false))
    },
    currency() {
      let input = document.querySelector("#moneyUser")
      let number = Number(input.value)
      this.sum = Intl.NumberFormat().format(number)
    },
    payToUser(object) {
      this.isloading = true
      instance
        .post("pay_for_user/" + object.user_id, object)
        .then((res) => {
          console.log(res.data);
          if (res.status == 200) {
            swal({
              icon: "success",
              timer: 1000,
            }).then(() => {
              window.location.reload();
            })
          }
        })
        .catch((err) => {
          this.isloading = false;
          this.errorr = err.message;
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
    if (this.role == "admin") {
      this.yangiHodim.role = "branch_admin"
    }
  },
};
</script>

<style scoped>

#tooltiptext {
  /* visibility: hidden; */
  display: none;
  width: auto;
  background-color: rgba(255, 255, 255, 0.7);
  color: #000;
  text-align: center;
  border: 1px solid gray;
  border-radius: 5px;
  padding: 5px 3px;
  /* box-shadow: 0.1px 0.1px 4px 0.1px; */
  
  /* Position the tooltip */
  position: absolute;
  z-index: 1;
  bottom: 100%;
  left: 50%;
  margin-left: -60px;
  margin-bottom: 5px;
}

input[id="moneyUser"]:active #tooltiptext {
  /* visibility: visible; */
  display: block !important;
}

</style>