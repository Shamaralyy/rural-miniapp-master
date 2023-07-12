<template>
	<view>
		<view class="content_news" v-if="isShowTitle == true">
			<view class="news_nav">
				<view class="title">
					<text>{{ title }}</text>
				</view>
				<view class="more"><!-- <text>查看全部</text> --></view>
			</view>
		</view>

		<view class="iib_weather" @click="day7">
			<image
				src="http://cdn.xiangcunmingpian.com/images/naviMagic/uJiDYnTYRj_2022_6_19.jpg?x-oss-process=style/p20"
			/>
			<view class="waicwenzi">
				<view class="wenzi">
					<i :class="'qi-' + winterData.icon" v-if="winterData"></i>
					周{{ week | weekFormat }} {{ winterData.text || '' }}
				</view>
				<view class="wenzi" v-if="winterData.temp">{{ winterData.temp }} ℃</view>
			</view>
		</view>
	</view>
</template>

<script>
const weekISO = {
	0: '日',
	1: '一',
	2: '二',
	3: '三',
	4: '四',
	5: '五',
	6: '六'
};
import { cardData, cardProps, cardWatch, cardMethods, diyDefault } from '@/components/mixins/cardMixins.js';
export default {
	name: 'ru-diy09',
	mixins: [cardData, cardProps, cardMethods, cardWatch, diyDefault],
	data() {
		return {
			week: '', //星期
			tempWinterData: {},
			winterState: {}
		};
	},
	computed: {
		winterData() {
			if (this.isPublic) {
				return this.winterState;
			} else {
				return this.tempWinterData;
			}
		}
	},
	methods: {
		/* 获取、配置预览所需默认数据 */
		getDefaultData(res) {
			this.tempWinterData = res.winterData;
		},
		upWinterData(winterState) {
			this.winterState = winterState;
			this.$forceUpdate();
		},
		// 打开7天数据弹窗
		day7() {
			if (this.isPublic) {
				uni.$emit('openWeather');
			} else {
				console.log('演示数据点击无效');
			}
		}
	},
	filters: {
		weekFormat(day) {
			return weekISO[day];
		}
	},
	mounted() {
		const time = new Date();
		this.week = time.getDay();
		uni.$once('upWinterData', winterState => {
			this.upWinterData(winterState);
		});
		uni.$emit('winterReady');
	}
};
</script>
<style lang="scss" scoped>
/* /deep/ */
.content_news {
	margin: 20rpx 30rpx;
	overflow: hidden;
	.news_nav {
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
}

.iib_weather {
	padding: 0 30rpx;
	position: relative;
	image {
		width: 100%;
		height: 150rpx;
		border-radius: 15rpx;
	}
	.waicwenzi {
		position: absolute;
		top: 35%;
		display: flex;
		color: #fff;
		font-size: 30rpx;
		width: 84%;
		justify-content: space-between;
		margin-left: 32rpx;
		letter-spacing: 6rpx;
		.wenzi {
			display: flex;
			align-items: center;
			image {
				width: 45rpx;
				height: 45rpx;
				margin-right: 15rpx;
			}
		}
	}
}
</style>
