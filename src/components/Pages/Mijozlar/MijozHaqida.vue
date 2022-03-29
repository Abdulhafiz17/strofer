<template>
  <div class="container-fluid">
    <div class="card shadow">
      <div class="card-header"><h3>Mijoz haqida</h3></div>
      <div class="card-body">
        <div class="row">
          <div class="col-md-6 mb-3">
            <div class="card shadow mb-4">
              <div class="card-header">
                <h4 class="card-title">
                  <span class="fas fa-coins"></span> Nasiyalar tarixi
                </h4>
              </div>
              <div class="card-body">
                <div class="table-responsive text-center">
                  <table class="table table-sm table-hover table-borderless">
                    <thead>
                      <tr>
                        <th>№</th>
                        <th>Summa</th>
                        <th>Sana</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(loan, idx) in loans" :key="loan">
                        <td>{{ idx + 1 }}</td>
                        <td>{{ loan.price }}</td>
                        <td>{{ loan.time }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6 mb-3">
            <div class="card shadow mb-4">
              <div class="card-header">
                <h4 class="card-title">
                  <span class="fas fa-history"></span> Buyurtmalar tarixi
                </h4>
              </div>
              <div class="card-body">
                <div class="table-responsive text-center">
                  <table class="table table-sm table-borderless table-hover">
                    <thead>
                      <tr>
                        <th>№</th>
                        <th>Sana</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(customers, idx) in customer" :key="customers">
                        <td>{{ idx + 1 }}</td>
                        <td
                          data-toggle="modal"
                          data-target="#exampleModal"
                          @click="getData1(customers)"
                        >
                          {{ customers.time }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Modal buyrutma tarixi -->
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <table class="table table-sm table-bordered table-hover">
            <thead>
              <tr>
                <th>product_code</th>
                <th>Qoldiq</th>
                <th>Sotuv narxi</th>
                 <th>Dona</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="tradis in tradies" :key="tradis">
                <td class="text-center">{{ tradis.name }}</td>
                <td class="text-center">{{ tradis.quantity }}</td>
                <td class="text-center">{{ tradis.selling_price }}</td>
                <td class="text-center">{{ tradis.measure }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            Close
          </button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div> -->
      </div>
    </div>
  </div>
  <!-- Modal buyrutma tarixi end -->
  <isloading :isloading="isloading" />
</template>

<script>
import { instance } from "../Api";
import isloading from "../../Anime/Anime.vue";
import { resolveDynamicComponent } from "@vue/runtime-core";
export default {
  components: { isloading },
  data() {
    return {
      isloading: false,
      customer: [],
      loans: [],
      tradies: [],
    };
  },
  methods: {
    getData() {
      // this.isloading = true
      instance
        .get("this_customer_orders/" + this.$route.params.id)
        .then((response) => {
          this.customer = response.data;
          // console.log(response.data);
          // this.isloading = false
        });

<<<<<<< HEAD
      this.isloading = true
      instance.get("this_customer_loans/" + this.$route.params.id).then((response) => {
        console.log(response.data)
      })
=======
      // isloading = true
      instance
        .get("this_customer_loans/" + this.$route.params.id)
        .then((response) => {
          this.loans = response.data;
          // console.log(response.data);
        });
    },
    getData1(object) {
      this.tradies = [];
      instance.get("this_order_trades/" + object.id).then((response) => {
        response.data.forEach((element) => {
          instance
            .get("this_product/empty/" + element.product_code)
            .then((response) => {
              let mahuslot = {
                name: response.data[0].name,
                quantity: element.quantity,
                selling_price: element.selling_price,
                measure: element.measure,
              };
              this.tradies.push(mahuslot);
            });
        });
      });
>>>>>>> b0ed7760c4c788ed848dbf537e0f6614c4eee457
    },
  },
  mounted() {
    // console.clear()
    this.getData();
  },
};
</script>