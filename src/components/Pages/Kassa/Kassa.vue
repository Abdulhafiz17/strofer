<template>
  <div class="container-fluid">
    <div class="card shadow">
      <div
        class="alert alert-warning fade show"
        role="alert"
        v-if="alert == 'price'"
      >
        <strong>Mahsulot sotuv narxi oxirgi narxdan past belgilandi !</strong>
      </div>
      <div class="card-header">
        <div class="row">
          <div class="col">
            <h3>Kassa</h3>
          </div>
          <div class="col">
            <button
              class="btn btn-success float-right"
              data-toggle="modal"
              href="#report"
              @click="getReport()"
              v-wave
            >
              <span class="fa fa-chart-pie"/> Kunlik hisobot
            </button>
          </div>
        </div>
      </div>
      <div class="card-body">
        <nav>
          <div
            class="nav nav-pills"
            id="nav-tab"
            role="tablist"
          >
            <button
              v-for="tab in buyurtmalar"
              :key="tab.id"
              :id="tab.id"
              class="nav-link btn btn-sm"
              @click="orderId = tab.id"
            >
              <button
                class="btn btn-sm text-danger"
                @click="deleteOrder(tab.id)"
              >
                <span class="far fa-circle-xmark" />
              </button>
              <router-link class="nav-link btn btn-sm" :to="'/buyurtma/' + tab.id" v-if="tab">
                {{ tab.number }} - buyurtma <br />
                {{ tab.time.substr(11, 8) }}
              </router-link>
            </button>
            <button class="btn btn-sm" @click="createOrder()">
              <span class="fa fa-circle-plus" />
            </button>
          </div>
        </nav>
        <hr />
      </div>
    </div>
  </div>
  <div class="modal fade" id="report">
    <div class="modal-dialog">
      <div class="modal-content">
        <center class="modal-body" id="order">
          <h3>{{sana}}</h3>
          <ul class="list-group" style="width: 100%; margin: 0; padding: 0">
            <li class="list-group-item list-group-item-action" style="display: flex; justify-content: space-between">
              <strong>Savdo: </strong>
              <strong>
                {{ Intl.NumberFormat().format(hisobot.sum_order_price) }} so'm
              </strong>
            </li>
            <li class="list-group-item list-group-item-action" style="display: flex; justify-content: space-between">
              <strong>Chegirma: </strong>
              <strong>
                {{ Intl.NumberFormat().format(hisobot.sum_order_discount) }} so'm
              </strong>
            </li>
            <li class="list-group-item list-group-item-action" style="display: flex; justify-content: space-between">
              <strong>Chiqim: </strong>
              <strong>
                {{ Intl.NumberFormat().format(hisobot.sum_expense_price) }} so'm
              </strong>
            </li>
            <li class="list-group-item list-group-item-action" style="display: flex; justify-content: space-between">
              <strong>Nasiya savdo: </strong>
              <strong>
                {{ Intl.NumberFormat().format(hisobot.sum_loan_price) }} so'm
              </strong>
            </li>
            <hr/>
            <li class="list-group-item list-group-item-action" style="display: flex; justify-content: space-between">
              <strong>Savdo kirim: </strong>
              <strong>
                {{ Intl.NumberFormat().format(hisobot.sum_income_order_price) }} so'm
              </strong>
            </li>
            <li class="list-group-item list-group-item-action" style="display: flex; justify-content: space-between">
              <strong>Nasiya kirim: </strong>
              <strong>
                {{ Intl.NumberFormat().format(hisobot.sum_income_loan_price) }} so'm
              </strong>
            </li>
            <hr/>
            <li class="list-group-item list-group-item-action" style="display: flex; justify-content: space-between">
              <strong>Umumiy balans: </strong>
              <strong>
                {{ Intl.NumberFormat().format(hisobot.foyda) }} so'm
              </strong>
            </li>
          </ul>
        </center>
        <div class="modal-footer">
          <button class="btn btn-sm btn-success" @click="print()">
            <span class="fa fa-print"/>
          </button>
        </div>
      </div>
    </div>
  </div>
  <isloading :isloading="isloading" :message="errorr" />
</template>

<script>
import isloading from "../../Anime/Anime.vue";
import { instance } from "../Api";

export default {
  components: { isloading },
  data() {
    return {
      role: localStorage.getItem("role"),
      buyurtmalar: [],
      balance: 0,
      tradesLength: 0,
      orderId: "",
      isloading: true,
      errorr: "",
      hisobot: {},
      sana: null,
    };
  },
  methods: {
    getBuyurtma() {
      this.isloading = true;
      this.buyurtmalar = [];
      this.buyurtmaMahsulotlar = [];
      instance
        .get("all_orders/false")
        .then((res) => {
          this.buyurtmalar = res.data;
          this.isloading = false;
        })
        .catch((err) => {
          this.isloading = false;
          this.errorr = err.message;
        });
    },
    getReport() {
      console.clear()
      this.isloading = true
      instance
        .get("statistics_today")
        .then((response) => {
          console.log(response.data);
          this.hisobot = response.data
          this.isloading = false
        })
    },
    createOrder() {
      this.isloading = true;
      this.buyurtmalar = [];
      instance
        .post("create_order")
        .then((response) => {
          if (response.status == 200) {
            this.buyurtmalar = response.data;
            this.isloading = false;
          }
        })
        .catch((err) => {
          this.isloading = false;
          this.errorr = err.message;
        });
    },
    deleteOrder(id) {
      this.isloading = true;
      this.buyurtmalar = [];
      instance
        .delete("remove_this_order/" + id)
        .then((res) => {
          if (res.status == 200) {
            this.buyurtmalar = res.data;
            this.isloading = false
          }
        })
        .catch((err) => {
          this.isloading = false;
          this.errorr = err.message;
        })
    },
    print() {
      let order = document.querySelector("#order").outerHTML
      let print = window.open("", "", "width=400,height=500")
      print.document.write(`<title>Hisobot</title>`)
      print.document.write(`${order}`)
    },
  },
  computed: {
    even: function (arr) {
      // Set slice() to avoid to generate an infinite loop!
      return arr.slice().sort(function (a, b) {
        return a.position - b.position;
      });
    },
  },
  mounted() {
    console.clear();
    this.getBuyurtma();
    this.sana = new Date().getDate() + "." + (new Date().getMonth() + 1) + "." +  new Date().getFullYear()
  },
};
</script>

<style scoped>
.alert-warning {
  position: absolute;
  width: 95%;
  margin: auto;
  z-index: 1;
  bottom: 85%;
  left: 10px;
  right: 10px;

  border: 1px solid gold;
  color: black;
}

td,
th {
  padding: 2px;
}
</style>