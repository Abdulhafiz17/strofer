<template>
  <div class="container-fluid">
    <div class="card shadow">
      <div class="card-header">
        <div class="row">
          <div class="col-md-4"><h3>Mahsulotlar</h3></div>
          <div class="col-md-4">
            <input type="search" class="form-control" placeholder="qidiruv" />
          </div>
          <div class="col-md-4"></div>
        </div>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-md">
            <div class="table-responsive mt-3">
              <table class="table table-bordered table-hover text-center">
                <thead>
                  <tr>
                    <th scope="col">№</th>
                    <th scope="col">Code</th>
                    <th scope="col">Mahsulot</th>
                    <th scope="col">Brand</th>
                    <th scope="col">Narx</th>
                    <th scope="col">Sotuv narx</th>
                    <th scope="col">Oxirgi narx</th>
                    <th scope="col">Miqdor</th>
                    <th scope="col">Minimal qoldiq</th>
                    
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>{{ mahsulotlars.code }}</td>
                    <td>{{ mahsulotlars.name }}</td>
                    <td>{{ mahsulotlars.brand }}</td>
                    <th>{{ mahsulotlars.price + som }}</th>
                    <td>{{ mahsulotlars.selling_price }}</td>
                    <td>{{ mahsulotlars.final_price }}</td>
                    <td>{{ mahsulotlars.quantity }}</td>
                    <td>{{ mahsulotlars.quantity_note }}</td>
                  
                      <button
                        class="btn btn-warning float-right btn-sm"
                        data-toggle="modal"
                        data-target="#exampleModal2"
                      >
                        <i class="fa fa-edit"></i>
                      </button>
                    
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Modal tahrirlash-->
  <div
    class="modal fade"
    id="exampleModal2"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel2"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel2">Tahrirlash</h5>
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
          <label>Nomi:</label>
          <input type="text" class="form-control" />
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            Qaytish
          </button>
          <button type="button" class="btn btn-primary" data-dismiss="modal">
            Tahrirlash
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- Modal end -->

  <!-- Modal -->
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
          <h5 class="modal-title" id="exampleModalLabel">Tahrirlash</h5>
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
          <label>Valyuta</label>
          <input type="text" class="form-control" /><br />

          <label>Narx</label>
          <input type="text" class="form-control" />
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            Qaytish
          </button>
          <button type="button" class="btn btn-primary" data-dismiss="modal">
            Tahrirlash
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- Modal end -->
</template>

<script>
import { instance } from "../Api";

export default {
  data() {
    return {
      mahsulotlars: [],
    };
  },

  methods: {
    getData() {
      instance.get("all_products/" + this.$route.params.id).then((response) => {
        this.mahsulotlars = response.data;
        console.log(response.data);
      });
    },
  },
  mounted() {
    this.getData();
  },
};
</script>