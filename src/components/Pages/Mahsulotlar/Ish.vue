<template>
  <div class="container-fluid">
    <button class="btn btn-outline-warning btn-sm mb-2" @click="back">
      <span class="fa fa-arrow-left"></span> Orqaga
    </button>
    <div class="card shadow border-warning">
      <div class="card-header">
        <div class="row">
          <div class="col-md">
            <h3 class="main">Test</h3>
          </div>
        </div>
      </div>
      <div class="card-body">
        
        <nav class="navbar navbar-expand-lg navbar-light card">
  <a class="navbar-brand"><big>Homashyo</big></a>
  <div class="navbar-toggler" style="border:none">
      <button class="btn btn-sm btn-primary collapsed" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  </div>
  <div class="navbar-collapse collapse" id="navbarSupportedContent" style="">
   
  </div>
</nav>

<nav class="navbar navbar-expand-lg navbar-light card mt-3" 
 v-for="jarayon in jarayonlar" :key="jarayon">
  <a class="navbar-brand" ><big>{{jarayon.name}}</big></a>
  <div class="navbar-toggler" style="border:none">
      <button class="btn btn-sm btn-inverse-primary collapsed" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  </div>
  <div class="navbar-collapse collapse" id="navbarSupportedContent" style="">
    <ul class="navbar-nav mr-auto">
     
     
      <li class="nav-item active">
          <big><a class="nav-link" href="#"><span class="fas fa-user mr-2"></span>  Mijoz turi: narx</a></big>
      </li>
             <li class="nav-item">
        <big><a class="nav-link" href="tel:+998908887766"><span class="fas fa-phone mr-2"></span>+998908887766</a></big>
      </li>
                          <li class="nav-item active">
            <big><a class="nav-link" href="#"><i class="mdi mdi-map-marker"></i> Marĝilon</a></big>
      </li>
      <li class="nav-item active ">
         <router-link
                  to="/jarayon"
                  class="btn btn-outline-success float-right"
                >
                  <span class="fas fa-box"></span> Kirish
                </router-link>
      </li>
   
    
    </ul>
   
  </div>
</nav>
  <nav class="navbar navbar-expand-lg navbar-light card mt-3">
  <a class="navbar-brand"><big>Jarayon +</big></a>
  <div class="navbar-toggler" style="border:none">
      <button class="btn btn-sm btn-primary collapsed" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  </div>
  <div class="navbar-collapse collapse" id="navbarSupportedContent" style="">
      <ul class="navbar-nav mr-auto">
     
    <form  @submit.prevent="postData" id="form1">
      <li class="nav-item active">
          <big><input  v-model="data.name" class="form-control" placeholder="Nomi" type="text"></big>
      </li>
             <li class="nav-item active">
          <big><input  v-model="data.tseh_id" class="form-control" placeholder="Tseh" type="text"></big>
      </li>
             <li class="nav-item active">
          <big><input   v-model="data.work_kpi" class="form-control" placeholder="KPI" type="text"></big>
      </li>
            
                         
      <li class="nav-item active ">
         <button
                  class="btn btn-outline-success float-right mt-2"
                     type="submit"
                  form="form1"
                >
                  <span class="fas fa-check"></span> 
                </button>
      </li>
   </form>
    
    </ul>
   
  </div>
</nav>
  
        <nav class="navbar navbar-expand-lg navbar-light card mt-3">
  <a class="navbar-brand"><big>Tayyor Mahsulot</big></a>
  <div class="navbar-toggler" style="border:none">
      <button class="btn btn-sm btn-primary collapsed" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  </div>
  <div class="navbar-collapse collapse" id="navbarSupportedContent" style="">
   
  </div>
</nav>
      </div>

  
    </div>
  </div>
</template>

<script>
import axios from "axios"
export default {
  data() {
    return {
     jarayonlar: [],
     data:{
       product_id:2,
       befor:3,
      name:" ",
      seh_id: 0,
      work_kpi: 0,

     }
    };
  },
  methods: {
  
    postData() {
      const TOKEN = localStorage.getItem("access_token");
      const BASEURL = "https://oqsaroy.crud.uz/process/create/";
      axios
        .create({
          baseURL: BASEURL,
          headers: {
            // Accept: "*/*",
            "Content-Type": "application/json",
            Authorization: "Bearer " + TOKEN,
          },
        })
        .post(BASEURL+ this.$route.params.id, this.data)
        .then((res) => {
          console.log(res.data);
          window.location.reload();
        });
    },
    back() {
      window.history.back()
    },
     getData() {
      const TOKEN = localStorage.getItem("access_token");
      const BASEURL = "https://oqsaroy.crud.uz/processes/";
      axios
        .create({
          baseURL: BASEURL,
          headers: {
            Accept: "*/*",
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: "Bearer " + TOKEN,
          },
        })
        .get(BASEURL + this.$route.params.id)
        .then((res) => {
          this.jarayonlar = res.data
          console.log(res.data);
        });
    },
  },
  computed: {
    filterOption: function () {
      return this.xomashyo.filter((xomashyo) => {
        return xomashyo.name.match(this.search);
      });
    },
  },
   mounted() {
    this.getData()
  }
};
</script>

<style scoped>
.main {
  font-family: font-weight-light;
}
.form-control:active,
.form-control:focus,
.form-control:hover {
  outline: white;
}

table {
  cursor: default;
}
.form-check-input {
  margin: 0;
}
</style>
 v-for="jarayon in jarayonlar" :key="jarayon"