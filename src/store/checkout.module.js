import Vue from "vue";

export const checkoutModule = {
  namespaced: true,
  state: {
    isValidCard: false,
    emailId: ""
  },
  getters: {
    isValidCard: (state) => state.isValidCard,
    emailId: (state) => state.emailId,
  },
  mutations: {
    setCardValid(state, isValid){
      state.isValidCard = isValid;
    },
    checkout(state,emailId) {
      state.emailId = emailId;
    },
  },

  actions: {
    setCardValid({commit}, data) {
      commit('setCardValid', data);
    }
  },
};
