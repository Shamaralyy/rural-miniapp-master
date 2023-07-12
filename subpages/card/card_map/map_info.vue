<template>
	<view class="">
		<u-loading-page :loading="lodingState" loading-text="加载中..."></u-loading-page>
		<!-- 轮播图 -->
		<view class="imgBox" v-if="bannerimg.length > 0">
			<u-swiper
				:list="bannerimg"
				@change="e => (nowCurrent = e.current)"
				:height="pagesHeight"
				@click="clickImg"
			></u-swiper>
			<view class="imgSeq">{{ nowCurrent + 1 }} / {{ bannerimg.length }}</view>
		</view>
		<!-- 内容 -->
		<view class="container-info">
			<view class="title">
				<view class="title-info-avatar" v-if="bannerimg.length > 0">
					<u-avatar :src="bannerimg[0]" shape="square" :size="80"></u-avatar>
				</view>
				<view class="title-info-name">{{ Info.name }}</view>
				<view class="title-info-tag">
					<!-- 所属标签 -->
					<view class="list" v-for="(item, index) in showLabel" :key="index">
						<text>{{ item }}</text>
					</view>
				</view>
			</view>
			<view style="font-size: 32rpx;margin: 40rpx 0 40rpx 0;">位置信息</view>
			<view class="info-map gard_area">
				<view class="tit">地址：</view>
				<view class="content">
					<text>{{ rural_info.province }}</text>
					<text>{{ rural_info.city }}</text>
					<text>{{ rural_info.county }}</text>
					<text>{{ rural_info.town }}</text>
					<text>{{ rural_info.name }}</text>
					<text>{{ Info.name }}</text>
				</view>
			</view>
			<view class="info-text gard_area">
				<view class="tit">简介：</view>
				<view class="content"><u-parse :content="Info.detail"></u-parse></view>
			</view>
		</view>
		<view class="content_bottom">
			<view class="button share"><u-button text="分享" icon="share" open-type="share"></u-button></view>
			<view class="button"><u-button text="去这里" color="#04c354" @click="toMap"></u-button></view>
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
const imgSuffix = getApp().globalData.imgSuffix;
import { apiBusinessCardInfo_Get } from '@/API/乡村名片.js';
import { apiBusinessCoordinateInfocoordinateId_Get } from '@/API/坐标位置.js';
import { apiBusinessCoordinateTagTagLabel_Get } from '@/API/坐标分类62.js'; //标签
const MAPKEY = getApp().globalData.positionAPI_key;
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
			lodingState: true,
			pagesHeight: 300,
			Info: {},
			showLabel: [],
			mySuffix: imgSuffix,
			nowCurrent: 0,
			menuwidth: 0,
			pagesWidth: null,
		};
	},
	onLoad: function(option) {
		if (option.cardId) {
			console.log('携带cardID', option);
			this.getruralinfo(option);
		} else {
			console.log('不携带cardID');
			this.getInfo(option.coordinateId);
		}

		let menu = wx.getMenuButtonBoundingClientRect();
		this.menuwidth = menu.width + menu.width / 7;
		let sysInfo = getApp().globalData.sysInfo;
		this.pagesWidth = sysInfo.windowWidth;
	},
	methods: {
		/* 获取乡村数据 */
		getruralinfo(option) {
			apiBusinessCardInfo_Get({ cardId: option.cardId })
				.then(res => {
					// console.log('获取当前乡村数据', res);
					if (res.data.code == 200) {
						this.$store.commit('build/setCurrentRural_all', res.data.data);
					}
				})
				.then(() => {
					setTimeout(() => {
						this.getInfo(option.coordinateId);
					}, 1000);
				});
		},
		/* 根据ID获取指定乡村的指定详情 */
		getInfo(coordinateId) {
			let para = {
				coordinateId: coordinateId
				/**     string required:true */
			};
			console.log('信息请求参数', para);
			apiBusinessCoordinateInfocoordinateId_Get(para)
				.then(res => {
					console.log('mapInfo请求结果', res.data);
					this.Info = res.data.data;
					try {
						this.bannerimg = JSON.parse(res.data.data.images).map(value => {
							return value.imgUrl + this.mySuffix[1];
						});
					} catch (e) {
						this.bannerimg = [];
					}
					return res.data.code;
				})
				.then(code => {
					if (code == 200) {
						this.lodingState = true;
						this.getTags();
					}
				});
		},
		getTags() {
			apiBusinessCoordinateTagTagLabel_Get({
				//    cardId: this.cardId, //乡村id
				cardId: this.rural_info.cardId //乡村id
				// cardId: 89314 //乡村id
			}).then(res => {
				if (res.data.code == 200) {
					let tags = res.data.data;
					this.Info.tagId.map(item => {
						tags.map(item1 => {
							if (item1.coordinateTagId == item) {
								this.showLabel = this.showLabel.concat(item1.name);
							}
						});
					});
				}
			});
		},
		toMap() {
			const latitude = Number(this.Info.latitude);
			const longitude = Number(this.Info.longitude);
			var name = this.rural_info.name + this.Info.name
			let endPoint = JSON.stringify({  //终点
			    'name': name,
			    'latitude':latitude,
			    'longitude':longitude
			});
			let plugin = requirePlugin('routePlan');
			wx.navigateTo({
			    url: 'plugin://routePlan/index?key=' + MAPKEY + '&referer=乡村名片&endPoint=' + endPoint
			});
			// uni.getLocation({
			// 	type: 'gcj02', //返回可以用于uni.openLocation的经纬度
			// 	success(res) {
			// 		uni.openLocation({
			// 			latitude: latitude,
			// 			longitude: longitude,
			// 			scale: 20,
			// 			// name: this.rural_info.name,
			// 			success(res) {
			// 				console.log('success');
			// 			}
			// 		});
			// 	}
			// });
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
				url: '../card/card?cardId=' + this.rural_info.cardId
			});
		},
		clickImg(e) {
			// console.log('点击事件', e);
			uni.previewImage({
				urls: this.bannerimg,
				current: e
			});
		}
	},
	onShareAppMessage(res) {
		return {
			title: this.Info.name + ' - ' + this.rural_info.name,
			path:
				'/subpages/card/card_map/map_info?cardId=' +
				this.rural_info.cardId +
				'&coordinateId=' +
				this.Info.coordinateId,
			imageUrl: this.bannerimg[0] + this.mySuffix
		};
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
.imgBox {
	position: relative;
	.imgSeq {
		color: #fff;
		font-size: 24rpx;
		background-color: rgba(72, 72, 72, 0.5);
		position: absolute;
		right: 20rpx;
		bottom: 34rpx;
		padding: 10rpx;
		border-radius: 14rpx;
	}
}
.imgBox::before {
	content: '';
	position: absolute;
	background-image: linear-gradient(180deg, rgba(0, 0, 0, 0) 60%, #6565659e 120%);
	bottom: 0;
	height: 150rpx;
	width: 100%;
	z-index: 1;
	border-radius: 0 0 20rpx 20rpx;
	border-top-left-radius: 0px;
	border-top-right-radius: 0px;
	border-bottom-right-radius: 10px;
	border-bottom-left-radius: 10px;
}
.container-info {
	padding: 30rpx;
	position: relative;
	background: #fff;
	border-radius: 20rpx;
	border-top: 2rpx solid #e2e2e2;
	top: -16rpx;
	z-index: 5;
	.title {
		width: 100%;
		display: grid;
		align-items: center;
		grid-template-rows: repeat(4, 1fr);
		grid-template-columns: repeat(4, 1fr);
		.title-info-avatar {
			grid-row: 1 / span 4;
			grid-column: 1 / span 1;
			image {
				border: 1rpx solid #dcdcdc;
			}
		}
		.title-info-name {
			font-size: 22px;
			grid-row-end: span 2;
			grid-column-end: span 2;
			margin-bottom: 10rpx;
		}
		.title-info-tag {
			grid-column-end: span 2;
			.list {
				text {
					padding: 8rpx 16rpx;
					background: #0000005e;
					border-radius: 40rpx;
					font-size: 24rpx;
					color: #fff;
				}
			}
		}
	}
	.info-map {
	}
	.info-text {
	}
	.gard_area {
		display: grid;
		margin-top: 3vh;
		font-size: 28rpx;
		grid-template-columns: 14% 86%;
	}
}
.content_bottom {
	position: fixed;
	bottom: 0rpx;
	background: #fff;
	width: 100%;
	display: flex;
	border-top: 1rpx solid #e6e6e6;
	justify-content: space-between;
	z-index: 100;
	.share {
		button {
			border-color: #ffffff00;
		}
	}
	.button {
		display: flex;
		width: 20%;
		margin: 20rpx 30rpx 40rpx;
		align-items: center;
		button{
			height: 60rpx;
		}
	}
}
</style>
