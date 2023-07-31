<template>
	<view>
		<view class="bgBanner">
			<view class="my-banner">
				<view
					class="banner-imgs"
					:class="{ on: bannerIndex == index }"
					v-for="(item, index) in banners"
					:key="item.id"
				>
					<image :src="item.url" mode="aspectFill" class="banner-imgs_img"></image>
				</view>
			</view>
			<view class="bgFilter" :style="[scrollStyle]"></view>
			<!-- <u-swiper :list="bannerimg" :height="pagesHeight" @change="banner"></u-swiper> -->
		</view>
		<u-navbar :showAction="false" :placeholder="true" :bgColor="naviStyle.bg">
			<view
				id="navi"
				class="u-nav-slot"
				slot="left"
				:style="{ height: menuHeight + 'px', 'margin-right': menuwidth + 13 + 'px' }"
				@click="gosearch"
			>
				<view class="city" :style="{ width: menuwidth - 13 + 'px' }" :class="kissFlag ? 'topColor' : ''">
					<text v-if="kissFlag" :style="{ opacity: 1 - kissPercent }" class="title">乡村名片</text>
					<text :class="kissFlag ? 'subTitle' : ''">乡村名片</text>
				</view>
				<view class="searchCenter">
					<view class="searchBox">
						<swiper
							class="swiper"
							circular
							:indicator-dots="false"
							:autoplay="true"
							:interval="3000"
							:vertical="true"
							:duration="500"
						>
							<swiper-item v-for="(item, index) in notice" :key="index">
								<view class="swiper-item">{{ item }}</view>
							</swiper-item>
						</swiper>
					</view>
				</view>
			</view>
		</u-navbar>
		<scroll-view :scroll-top="scrollTop" scroll-y="true">
			<view
				class="bannerTop"
				:style="{ height: pagesHeight * 0.46 + 'px' }"
				@touchstart="touchstart"
				@touchend="touchend"
			>
				<view class="banner_lefttext" :style="[scrollTitleStyle]">
					<view class="title">
						<text>{{ bannerTitle }}</text>
					</view>
					<view class="description">
						<text>{{ bannerDesc }}</text>
					</view>
				</view>
				<view class="banner_righttext" @click="clickBanner(bannerCurrent)" :style="[scrollTitleStyle]">
					<view class="title">
						<view class="">
							<text>{{ bannerRural }}</text>
						</view>
						<view class="">
							<u-icon
								name="arrow-right"
								color="#ffffffed"
								size="18"
								v-if="bannerRural.length != 0"
								top="1"
							></u-icon>
						</view>
					</view>
					<view class="description">
						<text>{{ bannerMap }}</text>
					</view>
				</view>
				<view class="checkTop" id="checkTop" :style="{ top: scTop + 'vh' }"></view>
			</view>
			<view class="content_nav" id="kissStart">
				<u-scroll-list :indicator="false">
					<view
						class="nav_list"
						v-for="(baseListItem, baseListIndex) in navList"
						:key="baseListIndex"
						@click="clickGrid(baseListIndex)"
					>
						<u-icon :customStyle="{ paddingTop: 35 + 'rpx' }" :name="baseListItem.name" :size="28"></u-icon>
						<text class="grid-text">{{ baseListItem.title }}</text>
					</view>
				</u-scroll-list>
			</view>
		</scroll-view>
		<u-sticky :offset-top="navbarHeight" v-if="navbarHeight">
			<view
				style="background-color: #fff;  transition:all 1s;"
				id="kissEnd"
				:class="[kissPercent <= 0.5 ? '' : 'rural']"
			>
				<tabList />
			</view>
		</u-sticky>
		<rural />
	</view>
</template>
<script>
import { random, getStr_lv5, setUserPosition } from '@/utils/Utils-tool.js';
import { apiBusinessCardPage_Post } from '@/API/乡村名片.js';
import { apiDevBusinessCarouselPage_Post } from '@/API/轮播图Controller.js';
import rural from './rural-list.vue';
import tabList from './tab-list.vue';
const imgBaseUrl = getApp().globalData.imgBaseUrl + '/app' + '/static/';
const imgSuffix = getApp().globalData.imgSuffix;
export default {
	components: { rural, tabList },
	data() {
		return {
			bannerimg: ['https://cdn.xiangcunmingpian.com/app/static/bgNew1.jpg'],
			navList: [
				{
					name: imgBaseUrl + 'index_nav_11.png' + imgSuffix[1],
					title: '点亮乡村',
					url: '/subpages/myrural/myrural'
				},
				{ name: imgBaseUrl + 'index_nav_8.png' + imgSuffix[1], title: '共建计划', url: '/pages/build/buildad' },
				{ name: imgBaseUrl + 'index_nav_2.png' + imgSuffix[1], title: '名片示例', url: '/subpages/index/demo' },
				{ name: imgBaseUrl + 'index_nav_10.png' + imgSuffix[1], title: '名片学院', url: '/subpages/edu/edu' },
				{
					name: 'https://cdn.xiangcunmingpian.com/app/menuIcon/menu%20(105).png' + imgSuffix[1],
					title: '常见问题',
					url: '/subpages/user/qa'
				}
			],
			pagesHeight: 0,
			bannerTitle: '',
			bannerDesc: '',
			bannerRural: '',
			bannerMap: '',
			bannerCurrent: 0,
			menuwidth: 0,
			menuHeight: 0,
			notice: ['搜索乡村名称', '雨崩村 梅里雪山', '喜洲村 大理洱海'],
			bannerIndex: 0,
			setInter1: null, // 定时器
			startData: {
				// 滑动数据
				clientX: 0 // 左右滑动
			},
			banners: [], // 轮播图图片，根据自己的后台请求来，这里我就不写了
			initHeight: -1, //初始默认高度
			marginTop: 1, //距离顶部的高度%
			scTop: 20, //起始检测高度
			isTop: true, //是否在顶部
			navbarHeight: 0, //顶部自定义导航高度
			kissFlag: false, //接触状态
			kissPercent: 1, //接触百分比
			kissInit: -1 //接触初始高度
		};
	},
	computed: {
		scrollStyle() {
			return {
				opacity: 1 - this.marginTop
			};
		},
		scrollTitleStyle() {
			return {
				opacity: this.marginTop
			};
		},
		naviStyle() {
			const percent = this.kissFlag ? (1 - this.kissPercent).toFixed(1) : 0;
			return {
				bg: 'rgba(255, 255, 255,' + percent + ')',
				color: 'rgba(255, 255, 255,' + percent + ')'
			};
		},
		// 吸顶tab
		stickyTab() {
			const zIndex = 10;
			const top = this.navbarHeight + 'px';
			return {
				position: 'sticky',
				top,
				zIndex
			};
		}
	},
	onLoad() {
		this.getBannerList();
		wx.showShareMenu({
			withShareTicket: true,
			menus: ['shareAppMessage', 'shareTimeline']
		});
		let menu = wx.getMenuButtonBoundingClientRect();
		// console.log('菜单参数', menu);
		this.menuHeight = menu.height;
		this.menuwidth = menu.width + menu.width / 7;
		getApp().getSysInfo();
		this.pagesHeight = getApp().globalData.sysInfo.windowHeight;
		// console.log(this.pagesHeight * 0.6, this.pagesHeight * 0.46);
	},
	onShareAppMessage(res) {
		return {
			title: '乡村名片',
			path: '/pages/index/index',
			imageUrl: imgBaseUrl + 'rural_share.jpg'
		};
	},
	onShareTimeline(res) {
		return {
			title: '乡村名片',
			path: '/pages/index/index',
			imageUrl: imgBaseUrl + 'rural_share.jpg'
		};
	},
	methods: {
		// 循环切换轮播图索引
		changePic() {
			clearInterval(this.setInter1); // 先将已有的计时器清除
			this.setInter1 = setInterval(() => {
				this.bannerIndex = this.bannerIndex >= this.banners.length - 1 ? 0 : ++this.bannerIndex;
				this.bannerDataCHange(this.bannerIndex);
			}, 5500);
		},

		// 滑动开始
		touchstart(e) {
			this.startData.clientX = e.changedTouches[0].clientX;
		},
		// 滑动结束
		touchend(e) {
			const subX = e.changedTouches[0].clientX - this.startData.clientX;
			if (subX > 100) {
				this.bannerIndex = this.bannerIndex <= 0 ? this.banners.length - 1 : --this.bannerIndex;
				// console.log('->');
				this.bannerEvent(this.bannerIndex);
			} else if (subX < -100) {
				this.bannerIndex = this.bannerIndex >= this.banners.length - 1 ? 0 : ++this.bannerIndex;
				// console.log('<-');
				this.bannerEvent(this.bannerIndex);
			}
		},
		getBannerList() {
			let apiDevBusinessCarouselPage_Param = {
				pageNum: null /**     string required:false */,
				pageSize: null /**     string required:false */,
				ruralCardId: null /**     string required:false */
			};
			apiDevBusinessCarouselPage_Post(apiDevBusinessCarouselPage_Param).then(res => {
				var banner = res.data.data.records;
				banner.map((item, index) => {
					var img = JSON.parse(item.images)[0].imgUrl;
					item.url = img
					// if (index == 0) {
					// 	item.url = 'https://cdn.xiangcunmingpian.com/app/static/bgNew1.jpg';
					// }
					// if (index == 1) {
					// 	item.url = 'https://cdn.xiangcunmingpian.com/app/static/bgNew2.jpg';
					// }
				});
				this.bannerimg = banner;
				this.banners = banner;
				this.bannerDataCHange(0);
				this.changePic();
			});
		},
		/* 切换轮播图数据 */
		bannerEvent(index) {
			this.bannerDataCHange(index);
			this.changePic();
		},
		bannerDataCHange(index) {
			this.bannerTitle = this.bannerimg[index].title;
			this.bannerDesc = this.bannerimg[index].introduce;
			this.bannerRural = this.bannerimg[index].card.name;
			this.bannerMap = this.bannerimg[index].card.province + '·' + this.bannerimg[index].card.city;
			this.bannerCurrent = index;
		},
		gosearch() {
			uni.showLoading({ title: '加载中' });
			uni.navigateTo({
				url: '/subpages/search/search'
			});
			uni.hideLoading();
		},
		click() {
			console.log('click响应');
		},
		clickGrid(e) {
			uni.showLoading({ title: '加载中' });
			console.log(this.navList[e]);
			if (this.navList[e].url == '/pages/build/buildad') {
				uni.switchTab({
					url: '/pages/build/buildad'
				});
			} else if (this.navList[e].url == '/subpages/index/map') {
				uni.showToast({
					icon: 'none',
					title: '地图找村维护中，即将上线',
					duration: 3000
				});
				// uni.navigateTo({
				// 	url:'/arservice/pages/imcar/index?tag=4C7P9HSB'
				// })
			} else {
				uni.navigateTo({ url: this.navList[e].url });
			}
			uni.hideLoading();
		},
		clickBanner(e) {
			uni.showLoading({ title: '加载中' });
			uni.navigateTo({
				url: '/subpages/card/card?cardid=' + this.bannerimg[e].ruralCardId
			});
			uni.hideLoading();
		},
		// 检测元素距离顶部距离
		checkTop() {
			const query = uni.createSelectorQuery().in(this);
			query
				.select('#navi')
				.boundingClientRect(data => {
					if (this.navbarHeight == 0) {
						this.navbarHeight = data.bottom;
					}
				})
				.select('#checkTop')
				.boundingClientRect(data => {
					let marginTop = data.top.toFixed(2);
					if (this.initHeight == -1) {
						this.initHeight = marginTop;
					} else {
						let top = (marginTop / this.initHeight).toFixed(2);
						this.marginTop = top <= 0 ? 0 : top;
					}
				})
				.select('#kissStart')
				.boundingClientRect(data => {
					if (this.navbarHeight) {
						const kissStartTop = data.top.toFixed(2);
						// 浮动范围  防止快速滑动
						if (kissStartTop <= this.navbarHeight) {
							// console.log('kissStart', data);
							this.kissFlag = true;
						} else {
							this.kissFlag = false;
						}
					}
				})
				.select('#kissEnd')
				.boundingClientRect(data => {
					if (this.kissFlag && this.navbarHeight) {
						const kissEndTop = data.top.toFixed(2);
						// if (this.kissInit == -1 || this.kissPercent > 1) {
						if (this.kissInit == -1) {
							this.kissInit = kissEndTop;
							// this.kissPercent = 1;
						}
						const kissPercent = (
							(kissEndTop - this.navbarHeight).toFixed(2) / (this.kissInit - this.navbarHeight).toFixed(2)
						).toFixed(2);
						this.kissPercent = kissPercent < 0 ? 0 : kissPercent;
						this.$forceUpdate();
					} else {
					}
				})
				.exec();
		}
	},
	onPageScroll(e) {
		this.checkTop();
		this.isTop = e.scrollTop < this.initHeight * 2 - 30;
		// 高度超过阈值时改变tabbar状态
		if (e.scrollTop > 200) {
			wx.pub('isTop', false);
		} else {
			wx.pub('isTop', true);
		}
	},
	onReady() {
		wx.sub('toIndexTop', '首页回顶', () => {
			uni.pageScrollTo({
				scrollTop: 0,
				duration: 400,
				complete() {
					wx.pub('isTop', true);
				}
			});
		});
		getApp().getLastCard();
		this.checkTop();
	},
	// 触底触发
	onReachBottom() {
		uni.$emit('getIndexList');
	}
};
</script>

<style lang="scss">
page {
	background: #f1f1f1;
	height: 100%;
	width: 100%;
}
.stickyTab {
	background-color: #fff;
	padding: 10rpx 0rpx 32rpx;
}
.content_search {
	display: flex;
	justify-content: center;
	margin-bottom: 100rpx;
	.search {
		width: 80%;
		.u-search__content__input {
			font-family: 'SourceHanSerifCN-Medium' !important;
		}
	}
}
.content_nav {
	display: flex;
	flex-basis: auto;
	overflow: scroll;
	.nav_list {
		padding: 0rpx 30rpx 10rpx 30rpx;
		background: #ffffff17;
		border-radius: 24rpx;
		margin-left: 10rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-self: start;
		width: fit-content;
		.grid-text {
			font-size: 24rpx;
			color: #ebf2ff;
			padding: 20rpx 0 20rpx 0rpx;
			width: max-content;
		}
	}
}
.u-nav-slot {
	display: flex;
	width: 100%;
	.city {
		display: flex;
		align-items: center;
		min-width: 72px;
		text {
			color: #fff;
			-ms-flex-align: center;
			align-items: center;
			display: -ms-flexbox;
			display: flex;
			font-size: 38rpx;
			line-height: 44rpx;
			font-family: 'SourceHanSerifCN-Medium';
		}
	}
	.topColor {
		position: relative;
		.title {
			position: absolute;
			left: 0;
			color: #000;
			z-index: 1;
		}

		.subTitle {
			position: absolute;
			left: 0;
			color: #fff !important;
			z-index: 0;
		}
	}

	.searchCenter {
		-ms-flex-align: center;
		align-items: center;
		background-color: hsla(0, 0%, 100%, 0.6);
		border: 1rpx solid hsla(0, 0%, 59%, 0.2);
		color: #14161a;
		display: -ms-inline-flexbox;
		display: inline-flex;
		font-size: 28rpx;
		line-height: 40rpx;
		padding: 0 20rpx;
		flex: 1;
		box-sizing: border-box;
		border-radius: 32px;
		// margin-left:70px;
		-webkit-backdrop-filter: blur(2px) saturate(240%);
		backdrop-filter: blur(2px) saturate(240%);
		.searchBox {
			width: 100%;
		}
	}
}

.bgBanner {
	box-sizing: border-box;
	height: 100vh;
	left: 0;
	position: fixed;
	top: 0;
	width: 100vw;
	.bgFilter {
		backdrop-filter: blur(30rpx);
		background-color: rgba(0, 0, 0, 0.25);
		height: 100%;
		top: 0;
		left: 0;
		opacity: 0;
		pointer-events: none;
		position: absolute;
		width: 100%;
	}
}
.bannerTop {
	display: flex;
	flex-flow: column;
	justify-content: center;
	position: relative;
	.checkTop {
		// background-color: red;
		position: absolute;
		width: 100%;
		height: 1rpx;
		z-index: 0;
	}
	.swiper {
		height: 100%;
	}
	.swiper-item {
		display: block;
		height: 100%;
		line-height: 100%;
		text-align: center;
		color: #777;
	}
	.banner_lefttext {
		position: absolute;
		z-index: 31;
		bottom: 30rpx;
		left: 20rpx;
		height: 100rpx;
		.title {
			font-size: 36rpx;
			font-family: 'SourceHanSerifCN-Bold';
			color: #ffffffed;
			margin-bottom: 10rpx;
		}
		.description {
			font-size: 26rpx;
			color: #ffffffba;
		}
	}
	.banner_righttext {
		position: absolute;
		z-index: 31;
		bottom: 30rpx;
		right: 20rpx;
		height: 100rpx;
		.title {
			font-size: 36rpx;
			font-family: 'SourceHanSerifCN-Bold';
			color: #ffffffed;
			margin-bottom: 10rpx;
			text-align: right;
			display: flex;
			justify-content: flex-end;
			align-items: center;
		}
		.description {
			font-size: 26rpx;
			color: #ffffffba;
			text-align: right;
		}
	}
}

input {
	background-color: #00000000 !important;
}
//背景图片
.top_bg {
	width: 100%;
	.box {
		position: absolute;
		background: linear-gradient(#0000ff00 80%, #312b2b 100%);
		z-index: 30;
		bottom: 0;
		width: 100%;
	}
}
// .top_bg::before {
// 	content: ' ';
// 	position: absolute;
// 	background: linear-gradient(#0000ff00 40%, #312b2bb5 100%);
// 	z-index: 30;
// 	bottom: 0;
// 	height: 300rpx;
// 	width: 100%;
// }

.rural {
	border-top-left-radius: 30rpx;
	border-top-right-radius: 30rpx;
}
.u-navbar__content__left {
	width: 100% !important;
}
// .u-navbar__placeholder {
// 	display: none !important;
// }

.uni-margin-wrap {
	width: 690rpx;
	width: 100%;
}
.swiper {
	height: 50rpx;
}
.swiper-item {
	display: block;
	height: 50rpx;
	line-height: 50rpx;
	text-align: center;
	color: #777;
}
.swiper-list {
	margin-top: 40rpx;
	margin-bottom: 0;
}
.uni-common-mt {
	margin-top: 60rpx;
	position: relative;
}
.info {
	position: absolute;
	right: 20rpx;
}
.uni-padding-wrap {
	width: 550rpx;
	padding: 0 100rpx;
}
// 淡入淡出轮播图
.my-banner {
	width: 100%;
	height: 100vh;
	position: relative;
	.banner-imgs {
		width: 100%;
		height: 100%;
		opacity: 0;
		transition-duration: 1s; /*设置过渡时间*/
		position: absolute;
		.banner-imgs_img {
			position: absolute; /*把所有图片放在同一个位置*/
			width: 100%;
			height: 100%;
		}
	}

	.banner-dots {
		position: absolute;
		bottom: 10rpx;
		left: 50%;
		transform: translateX(-50%);
		.banner-dots_item {
			float: left;
			width: 18rpx;
			height: 18rpx;
			border-radius: 50%;
			margin-left: 20rpx;
			background-color: #fff;
		}
		.active {
			background-color: red;
		}
	}

	.on {
		opacity: 1;
	}
}
</style>
