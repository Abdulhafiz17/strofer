<template>
  <div class="container-fluid">
    <div class="card shadow">
      <div class="card-body">
        <div class="row">
          <div class="col-md-4">
            <h3>Chiqim</h3>
          </div>
          <div class="col-md-4">
            <button
              type="button"
              class="btn btn-outline-success btn-sm btn-block"
              data-toggle="modal"
              data-target="#exampleModal"
            >
              <span class="fa fa-circle-plus"></span> Doimiy chiqim turi
              qo'shish
            </button>
          </div>
          <div class="col-md-2">
            <button
              class="btn btn-outline-success btn-sm btn-block"
              data-toggle="modal"
              data-target="#exampleModal2"
            >
              <span class="fa fa-coins"></span>
            </button>
          </div>
          <div class="col-md-2">
            <a
              href="/Chiqimlartarixi"
              class="btn btn-outline-success btn-sm btn-block"
              ><span class="fa fa-clock-rotate-left"></span
            ></a>
          </div>
        </div>

        <div class="row">
          <div class="col-md-4 mt-3" v-for="card in cards" :key="card">
            <div class="card shadow">
              <div class="card-body">
                <div class="row">
                  <div class="col-md-1"></div>
                  <div class="col-md-10">
                    <h3 class="card-title text-center">
                      <h3>
                        <button
                          class="btn btn-warning float-right btn-sm ml-3"
                          data-toggle="modal"
                          data-target="#example"
                          @click="editk(card.id, card.name)"
                        >
                          <i class="fa fa-edit"></i>
                        </button>
                      </h3>
                      {{ card.name }}
                      <a
                        :href="'/idboyichachiqim/' + card.id"
                        class="btn btn-success float-right btn-sm mb-2"
                      >
                        <i class="fa fa-clock-rotate-left"></i>
                      </a>
                    </h3>
                    <!-- input input-group -->
                    <div class="input-group">
                      <div class="input-group">
                        <input
                          type="number"
                          :id="'price' + card.id"
                          placeholder="summa"
                          class="form-control"
                          aria-label="Text input with segmented dropdown button"
                        />
                        <div class="input-group-append">
                          <div class="input-group-text">so'm</div>
                        </div>
                      </div>

                      <!-- input input-group end -->
                      <div class="input-group mt-3">
                        <textarea
                          class="form-control"
                          aria-label="With textarea"
                          placeholder="izoh"
                          :id="'comment' + card.id"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                  <div class="col">
                    <div class="card-footer">
                      <button
                        class="btn btn-block btn-outline-success"
                        @click.prevent="chiqimidpost(card.id)"
                      >
                        Tasdiqlash
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal doimiy chiqim qoshish -->
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
              Doimiy chiqim turi qo'shish
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
            <input
              class="form-control"
              type="text"
              placeholder="Doimiy chiqim turi qo'shish"
              v-model="doimiychiqim.name"
            />
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-success"
              @click="doimiychiqimpost"
              data-dismiss="modal"
            >
              Tasdiqlash
            </button>
            <button
              type="button"
              class="btn btn-outline-danger"
              data-dismiss="modal"
            >
              Bekor qilish
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal end -->

    <!-- Modal bir marta chiqim -->
    <div
      class="modal fade"
      id="exampleModal2"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              Bir martalik chiqim qilish
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
            <div class="input-group">
              <input
                type="number"
                class="form-control"
                aria-label="Text input with dropdown button"
                placeholder="summa"
                v-model="birmartachiqim.price"
              />
              <select
                v-model="birmartachiqim.currency_id"
                class="custom-select"
              >
                <option value="dollar">dollar</option>
                <option value="so'm">so'm</option>
              </select>
            </div>

            <div class="input-group mt-3">
              <textarea
                class="form-control"
                aria-label="With textarea"
                placeholder="izoh"
                v-model="birmartachiqim.comment"
              ></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-success"
              @click="birmartachiqimpost"
            >
              Tasdiqlash
            </button>
            <button
              type="button"
              class="btn btn-outline-danger"
              data-dismiss="modal"
            >
              Bekor qilish
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal end -->

    <!-- Modal tahrirlash name -->
    <div
      class="modal fade"
      id="example"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModal"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModal">Tahrirlash</h5>
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
            <label>Nomi</label>
            <input type="text" class="form-control" v-model="editT.name" />
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
  </div>
  <isloading :isloading="isloading" :message="errorr" />
</template>
<script>
import { instance } from "../Api";
import isloading from "../../Anime/Anime.vue";
import swal from "sweetalert";
export default {
  components: { isloading },
  data() {
    return {
      birmartachiqim: {
        price: null,
        currency_id: "",
        comment: "",
      },
      doimiychiqim: {
        name: "",
      },
      chiqimid: {
        price: null,
        currency_id: "",
        comment: "",
      },
      kurs: [],
      cards: [],
      kurscard: [],
      editT: [],
      chiqimData: [],
      errorr: "",
      isloading: false,
    };
  },
  methods: {
    birmartachiqimpost() {
      this.isloading = true;
      instance
        .post("pay_for_variable_expense", this.birmartachiqim)
        .then((response) => {
          // this.getData();
          console.log(response.data);
          if (response.status == 200) {
            swal({
              icon: "success",
            }).then(() => {
              window.location.reload();
            });
          }
          this.isloading = false;
        })
        .catch((err) => {
          this.errorr = err.message;
          if (err.message == "Request failed with status code 422") {
            swal({
              icon: "warning",
              title: "Ma'lumot to'liq emas !",
            });
          }
        })
        .finally((this.isloading = false));
    },
    doimiychiqimpost() {
      this.isloading = true;
      if (this.doimiychiqim.name == "") {
        swal({
          icon: "warning",
          title: "Ma'lumot to'liq emas !",
        });
        this.isloading = false;
      } else {
        instance
          .post("create_fixed_expense", this.doimiychiqim)
          .then((response) => {
            console.log(response.data);
            if (response.data == "success") {
              swal({ icon: "success" }).then(() => {
                this.getData();
              });
            }
          })
          .catch((err) => {
            this.errorr = err.message;
          });
      }
      // if (this.doimiychiqim == "Bunday chiqim turi mavjud") {
      //   alert("Bunday chiqim turi mavjud");
      // } else {
      //   instance
      //     .post("create_fixed_expense", this.doimiychiqim)
      //     .then((response) => {
      //       console.log(response.data);
      //       this.getData();
      //       // window.location.reload();
      //       if (response.data == "success") {
      //         this.errorr = alert("Qo'shildi");
      //         this.getData();
      //       }
      //     })
      //     .finally((this.isloading = false));
      // }
    },
    chiqimidpost(id) {
      this.chiqimid = {
        price: Number(document.getElementById("price" + id).value),
        currency_id: "so'm",
        comment: String(document.getElementById("comment" + id).value),
      };
      if (this.chiqimid.price !== null && this.chiqimid.price !== 0) {
        this.isloading = true;
        console.log(id, this.chiqimid);
        instance
          .post("pay_for_fixed_expense/" + id, this.chiqimid)
          .then((response) => {
            swal({
              icon: "success",
            });
            document.getElementById("price" + id).value = null;
            document.getElementById("comment" + id).value = "";
          })
          .catch((err) => {
            this.errorr = err.message;
          })
          .finally((this.isloading = false));
      } else {
        swal({
          icon: "warning",
          title: "Ma'lumot to'liq emas !",
        });
      }
    },
    getData() {
      this.isloading = true;
      instance
        .get("all_fixed_expenses")
        .then((response) => {
          this.cards = response.data;
          console.log(response.data);
        })
        .finally((this.isloading = false))
        .catch((err) => {
          this.errorr = err.message;
        });
    },
    editk(id, nomi) {
      this.editT = {
        id: id,
        name: nomi,
      };
    },
    putData(id) {
      this.isloading = true;
      instance
        .put("update_this_fixed_expense/" + id, this.editT)
        .then((response) => {
          if (response.status == 200) {
            swal({ icon: "success" }).then(() => {
              this.getData();
            });
          }
        })
        .catch((err) => {
          this.errorr = err.message
        })
        .finally((this.isloading = false));
    },
  },
  mounted() {
    console.clear();
    this.getData();
  },
};
</script>