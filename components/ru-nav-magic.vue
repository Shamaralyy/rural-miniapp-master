<!-- 轮播图组件 -->
<template>
	<view class="content_nav">
		<view class="flex" v-for="(jsonItem, jsonIndex) in navList" :key="jsonIndex">
			<view class="nav" v-for="(navItem, navIndex) in jsonItem.nav" :key="navIndex">
				<view
					class="list"
					v-for="(listItem, listIndex) in navItem.list"
					@click="magicTap(listItem)"
					:key="listIndex"
					:style="[getBg(listItem.bgimg)]"
				>
					<view class="info" :class="[bigSizeFontClass('bigSize_info')]">
						<view class="num">
							<text>{{ listItem.bgtitle }}</text>
						</view>
						<view class="title">
							<text>{{ listItem.title }}</text>
						</view>
						<view class="desc">
							<text>{{ listItem.desc }}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
const imgBaseUrl = getApp().globalData.imgBaseUrl + '/app/static/';
const imgSuffix = getApp().globalData.imgSuffix[1];
import { getDefault_navimagic } from '@/utils/defaultData.js';
export default {
	name: 'ru-nav-magic',
	props: {
		navData: {
			default: {}
		},
		exNavi: {
			//额外的背景图
			default: {}
		}
	},
	computed: {
		/* 获取图片背景  空则返回缺省值 */
		getBg(url) {
			return url => {
				if (url == '' || url == null || url == undefined) {
					return {
						background: 'url(' + imgBaseUrl + 'carddemo.png' + imgSuffix + ')',
						backgroundSize: 'cover'
					};
				}
				return {
					background: 'url(' + url[0].url + imgSuffix + ')',
					backgroundSize: 'cover'
				};
			};
		}
	},
	data() {
		return {
			naviState: 0, //显示图片状态 0 默认值、1 魔方设置的值、2 没有魔方 但有轮播图
			navList: getDefault_navimagic()
		};
	},
	watch: {
		navData: {
			immediate: true,
			handler(newVale) {
				// console.log('组件获取到的navi数据:', newVale);
				if (newVale) {
					this.naviState = 1; //锁状态 取用设定值
					this.navList = JSON.parse(newVale);
				}
			}
		},
		exNavi: {
			immediate: true,
			handler(newVale) {
				// console.log('魔方额外数据:', newVale);
				if (this.naviState == 0) {
					this.navList = getDefault_navimagic(newVale);
				}
			}
		}
	},
	methods: {
		magicTap(listItem) {
			this.$emit('magicTap', listItem.url);
		}
	}
};
</script>

<style scoped lang="scss">
.content_nav {
	margin: 10rpx 0rpx 20rpx 0rpx;
	padding: 30rpx 30rpx 20rpx 30rpx;
	background-color: #fffffff2;
	border-radius: 20rpx;
	z-index: 2;
	.flex {
		display: flex;
		justify-content: space-between;
		.nav {
			width: 100%;
			display: flex;
			flex-direction: column;
		}
		.nav:nth-child(2) {
			margin-left: 10rpx;
		}
		.nav:nth-child(3) {
			margin-left: 10rpx;
		}
		.list {
			background: #f3f3f3;
			border-radius: 20rpx;
			margin-bottom: 14rpx;
			height: 100%;
			padding: 60rpx 18rpx 18rpx 18rpx;
			font-size: 28rpx;
			display: flex;
			flex-direction: column-reverse;
			background-size: cover;
			position: relative;
			.info {
				display: flex;
				flex-direction: column;
				position: relative;
				.num {
					position: absolute;
					top: -30rpx;
					font-size: 42rpx;
					font-family: 'SourceHanSerifCN-Bold';
					z-index: 2;
					color: #ffffff90;
					box-shadow: 0rpx -6px 0px -1rpx #00000010 inset;
					overflow: hidden;
					height: 38rpx;
				}
				.title {
					z-index: 3;
					font-size: 32rpx;
					font-family: 'SourceHanSerifCN-Bold';
					color: #fff;
					margin-bottom: 3rpx;
				}
				.desc {
					z-index: 3;
					font-size: 24rpx;
					color: #fff;
				}
			}
			.bigSize_info{
				.num {
					font-size: 42rpx;
					font-family: 'SourceHanSerifCN-Bold';
				}
				.title {
					font-size: 38rpx;
					font-family: 'SourceHanSerifCN-Bold';
					color: #fff;
				}
				.desc {
					font-size: 28rpx;
				}
			}
		}
		.list::before {
			content: '';
			position: absolute;
			background: linear-gradient(to top right, #1b460b90, #ffffff00);
			width: 100%;
			height: 100%;
			left: 0;
			bottom: 0;
			margin: 0;
			border-radius: 20rpx;
		}
	}
}
</style>
