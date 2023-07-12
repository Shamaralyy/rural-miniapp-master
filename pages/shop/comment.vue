<template>
	<view class="detail_box">
		<u-navbar @leftClick="leftClick()" title="评论" :autoBack="true" :placeholder="true" bgColor="#ffffff00"
			leftIconColor="black" :titleStyle="{ color: 'black' }"></u-navbar>
		<view class="nav">
			<view v-for="(item,index) in navArr" :key="index" @click="n=(index+1)" :class="{active:n==(index+1)}">
				<text>{{item.text}}</text>
				<text :class="['grey',{'active':n==(index+1)}]">({{item.num}})</text>
			</view>
		</view>
		<view class="card" v-for="(item,index) in comments" :key="index">
			<img class="grey avatar" src="https://mp-6ee8886e-bdb9-43fa-a027-9714a1deafe6.cdn.bspapp.com/test.jpeg" alt="">
			<text class="grey username">{{item.username}}</text>
			<text class="grey date">{{item.date}}</text>
			<view class="content">
				{{item.content}}
			</view>
			<text class="grey">默认</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				n: 1,
				comments: [{
						username: '用**9',
						date: '2023-05-20',
						content: '此用户没有填写评价'
					},
					{
						username: '用**431',
						date: '2023-05-19',
						content: '很好!!给好评!!!'
					},
					{
						username: '用**998',
						date: '2023-05-18',
						content: '此用户没有填写评价'
					}
				],
				navArr: [
					{
						text: '全部',
						num: 3
					},
					{
						text: '图片',
						num: 0
					},
					{
						text: '好评',
						num: 0
					},
					{
						text: '中评',
						num: 0
					},
					{
						text: '差评',
						num: 0
					}
				]
			}
		},
		methods: {
			leftClick() {
				uni.navigateBack({
					delta: 1
				});
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

	.nav {
		display: flex;
		width: 100%;
		justify-content: space-around;
		font-size: 26rpx;
	}
	
	.detail_box {
		display: flex;
		flex-direction: column;
		align-items: center;
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
		right: 50rpx;
		top: 16rpx;
	}

	.content {
		margin-top: 14rpx;
	}
	
	.active {
		color: red;
	}
</style>