<template>
  <div class="page-loader" v-if="isloading">
    <div id="loader"></div>
  </div>
</template>

<script>
import swal from "sweetalert";
export default {
  name: "Isloading",
  props: {
    isloading: Boolean,
    message: "",
  },
  mounted() {
    console.log(this.message)
    setTimeout(() => {
      if (this.message == "Network Error") {
        // alert("Tarmoq bilan aloqa mavjud emas")
        swal({
          icon: "warning",
          title: "Tarmoq bilan aloqa mavjud emas !",
          closeOnClickOutside: false,
          closeOnEsc: false,
          buttons: false,
        }).then(() => {
          this.isloading = false
        })
      } else if (this.message == "Request failed with status code 401" || this.message == "Request failed with status code 400") {
        this.$router.push("/");
        swal({
          icon: "error",
          title: "Login yoki parolda xatolik",
        }).then(() => {
          this.isloading = false
        })
      }
    }, 500);
  },
};
</script>

<style scoped>
.page-loader {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(255, 255, 255, 0.7);
  z-index: 999;
}

#loader {
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 1;
  width: 120px;
  height: 120px;
  margin: -76px 0 0 -76px;
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid var(--success);
  -webkit-animation: spin 2s linear infinite;
  animation: spin 2s linear infinite;
}

@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Add animation to "page content" */
.animate-bottom {
  position: relative;
  -webkit-animation-name: animatebottom;
  -webkit-animation-duration: 1s;
  animation-name: animatebottom;
  animation-duration: 1s;
}

@-webkit-keyframes animatebottom {
  from {
    bottom: -100px;
    opacity: 0;
  }
  to {
    bottom: 0px;
    opacity: 1;
  }
}

@keyframes animatebottom {
  from {
    bottom: -100px;
    opacity: 0;
  }
  to {
    bottom: 0;
    opacity: 1;
  }
}
</style>