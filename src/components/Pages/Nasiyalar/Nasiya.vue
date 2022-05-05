<template>
  <div class="container-fluid">
    <div class="card shadow">
      <div class="card-header">
        <div class="row">
          <div class="col-md">
            <h3><span v-if="!table">Nasiyalar</span><span v-if="table">{{ mijoz.name }}</span> <a v-if="table" :href="'tel:+998' + mijoz.phone">+998{{ mijoz.phone }}</a></h3>
          </div>

          <div class="col-md-4">
            <input
              type="search"
              class="form-control"
              placeholder="Qidiruv"
              v-model="search"
              v-if="!table"
            />
          </div>
        </div>
        <div class="card-body">
          <span class="my-custom-scrollbar table-wrapper-scroll-y text-center" v-if="!table">
            <table class="table table-sm table-borderless table-hover">
              <thead>
                <tr>
                  <th>№</th>
                  <th>Mijoz</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(mijoz, idx) in filterRow" :key="mijoz">
                  <th>{{ idx + 1 }}</th>
                  <td>{{ mijoz.name }} <a :href="'tel:+998' + mijoz.phone">+998{{ mijoz.phone }}</a></td>
                  <td>
                    <button
                      class="btn btn-sm btn-info"
                      @click="getNasiya(mijoz)"
                    >
                      <span class="fa fa-info"/>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </span>
          <span  class="my-custom-scrollbar table-wrapper-scroll-y text-center" v-if="table">
            <table class="table table-sm table-borderless table-hover">
              <thead>
                <tr>
                  <th>№</th>
                  <th>Miqdori</th>
                  <th>Sana</th>
                  <th>Qaytarish vaqti</th>
                  <th>
                    <button class="btn btn-sm" @click="table = false">
                      <span class="fa fa-arrow-up"/>
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(nasiya, idx) in nasiyalar" :key="nasiya">
                  <th>{{ idx + 1 }}</th>
                  <td>
                    {{
                      Intl.NumberFormat({ style: "currency" }).format(
                        nasiya.price
                      )
                    }}
                    so'm
                  </td>
                  <td>{{ nasiya.time.replace("T", " ") }}</td>
                  <td>{{ nasiya.return_date }}</td>
                  <td>
                    <button
                      class="btn btn-outline-info float-right btn-sm mr-2"
                      data-toggle="modal"
                      data-target="#exampleModal"
                      @click="loan_id = nasiya.id"
                    >
                      <i class="fa fa-coins"></i>
                    </button>
                    <a
                      class="btn btn-outline-secondary float-right btn-sm mb-2"
                      href="#loan"
                      data-toggle="modal"
                      @click="getLoan(nasiya.id)"
                    >
                      <i class="fa fa-clock-rotate-left"></i>
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </span>
        </div>
      </div>
    </div>
  </div>
  <!-- Modal post -->
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
          <h5 class="modal-title" id="exampleModalLabel">Nasiyani to'lash</h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <form @submit.prevent="payToLoan(loan_id)">
          <div class="modal-body">
            <label>Narx</label>
            <div class="input-group mb-2">
              <input
                type="number"
                class="form-control"
                placeholder="Summani kiriting"
                v-model="post.price"
                min="0"
              />
              <div class="input-group-append">
                <div class="input-group-text">so'm</div>
              </div>
            </div>
            <textarea
              class="form-control"
              placeholder="Izoh"
              v-model="post.comment"
            />
          </div>
          <div class="modal-footer">
            <button type="submit" class="btn btn-outline-info">
              Tasdiqlash
            </button>
            <button
              type="button"
              class="btn btn-outline-danger"
              data-dismiss="modal"
            >
              Bekor qilish
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <!-- Modal post end -->
  <div class="modal fade" id="loan">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h4>Ushbu nasiya to'lovlari</h4>
        </div>
        <div class="modal-body">
          <table class="table table-hover table-borderless text-center">
            <tbody>
              <tr v-for="nasiya in tolovlar" :key="nasiya">
                <td> {{ Intl.NumberFormat().format(nasiya.price) }} so'm </td>
                <td> {{ nasiya.time.replace("T", " ") }} </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <isloading :isloading="isloading" :message="errorr" />
</template>

<script>
import { instance } from "../Api";
import isloading from "../../Anime/Anime.vue";
import swal from "sweetalert";

export default {
  components: { isloading },
  data() {
    return {
      post: {
        price: null,
        comment: "",
      },
      nasiyalar: [],
      mijozlar: [],
      mijoz: "",
      tolovlar: [],
      loan_id: "",
      search: "",
      errorr: "",
      isloading: true,
      table: false,
    };
  },
  methods: {
    getData() {
      this.mijozlar = [];
      instance
        .get("loan_customers")
        .then((response) => {
          this.mijozlar = response.data
          this.isloading = false
        })
        .catch((err) => {
          this.isloading = false;
          this.errorr = err.message;
        });
    },
    getNasiya(mijoz) {
      this.mijoz = mijoz
      this.isloading = true
      instance.get("this_customer_loans/" + mijoz.id).then((response) => {
        this.nasiyalar = response.data
        this.table = true
        this.isloading = false
      }).catch((err) => {
        this.errorr = err.message
        this.isloading = false
      })
    },
    payToLoan(id) {
      instance
        .post("pay_to_loan/" + id, this.post)
        .then((response) => {
          if (response.status == 200) {
            swal({
              icon: "success",
              timer: 1000,
            }).then(() => {
              location.reload();
            });
          }
        })
        .catch((err) => {
          this.isloading = false;
          this.errorr = err.message;
        });
    },
    getLoan(id) {
      this.isloading = true
      instance.get("this_loan_incomes/" + id).then((respon) => {
        this.tolovlar = respon.data
        this.isloading = false
      })
    },
  },
  computed: {
    filterRow: function () {
      return this.mijozlar.filter((mijozlar) => {
        return mijozlar.name.toLowerCase().match(this.search.toLowerCase()) || String(mijozlar.phone).match(this.search)
      });
    },
  },
  mounted() {
    this.getData();
  },
};
</script>
