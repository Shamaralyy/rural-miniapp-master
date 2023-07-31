const events = require('wxEventBus');
Component({
	data: {
		selected: -1,
		color: "#7A7E83",
		selectedColor: "#69c694",
		isTop: true, //是否在顶部
		targetPageNumber: 0, //目标页
		targetRouter: 'pages/index/index', //目标页面栈栈
		tempListItem: {
			selectedIconPath: '/static/card_nav_top.png',
			text: '回顶部'
		},
		list: [{
			pagePath: "/pages/index/index",
			iconPath: "/static/card_nav_6.png",
			selectedIconPath: "/static/card_nav_6_1.png",
			text: "首页"
		}, {
			pagePath: "/pages/build/buildad",
			iconPath: "/static/card_nav_5.png",
			selectedIconPath: "/static/card_nav_5_1.png",
			text: "共建"
		}, {
			pagePath: "/pages/person/index",
			iconPath: "/static/card_nav_4.png",
			selectedIconPath: "/static/card_nav_4_1.png",
			text: "土著人"
		}, {
			pagePath: "/pages/shop/home",
			iconPath: "/static/card_nav_5.png",
			selectedIconPath: "/static/card_nav_5_1.png",
			text: "商城"
		}, {
			pagePath: "/pages/user/user",
			iconPath: "/static/card_nav_4.png",
			selectedIconPath: "/static/card_nav_4_1.png",
			text: "我的"
		}]
	},
	ready() {
		const tabCurent = getApp().globalData.tabCurent
		this.setData({
			selected: tabCurent
		});
		const pages = getCurrentPages();
		const nowRouter = pages[pages.length - 1].route
		if (tabCurent == this.data.targetPageNumber && nowRouter == this.data.targetRouter) {
			console.log('页面栈路由', nowRouter, '事件注册成功');
			wx.sub('isTop', 'tab组件', (content) => {
				if (content == this.data.isTop) return;
				this.setData({
					isTop: content
				})
			});
		}
	},
	observers: {
		'isTop': function(newData) {
			let list = this.data.list,
				tempListItem = this.data.tempListItem,
				temp = {
					selectedIconPath: '',
					text: ''
				};
			list.forEach((value, index) => {
				// 发现页在第二个
				if (index == this.data.targetPageNumber) {
					temp.text = value.text;
					temp.selectedIconPath = value.selectedIconPath;
					value.text = tempListItem.text;
					value.selectedIconPath = tempListItem.selectedIconPath;
					tempListItem = {
						...temp
					};
				}
			})
			this.setData({
				list,
				tempListItem
			})
		}
	},
	methods: {
		switchTab(e) {
			const data = e.currentTarget.dataset;
			const url = data.path,
				index = data.index;
			if (index == this.data.selected && this.data.selected != this.data.targetPageNumber) return;
			if (index == this.data.targetPageNumber && !this.data.isTop) {
				wx.pub('toIndexTop', '首页回顶');
				return;
			}
			getApp().globalData.tabCurent = index
			wx.switchTab({
				url
			})
		}
	}
})
