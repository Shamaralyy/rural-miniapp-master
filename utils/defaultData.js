/*存储公共默认数据*/
const imgBaseUrl = getApp().globalData.imgBaseUrl + '/app/static/';
// 获取魔方导航默认数据
export function getDefault_navimagic(initData = 0) {
	let defaultUrl = imgBaseUrl + 'carddemo.png';
	return [{
		nav: [{
				list: [{
					bgimg: [{
						url: initData == 0 ? defaultUrl : initData[0]
					}],
					title: '关于我们',
					desc: '来了解我们当地的故事',
					bgtitle: '01',
					url: {
						name: '关于我们页',
						type: 1,
						page: 0
					},
					bgcolor: ''
				}]
			},
			{
				list: [{
					bgimg: [{
						url: initData == 0 ? defaultUrl : initData.length > 1 ?
							initData[1] : initData[0]
					}],
					title: '当地向导',
					desc: '游玩当地必备工具',
					bgtitle: '02',
					url: {
						name: '向导页',
						type: 0,
						page: 1
					},
					bgcolor: ''
				}, {
					bgimg: [{
						url: initData == 0 ? defaultUrl : initData.length > 2 ?
							initData[2] : initData[0]
					}],
					title: '民俗文化',
					desc: '了解当地更多历史故事',
					bgtitle: '03',
					url: {
						name: '资讯页',
						type: 4, //资讯模块
						page: 2, //下面哪个文章id
						tag: 0,
					},
					bgcolor: ''
				}]
			}
		]
	}, {
		nav: [{
				list: [{
					bgimg: [{
						url: initData == 0 ? defaultUrl : initData.length > 4 ?
							initData[4] : initData[0]
					}],
					title: '建筑环境',
					desc: '游玩景点及建筑环境介绍',
					bgtitle: '04',
					url: {
						name: '资讯页',
						type: 5, //资讯模块
						tag: 0,
					},
					bgcolor: ''
				}]
			},
			{
				list: [{
					bgimg: [{
						url: initData == 0 ? defaultUrl : initData.length > 5 ?
							initData[5] : initData[0]
					}],
					title: '当地图集',
					desc: '当地建筑、人文传承实拍图集',
					bgtitle: '05',
					url: {
						name: '资讯页',
						type: 7, //资讯模块
						tag: 0,
					},
					bgcolor: ''
				}]
			}
		]
	}]
}


export function getDefault_navJson() {
	// list type 1 名片页  type 2
	// list type 名片页
	// list type 名片页
	return [{
			type: 'nav',
			title: '魔方菜单导航',
			show: true,
			list: {
				name: '乡村简介',
				type: 1,
				page: 1,
				tags: null,
				isShowTitle:true
			},
		},
		{
			type: 'guide',
			title: '建筑环境',
			show: true,
			list: {
				name: '全部位置',
				type: 2,
				page: 0,
				num: 5,
			},
			isShowTitle:true,
		},
		{
			type: 'news',
			title: '民俗文化',
			show: true,
			list: {
				name: '全部资讯',
				type: 1,
				page: 0,
				num: 5,
			},
			isShowTitle:true,
		}
	]
}
//默认名片地图配置
export function getDefault_mapJson() {
	return {
		//地图默认层级
		mapLevel: 16,
		//是否卫星地图
		mapType: false,
		//手绘地图开关
		overlayShow: false,
		//手绘地图是否默认显示
		defaultOverlayShow: false,
		//AR开关
		vrShow: false,
		//VRURL
		vrUrl: null,
		//AR开关
		arShow: false,
		//天气开关
		weatherShow: true,
		//公告开关
		noticeShow: false,
		//公告内容
		noticeContent: null,
		//求助开关
		helpShow: false,
		//求助内容
		helpContent: null
	}
}

// 普通菜单导航默认数据
export function getDefault_menu() {
	const iconUrl = 'https://cdn.xiangcunmingpian.com/app/static/myrural_nav_1.png';
	return {
		type: 'menu',
		title: '菜单导航',
		show: true,
		menuType: 0,
		menuNum: 4,
		menuMr: true,
		menuBg: true,
		menuList: [{
			url: {
				name: '向导页',
				type: 0,
				page: 1
			},
			title: '标题一',
			imgUrl: iconUrl,
			show: true,
			size: 26
		}, {
			url: {
				name: '向导页',
				type: 0,
				page: 1
			},
			title: '标题二',
			imgUrl: iconUrl,
			show: true,
			size: 26
		}, {
			url: {
				name: '向导页',
				type: 0,
				page: 1
			},
			title: '标题三',
			imgUrl: iconUrl,
			show: true,
			size: 26
		}]
	}
}

// 7天默认数据
export function get7Day() {
	return [{
			fxDate: '2022-08-23',
			sunrise: '06:00',
			sunset: '18:47',
			moonrise: '02:06',
			moonset: '16:13',
			moonPhase: '残月',
			moonPhaseIcon: '807',
			tempMax: '36',
			tempMin: '26',
			iconDay: '100',
			textDay: '晴',
			iconNight: '151',
			textNight: '多云',
			wind360Day: '0',
			windDirDay: '北风',
			windScaleDay: '1-2',
			windSpeedDay: '3',
			wind360Night: '0',
			windDirNight: '北风',
			windScaleNight: '1-2',
			windSpeedNight: '3',
			humidity: '88',
			precip: '0.0',
			pressure: '992',
			vis: '24',
			cloud: '25',
			uvIndex: '5'
		},
		{
			fxDate: '2022-08-24',
			sunrise: '06:00',
			sunset: '18:46',
			moonrise: '02:59',
			moonset: '17:00',
			moonPhase: '残月',
			moonPhaseIcon: '807',
			tempMax: '34',
			tempMin: '25',
			iconDay: '306',
			textDay: '中雨',
			iconNight: '307',
			textNight: '大雨',
			wind360Day: '270',
			windDirDay: '西风',
			windScaleDay: '4-5',
			windSpeedDay: '34',
			wind360Night: '45',
			windDirNight: '东北风',
			windScaleNight: '7-8',
			windSpeedNight: '68',
			humidity: '86',
			precip: '12.6',
			pressure: '989',
			vis: '14',
			cloud: '76',
			uvIndex: '6'
		},
		{
			fxDate: '2022-08-25',
			sunrise: '06:01',
			sunset: '18:46',
			moonrise: '03:53',
			moonset: '17:43',
			moonPhase: '残月',
			moonPhaseIcon: '807',
			tempMax: '30',
			tempMin: '26',
			iconDay: '310',
			textDay: '暴雨',
			iconNight: '350',
			textNight: '阵雨',
			wind360Day: '180',
			windDirDay: '南风',
			windScaleDay: '3-4',
			windSpeedDay: '24',
			wind360Night: '0',
			windDirNight: '北风',
			windScaleNight: '1-2',
			windSpeedNight: '3',
			humidity: '96',
			precip: '22.1',
			pressure: '995',
			vis: '9',
			cloud: '78',
			uvIndex: '2'
		},
		{
			fxDate: '2022-08-26',
			sunrise: '06:01',
			sunset: '18:45',
			moonrise: '04:48',
			moonset: '18:22',
			moonPhase: '残月',
			moonPhaseIcon: '807',
			tempMax: '29',
			tempMin: '24',
			iconDay: '306',
			textDay: '中雨',
			iconNight: '151',
			textNight: '多云',
			wind360Day: '0',
			windDirDay: '北风',
			windScaleDay: '1-2',
			windSpeedDay: '3',
			wind360Night: '0',
			windDirNight: '北风',
			windScaleNight: '1-2',
			windSpeedNight: '3',
			humidity: '94',
			precip: '4.4',
			pressure: '997',
			vis: '24',
			cloud: '75',
			uvIndex: '11'
		},
		{
			fxDate: '2022-08-27',
			sunrise: '06:02',
			sunset: '18:44',
			moonrise: '05:43',
			moonset: '18:58',
			moonPhase: '新月',
			moonPhaseIcon: '800',
			tempMax: '31',
			tempMin: '24',
			iconDay: '101',
			textDay: '多云',
			iconNight: '151',
			textNight: '多云',
			wind360Day: '0',
			windDirDay: '北风',
			windScaleDay: '1-2',
			windSpeedDay: '3',
			wind360Night: '0',
			windDirNight: '北风',
			windScaleNight: '1-2',
			windSpeedNight: '3',
			humidity: '92',
			precip: '0.0',
			pressure: '996',
			vis: '24',
			cloud: '25',
			uvIndex: '9'
		},

		{
			fxDate: '2022-08-28',
			sunrise: '06:02',
			sunset: '18:43',
			moonrise: '06:36',
			moonset: '19:32',
			moonPhase: '峨眉月',
			moonPhaseIcon: '801',
			tempMax: '34',
			tempMin: '25',
			iconDay: '300',
			textDay: '阵雨',
			iconNight: '151',
			textNight: '多云',
			wind360Day: '0',
			windDirDay: '北风',
			windScaleDay: '1-2',
			windSpeedDay: '3',
			wind360Night: '0',
			windDirNight: '北风',
			windScaleNight: '1-2',
			windSpeedNight: '3',
			humidity: '93',
			precip: '1.0',
			pressure: '996',
			vis: '23',
			cloud: '60',
			uvIndex: '5'
		},
		{
			fxDate: '2022-08-29',
			sunrise: '06:02',
			sunset: '18:42',
			moonrise: '07:30',
			moonset: '20:05',
			moonPhase: '峨眉月',
			moonPhaseIcon: '801',
			tempMax: '36',
			tempMin: '25',
			iconDay: '305',
			textDay: '小雨',
			iconNight: '306',
			textNight: '中雨',
			wind360Day: '0',
			windDirDay: '北风',
			windScaleDay: '1-2',
			windSpeedDay: '3',
			wind360Night: '0',
			windDirNight: '北风',
			windScaleNight: '1-2',
			windSpeedNight: '3',
			humidity: '91',
			precip: '5.1',
			pressure: '997',
			vis: '24',
			cloud: '80',
			uvIndex: '5'
		}
	]
}
