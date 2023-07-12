import Vue from 'vue'

const state = {
	carList: [{
			shopName: '小妮秋官方旗舰店',
			status: false,
			list: [{
					name: '牦牛三角肉500g/1.5kg甘南牦牛高端精分割',
					num: 1,
					detail: '生鲜：500g',
					price: 135.00,
					status: false,
					image: "https://mp-6ee8886e-bdb9-43fa-a027-9714a1deafe6.cdn.bspapp.com/beef/WPS图片(5).jpg"
				},
				{
					name: '年货节超值大礼包',
					num: 1,
					detail: '重量：500g',
					price: 135.00,
					status: false,
					image: "https://mp-6ee8886e-bdb9-43fa-a027-9714a1deafe6.cdn.bspapp.com/dry/WPS图片(6).jpg"
				}
			]
		},
		{
			shopName: '不知名官方旗舰店',
			status: false,
			list: [{
				name: '特产桑甚茶叶112g*4礼盒装',
				num: 1,
				detail: '重量：112g',
				price: 178,
				status: false,
				image: "https://mp-6ee8886e-bdb9-43fa-a027-9714a1deafe6.cdn.bspapp.com/dry/WPS图片(8).jpg"
			}]
		}
	],
	addrs: [{
			name: '哈哈哈',
			phone: '17830941432',
			addr: '北京市北京市东城区',
			detail: '嘿嘿',
			default: true,
		},
		{
			name: '呆呆鸟',
			phone: '15923244984',
			addr: '上海外滩',
			detail: '某某地区',
			default: false,
		}
	]
};

const getters = {
	/* 购物车里的商品数量 */
	cartNum() {
		let sum = 0;
		state.carList.map(i => {
			i.list.map(ii => {
				sum += 1;
			})
		});
		return sum;
	},
	totalPrice() {
		let sum = 0;
		state.carList.map(i => {
			i.list.map(ii => {
				if (ii.status) sum += ii.price * ii.num;
			})
		});
		return sum;
	},
	isAllSelected() {
		let flag = true;
		state.carList.map(i => {
			if (!i.status) {
				flag = false;
				return;
			}
			i.list.map(ii => {
				if (!ii.status) {
					flag = false;
					return;
				}
			})
		});
		return flag;
	},
	/* 默认地址 */
	defaultAddr() {
		let filterAddrs = state.addrs.filter(item => item.default);
		let obj = {};
		if (filterAddrs.length && filterAddrs.length > 0) {
			obj = filterAddrs[0];
		} else {
			return false;
		}
		return obj;
	}
}

const actions = {
	/* 购物车 */
	setCartNum(context, value) {
		context.commit('SETCARTNUM', value);
	},
	setStatus(context, value) {
		context.commit('SETSTATUS', value);
	},
	setItemNum(context, value) {
		context.commit('SETITEMNUM', value);
	},
	setAllSelected(context, value) {
		context.commit('SETALLSELECTED', value);
	},
	addCartItem(context, value) {
		context.commit('ADDCARTITEM', value);
	},
	deleteCartItem(context, value) {
		context.commit('DELETECARTITEM', value);
	},
	/* 新增地址 */
	addAddr(context, value) {
		context.commit('ADDADDR', value);
	},
	deleteAddr(context, value) {
		context.commit('DELETEADDR', value);
	},
	modifyAddr(context, value) {
		context.commit('MODIFYADDR', value);
	},
	/* 设置默认地址 */
	setDefaultAddr(context, value) {
		context.commit('SETDEFAULTADDR', value);
	}
}

const mutations = {
	SETCARTNUM(state, newVal) {
		state.cartNum += newVal;
	},
	SETSTATUS(state, newVal) {
		Vue.set(state.carList, newVal.shopIdx, newVal.list); /* 第二个参数是下标或key值，只有用set这样写，才能检测到state值修改了，从而引发get值的修改*/
	},
	SETITEMNUM(state, newVal) {
		state.carList[newVal.shopIdx].list[newVal.currentIdx].num = newVal.num;
	},
	SETALLSELECTED(state, newVal) {
		state.carList.map(i => {
			i.status = newVal;
			i.list.map(ii => {
				ii.status = newVal;
			})
		});
	},
	ADDCARTITEM(state, newVal) {
		state.carList[1].list.push({
			name: '测试',
			num: 1,
			detail: '生鲜：500g',
			price: 135.00,
			status: false,
			image: "https://mp-6ee8886e-bdb9-43fa-a027-9714a1deafe6.cdn.bspapp.com/beef/WPS图片(5).jpg"
		})
	},
	DELETECARTITEM(state, newVal) {
		state.carList.map((item, index) => {
			if (item.status) {
				state.carList.splice(index, 1);
			} else {
				item.list.map((i, idx) => {
					if (i.status) {
						item.list.splice(idx, 1);
					}
				})
			}
		})
	},
	ADDADDR(state, newVal) {
		state.addrs.push(newVal);
	},
	DELETEADDR(state, newVal) {
		state.addrs.splice(newVal, 1);
	},
	MODIFYADDR(state, newVal) {
		state.addrs.splice(newVal.idx, 1, newVal.obj);
	},
	SETDEFAULTADDR(state, newVal) {
		state.addrs.map((item, index) => {
			item.default = false;
			if (index == newVal) {
				console.log('this', this);
				state.addrs[index].default = true;
			}
		});
		console.log('state.addrs', state.addrs)
	}
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}