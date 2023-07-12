<template>
	<view class="">
		<u-navbar
			title=" "
			:placeholder="true"
			:bgColor="naviStyle.bg"
			leftIconColor="#ffffff00"
			:titleStyle="{ color: naviStyle.colo,backdropFilter:'blur(2px) saturate(240%)'}"
		>
			<view class="u-nav-slot_left" slot="left">
				<view class="name"><text>名片共建</text></view>
				<view class="desc"><text>让更多的乡村被看见</text></view>
			</view>
		</u-navbar>
		<view class="">
			<map
				id="map"
				:show-location="isShowme"
				:style="{ width: '100vw', height: pagesHeight + 'px' }"
				:latitude="latitude"
				:longitude="longitude"
				:enable-satellite="mapType"
				:enable-3D="true"
				:scale="scale"
				:subkey="mapKey"
				layer-style="1"
				:include-points="markersList"
				:markers="markersList"
				:polyline="polyline1"
				@regionchange="region"
				@markertap="markertap"
			></map>
		</view>
	</view>
</template>

<script>
import { apiBusinessCardMyRural_Get, apiBusinessCardCount_Get } from '@/API/乡村名片.js';
import { apiBusinessMemberUsernameCount_Post } from '@/API/用户会员接口.js';
import { mapRural_imgList, getStrIdentity } from '@/utils/Utils-tool.js';
const imgBaseUrl = getApp().globalData.imgBaseUrl + '/app/static/';
const imgSuffix = getApp().globalData.imgSuffix;
const MAPKEY = getApp().globalData.positionAPI_key;
export default {
	computed: {
		/* 获取身份字符串 */
		identityStr(para) {
			return para => {
				return getStrIdentity(para);
			};
		},
		naviStyle() {
			return this.isTop ? { bg: '#00000000', colo: '#fff' } : { bg: '#ffffff90', colo: '#fff' };
		}
	},
	data() {
		return {
			pagesHeight: 0,
			menuwidth: 0,
			menuHeight: 0,
			isTop: true, //是否在顶部
			navbarHeight: 0, //顶部自定义导航高度
		};
	},
	onLoad() {
		let menu = wx.getMenuButtonBoundingClientRect();
		this.menuHeight = menu.height;
		this.menuwidth = menu.width + menu.width / 7;
		this.pagesHeight = getApp().globalData.sysInfo.windowHeight;
		// console.log(this.pagesHeight * 0.6, this.pagesHeight * 0.46);
		
	},

	methods: {
		
	}
};
</script>

<style lang="scss">
//背景图片
.bottom_bg {
	width: 100%;
	position: fixed;
	top: 0;
	z-index: -1;
	height: 100%;
	width: 100%;
	background-color: #fafafa;
	background-image: url(https://cdn.xiangcunmingpian.com/app/static/ruralBg10.jpg);
	background-position: 0 0;
	background-repeat: no-repeat;
	background-size: 100% auto;
}

// page {
// 	background: #56a96e;
// }
page {
	height: 100%;
	width: 100%;
}

.u-nav-slot_left {
	display: flex;
	// background: #0006;
	// padding: 10rpx 20rpx;
	// border-radius: 30rpx;
	// color: #fff;
	align-items: baseline;
	text {
		color: #000000;
	}
	.name {
		font-size: 38rpx;
		font-family: 'SourceHanSerifCN-Bold';
	}
	.desc {
		font-size: 28rpx;
		font-weight: 400;
		margin-left: 10rpx;
		font-family: 'SourceHanSerifCN-Medium';
	}
}
.content {
	margin: 10rpx 30rpx 30rpx 30rpx;
	margin-bottom: 200rpx;
	.banner{
		margin-top: 20rpx;
	}
	
	.content_add {
		display: flex;
		margin: 40rpx 0;
		flex-flow: row-reverse;
		.add {
			color: #fff;
			background: #00000057;
			padding: 16rpx 20rpx;
			border-radius: 30rpx;
			font-size: 28rpx;
		}
	}
	.content_topimg {
		margin: 0rpx 20rpx;
		display: flex;
		justify-content: center;
		flex-direction: column;
		.img {
			color: #fff;
			display: flex;
			text-align: center;
			flex-direction: column;
			justify-items: center;
			image {
				width: 100%;
			}
		}
		.text {
			display: flex;
			color: #fff;
			font-size: 32rpx;
			justify-content: center;
			align-items: center;
		}
	}
	.content_rurallist {
		margin: 30rpx 0rpx;
		padding: 30rpx;
		// background: #fff;
		border-radius: 20rpx;
		overflow: hidden;
		background-color: hsla(0, 0%, 100%, 0.7);
		-webkit-backdrop-filter: blur(2px) saturate(240%);
		backdrop-filter: blur(2px) saturate(240%);
		border: 2rpx #fff solid;
		border-bottom: 1rpx #ececec solid;
		.rural_nav {
			display: flex;
			width: 100%;
			justify-content: space-between;
			margin-bottom: 20rpx;
			.title {
				font-size: 32rpx;
				font-family: 'SourceHanSerifCN-Bold';
			}
			.more {
				display: flex;
				font-size: 28rpx;
				height: 38rpx;
			}
		}
		.rural_nolist {
			display: flex;
			flex-direction: column;
			justify-items: center;
			margin: 10rpx 20rpx;
			text {
				text-align: center;
			}
		}
		.rural_content {
			width: 100%;
			.rural_list {
				display: flex;
				width: 280rpx;
				position: relative;
				margin-right: 20rpx;
				border-radius: 16rpx;
				.box {
					position: absolute;
					background-image: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%);
					z-index: 1;
					bottom: 0;
					height: 100%;
					width: 100%;
					opacity: 0.36;
					border-radius: 16rpx;
				}
				.img {
					width: 280rpx;
					height: 160rpx;
					border-radius: 16rpx;
				}
				.info {
					position: absolute;
					bottom: 10rpx;
					left: 10rpx;
					z-index: 2;
					.name {
						font-size: 28rpx;
						font-weight: 300;
						color: #fff;
					}
					.poi {
						font-size: 22rpx;
						color: #fff;
					}
				}
				.type {
					position: absolute;
					top: 0rpx;
					right: 0rpx;
					color: #fff;
					z-index: 2;
					width: 90rpx;
					padding: 5rpx;
					text-align: center;
					font-size: 22rpx;
					background-color: #000000;
					opacity: 0.5;
					border-radius: 0rpx 16rpx 0rpx 16rpx;
				}
			}
		}
	}
	.content_ruraltext {
		margin: 20rpx 0rpx;
		padding: 30rpx;
		// background: #fff;
		border-radius: 20rpx;
		overflow: hidden;
		background-color: hsla(0, 0%, 100%, 0.7);
		-webkit-backdrop-filter: blur(2px) saturate(240%);
		backdrop-filter: blur(2px) saturate(240%);
		border: 2rpx #fff solid;
		border-bottom: 1rpx #ececec solid;
		.rural_nav {
			display: flex;
			width: 100%;
			justify-content: space-between;
			margin-bottom: 20rpx;
			align-items: center;
			.title {
				font-size: 32rpx;
				font-family: 'SourceHanSerifCN-Bold';
			}
			.more {
				display: flex;
				font-size: 28rpx;
				height: 38rpx;
				align-items: center;
			}
		}
		.rural_content {
			font-size: 28rpx;
			text-align: justify;
		}
	}
	.content_list {
		display: flex;
		margin-bottom: 20rpx;
		padding: 40rpx 30rpx;
		// background: #fff;
		border-radius: 20rpx;
		position: relative;
		justify-content: space-between;
		background-color: hsla(0, 0%, 100%, 0.7);
		-webkit-backdrop-filter: blur(2px) saturate(240%);
		backdrop-filter: blur(2px) saturate(240%);
		border: 2rpx #fff solid;
		border-bottom: 1rpx #ececec solid;
		.info_left {
			color: #fff;
			.title {
				font-size: 38rpx;
				font-weight: 500;
				margin-bottom: 14rpx;
			}
			.map {
				font-size: 26rpx;
			}
		}
		.info_right {
			display: flex;
			flex-direction: column-reverse;
		}
		.right_top {
			position: absolute;
			top: 0;
			right: 0;
			background: #00000057;
			border-radius: 0 20rpx 0 20rpx;
			font-size: 26rpx;
			padding: 10rpx 20rpx;
			color: #fff;
		}
	}
	.ruralFunction {
		margin: 30rpx 0rpx;
		padding: 30rpx;
		// background: #fff;
		border-radius: 20rpx;
		display: flex;
		flex-flow: wrap;
		background-color: hsla(0, 0%, 100%, 0.7);
		-webkit-backdrop-filter: blur(2px) saturate(240%);
		backdrop-filter: blur(2px) saturate(240%);
		border: 2rpx #fff solid;
		border-bottom: 1rpx #ececec solid;
		.rural_nav {
			display: flex;
			width: 100%;
			justify-content: space-between;
			margin-bottom: 30rpx;
			.title {
				font-size: 32rpx;
				font-family: 'SourceHanSerifCN-Bold';
			}
			.more {
				display: flex;
				font-size: 28rpx;
				height: 38rpx;
			}
		}
		.list {
			width: 50%;
			display: flex;
			align-items: center;
			flex-direction: column;
			margin-bottom: 30rpx;
			.title {
				font-size: 32rpx;
				font-family: 'SourceHanSerifCN-Medium'
			}
			.desc {
				font-size: 26rpx;
				padding: 5px 30rpx;
				text-align: center;
				color: #676767;
			}
		}
	}
	.u-count-num {
		padding-bottom: 6rpx;
	}
}
.u-border{
	border-radius: 16rpx!important;
	// background-color: #fff;
	background-color: hsla(0, 0%, 100%, 0.8);
	-webkit-backdrop-filter: blur(2px) saturate(240%);
	backdrop-filter: blur(2px) saturate(240%);
}
.u-read-more__content{
	font-size: 28rpx!important;
}
</style>
