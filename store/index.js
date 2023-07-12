import Vue from 'vue'
import Vuex from 'vuex'
import login from './login'
import build from './build'
import shop from './shop'
Vue.use(Vuex);


export default new Vuex.Store({
	modules: {
		login,
		build,
		shop
	},
	state: {},
	mutations: {},
	actions: {},
	getters: {}
})
