<template>
  <div class="dropdown" v-if="role == 'branch_admin'">
    <button
      class="btn btn-sm float-right"
      style="box-shadow: none"
      data-toggle="dropdown"
    >
      <span class="fa fa-bell" style="color: white; font-size: 15px" />
      <sup> {{ notice }} </sup>
    </button>
    <ul class="dropdown-menu">
      <span>
        <h5><center>Qoldiq kamayayotgan mahsulotlar</center></h5>
        <li>
          <a class="dropdown-item list-group-item">
            <strong class="d-flex justify-content-between">
              <span> Mahsulot </span> <span> Qoldiq </span>
            </strong>
          </a>
        </li>
        <li v-for="mahsulot in mahsulotlar" :key="mahsulot.id">
          <a
            class="dropdown-item list-group-item d-flex justify-content-between"
            :href="'/kmahsulotlar/' + mahsulot.category_id"
          >
            <span> {{ mahsulot.name }} </span>
            <span> {{ mahsulot.quantity }} {{ mahsulot.measure }} </span>
          </a>
        </li>
      </span>
    </ul>
  </div>
</template>

<script>
import { instance } from "../Pages/Api";
export default {
  data() {
    return {
      role: localStorage.getItem("role"),
      mahsulotlar: [],
      notice: 0,
      getter: true,
    };
  },
  methods: {
    getData() {
      (this.mahsulotlar = []),
        (this.notice = 0),
        instance.get("all_categories").then((response) => {
          if (response.data.length > 0 && response.data !== 'Sizga ruhsat berilmagan') {
            response.data.forEach((element) => {
              instance.get("all_products/" + element.id).then((res) => {
                res.data.forEach((element) => {
                  if (element.quantity_note >= element.quantity) {
                    this.mahsulotlar.push(element);
                    this.notice++;
                  }
                });
              });
            });
          }
        });
    },
  },
  mounted() {
    if (localStorage.getItem("access_token")) {
      this.getData();
      setInterval(() => {
        this.getData();
      }, 5000);
    }

    if (this.role == "branch_admin") {
      function myFunction(x) {
        if (x.matches) {
          let dropdown = document.querySelector(".dropdown-menu").setAttribute("class", "dropdown-menu dropdown-menu-right")
        }
      }
  
      var x = window.matchMedia("(min-width: 768px)");
      myFunction(x); // Call listener function at run time
      x.addListener(myFunction); // Attach listener function on state changesА
    }
  },
};
</script>

<style scoped>
ul {
  background: white;
}
.dark ul {
  background: var(--dark);
  color: white;
}

@media (min-width: 768px) {
  .dropdown-menu {
    width: 450px !important;
  }
}
</style>