<template>
	<view>
		<view class="top">
			<Region />
			<text style="margin-left: 622rpx;">客服</text>
			<img class="icon i_service" src="@/static/person/service.svg" alt="" srcset="">
		</view>
		<Swiper :info="bannerInfo"/>
		<view class="flex-container">
			<view class="card" style="margin-top: 120rpx;">
				最新公告
			</view>
			<view class="nav">
				<view class="nav-item" v-for="item,index in navList" :key="index" @tap="changeCurrent(index)">
					<u-icon :name="item.imgSrc" color="rgb(8, 72, 40)" size="28"></u-icon>
					<text>{{item.title}}</text>
				</view>
			</view>
			<!-- 			<view class="list-title">
				<view class="green">
					热门项目
				</view>
				<text class="detail">
					品质保证
				</text>
			</view>
			<view class="project-list">
				<view class="project-item" v-for="item,index in projects" :key="index">
					<img class="pro-img" :src="item.imgSrc" alt="" />
					<view class="msg">
						<view class="title">
							{{item.title}}
						</view>
						<view class="detail">
							{{item.detail}}
						</view>
						<button style="margin-left: 210rpx;">立即预约</button>
					</view>
				</view>
			</view> -->
			<GreenNav :green="'推荐人员'" :detail="'专业人员'"/>
			<PersonList />
		</view>
	</view>
</template>

<script>
	import Swiper from '@/components/shop/Swiper.vue'
	import Footer from '@/components/person/Footer.vue'
	import Region from '@/components/person/Region.vue'
	import PersonList from '@/components/person/PersonList.vue'
	import GreenNav from '@/components/person/GreenNav.vue'
	import navSrc from '@/static/person/locate.svg'

	export default {
		components: {
			Swiper,
			Region,
			PersonList,
			Footer,
			GreenNav
		},
		data() {
			return {
				bannerInfo: [{
						url: "https://mp-6ee8886e-bdb9-43fa-a027-9714a1deafe6.cdn.bspapp.com/rural/r1.webp",
					},
					{
						url: "https://mp-6ee8886e-bdb9-43fa-a027-9714a1deafe6.cdn.bspapp.com/rural/r2.webp",
					},
					{
						url: "https://mp-6ee8886e-bdb9-43fa-a027-9714a1deafe6.cdn.bspapp.com/rural/r3.webp",
					}
				],
				navList: [{
						imgSrc: 'home',
						title: '首页'
					},
					{
						imgSrc: 'server-man',
						title: '土著人入驻'
					},
					{
						imgSrc: 'rmb-circle',
						title: '我的订单'
					},
					{
						imgSrc: 'phone',
						title: '在线客服'
					}
				],
				projects: [{
						imgSrc: 'https://mp-6ee8886e-bdb9-43fa-a027-9714a1deafe6.cdn.bspapp.com/test.jpeg',
						title: '温馨399项目',
						detail: '精致体验，舒心感受'
					},
					{
						imgSrc: 'https://mp-6ee8886e-bdb9-43fa-a027-9714a1deafe6.cdn.bspapp.com/test.jpeg',
						title: '温馨399项目',
						detail: '精致体验，舒心感受'
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
			chooseRegion() {
				this.$refs.popup.openPopup();
			},
			getRegion(val) {
				this.region = val;
			},
			changeCurrent(index) {
				console.log(index)
				if(index == 0) {
					uni.navigateTo({
						url: '/pages/person/index'
					})
				}else if(index == 1) {
					uni.navigateTo({
						url: '/pages/person/staff'
					})
				}else if(index == 2) {
					uni.navigateTo({
						url: '/pages/person/myOrder'
					})
				}
/* 				this.$emit('changeCurrentTab',index); */
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
	}

	.flex-container {
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
		width: 750rpx;
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

	.nav-item-img {
		width: 50rpx;
		height: 50rpx;
	}

	.nav-item text {
		white-space: nowrap;
		position: absolute;
		top: 100rpx;
		margin-top: 10rpx;
		font-size: 24rpx;
	}

	.project-item {
		width: 680rpx;
	}

	.project-item img {
		width: 280rpx;
		height: 180rpx;
		border-radius: 24rpx;
		margin-right: 20rpx;
	}

	.pro-img {
		width: 600rpx !important;
	}

	.project-item .msg .title {
		font-size: 35rpx;
		font-weight: 600;
	}

	.project-item .msg .detail {
		font-size: 24rpx;
		color: grey;
	}
</style>