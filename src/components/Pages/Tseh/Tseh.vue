<template>
  <div class="container-fluid">
    <div class="card shadow border-warning">
      <div class="card-header">
        <div class="row">
          <div class="col-md">
            <h3>Tsehlar</h3>
          </div>
          <div class="col-md">
            <button
              type="button"
              data-toggle="modal"
              data-target="#modal1"
              class="btn btn-outline-warning float-right"
            >
              Tseh qo'shish
            </button>
          </div>
        </div>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-md-4 mb-3" v-for="seh in sehlar" :key="seh.id">
            <div class="card shadow border-warning">
              <div class="card-body">
                <div class="card-title"><h4> {{ seh.name }} </h4></div>
                <h6><span class="fas fa-user"></span></h6>
                <router-link
                  to="/tsehKirish"
                  class="btn btn-outline-success float-right"
                >
                  <span class="fas fa-box"></span> Kirish
                </router-link>
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
          <h3>Tseh qo'shish</h3>
        </div>
        <div class="modal-body">
          <form id="form1" @submit.prevent="postData">
            <input
              type="text"
              v-model="data.name"
              name=""
              id=""
              class="form-control border-warning"
              placeholder="Nomi"
              required
            />
          </form>
        </div>
        <div class="modal-footer">
          <button class="btn btn-outline-primary" type="submit" form="form1">
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
import axios from "axios"
export default {
  data() {
    return {
      data: {
        name: "",
      },
      sehlar: [],
    };
  },
  methods: {
    postData() {
      const TOKEN = localStorage.getItem("access_token");
      const BASEURL = "https://oqsaroy.crud.uz/seh/create";
      axios
        .create({
          baseURL: BASEURL,
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
            Authorization: "Bearer " + TOKEN,
          },
        })
        .post(BASEURL, this.data)
        .then((res) => {
          console.log(res.data);
          window.location.reload()
        });
    },
    async getData() {
      const TOKEN = localStorage.getItem("access_token");
      const BASEURL = "https://oqsaroy.crud.uz/sehlar";
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
        .get(BASEURL)
        .then((res) => {
          this.sehlar = res.data
          console.log(res.data);
        });
    },
  },
  mounted() {
    this.getData()
  }
};
</script>

<style scoped>
.form-control:active,
.form-control:focus,
.form-control:hover {
  outline: white;
}
</style>