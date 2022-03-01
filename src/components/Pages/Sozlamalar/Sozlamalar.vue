<template>
  <div class="container-fluid">
    <div class="card shadow border-warning">
      <div class="card-header">
        <div class="row">
          <div class="col-md">
            <h3 class="main">Sozlamalar</h3>
          </div>
        </div>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-md-2 px-4 mb-2">
            <h5>O'lchovbirlig  qo'shish:</h5>
          </div>
          <div class="col-md-6 mb-2">
            <input class="form-control" placeholder="Nomi" type="text" />
          </div>
         
          <div class="col-md-3 mb-2">
            <button class="btn btn-outline-warning btn-block">
                <span class="fa fa-circle-plus"></span> Qo'shish
            </button>
          </div>
        </div>
        <table class="table table-borderless table-sm table-hover text-center">
          <thead>
            <tr>
              <th scope="col">#</th>
            
              <th scope="col">O'lchv birlig</th>
            
            </tr>
          </thead>
         
          <tbody>
             <a href="/Homashiotarixi">
            <tr>
              <th scope="row">1</th>
            
              <td>dona</td>
                 <td>
                   <button
                   class="btn btn-sm btn-outline-warning float-right"
                     data-toggle="modal"
                          data-target="#modal3"
                   >
                          <span class="fa fa-edit"></span>
                   </button>
                 </td>
            </tr>
             </a>
            <tr>
              <th scope="row">2</th>
              
              <td>dona</td>
              <td>  <button
                   class="btn btn-sm btn-outline-warning float-right"
                     data-toggle="modal"
                          data-target="#modal3"
                   >
                          <span class="fa fa-edit"></span>
                   </button></td>
            </tr>
            <tr>
              <th scope="row">3</th>
            
              <td>metr</td>
              <td>  <button
                   class="btn btn-sm btn-outline-warning float-right"
                     data-toggle="modal"
                          data-target="#modal3"
                   >
                          <span class="fa fa-edit"></span>
                   </button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <div class="modal fade" id="modal3">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h3>
           dona olchovbirligni tahrirlash
          </h3>
        </div>
        <div class="modal-body">
      
          <div class="input-group mt-2">
            
            <input
              value="dona"
              name=""
              id=""
              class="form-control"
             
              
            />
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-outline-primary">
            <span class="far fa-circle-check"></span> Tasdiqlash
          </button>
          <button 
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

<style scoped>
.main {
  font-family: font-weight-light;
}
.form-control:active,
.form-control:focus,
.form-control:hover {
  outline: white;
}

table {
  cursor: default;
}
</style>