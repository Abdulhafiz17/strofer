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
              type="search"
              class="form-control"
              v-model="search"
              placeholder="Qidiruv"
            />
          </div>
          <div class="col-md">
            <button
              data-toggle="modal"
              data-target="#modal1"
              class="btn btn-outline-success float-right"
            >
              <span class="fa fa-user-plus"></span> Ta'minotchi qo'shish
            </button>
          </div>
        </div>
      </div>
      <div class="card-body">
        <div class="row">
          <div
            class="col-md-4 mb-2"
            v-for="taminotchi in filteredCards || []"
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
                              taminotchi.phone,
                              taminotchi.address
                            )
                          "
                          data-toggle="modal"
                          data-target="#modal3"
                        >
                          <span class="fa fa-edit"></span>
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <th><span class="fa fa-phone text-secondary"></span></th>
                      <td>
                        <a :href="'tel:+998' + taminotchi.phone">
                          +998{{ taminotchi.phone }}
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <th><span class="fa fa-coins text-secondary"></span></th>
                      <td>
                        <span
                          v-for="balance in taminotchi.balances"
                          :key="balance"
                          :class="balance.balance > 0 ? 'text-danger' : 'text-success'"
                        >
                          <!-- :class="balance != 0? 'text-success': 'text-danger'" -->
                          {{
                            Intl.NumberFormat({ style: "currency" }).format(
                              balance.balance
                            )
                          }}
                          {{ balance.currency }} <span class="fa fa-coin" />
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <th><span class="fa fa-map-marker text-secondary" /></th>
                      <td>{{ taminotchi.address }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="card-footer text-center">
                <div class="row d-flex justify-content-around">
                  <div class="col-md" style="width: 80px">
                    <router-link
                      class="btn btn-block btn-outline-success mt-2"
                      :to="'/taminotOlish/' + taminotchi.id"
                    >
                      <span class="fa fa-box"></span>
                    </router-link>
                  </div>
                  <div class="col-md" style="width: 80px" v-if="taminotchi.balance_sum !== 0">
                    <button
                      class="btn btn-block btn-outline-primary mt-2"
                      data-toggle="modal"
                      data-target="#modal2"
                      @click="tolov.id = taminotchi.id"
                    >
                      <span class="fa fa-coins"></span>
                    </button>
                  </div>
                  <div class="col-md" style="width: 80px">
                    <router-link
                      class="btn btn-block btn-outline-warning mt-2"
                      :to="'/tarix/' + taminotchi.id"
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
          <div class="modal-body">
            <div class="px-1 d-felx justify-content-around">
              <input
                type="text"
                id=""
                class="form-control"
                placeholder="Ismi"
                v-model="yangiTaminotchi.name"
                required
              />
              <div class="input-group my-2">
                <div class="input-group-prepend">
                  <span class="input-group-text">+998</span>
                </div>
                <input
                  type="phone"
                  id=""
                  class="form-control"
                  placeholder="Tel"
                  maxlength="9"
                  minlength="9"
                  v-model="yangiTaminotchi.phone"
                  required
                />
              </div>
              <input
                type="text"
                class="form-control"
                placeholder="Manzil"
                v-model="yangiTaminotchi.address"
                required
              />
            </div>
          </div>
          <div class="modal-footer">
            <button @click="postData" data-dismiss="modal" class="btn btn-outline-primary">
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
        <form @submit.prevent="payToMarket()">
          <div class="modal-body">
            <div class="row px-3">
              <div class="input-group">
                <input
                  type="number"
                  min="0"
                  id=""
                  step="any"
                  class="form-control"
                  placeholder="Summa"
                  v-model="tolov.price"
                  required
                />
                <select
                  class="custom-select"
                  v-model="tolov.currency_id"
                  required
                >
                  <option value="dollar">dollar</option>
                  <option value="so'm">so'm</option>
                </select>
              </div>
              <textarea
                class="form-control mt-2"
                id=""
                cols="70"
                rows="2"
                placeholder="Izoh"
                v-model="tolov.comment"
              />
            </div>
          </div>
          <div class="modal-footer">
            <button type="submit" class="btn btn-outline-primary">
              <span class="far fa-check-circle" /> Tasdiqlash
            </button>
            <button class="btn btn-outline-danger" data-dismiss="modal">
              <span class="far fa-circle-xmark"></span> Bekor qilish
            </button>
            <input type="hidden" id="modalFooter" data-dismiss="modal" />
          </div>
        </form>
      </div>
    </div>
  </div>

  <div class="modal fade" id="modal3">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h3>{{ editTaminotchi.name }} ma'lumotlarini tahrirlash</h3>
        </div>
          <div class="modal-body">
            <div class="px-1 d-felx justify-content-around">
              <input
                type="text"
                id=""
                class="form-control"
                placeholder="Ismi"
                v-model="editTaminotchi.name"
                required
              />
              <div class="input-group my-2">
                <div class="input-group-prepend">
                  <span class="input-group-text">+998</span>
                </div>
                <input
                  type="phone"
                  id=""
                  class="form-control"
                  placeholder="Tel"
                  maxlength="9"
                  minlength="9"
                  v-model="editTaminotchi.phone"
                  required
                />
              </div>
              <input
                type="text"
                class="form-control"
                placeholder="Manzil"
                v-model="editTaminotchi.address"
                required
              />
            </div>
          </div>
          <div class="modal-footer">
            <button
              @click="editData(editTaminotchi.id)"
              data-dismiss="modal"
              class="btn btn-outline-primary"
            >
              <span class="fa fa-circle-check"></span> Tasdiqlash
            </button>
            <button class="btn btn-outline-danger" data-dismiss="modal">
              <span class="fa fa-circle-xmark"></span> Bekor qilish
            </button>
          </div>
      </div>
    </div>
  </div>
  <isloading :isloading="isloading" :message="errorr" />
</template>

<script>
import swal from "sweetalert";
import isloading from "../../Anime/Anime.vue";
import { instance } from "../Api";
export default {
  components: { isloading },
  data() {
    return {
      taminotchilar: [],
      yangiTaminotchi: {
        name: "",
        phone: null,
        address: "",
      },
      editTaminotchi: {
        id: "",
        name: "",
        phone: null,
        address: "",
      },
      tolov: {
        id: "",
        price: null,
        currency_id: "so'm",
        comment: "",
      },
      kurslar: [],
      search: "",
      isloading: true,
      errorr: [],
    };
  },
  methods: {
    getData() {
      instance
        .get("all_markets")
        .then((res) => {
          console.log(res.data)
          this.taminotchilar = res.data
          this.isloading = false
        })
        .catch((err) => {
          this.isloading = false;
          this.errorr = err.message;
        })
    },
    postData() {
      if (this.yangiTaminotchi.name.length == 0 || this.yangiTaminotchi.address.length == 0) {
        if (this.yangiTaminotchi.phone == 0 || this.yangiTaminotchi.phone == null) {
          swal({
            icon: "warning",
            title: "Ma'lumot to'liq emas !"
          })
        }
      } else {
        this.isloading = true;
        instance
          .post("market_create", this.yangiTaminotchi)
          .then((res) => {
            console.log(res.data);
            if (res.status == 200) {
              swal({ icon: "success", timer: 1000 }).then(() => {
                this.getData();
                // window.location.reload();
                this.yangiTaminotchi = {
                  name: "",
                  phone: null,
                  address: "",
                }
              });
            }
          })
          .catch((err) => {
            this.isloading = false;
            this.errorr = err.message;
          })
          .finally((this.isloading = false));
      }
    },
    edit(id, name, phone, address) {
      this.editTaminotchi = {
        id: id,
        name: name,
        phone: phone,
        address: address,
      };
    },
    editData(id) {
      this.editTaminotchi.phone = Number(this.editTaminotchi.phone)
      if (this.editTaminotchi.name.length !== 0 && this.editTaminotchi.phone !== 0 && this.editTaminotchi.address.length !== 0) {
        this.isloading = true;
        instance
          .put("this_market_update/" + id, this.editTaminotchi)
          .then((res) => {
            if (res.status == 200) {
              swal({ icon: "success", timer: 1000 }).then(() => {
                // window.location.reload();
                this.getData()
              });
            }
          })
          .catch((err) => {
            this.isloading = false;
            this.errorr = err.message;
          })
          .finally((this.isloading = false));
      } else {
        swal({
          icon: "warning",
          title: "Ma'lumot to'liq emas !"
        })
      }
    },
    payToMarket() {
      this.isloading = true;
      instance
        .post("pay_to_market/" + this.tolov.id, this.tolov)
        .then((res) => {
          console.log(res.data);
          if (res.status == 200) {
            document.querySelector("#modalFooter").click()
            swal({
              icon: "success",
              timer: 1000
            }).then(() => {
              this.getData()
              this.tolov = {
                id: "",
                price: null,
                currency_id: "so'm",
                comment: "",
              }
            })
          } else if (res.status == 400) {
            swal({
              icon: "warning",
              title: "Ushbu ta'minotchidan hali mahsulot olinmagan",
            });
          }
        })
        .catch((err) => {
          this.isloading = false;
          this.errorr = err.message;
        })
        .finally((this.isloading = false))
    },
  },
  computed: {
    filteredCards: function () {
      if (this.taminotchilar.length > 0) {
        return this.taminotchilar.filter((taminotchis) => {
          return taminotchis.name.toLowerCase().match(this.search.toLowerCase());
        });
      }
    },
  },
  mounted() {
    console.clear();
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

<style scoped>
</style>