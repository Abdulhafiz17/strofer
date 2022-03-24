<template>
  <div class="container-fluid">
    <div class="card shadow">
      <div class="card-header">
        <div class="row">
          <div class="col-md-4">
            <h3>Nasiyalar</h3>
          </div>

          <div class="col-md-4">
            <input type="text" class="form-control" placeholder="qidiruv" />
          </div>
        </div>
        <div class="card-body">
          <table class="table table-bordered table-hover">
            <thead>
              <tr>
                <th scope="col">№</th>
                <th scope="col">Mijoz ismi</th>
                <th scope="col">Telefon raqami</th>                
                <th scope="col">Miqdori</th>
                <th scope="col">Sana</th>
                <th scope="col">Qaytarish vaqti</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(gets, idx) in get" :key="gets">
                <th scope="row">{{ idx + 1 }}</th>
                <th class="text-center col-md-3"></th>
                <th class="text-center col-md-3"></th>
                <td class="text-center col-md-3">{{ gets.price }}</td>
                <td class="text-center col-md-3">{{ gets.time }}</td>
                <td class="text-center col-md-4">{{ gets.return_date }}</td>
                <td>
                  <button
                    class="btn btn-outline-success float-right btn-sm mr-2"
                    data-toggle="modal"
                    data-target="#exampleModal"
                  >
                    <i class="fa fa-coins"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
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
          <h5 class="modal-title" id="exampleModalLabel">Post</h5>
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
          <label>Narx</label>
          <input
            type="text"
            class="form-control"
            placeholder="narxni kiriting"
            v-model="post.price"
          />
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-success" @click.prevent="postData">
            Tasdiqlash
          </button>
          <button
            type="button"
            class="btn btn-outline-danger"
            data-dismiss="modal"
          >
            Bekok qilish
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- Modal post end -->
</template>

<script>
import { instance } from "../Api";

export default {
  data() {
    return {
      get: [],
      post: {
        price: null,
      },
    };
  },
  methods: {
    postData(id) {
      instance.post("pay_to_loan/" + id, this.post).then((response) => {
        console.log(response.data);
       
      });
    },

    getData() {
      instance.get("all_loans").then((response) => {
        this.get = response.data;
        console.log(response.data);
      });
    },
  },
  mounted() {
    this.getData();
  },
};
</script>
