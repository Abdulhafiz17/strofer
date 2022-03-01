<template>
  <div class="container-fluid">
    <router-link class="btn btn-sm btn-outline-warning mb-2" to="/TMkirish">
      <span class="fa fa-arrow-left"></span> Orqaga
    </router-link>
    <div class="card shadow border-warning">
      <div class="card-header">
        <div class="row">
          <div class="col-md">
            <h2 class="main">Qabul qilish</h2>
          </div>
        </div>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-md-12 mb-3">
            <div class="card shadow">
              <div class="card-header">
                <h4>Qabul qilindi</h4>
              </div>
              <div class="card-body">
                <div class="table-responsive text-center">
                  <table class="table table-sm table-hover table-borderless">
                    <thead>
                      <tr>
                        <th scope="col">Sort</th>
                        <th scope="col">Hajmi</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr class="col-md-8">
                        <th scope="row">1</th>
                        <td><input type="text" class="form-control  "></td>
                        <td >Dona</td>
                      </tr>
                      <tr class="col-md-8">
                        <th scope="row">2</th>
                        <td><input type="text" class="form-control "></td>
                        <td>Dona</td>
                      </tr>
                    </tbody>
                  </table>
                  <div class="btn btn-outline-warning col-md-8">Tasdiqlash</div>
                </div>
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