<template>
  <div class="container-fluid">
    <router-link class="btn btn-outline-warning btn-sm mb-2" to="/taminotOlish">
      <span class="fa fa-arrow-left"></span> Orqaga
    </router-link>
    <div class="card shadow">
      <div class="card-header">
        <div class="row">
          <div class="col-md">
            <h3>To'lo'v tarixi</h3>
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
        <div class="table-responsive">
          <table
            class="table table-sm table-hover table-borderless text-center"
          >
            <thead>
              <!-- <tr style="border: 2px solid gold;">
                          <th colspan="6">18.03.2021</th>
                      </tr> -->
              <tr>
                <th>№</th>
                <th>To'lo'v miqdori</th>
                <!-- <th>Kim tomonidan berilgan</th> -->
                <th>Sanasi</th>
              </tr>
            </thead>
            <tbody>
              <!-- <tr style="border-bottom: 2px solid gold;"> -->
              <tr>
                <td>1</td>
                <td>16 000 000 so'm</td>
                <!-- <td>Asilbek - ish boshqaruvchi</td> -->
                <td>18.03.2021</td>
              </tr>
            </tbody>
          </table>
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