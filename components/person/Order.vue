<template>
	<view class="order-container">
		<u-tabs :list="screenList" lineWidth="20" lineHeight="4" lineColor="#04c354" @change="tabChange" :activeStyle="{
				color: '#303133',
				fontWeight: 'bold',
				transform: 'scale(1.05)'
			}" :inactiveStyle="{
				color: '#606266',
				transform: 'scale(1)'
			}" itemStyle="padding-left: 15px; padding-right: 15px; height: 34px;" :current="current"></u-tabs>
		<view>
			<view class="order-item" v-for="item,index in orderlist" :key="index">
				<img class="pro-img" :src="item.imgSrc" alt="" />
				<view class="msg">
					<view class="title">
						{{item.title}}
					</view>
					<view class="detail">
						{{item.detail}}
					</view>
					<button @tap="cancel">取消订单</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				current: 0,
				screenList: [{
						name: '进行中'
					},
					{
						name: '已完成'
					},
					{
						name: '已取消'
					},
				],
				orderlist: [{
						imgSrc: 'https://mp-6ee8886e-bdb9-43fa-a027-9714a1deafe6.cdn.bspapp.com/rural/r1.webp',
						title: '温馨399项目',
						detail: '数量 ：1      70分钟'
					},
					{
						imgSrc: 'https://mp-6ee8886e-bdb9-43fa-a027-9714a1deafe6.cdn.bspapp.com/rural/r2.webp',
						title: '体验299项目',
						detail: '数量 ：1      90分钟'
					},
					{
						imgSrc: 'https://mp-6ee8886e-bdb9-43fa-a027-9714a1deafe6.cdn.bspapp.com/rural/r3.webp',
						title: '豪华1099项目',
						detail: '数量 ：1      180分钟'
					},
				]
			}
		},
		methods: {
			tabChange(para) {
				console.log('para', para)
				if (this.current == para.index) return;
				this.current = para.index;
			},
			cancel() {
				uni.showToast({ icon: 'none', title: '暂不支持该功能' });
			}
		}
	}
</script>

<style>
	.order-container {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.order-item {
		display: flex;
		justify-content: space-around;
		width: 680rpx;
		background-color: #fff;
		padding: 20rpx;
		border-radius: 12rpx;
		margin-top: 22rpx;
	}
	
	.order-item img {
		height: 180rpx;
		border-radius: 24rpx;
		margin-right: 20rpx;
	}
	
	.order-item .msg .title {
		font-size: 35rpx;
		font-weight: 600;
	}
	
	.order-item .msg .detail {
		font-size: 24rpx;
		color: grey;
	}

	.order-item button {
		width: 190rpx;
		height: 50rpx;
		line-height: 50rpx;
		border: 1px solid rgb(106, 196, 160);
		border-radius: 30rpx;
		color: rgb(106, 196, 160);
		text-align: center;
		font-size: 28rpx;
		margin: 50rpx 0 0 210rpx;
	}
</style>