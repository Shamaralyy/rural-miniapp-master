import App from './App'

import Vue from 'vue'
import uView from "uview-ui";
import store from "./store"

import {
	gMixins
} from '@/utils/mixins.js'

Vue.mixin(gMixins);

Vue.prototype.$store = store
Vue.use(uView);
Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
	...App,
	store,
})
require('@/commonJS/request.js')(app)
app.$mount()
