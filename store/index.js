import Vue from 'vue'
import Vuex from 'vuex'

// 暂不启用
import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
	state,
	mutations,
	actions,
	getters
	
	// state: {  // 全局变量
	// 	hasLogin: false,
	// 	userInfo: {}
	// },
	// mutations: {  // 全局方法
	// 	login (state, provider) {
	// 		state.hasLogin = true;
	// 		state.userInfo = provider;
	// 		uni.setStorage({
	// 			key: "userInfo",
	// 			data: provider
	// 		})
	// 		console.log(state.userInfo);
	// 	},
	// 	loginout (state) {
	// 		state.hasLogin = false;
	// 		state.userInfo = {};
	// 		uni.removeStorage({
	// 			key: "userInfo"
	// 		})
	// 	}
	// }
})
export default store