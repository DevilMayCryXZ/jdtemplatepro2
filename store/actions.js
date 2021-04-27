/**
 * 异步更新 state 方法
 */

import { LOGIN, LOGINOUT, REQUEST_SHOW_LOADING, REQUEST_HIDE_LOADING } from './mutations-type'

export default {
	login({commit}, provider) {
		commit(LOGIN, provider)
	},
	loginout({commit}) {
		commit(LOGINOUT)
	},
	request_show_loading({commit}) {
		commit(REQUEST_SHOW_LOADING)
	},
	request_hide_loading({commit}) {
		commit(REQUEST_HIDE_LOADING)
	}
}