<template>
  <button
    class="btn btn-sm float-right"
    style="box-shadow: none"
    @click="getData(), notification = !notification"
    v-if="role == 'branch_admin'"
  >
    <span :class="notice > 0 ? 'fa fa-bell fa-shake text-danger' : 'fa fa-bell'" style="color: white; font-size: 18px" />
  </button>
  <div class="drop text-center" id="drop" v-if="notification">
    <ul class="list-group" id="basicList">
      <li class="list-group-item" style="width: 100%">
        <h4> Mahsulotlar </h4>
        <ul class="list-group list-group-sm">
          <router-link @click="close()" class="list-group-item d-flex justify-content-between" v-for="mahsulot in mahsulotlar" :key="mahsulot" :to="'/kmahsulotlar/' + mahsulot.category_id"><span>{{ mahsulot.name }}</span><span>{{ mahsulot.quantity }} {{ mahsulot.measure }}</span></router-link>
        </ul>
      </li>
      <li class="list-group-item" style="width: 100%">
        <h4> Nasiyalar </h4>
        <ul class="list-group list-group-sm">
          <router-link @click="close()" class="list-group-item d-flex justify-content-between" v-for="nasiya in nasiyalar" :key="nasiya" to="/nasiya"><span>{{ nasiya.name }}</span></router-link>
        </ul>
      </li>
      <li class="list-group-item" style="width: 100%">
        <h4> Noto'g'ri sotuv narxlar </h4>
        <ul class="list-group list-group-sm">
          <li class="list-group-item d-flex justify-content-between"><strong> Mahsulot narx </strong><strong> Savdo narx </strong></li>
          <router-link
            class="list-group-item d-flex justify-content-between" 
            v-for="narx in narxlar" 
            :key="narx"
            :to="'/thisTrade/' + narx.order_id"
            @click="close()"
          >
            <span> {{ Intl.NumberFormat().format(narx.product_price) }} so'm </span>
            <span> {{ Intl.NumberFormat().format(narx.trade_price) }} so'm </span>
          </router-link>
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

        instance.get("loan_customers").then((respon) => {
          this.notice += respon.data.length
          this.nasiyalar = respon.data
        })

        instance.get("notifications").then((respon) => {
          this.notice += respon.data.length
          this.narxlar = respon.data
        })
    },
    close() {
      setTimeout(() => {
        this.notification = false
      }, 100);
    },
  },
  mounted() {
    console.clear()
    if (localStorage.getItem("access_token") && this.role == "branch_admin") {
      this.getData();
      setInterval(() => {
        this.getData();
      },60000);
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

#trade {
  width: 400px;
  max-height: 50vh;
  border: 1px solid var(--success);
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.6);
  padding: 5px;
  top: 30vh;
  left: 40%;
  backdrop-filter: blur(2px);
  transition: 1s;

  display: none;
  position: absolute;
  z-index: 1;
  animation: slide ease 0.5s;
}

@keyframes slide {
  from {height: 0px;}
  to {height: 100px;}
}

.drop {
  width: 400px;
  max-height: 50vh;
  overflow: auto;
  border: 1px solid var(--success);
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.6);
  padding: 5px;
  top: 90px;
  right: 2.5%;
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
    width: 95%;
  }
}

.dark .drop {
  color: white;
  background: rgba(63, 68, 73, 0.6);
}
</style>