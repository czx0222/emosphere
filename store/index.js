import {
	createStore
} from 'vuex';


export default createStore({
	state: {
		userId: null,
		username: null,
		userbirthday: null,
		usergender: null,
		userstatus: null,
		ImagePath: null,
		emotionIcons: ['xiyue', 'beiai', 'danyou', 'yane', 'jingqi', 'fennu'],
	},
	mutations: {
		setUserData(state, {
			id,
			username,
			userBirthday,
			userGender,
			imagepath
		}) {
			state.ImagePath = imagepath;
			state.userId = id;
			state.username = username;
			state.userbirthday = userBirthday;
			state.usergender = userGender;
			
		},
		upData(state, {
			username,
			userBirthday,
			userGender,
			userstatus,
			imagepath
		}) {
			state.username = username;
			state.userBirthday = userBirthday;
			state.userGender = userGender;
			state.userstatus = userstatus;
			state.ImagePath = imagepath;
		},
		  setPath(state, path) {
		      state.ImagePath = path;
		},
		clearUserData(state) {
			state.userId = null;
			state.username = null;
			state.userbirthday = null;
			state.usergender = null;
			state.usertatus = null;
		},
	},
	actions: {},
	getters: {
		getUserId: (state) => state.userId,
		getUsername: (state) => state.username,
		getEmotionIcons: (state) => state.emotionIcons,
		getUserBirthday: (state) => state.userbirthday,
		getUserGender: (state) => state.usergender,
		getUserStatus: (state) => state.userstatus,
		getEmotionIcons: (state) => state.emotionIcons,
	},
});