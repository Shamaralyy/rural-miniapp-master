export default {
	namespaced: true,
	state: {
		currentRural: null,
		editKey: '',
		tempMagicPara: {},
		tempNavPara: {},
		tempListPara: {},
		tempIconPara: {},
		tempStylePara: {},
		tempVrUrl: '',
		tempMenuContent: {},
		tempOtherApp: {
			appId: '',
			path: ''
		}
	},
	mutations: {
		/* 设置当前乡村数据 全量*/
		setCurrentRural_all(state, newValue) {
			console.log("store接收 <乡村> 到数据", newValue);
			state.currentRural = newValue;
		},

		/* 修改 村名部分 相关数据 */
		setCurrentRural_name(state, newValue) {
			state.currentRural.name = newValue;
		},

		/* 修改 简介部分 相关数据 */
		setCurrentRural_synopsis(state, newValue) {
			state.currentRural.synopsis = newValue;
		},

		/* 修改 富文本部分 相关数据 */
		setCurrentRural_details(state, newValue) {
			state.currentRural.details = newValue;
		},

		/* 修改 地图部分 相关数据 */
		setCurrentRural_map(state, newValue) {
			state.currentRural.mapType = newValue.mapType;
			state.currentRural.mapLevel = newValue.mapLevel;
			state.currentRural.latitude = newValue.latitude;
			state.currentRural.longitude = newValue.longitude;
		},

		/* 修改 魔方部分 相关数据 */
		setCurrentRural_navi(state, newValue) {
			state.currentRural.navigationJson = newValue;
		},

		/* 修改轮播图相关数据 */
		setCurrentRural_banner(state, newValue) {
			state.currentRural.images = newValue;
		},

		/* 设置乡村跳转类型key */
		setEditKey(state, newValue) {
			state.editKey = newValue;
		},

		/**设置魔方跳转数据
		 *  newValue : object*/
		setTempMagicPara(state, newValue) {
			state.tempMagicPara = newValue;
		},

		/**设置名片DIY跳转数据
		 *  newValue : object*/
		setTempNavPara(state, newValue) {
			state.tempNavPara = newValue;
		},

		/**设置名片选择数据跳转数据
		 *  newValue : object*/
		setTempListPara(state, newValue) {
			state.tempListPara = newValue;
		},

		/**设置名片选择图标跳转数据
		 *  newValue : object*/
		setTempIconPara(state, newValue) {
			state.tempIconPara = newValue;
		},

		/**设置名片选择模板跳转数据
		 *  newValue : object*/
		setTempStylePara(state, newValue) {
			state.tempStylePara = newValue;
		},
		/**设置名片选择模板跳转数据
		 *  newValue : object*/
		setMapJson(state, newValue) {
			state.currentRural.mapJson = newValue;
		},
		/**设置名片 弹幕开关
		 *  newValue : number*/
		setBulletChat(state, newValue) {
			state.currentRural.isMsg = newValue;
		},

		/**设置临时VR链接
		 *  newValue : string*/
		setTempVrUrl(state, newValue) {
			if (newValue.type == 2) {
				state.tempVrUrl = newValue.url;
				console.log('全景地址数据', newValue);
			} else {
				state.tempVrUrl = ''
			}
		},

		/**设置临时VR链接
		 *  newValue : string*/
		setTempOtherApp(state, newValue) {
			if (newValue.type == 8) {
				state.tempOtherApp = newValue;
				console.log('外部app数据', newValue);
			} else {
				state.tempOtherApp = {
					appId: '',
					path: ''
				}
			}
		},
		/**设置 实地图数据缓存
		 *  newValue : string*/
		setMapOverlay(state, newValue) {
			state.currentRural.mapOverlay = newValue;
		},
		/**设置 菜单编辑数据缓存
		 *  newValue : string*/
		setTempMenuContent(state, newValue) {
			console.log("内容", newValue);
			state.tempMenuContent = newValue;

		},
	},
	getters: {},
	actions: {},


}
