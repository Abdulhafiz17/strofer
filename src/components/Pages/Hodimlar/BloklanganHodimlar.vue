<template>
  <div class="container-fluid">
    <router-link
      class="btn btn-outline-success btn-sm mb-2"
      :to="'/hodimlar/' + branch_id"
    >
      <span class="fa fa-arrow-left"></span> Chiqish
    </router-link>
    <div class="card shadow">
      <div class="card-header">
        <h3>Bloklangan Hodimlar</h3>
      </div>
      <div class="card-body">
        <div class="row">
          <div
            class="col-md-4 mb-3"
            v-for="hodim in hodimlar"
            :key="hodim.name"
          >
            <div class="card shadow">
              <div class="card-body">
                <table class="table table-borderless table-sm">
                  <tbody>
                    <tr>
                      <th>
                        <span class="fa fa-user text-secondary"></span>
                      </th>
                      <td>
                        <strong>{{ hodim.name }}</strong>
                      </td>
                      <td>
                        <button
                          data-toggle="modal"
                          data-target="#exampleModal"
                          class="btn btn-sm btn-outline-warning float-right"
                          @click="
                            edit(
                              hodim.id,
                              hodim.name,
                              hodim.phone,
                              hodim.role,
                              hodim.seh_id
                            )
                          "
                        >
                          <span class="fa fa-edit"></span>
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <span class="fa fa-phone text-secondary"></span>
                      </th>
                      <td>
                        <a :href="'tel:+998' + hodim.phone">
                          +998{{ hodim.phone }}
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <span class="fa fa-industry text-secondary"></span>
                      </th>
                      <td>{{ hodim.role }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="card-footer">
                <div class="row d-flex justify-content-around">
                  <div class="col-md-6" style="width: 118px">
                    <button
                      class="btn btn-block btn-outline-success"
                      @click="block(hodim.id)"
                    >
                      <i class="fa fa-user-slash"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <isloading :isloading="isloading" :message="errorr" />
</template>

<script>
import axios from "axios";

import { instance } from "../Api";
import isloading from "../../Anime/Anime.vue";
import swal from 'sweetalert';

export default {
  components:{
    isloading
  },
  data() {
    return {
      access_token: localStorage.getItem("access_token"),
      branch_id: localStorage.getItem("branch_id"),
      hodimlar: [],
      isloading: true,
      errorr: [],
    };
  },
  methods: {
    getData() {
      const BASEURL =
        "https://savdo.crud.uz/branch_users/" + this.branch_id + "/true";
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
          this.hodimlar = res.data;
          console.log(res.data);
          this.isloading = false
        })
        .catch((err) => {
          this.isloading = false;
          this.errorr = err.message;
        });
    },
    block(id) {
      this.isloading = true
      instance
        .put("this_user_unblock/" + id)
        .then((res) => {
          console.log(res.data);
          if (res.status == 200) {
            swal({icon: "success"}).then(() => {
              this.getData();
            })
          }
        })
        .catch((err) => {
          this.isloading = false;
          this.errorr = err.message;
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