<template>
  <div class="container-fluid">
    <router-link class="btn btn-outline-warning btn-sm mb-2" to="/tseh">
      <span class="fa fa-arrow-left"></span> Orqaga
    </router-link>
    <div class="card shadow border-warning">
      <div class="card-header">
        <div class="row">
          <div class="col-md">
            <h2 class="main">Test</h2>
          </div>
        </div>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-md">
            <h4 style="font-family: Iran-sense">
              Test tsehdag hodimlar soni: 11
              <a
                class="btn btn-outline-warning"
                data-toggle="collapse"
                href="#collapseExample"
                role="button"
                aria-expanded="false"
                aria-controls="collapseExample"
              >
                <i class="far fa-arrow-alt-circle-down"></i>
              </a>
            </h4>
            <div class="collapse" id="collapseExample">
              <div class="container-fluid">
                <table class="table table-sm text-center">
                  <thead>
                    <tr class="table">
                      <th scope="col">#</th>
                      <th scope="col">Ismi</th>
                      <th scope="col">Telefon</th>
                      <th scope="col">Vazifasi</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">1</th>
<a href="/KPITarixi">
                      <td>Humoyun</td></a>
                      <td>
                       +998903691007
                      </td>

                      <td>Admin</td>
                    </tr>
                  </tbody>
                </table>
                <button
                  class="btn btn-outline-warning mt-3 float-right"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapseExample"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                >
                  <span class="far fa-arrow-alt-circle-up"></span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="row mx-2">
          <h4 class="col-md-12 mb-3 mt-3">Test tsehdag Jarayon:</h4>

          <div class="col-md-2 mb-3">
            <div class="card shadow border-warning">
              <div class="card-body">
                <table class="table table-hover table-borderless">
                  <tr>
                    <th>Pichish</th>
                  </tr>
                </table>
                <a
                  href="/ish"
                  class="btn btn-outline-success float-right btn-sm"
                >
                  <span class="fas fa-box"></span>kirish
                </a>
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