<template>
  <div class="container-fluid">
    <router-link class="btn btn-sm btn-outline-warning mb-2" to="/mijozlar">
      <span class="fa fa-arrow-left"></span> Orqaga
    </router-link>
    <div class="card shadow">
      <div class="card-header">
        <div class="row">
          <div class="col-md-4">
            <h3>Abdurahmon Vazvrat</h3>
          </div>
          <div class="col-md-4">

          </div>
          <div class="col-md-4">
            <div class="input-group">
              <input
                type="text"
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
          <div class="col-md-4">
            
      </div>
         </div>
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <table
            class="table table-sm table-hover table-borderless text-center"
          >
            <thead>
              <tr>
                <th>T/r</th>
                <th>Sana</th>
                <th>Hajm</th>
                <th>Summa</th>
                <th>Vazvrat</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>01.02.2022</td>
                <td>85 dona</td>
                <td><b>1.253$</b></td>
                <td>
                  <router-link
                    class="btn btn-sm btn-outline-warning"
                    to="/vazvratQalam"
                  >
                    <span class="fa fa-pen"></span> Vazvrat qilish
                  </router-link>
                </td>
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