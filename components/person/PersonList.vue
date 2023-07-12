<template>
	<view class="project-list">
		<view class="project-item" v-for="item,index in projects" :key="index" @tap="reserve">
			<img :src="item.imgSrc" alt="" />
			<view class="msg">
				<view class="score">
					{{item.score}}分
				</view>
				<view class="title">
					{{item.title}}
				</view>
				<view class="feature age">
					{{item.age}}岁
				</view>
				<view class="feature gender">
					{{item.gender}}
				</view>
				<view class="detail">
					{{item.detail}}
				</view>
				<view class="words">
					"{{item.words}}"
				</view>
				<view class="detail">
					累计服务{{item.orderNum}}单
				</view>
				<button class="reserve-btn">立即预约</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				projects: [{
						imgSrc: 'https://mp-6ee8886e-bdb9-43fa-a027-9714a1deafe6.cdn.bspapp.com/person.webp',
						title: '邓小东',
						age: 41,
						gender: '男',
						words: '第一次来XXXXXXXX的地方',
						detail: '服务区域：重庆市石柱县',
						score: 4.8,
						orderNum: 113,
					},
					{
						imgSrc: 'https://mp-6ee8886e-bdb9-43fa-a027-9714a1deafe6.cdn.bspapp.com/person2.webp',
						title: '赵小南',
						age: 39,
						gender: '女',
						words: '第一次来XXXXXXXX的地方',
						detail: '服务区域：重庆市石柱县',
						score: 4.5,
						orderNum: 90,
					}
				]
			}
		},
		methods: {
			reserve() {
				uni.navigateTo({
					url: '/subpages/person/detail'
				})
			}
		}
	}
</script>

<style>
	.project-list {
		width: 750rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.project-item {
		position: relative;
		width: 680rpx;
		line-height: 45rpx;
		padding: 20rpx;
		background-color: #fff;
		display: flex;
		border-radius: 30rpx;
		margin-bottom: 20rpx;
	}

	.project-item img {
		width: 240rpx;
		height: 260rpx;
		margin-right: 20rpx;
	}

	.project-item .msg {
		font-size: 24rpx;
	}

	.project-item .msg .title {
		font-size: 35rpx;
		font-weight: 600;
	}

	.project-item .msg .detail {
		color: grey;
	}

	.score {
		position: absolute;
		top: 0;
		right: 0;
		width: 156rpx;
		height: 50rpx;
		line-height: 50rpx;
		background-color: rgb(78, 157, 75);
		color: white;
		text-align: center;
		border-radius: 0 0 20rpx 20rpx;
		font-size: 30rpx;
	}

	.feature {
		display: inline-block;
		height: 20rpx;
		line-height: 20rpx;
		color: white;
		text-align: center;
		padding: 8rpx;
		border-radius: 10rpx;
		font-size: 20rpx;
	}

	.age {
		background-color: rgb(221, 129, 66);
		margin-right: 16rpx;
		padding: 8rpx 20rpx 8rpx 20rpx;
	}

	.gender {
		background-color: rgb(98, 146, 207);
	}

	.words {
		display: inline-block;
		background-color: rgb(251, 226, 194);
		color: rgb(221, 129, 66);
		text-align: center;
		padding: 0 10rpx 0 10rpx;
	}

	.reserve-btn {
		width: 190rpx;
		height: 50rpx;
		line-height: 50rpx;
		border: 1px solid rgb(106, 196, 160);
		border-radius: 30rpx;
		color: rgb(106, 196, 160);
		text-align: center;
		font-size: 28rpx;
		margin: 0rpx 0 0 244rpx;
	}
</style>