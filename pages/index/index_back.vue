<template>
	<view>
		<view class="index">
			<view class="content_search">
				<view class="search">
					<u-search
						placeholder="输入乡村名称进入乡村名片"
						v-model="keyword"
						:showAction="false"
						bgColor="#0000007a"
						placeholderColor="#ebebeb"
						searchIconColor="#e1e1e1"
						color="#fff"
						height="46"
						:disabled="true"
						@click="gosearch()"
						:inputStyle="{ fontSize: '32rpx','font-family':'SourceHanSerifCN-Medium!important'}"
					></u-search>
				</view>
			</view>
			<view class="content_nav">
				<u-grid :border="false" @click="clickGrid" col="4">
					<u-grid-item v-for="(baseListItem, baseListIndex) in navList" :key="baseListIndex">
						<u-icon :customStyle="{ paddingTop: 35 + 'rpx' }" :name="baseListItem.name" :size="28"></u-icon>
						<text class="grid-text">{{ baseListItem.title }}</text>
					</u-grid-item>
				</u-grid>
				<u-toast ref="uToast" />
			</view>
		</view>
		<view class="page">
			<view class="top_bg" :style="{ height: pagesHeight + 'px' }">
				<!-- <image src="https://cdn.xiangcunmingpian.com/app/static/login_bg_1.jpg" class="top_bg"  mode="widthFix"></image> -->
				<!-- <view class="box" :style="{ height: pagesHeight + 'px' }"></view> -->
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
						<u-icon name="arrow-right" color="#fff" size="18" v-if="bannerRural.length != 0"></u-icon>
					</view>
					<view class="description">
						<text>{{ bannerMap }}</text>
					</view>
				</view>
				<u-swiper :list="bannerimg" :height="pagesHeight" @click="click" @change="banner"></u-swiper>
			</view>
			<u-navbar
				:showAction="false"
				:placeholder="true"
				title=" "
				bgColor="#ffffff00"
				leftIconColor="#fff"
				:titleStyle="{ color: '#fff' }"
			>
				<view class="u-nav-slot" slot="left">
					<!-- <u-search
						placeholder="乡村/农产品/产业"
						v-model="keyword"
						:showAction="false"
						bgColor="#0000007a"
						placeholderColor="#e1e1e1"
						searchIconColor="#e1e1e1"
						color="#fff"
					></u-search> -->
					<text>乡村名片</text>
				</view>
			</u-navbar>
		</view>
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
				'https://cdn.xiangcunmingpian.com/images/2022/05/30/login_bg_4_20220530201236A002.jpg' +
					imgSuffix[0]
			],
			navList: [
				{
					name: imgBaseUrl + 'index_nav_11.png' + imgSuffix[1],
					title: '点亮乡村',
					url: '/subpages/myrural/myrural'
				},
				{ name: imgBaseUrl + 'index_nav_8.png' + imgSuffix[1], title: '共建计划', url: '/pages/build/buildad' },
				{ name: imgBaseUrl + 'index_nav_2.png' + imgSuffix[1], title: '名片示例', url: '/subpages/index/demo' },
				{ name: imgBaseUrl + 'index_nav_10.png' + imgSuffix[1], title: '名片学院', url: '/subpages/edu/edu' }
			],
			pagesHeight: 0,
			bannerTitle: '',
			bannerDesc: '',
			bannerRural: '',
			bannerMap: '',
			bannerCurrent: 0
		};
	},
	onLoad() {
		this.getBannerList();
		wx.showShareMenu({
			withShareTicket: true,
			menus: ['shareAppMessage', 'shareTimeline']
		});
		getApp().getSysInfo();
		this.pagesHeight = getApp().globalData.sysInfo.windowHeight;
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
					item.url = img + imgSuffix[0];
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

.index {
	position: absolute;
	top: 30%;
	z-index: 2;
	width: 100%;
	border-radius: 0 0 30rpx 30rpx;
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
		margin: 20rpx 60rpx;
		padding: 0rpx 30rpx 20rpx 30rpx;
		z-index: 2;
		background: #00000038;
		border-radius: 30rpx;
		.grid-text {
			font-size: 26rpx;
			color: #ebf2ff;
			padding: 20rpx 0 20rpx 0rpx;
		}
	}
}

.u-nav-slot {
	text {
		color: #fff;
		font-size: 46rpx;
		font-family: 'SourceHanSerifCN-Medium';
	}
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
.top_bg {
	width: 100%;
	position: relative;
	// top: 0;
	z-index: 0;
	.box {
		position: absolute;
		background: linear-gradient(#0000ff00 80%, #312b2b 100%);
		z-index: 30;
		bottom: 0;
		width: 100%;
	}
	.banner_lefttext {
		position: absolute;
		z-index: 31;
		bottom: 180rpx;
		left: 40rpx;
		height: 100rpx;
		.title {
			font-size: 36rpx;
			font-family: 'SourceHanSerifCN-Bold';
			color: #dfdfdf;
			margin-bottom: 10rpx;
		}
		.description {
			font-size: 26rpx;
			color: #dfdfdf;
		}
	}
	.banner_righttext {
		position: absolute;
		z-index: 31;
		bottom: 180rpx;
		right: 40rpx;
		height: 100rpx;
		.title {
			font-size: 36rpx;
			font-family: 'SourceHanSerifCN-Bold';
			color: #dfdfdf;
			margin-bottom: 10rpx;
			text-align: right;
			display: flex;
			justify-content: flex-end;
		}
		.description {
			font-size: 26rpx;
			color: #dfdfdf;
			text-align: right;
		}
	}
}
.top_bg::before {
	content: ' ';
	position: absolute;
	background: linear-gradient(#0000ff00 40%, #312b2bb5 100%);
	z-index: 30;
	bottom: 0;
	height: 300rpx;
	width: 100%;
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

.u-navbar__placeholder {
	display: none !important;
}
</style>
