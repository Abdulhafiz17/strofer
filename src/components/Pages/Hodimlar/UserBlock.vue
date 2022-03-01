<template>
  <div class="container-fluid">
    <button @click="back" class="btn btn-sm btn-outline-warning my-2">
      <i class="fas fa-arrow-left mr-2"></i> Chiqish
    </button>
    <div class="card shadow">
      <div class="card-header">
        <div class="row">
          <div class="col-md">
            <h3>Bloklangan Userlar</h3>
          </div>
          <div class="col-md">
            <button
              class="btn btn-outline-warning float-right"
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
                        <span class="fa fa-at text-secondary"></span>
                      </th>
                      <td>
                        <strong> {{ user.username }} </strong>
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
                        <span class="fa fa-user-tag text-secondary"></span>
                      </th>
                      <td>{{ user.role }}</td>
                    </tr>
                    <tr>
                      <th>
                        <span class="fa fa-phone text-secondary"></span>
                      </th>
                      <td>
                        {{ user.phone }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="card-footer">
                <button
                  class="btn btn-outline-primary float-right"
                  @click="block(user.id)"
                >
                  <span class="fa fa-user-slash"></span>
                </button>
              </div>
            </div>
          </div>
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
      users: [],
    };
  },
  methods: {
    getData() {
      const TOKEN = localStorage.getItem("access_token");
      const BASEURL = "https://oqsaroy.crud.uz/users_block";
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
          this.users = res.data;
          console.log(res.data);
        });
    },
    block(id) {
      const TOKEN = localStorage.getItem("access_token");
      const BASEURL = "https://oqsaroy.crud.uz/user_open/";
      axios
        .create({
          baseURL: BASEURL,
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
            Authorization: "Bearer " + TOKEN,
          },
        })
        .get(BASEURL + id)
        .then((res) => {
          console.log(res.data);
          window.location.reload();
        });
    },
    back() {
        window.history.back()
    }
  },
  mounted() {
    this.getData();
  },
};
</script>