<template>
	<view>
		<view class="bgBanner">
			<u-swiper :list="bannerimg" :height="pagesHeight" @change="banner"></u-swiper>
		</view>
		<u-navbar
			:showAction="false"
			:placeholder="true"
			title=" "
			bgColor="#ffffff00"
		>
			<view class="u-nav-slot" slot="left" :style="{height:menuHeight+'px','margin-right':(menuwidth+13)+'px'}">
				<view class="city" :style="{'width':(menuwidth-13)+'px'}">
					<text>乡村名片</text>
				</view>
				<view class="searchCenter" >
					<view class="searchBox">
						<swiper class="swiper" circular :indicator-dots="false" :autoplay="true" :interval="3000" :vertical="true" :duration="500">
							<swiper-item v-for="(item,index) in notice" :key="index">
								<view class="swiper-item">{{item}}</view>
							</swiper-item>
						</swiper>
					</view>
				</view>
			</view>
		</u-navbar>
		<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scrolltoupper="upper" @scrolltolower="lower" @scroll="scroll">
			<view class="bannerTop" :style="{height:pagesHeight*0.46+'px'}">
				<swiper class="Tswiper" circular :indicator-dots="false" :autoplay="true" :interval="3000" :duration="500" :style="{height:pagesHeight*0.46+'px'}">
					<swiper-item v-for="(item,index) in bannerimg" :key="index">
						<view class="Tswiper-item"></view>
					</swiper-item>
				</swiper>
				<view class="banner_lefttext">
					<view class="title">
						<text>{{ bannerTitle }}</text>
					</view>
					<view class="description">
						<text>{{ bannerDesc }}</text>
					</view>
				</view>
				<view class="banner_righttext" @click="clickBanner(bannerCurrent)">
					<view class="title">
						<text>{{ bannerRural }}</text>
						<u-icon name="arrow-right" color="#ffffffed" size="18" v-if="bannerRural.length != 0"></u-icon>
					</view>
					<view class="description">
						<text>{{ bannerMap }}</text>
					</view>
				</view>
			</view>
			<view class="content_nav">
				<u-scroll-list :indicator="false">
				<view class="nav_list" v-for="(baseListItem, baseListIndex) in navList" :key="baseListIndex">
					<u-icon :customStyle="{ paddingTop: 35 + 'rpx' }" :name="baseListItem.name" :size="28"></u-icon>
					<text class="grid-text">{{ baseListItem.title }}</text>
				</view>
				</u-scroll-list>
			</view>
			<view class="rural">
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
			</view>
		</scroll-view>
	</view>
</template>
<script>
import { random, getStr_lv5, setUserPosition } from '@/utils/Utils-tool.js';
import { apiBusinessCardPage_Post } from '@/API/乡村名片.js';
import { apiDevBusinessCarouselPage_Post } from '@/API/轮播图Controller.js';

const imgBaseUrl = getApp().globalData.imgBaseUrl + '/app' + '/static/';
const imgSuffix = getApp().globalData.imgSuffix;
export default {
	data() {
		return {
			bannerimg: [
				'https://cdn.xiangcunmingpian.com/app/static/bgNew1.jpg'
			],
			navList: [
				{
					name: imgBaseUrl + 'index_nav_11.png' + imgSuffix[1],
					title: '点亮乡村',
					url: '/subpages/myrural/myrural'
				},
				{ name: imgBaseUrl + 'index_nav_8.png' + imgSuffix[1], title: '共建计划', url: '/pages/build/buildad' },
				{ name: imgBaseUrl + 'index_nav_2.png' + imgSuffix[1], title: '名片示例', url: '/subpages/index/demo' },
				{ name: imgBaseUrl + 'index_nav_10.png' + imgSuffix[1], title: '名片学院', url: '/subpages/edu/edu' },
				{ name: imgBaseUrl + 'index_nav_10.png' + imgSuffix[1], title: '名片学院', url: '/subpages/edu/edu' },
				{ name: imgBaseUrl + 'index_nav_10.png' + imgSuffix[1], title: '名片学院', url: '/subpages/edu/edu' }
			],
			pagesHeight: 0,
			bannerTitle: '',
			bannerDesc: '',
			bannerRural: '',
			bannerMap: '',
			bannerCurrent: 0,
			menuwidth:0,
			menuHeight:0,
			notice:['搜索乡村名称','雨崩村 梅里雪山','喜洲村 大理洱海'],
			tabslist: [
				{ name: '推荐' },
				{ name: '红色乡村' },
				{ name: '旅游乡村' },
				{ name: '古村古寨' },
				{ name: '产业发展' },
				{ name: '手艺乡村' }
			],
		};
	},
	onLoad() {
		this.getBannerList();
		wx.showShareMenu({
			withShareTicket: true,
			menus: ['shareAppMessage', 'shareTimeline']
		});
		let menu = wx.getMenuButtonBoundingClientRect();
		console.log('菜单参数',menu)
		this.menuHeight = menu.height
		this.menuwidth = menu.width + menu.width / 7;
		getApp().getSysInfo();
		this.pagesHeight = getApp().globalData.sysInfo.windowHeight;
		console.log(this.pagesHeight*0.6,this.pagesHeight*0.46)
	},
	onShow() {
		
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
	onReady() {
		// 获取用户地址
		// uni.getLocation({
		// 	type: 'wgs84',
		// 	success: function(res) {
		// 		setUserPosition(res);
		// 		console.log('---------------------------当前位置', res);
		// 		console.log('当前位置的经度：' + res.longitude);
		// 		console.log('当前位置的纬度：' + res.latitude);
		// 	}
		// });
		getApp().getLastCard();
	},
	methods: {
		changeIndicatorDots(e) {
			this.indicatorDots = !this.indicatorDots
		},
		changeAutoplay(e) {
			this.autoplay = !this.autoplay
		},
		intervalChange(e) {
			this.interval = e.target.value
		},
		durationChange(e) {
			this.duration = e.target.value
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
					item.url = "https://cdn.xiangcunmingpian.com/app/static/bgNew1.jpg"
					// item.url = img + imgSuffix[0];
				});
				this.bannerimg = banner;
				this.bannerTitle = this.bannerimg[0].title;
				this.bannerDesc = this.bannerimg[0].introduce;
				this.bannerRural = this.bannerimg[0].card.name;
				this.bannerMap = this.bannerimg[0].card.province + '·' + this.bannerimg[0].card.city;
				// console.log('轮播图数据：', res.data.data.records);
			});
		},
		banner(e) {
			// console.log(e.current)
			this.bannerTitle = this.bannerimg[e.current].title;
			this.bannerDesc = this.bannerimg[e.current].introduce;
			this.bannerRural = this.bannerimg[e.current].card.name;
			this.bannerMap = this.bannerimg[e.current].card.province + '·' + this.bannerimg[e.current].card.city;
			this.bannerCurrent = e.current;
		},
		gosearch() {
			uni.showLoading({ title: '加载中' });
			uni.navigateTo({
				url: '/pages/search/search'
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
.content_search {
	display: flex;
	justify-content: center;
	margin-bottom: 100rpx;
	.search {
		width: 80%;
		.u-search__content__input{
			font-family: 'SourceHanSerifCN-Medium'!important;
		}
	}
}
.content_nav {
	display: flex;
    flex-basis: auto;
	overflow: scroll;
	.nav_list{
		padding: 0rpx 26rpx 10rpx 26rpx;
		background: #ffffff17;
		border-radius: 30rpx;
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
	.city{
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
	.searchCenter{
		-ms-flex-align: center;
		align-items: center;
		background-color: hsla(0,0%,100%,.6);
		border: 1rpx solid hsla(0,0%,59%,.2);
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
		.searchBox{
			width: 100%;
		}
	}
}

.bgBanner{
	box-sizing: border-box;
	height: 100vh;
	left: 0;
	position: fixed;
	top: 0;
	width: 100vw;
}
.bannerTop{
	display: flex;
	flex-flow: column;
	justify-content: center;
	position: relative;
	.swiper {
		height: 100%;
	}
	.swiper-item {
		display: block;
		height: 100%;
		line-height: 100%;
		text-align: center;
		color:#777
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
.content_tabs {
	margin: 0rpx;
}

.content_sort {
	margin: 20rpx 50rpx 0rpx 50rpx;
	display: flex;
	.sort_list {
		margin-right: 20rpx;
	}
}

.rural{
	background-color: #fff;
	border-radius: 30rpx;
	box-sizing: border-box;
	color: #14161a;
	min-height: 50vh;
	padding: 20rpx 20rpx 32rpx;
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
.u-navbar__content__left{
	width: 100%!important;
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
		color:#777
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
</style>
