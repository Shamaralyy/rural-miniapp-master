/* ————————————————引入数据接口———————————————— */
import {
	apiBusinessInformationPage_Post
} from '@/API/乡村名片资讯.js'; //列表
import {
	apiBusinessCoordinatePage_Post
} from '@/API/坐标位置.js'; //列表
import {
	apiBusinessCommodityPage_Post
} from '@/API/商品好物news.js'; //列表
import {
	apiBusinessAtlasPage_Post
} from '@/API/图集.js'; //列表
// const imgSuffix = getApp().globalData.imgSuffix;
const imgSuffix = ['', ''];
import {
	diy_DefaultData
} from '@/utils/diyData.js';
/* ————————————————定义混入———————————————— */
/* 共享数据 */
export const cardData = {
	data() {
		return {
			data_list: [],
			mySuffix: imgSuffix[1]
		};
	}
}

/* 传入数据 */
export const cardProps = {
	props: ['title', 'list', 'limit', 'isShowTitle']
}

/* 监听 */
export const cardWatch = {
	watch: {
		list: {
			immediate: true,
			handler(newVale) {
				// console.log('list模块列表数据：', newVale);
				try {
					this.getDataList(newVale.type);
					// 必须带有请求接口
				} catch (e) {}
			}
		}
	},
	computed: {
		/* 拿取本乡村数据 */
		cardId() {
			return this.$store.state.build.currentRural.cardId;
		},
		/* 最大展示数量 */
		showMax() {
			if (this.limit) return this.limit;
			return 5
		}
	}
}

/* diy默认数据调度 */
export const diyDefault = {
	props: {
		isPublic: {
			type: Boolean,
			default: true
		},
		modularType: {
			type: String,
			default: ''
		}
	},
	mounted() {
		//预览模式使用默认数据
		if (!this.isPublic) {
			try {
				const res = diy_DefaultData(this.modularType);
				console.log('获取-', this.modularType, '默认数据', res);
				this.getDefaultData(res);
			} catch (e) {
				console.log(this.modularType, '数据异常', e);
			}
		}
	}
}


/** 需要在 methods 中自定义一个方法 
 *  getDataList(type) 举例如下
 * 		方便不同模块引入  处理不同需求
 * */
export const cardMethods = {
	methods: {
		/* 请求列表数据  示例~~~*/
		/* getDataList(type) {
			// 获取请求、请求参数
			const netFun = this.getNetFunction(type);
			const para_body = this.getPara()
		
			netFun(para_body).then(res => {
				// console.log('~~~~请求结果', res, '列表', res.data.data.records);
				if (res.data.code == 200) {
					if (res.data.data.records.length == 0) return;
					// 应用请求数据于本地
					this.data_list = this.dataHandling(res.data.data.records);
				}
			});
		} */

		/* 点击事件 主要用于跳转 */
		goInfo(e) {
			console.log('用户点击组件', e);
			let netUrl =
				this.list.type == 1 ?
				'/subpages/card/card_news/news_info?informationId=' + e.informationId :
				this.list.type == 2 ?
				'/subpages/card/card_map/map_info?coordinateId=' + e.coordinateId :
				this.list.type == 3 ?
				'/subpages/card/card_service/service_info?commodityId=' + e.commodityId :
				this.list.type == 4 ?
				'/subpages/card/card_photo/photo_info?atlasId=' + e.atlasId :
				'';

			if (netUrl == '') return;
			uni.navigateTo({
				url: netUrl
			});
		},

		/**根据类型获取 请求方法
		 * !组件必须先import该请求
		 * 	1 资讯、2 位置、3 好物、4 图集
		 * 	（新增其他模块时 增加这些判断即可）
		 * */
		getNetFunction(type) {
			let netFun =
				type == 1 ?
				apiBusinessInformationPage_Post :
				type == 2 ?
				apiBusinessCoordinatePage_Post :
				type == 3 ?
				apiBusinessCommodityPage_Post :
				type == 4 ?
				apiBusinessAtlasPage_Post :
				() => {};

			// console.log("————————————传入类型", type);
			// console.log("————————————返回值", netFun);
			return netFun;
		},

		/* 	获取请求体参数 */
		getPara() {
			const para = {
				status: 1,
				pageNum: 1, //页码
				pageSize: 10, //条数
				cardId: this.cardId, //乡村ID
				choiceness: null, // 是否精选 1精选 0非精选
				tagId: this.list.tags == 0 ? null : this.list.tags //分类ID,
			};
			// console.log("————————————请求参数", para);
			return para;
		},

		/**处理请求数据
		 * netData 请求获取的数据
		 * 		返回一个处理过的数据对象
		 */
		dataHandling(netData) {
			let tempData = netData;
			tempData.reverse().forEach(value => {
				if (!value.title) {
					value['title'] = value.name
				}
				// 图片url 自纠、解析
				if (value.images) {
					value['urls'] = JSON.parse(value.images);
					// console.log('处理1 value[urls]', value['urls']);
					//如果有图 抽取轮播图第一张弄成封面图，用于轮播图
					value['img'] = value.urls.length > 0 ? value.urls[0].imgUrl : '';
				} else {
					try {
						value.urls = JSON.parse(value.urls);
					} catch (e) {}
					// console.log('数据走这', value, value.urls);
					//抽取轮播图第一张弄成封面图，用于轮播图
					if (value.urls) {
						value['img'] = value.urls.length > 0 ? value.urls[0].imgUrl : '';
					} else {}
				}
			});
			// console.log('dataHandling 处理好得到的组件内容', tempData)
			return tempData;
		}
	}
}
