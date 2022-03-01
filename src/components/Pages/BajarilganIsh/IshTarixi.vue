<template>
  <div class="container-fluid">
    <button @click="back" class="btn btn-sm btn-outline-warning mb-2">
      <span class="fa fa-arrow-left"></span> Orqaga
    </button>
    <div class="card shadow">
      <div class="card-header">
        <div class="row">
          <div class="col-md">
        <h3>Ish tarixi</h3>
          </div>
          <div class="col-md">
            <div class="input-group float-right w-50">
              <input type="text" class="form-control">
              <div class="input-group-append">
                <span class="input-group-text">
                  <span class="fa fa-search"></span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="card-body">
        <div class="table-responsiv text-center">
          <table class="table table-sm table-hover table-borderless">
            <thead>
              <tr>
                <th>№</th>
                <th>Ism</th>
                <th>Bajargan ishi</th>
                <th>Miqdori</th>
                <th>Sanasi</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Abdulahad</td>
                <td>Qadoqlash</td>
                <td>47 dona</td>
                <td>21.03.2021</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Abdurahmon</td>
                <td>Qadoqlash</td>
                <td>28 dona</td>
                <td>12.03.2021</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Abubakir</td>
                <td>Qadoqlash</td>
                <td>84 dona</td>
                <td>04.03.2021</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    back() {
      window.history.back();
    },
  },
};
</script>

<style>
</style>