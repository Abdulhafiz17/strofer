<template>
  <div class="container-fluid">
    <div class="card shadow">
      <div class="card-header">
        <h3>Transport</h3>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-md-4">
            <div class="card">
              <div class="card-body">
                <table class="table table-sm table-borderless">
                  <tbody>
                    <tr>
                      <th><i class="text-secondary fa fa-user"></i></th>
                      <td>Abdurahmon</td>
                      <td class="text-danger">25$</td>
                      <td>
                        <button
                          data-toggle="modal"
                          data-target="#exampleModal"
                          class="btn btn-sm btn-outline-warning float-right"
                        >
                          <i class="fa fa-edit"></i>
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <th><i class="text-secondary fa fa-phone"></i></th>
                      <td>+998990906046</td>
                    </tr>
                    <tr>
                      <th><i class="text-secondary fa fa-map"></i></th>
                      <td data-toggle="tooltip" data-placement="top" title="Markaz">Fargona</td>
                    </tr>
                    <tr>
                      <th><i class="text-secondary fa fa-coins"></i></th>

                      <td class="text-primary">75$</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="card-footer">
                <div class="row d-flex justify-content-around">
                  <router-link to="/transportMijoz" class="btn btn-outline-primary">
                    <i class="fa fa-check-circle"></i>
                    Mijozga
                  </router-link>
                  <button
                    class="btn btn-outline-danger"
                    type="button"
                  >
                    <i class="fa fa-times-circle"></i>
                    Bekor qilish
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="dol-md-6"></div>
        </div>
      </div>
    </div>
  </div>
  <!-- Modal fa fa-pen -->
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModallLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title" id="exampleModalLabel">Tahrirlash</h4>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-md-6">
              <div class="form-group field-client-ism required">
                <label>Ism</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Ismi"
                />
              </div>

              <div class="form-group field-client-manzil required">
                <label>Manzil</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Manzili"
                />
              </div>
            </div>
            <div class="col-md-6">
              <label>Telefon</label>
              <div class="form-group">
                <div class="input-group">
                  <div class="input-group-append">
                    <span class="input-group-text">+998</span>
                  </div>
                  <input
                    type="number"
                    class="form-control"
                    placeholder="Telefon raqami"
                  />
                </div>
              </div>
              <div class="form-group">
                <label>Mo'ljal</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Mo'ljali"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="submit" class="btn btn-outline-primary">
            <i class="far fa-check-circle"></i>
            Tasdiqlash
          </button>
          <button
            class="btn btn-outline-danger"
            type="button"
            data-dismiss="modal"
          >
            <i class="far fa-times-circle"></i>
            Bekor qilish
          </button>
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