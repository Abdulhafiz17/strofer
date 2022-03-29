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
                        <th>#</th>
                        <th>Summa</th>
                        <th>Sana</th>
                        <th>Olgan hodim</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>100$</td>
                        <td>2022.01.05</td>
                        <td>Abdulhafiyz</td>
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
                        <th>#</th>
                        <th>Kategoriya</th>
                        <th>Mahsulot</th>
                        <th>Hajm</th>
                        <th>Sana</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>HHH</td>
                        <td>telefon</td>
                        <td>10</td>
                        <td>2022.01.05</td>
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
  <isloading :isloading="isloading"/>
</template>

<script>
import { instance } from '../Api'
import isloading from "../../Anime/Anime.vue"
export default {
  components: { isloading },
  data() {
    return {
      isloading: false,
    }
  },
  methods: {
    getData() {
      this.isloading = true
      instance.get("this_customer_orders/" + this.$route.params.id).then((response) => {
        console.log(response.data)
        this.isloading = false
      })

      this.isloading = true
      instance.get("this_customer_loans/" + this.$route.params.id).then((response) => {
        console.log(response.data)
      })
    },
  },
  mounted() {
    console.clear()
    this.getData()
  },
}
</script>