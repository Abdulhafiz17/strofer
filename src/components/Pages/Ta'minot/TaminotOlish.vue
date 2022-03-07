<template>
  <div class="container-fluid">
    <router-link class="btn btn-outline-success btn-sm mb-2" to="/taminot">
      <span class="fa fa-arrow-left"></span> Orqaga
    </router-link>
    <div class="card shadow">
      <div class="card-header">
        <div class="row">
          <div class="col-md">
            <h3>
              {{ taminotchi.name }}dan ta'minot olish
            </h3>
          </div>
          <div class="col-md">
            <router-link
              class="btn btn-outline-success float-right ml-3"
              to="/tolovTarixi"
            >
              <span class="far fa-clock"></span> To'lo'v tarixi
            </router-link>
            <router-link
              class="btn btn-outline-success float-right"
              to="/taminotTarixi"
            >
              <span class="far fa-clock"></span> Ta'minot tarixi 
            </router-link>
          </div>
        </div>
      </div>
      <div class="card-body">
        <div class="row my-3">
          <div class="col-sm-3 mx-auto">
            <input
              type="number"
              class="form-control"
              placeholder="code"
              required
            />
            <button class="btn btn-outline-success"></button>
          </div>
        </div>
        <!-- <div class="table-responsive">
          <table
            class="table table-sm table-hover table-borderless text-center"
          >
            <thead>
              <tr>
                <th>№</th>
                <th>Xomashyo</th>
                <th>Miqdori</th>
                <th>Narxi</th>
                <th>Umumiy narxi</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Serio</td>
                <td>17'000so'm/kg</td>
                <td>950 kg</td>
                <td>16'150'000so'm</td>
                <td>
                  <button class="btn btn-outline-danger">
                    <span class="far fa-circle-xmark"></span>
                  </button>
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>Ximikat</td>
                <td>26'000so'm/kg</td>
                <td>1 tonna</td>
                <td>26'000'000so'm</td>
                <td>
                  <button class="btn btn-outline-danger">
                    <span class="far fa-circle-xmark"></span>
                  </button>
                </td>
              </tr>
            </tbody>
            <tfoot class="mt-4">
              <tr style="border-top: 1px solid black">
                <td colspan="4" class="text-right align-items-center">
                  Jami summa: <strong> 42 150 000 so'm </strong>
                </td>
                <td>
                  <button
                    class="btn btn-outline-success float-left"
                    data-toggle="modal"
                    data-target="#modal1"
                  >
                    <span class="far fa-circle-check"></span> Tasdiqlash
                  </button>
                </td>
              </tr>
            </tfoot>
          </table>
        </div> -->
      </div>
    </div>
  </div>
  <div class="modal fade" id="modal1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h3>Ta'minotni tasdiqlash</h3>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-md">
              <h4><small> Ta'minot summasi: </small> 42 150 000 so'm</h4>
            </div>
          </div>
          <!-- <button
            class="btn btn-outline-success btn-block"
            data-toggle="collapse"
            data-target="#collapse1"
          >
            To'lo'v qilish
          </button> -->
          <div class="" id="">
            <div class="input-group mt-3">
              <input
                type="text"
                class="form-control"
                value=""
                placeholder="0"
              />
              <div class="input-group-append">
                <span class="input-group-text"> so'm </span>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-outline-primary">
            <span class="far fa-circle-check"></span> Tasdiqlash
          </button>
          <button class="btn btn-outline-danger" data-dismiss="modal">
            <span class="far fa-xmark-circle"></span> Bekor qilish
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { instance } from '../Api';
export default {
  data() {
    return {
      taminotchi: {},
    };
  },
  methods: {
    getData() {
      instance.get("this_market/" + this.$route.params.id)
      .then((res) => {
        this.taminotchi = res.data
      })
    },
    showText() {
      // let n = document.getElementById("narx").value;
      // n = new Intl.NumberFormat({style: "currency",}).format(n)
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<style>

</style>