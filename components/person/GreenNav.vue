<template>
	<view class="list-title">
		<view class="green">
			{{green}}
		</view>
		<text class="detail">
			{{detail}}
		</text>
	</view>
</template>

<script>
	export default {
		props: ['green', 'detail'],
		data() {
			return {}
		}
	}
</script>

<style>
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
		/* 特殊形状*/
		clip-path: polygon(0% 0%, 100% 0, 90% 100%, 100% 100%, 0% 100%);
	}

	.list-title .detail {
		margin-left: 12rpx;
		color: gray;
		font-size: 24rpx;
	}
</style>