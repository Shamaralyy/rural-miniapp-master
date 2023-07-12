// const BASE_URL = 'https://hr55632785.zicp.fun' // 开发测试环境
const BASE_URL = 'https://api.xiangcunmingpian.com' // 生产环境

import {
	autoWxLogin
} from '@/utils/loginUtil.js'

export function request({
	url,
	method,
	params,
	data,
	token,
	flag = true
}) {
	return new Promise(function(resolve, reject) {
		let heardToken = getHeader();
		uni.request({
			url: BASE_URL + url + urlencode(params),
			data,
			method,
			header: heardToken,
			success: (res) => {
				// 空token阻断
				if (res.data.code == 401 && heardToken.Authorization == '') {
					reject({
						code: 401,
						msg: "token为空"
					});
				}

				//token过期自动登录
				if (res.statusCode === 200 && heardToken.Authorization != '' &&
					res.data.code == 401 && getApp().globalData.loginClock) {

					console.error("请求token异常");

					autoWxLogin();

					reject({
						code: 401,
						msg: "token异常，正在尝试自动登录，需要重新调用一次目标接口"
					});
				}

				if (res.statusCode === 200 && res.data.code != 401) {
					resolve(res)
				}
			},
			fail: (err) => {
				console.error(url + "请求失败");
				reject(err)
			}
		})
	})
}

function getHeader() {
	// 从全局变量拿token
	let token = getApp().globalData.token
	// 全局变量没有token,则去缓存拿
	if (token === null || token === '' || token === undefined) {
		token = uni.getStorageSync("token");
		if (token) {} else {
			token = '';
		}
	}


	let Authorization = {
		Authorization: token
	}
	return Authorization;
}

function urlencode(data, isPrefix = true) {
	isPrefix = isPrefix ? isPrefix : false
	let prefix = isPrefix ? '?' : ''
	let _result = []
	for (let key in data) {
		let value = data[key]
		// 去掉为空的参数
		if (['', undefined, null].includes(value)) {
			continue
		}
		if (value.constructor === Array) {
			value.forEach(_value => {
				_result.push(encodeURIComponent(key) + '[]=' + encodeURIComponent(_value))
			})
		} else {
			_result.push(encodeURIComponent(key) + '=' + encodeURIComponent(value))
		}
	}

	return _result.length ? prefix + _result.join('&') : ''
}

export function get_baseUrl() {
	return BASE_URL
}
