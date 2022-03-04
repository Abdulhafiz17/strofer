<template>
  <div class="container-fluid">
    <div class="card shadow">
      <div class="card-header">
        <div class="row">
          <div class="col-md">
            <h3>Kategoria</h3>
          </div>
          <div class="col-md">
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
              class="btn btn-outline-success float-right"
            >
              Kategoria qo'shish
            </button>
            <!-- <label class="switch float-right">
              <input type="checkbox">
              <span class="slider round"></span>
            </label> -->
          </div>
        </div>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-sm-12">
            <div class="table-responsive text-center">
              <table class="table table-sm table-hover table-borderless">
                <tr>
                  <th> № </th>
                  <th> Nomi </th>
                  <th> Kategoriyasi </th>
                  <th>  </th>
                </tr>
                <tbody>
                  <tr v-for="(mahsulot, num) in mahsulotlar" :key="mahsulot">
                    <td> {{ num + 1 }} </td>
                    <td> <span class="fa fa-folder" v-if="mahsulot.category == true"/> </td>
                    <td> {{ mahsulot.name }} </td>
                    <td> {{ mahsulot.id }} </td>
                    <td> 
                      <button class="btn btn-sm btn-outline-success" @click="changeId(mahsulot.id)">
                        <span class="fa fa-folder-open"/> Kirish
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <!-- <div class="row">
          <div class="col-md-3" v-for="mahsulot in filteredCards" :key="mahsulot.name">
            <div class="card border-success mb-3">
              <div class="card-body">
                <img
                   v-bind:src="`https://oqsaroy.crud.uz/assets/images/products/${mahsulot.image}`" 
                  class="card-img-top img-fluid"
                  alt="..."
                  width="100"
                  height="300"
                />
                <h5 class="card-title">{{ mahsulot.name }}</h5>
                <div class="float-left">
                  
                    <a
                    :href="'/mahsulotlarmain/' + mahsulot.id"
                    class="btn btn-outline-success btn-block ml-2"
                    >Kirish</a
                  >
                </div>
              </div>
            </div>
          </div>
        </div> -->
      </div>
    </div>
  </div>
  <div class="modal fade" id="modal1">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h3>Kategoriya qo'shish</h3>
        </div>
        <form @submit.prevent=postData() >
          <div class="modal-body">
            <!-- <div class="col-md-6">
              <form runat="server">
                <input type="file" id="imgInp" @change="image" @click="upload" />
                <img
                  id="blah"
                  src="#"
                  alt="your image"
                  width="200"
                  height="200"
                  v-if="img"
                />
              </form>
          
              <input
              type="file"
              style="display: none"
              @change="onFileSelected"
              ref="fileInput"
              >
              <button class="btn btn-success" @click="$refs.fileInput.click()">Yuklah</button>
            </div> -->
            <input
              type="text"
              name=""
              id=""
              class="form-control"
              placeholder="Nomi"
              v-model="yangiMahsulot.name"
              required
            />
          </div>
          <div class="modal-footer">
            <button class="btn btn-outline-primary" type="submit">
              <span class="far fa-check-circle"></span> Tasdiqlash
            </button>
            <button class="btn btn-outline-danger" data-dismiss="modal">
              <span class="far fa-circle-xmark"></span> Bekor qilish
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <Anime :isLoading="isLoading"/>
</template>

<script>
import axios from "axios";
import Anime from '../../Anime/Anime.vue';

export default {
  components: { Anime },
  data: () => {
    return {
      access_token: localStorage.getItem("access_token"),
      branch_id: localStorage.getItem("branch_id"),
      role: localStorage.getItem("role"),
      isLoading: false,
      table: false,
      selectedFile: null,
      search: "",
      mahsulotId: "empty",
      mahsulotlar: [],
      yangiMahsulot: {
        name: "",
      },
    };
  },
  methods: {
    onFileSelected(event){
      this.selectedFile = event.target.file[0]
    },
    onUpload(){
      const fd = new FormData();
      fd.append('image', this.selectedFile, this.selectedFile.name)
      axios.post('https://oqsaroy.crud.uz/product/creat', fd)
      .then(res =>{
        console.log(res)
      });
    },

    changeId(id) {
      this.mahsulotId = id
      this.getData();
    },

    getData() {
      this.isLoading = true
      const BASEURL = "https://savdo.crud.uz/all_products/" + this.mahsulotId;
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
          this.mahsulotlar = res.data;
          console.log(res.data);
        })
        .finally(
          this.isLoading = false
        )
    },

    postData() {
      // console.log(this.yangiMahsulot)
      this.isLoading = true
      const BASEURL = "https://savdo.crud.uz/product_create/empty";
      axios
        .create({
          baseURL: BASEURL,
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
            Authorization: "Bearer " + this.access_token,
          },
        })
        .post(BASEURL, this.yangiMahsulot)
        .then((res) => {
          console.log(res.data);
          // window.location.reload()
        })
        .finally(
          this.isLoading = false
        )
    },
  },
  computed: {
    filteredCards: function () {
      return this.mahsulotlar.filter((Mahsulot) => {
        return Mahsulot.name.toLowerCase().match(this.search.toLowerCase());
      });
    },
  },
   mounted() {
    this.getData();
  },
};
</script>

<style scoped>
.form-control:active,
.form-control:focus,
.form-control:hover {
  outline: white;
}

.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input { 
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>