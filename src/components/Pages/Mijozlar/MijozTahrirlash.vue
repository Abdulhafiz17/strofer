<template>
  <div class="container-fluid">
    <div class="card shadow">
      <div class="card-body">
        <h4 class="card-header">Mijoz ma'lumotlarini tahrirlash</h4>
        <div class="row">
          <div class="col-md-6">
            <div class="form-group field-client-ism required">
              <label>Ism</label>
              <input
                type="text"
                class="form-control"
                placeholder="Mijoz ismi"
              />
            </div>

            <div class="form-group field-client-manzil required">
              <label>Manzil</label>
              <input
                type="text"
                class="form-control"
                placeholder="Mijoz manzili"
              />
            </div>
          </div>
          <div class="col-md-6">
            <label>Telefon</label>
            <div class="form-group">
              <div class="input-group">
                <div class="input-group-append">
                  <span class="input-group-text text-dark">+998</span>
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
                placeholder="Mijoz mo'ljali"
              />
            </div>
          </div>
        </div>
        <button type="submit" class="btn btn-outline-dark mr-2">
          <i class="fas fa-check-circle"></i> Tasdiqlash
        </button>
        <router-link class="btn btn-light" to="/mijozlar"
          ><i class="far fa-times-circle"></i> Bekor qilish</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>