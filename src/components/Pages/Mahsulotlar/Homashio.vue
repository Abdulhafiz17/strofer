<template>
  <div class="container-fluid">
    <div class="card shadow border-warning">
      <div class="card-header">
        <div class="row">
          <div class="col-md">
            <h3 class="main">Homashyo</h3>
          </div>
        </div>
      </div>
      <div class="card-body">
        <form id="form1" @submit.prevent="postData">
          <div class="row">
            <div class="col-md-3 px-4 mb-2">
              <h5>Homashyo qo'shish:</h5>
            </div>
            <div class="col-md-3 mb-2">
              <input
                class="form-control"
                placeholder="Nomi"
                v-model="data.name"
                type="text"
              />
            </div>
            <div class="col-md-3 mb-2">
              <div class="input-group">
                <select v-model="data.olchov_id" class="form-control">
                  <option :value="hm.id" v-for="hm in hmsh" :key="hm">
                    {{ hm.name }}
                  </option>
                </select>
              </div>
            </div>
            <div class="col-md-3 mb-2">
              <button class="btn btn-outline-warning btn-block">
                <span class="fa fa-circle-plus"></span> Qo'shish
              </button>
            </div>
          </div>
        </form>
        <table class="table table-borderless table-sm table-hover text-center">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nomi</th>
              <th scope="col">O'lchv birlig</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="mah in mahs" :key="mah">
              <th scope="row">1</th>
              <td>
                <a href="/Homashiotarixi"> {{ mah.name }} </a>
              </td>
              <td>{{ mah.olchov }}</td>
              <td>
                <button
                  class="btn btn-sm btn-outline-warning float-right"
                  data-toggle="modal"
                  data-target="#modal3"
                  @click="update(mah.id, mah.name, mah.olchov)"
                >
                  <span class="fa fa-edit"></span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <div class="modal fade" id="modal3">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h3>Tugma ma'lumotlarini tahrirlash</h3>
        </div>
        <form id="form2" @submit.prevent="edit(editH.id)">
          <div class="modal-body">
            <input type="text" class="form-control" v-model="editH.name" />
            <div class="input-group mt-2">
              <input
                name=""
                id=""
                class="form-control"
                v-model="editH.olchov"
              />
            </div>
          </div>
        </form>
        <div class="modal-footer">
          <button class="btn btn-outline-primary">
            <span class="far fa-circle-check"></span> Tasdiqlash
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
  data() {
    return {
      mahs: [],
      hmsh: [],
      data: {
        name: "",
        olchov_id: "",
      },
      editH: {
        id: "",
        name: "",
        olchov: "",
      },
    };
  },
  methods: {
    postData() {
      const TOKEN = localStorage.getItem("access_token");
      const BASEURL = "https://oqsaroy.crud.uz/homashyo/create";
      axios
        .create({
          baseURL: BASEURL,
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + TOKEN,
          },
        })
        .post(BASEURL, this.data)
        .then((res) => {
          console.log(res.data);
          window.location.reload();
        });
    },

    getData() {
      const TOKEN = localStorage.getItem("access_token");
      const BASEURL = "https://oqsaroy.crud.uz/olchovlar";
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
          this.hmsh = res.data;
          console.log(res.data);
        });

      axios
        .create({
          baseURL: "https://oqsaroy.crud.uz/homashyolar",
          headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
            Authorization: "Bearer " + TOKEN,
          },
        })
        .get("https://oqsaroy.crud.uz/homashyolar")
        .then((res) => {
          this.mahs = res.data;
          console.log(res.data);
        });
    },
    async edit(id, name, olchov) {
      this.editH = {
        id: id,
        name: name,
        olchov: olchov,
      };
      console.log(this.editH);
      const TOKEN = localStorage.getItem("access_token");
      const BASEURL = "https://oqsaroy.crud.uz/homashyo/update";
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
        });
    },
  },
  computed: {
    filteredCards: function () {
      return this.hodims.filter((taminotchis) => {
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
</style>