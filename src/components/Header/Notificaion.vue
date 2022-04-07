<template v-if="role == 'branch_admin'">
  <button
    class="btn btn-sm float-right"
    style="box-shadow: none"
    @click="notification = !notification"
  >
    <span class="fa fa-bell" style="color: white; font-size: 15px" />
    <sup> {{ notice }} </sup>
  </button>
  <!-- <div class="dropdown" v-if="role == 'branch_admin'">
    <ul class="dropdown-menu">
      <div class="row">
        <div class="col">
          <span>
            <h5><center>Mahsulotlar</center></h5>
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
        </div>
        <div class="col">
          <span>
            <h5><center>Nasiyalar</center></h5>
            <li>
              <a class="dropdown-item list-group-item">
                <strong class="d-flex justify-content-between">
                  <span> Mahsulot </span> <span> Qoldiq </span>
                </strong>
              </a>
            </li>
            <li v-for="nasiya in nasiyalar" :key="nasiya">
              <a
                class="dropdown-item list-group-item d-flex justify-content-between"
                :href="'/kmahsulotlar/' + mahsulot.category_id"
              >
                <span> {{ nasiya.customer_id }} </span>
                <span> {{ nasiya.date }} </span>
              </a>
            </li>
          </span>

        </div>
      </div>
    </ul>
  </div> -->
  <div class="drop text-center" id="drop" v-if="notification">
    <ul :class="window ? 'list-group list-group-horizontal' : 'list-group'" id="basicList">
      <li class="list-group-item" style="width: 250px">
        <h4> Mahsulotlar </h4>
        <ul class="list-group list-group-sm">
          <li class="list-group-item d-flex justify-content-between" v-for="mahsulot in mahsulotlar" :key="mahsulot"><span>{{ mahsulot.name }}</span><span>{{ mahsulot.quantity }} {{ mahsulot.measure }}</span></li>
        </ul>
      </li>
      <li class="list-group-item" style="width: 250px">
        <h4> Nasiyalar </h4>
        <ul class="list-group list-group-sm">
          <li class="list-group-item d-flex justify-content-between" v-for="nasiya in nasiyalar" :key="nasiya"><span>{{ Intl.NumberFormat().format(nasiya.price) }} so'm</span><span>{{ nasiya.time.substr("T", 10) }}</span></li>
        </ul>
      </li>
      <li class="list-group-item" style="width: 250px">
        <h4> Noto'g'ri sotuv narxlar </h4>
        <ul class="list-group list-group-sm">
          <li class="list-group-item d-flex justify-content-between" v-for="narx in narxlar" :key="narx"><span> {{ Intl.NumberFormat().format(narx.product_price) }} so'm </span><span> {{ Intl.NumberFormat().format(narx.trade_price) }} so'm </span></li>
        </ul>
      </li>
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
      nasiyalar: [],
      narxlar: [],
      notice: 0,
      notification: false,
      window: localStorage.getItem("window"),
    };
  },
  methods: {
    getData() {
      (this.mahsulotlar = []),
        (this.notice = 0),
        instance.get("all_products_for_trade_to_search").then((response) => {
          if (response.data.length > 0 && response.data !== 'Sizga ruhsat berilmagan') {
            response.data.forEach((element) => {
                  if (element.quantity_note >= element.quantity) {
                    this.mahsulotlar.push(element);
                    this.notice++;
                  }
            });
          }
        });

        instance.get("all_loans").then((respon) => {
          this.notice += respon.data.length
          this.nasiyalar = respon.data
        })

        instance.get("notifications").then((respon) => {
          this.narxlar = respon.data
        })
    },
  },
  mounted() {
    console.clear()
    if (localStorage.getItem("access_token") && this.role == "branch_admin") {
      this.getData();
      setInterval(() => {
        this.getData();
      }, 5000);
      function myFunction(x) {
        if (x.matches) {
          localStorage.setItem("window", true)
        } else {
          localStorage.setItem("window", false)
        }
      }
      var x = window.matchMedia("(min-width: 768px)");
      myFunction(x);
      x.addListener(myFunction);
    }
  },
};
</script>

<style scoped>

.list-group-item {
  background: rgba(255, 255, 255, 0.6);
}

.dark .list-group-item {
  color: white;
  background: rgba(63, 68, 73, 0.6);
}

.list-group-item:hover {
  background: rgba(211, 211, 211, 0.5);
}

.dark .list-group-item:hover {
  background: rgb(100, 100, 100, 0.5);
}

.drop {
  width: 70%;
  max-height: 50vh;
  overflow: auto;
  border: 1px solid var(--success);
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.6);
  padding: 15px;
  top: 70px;
  right: 5%;
  backdrop-filter: blur(2px);
  transition: 0.5s;

  position: absolute;
  z-index: 1;
}

.drop span  {
  font-size: 13px;
}
@media (max-width: 425px) {
  .drop {
    width: 90%;
  }
}

.dark .drop {
  color: white;
  background: rgba(63, 68, 73, 0.6);
}
</style>