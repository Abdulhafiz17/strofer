<template>
  <div class="container-fluid">
    <div class="card shadow border-warning">
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
              class="btn btn-outline-warning float-right"
            >
              Kategoria qo'shish
            </button>
          </div>
        </div>
      </div>
      <div
        class="card-body"
        
      >
        <div class="row">
          <div class="col-md-3" v-for="taminotchi in filteredCards"
        :key="taminotchi.name">
            <div class="card border-success mb-3">
              <div class="card-body">
                <img
                   v-bind:src="`https://oqsaroy.crud.uz/assets/images/products/${taminotchi.image}`" 
                  class="card-img-top img-fluid"
                  alt="..."
                  width="100"
                  height="300"
                />
                <h5 class="card-title">{{ taminotchi.name }}</h5>
                <div class="float-left">
                  
                    <a
                    :href="'/mahsulotlarmain/' + taminotchi.id"
                    class="btn btn-outline-success btn-block ml-2"
                    >Kirish</a
                  >
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
         
            <!-- <input
             type="file"
             style="display: none"
             @change="onFileSelected"
             ref="fileInput"
             >
             <button class="btn btn-success" @click="$refs.fileInput.click()">Yuklah</button> -->
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
          <button class="btn btn-outline-primary" @click="onUpload">
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
      selectedFile: null,
      taminotchis: [],
      search: "",
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
     getData() {
      const TOKEN = localStorage.getItem("access_token");
      const BASEURL = "https://oqsaroy.crud.uz/products/0";
      axios
        .create({
          baseURL: BASEURL,
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
            Authorization: "Bearer " + TOKEN,
          },
        })
        .get(BASEURL)
        .then((res) => {
          this.taminotchis = res.data;
          this.length = res.data.length;
          console.log(res.data);
        });
        console.log(TOKEN)
      
       
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
</style>