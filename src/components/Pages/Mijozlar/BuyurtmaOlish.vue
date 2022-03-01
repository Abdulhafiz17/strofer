<template>
  <div class="container-fluid">
    <router-link to="/mijozlar" class="btn btn-sm btn-outline-warning mb-2">
      <i class="fas fa-arrow-left mr-2"></i> Chiqish
    </router-link>
    <div class="card shadow">
      <div class="card-header">
        <div class="row">
          <div class="col-md-6">
            <h3>Buyurtma olish</h3>
          </div>
          <div class="col-md-6">
            <button
              class="btn btn-outline-primary float-right btn-sm"
              data-toggle="modal"
              data-target="#myModal"
              @click="modalData"
            >
              <i class="fa fa-shopping-cart"></i>
            </button>
          </div>
        </div>
      </div>
      <div class="card-body">
        <div class="row mb-3">
          <div class="col-md-3 mb-2">
            <input type="text" class="form-control" value="{Dazmol}" list="mahsulot" />
            <datalist id="mahsulot">
              <option value="Tugma"></option>
              <option value="Ip"></option>
              <option value="Igna"></option>
              <option value="Dazmol"></option>
            </datalist>
          </div>
          <div class="col-md-1 mb-2 text-center">
            <h5>{10$}</h5>
          </div>
          <div class="col-md-6 mb-2">
           <div class="input-group">
              <input
                type="number"
                min="0"
                class="form-control"
                placeholder="Narxi"
              />
              <div class="input-group-append">
                <div class="input-group-text">dona</div>
              </div>
            </div>
          </div>
          <div class="col-md-2 mb-2">
            <button type="submit" class="btn btn-outline-warning btn-block">
              <i class="fa fa-check"></i>
            </button>
          </div>
        </div>
        <div class="table-responsive text-center">
          <table class="table table-sm table-hover table-borderless">
            <thead>
              <tr>
                <th>Nomi</th>
                <th>Hajm</th>
                <th>Sotuv Narx</th>
                <th>Jami summa</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Dazmol</td>
                <td>24 dona</td>
                <td>10$</td>
                <td><b>240$</b></td>
              </tr>
               <tr>
                <td>Tugma</td>
                <td>40 dona</td>
                <td>1$</td>
                <td><b>40$</b></td>
              </tr>
               <tr>
                <td>Ip</td>
                <td>45 dona</td>
                <td>5$</td>
                <td><b>225$</b></td>
              </tr>
            </tbody>
            <tfoot>
               <tr> 
                <td colspan="4" class="text-right"><b>Jami: 505$</b></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  </div>

  <div class="modal fade" id="myModal">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <!-- Modal Header -->
        <div class="modal-header">
          <h4 class="modal-title" id="modal-title">Buyurtmalar ro'yxati</h4>
        </div>

        <!-- Modal body -->
        <div class="modal-body">
         <div class="table-responsive text-center">
          <table class="table table-sm table-hover table-borderless">
            <thead>
              <tr>
                <th>Nomi</th>
                <th>Hajm</th>
                <th>Sotuv Narx</th>
                <th>Jami summa</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Dazmol</td>
                <td>24 dona</td>
                <td>10$</td>
                <td><b>240$</b></td>
              </tr>
              <tr>
                <td>Telefon</td>
                <td>24 dona</td>
                <td>100$</td>
                <td><b>2.400$</b></td>
              </tr>
              <tr>
                <td>AirPods</td>
                <td>13 dona</td>
                <td>50$</td>
                <td><b>650$</b></td>
              </tr>
              <tr>
                <td>Chexol</td>
                <td>330 dona</td>
                <td>1$</td>
                <td><b>330$</b></td>
              </tr>
              <tr>
                <td>Glass</td>
                <td>450 dona</td>
                <td>1$</td>
                <td><b>450$</b></td>
              </tr>
            </tbody>
          </table>
        </div>
        </div>
        <!-- Modal footer -->
        <div class="modal-footer">
          <router-link
            @click="sendModal"
            type="button"
            class="btn btn-outline-primary"
            to="/mijoztayyorlov"
            data-dismiss="modal"
          >
            <span class="far fa-circle-check"></span> Topshiruvga
          </router-link>
          <button
            type="button"
            class="btn btn-outline-danger"
            data-dismiss="modal"
          >
            <span class="far fa-circle-xmark"></span> Bekor qilish
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