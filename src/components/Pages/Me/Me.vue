<template>
  <div class="container-fluid">
    <div class="card shadow">
      <div class="card-header">
        <h3>{{ hodim.name }} ma'lumotlari</h3>
      </div>
      <div class="card-body">
        <center>
          <div class="row">
            <form @submit.prevent="putData()">
              <div class="row mb-2">
                <div class="col-md-3">
                  <label> Ism </label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="hodim.name"
                    required
                  />
                </div>
                <div class="col-md-3">
                  <label> Telefon </label>
                  <div class="input-group">
                    <div class="input-group-prepend">
                      <div class="input-group-text">+998</div>
                    </div>
                    <input
                      type="tel"
                      class="form-control"
                      v-model="hodim.phone"
                      maxlength="9"
                      minlength="9"
                      required
                    />
                  </div>
                </div>
                <div class="col-md-3">
                  <label> Username </label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="hodim.username"
                    required
                  />
                </div>
                <div class="col-md-3">
                  <label> Parol </label>
                  <input
                    type="password"
                    class="form-control"
                    v-model="hodim.password"
                  />
                </div>
              </div>
              <button class="btn btn-block btn-outline-success">
                <span class="far fa-circle-check" /> Tasdiqlash
              </button>
            </form>
          </div>
        </center>
      </div>
    </div>
  </div>
  <isloading :isloading="isloading" :message="errorr" />
</template>

<script>
import { instance } from "../Api";
import isloading from "../../Anime/Anime.vue";
import swal from 'sweetalert';

export default {
  components: { isloading },
  data() {
    return {
      hodim: {},
      errorr: "",
      isloading: true,
    };
  },
  methods: {
    getData() {
      this.isloading = true;
      instance
        .get("users/me")
        .then((res) => {
          this.hodim = {
            id: res.data.id,
            name: res.data.name,
            username: res.data.username,
            role: res.data.role,
            branch_id: res.data.branch_id,
            phone: res.data.phone,
            password: "none",
          };
          this.isloading = false
        })
        .catch((err) => {
          this.isloading = false;
          this.errorr = err.message;
        })
    },
    putData() {
      this.isloading = true;
      instance
        .put("this_user_update/" + this.hodim.id, this.hodim)
        .then((res) => {
          console.log(res.data);
          if (res.status == 200) {
            swal({icon: "success", timer: 1000}).then(() => {
              this.getData()
            })
          }
        })
        .catch((err) => {
          this.isloading = false;
          this.errorr = err.message;
        })
        .finally((this.isloading = false))
    },
  },
  mounted() {
    setTimeout(() => {
      this.getData();
    }, 1000);
  },
};
</script>

<style>
</style>