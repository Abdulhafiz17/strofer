<template>
  <div class="container-fluid">
    <router-link to="/transport" class="btn btn-sm btn-outline-warning mb-2">
      <i class="fas fa-arrow-left mr-2"></i> Chiqish
    </router-link>
    <div class="card shadow">
      <div class="card-header">
        <h3>Mijozga</h3>
      </div>
      <div class="card-body">
        <table class="table table-sm table-borderless">
          <tbody>
            <tr>
              <td>
                <strong>To'lov summa</strong>
                <div class="input-group">
                  <input
                    type="number"
                    min="0"
                    class="form-control"
                    placeholder="Narxi"
                  />
                  <div class="input-group-append">
                    <div class="input-group-text">So'm</div>
                  </div>
                </div>
              </td>
              <td>
                <strong>Nasiya summa</strong>
                <div class="input-group">
                  <input
                    type="number"
                    min="0"
                    class="form-control"
                    placeholder="Narxi"
                  />
                  <div class="input-group-append">
                    <div class="input-group-text">So'm</div>
                  </div>
                </div>
              </td>
            </tr>
            <tr class="mt-4">
              <td>
                <strong>To'lov turi</strong>
                <div class="input-group">
                  <select class="form-control">
                    <option>Naqd</option>
                    <option>Plastik</option>
                  </select>
                </div>
              </td>
              <td>
                <strong>Nasiya muddati</strong>
                <div class="input-group">
                  <input type="date" class="form-control" />
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <button class="btn btn-outline-primary btn-block">
                  <i class="fa fa-check"></i> Topshirish
                </button>
              </td>
              <td>
                <button class="btn btn-outline-danger btn-block">
                  <i class="fa fa-times-circle"></i> Bekor qilish
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <table class="table table-sm table-borderless text-center">
          <tbody>
            <tr>
              <th>№</th>
              <th>Ism</th>
              <th>Mahsulot</th>
              <th>Hajm</th>
              <th>Narx</th>
              <th>Jami Summa</th>
              <th>Buyurtma oldi</th>
            </tr>
            <tr>
              <td>1</td>
              <td>Abdurahmon</td>
              <td>Telefon</td>
              <td>450 dona</td>
              <td>10$</td>
              <td>4500$</td>
              <td>Tikish tsehi</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>