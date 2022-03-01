<template>
  <div class="container-fluid ">
    <router-link
      class="btn btn-sm btn-outline-warning mb-2"
      to="/tayyormahsulot"
    >
      <span class="fa fa-arrow-left"></span> Orqaga
    </router-link>
    <div class="card shadow">
      <div class="card-header">
        <div class="row">
          <div class="col-md">
            <h3>Tayyor mahsulot</h3>
          </div>
          <div class="col-md-3">
            <router-link to="/qabulqilish">
              <button class="btn btn-outline-warning mt-2">Qabul qilish</button>
            </router-link>
          </div>

          <div class="col-md-4 mt-2">
            <input
              type="text"
              class="form-control float-right"
              v-model="search"
              placeholder="Qidiruv"
            />
          </div>
        </div>
      </div>
      <div class="card-body">
        <div class="row d-flex justify-content-around mb-2">
          <div class="col-md mb-3">
            <div class="card shadow">
              <div class="card-header">
                <h4>Mahsulot</h4>
              </div>
              <div class="card-body">
                <table
                  class="
                    table table-sm table-hover table-borderless
                    text-center
                  "
                >
                  <thead>
                    <tr>
                      <th scope="col">№</th>
                      <th scope="col">Nomi</th>
                      <th scope="col">Hajm</th>
                      <th scope="col">Ko'rish</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="mahsulot in filteredCards"
            :key="mahsulot.name">
                      <th>{{ mahsulot.id }}</th>
                      <td>{{ mahsulot.name }}</td>
                      <td>{{ mahsulot.hajm }}</td>
                      <td>
                        <router-link
                          to="/salfetka"
                          class="btn btn-sm btn-outline-warning"
                        >
                          <i class="far fa-eye"></i>
                        </router-link>
                      </td>
                    </tr>
                  </tbody>
                </table>
              <div class="text-center mb-2">
                <a href="#" class="blocks">&laquo;</a>
                <a href="#" class="blocks">1</a>
                <a href="#" class="blocks">2</a>
                <a href="#" class="blocks">3</a>
                <a href="#" class="blocks">&raquo;</a>
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
export default {
  data() {
    return {
      mahsulot: [
        {
          id: "1",
          name: "salfetka",
          hajm: "790 litr",
        },
      ],
      search: "",
    };
  },
  methods: {
    getData() {
      console.log(this.mahsulot);
    },
  },
  computed: {
    filteredCards: function () {
      return this.mahsulot.filter((mahsulot) => {
        return mahsulot.name.toLowerCase().match(this.search.toLowerCase());
      });
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<style scoped>
li {
  border: solid 1px #ffc107;
  box-shadow: none;
}
</style>