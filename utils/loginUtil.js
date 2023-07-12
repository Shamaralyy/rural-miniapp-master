import {
	apiBusinessMemberWxLogin_Post,
	apiBusinessMemberInfo_Get
} from '@/API/用户会员接口.js'


/**微信自动登录
 * fun为登录页的回调函数
 * */
export function autoWxLogin(fun) {
	getApp().globalData.loginClock = false;
	let loginNum = getApp().globalData.loginNum;
	// 限制重新登录的次数
	if (loginNum >= 1) {
		getApp().globalData.loginClock = true;
		return
	}
	addGloalDataLoginNum();
	console.log("====自动登录尝试次数：" + loginNum);

	new Promise((resolve, reject) => {
		//获取code
		uni.login({
			success(result) {
				console.log("获取code", result);
				resolve(result.code)
				// reject();
			}
		})

	}).then((code) => {
		//code 换token
		return new Promise((resolve, reject) => {
			apiBusinessMemberWxLogin_Post({
				wxCode: code
			}).then(loginRes => {
				console.log("拿新token：", loginRes);
				// 存储全局 token
				if (loginRes.data.code === 200) {
					getApp().setGlobalDataToken(loginRes.data.token)
					showToastLogin('自动登录成功')
					resolve()
				} else {
					reject()
				}
			})
		})

	}).then(() => {
		//更新用户信息
		return new Promise((resolve, reject) => {
			apiBusinessMemberInfo_Get().then(uerInfo => {
				console.log("拿新用户信息", uerInfo);
				if (uerInfo.data.code == 200) {
					getApp().saveUserInfor(uerInfo);
					resolve()
				} else {
					reject()
				}
			})
		})

	}).then(() => {

		if (typeof fun == 'function') {
			//调用  登录页的回调函数
			fun();
		} else {
			//成功 提示手动更新当前页面

			uni.showModal({
				showCancel: false,
				title: '自动登录成功，请手动登录刷新当前页面',
			})
		}

	}).catch(() => {
		uni.showToast({
			icon: 'none',
			title: '自动登录失败'
		});

		//失败 跳转提示
		/* uni.showModal({
			title: '自动登录失败，请手动登录',
			success: (res) => {
				if (res.confirm) {
					uni.navigateTo({
						url: '/subpages/loginlogin'
					})
				}
			}
		}) */

	}).finally(() => {
		//结束开启锁定
		getApp().globalData.loginClock = true;
		setTimeout(() => {
			resetGloalDataLoginNum()
		}, 2000);
	})
}

// 累加重试次数
export function addGloalDataLoginNum() {
	getApp().globalData.loginNum = getApp().globalData.loginNum + 1
}

// 重置登录尝试次数
export function resetGloalDataLoginNum() {
	getApp().globalData.loginNum = 0
}

// 登录专用 轻提示
function showToastLogin(msg) {
	uni.showToast({
		title: msg
	})
}

// 登录专用 显示加载提示
function showLoadingLogin(msg) {
	uni.showLoading({
		title: msg,
	})
}

// 登录专用 关闭加载提示
function hideLoadingLogin() {
	uni.hideLoading()
}
