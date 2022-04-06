<template>
  <div class="col-md-4 mt-3">
    <div class="card shadow">
      <div class="card-body">
        <div class="row">
          <div class="col-md-1"></div>
          <div class="col-md-10">
            <h3 class="card-title text-center">
              <h3>
                <button
                  class="btn btn-warning float-right btn-sm ml-3"
                  data-toggle="modal"
                  :data-target="`#example${card.id}`"
                >
                  <i class="fa fa-edit"></i>
                </button>
              </h3>
              {{ card.name }}
              <router
                :href="'/idboyichachiqim/' + card.id"
                class="btn btn-success float-right btn-sm mb-2"
              >
                <i class="fa fa-clock-rotate-left"></i>
              </router>
            </h3>
            <!-- input input-group -->
            <div class="input-group">
              <div class="input-group">
                <input
                  type="number"
                  min="0"
                  placeholder="summa"
                  class="form-control"
                  aria-label="Text input with segmented dropdown button"
                  v-model="selectedSumma"
                />
                <div class="input-group-append">
                  <div class="input-group-text">so'm</div>
                </div>
              </div>

              <!-- input input-group end -->
              <div class="input-group mt-3">
                <textarea
                  class="form-control"
                  aria-label="With textarea"
                  placeholder="izoh"
                  v-model="selectedIzoh"
                ></textarea>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card-footer">
              <button class="btn btn-block btn-outline-success" @click="addChiqim">
                Tasdiqlash
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
   <div
      class="modal fade"
      :id="`example${card.id}`"
      tabindex="-1"
      role="dialog"
      :aria-labelledby="`exampleModal${card.id}`"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" :id="`exampleModal${card.id}`">Tahrirlash</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <label>Nomi</label>
            <input type="text" class="form-control" v-model="selectedName" />
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-success"
              data-dismiss="modal"
              @click="edit"
            >
              Tahrirlash
            </button>
            <button
              type="button"
              class="btn btn-outline-danger"
              data-dismiss="modal"
            >
              Qaytish
            </button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import swal from 'sweetalert';
import { instance } from '../Api';
export default {
  name: "card",
  props: {
    card: [],
  },
  data() {
    return {
      selectedSumma: null,
      selectedIzoh: null,
      selectedName: null,
    };
  },
  methods: {
    addChiqim() {
      this.isloading = true;
      if(!this.selectedSumma || !this.selectedIzoh) {
        swal({
          icon: "warning",
          title: "Formani to'ldiring",
          closeOnClickOutside: false,
          closeOnEsc: false,
        }).then(() => {
          this.isloading = false;
        });
      } else {
        instance.post(`pay_for_fixed_expense/${this.card.id}`, {
          price: this.selectedSumma,
          currency_id: "so'm",
          comment: this.selectedIzoh,
        }).then((res) => {
          if(res.data === "success") {
            this.selectedSumma = null;
            this.selectedIzoh = null;
            swal({
              icon: 'success',
              title: 'Tasdiqlandi',
            })
          }
        }).finally(() => {
          this.isloading = false;
        })
      }
    },

    edit() {
      console.log('edit')
      this.isloading = true;
      instance
      .put(`update_this_fixed_expense/${this.card.id}`, {
        name: this.selectedName
      })
      .then(res => {
        console.log(res.data);
        this.$emit("getData");
      }).finally(() => {
        this.isloading = false;
      });
    },
  },
  mounted() {
    this.selectedName = this.card.name;
  }
};
</script>