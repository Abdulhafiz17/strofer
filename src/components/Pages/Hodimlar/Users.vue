<template>
  <div class="container-fluid">
    <div class="card shadow">
      <div class="card-header">
        <div class="row">
          <div class="col-md-7">
            <h3>Users</h3>
          </div>
          <div class="col-md-5 d-flex justify-content-around">
            <router-link
              class="btn btn-outline-danger ml-3"
              to="/usersBlock"
            >
              <span class="fa fa-user-slash"></span> Bloklanganlar
            </router-link>
            <button
              class="btn btn-outline-warning"
              data-toggle="modal"
              data-target="#modal1"
            >
              <span class="fa fa-user-plus"></span> User qo'shish
            </button>
          </div>
        </div>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-md-4 mb-3" v-for="user in users" :key="user.id">
            <div class="card shadow">
              <div class="card-body">
                <table class="table table-sm table-borderless">
                  <tbody>
                    <tr>
                      <th>
                        <span class="fa fa-user text-secondary"></span>
                      </th>
                      <td>
                        <strong> {{ user.hodim.name }} </strong>
                        <button
                          class="btn btn-sm btn-outline-warning float-right"
                          data-toggle="modal"
                          data-target="#modal2"
                          @click="edit(user.id, user.username, user.hodim_id)"
                        >
                          <span class="far fa-edit"></span>
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <span class="fa fa-at text-secondary"></span>
                      </th>
                      <td>{{ user.username }}</td>
                    </tr>
                    <tr>
                      <th>
                        <span class="fa fa-phone text-secondary"></span>
                      </th>
                      <td>
                        <a :href="'tel:+998' + user.hodim.phone">+998{{ user.hodim.phone }}</a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="card-footer">
                <button class="btn btn-outline-danger float-right" @click="block(user.id)">
                  <span class="fa fa-user-slash"></span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="modal1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h3>User qo'shish</h3>
          </div>
          <form @submit.prevent="postData" id="form1">
            <div class="modal-body">
              <div class="input-group">
                <input
                  type="text"
                  list="taminotchi"
                  class="form-control"
                  placeholder="Hodim"
                  v-model="editU.hodim_id"
                />
                <datalist id="taminotchi">
                  <option
                    v-for="hodim in hodims"
                    :key="hodim.id"
                    :value="hodim.id"
                  >
                    {{ hodim.name }}
                  </option>
                </datalist>
                <div class="input-group-append">
                  <span class="input-group-text">
                    <span class="fa fa-user"></span>
                  </span>
                </div>
              </div>
              <div class="input-group my-2">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Username"
                  v-model="user.username"
                />
                <div class="input-group-append">
                  <span class="input-group-text">
                    <span class="fa fa-at"></span>
                  </span>
                </div>
              </div>
              <div class="input-group">
                <input
                  type="password"
                  class="form-control"
                  placeholder="Parol"
                  v-model="user.password"
                />
                <div class="input-group-append">
                  <span class="input-group-text">
                    <span class="fa fa-key"></span>
                  </span>
                </div>
              </div>
            </div>
          </form>
          <div class="modal-footer">
            <button class="btn btn-outline-primary" form="form1" type="submit">
              <span class="far fa-circle-check"></span> Tasdiqlash
            </button>
            <button class="btn btn-outline-danger" data-dismiss="modal">
              <span class="far fa-circle-xmark"></span> Bekor qilish
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="modal2">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4>{{ editU.username }} ma'lumotini tahrirlash</h4>
          </div>
          <form @submit.prevent="editData(editU.id)" id="form2">
            <div class="modal-body">
              <div class="input-group">
                <input
                  type="text"
                  list="taminotchi"
                  class="form-control"
                  placeholder="Hodim"
                  v-model="editU.hodim_id"
                />
                <datalist id="taminotchi">
                  <option
                    v-for="hodim in hodims"
                    :key="hodim.id"
                    :value="hodim.id"
                  >
                    {{ hodim.name }}
                  </option>
                </datalist>
                <div class="input-group-append">
                  <span class="input-group-text">
                    <span class="fa fa-user"></span>
                  </span>
                </div>
              </div>
              <div class="input-group my-2">
                <input
                  type="text"
                  class="form-control"
                  v-model="editU.username"
                  placeholder="Username"
                />
                <div class="input-group-append">
                  <span class="input-group-text">
                    <span class="fa fa-at"></span>
                  </span>
                </div>
              </div>
              <div class="input-group">
                <input
                  type="password"
                  class="form-control"
                  placeholder="Parol"
                  v-model="editU.password"
                  minlength="8"
                  required
                />
                <div class="input-group-append">
                  <span class="input-group-text">
                    <span class="fa fa-key"></span>
                  </span>
                </div>
              </div>
            </div>
          </form>
          <div class="modal-footer">
            <button type="submit" form="form2" class="btn btn-outline-primary">
              <span class="far fa-circle-check"></span> Tasdiqlash
            </button>
            <button class="btn btn-outline-danger" data-dismiss="modal">
              <span class="far fa-circle-xmark"></span> Bekor qilish
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { access_token } from '../../../DATA_BASE';
export default {
  data() {
    return {
      ids: [],
      users: [],
      hodims: [],
      user: {
        username: "",
        password: "",
        hodim_id: " ",
      },
      editU: {
        id: 0,
        username: "",
        password: "",
        hodim_id: 0,
      },
    };
  },
  methods: {
    getData() {
      // const TOKEN = localStorage.getItem("access_token");
      const BASEURL = "https://oqsaroy.crud.uz/users";
      axios
        .create({
          baseURL: BASEURL,
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
            Authorization: "Bearer " + access_token,
          },
        })
        .get(BASEURL)
        .then((res) => {
          this.users = res.data;
          console.log(res.data);
        });
      // console.log(TOKEN);
      axios
        .create({
          baseURL: "https://oqsaroy.crud.uz/hodimlar",
          headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
            Authorization: "Bearer " + access_token,
          },
        })
        .get("https://oqsaroy.crud.uz/hodimlar")
        .then((res) => {
          this.hodims = res.data;
        });
    },
    postData() {
      // const TOKEN = localStorage.getItem("access_token");
      const BASEURL = "https://oqsaroy.crud.uz/user/create/";
      axios
        .create({
          baseURL: BASEURL,
          headers: {
            // Accept: "*/*",
            "Content-Type": "application/json",
            Authorization: "Bearer " + access_token,
          },
        })
        .post(BASEURL, this.user)
        .then((res) => {
          window.location.reload();
          console.log(res.data);
        });
    },
    edit(id, username, hodim_id) {
      this.editU = {
        id: id,
        username: username,
        hodim_id: hodim_id,
      };
    },
    editData(id) {
      // const TOKEN = localStorage.getItem("access_token");
      const BASEURL = "https://oqsaroy.crud.uz/user/update/";
      axios
        .create({
          baseURL: BASEURL,
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
            Authorization: "Bearer " + access_token,
          },
        })
        .put(BASEURL + id, this.editU)
        .then((res) => {
          console.log(res.data);
          window.location.reload();
        });
        console.log(id);
    },
    block(id) {
      // const TOKEN = localStorage.getItem("access_token");
      const BASEURL = "https://oqsaroy.crud.uz/user_block/";
      axios
        .create({
          baseURL: BASEURL,
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
            Authorization: "Bearer " + access_token,
          },
        })
        .get(BASEURL + id)
        .then((res) => {
          console.log(res.data);
          window.location.reload();
        });
    }
  },
  mounted() {
    this.getData();
  },
};
</script>

<style>
</style>