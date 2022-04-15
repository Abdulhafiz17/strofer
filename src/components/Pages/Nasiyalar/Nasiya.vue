<template>
  <div class="container-fluid">
    <div class="card shadow">
      <div class="card-header">
        <div class="row">
          <div class="col-md-4">
            <h3>Nasiyalar</h3>
          </div>

          <div class="col-md-4">
            <input
              type="text"
              class="form-control"
              placeholder="qidiruv"
              v-model="search"
            />
          </div>
        </div>
        <div class="card-body">
          <span class="my-custom-scrollbar table-wrapper-scroll-y">
            <table class="table table-bordered table-hover">
              <thead>
                <tr>
                  <th scope="col">№</th>
                  <th scope="col">Mijoz</th>
                  <th scope="col">Miqdori</th>
                  <th scope="col">Sana</th>
                  <th scope="col">Qaytarish vaqti</th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(gets, idx) in filterRow" :key="gets">
                  <th scope="row">{{ idx + 1 }}</th>
                  <td class="text-center col-md-3">{{ gets.customer }}</td>
                  <td class="text-center col-md-3">
                    {{
                      Intl.NumberFormat({ style: "currency" }).format(
                        gets.price
                      )
                    }}
                    so'm
                  </td>
                  <td class="text-center col-md-3">{{ gets.time }}</td>
                  <td class="text-center col-md-3">{{ gets.return_date }}</td>
                  <td>
                    <button
                      class="btn btn-outline-success float-right btn-sm mr-2"
                      data-toggle="modal"
                      data-target="#exampleModal"
                      @click="loan_id = gets.id"
                    >
                      <i class="fa fa-coins"></i>
                    </button>
                  </td>
                  <td>
                    <a
                      class="btn btn-outline-secondary float-right btn-sm mb-2"
                      href="#loan"
                      data-toggle="modal"
                      @click="getLoan(gets.id)"
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
            <button type="submit" class="btn btn-outline-success">
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
              <tr v-for="nasiya in nasiyalar" :key="nasiya">
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
      get: [],
      post: {
        price: null,
        comment: "",
      },
      nasiyalar: [],
      loan_id: "",
      search: "",
      errorr: "",
      isloading: true
    };
  },
  methods: {
    getData() {
      this.get = [];
      instance
        .get("all_loans")
        .then((response) => {
          response.data.forEach((element) => {
            instance.get("this_customer/" + element.customer_id).then((res) => {
              let loan = {
                id: element.id,
                customer: res.data.name,
                price: element.price,
                return_date: element.return_date,
                time: element.time.replace("T", " "),
              };
              this.get.push(loan);
              this.isloading = false
            });
          });
          console.log(this.get);
          this.isloading = false
        })
        .catch((err) => {
          this.isloading = false;
          this.errorr = err.message;
        });
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
        console.log(respon.data);
        this.nasiyalar = respon.data
        this.isloading = false
      })
    },
  },
  computed: {
    filterRow: function () {
      return this.get.filter((items) => {
        for (let item in items) {
          if (
            String(items[item])
              .toLowerCase()
              .indexOf(this.search.toLowerCase()) !== -1
          ) {
            return true;
          }
        }
        return false;
      });
    },
  },
  mounted() {
    this.getData();
  },
};
</script>
