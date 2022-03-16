<template>
  <div class="container">
    <div class="row w-100 mx-0">
      <div class="card col-lg-4 mx-auto custom-card">
        <form @submit.prevent="handleSubmit">
          <div class="autho-form-light text-left py-5 px-4 px-sm-5">
            <div class="brand-logo text-center">
              <img src="crud-logo.jpg" class="w-25" alt="logo" />
            </div>
            <h4 class="text-center">Hush kelibsiz!</h4>
            <h6 class="font-weight-light">
              Kirish uchun ushbu formani to'ldiring.
            </h6>
            <input type="hidden" />
            <div class="form-group field-loginform-username required">
              <label for="loginform-username">Login :</label>
              <input
                type="text"
                id="loginform-username"
                class="form-control"
                aria-required="true"
                v-model="username"
              />
            </div>
            <div class="form-group field-loginform-password required">
              <label for="loginform-password">Parol :</label>
              <input
                type="password"
                id="loginform-password"
                class="form-control"
                aria-required="true"
                v-model="password"
              />
            </div>
            <div class="form-group">
              <button type="submit" class="btn btn-success btn-block">
                Kirish
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import store from "@/store/index";

export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      data: "",
    };
  },
  methods: {
    async handleSubmit() {
      console.log(this);
      const url = "https://savdo.crud.uz/token";
      let params = new URLSearchParams();
      params.append("username", this.username);
      params.append("password", this.password);

      const config = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      };
      console.log(url, params, config);
      console.log(this);
      axios
        .post(url, params, config)
        .then((response) => {
          if (response.status == 200) {
            console.log("logged in");

            console.log(response.data);
            localStorage.setItem("access_token", response.data.access_token);
            localStorage.setItem("branch_id", response.data.branch_id);
            localStorage.setItem("role", response.data.role);
            this.$router.push("/home");
          }
        })
        .catch((err) => {
          if (err.message == "Request failed with status code 401") {
            alert("Login yoki parolda xatolik")
          } else if (err.message == "Network Error") {
            alert("Tarmoq bilan aloqa mavjud emas")
          }
        });
      // if (this.username === 'admin' && this.password === "admin") {
      //   this.$router.push("/home");
      //   localStorage.setItem('username', this.username)
      // } else {
      //   alert("Please enter username & password");
      // }
    },
  },
};
</script>

<style>
.card {
  border: 1px solid var(--success);
  border-radius: 15px;
  -webkit-box-shadow: -2px 5px 14px 2px rgba(34, 60, 80, 0.31);
  -moz-box-shadow: -2px 5px 14px 2px rgba(34, 60, 80, 0.31);
  box-shadow: -2px 5px 14px 2px rgba(34, 60, 80, 0.31);
}
.custom-card {
  margin-top: 10%;
}
</style>