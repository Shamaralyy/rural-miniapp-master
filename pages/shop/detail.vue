<template>
	<view class="detail_box">
		<u-navbar @leftClick="leftClick()" title="商品详情" :autoBack="true" :placeholder="true" bgColor="#ffffff00"
			leftIconColor="black" :titleStyle="{ color: 'black' }"></u-navbar>
		<Swiper :info="info" style="width: 100%;margin-bottom: 110rpx;" />
		<view class="card">
			<view class="priceBox">
				<view class="price">
					￥{{msg.price}}
				</view>
				<del class="cutprice">￥135</del>
			</view>
			<view class="">
				{{msg.name}}
			</view>
			<view class="mount">
				已售0件
			</view>
		</view>
		<view class="card" @click="choosePopup">
			<text class="select-text">选择</text>
			<text style="font-size: 26rpx;">请选择规格</text>
			<img class="i_select" src="@/static/shop/detail_select.svg" alt="" srcset="">
		</view>
		<Nav />
		<Assess />
		<view class="xq_tt">
			———— 图文详情 ————
		</view>
		<view class="card detail-img">
			<img :src="msg.image" alt="" srcset="">
		</view>
		<Popup ref="popup" />
	</view>
</template>

<script>
	import Swiper from '@/components/shop/Swiper.vue'
	import Popup from '@/components/shop/Popup.vue'
	import Nav from '@/components/shop/Nav.vue'
	import Assess from '@/components/shop/Assess.vue'

	export default {
		components: {
			Swiper,
			Popup,
			Nav,
			Assess
		},
		data() {
			return {
				msg: {},
				info: [{
						url: "https://mp-6ee8886e-bdb9-43fa-a027-9714a1deafe6.cdn.bspapp.com/dry/WPS图片(6).jpg",
					},
					{
						url: "https://mp-6ee8886e-bdb9-43fa-a027-9714a1deafe6.cdn.bspapp.com/dry/WPS图片(5).jpg",
					},
					{
						url: "https://mp-6ee8886e-bdb9-43fa-a027-9714a1deafe6.cdn.bspapp.com/beef/WPS图片(3).jpg",
					}
				],
			}
		},
		onLoad: function(option) {
			console.log('页面启动参数', option);
			this.msg = JSON.parse(option.item);
			console.log('this.msg', this.msg);
		},
		methods: {
			leftClick() {
				uni.navigateBack({
					delta: 1
				});
			},
			/* 选择规格 */
			choosePopup() {
				this.$refs.popup.openPopup();
			},
		}
	}
</script>

<style>
	page {
		background: #f1f1f1;
		height: 100%;
		width: 100%;
	}

	.detail_box {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-bottom: 130rpx;
	}

	.card {
		position: relative;
		width: 670rpx;
		background-color: #fff;
		border-radius: 10rpx;
		padding: 15rpx;
		padding-left: 20rpx;
		line-height: 50rpx;
		margin-top: 20rpx;
	}

	.priceBox {
		display: flex;
	}

	.price {
		font-size: 44rpx;
		color: red;
		font-weight: 600;
	}

	.cutprice {
		text-decoration: line-through;
		color: grey;
		margin: 10rpx 0 0 30rpx;
		font-size: 28rpx;
	}

	.mount {
		color: gray;
		font-size: 26rpx;
	}

	/* 规格 */
	.select-text {
		color: gray;
		font-size: 26rpx;
		margin-right: 24rpx;
	}

	.i_select {
		position: absolute;
		top: 20rpx;
		right: 10rpx;
		width: 40rpx;
		height: 40rpx;
	}

	/* 图文详情 */
	.xq_tt {
		color: gray;
		margin-top: 30rpx;
	}

	.detail-img {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 20rpx;
	}
</style>