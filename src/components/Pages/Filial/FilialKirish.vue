<template>
  <div class="container-fluid">
    <div class="card shadow">
      <div class="card-header text-center">
        <h3>{{ filial.name }}</h3>
        <div class="row text-center">
          <div class="col-md-3"></div>
          <div class="col-md-2">
            <div class="card shadow border-0">
              <a :href="'tel:+998' + filial.phone">
                <div class="card-body">
                  <span class="fa fa-phone" /> +998{{ filial.phone }}
                </div>
              </a>
            </div>
          </div>
          <div class="col-md-2">
            <div class="card shadow border-0">
              <a
                :href="
                  'https://yandex.uz/maps/10336/phergana/?ll=/' +
                  filial.long +
                  '/%2C40./' +
                  filial.lat +
                  '/&z=15'
                "
              >
                <div class="card-body">
                  <span class="fa fa-location-arrow" /> {{ filial.address }}
                </div>
              </a>
            </div>
          </div>
          <div class="col-md-2">
            <div class="card shadow border-0">
              <a @click="shareToHodimlar()" style="cursor: pointer">
                <div class="card-body">
                  <span class="fa fa-user" /> {{ hodimlar }} ta hodim
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { instance } from "../Api";
export default {
  data() {
    return {
      branch_id: this.$route.params.id,
      filial: {},
      hodimlar: "",
    };
  },
  methods: {
    getData() {
      instance.get("this_branch/" + this.branch_id).then((res) => {
        this.filial = res.data;
      });

      instance
        .get("branch_users/" + this.branch_id + "/unblock")
        .then((res) => {
          this.hodimlar = res.data.length;
        });
    },

    shareToHodimlar() {
      this.$router.push({ name: "Hodimlar", params: { id: this.branch_id } });
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<style>
</style>