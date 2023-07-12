<template>
	<view class="">
		<view class="top_bg">
			<!-- <image src="https://cdn.xiangcunmingpian.com/app/static/login_bg_1.jpg" class="top_bg"  mode="widthFix"></image> -->
			<view class="news_info">
				<!-- <view class="ruralName" @click="goCard()">
					<text>{{ rural_info.name }}</text>
				</view> -->
				<view class="title">
					<text>{{ Info.title }}</text>
				</view>
				<view class="tag">
					<view class="list" v-for="(item, index) in showLabel" :key="index">
						<text>{{ item }}</text>
					</view>
				</view>
			</view>
			<u-swiper :list="bannerimg" :height="pagesHeight * 0.5" @click="clickImg" @change="e => (nowCurrent = e.current)"></u-swiper>
			<view class="imgSeq" @click="clickImg">{{ nowCurrent + 1 }} / {{ bannerimg.length }}</view>
		</view>
		<view class="content_news">
			<view class="news_content">
				<u-parse :content="Info.content"></u-parse>
			</view>
		</view>
		<u-navbar
			:showAction="false"
			:placeholder="true"
			title=" "
			:bgColor="naviStyle.bg"
			:leftIconColor="naviStyle.colo"
		>
			<view class="u-nav-slot_left" slot="left" :style="'color:' + naviStyle.colo" >
				<view class="" @click="goCard()">
					<u-icon name="home" size="18" :color="naviStyle.colo" v-></u-icon>
				</view>
				<view class="name" @click="goCard()">
					<text>{{ rural_info.name }}</text>
				</view>
			</view>
			<!-- <view
				class="u-nav-slot_right"
				slot="right"
				:style="'right:' + menuwidth + 'px;bottom:' + menuwidth / 11 + 'px'"
				@click="navright()"
			>
				<view class="title"><text>分享</text></view>
			</view> -->
		</u-navbar>
	</view>
</template>

<script>
const imgBaseUrl = getApp().globalData.imgBaseUrl + '/app' + '/static/';
import { apiBusinessCardInfo_Get } from '@/API/乡村名片.js';
import { apiBusinessInformationInfoinformationId_Get } from '@/API/乡村名片资讯.js';
import { apiBusinessInformationTagTagLabel_Get } from '@/API/资讯标签.js'; //标签

export default {
	computed: {
		/* 拿取本乡村数据 */
		rural_info() {
			return this.$store.state.build.currentRural;
		},
		naviStyle() {
			return this.isTop ? { bg: '#00000000', colo: '#fff' } : { bg: '#eeeeee00', colo: '#000' };
		}
	},
	data() {
		return {
			bannerimg: [],
			navList: [
				{ name: imgBaseUrl + 'index_nav_2.png', title: '示范乡村' },
				{ name: imgBaseUrl + 'index_nav_11.png', title: '点亮乡村' },
				{ name: imgBaseUrl + 'index_nav_8.png', title: '共建计划' },
				{ name: imgBaseUrl + 'index_nav_10.png', title: '名片学院' }
			],
			pagesHeight: 1000,
			cardId: null,
			Info: {},
			showLabel: [],
			menuwidth: 0,
			pagesWidth: null,
			nowCurrent:0
		};
	},
	onLoad: function(option) {
		this.getInfo(option.informationId);

		// 获取导航栏高度
		let menu = wx.getMenuButtonBoundingClientRect();
		this.menuwidth = menu.width + menu.width / 7;
		
		let sysInfo = getApp().globalData.sysInfo;
		
		this.pagesWidth = sysInfo.windowWidth;
		this.pagesHeight = sysInfo.windowHeight;
	},
	methods: {
		getInfo(informationId) {
			let para_body = {
				informationId: informationId /**     string required:true */
			};

			apiBusinessInformationInfoinformationId_Get(para_body).then(res => {
				console.log('资讯结果', res);
				this.Info = res.data.data;
				this.getTags();
				try {
					this.bannerimg = JSON.parse(res.data.data.urls).map(value => {
						//图片参数 自纠
						if (value.url) {
							return value.url;
						} else {
							return value.imgUrl;
						}
					});
				} catch (e) {
					this.bannerimg = [];
				}
			});
		},
		getTags() {
			apiBusinessInformationTagTagLabel_Get({
				cardId: this.rural_info.cardId //乡村id
			}).then(res => {
				if (res.data.code == 200) {
					var tags = res.data.data;
					this.Info.tagId.map(item => {
						tags.map(item1 => {
							if (item1.infoTagId == item) {
								this.showLabel = this.showLabel.concat(item1.name);
							}
						});
					});
				}
			});
		},
		goCard() {
			uni.redirectTo({
				url: '../card?cardId=' + this.rural_info.cardId
			});
		},
		clickmenu(e) {
			if (e.url.lenght != 0) {
				uni.navigateTo({
					url: e.url
				});
			}
		},
		navhome() {
			uni.switchTab({
				url: '/pages/build/buildad'
			});
		},
		navleft() {
			uni.navigateTo({
				url: '../myrural/rural_list'
			});
		},
		clickImg(e) {
			// console.log('点击事件', e);
			uni.previewImage({
				urls: this.bannerimg,
				current: e
			});
		},
		navright() {
			uni.navigateTo({
				url: '../card/card?cardid=' + this.cardid
			});
		}
	}
};
</script>

<style lang="scss">
.u-nav-slot_left {
	display: flex;
	padding: 8rpx 20rpx;
	border-radius: 30rpx;
	// border: 1rpx solid #ffffff9e;
	background: #ffffff9e;
	align-items: center;
	.name {
		font-size: 28rpx;
		font-family: 'SourceHanSerifCN-Bold';
		margin-left: 5rpx;
		padding-bottom: 3rpx;
	}

	.title {
		font-size: 26rpx;
		font-weight: 400;
	}
}

.u-nav-slot_right {
	display: flex;
	background: #0006;
	padding: 10rpx 20rpx;
	border-radius: 30rpx;
	color: #fff;
	position: absolute;
	width: max-content;
	height: 38rpx;
	line-height: 38rpx;

	.name {
		font-size: 28rpx;
		font-family: 'SourceHanSerifCN-Bold';
	}

	.title {
		font-size: 26rpx;
		font-weight: 400;
	}
}
.top_bg {
	width: 100%;
	position: relative;
	// top: 0;
	z-index: 0;
	.imgSeq {
		color: #ccc;
		font-size: 24rpx;
		background-color: rgba(72, 72, 72, 0.5);
		position: absolute;
		right: 30rpx;
		bottom: 58rpx;
		padding: 10rpx;
		border-radius: 14rpx;
		z-index: 1;
		align-items: center;
	}
	.box {
		position: absolute;
		background: linear-gradient(#0000ff00 80%, #312b2b 100%);
		z-index: 1;
		bottom: 0;
		width: 100%;
	}
	.news_info {
		position: absolute;
		bottom: 65rpx;
		z-index: 2;
		color: #fff;
		left: 30rpx;
		.ruralName {
			margin-bottom: 20rpx;
			text {
				padding: 8rpx 15rpx;
				background: #fff;
				color: #333;
				border-radius: 50rpx;
			}
		}
		.title {
			font-size: 44rpx;
			font-family: 'SourceHanSerifCN-Bold';
			// margin-bottom: 10rpx;
		}
		.tag {
			display: flex;
			flex-wrap: wrap;
			.list {
				margin-right: 20rpx;
				margin-top: 20rpx;
				text {
					padding: 8rpx 16rpx;
					background: #ffffff5e;
					border-radius: 40rpx;
					font-size: 26rpx;
					color: #fff;
				}
			}
		}
	}
}
.top_bg::before {
	content: '';
	position: absolute;
	background-image: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #6565659e 44%);
	bottom: 0;
	height: 290rpx;
	width: 100%;
	z-index: 1;
	border-radius: 0 0 20rpx 20rpx;
	border-top-left-radius: 0px;
	border-top-right-radius: 0px;
	border-bottom-right-radius: 10px;
	border-bottom-left-radius: 10px;
}
.content_news {
	border-radius: 30rpx 30rpx 0 0;
	background: #fff;
	z-index: 1000;
	margin-top: -30rpx;
	padding: 30rpx;
	font-size: 28rpx;
	position: relative;
}
</style>
