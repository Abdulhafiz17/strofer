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
              <button type="submit" class="btn btn-warning btn-block">
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
// import axios from "axios";
// import store from "@/store/index";

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
    // async handleSubmit() {
    //   console.log(this);
    //   const url = "https://oqsaroy.crud.uz/token";
    //   let params = new URLSearchParams();
    //   params.append("username", this.username);
    //   params.append("password", this.password);

    //   const config = {
    //     headers: {
    //       "Content-Type": "application/x-www-form-urlencoded",
    //     },
    //   };
    //   console.log(url, params, config);
    //   const response = await axios.post(url, params, config);
    //   console.log(this);
    //   if (response.status == 200) {
    //     console.log("logged in");

    //     localStorage.setItem("access_token", response.data.access_token);
    //     this.$router.push("/home");
    //   } else {
    //     console.log("logged out");
    //     await this.$store.dispatch("user/logout");
    //   }

    //   //   localStorage.setItem('token', response.data.token)

    //   // if (this.username === 'admin' && this.password === "admin") {
    //   //   this.$router.push("/home");
    //   //   localStorage.setItem('username', this.username)
    //   // } else {
    //   //   alert("Please enter username & password");
    //   // }
    // },
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