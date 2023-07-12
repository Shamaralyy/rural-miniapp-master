<script>
export default {
	onLaunch() {
		console.log('App Launch');
		this.setGlobalUserInfo();
		this.globalData.sysInfo = this.getSysInfo();
		this.globalData.isBigFonst = this.getFonstMode();

		this.loadNetFont(this.globalData.netFont[0]);
		this.loadNetFont(this.globalData.netFont[1]);
		setTimeout(() => {
			this.$store.commit('login/setFontmod', this.globalData.isBigFonst);
		}, 1000);
	},
	onShow(e) {
		//场景值
		console.log(e.scene);
		this.globalData.scene = e.scene;
		//获取二维码携带的参数
		// let scene = decodeURIComponent(e.query.scene);
		// scene = scene.split('&');
		// scene.forEach(item => {
		// 	let arr = item.split('=');
		// 	if (arr.length === 2) {
		// 		data[arr[0]] = arr[1];
		// 	}
		// });
		// console.log('小程序场景值(App)', data, e.query);
	},
	globalData: {
		token: null || uni.getStorageSync('token'),
		myDate: new Date(),
		loginNum: 0,
		loginClock: true,
		userInfo: null,
		isBigFonst: false, //是否大字模式
		logo: '',
		tabCurent: 0,
		appName: '乡村名片',
		imgBaseUrl: 'https://cdn.xiangcunmingpian.com', //图片统一前缀
		imgSuffix: ['?x-oss-process=style/thumbnail_50', '?x-oss-process=style/p20'], //缩略图统一后缀
		netFont: [
			//外部字体列表
			{
				fontName: 'SourceHanSerifCN-Medium',
				fontUrl: 'https://cdn.xiangcunmingpian.com/app/font/SourceHanSerifCN-Medium.otf'
			},
			{
				fontName: 'SourceHanSerifCN-Bold',
				fontUrl: 'https://cdn.0xiangcunmingpian.com/app/font/SourceHanSerifCN-Bold.otf'
			}
		],
		positionAPI_key: 'LKDBZ-QB2KD-DLU4K-PELH4-LYZ5J-EMBIX', //腾讯位置服务申请的key
		userPosition: {},
		sysInfo: {}, //全局系统信息
		scene: -1,
		// 存储键名
		storageKey: {
			userInfo: 'userinfo',
			token: 'token',
			fonstMode: 'fonstMode',
			lastPage: 'lastPage',
			userPosition: 'userPosition'
		}
	},
	methods: {
		getLastCard() {
			// console.log('-------------开始检索-------------');
			const lastRural = uni.getStorageSync(this.globalData.storageKey.lastPage);
			if (lastRural) {
				// console.log('+++++存在数据', lastRural);
				if (lastRural.cardId != -1) {
					uni.navigateTo({
						url: '/subpages/card/card?cardId=' + lastRural.cardId
					});
				}
			} else {
				// console.log('-----无数据');
			}
			// console.log('-------------检索结束-------------');
		},

		/* 设置全局token */
		setGlobalDataToken(token) {
			this.globalData.token = token;
			uni.setStorageSync(this.globalData.storageKey.token, token);
		},

		/* 加载缓存信息到全局 */
		setGlobalUserInfo() {
			const userInfoValue = uni.getStorageSync(this.globalData.storageKey.userInfo);
			if (userInfoValue) {
				let { roleIds, roles, ...tempUserInfo } = userInfoValue;
				this.globalData.userInfo = tempUserInfo;
				roleIds = null;
				roles = null;
			} else {
				// console.error('用户信息获取异常，缓存为空');
			}
		},

		/* 设置 更新 缓存、全局用户信息 */
		saveUserInfor(userInfo) {
			if (typeof userInfo == 'object' && Object.keys(userInfo).length > 0) {
				// 解构数据
				let tempUserInfo = {
					...userInfo.data.data,
					roles: userInfo.data.roles,
					roleIds: userInfo.data.roleIds
				};
				uni.setStorageSync(this.globalData.storageKey.userInfo, tempUserInfo);

				tempUserInfo = null;

				//全局更新
				this.setGlobalUserInfo();
			} else {
				console.error(userInfo);
				throw '参数异常';
			}
		},

		/* 获取手机信息 */
		getSysInfo() {
			try {
				const res = uni.getSystemInfoSync();
				// console.log('系统信息', res);
				return res;
			} catch (e) {
				// console.error('系统信息 获取失败', e);
				return {};
			}
		},

		/* 获取大字模式参数 */
		getFonstMode() {
			try {
				const value = uni.getStorageSync(this.globalData.storageKey.fonstMode);
				if (value == false || value == true) {
					console.log('√  缓存的大字参数设置', value);
					return value;
				}
				console.log('x  没有缓存的大字参数设置', value);
				return false;
			} catch (e) {
				// console.error('缓存读取异常', e);
				return false;
			}
		},

		/* 获取网路字体 */
		loadNetFont(fontPara) {
			uni.loadFontFace({
				global: true,
				family: fontPara.fontName,
				source: `url("${fontPara.fontUrl}")`,
				success(res) {
					console.log('获取字体结果', res);
				}
			});
		}
	}
};
</script>

<style lang="scss">
// uview统一样式
@import 'uview-ui/index.scss';

//天气图标
@import '@/style/qweather-icons.css';

@font-face {
	font-family: 'blosdd';
	// src: url('https://cdn.xiangcunmingpian.com/app/font/SourceHanSerifCN-Bold.otf');
	// src: url('https://cdn.xiangcunmingpian.com/app/font/SourceHanSerifCN-Medium.otf');
}
@font-face {
	font-family: 'SourceHanSerifCN-Regular';
	src: url('https://cdn.xiangcunmingpian.com/app/font/SourceHanSerifCN-Regular.otf');
}

page {
	font-family: PingFang SC, Microsoft YaHei, Arial, sans-serif;
}
// view {
// 	font-family: 'SourceHanSerifCN-Medium';
// }
</style>
