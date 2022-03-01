<template>
  <div class="container-fluid">
    <router-link class="btn btn-sm btn-outline-warning mb-2" to="/homashio">
      <span class="fa fa-arrow-left"></span> Orqaga
    </router-link>
    <div class="card shadow border-warning">
      <div class="card-header">
        <div class="row">
          <div class="col-md">
            <h2 class="main">Mahsulot {IP}</h2>
          </div>
          <div class="col-md-6">
            <button
              class="btn btn-outline-warning float-right m-1"
              data-toggle="collapse"
              data-target="#collapse1"
            >
              <span class="fa fa-bars"></span>
            </button>
          </div>
        </div>
      </div>
      <div class="collapse" id="collapse1">
        <div class="container-fluid">
          <table class="table table-sm text-center table-dorderless">
            <thead>
              <tr class="table">
                <th>#</th>
                <th>Nomi</th>
                <th>Sarfi</th>
                <th>Mahsulot</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>1</th>
                <td>Test</td>
                <td>500 dona</td>
                <td>Ko'ylak</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-md-6 mb-3">
            <div class="card shadow">
              <div class="card-header">
                <h4>Mahsulot   qabuli</h4>
              </div>
              <div class="card-body">
                <div class="table-responsive text-center">
                  <table class="table table-sm table-hover table-borderless">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Mahsulot</th>
                        <th>Hajmi</th>
                        <th>Sana</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th>1</th>
                        <td>Ip</td>
                        <td>4000 dona</td>
                        <td>07.07.2021</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="text-center mb-2">
                <a href="#" class="blocks">&laquo;</a>
                <a href="#" class="blocks">1</a>
                <a href="#" class="blocks">2</a>
                <a href="#" class="blocks">3</a>
                <a href="#" class="blocks">&raquo;</a>
              </div>
            </div>
          </div>
          <div class="col-md-6 mb-3">
            <div class="card shadow">
              <div class="card-header">
                <h4>Mahsulot sarfi</h4>
              </div>
              <div class="card-body">
                <div class="table-responsive text-center">
                  <table class="table table-sm table-hover table-borderless">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Mahsulot</th>
                        <th>Hajmi</th>
                        <th>Sana</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th>1</th>
                        <td>Ip</td>
                        <td>885 dona</td>
                        <td>05.08.2022</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="text-center mb-2">
                <a href="#" class="blocks">&laquo;</a>
                <a href="#" class="blocks">1</a>
                <a href="#" class="blocks">2</a>
                <a href="#" class="blocks">3</a>
                <a href="#" class="blocks">&raquo;</a>
              </div>
            </div>
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