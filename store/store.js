// store.js

import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      user: null,
      loggedIn: false
    };
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setLoggedIn(state, loggedIn) {
      state.loggedIn = loggedIn;
    }
  },
  actions: {
    login({ commit }, user) {
      // 在登录成功后调用该 action
      commit('setUser', user);
      commit('setLoggedIn', true);
    }
  }
});

export default store;