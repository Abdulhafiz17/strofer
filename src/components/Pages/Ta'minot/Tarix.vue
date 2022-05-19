<template>
  <div class="container-fluid">
    <div id="chevron"></div>
    <router-link class="btn btn-outline-success btn-sm mb-2" to="/taminot">
      <span class="fa fa-arrow-left"></span> Ortga
    </router-link>
    <div class="card shadow">
      <div class="card-header">
        <div class="row">
          <div class="col-md">
            <h3>{{ taminotchi.name }} tarixi ㅤㅤ Balans : <span v-for="balance in taminotchi.balances" :key="balance.id" :class="balance.balance > 0 ? 'text-danger' : 'text-success'">  {{ Intl.NumberFormat().format(Math.abs(balance.balance)) }} {{ balance.currency }} <span class="fa fa-coin"/> </span> </h3>
          </div>
        </div>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-md-6 mb-3">
            <div class="card shadow border-0">
              <div class="card-header">
                <h3>Ta'minot tarixi</h3>
                <div class="row">
                  <div class="col-md">
                    <div class="input-group">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Mahsulot orqali qidirish"
                        v-model="search"
                      />
                      <!-- <div class="input-group-append">
                        <div class="input-group-text">
                          <span class="fa fa-search"></span>
                        </div>
                      </div> -->
                    </div>
                  </div>
                </div>
              </div>
              <div class="card-body">
                <div class="table-wrapper-scrollbar my-custom-scrollbar">
                  <div class="table-responsive text-center">
                    <table class="table table-sm table-hover table-borderless">
                      <thead>
                        <th>№</th>
                        <th>Mahsulot</th>
                        <th>Narxi</th>
                        <th>Miqdori</th>
                        <th>Umumiy narxi</th>
                        <th>Sanasi</th>
                        <th></th>
                      </thead>
                      <tbody>
                        <tr v-for="(tarix, n) in filterRow || []" :key="tarix.id">
                          <td>{{ n + 1 }}</td>
                          <td>{{ tarix.product }} {{ tarix.brand }}</td>
                          <td>
                            {{
                              Intl.NumberFormat().format(
                                tarix.price
                              )
                            }}
                            {{ tarix.currency_id }}
                          </td>
                          <td>{{ tarix.quantity }} {{ tarix.measure }}</td>
                          <td>
                            {{
                              Intl.NumberFormat().format(
                                tarix.price * tarix.quantity
                              )
                            }}
                            {{ tarix.currency_id }}
                          </td>
                          <td>{{ tarix.time.substr("T", 10) }}</td>
                          <td>
                            <button
                              class="btn btn-sm btn-light"
                              @click="returnProduct(tarix)"
                            >
                              <span class="fa fa-undo"/>
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <!-- <div class="text-center">
                    <a href="#" class="blocks">&laquo;</a>
                    <a href="#" class="blocks">1</a>
                    <a href="#" class="blocks">2</a>
                    <a href="#" class="blocks">3</a>
                    <a href="#" class="blocks">&raquo;</a>
                  </div> -->
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="card shadow border-0">
              <div class="card-header">
                <h3>To'lov tarixi</h3>
                <div class="row">
                  <div class="col-sm-4 mb-2">
                    <input type="date" v-model="dateFrom" class="form-control" />
                  </div>
                  <div class="col-sm-4 mb-2">
                    <input type="date" v-model="dateTo" class="form-control" />
                  </div>
                  <div class="col-sm-4">
                    <div class="row">
                      <div class="col-sm mb-2">
                        <button class="btn btn-block btn-outline-success" @click="searchByDate(dateFrom, dateTo)">
                          <span class="fa fa-search"></span>
                        </button>
                      </div>
                      <div class="col-sm">
                        <button class="btn btn-outline-primary btn-block" @click="getData()">
                          <span class="fa fa-sync"/>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card-body">
                <div class="table-wrapper-scrollbar-y my-custom-scrollbar">
                  <div class="table-responsive text-center">
                    <table class="table table-sm table-hover table-borderless">
                      <thead>
                        <th>№</th>
                        <th>To'lov summa</th>
                        <th>Sana</th>
                        <th>Izoh</th>
                      </thead>
                      <tbody>
                        <tr v-for="(tarix, n) in tolovTarix" :key="tarix.id">
                          <td>{{ n + 1 }}</td>
                          <td>
                            {{
                              Intl.NumberFormat({ style: "currency" }).format(
                                tarix.price
                              )
                            }}
                            {{ tarix.currency }}
                          </td>
                          <td>{{ tarix.date_time }}</td>
                          <td>{{ tarix.comment }}</td>
                        </tr>
                      </tbody>
                    </table>
                    <!-- <div class="text-center">
                      <a href="#" class="blocks">&laquo;</a>
                      <a href="#" class="blocks">1</a>
                      <a href="#" class="blocks">2</a>
                      <a href="#" class="blocks">3</a>
                      <a href="#" class="blocks">&raquo;</a>
                    </div> -->
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="modal fade" id="return">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h3>{mahsulot} dan qaytarish</h3>
        </div>
      </div>
    </div>
  </div>

  <isloading :isloading="isloading" :message="error"/>
</template>

<script>
import { instance } from "../Api";
import isloading from "../../Anime/Anime.vue"
import swal from 'sweetalert';
export default {
  components: { isloading },
  data() {
    return {
      taminotchi: {},
      tolovTarix: [],
      taminotTarix: [],
      balances: [],
      dateFrom: "",
      dateTo: "",
      tarix: {
        user: "",
        product: "",
        quantity: null,
        hajm: "",
        price: null,
        currency: "",
        comment: "",
        date_time: "",
      },
      search: "",
      isloading: true,
      error: "",
    };
  },
  methods: {
    getData() {
      this.tolovTarix = []
      instance.get("market_expenses/" + this.$route.params.id).then((res) => {
        if (res.data.length > 0) {
          res.data.forEach((element) => {
                this.tolovTarix.push({
                  currency: element.currency_id,
                  price: element.price,
                  comment: element.comment,
                  date_time: element.time.replace("T", " "),
                });
                this.isloading = false
          });
        } else {
          this.isloading = false
        }
      }).catch((err) => {
        this.error = err.message
        this.isloading = false
      })
    },
    getData2() {
      this.taminotTarix = []
      instance
        .get("all_supplies/" + this.$route.params.id + "/true")
        .then((res) => {
          this.taminotTarix = res.data
          this.isloading = false
        })
        .catch((err) => {
          this.errorr = err.message
          this.isloading = false;
        });
    },
    searchByDate(from, to) {
      this.isloading = true
      let tarix = []
      this.tolovTarix.forEach(element => {
        element.date_time.substring(0, 10)
        if (element.date_time >= from && element.date_time <= to) {
          tarix.push(element)
        }
      });
      this.tolovTarix = tarix
      this.isloading = false
    },
    returnProduct(product) {
      this.isloading = true
      swal({
        title: product.product + " mahsulotidan qaytarib olish",
        content: {
          element: "input",
          attributes: {
            placeholder: "Mahsulot hajmini kiriting",
          }
        }
      }).then((value) => {
        if (value < 0) {
          swal({
            icon: "warning",
            title: "Noto'g'ri qiymat !",
            timer: 1000
          }).then(
            this.isloading = false
          )
        } else {
          instance.delete("remove_this_supply/" + product.id + "/?vozvrat_quantity=" + value)
          .then((response) => {
            if (response.status == 200) {
              swal({
                icon: "success",
                timer: 700,
              }).then(
                this.isloading = false,
                setTimeout(() => {
                  // this.getData()
                  // this.getData2()
                  location.reload()
                }, 100)
              )
            }
          })
          .catch((err) => {
            this.error = err.message
            this.isloading = false
          })
        }
      })
    },
  },
  mounted() {
    console.clear()
    instance.get("this_market/" + this.$route.params.id).then((res) => {
      this.taminotchi = res.data;
    })
    setTimeout(() => {
      this.getData();
      this.getData2();
    }, 100);
  },
  computed: {
    filterRow: function () {
      return this.taminotTarix.filter((items) => {
        for (let item in items) {
          if (String(items[item]).toLowerCase().indexOf(this.search.toLowerCase()) !== -1) {
            return true;
          }
        }
        return false;
      });
    },
  },
};
</script>

<style scoped>
    /* #chevron:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 51%;
      background: var(--info);
      transform: skew(0deg, 20deg);
    }
    #chevron:after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      height: 100%;
      width: 50%;
      background: var(--info);
      transform: skew(0deg, -20deg);
    } */
</style>