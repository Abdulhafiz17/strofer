<script>
import swal from "sweetalert";
import { instance } from "../Pages/Api";
import SidebarLink from "./SidebarLink";
import { sidebarWidth, collapsed, toggleSidebar } from "./state";
export default {
  components: { SidebarLink, toggleSidebar },
  data() {
    return {
      role: localStorage.getItem("role"),
      branch_id: localStorage.getItem("branch_id"),
      kurs: {},
    };
  },
  setup() {
    return { collapsed, sidebarWidth, toggleSidebar };
  },
  methods: {
    getData() {
      instance.get("this_currency/dollar").then((res) => {
        this.kurs = res.data;
      });
    },
    putData() {
      instance.put("this_currency_update/dollar", this.kurs).then((res) => {
        console.log(res.data);
        if (res.status == 200) {
          swal({
            icon: "success",
            timer: 2000,
          });
        }
      });
    },
  },
  mounted() {
    this.getData();

    function myFunction(x) {
      if (x.matches) {
        let link = document.querySelector(".SidebarLink")
        link.onclick = function() {
          this.toggleSidebar = (collapsed.value = !collapsed.value)
        }
      }
    }

    var x = window.matchMedia("(max-width: 800px)");
    myFunction(x); // Call listener function at run time
    x.addListener(myFunction); // Attach listener function on state changesА
  },
};
</script>

<template>
  <transition name="fade-SidebarLink">
    <div class="sidebar" :style="{ width: sidebarWidth }">
      <div class="sidebar-link SidebarLink">
        <SidebarLink
          to="/statistic"
          v-if="role == 'admin' || role == 'branch_admin'"
        >
          <span class="fas fa-chart-line"></span>
          <p class="ripple">Statistika</p>
        </SidebarLink>

        <SidebarLink to="/kassa" v-if="role === 'cashier'">
          <span class="fas fa-cash-register"></span>
          <p class="ripple">Kassa</p>
        </SidebarLink>

        <SidebarLink to="/filiallar" v-if="role === 'admin'">
          <span class="fas fa-code-branch"></span>
          <p class="ripple">Filiallar</p>
        </SidebarLink>

        <SidebarLink
          :to="'/hodimlar/' + branch_id"
          v-if="role === 'branch_admin'"
        >
          <span class="fas fa-users"></span>
          <p class="ripple">Hodimlar</p>
        </SidebarLink>

        <SidebarLink to="/taminot" v-if="role === 'branch_admin'">
          <span class="fas fa-truck-loading"></span>
          <p class="ripple">Ta'minotchilar</p>
        </SidebarLink>

        <SidebarLink to="/kategoriya" v-if="role === 'branch_admin'">
          <span class="fas fa-box-open"></span>
          <p class="ripple">Kategoriya</p>
        </SidebarLink>

        <SidebarLink to="/chiqim" v-if="role === 'branch_admin'">
          <span class="fas fa-wallet"></span>
          <p class="ripple">Chiqim</p>
        </SidebarLink>

        <SidebarLink to="/mijozlar" v-if="role === 'branch_admin'">
          <span class="fas fa-handshake"></span>
          <p class="ripple">Mijozlar</p>
        </SidebarLink>

        <SidebarLink to="/nasiya" v-if="role === 'branch_admin'">
          <span class="fas fa-coins"></span>
          <p class="ripple">Nasiyalar</p>
        </SidebarLink>

        <SidebarLink to="/vozvrat" v-if="role === 'cashier'">
          <span class="fas fa-undo"></span>
          <p class="ripple">Vozvrat</p>
        </SidebarLink>

        <SidebarLink to="/me">
          <span class="fas fa-user-circle"></span>
          <p class="ripple">Shaxsiy sahifa</p>
        </SidebarLink>

        <button
          class="btn btn-block"
          href="#currency"
          data-toggle="modal"
          @click="getData()"
        >
          <p class="ripple"><span class="fas fa-dollar" /> Kurs</p>
        </button>
      </div>
    </div>
  </transition>
  <div class="modal fade" id="currency">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h4>Kurs holati</h4>
        </div>
        <div class="modal-body">
          <div class="input-group input-group-sm">
            <div class="input-group-prepend">
              <div class="input-group-text"><strong> 1 </strong> $ =</div>
            </div>
            <input
              type="number"
              class="form-control text-center"
              placeholder="Dollar kursi"
              v-model="kurs.price"
            />
            <div class="input-group-append">
              <div class="input-group-text">so'm</div>
            </div>
          </div>
          <button
            type="button"
            class="btn btn-sm btn-block btn-success text-center"
            @click="putData()"
          >
            Tasdiqlash
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
@import "./css/style.css";

button {
  margin-top: 3px;
  padding: 8px 15px 8px 15px;
  text-align: start;
  color: white;
}

button:active,
button:focus {
  color: white;
  background: var(--success);
}

button:hover {
  background: #8899a687;
  color: white;
}

button p {
  font-size: 12px;
}

button .fas {
  font-size: 18px;
}
</style>