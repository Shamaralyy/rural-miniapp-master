<template>
	<view class="">
		<view class="" style="text-align: center;margin:30rpx 0">
			<text>左右滑动切换下一个示例体验</text>
		</view>
		<view class="uni-margin-wrap">
			<swiper class="swiper" circular :interval="interval"
				:duration="duration">
				<swiper-item v-for="(item,index) in rural" :key="index" class="swiper-item">
					<view class="">
						<image :src="item.img" mode="widthFix" style="width: 400rpx;border-radius: 20rpx;"></image>
					</view>
					<view style="font-family: 'SourceHanSerifCN-Medium';font-size: 36rpx;">
						<text>{{item.name}}</text>
					</view>
					<view class="info">
						<view class="title">
							<text>{{item.info}}</text>
						</view>
					</view>
					<view class="btn">
						<u-button class="custom-style" text="前往体验" type="success" @click="gorural(item.id)"></u-button>
					</view>
				</swiper-item>
				
			</swiper>
		</view>
		
	</view>
</template>

<script>
import { random, getStr_lv5 } from '@/utils/Utils-tool.js';
import { apiBusinessCardPage_Post } from '@/API/乡村名片.js';
const imgBaseUrl = getApp().globalData.imgBaseUrl + '/app' + '/static/';
export default {
	data() {
		return {
			pagesHeight: 1000,
			rarulList: [],
			imgBaseUrl: imgBaseUrl,
			list3: [
			    'https://cdn.xiangcunmingpian.com/app/static/demo1.jpg',
			    'https://cdn.xiangcunmingpian.com/app/static/demo2.jpg',
			    'https://cdn.xiangcunmingpian.com/app/static/demo3.jpg',
			    'https://cdn.xiangcunmingpian.com/app/static/demo4.jpg',
			    'https://cdn.xiangcunmingpian.com/app/static/demo5.jpg',
			],
			background: ['color1', 'color2', 'color3'],
			indicatorDots: true,
			autoplay: true,
			interval: 2000,
			duration: 500,
			rural:[
				{
					img:'https://cdn.xiangcunmingpian.com/app/static/demo1.jpg',
					name:'喜洲村',
					id:'89314',
					info:'喜洲村是由平台整理的综合名片展示可以体验全部功能。'
				},
				{
					img:'https://cdn.xiangcunmingpian.com/app/static/demo2.jpg',
					name:'旭日村',
					id:'93502',
					info:'旭日村是由旭日村村民自己参与完善内容（主要体验向导功能）。'
				},
				{
					img:'https://cdn.xiangcunmingpian.com/app/static/demo4.jpg',
					name:'培田村',
					id:'93055',
					info:'培田村是手绘地图示例乡村，请体验培田村的向导功能。'
				},
				{
					img:'https://cdn.xiangcunmingpian.com/app/static/demo5.jpg',
					name:'古田吴地小镇',
					id:'93464',
					info:'古田吴地小镇主要体验向导功能的增强地图效果（其他可不体验）。'
				},
				{
					img:'https://cdn.xiangcunmingpian.com/app/static/demo3.jpg',
					name:'雨崩村',
					id:'90000',
					info:'雨崩村是网友一起参与制作的向导旅游类乡村（主要体验全景功能）。'
				},
			]
		};
	},
	onLoad() {
		this.pagesHeight = getApp().globalData.sysInfo.windowHeight;
		this.getList();
	},
	methods: {
		getList() {
			apiBusinessCardPage_Post({
				sortType: 1,
				searchLabel: '示例'
			}).then(res => {
				return new Promise((resolve, reject) => {
					console.log('公共接口获取数据', res);
					if (res.data.code == 200) {
						//请求成功 增加请求体页数
						var rarulList = res.data.data.records;
						rarulList.map((item, index) => {
							console.log('循环第：' + index + '个', item);
							item.images = JSON.parse(item.images);
						});
						this.rarulList = rarulList;
					}
				});
			});
		},
		gorural(e) {
			uni.navigateTo({
				url: '/subpages/card/card?source=index&cardId=' + e
			});
		}
	}
};
</script>

<style lang="scss">
page {
	background: #f1f1f1;
}

.page {
	height: 100%;
	width: 100%;
}

input {
	background-color: #00000000 !important;
}
.u-demo-block{
	padding: 48rpx 0;
	background: #f1f1f1;
}
.uni-margin-wrap {
		width: 690rpx;
		width: 100%;
	}
	.swiper {
		height: 100vh;
	}
	.swiper-item {
		display: block;
		text-align: center;
		display: flex;
		flex-direction: column;
		text-align: center;
		// justify-content: center;
		background: #f1f1f1;
	}
	.swiper-list {
		margin-top: 40rpx;
		margin-bottom: 0;
	}
	.uni-common-mt {
		margin-top: 60rpx;
		position: relative;
	}
	.info{
		margin: 30rpx;
		background: #fff;
		padding: 30rpx;
		border-radius: 20rpx;
		text-align: justify;
		font-size: 28rpx;
	}
	.btn{
		width: 30%;
		align-self: center;
	}
</style>
