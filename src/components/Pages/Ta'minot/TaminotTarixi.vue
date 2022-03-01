<template>
  <div class="container-fluid">
    <router-link class="btn btn-outline-warning btn-sm mb-2" to="/taminotOlish">
      <span class="fa fa-arrow-left"></span> Orqaga
    </router-link>
    <div class="card shadow">
      <div class="card-header">
        <div class="row">
          <div class="col-md">
            <h3>Ta'minot tarixi</h3>
          </div>
          <div class="col-md">
            <div class="input-group float-right w-50">
              <input type="text" v-model="search" class="form-control" />
              <div class="input-group-append">
                <span class="input-group-text">
                  <span class="fa fa-search"></span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <table
            class="table table-sm table-hover table-borderless text-center"
          >
            <thead>
              <!-- <tr style="border: 2px solid gold;">
                          <th colspan="6">18.03.2021</th>
                      </tr> -->
              <tr>
                <th>№</th>
                <th>Nomi</th>
                <th>Narxi</th>
                <th>Miqdori</th>
                <th>Umumiy narxi</th>
                <th>Sanasi</th>
              </tr>
            </thead>
            <tbody>
              <!-- <tr style="border-bottom: 2px solid gold;"> -->
              <tr v-for="tarix in filterRow" :key="tarix.id">
                <td>{{ tarix.id }}</td>
                <td>{{ tarix.mahsulot }}</td>
                <td>
                  {{
                    Intl.NumberFormat({ style: "currency" }).format(
                      tarix.narxi
                    )
                  }}so'm/kg
                </td>
                <td>{{ tarix.miqdori }}</td>
                <td>
                  {{
                    Intl.NumberFormat({ style: "currency" }).format(
                      tarix.narxi * tarix.miqdori
                    )
                  }}_so'm
                </td>
                <td>{{ tarix.sanasi }}</td>
              </tr>
            </tbody>
          </table>
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
      tarixs: [],
      summa: 0,
      search: "",
    };
  },
  methods: {
    getData() {
      this.tarixs = taminotTarixi;
    },
  },
  mounted() {
    this.getData();
  },
  computed: {
    filterRow: function() {
      return this.tarixs.filter((tarixs) => {
        return tarixs.mahsulot.toLowerCase().match(this.search.toLowerCase())
      })
    }
  }
};
</script>

<style>
</style>