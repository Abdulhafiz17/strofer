<template>
  <div class="container-fluid">
    <div class="card shadow">
      <div class="card-header">
        <h2>Mahsulot ombori</h2>
        <div class="row">
          <div class="col-md">
            <button
              type="button"
              data-toggle="modal"
              data-target="#modal1"
              class="btn btn-outline-warning float-right"
            >
              <span class="fa fa-circle-plus"></span>
              Ombor qo'shish
            </button>
          </div>
        </div>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-md-4 mb-3" v-for="mah in mahs" :key="mah">
            <div class="card shadow">
              <div class="card-body">
                <table class="table table-sm table-borderless">
                  <tbody>
                    <tr>
                      <th>
                        <h4>
                          <span class="fa fa-warehouse text-secondary"></span>
                        </h4>
                      </th>
                      <td>
                        <h4>{{mah.name}}</h4>
                      </td>
                      <td>
                        <button
                          type="button"
                          data-toggle="modal"
                          data-target="#modal2"
                          class="btn btn-sm btn-outline-warning float-right"
                           @click="
                            edit(
                               mah.id,
                               mah.name,
                               mah.manzil,
                            )
                          "
                        >
                          <span class="far fa-edit"></span>
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <th><span class="fa fa-map text-secondary"></span></th>
                      <td>{{mah.manzil}}</td>
                    </tr>
                    <tr>
                      <th><i class="fa fa-coins text-secondary"></i></th>
                      <td>(9)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="card-footer">
                <router-link
                  to="/omborKirish"
                  class="btn btn-outline-warning float-right"
                >
                  Kirish
                </router-link>
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
          <h3>Ombor qo'shish</h3>
        </div> 
         <form id="form1" @submit.prevent="postData" >
        <div class="modal-body">
          <input
           v-model="data.name"
            type="text"
            name=""
            id=""
            class="form-control"
            placeholder="Nomi . . . "
          />

          <input
           v-model="data.manzil"
            type="text"
            name=""
            id=""
            class="form-control mt-4"
            placeholder="Manzili . . ."
          />
        </div>
        </form>
        <div class="modal-footer">
          <button class="btn btn-outline-primary"  form="form1">
            <span class="fa fa-check-circle"></span> Tasdiqlash
          </button>
          <button class="btn btn-outline-danger" data-dismiss="modal">
            <span class="fa fa-circle-xmark"></span> Orqaga
          </button>
        </div>
      </div>
    </div>
  </div>

  <div class="modal fade" id="modal2">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h3>Omborni o'zgartirish</h3>
        </div>
        <form id="form2"   @submit.prevent="edit(editH.id)">
        <div class="modal-body">
          <input
            type="text"
            name=""
            id=""
            class="form-control"
             v-model="editH.name"
          />
        </div>
        <div class="modal-body">
          <input
            type="text"
            name=""
            id=""
            class="form-control"
             v-model="editH.manzil"
          />
        </div>
        </form>
        <div class="modal-footer">
          <button class="btn btn-outline-primary">
            <span class="fa fa-check-circle"></span> Tasdiqlash
          </button>
          <button class="btn btn-outline-danger" data-dismiss="modal">
            <span class="fa fa-circle-xmark"></span> Orqaga
          </button>
        </div>
      </div>
    </div>
  </div>

  <div class="container-fluid"></div>
</template>


<script>
import axios from "axios";
export default {
  data() {
    return {
      mahs: [],
      hmsh: [],
        data: {
        name: "",
        manzil:"",
      },
      editH: {
        id: " ",
        name: "",
        manzil: "",
    },
  };
},
  methods: {
     postData() {
      const TOKEN = localStorage.getItem("access_token");
      const BASEURL = "https://oqsaroy.crud.uz/ombor/create";
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
    

    getData() {
      const TOKEN = localStorage.getItem("access_token");
      const BASEURL = "https://oqsaroy.crud.uz/omborlar";
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
          this.mahs = res.data;
          console.log(res.data);
        });

   
    },
 
 edit(id, name, manzil) {
      this.editH = {
        id: id,
        name: name,
       manzil:manzil,
      };
      console.log(this.editH);
    },
    editPost(id) {
      const TOKEN = localStorage.getItem("access_token");
      const BASEURL = "https://oqsaroy.crud.uz/ombor/update/2/";
      axios
        .create({
          baseURL: BASEURL,
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
            Authorization: "Bearer " + TOKEN,
          },
        })
        .put(BASEURL + id, this.editH)
        .then((res) => {
          console.log(res.data);
          window.location.reload()
        });
    },
  },
  
  mounted() {
    this.getData();
  },
};
</script>

<style>

</style>





