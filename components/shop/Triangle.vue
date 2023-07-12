<template>
	<view class="triangle-box">
		<view class="triangle-up" :class="{'up-active':(isActive &&(!order))}"></view>
		<view class="triangle-down" :class="{'down-active':(isActive &&(order))}"></view>
	</view>
</template>

<script>
	export default {
		props: {
			isActive: Boolean,
			order: Number
		}
	}
</script>

<style>
	.triangle-box {
		z-index: 2;
	}
	
	.triangle-up,
	.triangle-down {
		width: 0;
		height: 0;
		border-left: 8rpx solid transparent;
		border-right: 8rpx solid transparent;
	}

	.triangle-up {
		border-bottom:10rpx solid darkgray;  /* 值减小，三角形高度变矮*/
		margin-bottom: 7rpx;
	}

	.triangle-down {
		border-top: 10rpx solid darkgray;
	}
	
	.up-active {
		border-bottom:10rpx solid red;
	}
	
	.down-active {
		border-top:10rpx solid red;
	}
</style>