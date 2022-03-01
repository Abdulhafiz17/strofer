<template>
  <div class="container-fluid">
    <button @click="back" class="btn btn-sm btn-outline-warning my-2">
      <i class="fas fa-arrow-left mr-2"></i> Chiqish
    </button>
    <div class="card shadow">
      <div class="card-header">
        <div class="row">
          <div class="col-md">
            <h3>KPI tarixi</h3>
          </div>
          <div class="col-md">
            <div class="row">
              <div class="col-md-4 mb-2">
                <label for="dan">Dan</label>
                <input type="date" id="dan" class="form-control" />
              </div>
              <div class="col-md-4">
                <label for="gacha">Gacha</label>
                <input type="date" id="gacha" class="form-control" />
              </div>
              <div class="col-md-4">
                <button class="btn btn-block btn-outline-warning" style="margin-top: 32px;">
                  <span class="fa fa-search"></span> Qidirish
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-md-6 mb-3">
            <div class="card shadow">
              <div class="card-header">
                <h4 class="card-title">
                  <span class="fas fa-coins"></span> To'lovlar tarixi
                </h4>
              </div>
              <div class="card-body">
                <div class="table-responsive text-center">
                  <table class="table table-sm table-hover table-borderless">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Summa</th>
                        <th>Olgan hodim</th>
                        <th>Sana</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>100$</td>
                        <td>Abdulhafiyz</td>
                        <td>2022.01.05</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6 mb-3">
            <div class="card shadow">
              <div class="card-header">
                <h4 class="card-title">
                  <span class="fas fa-history"></span> Bajarilgan ishlar
                </h4>
              </div>
              <div class="card-body">
                <div class="table-responsive text-center">
                  <table class="table table-sm table-hover table-borderless">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Tseh</th>
                        <th>Ismi</th>
                        <th>Vazifasi</th>
                        <th>Miqdori</th>
                        <th>Sana</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>Tikish</td>
                        <td>Abdurahmon</td>
                        <td>Tikuvchi</td>
                        <td>100 dona</td>
                        <td>2022.01.05</td>
                      </tr>
                    </tbody>
                  </table>
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