<template>
  <div class="container-fluid">
    <router-link
      class="btn btn-outline-warning btn-sm mb-2"
      to="/ish"
    >
      <span class="fa fa-arrow-left"></span> Orqaga
    </router-link>
    <div class="card shadow border-warning">
      <div class="card-header">
        <div class="row">
          <div class="col-md">
            <h3 class="main">Tikish</h3>
          </div>
        </div>
      </div>
      <div class="card-body">
         <h5 class="mb-4 ">Tarkib:</h5>
        <div class="row mb-4 ">
         
           
     
          <div class="col-md-3 mb-3">
            <input
              list="browsers"
              placeholder="Xomashyo"
              name="browser"
              id="browser"
              class="form-control"
            />
            <datalist id="browsers">
              <option value="kley"></option>
              <option value="un"></option>
              <option value="serio"></option>
              <option value="bo'r"></option>
              <option value="ximikat"></option>
              <option value="naushnik"></option>
            </datalist>
          </div>
          <div class="col-md-2 mb-3">
             <div class="input-group">
                  <input
                    type="text"
                    name=""
                    id=""
                    min="0"
                    class="form-control"
                    placeholder="hajm"
                  />
                  <select name="" id="" class="form-control">
                    <option value="">Miqdor</option>
                    <option value="">kg</option>
                    <option value="">dona</option>
                    <option value="">tonna</option>
                  </select>
                </div>
          </div>
        <div class="col-md-3 mb-3">
            <input
              list="tseh"
              placeholder="Tseh"
              name="browser"
              id="browser"
              class="form-control"
            />
            <datalist id="tseh">
              <option value="Tikish"></option>
              <option value="dazmol"></option>
              <option value="bichsh"></option>
              <option value="Yuvish"></option>
            </datalist>
          </div>
           <div class="col-md-3 mb-3">
          <div class="input-group">
                  <input
                    type="number"
                    name=""
                    id=""
                    min="0"
                    class="form-control"
                    placeholder="Kpi"
                  />
                  <div class="input-group-append">
                    <div class="input-group-text">so'm</div>
                  </div>
                </div>
          </div>

          <button class="btn btn-outline-warning btn-sm">Qo'shish</button>
        </div>
        <table class="table table-sm table-hover table-borderless">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Homashyo</th>
              <th scope="col">Hajmi</th>
              <th scope="col">Tseh</th>
               <th scope="col">Kpi</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Tugma</td>
              <td>10/dona</td>
              <td>Yormozor</td>
              <td>20 so'm</td>
            </tr>
          
          </tbody>
        </table>
      </div>

    

       
      </div>
    </div>
  
</template>

<script>
export default {
  data() {
    return {
      
    };
  },
  methods: {
    
  },
  computed: {
    filterOption: function () {
      return this.xomashyo.filter((xomashyo) => {
        return xomashyo.name.match(this.search);
      });
    },
  },
  
};
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
.form-check-input {
  margin: 0;
}
</style>