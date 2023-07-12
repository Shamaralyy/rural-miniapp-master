/* ————————————————引入数据接口———————————————— */
const imgBaseUrl = getApp().globalData.imgBaseUrl + '/app/static/';
const imgSuffix = getApp().globalData.imgSuffix,
	regUrl = 'cdn.xiangcunmingpian.com';
/* ————————————————定义混入———————————————— */
/* 共享数据 */
export const cardListData = {
	data() {
		return {
			imgBaseUrl: imgBaseUrl
		};
	}
}
export const cardListMethods = {
	methods: {}
}
export const cardListHook = {
	onShow() {},
	onReachBottom() {},
}


export const cardListComputed = {
	computed: {}
}

export const cardListWatch = {

}

export const cardListProps = {
	props: ['list', 'rural_info', 'newsTitle']
}

export const cardListComputedFilter = {
	computed: {
		/* 列表数据过滤器 */
		newsList() {
			try {
				if (typeof this.list != 'object') return [];
				if (this.list.lenght == 0) return [];
				return this.list.filter(value => {
					return value.urls ? true : false;
				});
			} catch (e) {
				return [];
			}
		},
		/* 按需接入缩略图 */
		srcFac(url, type) {
			return (url, type = 1) => {
				try {
					if (url.indexOf(regUrl) == -1) {
						return url;
					} else {
						return url + imgSuffix[type];
					}
				} catch (e) {
					return ''
				}
			}
		}
	}
}
/* 翻页加载相关 */
export const cardListPage = {
	data() {
		return {
			isMore: 2, //是否允许翻页 0x 1√ 2...
			pagePara: {
				pageNum: 1, //页码
				pageSize: 10 //条数
			},
		}
	},
	methods: {
		pageChange(para) {
			// console.log('接收参数', para);
			if (para.length == 10) {
				this.isMore = 1;
				this.pagePara.pageNum++;
			} else {
				this.isMore = 0;
			}
		},
		/* 加载状态 */
		loding() {
			this.isMore == 2;
			uni.showLoading({
				title: '加载中'
			});
		},
		/* 清除数据 */
		clearData() {
			this.pagePara.pageNum = 1;
			this.isMore == 2;
			this.news_list = [];
		},
	},
	computed: {
		bottomStr() {
			return this.isMore == 0 ? '没有更多了' : this.isMore == 1 ? '加载更多' : '加载中';
		}
	},
	onShow() {
		this.clearData();
	},
	onReachBottom() {
		if (this.isMore == 1) {
			// 加载列表
			this.getNewsList(); //列表
		}
	},
}
