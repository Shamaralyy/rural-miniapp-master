/* ————————————————引入数据接口———————————————— */

/* ————————————————定义混入———————————————— */
/* 共享数据 */
export const buildData = {
	data() {
		return {
			tabCurrent: 0,
			tabs: [], //标签导航
			menuwidth: '',
			curNow: 1, //审核状态索引值
			subsection: ['已通过', '待审核', '已驳回'],
			news_list: [], //显示数据列表
			isMore: 2, //是否允许翻页 0x 1√ 2...
			pagePara: {
				pageNum: 1, //页码
				pageSize: 10 //条数
			},
			Pageinput: {
				cardId: null, //乡村id
				tagId: '', //分类ID
				choiceness: '',
				status: 0
			}
		};
	}
}
export const buildMethods = {
	onShow() {
		/* 先初始化数据 再重新加载 */
		this.clearData();
		this.mapTagList(); //标签
		this.mapList(); //列表
	},
	onReachBottom() {
		if (this.isMore == 1) {
			this.mapList(); //列表
		}
	},
	methods: {
		/* 检测数据 */
		checkData(para, str) {
			if (this.curNow == 1 && para.length == 0) {
				uni.showToast({
					icon: 'none',
					title: `暂无待审核${str}`
				});
				setTimeout(() => {
					this.sectionChange(0);
				}, 500);
				return false;
			}
			return true
		},
		/* 翻页处理 */
		pageChange(para) {
			console.log('接收参数', para);
			if (para.length == 10) {
				this.isMore = 1;
				this.pagePara.pageNum++;
			} else {
				this.isMore = 0;
			}
		},
		/* 审核切换 */
		sectionChange(index) {
			if (this.curNow == index) return;
			this.clearData();
			this.curNow = index;
			console.log(index);
			if (index == 0) {
				this.Pageinput.status = 1;
				this.mapList();
			}
			if (index == 1) {
				this.Pageinput.status = 0;
				this.mapList();
			}
			if (index == 2) {
				this.Pageinput.status = 2;
				this.mapList();
			}
		},
		// 标签点击
		clicktabs(e) {
			if (this.tabCurrent == e.index) return;
			this.tabCurrent = e.index;
			this.clearData();
			console.log(e);
			this.Pageinput.tagId = e.infoTagId;
			this.mapList(); //列表
		},
		//  清除数据 
		clearData() {
			this.pagePara.pageNum = 1;
			this.isMore == 2;
			this.news_list = [];
		},
		// 加载状态
		loding() {
			this.isMore == 2;
			uni.showLoading({
				title: '加载中'
			});
		}
	}
}
export const buildComputed = {
	computed: {
		bottomStr() {
			return this.isMore == 0 ? '没有更多了' :
				this.isMore == 1 ? '加载更多' : '加载中';
		}
	},
}

export const buildProps = {}
export const buildWatch = {}

// 发布内容携带vr全景
export const buildType = {
	data() {
		return {
			typeList: ['图片', 'VR全景'],
			typeCurrent: 0,
			isShowVR: false,
			vrAddr: '' //vr全景地址
		}
	},
	methods: {
		typeChange(e) {
			if (e == this.typeCurrent) return;
			console.log('类型修改', e);
			this.typeCurrent = e;
			this.isShowVR = (this.typeCurrent == 1);
		}
	}
}

// 
export const buildAdd = {
	computed: {
		/* 拿取本乡村数据 */
		rural_info() {
			return this.$store.state.build.currentRural;
		}
	},
}
