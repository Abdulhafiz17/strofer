<template>
  <div class="container-fluid">
    <div class="card shadow">
      <div class="card-header">
        <h3>Ishchilar ish vaqti</h3>
      </div>
      <div class="card-body">
        <div class="row mb-3">
          <div class="col-md-3 mb-2">
            <input
              type="text"
              class="form-control"
              list="ishchilar"
              placeholder="Ishchi"
            />
            <datalist id="ishchilar">
              <option value="Abdulahad"></option>
              <option value="Abubakir"></option>
              <option value="Abdurahmon"></option>
              <option value="Humoyun"></option>
            </datalist>
          </div>
          <div class="col-md-3 mb-2">
            <input
              type="text"
              class="form-control"
              list="tseh"
              placeholder="Tsex"
            />
            <datalist id="tseh">
              <option value="Ko'ylak"></option>
              <option value="Shim"></option>
              <option value="Oyoq kiyim"></option>
              <option value="Bosh kiyim"></option>
            </datalist>
          </div>
          <div class="col-md-3 mb-2">
            <div class="input-group">
              <input type="time" name="" id="" class="form-control" />
              <input type="time" name="" id="" class="form-control" />
            </div>
          </div>
          <div class="col-md-3 mb-2">
            <button class="btn btn-block btn-outline-warning">
              <span class="far fa-circle-check"></span>
            </button>
          </div>
        </div>
        <div class="table-responsive">
          <table
            class="table table-sm table-borderless table-hover text-center"
          >
            <thead>
              <tr>
                <th>№</th>
                <th>Ism</th>
                <th>Tsex</th>
                <th>Kelish</th>
                <th>Ketish</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Abdulahad</td>
                <td>Shim</td>
                <td>8:45am</td>
                <td>9:35pm</td>
                <td>
                  <button
                    class="btn btn-sm btn-outline-warning"
                    data-toggle="modal"
                    data-target="#modal1"
                  >
                    <span class="far fa-edit"></span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="modal fade" id="modal1" role="dialog">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title">Ish vaqtini tahrirlash</h3>
          </div>
          <div class="modal-body">
        <div class="row">
          <div class="col-md-4 mb-2">
            <input
              type="text"
              class="form-control"
              list="ishchilar"
              placeholder="Ishchi"
            />
            <datalist id="ishchilar">
              <option value="Abdulahad"></option>
              <option value="Abubakir"></option>
              <option value="Abdurahmon"></option>
              <option value="Humoyun"></option>
            </datalist>
          </div>
          <div class="col-md-4 mb-2">
            <input
              type="text"
              class="form-control"
              list="tseh"
              placeholder="Tsex"
            />
            <datalist id="tseh">
              <option value="Ko'ylak"></option>
              <option value="Shim"></option>
              <option value="Oyoq kiyim"></option>
              <option value="Bosh kiyim"></option>
            </datalist>
          </div>
          <div class="col-md-4 mb-2">
            <div class="input-group">
              <input type="time" name="" id="" class="form-control" />
              <input type="time" name="" id="" class="form-control" />
            </div>
          </div>
        </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-outline-primary">
              <span class="far fa-circle-check"></span> Tasdiqlash
            </button>
            <button class="btn btn-outline-danger" data-dismiss="modal">
              <span class="far fa-circle-xmark"></span> Bekor qilish
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      date: 0,
    };
  },
  methods: {
    getDate() {
      let day = new Date();
      this.date =
        day.getDate() + "." + day.getMonth() + 1 + "." + day.getFullYear();
      console.log(this.date);
    },
  },
  mounted() {
    this.getDate();
  },
};
</script>

<style>
</style>