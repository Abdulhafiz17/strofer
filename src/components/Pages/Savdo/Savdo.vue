<template>
  <div class="container-fluid">
    <div class="card shadow">
      <div class="card-header">
        <h3>Savdo</h3>
      </div>
      <div class="card-body">
        <nav>
          <div class="nav nav-pills" id="nav-tab" role="tablist">
            <button
             v-for="(tab, n) in buyurtmalar" :key="tab.id"
              class="nav-link"
              data-bs-toggle="tab"
              :data-bs-target="'#nav' + tab.id"
              type="button"
              role="tab"
              :aria-controls="'nav' + tab.id"
              aria-selected="true"
            >
              {{ n + 1 }} - buyutma
              <button class="btn btn-sm text-danger" @click="deleteOrder(tab.id)">
                  <span class="far fa-circle-xmark"/>
              </button>
            </button>
            <button
              class="btn"
              type="button"
              @click="createOrder()"
            >
              <span class="fa fa-circle-plus text-success"/>
            </button>
          </div>
        </nav>
        <hr/>
        <div class="tab-content" id="nav-tabContent">
          <span
          v-for="(tab, n) in buyurtmalar" :key="tab.id"
            class="tab-pane fade"
            :id="'nav' + tab.id"
            role="tabpanel"
            :aria-labelledby="'nav' + tab.id"
          >
            <div class="container-fluid">
                <div class="card shadow border-0 mt-2">
                    <div class="card-header text-center">
                        <h4> {{ n + 1 }} - buyurtma </h4>
                    </div>
                    <div class="card-body">
                        {{ tab.time.replace("T", " ") }}
                    </div>
                </div>
            </div>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { instance } from "../Api";
export default {
  data() {
    return {
      role: localStorage.getItem("role"),
      buyurtmalar: [],
    };
  },
  methods: {
    getData() {
      instance.get("all_orders/false").then((res) => {
          this.buyurtmalar = res.data
        console.log(res.data);
      });
    },
    createOrder() {
        instance.post("create_order")
        .then(() => {
            setTimeout(() => {
                this.getData();
            }, 400);
        })
    },
    deleteOrder(id) {
        instance.delete("remove_this_order/" + id)
        .then(() => {
            setTimeout(() => {
                this.getData();
            }, 400);
        })
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<style>
@import url("./Savdo.css");
</style>