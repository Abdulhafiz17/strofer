<template>
  <div class="container-fluid">
    <div class="card shadow">
      <div class="card-body">
        <div class="row">
          <div class="col-md-4">
            <h3>Chiqim</h3>
          </div>
          <div class="col-md-4">
            <button
              type="button"
              class="btn btn-outline-primary btn-sm btn-block"
              data-toggle="modal"
              data-target="#exampleModal"
            >
              <span class="fa fa-circle-plus"></span> Doimiy chiqim turi
              qo'shish
            </button>
          </div>
          <div class="col-md-2">
            <button
              class="btn btn-outline-dark btn-sm btn-block"
              data-toggle="modal"
              data-target="#exampleModal2"
            >
              <span class="fa fa-coins"></span>
            </button>
          </div>
          <div class="col-md-2">
            <a
              href="/Chiqimlartarixi"
              class="btn btn-outline-secondary btn-sm btn-block"
              ><span class="fa fa-clock-rotate-left"></span
            ></a>
          </div>
        </div>

        <div class="row">
          <div class="col-md-4 mt-3" v-for="card in cards" :key="card">
            <div class="card shadow">
              <div class="card-body">
                <div class="row">
                  <div class="col-md-1"></div>
                  <div class="col-md-10">
                    <h3 class="card-title text-center" >
                        <h3><button
                          class="btn btn-warning float-right btn-sm"
                          data-toggle="modal"
                          data-target="#example"
                          @click="editk(card.id, card.name)"
                          
                        >
                          <i class="fa fa-edit"></i>
                        </button></h3>
                      {{ card.name }}
                      <a
                        :href= "'/idboyichachiqim/' + card.id" 
                        class="btn btn-secondary float-right btn-sm mb-2"
                      >
                        <i class="fa fa-clock-rotate-left"></i>
                      </a>
                    </h3>
                    <!-- input input-group -->
                    <div class="input-group">
                      <input
                        type="text"
                        placeholder="summa"
                        class="form-control"
                        aria-label="Text input with segmented dropdown button"
                      />
                      <select>
                        <option>#</option>
                      </select>
                    </div>

                    <!-- input input-group end -->
                    <div class="input-group mt-3">
                      <textarea
                        class="form-control"
                        aria-label="With textarea"
                        placeholder="izoh"
                      ></textarea>
                    </div>
                    <div class="card-footer">
                      <button class="btn btn-block btn-dark">Tasdiqlash</button>
                    </div>
                  </div>
                  <div class="col-md-1 col-lg-2"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Modal doimiy chiqim qoshish -->
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            Doimiy chiqim turi qo'shish
          </h5>
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
          <input
            class="form-control"
            type="text"
            placeholder="Doimiy chiqim turi qo'shish"
            v-model="doimiychiqim.name"
          />
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-danger"
            data-dismiss="modal"
          >
            Bekor qilish
          </button>
          <button
            type="button"
            class="btn btn-outline-primary"
            @click="doimiychiqimpost"
            data-dismiss="modal"
          >
            Chiqim qo'shish
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- Modal end -->

  <!-- Modal bir marta chiqim -->
  <div
    class="modal fade"
    id="exampleModal2"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            Bir martalik chiqim qilish
          </h5>
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
          <div class="input-group">
            <input
              type="text"
              class="form-control"
              aria-label="Text input with dropdown button"
              placeholder="summa"
              v-model="birmartachiqim.price"
            />
            <select v-model="birmartachiqim.currency_id" class="custom-select">
              <option v-for="kurses in kurs" :key="kurses" :value="kurses.id">
                {{ kurses.currency }}
              </option>
            </select>
          </div>

          <div class="input-group mt-3">
            <textarea
              class="form-control"
              aria-label="With textarea"
              placeholder="izoh"
              v-model="birmartachiqim.comment"
            ></textarea>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-danger"
            data-dismiss="modal"
          >
            Bekor qilish
          </button>
          <button
            type="button"
            class="btn btn-outline-primary"
            @click="birmartachiqimpost"
          >
            Chiqim qo'shish
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- Modal end -->

  <!-- Modal tahrirlash name -->
<div class="modal fade" id="example" tabindex="-1" role="dialog" aria-labelledby="exampleModal" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModal">Tahrirlash</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
          <label>Nomi</label>
          <input type="text" class="form-control" v-model="editT.name">
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Qaytish</button>
        <button type="button" class="btn btn-primary" data-dismiss="modal" v-on:click="putData(editT.id)" >Tahrirlash</button>
      </div>
    </div>
  </div>
</div>
  <!-- Modal end -->
</template>
<script>
import { instance } from "../Api";

export default {
  data() {
    return {
      birmartachiqim: {
        price: null,
        currency_id: "",
        comment: "",
      },
      doimiychiqim: {
        name: "",
      },
      kurs: [],
      cards: [],
      editT: [],
    };
  },
  methods: {
    birmartachiqimpost() {
      instance
        .post("pay_for_variable_expense", this.birmartachiqim)
        .then((response) => {
          // this.getData();
          console.log(response.data);
        });
    },

    doimiychiqimpost() {
      instance
        .post("create_fixed_expense", this.doimiychiqim)
        .then((response) => {
          // this.getData();
          console.log(response.data);
        });
    },

    // chiqimidpost() {
    //   instance.post("pay_for_fixed_expense/"+this. this.chiqimid).then((response) => {
    //     // this.getData();
    //     console.log(response.data);
    //   });
    // },

    getcurrency() {
      instance.get("all_currencies").then((response) => {
        this.kurs = response.data;
        console.log(response.data);
      });
    },
    getData(){
        instance.get("all_fixed_expenses").then((response) => {
        this.cards = response.data;
        console.log(response.data);
        // this.getData();
        window.location.reload
      });
    },

     editk(id, nomi) {
      this.editT = {
        id: id,
        name: nomi,
      };
    },

    putData(id) {
      instance
        .put("update_this_fixed_expense/" + id, this.editT)
        .then((response) => {
          this.getData();
          if (response.data == "success") {
            this.error = "birxilput";
            this.getData();
          }
        });
    },
  },
  mounted() {
    this.getData();
    this.getcurrency();
  },
};
</script>
