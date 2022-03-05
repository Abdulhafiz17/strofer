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
          <div class="col-md-4 mt-3">
            <div class="card shadow">
              <div class="card-body">
                <div class="row">
                  <div class="col-md-12">
                    <div class="row">
                      <div class="col-md-4">
                        <h4 class="card-title">№</h4>
                      </div>
                      <div class="col-md-6">
                        <h4>Nomi</h4>
                      </div>
                      <div class="col-md-2">
                        <button
                          class="btn btn-warning float-right btn-sm"
                          data-toggle="modal"
                          data-target="#exampleModal2"
                        >
                          <i class="fa fa-edit"></i>
                        </button>
                      </div>
                      <div class="col"></div>
                      <div class="col-md-10"></div>
                      <div class="col"></div>
                    </div>
                  </div>
                </div>
              </div>
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
</template>