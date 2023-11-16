import {
	createStore
} from 'vuex';


export default createStore({
	state: {
		userId: null,
		username: null,
		userbirthday: null,
		usergender: null,
		usertatus: null,
		emotionIcons: ['xiyue', 'beiai', 'danyou', 'yane', 'jingqi', 'fennu'],
	},
	mutations: {
		setUserData(state, {
			id,
			username
		}) {
			state.userId = id;
			state.username = username;
		},
		UserData(state, { username, userBirthday, userGender, userStatus }) {
		      state.username = username;
		      state.userBirthday = userBirthday;
		      state.userGender = userGender;
		      state.userStatus = userStatus;
		    },
	},
	actions: {},
	getters: {
		getUserId: (state) => state.userId,
		getUsername: (state) => state.username,
		getEmotionIcons: (state) => state.emotionIcons,
		getUserBirthday: (state) => state.userbirthday,
		getUserGender: (state) => state.usergender,
		getUserStatus: (state) => state.usertatus,
		getEmotionIcons: (state) => state.emotionIcons,
	},
});