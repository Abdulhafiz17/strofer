<template>
  <div class="container-fluid">
    <div class="card shaodw">
      <div class="card-header">
        <h3>Bajarilgan ish jarayonlari</h3>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-md-4">
            <div class="card shadow">
              <div class="card-header">
                <h3>Ko'ylak tsexi</h3>
              </div>
              <div class="card-body">
                <table class="table table-sm table-hover table-borderless">
                  <tbody>
                    <tr
                      style="cursor: pointer"
                      data-toggle="modal"
                      data-target="#modal1"
                    >
                      <th>
                        <span class="fa fa-users text-secondary"></span>
                      </th>
                      <td>4 ta hodim</td>
                    </tr>
                    <tr
                      style="cursor: pointer"
                      data-toggle="modal"
                      data-target="#modal2"
                    >
                      <th>
                        <span class="fa fa-recycle text-secondary"></span>
                      </th>
                      <td>4 ta jarayon</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <router-link class="card-footer" to="/bajarilganIshKirish">
                <button class="btn btn-outline-warning float-right">
                  Kirish
                </button>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="modal1">
      <div class="modal-dialog modal-sm">
        <div class="modal-content">
          <div class="modal-header">
            <h3>Tsex ishchilari</h3>
            <button class="btn float-right" data-dismiss="modal">
              <span class="fa fa-xmark"></span>
            </button>
          </div>
          <div class="modal-body">
            <table class="table table-sm table-hover table-borderless">
              <thead>
                <tr>
                  <th></th>
                  <th></th>
                  <th>№</th>
                  <th>Ism</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td></td>
                  <td></td>
                  <td>1</td>
                  <td>Abdulahad</td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td>2</td>
                  <td>Abubakir</td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td>3</td>
                  <td>Abdurahmon</td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td>4</td>
                  <td>Humoyun</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="modal2">
      <div class="modal-dialog modal-sm">
        <div class="modal-content">
          <div class="modal-header">
            <h3>Tsex jarayonlari</h3>
            <button class="btn float-right" data-dismiss="modal">
              <span class="fa fa-xmark"></span>
            </button>
          </div>
          <div class="modal-body">
            <table class="table table-sm table-hover table-borderless">
              <thead>
                <tr>
                  <th></th>
                  <th></th>
                  <th>№</th>
                  <th>Jarayon</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td></td>
                  <td></td>
                  <td>1</td>
                  <td>Pichish</td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td>2</td>
                  <td>Tikish</td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td>3</td>
                  <td>Dazmollash</td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td>4</td>
                  <td>Qadoqlash</td>
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
export default {};
</script>

<style>
</style>