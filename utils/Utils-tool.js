/** 公共方法 
 * 使用方法 
 * import { funtionName } from '@/utils/Utils-tool.js';
 */


// 获取随机数方法
export function random(min = 0, max) {
	return Math.floor(Math.random() * max) + min;
}

/**获取五级联动专用拼接字符串
 */
export function getStr_lv5(para) {
	return para == null || para == undefined || para == '' ? '' : para;
}

/**遍历获取村庄第一张背景
 * ruralPara	村庄列表
 * 返回数组 结构如下
 * 	[{imgUrl:'xxxx.jpg'},
 *	 {imgUrl:'xxxx.jpg'}]
 *  
 * 传入异常数据  返回空数组
 * */
export function mapRural_imgList(ruralPara) {
	if (ruralPara.length == 0 || ruralPara == undefined) return [];

	return ruralPara.map((value, index) => {
		try {
			// 正常解析
			return JSON.parse(value.images)[0];
		} catch (e) {
			//null值纠错
			return {
				imgUrl: getApp().globalData.imgBaseUrl + '/app/static/rural_list_1.jpg'
			}

		}
	});
}


/**获取乡村设定的地图释缩放等级
 * 正常接收一个integer
 * 其余值为异常  默认返回17
 */
export function getZoomLeve(para) {
	if (typeof(para) == "number") {
		return para;
	}
	return 17;
}

/**获取乡村设定的地图 显示样式
 * 正常接收一个integer  0-地图  1-卫星
 * 其余值为异常  默认返回false 不显示卫星图
 * |-true 卫星图
 * |-false不显示卫星图
 */
export function getMapType(para) {
	if (typeof(para) == "number") {
		return para == 1 ? true : false;
	}
	return false;
}

/**获取身份字符串
 * 正常接收一个integer，返回对应字符串
 * |-100 游客
 * |-101 村民
 * |-102 共建者
 * |-103 管理员
 * |-其他
 */
export function getStrIdentity(para) {
	if (typeof(para) == "number") {
		return para == 100 ? '游客' : para == 101 ? '村民' : para == 102 ? '共建者' : para == 103 ? '管理员' : '其他';
	}
	return "其他";
}

/**获取 身份
 *  |- 1	101
 * 	|- 2 	102
 * 	|- 其他	-1异常值
 */
export function getIntegerIdentity(para) {
	return para == 1 ? 101 : para == 2 ? 102 : -1;
}


/**获取请求 身份字符串
 * |- 1	普通村民
 * |- 2 村委干部
 * |-其他 返回空
 */
export function getStrJob(para) {
	return para == 1 ? '普通村民' : para == 2 ? '村委干部' : '空';
}

/** 存储用户位置信息*/
export function setUserPosition(para) {
	getApp().globalData.userPosition = para;
	try {
		uni.setStorageSync(getApp().globalData.storageKey.userPosition, para);
		console.log("----用户位置信息", para);
	} catch (e) {
		console.warn('存储异常', e);
	}

}

/* 获取用户位置信息 */
export function getUserPosition() {
	try {
		const value = uni.getStorageSync(getApp().globalData.storageKey.userPosition);
		if (value) {
			console.log("------>获取到用户地址信息", value);
			return value;
		}
		console.warn('地址存储读取异常', value);
		return null;
	} catch (e) {
		console.warn('地址存储读取异常', e);
		return null;
	}
}

/**比较数组
 * @param   arr1 
 * @param   arr2 
 * 相等返回 true
 * 否则返回 false
 * !!!临时使用 不严谨  特殊情况可能存在误判
 */
export function equalsArray(arr1, arr2) {
	if (arr1.length != arr2.length) {
		return false
	}
	return JSON.stringify(arr1) == JSON.stringify(arr2);
}
/**清除输入两端空格
 * */
export function uniTrim(str) {
	if (String.prototype.trim) {
		return str.trim();
	}
	return str.replace(/^\s+(.*?)\s+$/g, "$1");
}

/* 检测是否含有菜单数据 */
export function hasMenu(para) {
	let temp = para;
	//数据未处理时 先进行处理
	if (typeof para == 'string') {
		try {
			temp = JSON.parse(para)
		} catch (e) {
			console.log("数据不需要解析");
		}
	}
	if (typeof para != 'object') return false;
	const tempArr = temp.filter(value => {
		return value.type == 'menu';
	})
	if (tempArr.length > 0) {
		return true;
	}
	return false;
}
