<template>
	<view class="person-detail-container" ref="box">
		<u-navbar @leftClick="leftClick()" title="详情" :autoBack="true" :placeholder="true" :bgColor="naviStyle.bg"
			leftIconColor="black" :titleStyle="{ color: 'black' }"></u-navbar>
		<img class="person-img" :src="personMsg.imgSrc" mode="aspectFill"/>
		<view class="project-item">
			<img :src="personMsg.imgSrc" mode="aspectFill" alt="" />
			<view class="msg">
				<view class="score">
					{{personMsg.score}}分
				</view>
				<view class="title">
					{{personMsg.title}}
				</view>
				<view class="feature age">
					{{personMsg.age}}岁
				</view>
				<view class="feature gender">
					{{personMsg.gender}}
				</view>
				<view class="detail">
					{{personMsg.detail}}
				</view>
				<view class="words">
					"{{personMsg.words}}"
				</view>
				<view class="detail">
					累计服务{{personMsg.orderNum}}单
				</view>
			</view>
		</view>
		<GreenNav :green="'顾客评论'" :detail="'以下每条评论都是真实顾客点评'" />
		<view class="card">
			<view class="light-green">
				<view class="person-comment-item" v-for="item,index in comments" :key="index">
					<u-avatar :src="item.avatar" size="45"></u-avatar>
					<view class="person-comment-msg">
						<text class="person-comment-username">{{item.username}}</text>
						<text class="person-comment-grey">{{item.datetime}}</text>
						<text class="person-comment-grey">{{item.content}}</text>
					</view>
				</view>
			</view>
		</view>
		<button class="person-order-btn" @tap="toOrder">立即下单</button>
	</view>
</template>

<script>
	import GreenNav from '@/components/person/GreenNav.vue'

	export default {
		props: ['msg'],
		components: {
			GreenNav
		},
		data() {
			return {
				personMsg: {},
				kissFlag: false, //接触状态
				kissPercent: 1, //接触百分比
				kissInit: -1, //接触初始高度
				comments: []
			}
		},
		computed: {
			naviStyle() {
				const percent = this.kissFlag ? (1 - this.kissPercent).toFixed(1) : 0;
				return {
					bg: 'rgba(255, 255, 255,' + percent + ')',
					color: 'rgba(255, 255, 255,' + percent + ')'
				};
			}
		},
		mounted() {
			/* this.$refs.box.addEventListener('scroll', this.handleScroll); // 监听滚动事件 */
			this.personMsg = JSON.parse(this.msg);
			let randomNumber = Math.floor(Math.random() * 21);
			let data = require('@/static/person/data/comment.json');
			let randomArr = this.getRandomArr(2,5,20);
			console.log('randomArr',randomArr);
			for(let i = 0;i<randomArr.length;i++) {
				let idx = randomArr[i];
				console.log(data.reviews[idx])
				this.comments.push(data.reviews[idx]);
			}
		},
		methods: {
			handleScroll() {
				this.scrollY = window.scrollY; // 更新滚动距离
				console.log('this.scrollY', this.scrollY);
			},
			toOrder() {
				uni.navigateTo({
					url: '/pages/person/order'
				})
			},
			leftClick() {
				uni.navigateBack({
					delta: 1
				});
			},
			 // 生成min-max之间的随机整数(0-num)作为数量
			getRandomArr(min,max,num) {
				let numbers = [];
				let count = Math.floor(Math.random() * (max-min+1)) + min;
				while (numbers.length < count) {
				  var randomNumber = Math.floor(Math.random() * (num+1));
				  if (!numbers.includes(randomNumber)) {
				    numbers.push(randomNumber);
				  }
				}
				return numbers;
			}
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

	.person-detail-container {
		padding-bottom: 100rpx;
	}

	.person-img {
		width: 100%;
		height: 550rpx;
		margin-bottom: 20rpx;
	}

	.project-item {
		position: relative;
		width: 680rpx;
		line-height: 55rpx;
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

	.card {
		position: relative;
		width: 700rpx;
		background-color: #fff;
		border-radius: 10rpx;
		padding: 15rpx;
		padding-left: 20rpx;
		line-height: 50rpx;
		margin-top: 20rpx;
		padding: 18rpx;
	}

	.light-green {
		background-color: rgb(232, 249, 239);
		padding: 20rpx 0 0 20rpx;
	}

	.person-comment-item {
		display: flex;
		margin-bottom: 20rpx;
	}

	.person-comment-msg {
		display: flex;
		flex-direction: column;
		line-height: 43rpx;
		margin-left: 20rpx;
	}

	.person-comment-username {
		font-size: 34rpx;
		font-weight: 600;
	}

	.person-comment-grey {
		font-size: 22rpx;
		color: grey;
	}

	.person-order-btn {
		position: fixed;
		left: 50%;
		transform: translateX(-50%);
		bottom: 10rpx;
		width: 700rpx;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		color: #fff;
		background-color: rgb(19, 193, 104);
		border: 0px;
		border-radius: 40rpx;
		font-size: 31rpx;
	}
</style>