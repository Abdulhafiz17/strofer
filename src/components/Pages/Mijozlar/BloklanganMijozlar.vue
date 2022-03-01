<template>
  <div class="container-fluid">
    <router-link class="btn btn-outline-warning btn-sm mb-2" to="/mijozlar">
      <span class="fa fa-arrow-left"></span> Chiqish
    </router-link>
    <div class="card shadow">
      <div class="card-header">
        <h3>Bloklangan Mijozlar</h3>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-md-4">
            <div class="card shadow">
              <div class="card-body">
                <div class="row">
                  <div class="col-md">
                    <button
                      type="submit"
                      class="btn btn-outline-warning btn-sm"
                    >
                      <i class="fas fa-box mr-2"></i> Blokdan chiqarish
                    </button>
                  </div>
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