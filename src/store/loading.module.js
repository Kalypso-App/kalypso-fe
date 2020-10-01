import Vue from "vue";

export const loadingModule = {
  namespaced: true,
  state: {
    isLoading: false
  },
  getters: {
    isLoading: (state) => state.isLoading,
  },
  mutations: {
    setLoading(state, isLoading) {
      state.isLoading = isLoading;
    },
  },

  actions: {
    setLoading({commit}, data) {
      commit('setLoading', data);
    }
  },
};
