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
                      <div class="col-md-4">
                        <h4 class="card-title">{{ idx + 1 }}</h4>
                      </div>
                      <div class="col-md-6">
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
                      <div class="col"></div>
                      <div class="col-md-10">
                        <a :href="'/kmahsulotlar/' + kategoriya.id" class="btn btn-outline-success btn-block mt-3">
                          Mahsulotlar
                        </a>
                      </div>
                      <div class="col"></div>
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
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            Bekor qilish
          </button>
          <button
            type="button"
            class="btn btn-success"
            @click="postData"
            data-dismiss="modal"
          >
            Saqlash
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
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            Qaytish
          </button>
          <button
            type="button"
            class="btn btn-primary"
            v-on:click="putData(editT.id)"
            data-dismiss="modal"
          >
            Tasdiqlash
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- Modal end -->
</template>

<script>
import { instance } from "../Api";
import _ from "underscore";

export default {
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
    };
  },

  methods: {
    postData() {
      instance.post("category_create", this.kategoriyalar).then((response) => {
        this.getData();
        console.log(response.data);
        if (response.data == "Bunday kategoriya mavjud") {
          this.error = "birxill";
          this.getData();
        } else {
          this.error = "";
          this.getData();
        }

        if (response.data == "success") {
          this.error = "birxilpost";
          this.getData();
        }
      });
    },

    getData() {
      instance.get("all_categories").then((response) => {
        this.kategoriyas = response.data;
        console.log(response.data);
      });
    },

    editk(id, nomi) {
      this.editT = {
        id: id,
        name: nomi,
      };
    },

    putData(id) {
      instance
        .put("this_category_update/" + id, this.editT)
        .then((response) => {
          this.getData();
          if (response.data == "success") {
            this.error = "birxilput";
            this.getData();
          }

          if (response.data == "Bunday kategoriya mavjud") {
            this.error = "birxilput2";
            this.getData();
          }
        });
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
      return this.kategoriyas.filter((u) => {
        return u.name.toLowerCase().includes(this.search.toLowerCase());
      });
    },
  },
};
</script>

