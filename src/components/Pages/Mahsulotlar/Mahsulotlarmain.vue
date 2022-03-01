<template>
  <div class="container-fluid">
    <button class="btn btn-outline-warning btn-sm mb-2" @click="back">
      <span class="fa fa-arrow-left"></span> Orqaga
    </button>
    <div class="card shadow border-warning">
      <div class="card-header">
        <div class="row">
          <div class="col-md">
            <button
              type="button"
              data-toggle="modal"
              data-target="#modal2"
              class="btn btn-outline-success float-left"
            >
              Kategoria qo'shish
            </button>
          </div>
          <div class="col-md-3">
            <input
              type="text"
              class="form-control my-2"
              v-model="search"
              placeholder="Qidiruv"
            />
          </div>
          <div class="col-md">
            <button
              type="button"
              data-toggle="modal"
              data-target="#modal1"
              class="btn btn-outline-primary float-right"
            >
              Mahulot qo'shish
            </button>
          </div>
        </div>
      </div>
      <div class="card-body">
        <div class="row">
          <!-- <div
            class="col-md-3 mb-3"
            v-for="taminotchi in filteredCards"
            :key="taminotchi.name"
          >
            <div class="card border-primary">
              <img
                src="../../../assets/apple.jpg"
                class="card-img-top"
                alt="..."
              />
              <div class="card-body">
                <h5 class="card-title">{{ taminotchi.name }}</h5>
                <a href="ish" class="btn btn-outline-primary">Jarayon</a>
              </div>
            </div>
          </div> -->
          <div
            class="col-md-3 mb-3"
            v-for="taminotchi in filteredCards"
            :key="taminotchi.name"
          >
            <div :class="taminotchi.is_folder ? 'card border-success' : 'card border-primary' ">
              <img
                 v-bind:src="`https://oqsaroy.crud.uz/assets/images/products/${taminotchi.image}`" 
                class="card-img-top"
                alt="..."
              />
              <div class="card-body">
                <div class="row">
                  <div class="col-md">
                    <h5 class="card-title">{{ taminotchi.name }}</h5>
                  </div>
               
                </div>
                <div class="row">
                  <div class="col-md">
                    <a
                      :href="taminotchi.is_folder? `/mahsulotlarmain/${taminotchi.id}` : `/ish/${taminotchi.id}` "
                      :class="taminotchi.is_folder ? 'btn btn-outline-success btn-block mt-2' : 'btn btn-outline-primary btn-block mt-2' "
                    >
                    <span v-if="taminotchi.is_folder">
                      Kirish
                    </span>
                    <span v-else>
                      Jarayon
                    </span>
                    </a>
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
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content border-warning">
        <div class="modal-header">
          <h3>Mahsulot qo'shish</h3>
        </div>
        <div class="modal-body">
          <div class="col-md-6">
            <form runat="server">
              <label for="imgInp" class="btn btn-outline-warning">
                Rasim yuklah
                <input
                  type="file"
                  class="inputFile"
                  id="imgInp"
                  @change="image"
                  @click="upload"
                />
              </label>

              <img
                id="blah"
                src="#"
                alt="your image"
                width="200"
                height="200"
                v-if="img"
              />
            </form>
          </div>
          <input
            type="text"
            name=""
            id=""
            class="form-control border-warning mt-5"
            placeholder="Nomi"
          />
        </div>

        <div class="modal-footer">
          <button class="btn btn-outline-primary">
            <span class="far fa-check-circle"></span> Tasdiqlash
          </button>
          <button class="btn btn-outline-danger" data-dismiss="modal">
            <span class="far fa-circle-xmark"></span> Bekor qilish
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="modal fade" id="modal2">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content border-warning">
        <div class="modal-header">
          <h3>Kategoriya qo'shish</h3>
        </div>
        <div class="modal-body">
          <div class="col-md-6">
            <form runat="server">
              <label for="imgInp" class="btn btn-outline-warning">
                Rasim yuklash
                <input
                  type="file"
                  class="inputFile"
                  id="imgInp"
                  @change="image"
                  @click="upload"
                />
              </label>
              <img
                id="blah2"
                src="#"
                alt="your image"
                width="200"
                height="200"
                v-if="img2"
              />
            </form>
          </div>
          <input
            type="text"
            name=""
            id=""
            class="form-control border-warning mt-5"
            placeholder="Nomi"
          />
        </div>

        <div class="modal-footer">
          <button class="btn btn-outline-primary">
            <span class="far fa-check-circle"></span> Tasdiqlash
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
import axios from "axios";

export default {
  data: () => {
    return {
      img: false,
      taminotchis: [],
      search: "",
    };
  },
  methods: {
    upload() {
      this.img = true;
    },
    image() {
      let imgInp = document.getElementById("imgInp");
      let blah = document.getElementById("blah");
      const [file] = imgInp.files;
      if (file) {
        blah.src = URL.createObjectURL(file);
      }
    },
      getData() {
      const TOKEN = localStorage.getItem("access_token");
      const BASEURL = "https://oqsaroy.crud.uz/products/"
      axios
        .create({
          baseURL: BASEURL,
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
            Authorization: "Bearer " + TOKEN,
          },
        })
        .get(BASEURL + this.$route.params.id)
        .then((res) => {
          this.taminotchis = res.data;
          this.length = res.data.length;
          console.log(res.data);
        });
    },
    back() {
      window.history.back()
    }
  },
  methods2: {
    upload() {
      this.img = true;
    },
    image() {
      let imgInpt = document.getElementById("imgInpt");
      let blah2 = document.getElementById("blah2");
      const [file] = imgInpt.files;
      if (file) {
        blah2.src = URL.createObjectURL(file);
      }
    },
    getData() {
      console.log(this.taminotchis);
    },
  },
  computed: {
    filteredCards: function () {
      return this.taminotchis.filter((taminotchis) => {
        return taminotchis.name.toLowerCase().match(this.search.toLowerCase());
      });
    },
  },
    mounted() {
    this.getData();}
};
</script>

<style scoped>
.form-control:active,
.form-control:focus,
.form-control:hover {
  outline: white;
}
</style>