import {createStore} from 'vuex';


export default createStore({
  state: {
    userId: null,
    username: null,
	emotionIcons: ['xiyue', 'beiai', 'danyou', 'yane', 'jingqi', 'fennu'],
  },
  mutations: {
    setUserData(state, { id, username }) {
      state.userId = id;
      state.username = username;
    },
  },
  actions: {},
  getters: {
    getUserId: (state) => state.userId,
    getUsername: (state) => state.username,
	 getEmotionIcons: (state) => state.emotionIcons,
  },
});