<template>
  <div class="container-fluid">
    <div class="card shadow">
      <div class="card-header">
        <div class="row">
          <div class="col-md">
            <h3>Tayyor mahsulot ombori</h3>
          </div>
          <div class="col-md">
            <button
              type="button"
              data-toggle="modal"
              data-target="#modal1"
              class="btn btn-outline-warning float-right"
            >
              <span class="fa fa-circle-plus"></span>
              Mahsulot qo'shish
            </button>
          </div>
        </div>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-md-4 mb-3">
            <div class="card shadow">
              <div class="card-body">
                <table class="table table-sm table-borderless">
                  <tbody>
                    <tr>
                      <th>
                        <span class="fa fa-warehouse text-secondary"></span>
                      </th>
                      <td>
                        <strong>Marg'ilon</strong>
                      </td>
                      <td>
                        <button
                          type="button"
                          data-toggle="modal"
                          data-target="#modal2"
                          class="btn btn-sm btn-outline-warning float-right"
                        >
                          <span class="fa fa-edit"></span>
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <th><span class="fa fa-map text-secondary"></span></th>
                      <td>Marg'ilon</td>
                    </tr>
                    <tr>
                      <th><i class="fa fa-coins text-secondary"></i></th>
                      <td>570 $</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="card-footer">
                <router-link
                  to="/TMkirish"
                  class="btn btn-outline-warning float-right"
                >
                  Kirish
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="modal fade" id="modal1">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h3>Tayyor mahsulot qo'shish</h3>
        </div>
        <div class="modal-body">
          <input
            type="text"
            name=""
            id=""
            class="form-control"
            placeholder="Nomi . . . "
          />

          <input
            type="text"
            name=""
            id=""
            class="form-control mt-4"
            placeholder="Manzili . . ."
          />
        </div>
        <div class="modal-footer">
          <button class="btn btn-outline-primary">
            <span class="fa fa-check-circle"></span> Tasdiqlash
          </button>
          <button class="btn btn-outline-danger" data-dismiss="modal">
            <span class="fa fa-circle-xmark"></span> Orqaga
          </button>
        </div>
      </div>
    </div>
  </div>

  <div class="modal fade" id="modal2">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h3>Ombori o'zgartirish</h3>
        </div>
        <div class="modal-body">
          <input
            type="text"
            name=""
            id=""
            class="form-control"
            placeholder="Nomi . . . "
          />
        </div>
        <div class="modal-body">
          <input
            type="text"
            name=""
            id=""
            class="form-control"
            placeholder="Manzili . . . "
          />
        </div>
        <div class="modal-footer">
          <button class="btn btn-outline-primary">
            <span class="fa fa-check-circle"></span> Tasdiqlash
          </button>
          <button class="btn btn-outline-danger" data-dismiss="modal">
            <span class="fa fa-circle-xmark"></span> Orqaga
          </button>
        </div>
      </div>
    </div>
  </div>

  <div class="container-fluid"></div>
</template>


<script>
export default {};
</script>

<style>
</style>





