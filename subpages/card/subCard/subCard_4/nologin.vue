<!-- user 未登录 -->
<template>
	<view :style="[subData.user_login]">
		<view class="hello_content">
			<view class="title">
				<text>{{ subData.hellotitle }}</text>
			</view>
			<view class="desc">
				<text>{{ subData.hellodesc }}</text>
			</view>
			<view class="button" @click="$emit('login')">
				<u-icon name="weixin-fill" size="22" color="#07c160"></u-icon>
				<text>微信一键登录</text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'nologin',
	props: ['subData']
};
</script>

<style scoped lang="scss">
.hello_content {
	display: flex;
	justify-content: center;
	z-index: 2;
	margin-top: 40%;
	flex-direction: column;
	// width: 85%;
	.title {
		font-size: 44rpx;
		color: #222;
		text-align: center;
		margin-bottom: 20rpx;
	}
	.desc {
		font-size: 30rpx;
		color: #222;
		text-align: center;
		margin-bottom: 100rpx;
	}
	.button {
		width: 60%;
		height: 73rpx;
		line-height: 73rpx;
		background: #fff;
		border-radius: 50rpx;
		opacity: 0.9;
		font-size: 30rpx;
		text-align: center;
		margin-bottom: 30rpx;
		display: flex;
		justify-content: center;
		align-self: center;
	}
}
</style>
