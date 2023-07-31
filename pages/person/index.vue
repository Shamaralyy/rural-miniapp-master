<template>
	<view>
		<u-navbar @leftClick="leftClick()" title="首页" :autoBack="true" :placeholder="true" bgColor="#ffffff00"
			leftIconColor="black" :titleStyle="{ color: 'black' }"></u-navbar>
		<Home @changeCurrentTab="changeCurrentTab" v-if="currentTab == 0" />
<!-- 		<Staff v-if="currentTab == 1" />
		<Order v-if="currentTab == 2" /> -->
		<!-- <Footer @getTab="getTab" /> -->
	</view>
</template>

<script>
	import Home from '@/components/person/Home.vue'
/* 	import Staff from '@/components/person/Staff.vue'
	import Order from '@/components/person/Order.vue' */
	import Footer from '@/components/person/Footer.vue'

	export default {
		components: {
			Home,
/* 			Staff,
			Order, */
			Footer
		},
		data() {
			return {
				currentTab: 0,
			}
		},
		methods: {
			leftClick() {
				uni.navigateBack({
					delta: 1
				});
			},
			getTab(val) {
				console.log("点击的tab" + val);
				this.currentTab = val;
			},
/* 			changeCurrentTab(index) {
				console.log('111',index)
				this.currentTab = index;
			} */
		}
	}
</script>

<style>
	page {
		background: #f1f1f1;
		height: 100%;
		width: 100%;
		font-size: 29rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.card {
		position: relative;
		width: 700rpx;
		background-color: #fff;
		border-radius: 10rpx;
		padding: 15rpx;
		padding-left: 20rpx;
		line-height: 50rpx;
		margin-top: 20rpx;
	}

	.icon {
		width: 40rpx;
		height: 40rpx;
		vertical-align: middle;
	}

	.i_locate {
		margin-left: 8rpx;
		margin-top: -10rpx;
	}

	.i_service {
		margin-left: 8rpx;
	}

	.top {
		height: 80rpx;
		line-height: 80rpx;
		background-color: #fff;
		color: gray;
	}

	.nav {
		display: flex;
		justify-content: space-around;
		margin: 40rpx 0 70rpx 0;
	}

	.nav-item {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100rpx;
		height: 100rpx;
		border-radius: 26rpx;
		background-color: #fff;
	}

	.nav-item text {
		white-space: nowrap;
		position: absolute;
		top: 100rpx;
	}

	.list-title {
		width: 730rpx;
		height: 70rpx;
		background-color: #fff;
		border-radius: 40rpx;
		margin-bottom: 24rpx;
	}

	.list-title .green {
		display: inline-block;
		width: 220rpx;
		height: 70rpx;
		line-height: 70rpx;
		text-align: center;
		color: #fff;
		background-color: rgb(22, 192, 107);
		border-radius: 40px 0 0 40px;
		clip-path: polygon(0% 0%, 100% 0, 90% 100%, 100% 100%, 0% 100%);
		/* 特殊形状*/
	}

	.list-title .detail {
		margin-left: 12rpx;
		color: gray;
		font-size: 24rpx;
	}
</style>