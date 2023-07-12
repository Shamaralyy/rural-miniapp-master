<template>
	<view class="card" @click="toComment">
		<text class="title">
			评价
		</text>
		<text class="mount">
			{{commentsNum>0? '（'+commentsNum+'）' : '（暂无评价）'}}
		</text><br>
		<view class="display" v-if="commentsNum>0">
			<img class="grey avatar" src="https://mp-6ee8886e-bdb9-43fa-a027-9714a1deafe6.cdn.bspapp.com/test.jpeg" alt="">
			<text class="grey username">用户**9</text>
			<text class="grey date">2023-5-20</text>
			<view class="content">
				此用户没有填写评价
			</view>
			<text class="grey">默认</text>
		</view>
		<img class="i_select" src="@/static/shop/detail_select.svg" alt="" srcset="">
	</view>
</template>

<script>
	export default {
		data() {
			return {
				commentsNum: 3
			}
		},
		methods: {
			toComment() {
				console.log('comment');
				uni.navigateTo({
					url: '/pages/shop/comment'
				})
			}
		}
	}
</script>

<style>
	.title {
		font-weight: 600;
	}

	.mount {
		color: gray;
	}

	.i_select {
		position: absolute;
		top: 20rpx;
		right: 10rpx;
		width: 40rpx;
		height: 40rpx;
	}
	
	/* 评论 */
	.display {
		margin-top: 20rpx;
	}
	
	.grey {
		color: gray;
		font-size: 26rpx;
	}
	
	.avatar {
		width: 60rpx;
		height: 60rpx;
		border-radius: 50%;
		vertical-align: middle;
		margin-right: 26rpx;
	}
	
	.date {
		position: absolute;
		right: 20rpx;
		top: 20rpx;
	}
	
	.content {
		margin-top: 14rpx;
	}
</style>