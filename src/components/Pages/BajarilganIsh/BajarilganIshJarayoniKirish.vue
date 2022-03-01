<template>
  <div class="container-fluid">
    <router-link
      class="btn btn-outline-warning btn-sm mb-2"
      to="/bajarilganIsh"
    >
      <span class="fa fa-arrow-left"></span> Orqaga
    </router-link>
    <div class="card shadow">
      <div class="card-header">
        <div class="row">
          <div class="col-md-6 mb-2">
            <h3>Ko'ylak tsexi</h3>
          </div>
          <div class="col-md-6">
            <button
              class="btn btn-outline-warning float-right m-1"
              data-toggle="collapse"
              data-target="#collapse1"
            >
              <span class="fa fa-bars"></span>
            </button>
            <button
              class="btn btn-outline-warning float-right m-1"
              data-toggle="modal"
              data-target="#modal2"
            >
              <span class="fa fa-recycle"></span>
            </button>
          </div>
        </div>
      </div>
      <div class="card-body">
        <div class="collapse" id="collapse1">
          <div class="row my-2">
            <div class="col-md mb-3">
              <div class="card shadow">
                <div class="card-body">
                  <div class="row">
                    <div class="col-md">
                      <h6>Pichish</h6>
                    </div>
                    <div class="col-md">
                      <span
                        class="fa fa-2x fa-chevron-right float-right"
                      ></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md mb-3">
              <div class="card shadow">
                <div class="card-body">
                  <div class="row">
                    <div class="col-md">
                      <h6>Tikish</h6>
                    </div>
                    <div class="col-md">
                      <span
                        class="fa fa-2x fa-chevron-right float-right"
                      ></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md mb-3">
              <div class="card shadow">
                <div class="card-body">
                  <div class="row">
                    <div class="col-md">
                      <h6>Dazmollash</h6>
                    </div>
                    <div class="col-md">
                      <span
                        class="fa fa-2x fa-chevron-right float-right"
                      ></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md mb-3">
              <div class="card shadow">
                <div class="card-body">
                  <div class="row">
                    <div class="col-md">
                      <h6>Qadoqlash</h6>
                    </div>
                    <div class="col-md">
                      <span
                        class="fa fa-2x fa-chevron-right float-right"
                      ></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-3 mb-2">
            <select class="form-control" name="" id="">
              <option value="">Ish turi</option>
              <option value="">Bichish</option>
              <option value="">Tikish</option>
              <option value="">Dazmollash</option>
              <option value="">Qadoqlash</option>
            </select>
          </div>
          <div class="col-md-3 mb-2">
            <select class="form-control" name="" id="">
              <option value="">Ishchilar</option>
              <option value="">Abdulahad</option>
              <option value="">Abdurahmon</option>
              <option value="">Abubakir</option>
              <option value="">Humoyun</option>
            </select>
          </div>
          <div class="col-md-3 mb-2">
            <div class="input-group">
              <input
                type="text"
                class="form-control"
                placeholder="Ish miqdori"
              />
              <!-- <select class="form-control" name="" id="">
                <option value="">Ish miqdori</option>
                <option value="">dona</option>
              </select> -->
              <div class="input-group-append">
                <span class="input-group-text">dona</span>
              </div>
            </div>
          </div>
          <div class="col-md-3 mb-2">
            <button class="btn btn-block btn-outline-warning">
              <span class="far fa-circle-check"></span>
            </button>
          </div>
        </div>
        <div class="table-responsive-lg text-center">
          <table class="table table-sm table-hover table-borderless">
            <thead>
              <tr>
                <th>№</th>
                <th>Ish</th>
                <th>Ishchi</th>
                <th>Ish_miqdori</th>
                <th>Tahrirlash</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td style="cursor:pointer;" @click="shareWork">Qadoqlash</td>
                <td style="cursor:pointer;" @click="shareIshchi">Abdulahad</td>
                <td>70 juft</td>
                <td>
                  <button
                    class="btn btn-sm btn-outline-warning"
                    data-toggle="modal"
                    data-target="#modal1"
                  >
                    <span class="far fa-edit"></span>
                  </button>
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>Tikish</td>
                <td>Abdurahmon</td>
                <td>14 seria</td>
                <td>
                  <button
                    class="btn btn-sm btn-outline-warning"
                    data-toggle="modal"
                    data-target="#modal1"
                  >
                    <span class="far fa-edit"></span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="modal fade" id="modal1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h3>{ <span class="fa fa-user"></span> }ning bajargan ishi</h3>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-md-6 mb-2">
                <select class="form-control" name="" id="">
                  <option value="">Ish turi</option>
                  <option value="">Bichish</option>
                  <option value="">Tikish</option>
                  <option value="">Dazmollash</option>
                  <option value="">Qadoqlash</option>
                </select>
              </div>
              <div class="col-md-6 mb-2">
                <div class="input-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Ish miqdori"
                  />
                  <!-- <select class="form-control" name="" id="">
                    <option value="">Ish miqdori</option>
                    <option value="">dona</option>
                  </select> -->
                  <div class="input-group-append">
                    <span class="input-group-text">dona</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-outline-primary">
              <span class="far fa-circle-check"></span> Tasdiqlash
            </button>
            <button class="btn btn-outline-danger" data-dismiss="modal">
              <span class="far fa-circle-xmark"></span> Bekor qilish
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="modal2">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4>Tsexdagi homashyolar</h4>
            <button class="btn float-right" data-dismiss="modal">
              <span class="fa fa-xmark"></span>
            </button>
          </div>
          <div class="modal-body">
            <table
              class="table table-sm table-borderless table-hover text-center"
            >
              <thead>
                <tr>
                  <th>№</th>
                  <th>Nomi</th>
                  <th>Miqdori</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Tugma</td>
                  <td>100 dona</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Mato</td>
                  <td>240 metr</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Qadoqlash qutisi</td>
                  <td>320 dona</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    shareWork() {
      this.$router.push({ path: "/ishTarixi" });
    },
    shareIshchi() {
      this.$router.push({ path: "/kPITarixi" });
    },
  },
};
</script>

<style>
</style>