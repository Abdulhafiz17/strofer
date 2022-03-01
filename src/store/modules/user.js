import apiClient from "@/plugins/ApiClient";
import router from "@/router";

const state = () => ({
  token: localStorage.getItem("access_token") || null,
  user: {},
});

const mutations = {
  SET_USER(state, user) {
    state.user = user;
  },
  SET_TOKEN(state, token) {
    state.token = token;
    localStorage.setItem("access_token", token);
  },
  DESTROY_TOKEN(state) {
    state.token = null;
  },
};

const actions = {
  async setUser(context) {
    await apiClient
      .post("user/get-data")
      .then((response) => {
        context.commit("SET_USER", response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  },
  async getData(context) {
    return await apiClient
      .post("user/get-data", {
        token: context.getters.getToken,
      })
      .then((response) => {
        context.commit("SET_USER", response.data);
        return true;
      })
      .catch(() => {
        context.dispatch("logout");
        return false;
      });
  },
  async logout(context) {
    if (context.getters.loggedIn) {
      alert("Tizimdan chiqdingiz.")
    }
    apiClient.defaults.headers.common["Authorization"] = null;
    localStorage.removeItem("access_token");
    context.commit("DESTROY_TOKEN");
  },
  async login(context, response) {
    console.log("log from store")
    context.commit("SET_TOKEN", response.data.access_token);
  },
};

const getters = {
  loggedIn(state) {
    return state.token !== null;
  },
  getUser(state) {
    return state.user;
  },
  getToken(state) {
    return state.token;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
