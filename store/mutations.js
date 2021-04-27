/**
 * 同步更新 state 的方法
 */

import { LOGIN, LOGINOUT, REQUEST_SHOW_LOADING, REQUEST_HIDE_LOADING } from './mutations-type'

export default {
	[LOGIN] (state, provider) {
		state.hasLogin = true;
		state.userInfo = provider;
		uni.setStorage({
			key: "userInfo",
			data: provider
		})
		console.log(state.userInfo);
	},
	[LOGINOUT] (state) {
		state.hasLogin = false;
		state.userInfo = {};
		uni.removeStorage({
			key: "userInfo"
		})
	},
	[REQUEST_SHOW_LOADING] (state) {
		state.requestLoading = true;
	},
	[REQUEST_HIDE_LOADING] (state) {
		state.requestLoading = false;
	}
}