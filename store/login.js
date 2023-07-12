export default {
	namespaced: true,
	state: {
		/**路由类型
		 * 	|-0	跳转tabbar
		 * 	|-1	跳转普通页面*/
		routeType: 0,
		routeUrl: '', //路由跳转路径
		/**自动登录状态锁
		 * 	|-true	允许尝试自动登录
		 * 	|-false	禁止自动登录*/
		autoLoginLock: true,
		/**设置页面跳转类型
		 * |-false 普通进入
		 * |-true 从card进入*/
		toPageType: false,
		/**进入登录页的方式
		 * */
		toLoginType: {},
		isBigFonst: false, //是否大字模式
		/* index吸顶tab数据 */
		tabNowCurrent: 0, //当前选中
		//瀑布流条件筛选参数
		tabRadios: [{
				checked: true,
				name: '默认'
			},
			{
				checked: false,
				name: '距离排序'
			}
		],
		// 全局天气状态
		globalWeather: {
			cardId: -1,
			weatherData: []
		}
	},
	mutations: {
		setRouteType(state, newValue) {
			state.routeType = newValue;
		},
		/* 修改<设置页面>跳转类型 */
		setToPageType(state, newValue) {
			state.toPageType = newValue;
		},

		/* 设置路由跳转路径 */
		setRouteUrl(state, newValue) {
			state.routeUrl = newValue;
		},

		/* 设置自动登录锁 */
		setAutoLoginLock(state, newValue) {
			state.autoLoginLock = newValue;
		},
		/** 设置登录页的跳转方式
		 * newValue = {
		 *	|-router:	string。 可选'card'
		 * 	|-page:		number。 card页的tabbar
		 * }
		 */
		setToLoginType(state, newValue) {
			state.toLoginType = newValue;
		},
		/* 设置字体模式 */
		setFontmod(state, newValue) {
			state.isBigFonst = newValue;
		},
		/* 设置瀑布流选中current */
		setTabNowCurrent(state, newValue) {
			state.tabNowCurrent = newValue;
		},
		/* 设置瀑布流选中current */
		setTabRadios(state, newValue) {
			state.tabRadios.map((item, index) => {
				item.checked = index === newValue ? true : false;
			});
		},

		/* 设置 天气状态对应id */
		setWeatherID(state, newValue) {
			state.globalWeather.cardId = newValue
		},
		/* 设置天气状态对应数据 */
		setWeatherData(state, newValue) {
			state.globalWeather.weatherData = newValue
		},
	},
	getters: {},
	actions: {}
}
