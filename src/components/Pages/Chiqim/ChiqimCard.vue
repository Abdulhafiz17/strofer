<template>
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
                data-target="#example"
                @click="editk(card.id, card.name)"
              >
                <i class="fa fa-edit"></i>
              </button>
            </h3>
            {{ card.name }}
            <a
              :href="'/idboyichachiqim/' + card.id"
              class="btn btn-success float-right btn-sm mb-2"
            >
              <i class="fa fa-clock-rotate-left"></i>
            </a>
          </h3>
          <!-- input input-group -->
          <div class="input-group">
            <input
              type="number"
              placeholder="summa"
              class="form-control"
              aria-label="Text input with segmented dropdown button"
              id="price"
            />
            <select class="custom-select" id="currency">
              <option v-for="kurse in kurs" :key="kurse" :value="kurse.id">
                {{ kurse.currency }}
              </option>
            </select>

            <!-- input input-group end -->
            <div class="input-group mt-3">
              <textarea
                class="form-control"
                aria-label="With textarea"
                placeholder="izoh"
                id="comment"
              ></textarea>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card-footer">
            <button
              class="btn btn-block btn-outline-success"
              @click.prevent="chiqimidpost(card.id)"
            >
              Tasdiqlash
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChiqimCard",
  props: {
    card: [],
    kurs: [],
    selectedKurs: string,
  },
};
</script>