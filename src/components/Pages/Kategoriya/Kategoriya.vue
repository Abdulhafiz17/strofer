<template>
  <div class="container-fluid">
    <div class="card shadow">
      <div class="card-header">
        <div class="row">
          <div class="col-md-4"><h3>Kategoriyalar</h3></div>
          <div class="col-md-4">
            <input
              type="search"
              class="form-control"
              v-model="search"
              placeholder="qidiruv"
            />
          </div>
          <div class="col-md-4">
            <button
              type="button"
              class="btn btn-outline-success btn-block"
              data-toggle="modal"
              data-target="#exampleModal"
            >
              Kategoriya qo'shish
            </button>
          </div>
        </div>
      </div>
      <div class="card-body">
        <!-- alert -->
        <div class="row mt-2" v-if="error === 'birxill'">
          <div class="col-md">
            <div class="alert alert-warning" role="alert">
              <strong>Bunday kategoriya mavjud</strong>
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

        <div class="row mt-2" v-if="error === 'birxilput2'">
          <div class="col-md">
            <div class="alert alert-danger" role="alert">
              <strong>Bunday kategoriya mavjud</strong>
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
        <!-- alert end -->
        <div class="row">
          <div
            class="col-md-4 mt-3"
            v-for="(kategoriya, idx) in searchHandler"
            :key="kategoriya"
          >
            <div class="card shadow">
              <div class="card-body">
                <div class="row">
                  <div class="col-md-12">
                    <div class="row">
                      <div class="col-md-2">
                        <h4 class="card-title">{{ idx + 1 }}</h4>
                      </div>
                      <div class="col-md-8 text-center">
                        <h4>{{ kategoriya.name }}</h4>
                      </div>
                      <div class="col-md-2">
                        <button
                          class="btn btn-warning float-right btn-sm"
                          data-toggle="modal"
                          data-target="#exampleModal2"
                          @click="editk(kategoriya.id, kategoriya.name)"
                        >
                          <i class="fa fa-edit"></i>
                        </button>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col">
                        <router-link
                          :to="'/kmahsulotlar/' + kategoriya.id"
                          class="btn btn-outline-success btn-block mt-3"
                        >
                          Mahsulotlar
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
    </div>
  </div>

  <!-- Modal qo'shish -->
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
            Kategoriya qo'shish
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
          <label>Nomi:</label>
          <input
            type="text"
            class="form-control"
            v-model="kategoriyalar.name"
          />
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-success"
            @click="postData"
            data-dismiss="modal"
          >
            Saqlash
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

  <!-- Modal tahrirlash-->
  <div
    class="modal fade"
    id="exampleModal2"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel2"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel2">Tahrirlash</h5>
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
          <label>Nomi:</label>
          <input type="text" class="form-control" v-model="editT.name" />
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-success"
            v-on:click="putData(editT.id)"
            data-dismiss="modal"
          >
            Tasdiqlash
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
  <isloading :isloading="isloading" :message="errorr" />
</template>

<script>
import { instance } from "../Api";
import _ from "underscore";
import isloading from "../../Anime/Anime.vue";
import swal from 'sweetalert';

export default {
  components: { isloading },
  data() {
    return {
      kategoriyalar: {
        name: "",
      },
      searchQuery: null,
      kategoriyas: [],
      editT: [],

      search: "",
      kategoriyass: [],
      errorr: "",
      isloading: false,
    };
  },

  methods: {
    postData() {
      this.isloading = true;
      instance
        .post("category_create", this.kategoriyalar)
        .then((response) => {
          this.getData();
          console.log(response.data);
          if (response.data == "Bunday kategoriya mavjud") {
            swal({
              icon: "warning",
              title: "Bunday kategoriya mavjud !"
            }).then(() => {
              this.getData();
            })
          } else if (response.data == "success") {
            swal({icon: "success", timer: 1000}).then(() => {
              this.getData();
            })
          }
        })
        .catch((err) => {
          this.isloading = false;
          this.errorr = err.message;
        })
        .finally((this.isloading = false));
    },

    getData() {
      this.isloading = true;
      instance
        .get("all_categories")
        .then((response) => {
          this.kategoriyas = response.data;
          console.log(response.data);
        })
        .finally((this.isloading = false))
        .catch((err) => {
          this.isloading = false;
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
      console.log(this.editT)
      this.isloading = true;
      instance
        .put("this_category_update/" + id, this.editT)
        .then((response) => {
          this.getData();
          if (response.data == "success") {
            swal({icon: "success", timer: 1000}).then(() => {
              this.getData();
            })
          } else if (response.data == "So'rovda xatolik") {
            swal({
              icon: "warning",
              title: "Bunday kategoriya mavjud !"
            }).then(() => {
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
  },
  mounted() {
    this.getData();
  },
  computed: {
    sorted() {
      return this.kategoriyas ? _.sortBy(this.kategoriyas, "name") : [];
    },
    searchHandler() {
      if (this.kategoriyas) {
        return this.kategoriyas.filter((u) => {
          return u.name.toLowerCase().includes(this.search.toLowerCase());
        });
      }
    },
  },
};
</script>

