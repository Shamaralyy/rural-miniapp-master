<template>
	<view class="page">
		<u-navbar :showAction="false" :placeholder="true" :bgColor="naviStyle.bg">
			<view class="u-nav-slot" slot="left"><text>乡村名片</text></view>
		</u-navbar>
		<view class="content_tabs">
			<u-tabs
				:list="tabslist"
				@click="clickTabs()"
				lineColor="#04c354"
				:activeStyle="{
					color: '#04c354',
					fontSize: '32rpx',
					fontWeight: 'bold',
					transform: 'scale(1.05)'
				}"
			></u-tabs>
		</view>
		<view class="content_sort">
			<view class="sort_list" v-for="(item, index) in radios" :key="index">
				<u-tag
					:text="item.name"
					:plain="!item.checked"
					:name="index"
					size="mini"
					@click="radioClick"
					shape="circle"
					:bgColor="item.checked ? '#04c354' : '#ffffff'"
					:borderColor="item.checked ? '#04c354' : '#ffffff'"
					:color="item.checked ? '#fff' : '#000'"
				></u-tag>
			</view>
		</view>
		<view class="content_watefall">
			<view class="waterfall-box h-flex-x h-flex-2">
				<view>
					<helang-waterfall
						v-for="(item, index) in leftList"
						:key="index"
						:params="item"
						tag="left"
						:index="index"
						@height="onHeight"
						@click="onClick"
					></helang-waterfall>
				</view>
				<view>
					<helang-waterfall
						v-for="(item, index) in rightList"
						:key="index"
						:params="item"
						@height="onHeight"
						@click="onClick"
						tag="right"
						:index="index"
					></helang-waterfall>
				</view>
			</view>
			<view class="load-txt" @click="getList()">{{ ajax.loadTxt }}</view>
			<!-- <view class="load-txt" @click="getList()" v-if="noRural">还有423个村已点亮但未上线</view> -->
		</view>
	</view>
</template>

<script>
import { random, getStr_lv5, setUserPosition } from '@/utils/Utils-tool.js';
import { apiBusinessCardPage_Post } from '@/API/乡村名片.js';
const imgBaseUrl = getApp().globalData.imgBaseUrl + '/app' + '/static/';
import helangWaterfall from '@/uni_modules/helang-waterfall/components/helang-waterfall/helang-waterfall';

export default {
	components: {
		'helang-waterfall': helangWaterfall
	},
	computed: {
		naviStyle() {
			return this.isTop ? { bg: '#f9f9f9', colo: '#000' } : { bg: '#f9f9f9', colo: '#000' };
		}
	},
	data() {
		return {
			itemPad: 0, //轮播图边距
			isTop: true, //是否在顶部
			bannerimg: ['https://cdn.xiangcunmingpian.com/app/static/index_banner_2.jpg'],
			navList: [
				{ name: imgBaseUrl + 'index_nav_3.png', title: '助农商品' },
				{ name: imgBaseUrl + 'index_nav_5.png', title: '乡村活动' },
				{ name: imgBaseUrl + 'index_nav_7.png', title: '振兴交流' },
				{ name: imgBaseUrl + 'index_nav_8.png', title: '共建计划' }
			],
			tabslist: [
				{ name: '推荐' },
				{ name: '红色乡村' },
				{ name: '旅游乡村' },
				{ name: '古村古寨' },
				{ name: '产业发展' },
				{ name: '手艺乡村' }
			],
			//瀑布流参数设置开始
			leftHeight: 0,
			rightHeight: 0,
			leftList: [],
			rightList: [],
			ajax: {
				// 是否可以加载
				load: true,
				// 加载中提示文字
				loadTxt: '',
				// 每页的请求条件
				rows: 10,
				// 页码
				page: 1
			},
			//瀑布流参数设置结束
			radios: [
				{
					checked: true,
					name: '默认'
				},
				{
					checked: false,
					name: '距离排序'
				}
			],
			apiBusinessCardPage_Param: {
				pageNum: '1' /**     string required:false */,
				pageSize: null /**     string required:false */,
				cardTypeId: null /** 根据类型筛选    string required:false */,
				name: null /** 根据 名称筛选    string required:false */,
				themeStyleId: null /** 根据风格筛选    string required:false */,
				searchLabel: null,
				addrId: null /**, 地址id筛选    string required:false */,
				sortType: 1,
				status: 1
			},
			longitude: null,
			latitude: null,
			noRural: false
		};
	},
	onReady() {
		this.getList();
	},
	onPageScroll(e) {
		this.isTop = e.scrollTop < 20;
	},
	// 触底触发
	onReachBottom() {
		this.getList();
	},
	// 下拉刷新
	onPullDownRefresh() {
		// 正常情况下接口返回应该很会很快。故意延迟调用，让用户有在刷新的体验感
		setTimeout(() => {
			this.ajax.page = 1;
			this.leftHeight = 0;
			this.rightHeight = 0;
			this.ajax.load = true;
			this.leftList = [];
			this.rightList = [];
			this.reSetParaPage();
			this.getList();
		}, 800);
	},
	methods: {
		radioClick(name) {
			console.log(name);
			var that = this;
			if (this.radios[name].name == '距离排序') {
				console.log('是距离排序');
				if (that.longitude != null) {
					that.ajax.page = 1;
					that.leftHeight = 0;
					that.rightHeight = 0;
					that.ajax.load = true;
					that.leftList = [];
					that.rightList = [];
					that.reSetParaPage();
					that.apiBusinessCardPage_Param.sortType = 4;
					that.apiBusinessCardPage_Param.longitude = that.longitude;
					that.apiBusinessCardPage_Param.latitude = that.latitude;
					that.getList();
					that.radios.map((item, index) => {
						item.checked = index === name ? true : false;
					});
					return;
				}
				uni.getLocation({
					type: 'wgs84',
					success: function(res) {
						console.log('当前位置的经度：' + res.longitude);
						console.log('当前位置的纬度：' + res.latitude);
						setUserPosition(res);
						that.longitude = res.longitude;
						that.latitude = res.latitude;
						that.radios.map((item, index) => {
							item.checked = index === name ? true : false;
						});
						that.ajax.page = 1;
						that.leftHeight = 0;
						that.rightHeight = 0;
						that.ajax.load = true;
						that.leftList = [];
						that.rightList = [];
						that.reSetParaPage();
						that.apiBusinessCardPage_Param.sortType = 4;
						that.apiBusinessCardPage_Param.longitude = that.longitude;
						that.apiBusinessCardPage_Param.latitude = that.latitude;
						that.getList();
					},
					fail(err) {
						console.log('用户拒绝');
						if (that.longitude == null) {
							uni.showModal({
								title: '位置授权提醒',
								content: '距离排序需要授权您当前位置',
								success: function(res) {
									if (res.confirm) {
										console.log('用户点击确定');
										uni.openSetting({
											success(res) {
												console.log(res.authSetting);
												that.radioClick(name);
											}
										});
									} else if (res.cancel) {
										console.log('用户点击取消');
									}
								}
							});
						}
					}
				});
				return;
			} else {
				var that = this;
				if (that.radios[name].name == '默认') {
					that.apiBusinessCardPage_Param.sortType = 1;
					that.leftHeight = 0;
					that.rightHeight = 0;
					that.ajax.load = true;
					that.leftList = [];
					that.rightList = [];
					that.reSetParaPage();
					that.getList();
				}
				that.radios.map((item, index) => {
					item.checked = index === name ? true : false;
				});
			}
		},
		clickTabs(e) {
			console.log(e.name);
			if (e.name == '推荐') {
				this.ajax.page = 1;
				this.leftHeight = 0;
				this.rightHeight = 0;
				this.ajax.load = true;
				this.leftList = [];
				this.rightList = [];
				this.apiBusinessCardPage_Param.searchLabel = null;
				this.reSetParaPage();
				this.getList();
			} else {
				this.ajax.page = 1;
				this.leftHeight = 0;
				this.rightHeight = 0;
				this.ajax.load = true;
				this.leftList = [];
				this.rightList = [];
				this.apiBusinessCardPage_Param.searchLabel = e.name;
				this.reSetParaPage();
				this.getList();
			}
		},
		/* 页数参数增加 */
		addParaPage() {
			this.apiBusinessCardPage_Param.pageNum = (Number(this.apiBusinessCardPage_Param.pageNum) + 1).toString();
		},

		/* 重置页面请求参数 */
		reSetParaPage() {
			this.apiBusinessCardPage_Param.pageNum = '1';
		},

		/* 监听高度变化 */
		onHeight(height, tag) {
			if (tag == 'left') {
				this.leftHeight += height;
			} else {
				this.rightHeight += height;
			}
		},

		/* 组件点击事件 */
		onClick(index, tag) {
			uni.showLoading({ title: '加载中' });
			console.log(index, tag);
			// 对应的数据
			let selectPara = tag == 'left' ? this.leftList[index] : this.rightList[index];
			console.log('弹出参数', selectPara);
			let direction = {
				left: '左',
				right: '右'
			};

			uni.navigateTo({
				url: '/subpages/card/card?cardId=' + selectPara.cardId
			});
			uni.hideLoading();
		},

		/* 获取数据 */
		getList() {
			if (!this.ajax.load) {
				return;
			}
			this.ajax.load = false;
			this.ajax.loadTxt = '加载中';

			apiBusinessCardPage_Post(this.apiBusinessCardPage_Param)
				.then(res => {
					return new Promise((resolve, reject) => {
						console.log('公共接口获取数据', res);
						if (res.data.code == 200) {
							//请求成功 增加请求体页数
							this.addParaPage();
							resolve(res.data.data.records);
						} else {
							this.ajax.loadTxt = '加载失败，点击刷新';
							// this.addList([]);
						}
					});
				})
				.then(result => {
					//拼接数据
					let spliceData = [];
					let str_lv1 = '',
						str_lv2 = '',
						str_lv3 = '',
						str_lv4 = '',
						str_lv5 = '',
						imgUrl = '',
						imgUrl_JSON = '';
					result.map((item, index) => {
						str_lv1 = getStr_lv5(item.province);
						str_lv2 = getStr_lv5(item.city);
						str_lv3 = getStr_lv5(item.county);
						imgUrl_JSON = item.images == null ? '' : item.images;
						if (imgUrl_JSON.indexOf('http') == -1) {
							// console.log('img数据异常');
							imgUrl = `https://cdn.xiangcunmingpian.com/app/static/index_waterfall_${random(
								1,
								4
							)}.jpg`;
						} else {
							try {
								imgUrl = JSON.parse(imgUrl_JSON)[0].imgUrl;
								// console.log('img数据正常', imgUrl);
							} catch (e) {
								imgUrl = `https://cdn.xiangcunmingpian.com/app/static/index_waterfall_${random(
									1,
									4
								)}.jpg`;
								// console.warn('img转换失败,采用随机图片');
							}
						}
						spliceData.push({
							//图片参数异常 ，先用临时图片
							url: imgUrl,
							title: item.name,
							money: random(9, 9999),
							label: '官方自营',
							shop: str_lv1 + str_lv2 + str_lv3,
							addrId: item.addrId,
							cardId: item.cardId
						});
					});
					return spliceData;
				})
				.then(result => {
					//瀑布流数据填充
					this.addList(result);
				})
				.catch(err => {
					console.warn(err);
					uni.showToast({
						icon: 'error',
						title: '服务器异常'
					});
				});
		},

		/* 瀑布流数据处理 */
		addList(res) {
			// 获取到的数据，请注意数据结构

			if (!res || res.length < 1) {
				this.ajax.loadTxt = '没有更多了';
				this.noRural = true;
				return;
			}

			// 左右列表高度的差
			let differ = this.leftHeight - this.rightHeight;
			// 计算差值，用于确定优先插入那一边
			let differVal = 0;

			// 初始化左右列表的数据
			let i = differ > 0 ? 1 : 0;

			let [left, right] = [[], []];

			// 获取插入的方向
			let getDirection = index => {
				/* 左侧高度大于右侧超过 600px 时，则前3条数据都插入到右边 */
				if (differ >= 600 && index < 3) {
					differVal = 1;
					return 'right';
				}

				/* 右侧高度大于左侧超过 600px 时，则前3条数据都插入到左边 */
				if (differ <= -600 && index < 3) {
					differVal = -1;
					return 'left';
				}

				/* 左侧高度大于右侧超过 350px 时，则前2条数据都插入到右边 */
				if (differ >= 350 && index < 2) {
					return 'right';
				}
				/* 右侧高度大于左侧超过 350px 时，则前2条数据都插入到左边 */
				if (differ <= -350 && index < 2) {
					differVal = -1;
					return 'left';
				}

				/* 当前数据序号为偶数时，则插入到左边 */
				if ((i + differVal) % 2 == 0) {
					return 'left';
				} else {
					/* 当前数据序号为奇数时，则插入到右边 */
					return 'right';
				}
			};

			// 将数据源分为左右两个列表，容错差值请自行根据项目中的数据情况调节
			res.forEach((item, index) => {
				if (getDirection(index) == 'left') {
					//console.log(`差值：${differ},方向：left，序号${index}`)
					left.push(item);
				} else {
					//console.log(`差值：${differ},方向：right，序号${index}`)
					right.push(item);
				}
				i++;
			});

			// 将左右列表的数据插入，第一页时则覆盖
			if (this.ajax.page == 1) {
				this.leftList = left;
				this.rightList = right;
				uni.stopPullDownRefresh();
			} else {
				this.leftList = [...this.leftList, ...left];
				this.rightList = [...this.rightList, ...right];
			}

			this.ajax.load = true;
			this.ajax.loadTxt = '上拉加载更多';
			this.ajax.page++;
		}
	}
};
</script>

<style lang="scss">
page {
	background: #f1f1f1;
	height: 100%;
	width: 100%;
}

.page {
	height: 100%;
	width: 100%;
	position: relative;
}

.u-nav-slot {
	text {
		color: #000000;
		font-size: 46rpx;
	}
}
.content_tabs {
	margin: 10rpx 20rpx;
}

.content_sort {
	margin: 20rpx 40rpx 0rpx 40rpx;
	display: flex;
	.sort_list {
		margin-right: 20rpx;
	}
}

.content_watefall {
	margin: 20rpx 10rpx;
	.waterfall-box {
		padding: 20rpx 10rpx;
		box-sizing: border-box;

		> view {
			padding: 0 10rpx;
		}
	}

	.h-flex-x {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: flex-start;
		align-items: flex-start;
		align-content: flex-start;

		&.h-flex-2 {
			> view {
				width: 50%;
			}
		}
	}

	.load-txt {
		padding: 0 0 20rpx 0;
		text-align: center;
		color: #999;
		font-size: 24rpx;
	}
}
</style>
