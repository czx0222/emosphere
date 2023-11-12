// stores/index.js
import { createStore } from 'vuex';

export default createStore({
  state: {
    userId: null,
    username: null,
  },
  mutations: {
    setUserData(state, { id, username }) {
      state.userId = id;
      state.username = username;
    },
  },
  actions: {
  },
  getters: {
    getUserId: (state) => state.userId,
    getUsername: (state) => state.username,
  },
});
