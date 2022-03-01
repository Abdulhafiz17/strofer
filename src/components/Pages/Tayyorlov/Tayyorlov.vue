<template>
  <div class="container-fluid">
    <div class="card">
      <div class="card-header">
        <div class="row">
          <div class="col-md-4">
            <h3>Tayyorlov</h3>
          </div>
          <div class="col-md-4">
            <div class="input-group">
              <input
                type="text"
                v-model="search"
                class="form-control"
                placeholder="Search"
              />
              <div class="input-group-append">
                <span class="input-group-text">
                  <i class="fa fa-search"></i>
                </span>
              </div>
            </div>
          </div>
          <div class="col-md-4"></div>
        </div>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-md-12">
            <div class="table-responsive text-center">
              <table class="table table-sm table-hover table-borderless">
                <thead>
                  <tr>
                    <th>№</th>
                    <th>Mahsulot</th>
                    <th>Buyurtma</th>
                    <th>Olindi</th>
                    <th>Tasdiqlandi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Telefon</td>
                    <td>25 dona</td>
                    <td>
                      <div class="input-group">
                        <input
                          type="number"
                          min="0"
                          class="form-control"
                          placeholder="Hajmi"
                        />
                        <div class="input-group-append">
                          <div class="input-group-text">dona</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <button class="btn btn-outline-warning">
                        <i class="fa fa-check"></i>
                      </button>
                    </td>
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