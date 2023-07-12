<template>
	<view class="page">
		<view class="top_bg">
			<!-- <image src="https://cdn.xiangcunmingpian.com/app/static/login_bg_1.jpg" class="top_bg"  mode="widthFix"></image> -->
			<view class="box"></view>
			<view class="banner_text">
				<view class="title"><text>人间芳菲四月天</text></view>
				<view class="description"><text>来自云南迪庆的花海开花了</text></view>
			</view>
			<u-swiper :list="bannerimg" radius="0" height="260" @change="change" @click="click"></u-swiper>
		</view>
		<u-navbar :showAction="false" :placeholder="true" title=" " bgColor="#ffffff00" leftIconColor="#fff" :titleStyle="{ color: '#fff' }">
			<view class="u-nav-slot" slot="left">
				<u-search
					placeholder="乡村/农产品/产业"
					v-model="keyword"
					:showAction="false"
					bgColor="#0000007a"
					placeholderColor="#e1e1e1"
					searchIconColor="#e1e1e1"
					color="#fff"
				></u-search>
			</view>
		</u-navbar>
		<view class="content_nav">
			<u-grid :border="false" @click="click" col="4">
				<u-grid-item v-for="(baseListItem, baseListIndex) in navList" :key="baseListIndex">
					<u-icon :customStyle="{ paddingTop: 35 + 'rpx' }" :name="baseListItem.name" :size="34"></u-icon>
					<text class="grid-text">{{ baseListItem.title }}</text>
				</u-grid-item>
			</u-grid>
			<u-toast ref="uToast" />
		</view>
		<view class="content_tabs">
			<u-tabs
				:list="tabslist"
				@click="click"
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
			<view class="sort_list"><u-tag text="默认" plain size="mini" bg-color="#04c354" shape="circle" border-color="#04c354" color="#fff"></u-tag></view>
			<view class="sort_list"><u-tag text="距离排序" plain size="mini" bg-color="#fff" shape="circle" border-color="#fff" color="#333"></u-tag></view>
			<view class="sort_list"><u-tag text="热门排序" plain size="mini" bg-color="#fff" shape="circle" border-color="#fff" color="#333"></u-tag></view>
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
		</view>
	</view>
</template>

<script>
import { random, getStr_lv5 } from '@/utils/Utils-tool.js';
import { apiBusinessCardPage_Post } from '@/API/乡村名片.js';
const imgBaseUrl = getApp().globalData.imgBaseUrl + '/app' + '/static/';
import helangWaterfall from '@/uni_modules/helang-waterfall/components/helang-waterfall/helang-waterfall';

export default {
	components: {
		'helang-waterfall': helangWaterfall
	},
	data() {
		return {
			bannerimg: ['https://cdn.xiangcunmingpian.com/app/static/index_banner_2.jpg'],
			navList: [
				{ name: imgBaseUrl + 'index_nav_3.png', title: '助农商品' },
				{ name: imgBaseUrl + 'index_nav_5.png', title: '乡村活动' },
				{ name: imgBaseUrl + 'index_nav_7.png', title: '振兴交流' },
				{ name: imgBaseUrl + 'index_nav_8.png', title: '共建计划' }
			],
			tabslist: [{ name: '推荐' }, { name: '红色乡村' }, { name: '旅游乡村' }, { name: '古村古寨' }, { name: '产业发展' }, { name: '手艺乡村' }],
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
			apiBusinessCardPage_Param: {
				pageNum: '1' /**     string required:false */,
				pageSize: null /**     string required:false */,
				cardTypeId: null /** 根据类型筛选    string required:false */,
				name: null /** 根据 名称筛选    string required:false */,
				themeStyleId: null /** 根据风格筛选    string required:false */,
				addrId: null /** 地址id筛选    string required:false */
			}
		};
	},
	onReady() {
		this.getList();
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
			console.log(index, tag);
			// 对应的数据
			let selectPara = tag == 'left' ? this.leftList[index] : this.rightList[index];
			console.log('弹出参数', selectPara);
			let direction = {
				left: '左',
				right: '右'
			};
			/* uni.showToast({
				title: `${direction[tag]}侧列表第${index + 1}个被点击`,
				icon: 'none'
			}); */

			uni.navigateTo({
				url: '/subpages/card/card?cardId=' + selectPara.cardId
			});
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
							imgUrl = `https://cdn.xiangcunmingpian.com/app/static/index_waterfall_${random(1, 4)}.jpg`;
						} else {
							try {
								imgUrl = JSON.parse(imgUrl_JSON)[0].imgUrl;
								// console.log('img数据正常', imgUrl);
							} catch (e) {
								imgUrl = `https://cdn.xiangcunmingpian.com/app/static/index_waterfall_${random(1, 4)}.jpg`;
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
			console.log(res);

			if (!res || res.length < 1) {
				this.ajax.loadTxt = '没有更多了';
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

input {
	background-color: #00000000 !important;
}
//背景图片
//背景图片
.top_bg {
	font-family: YOUSHEhaoshenti;
	width: 100%;
	position: absolute;
	top: 0;
	z-index: -1;
	.box {
		position: absolute;
		background: linear-gradient(#0000ff00 60%, #000000 100%);
		z-index: 1;
		bottom: 0;
		height: 100%;
		width: 100%;
		overflow: hidden;
	}
	.banner_text {
		position: absolute;
		z-index: 2;
		bottom: 100rpx;
		left: 40rpx;
		height: 100rpx;
		.title {
			font-size: 36rpx;
			font-family: 'SourceHanSerifCN-Bold';
			color: #fff;
			margin-bottom: 10rpx;
		}
		.description {
			font-size: 26rpx;
			color: #fff;
		}
	}
}

.content_nav {
	margin: 250rpx 20rpx 20rpx 20rpx;
	padding: 0rpx 30rpx 20rpx 30rpx;
	background-color: #fff;
	border-radius: 20rpx;
	z-index: 2;
	.grid-text {
		font-size: 28rpx;
		color: #232426;
		padding: 20rpx 0 20rpx 0rpx;
	}
}

.content_tabs {
	margin: 20rpx 20rpx;
}

.content_sort {
	margin: 20rpx 50rpx 0rpx 50rpx;
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
