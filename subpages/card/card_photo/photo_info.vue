<template>
	<view class="">
		<view class="top_bg">
			<!-- <image src="https://cdn.xiangcunmingpian.com/app/static/login_bg_1.jpg" class="top_bg"  mode="widthFix"></image> -->
			<view class="news_info">
				<view class="ruralName" @click="goCard()">
					<text>{{ rural_info.name }}</text>
				</view>
				<view class="title">
					<text>{{ Info.title }}</text>
				</view>
				<view class="tag">
					<view class="list" v-for="(item, index) in showLabel" :key="index">
						<text>{{ item }}</text>
					</view>
				</view>
			</view>
			<u-swiper :list="bannerimg" :height="pagesHeight * 0.5" @click="clickImg"></u-swiper>
		</view>
		<view class="content_news">
			<view class="news_content"><u-parse :content="Info.content"></u-parse></view>
		</view>
		<u-navbar
			:showAction="false"
			:placeholder="true"
			:title="' '"
			bgColor="#ffffff00"
			leftIcon="home"
			leftIconColor="#fff"
			:titleStyle="{ color: '#fff' }"
			@leftClick="goCard()"
		></u-navbar>
	</view>
</template>

<script>
const imgBaseUrl = getApp().globalData.imgBaseUrl + '/app' + '/static/';
import { apiBusinessCardInfo_Get } from '@/API/乡村名片.js';
import { apiBusinessAtlasTagTagLabel_Get } from '@/API/图集标签.js'; //标签
import { apiBusinessAtlasInfoatlasId_Get } from '@/API/图集.js'; //列表

export default {
	computed: {
		/* 拿取本乡村数据 */
		rural_info() {
			return this.$store.state.build.currentRural;
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
			showLabel: []
		};
	},
	onLoad: function(option) {
		this.getInfo(option.atlasId);

		// 获取导航栏高度
		let menu = wx.getMenuButtonBoundingClientRect();
		this.menuwidth = menu.width + menu.width / 7;
	},
	methods: {
		getInfo(atlasId) {
			let para_body = {
				atlasId: atlasId /**     string required:true */
			};

			apiBusinessAtlasInfoatlasId_Get(para_body).then(res => {
				console.log('photo请求', res);
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
			apiBusinessAtlasTagTagLabel_Get({
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
		navright() {
			uni.navigateTo({
				url: '../card/card?cardid=' + this.cardid
			});
		},
		clickImg(e) {
			// console.log('点击事件', e);
			uni.previewImage({
				urls: this.bannerimg,
				current: e
			});
		}
	}
};
</script>

<style lang="scss">
.top_bg {
	width: 100%;
	position: relative;
	// top: 0;
	z-index: 0;
	.box {
		position: absolute;
		background: linear-gradient(#0000ff00 80%, #312b2b 100%);
		z-index: 1;
		bottom: 0;
		width: 100%;
	}
	.news_info {
		position: absolute;
		bottom: 80rpx;
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
			font-size: 48rpx;
			font-family: 'SourceHanSerifCN-Bold';
			margin-bottom: 10rpx;
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
.content_news {
	border-radius: 30rpx 30rpx 0 0;
	background: #fff;
	z-index: 1000;
	margin-top: -40rpx;
	padding: 30rpx;
	font-size: 28rpx;
}
</style>
