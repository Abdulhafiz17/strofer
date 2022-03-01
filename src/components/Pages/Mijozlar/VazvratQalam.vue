<template>
  <div class="container-fluid">
    <router-link class="btn btn-sm btn-outline-warning mb-2" to="vazvrat">
      <span class="fa fa-arrow-left"></span> Orqaga
    </router-link>
    <div class="card shadow">
      <div class="card-header">
        <div class="row">
          <div class="col-md-6">
            <h3>Vazvrat qilish</h3>
          </div>
          <div class="col-md-6"></div>
        </div>
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <table
            class="table table-sm table-borderless table-hover text-center"
          >
            <thead>
              <tr>
                <th>T/r</th>
                <th>Mahsulot</th>
                <th>Qaytarish_hajmi</th>
                <th>Tasdiqlash</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td
                  class=""
                  data-toggle="collapse"
                  href="#collapseExample"
                  role="button"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                >
                  Telefon
                </td>
                <td>
                  <div class="input-group input-group-sm">
                    <input type="number" class="form-control" min="0" />
                    <div class="input-group-append">
                      <span class="input-group-text">dona</span>
                    </div>
                  </div>
                </td>
                <td>
                  <button
                    class="btn btn-block btn-sm btn-outline-warning"
                    type="submit"
                  >
                    <span class="fa fa-check-circle"></span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="collapse" id="collapseExample">
            <div class="container-fluid">
              <table class="table table-sm text-center">
                <thead>
                  <tr class="table table-sm">
                    <th>Sana</th>
                    <th>Hajm</th>
                    <th>Summa</th>
                    <th>Jami summa</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>01.11.2022</td>
                    <td>25 dona</td>
                    <td>10$</td>
                    <td><strong>250$</strong></td>
                  </tr>
                </tbody>
              </table>
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