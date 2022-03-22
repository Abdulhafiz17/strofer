<template>
  <div class="container-fluid">
    <div class="card shadow">
      <div class="card-header">
        <form @submit.prevent="postData">
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
                    <input
                      type="number"
                      class="form-control"
                      aria-required="true"
                      v-model="yangikurs.price"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-3 mb-2">
              <label>Valyuta: </label>
              <input
                type="text"
                class="form-control"
                aria-required="true"
                v-model="yangikurs.currency"
              />
            </div>
            <div class="col-md-4 mb-2">
              <label class=""> <span class="fa fa-coin" /> </label>
              <button
                type="submit"
                class="btn btn-sm btn-block btn-outline-success"
              >
                <span class="fas fa-circle-check"></span> Tasdiqlash
              </button>
            </div>
          </div>
        </form>
      </div>

      <div class="card-body">
        <!-- alert -->
        <div class="row mt-2" v-if="error === 'birxil'">
          <div class="col-md">
            <div class="alert alert-danger" role="alert">
              <strong>Bunday valyuta avval ham ro`yxatga olingan !!!</strong>
            </div>
          </div>
        </div>

        <div class="row mt-2" v-if="error === 'birxilpost'">
          <div class="col-md">
            <div class="alert alert-success" role="alert">
              <strong>Tasdiqlandi</strong>
            </div>
          </div>
        </div>

        <div class="row mt-2" v-if="error === 'birxilput'">
          <div class="col-md">
            <div class="alert alert-success" role="alert">
              <strong>Tahrirlandi</strong>
            </div>
          </div>
        </div>

        <div class="row mt-2" v-if="error === 'birxilget'">
          <div class="col-md">
            <div class="alert alert-danger" role="alert">
              <strong>Bunday valyuta mavjud</strong>
            </div>
          </div>
        </div>
        <!-- alert end -->
        <div class="row">
          <div class="col-md">
            <div class="table-responsive mt-3">
              <table class="table table-bordered table-hover text-center">
                <thead>
                  <tr>
                    <th class="col-md-0">valyuta</th>
                    <th class="col-md-8">Narxi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="kurs in kurslar" :key="kurs">
                    <th>{{ kurs.currency }}</th>
                    <td>
                      {{ kurs.price }}
                      <button
                        class="btn btn-sm btn-outline-warning float-right"
                        data-toggle="modal"
                        data-target="#exampleModal"
                        @click="edit(kurs.currency, kurs.price, kurs.id)"
                      >
                        <span class="fa fa-edit"></span>
                      </button>
                    </td>

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
                            <h5 class="modal-title" id="exampleModalLabel">
                              Tahrirlash
                            </h5>
                            <button
                              type="button"
                              class="close"
                              data-dismiss="modal"
                              aria-label="Close"
                            >
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div class="modal-body">
                            <label>Valyuta</label>
                            <input
                              type="text"
                              class="form-control"
                              v-model="editT.currency"
                            /><br />

                            <label>Narx</label>
                            <input
                              type="text"
                              class="form-control"
                              v-model="editT.price"
                            />
                          </div>
                          <div class="modal-footer">
                            <button
                              type="button"
                              class="btn btn-outline-success"
                              data-dismiss="modal"
                              v-on:click="putData(editT.id)"
                            >
                              Tahrirlash
                            </button>
                            <button
                              type="button"
                              class="btn btn-outline-danger"
                              data-dismiss="modal"
                            >
                              Qaytish
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- Modal end -->
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
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
  <isloading :isloading="isloading" />
</template>

<script>
import isloading from "../../Anime/Anime.vue";
import { instance } from "../Api";
export default {
  components: { isloading },
  data() {
    return {
      yangikurs: {
        currency: "",
        price: null,
      },
      error: "",
      branch_id: localStorage.getItem("branch_id"),
      access_token: localStorage.getItem("access_token"),

      search: "",
      kurslar: [],
      editT: [],
      isloading: false,
    };
  },
  methods: {
    postData() {
      this.isloading = true;
      instance
        .post("currency_create", this.yangikurs)
        .then((response) => {
          this.getData();
          console.log(response.data);
          if (response.data == "Bunday valyuta avval ham ro`yxatga olingan") {
            this.error = "birxil";
          } else {
            this.error = "";

            if (response.data == "success") {
              this.error = "birxilpost";
            } else {
              this.error = "";
            }
          }
        })
        .finally((this.isloading = false));
    },

    getData() {
      this.isloading = true;
      instance
        .get("all_currencies")
        .then((response) => {
          this.kurslar = response.data;
        })
        .finally((this.isloading = false));
    },

    edit(valyuta, narx, id) {
      this.editT = {
        id: id,
        price: narx,
        currency: valyuta,
      };
    },

    putData(id) {
      this.isloading = true;
      instance
        .put("this_currency_update/" + id, this.editT)
        .then((response) => {
          this.getData();

          console.log(response.data);
          if (response.data == "success") {
            this.error = "birxilput";
          }

          if (response.data == "Bunday valyuta mavjud") {
            this.error = "birxilget";
          }
        })
        .finally((this.isloading = false));
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<style>
</style>