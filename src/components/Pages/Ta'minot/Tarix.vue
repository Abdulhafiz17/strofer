<template>
  <div class="container-fluid">
    <router-link class="btn btn-outline-warning btn-sm mb-2" to="/taminot">
      <span class="fa fa-arrow-left"></span> Orqaga
    </router-link>
    <div class="card shadow">
      <div class="card-header">
        <div class="row">
          <div class="col-md-6">
            <h3>{ <span class="fa fa-user-tie"></span> } tarixi</h3>
          </div>
          <div class="col-md-6"></div>
        </div>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-md-6 mb-3">
            <div class="card shadow">
              <div class="card-header">
                <h3>Ta'minot tarixi</h3>
                <div class="row">
                  <div class="col-md">
                    <div class="input-group">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Mahsulot orqali qidirish"
                        v-model="search"
                      />
                      <div class="input-group-append">
                        <div class="input-group-text">
                          <span class="fa fa-search"></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card-body">
                <div class="table-responsive text-center">
                  <table class="table table-sm table-hover table-borderless">
                    <thead>
                      <th>№</th>
                      <th>Xomashyo</th>
                      <th>Narxi</th>
                      <th>Miqdori</th>
                      <th>Umumiy narxi</th>
                      <th>Sanasi</th>
                    </thead>
                    <tbody>
                      <tr v-for="tarix in filterHistory" :key="tarix.id">
                        <td>{{ tarix.id }}</td>
                        <td>{{ tarix.mahsulot }}</td>
                        <td>
                          {{
                            Intl.NumberFormat({ style: "currency" }).format(
                              tarix.narxi
                            )
                          }}
                          so'm/kg
                        </td>
                        <td>{{ tarix.miqdori }}</td>
                        <td>
                          {{
                            Intl.NumberFormat({ style: "currency" }).format(
                              tarix.narxi * tarix.miqdori
                            )
                          }}
                          so'm
                        </td>
                        <td>{{ tarix.sanasi }}</td>
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
          <div class="col-md-6">
            <div class="card shadow">
              <div class="card-header">
                <h3>To'lo'v tarixi</h3>
                <div class="col-md">
                  <div class="row">
                    <div class="col-md-4 mb-2">
                      <label for="dan">Dan</label>
                      <input type="date" id="dan" class="form-control" />
                    </div>
                    <div class="col-md-4">
                      <label for="gacha">Gacha</label>
                      <input type="date" id="gacha" class="form-control" />
                    </div>
                    <div class="col-md-4">
                      <button
                        class="btn btn-block btn-outline-warning"
                        style="margin-top: 32px"
                      >
                        <span class="fa fa-search"></span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card-body">
                <div class="table-responsive text-center">
                  <table class="table table-sm table-hover table-borderless">
                    <thead>
                      <th>№</th>
                      <th>Summa</th>
                      <th>Sanasi</th>
                    </thead>
                    <tbody>
                      <tr v-for="tarix in tTarix" :key="tarix.id">
                        <td>{{ tarix.id }}</td>
                        <td>
                          {{
                            Intl.NumberFormat({ style: "currency" }).format(
                              tarix.narxi * tarix.miqdori
                            )
                          }}
                          so'm
                        </td>
                        <td>{{ tarix.sanasi }}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div class="text-center">
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
  </div>
</template>

<script>
import { taminotTarixi } from "../../../DATA_BASE";
export default {
  data() {
    return {
      tTarix: [],
      search: "",
    };
  },
  methods: {
    getdata() {
      this.tTarix = taminotTarixi;
    },
  },
  mounted() {
    this.getdata();
  },
  computed: {
    filterHistory: function () {
      return this.tTarix.filter((t) => {
        return t.mahsulot.toLowerCase().match(this.search.toLowerCase());
      });
    },
  },
};
</script>

<style>
</style>