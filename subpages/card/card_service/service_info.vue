<template>
	<view class="">
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
		<view class="service_info">
			<view class="service_info_title">{{ Info.title }}</view>
			<u-read-more :toggle="true" showHeight="100" color="#000">
				<text>{{ Info.synopsis }}</text>
				<rich-text :nodes="Info.content" @load="richcontentload"></rich-text>
			</u-read-more>
			<view class="service_info_grid">
				<u-grid :border="false" col="5">
					<u-grid-item v-for="(listItem, listIndex) in Info.environment" :key="listIndex">
						<u-icon :customStyle="{ paddingTop: 20 + 'rpx' }" :name="listItem.name" :size="28"></u-icon>
						<text class="grid-text">{{ listItem.title }}</text>
					</u-grid-item>
				</u-grid>
				<u-toast ref="uToast" />
			</view>
			<view class="service_info_servertitle">设施与服务</view>
			<view class="service_info_serverlist">
				<u-tag
					:text="item"
					bgColor="#ececec"
					color="#333"
					v-for="(item, index) in Info.supplyServe"
					:key="index"
					borderColor="#ececec"
					type="warning"
				></u-tag>
			</view>
			<view class="service_info_mapTitle">地理位置</view>
			<view class="service_info_mapInfo">
				<u-icon name="map"></u-icon>
				<text :user-select="true" lines="1" size="14" color="#fff">
					{{
						rural_info.province +
							rural_info.city +
							rural_info.county +
							rural_info.town +
							rural_info.name +
							'——' +
							Info.title
					}}
				</text>
			</view>
			<view class="service_info_map">
				<map
					:style="{ width: pagesWidth - 40 + 'px', height: '180px' }"
					:latitude="Info.latitude"
					:longitude="Info.longitude"
					:enable-satellite="false"
					:enable-3D="true"
					:scale="16"
					:subkey="mapKey"
					layer-style="1"
					:markers="marker"
				></map>
			</view>
		</view>

		<view class="content_bottom">
			<view class="contact">
				<view class="avatar">
					<view class="avatar_info"><image :src="Info.contact.avatar" mode=""></image></view>
				</view>
				<view class="title">
					<view class="name">
						<text>{{ Info.contact.name }}</text>
					</view>
					<view class="desc">
						<text>{{ Info.contact.desc }}</text>
					</view>
				</view>
				<view class="call">
					<view class="phone" @click="copy('phone')"><u-icon name="phone" size="28"></u-icon></view>
					<view class="wechat" @click="copy('wechat')" v-if="Info.contact.wechat != ''">
						<u-icon name="weixin-fill" size="25"></u-icon>
					</view>
				</view>
			</view>
			<view class="other">
				<view class="button share" v-if="shareState">
					<u-button text="分享" icon="share" open-type="share"></u-button>
				</view>
				<view class="button share" v-if="Info.vrUrl != null">
					<u-button text="看全景" icon="eye" @click="goVr(Info.vrUrl)"></u-button>
				</view>
				<view class="button share"><u-button text="去这里" icon="map" @click="toMap"></u-button></view>
			</view>
		</view>
		<u-navbar
			:showAction="false"
			:placeholder="true"
			title=" "
			:bgColor="naviStyle.bg"
			:leftIconColor="naviStyle.colo"
		>
			<view class="u-nav-slot_left" slot="left" :style="'color:' + naviStyle.colo">
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
// 引入SDK核心类
var QQMapWX = require('../../../commonJS/qqmap-wx-jssdk.min.js');
const MAPKEY = getApp().globalData.positionAPI_key;
const imgBaseUrl = getApp().globalData.imgBaseUrl + '/app' + '/static/';
const imgSuffix = getApp().globalData.imgSuffix;
import { apiBusinessCardInfo_Get } from '@/API/乡村名片.js';
import { apiBusinessCommodityTagTagLabel_Get } from '@/API/好物标签.js'; //标签
import { apiBusinessCommodityInfocommodityId_Get } from '@/API/商品好物news.js'; //列表
export default {
	computed: {
		/* 拿取本乡村数据 */
		rural_info() {
			return this.$store.state.build.currentRural;
		},
		naviStyle() {
			return this.isTop
				? {
						bg: '#00000000',
						colo: '#fff'
				  }
				: {
						bg: '#eeeeee00',
						colo: '#000'
				  };
		}
	},
	data() {
		return {
			shareState: false,
			imgBaseUrl: imgBaseUrl,
			mapKey: MAPKEY,
			bannerimg: [],
			lodingState: true,
			pagesHeight: 300,
			Info: {},
			showLabel: [],
			mySuffix: imgSuffix,
			nowCurrent: 0,
			menuwidth: 0,
			pagesWidth: null,
			marker: [
				{
					id: 0,
					latitude: 0, //纬度
					longitude: 0, //经度
					iconPath: imgBaseUrl + 'map.png', //显示的图标
					width: '24',
					height: '28',
					rotate: 0, // 旋转度数
					alpha: 1, //透明度
					callout: {
						content: '位置名称',
						display: 'ALWAYS',
						padding: '10',
						borderRadius: 10
					}
				}
			]
		};
	},

	onLoad: function(option) {
		if (option.cardId) {
			console.log('携带cardID', option);
			this.shareState = false;
			this.getruralinfo(option);
		} else {
			console.log('不携带cardID');
			this.getInfo(option.commodityId);
			this.shareState = true;
		}

		let menu = wx.getMenuButtonBoundingClientRect();
		this.menuwidth = menu.width + menu.width / 7;
		let sysInfo = getApp().globalData.sysInfo;
		this.pagesWidth = sysInfo.windowWidth;
	},
	methods: {
		goVr(url) {
			uni.navigateTo({
				url: '/subpages/vr/vr?src=' + url
			});
		},
		copy(key) {
			const type = {
				wechat: '微信号',
				phone: '手机号'
			};
			const value = this.Info.contact[key];
			uni.setClipboardData({
				data: value,
				success() {
					uni.showToast({
						icon: 'none',
						title: `${type[key]}复制成功：${value}`
					});
				}
			});
		},
		/* 获取乡村数据 */
		getruralinfo(option) {
			apiBusinessCardInfo_Get({
				cardId: option.cardId
			})
				.then(res => {
					// console.log('获取当前乡村数据', res);
					if (res.data.code == 200) {
						this.$store.commit('build/setCurrentRural_all', res.data.data);
					}
				})
				.then(() => {
					setTimeout(() => {
						this.getInfo(option.commodityId);
					}, 1000);
				});
		},
		/* 根据ID获取指定乡村的指定详情 */
		getInfo(id) {
			let para = {
				commodityId: id
				/**     string required:true */
			};
			console.log('信息请求参数', para);
			apiBusinessCommodityInfocommodityId_Get(para)
				.then(res => {
					console.log('mapInfo请求结果', res.data.data);
					this.paseData(res.data.data);
					try {
						this.bannerimg = JSON.parse(res.data.data.urls).map(value => {
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
		// 处理接口数据
		paseData(info) {
			let temp = info,
				contact = {};
			temp.environment = JSON.parse(temp.environment);
			JSON.parse(temp.contact).map(val => {
				let key = Object.keys(val)[0];
				contact[key] = val[key];
			});
			temp.supplyServe = JSON.parse(temp.supplyServe);
			temp.contact = contact;
			temp.url = JSON.parse(temp.url);
			this.Info = temp;
			this.marker[0].latitude = temp.latitude;
			this.marker[0].longitude = temp.longitude;
			this.marker[0].callout.content = temp.title;
		},
		getTags() {
			apiBusinessCommodityTagTagLabel_Get({
				cardId: this.rural_info.cardId //乡村id   正式版要把这个解除
				// cardId:7,//乡村id 这个是测试开发
			}).then(res => {
				if (res.data.code == 200) {
					let tags = res.data.data;
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
		toMap() {
			const latitude = Number(this.Info.latitude),
				longitude = Number(this.Info.longitude);
			uni.getLocation({
				type: 'gcj02', //返回可以用于uni.openLocation的经纬度
				success(res) {
					uni.openLocation({
						latitude: latitude,
						longitude: longitude,
						scale: 20,
						// name: this.rural_info.name,
						success(res) {
							console.log('success');
						}
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
				url: '../card/card?cardId=' + this.rural_info.cardId
			});
		},
		clickImg(e) {
			// console.log('点击事件', e);
			uni.previewImage({
				urls: this.bannerimg,
				current: e
			});
		},
		richcontentload() {
			this.$refs.uReadMore.init();
		}
	},
	onShareAppMessage(res) {
		return {
			title: this.Info.title + ' - ' + this.rural_info.name,
			path:
				'/subpages/card/card_service/service_info?cardId=' +
				this.rural_info.cardId +
				'&commodityId=' +
				this.Info.coordinateId,
			imageUrl: this.bannerimg[0]
		};
	},
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

.service_info {
	padding: 30rpx;
	position: relative;
	background: #fff;
	border-radius: 20rpx;
	border-top: 2rpx solid #e2e2e2;
	top: -16rpx;
	z-index: 5;
	margin-bottom: 200rpx;
	.service_info_title {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		color: #000;
		font-size: 46rpx;
		margin-bottom: 22rpx;
		font-weight: 600;
	}

	.service_info_servertitle {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		color: #000;
		font-size: 36rpx;
		font-weight: 600;
		margin-bottom: 22rpx;
	}

	.service_info_grid {
		margin: 50rpx 0;

		.grid-text {
			font-size: 28rpx;
			color: #2f2f2f;
			padding: 10rpx 0 20rpx 0rpx;
			/* #ifndef APP-PLUS */
			box-sizing: border-box;
			/* #endif */
		}
	}

	.service_info_serverlist {
		margin: 35rpx 0;
		display: flex;
		flex-wrap: wrap;

		.u-transition {
			margin-bottom: 15rpx;
			margin-right: 10rpx;
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

.service_info_mapTitle {
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	color: #000;
	font-size: 36rpx;
	font-weight: 600;
	margin-bottom: 20rpx;
}

.service_info_mapInfo {
	display: flex;
	margin-bottom: 20rpx;
}

.content_bottom {
	position: fixed;
	bottom: 0rpx;
	// background: #fff;
	width: 100%;
	display: flex;
	border-top: 1rpx solid #e6e6e6;
	flex-direction: column;
	z-index: 100;
	background-color: hsla(0, 0%, 100%, 0.6);
	-webkit-backdrop-filter: blur(2px) saturate(240%);
	backdrop-filter: blur(2px) saturate(240%);

	.contact {
		display: flex;
		padding: 10rpx 30rpx;
		border-bottom: 1rpx solid #e6e6e6;

		.avatar {
			width: 20%;
			.avatar_info image {
				width: 110rpx;
				height: 110rpx;
				border-radius: 20rpx;
			}
		}

		.title {
			width: 40%;
			margin-left: 16rpx;
			.name {
				font-size: 36rpx;
				font-weight: 600;
				margin-bottom: 14rpx;
			}

			.desc {
				font-size: 28rpx;
				color: #868686;
			}
		}

		.call {
			width: 40%;
			margin-left: 10%;
			display: flex;
			align-items: center;
			justify-content: space-around;
			.phone {
				background: #dadada6b;
				border-radius: 50%;
				padding: 14rpx 12rpx 8rpx 10rpx;
			}
			.wechat {
				background: #dadada6b;
				border-radius: 50%;
				padding: 14rpx 13rpx 15rpx 14rpx;
			}
		}
	}

	.other {
		display: flex;
		justify-content: space-between;

		.share {
			button {
				border-color: #ffffff00;
				background: #ffffff00;
			}
		}

		.button {
			display: flex;
			width: 20%;
			margin: 20rpx 30rpx 40rpx;
			align-items: center;

			button {
				height: 60rpx;
			}
		}
	}
}
.hover {
}
</style>
