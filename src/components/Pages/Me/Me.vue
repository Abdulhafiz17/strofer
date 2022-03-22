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
                          required
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
  <isloading :isloading="isloading"/>
</template>

<script>
import { instance } from "../Api";
import isloading from "../../Anime/Anime.vue"
export default {
  components: { isloading },
  data() {
    return {
      hodim: {
        id: "",
        name: "",
        username: "",
        password: "",
        role: "",
        branch_id: "",
        phone: null,
        isloading: false,
      },
    };
  },
  methods: {
    getData() {
      this.isloading = true
      instance.get("users/me").then((res) => {
        this.hodim = {
          id: res.data.id,
          name: res.data.name,
          username: res.data.username,
          role: res.data.role,
          branch_id: res.data.branch_id,
          phone: res.data.phone,
        };
      })
      .finally(this.isloading = false)
    },
    putData() {
      this.isloading = true
      console.log(this.hodim);
      instance.put("this_user_update/" + this.hodim.id, this.hodim).then((res) => {
        console.log(res.data);
        if (res.status == 200) {
          window.location.reload();
        }
      })
      .finally(this.isloading = false)
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<style>
</style>