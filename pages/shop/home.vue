<template>
	<view>
		<view class="container">
			<view class="logo-area">
				<img class="i_logo" src="@/static/shop/logo.svg" alt="">
				<text>旧林游</text>
			</view>
			<view class="flex-msg">
				<view class="item">
					<u-icon name="file-text-fill" color="#fff" size="20"></u-icon>
					<text>农货批发</text>
				</view>
				<view class="item">
					<u-icon name="map-fill" color="#fff" size="20"></u-icon>
					<text>产地货源</text>
				</view>
				<view class="item">
					<u-icon name="rmb-circle-fill" color="#fff" size="20"></u-icon>
					<text>买家保障</text>
				</view>
			</view>
			<u-input v-model="value" :custom-style="inputStyle" placeholder="请输入你想要的商品名称" :type="type" :border="false" />
			<view class="card grid-area">
				<u-grid :col="5">
					<u-grid-item v-for="item,index in grids" :key="index">
						<img class="grid-img" :src="item.icon" alt="" srcset="">
						<view class="grid-text">{{item.text}}</view>
					</u-grid-item>
				</u-grid>
			</view>
			<img class="advertisement"
				src="https://mp-6ee8886e-bdb9-43fa-a027-9714a1deafe6.cdn.bspapp.com/advertisement (2).png" alt=""
				srcset="" />
			<view class="card">
				<u-tabs :list="screenList" lineWidth="24" lineHeight="4" lineColor="#04c354" @change="tabChange"
					:activeStyle="{
						color: '#303133',
						fontWeight: 'bold',
						transform: 'scale(1.05)'
					}" :inactiveStyle="{
						color: '#606266',
						transform: 'scale(1)'
					}" itemStyle="padding-left: 15px; padding-right: 15px; height: 34px;" :current="current"></u-tabs>
				<Sort />
			</view>
		</view>
		<view class="grey-box">
			<view class="title">
				<img class="i_dz" src="@/static/shop/dianzan.svg" alt="">
				为您推荐
			</view>
			<Goods />
		</view>
	</view>
	<!-- 		<u-navbar title=" " :placeholder="true" :bgColor="naviStyle.bg" leftIconColor="#ffffff00"
			:titleStyle="{ color: naviStyle.colo,backdropFilter:'blur(2px) saturate(240%)'}">
			<view class="u-nav-slot_left" slot="left">
				<view class="name"><text>好礼商城</text></view>
				<view class="desc"><text>来一场别样的乡村探寻之旅</text></view>
			</view>
		</u-navbar>
		<view class="search">
			<u-input class="ipt" placeholder="搜索商品" border="surround" :customStyle="{backGround:'#ffffff'}"
				prefixIcon="search"></u-input>
		</view>
		<Swiper style="margin-bottom: 104rpx;" />
		

		<view class="title">
			———— 高端精品 耗牛肉制品 ————
		</view>
		<Goods /> -->
</template>

<script>
	/* 	import Swiper from '@/components/shop/Swiper.vue'*/
	import Sort from '@/components/shop/Sort.vue'
	import Goods from '@/components/shop/Goods.vue'

	export default {
		components: {
			Sort,
			Goods
		},
		data() {
			return {
				inputStyle: {
					backgroundColor: '#fff',
					borderRadius: '34rpx',
				},
				grids: [{
						icon: 'https://mp-6ee8886e-bdb9-43fa-a027-9714a1deafe6.cdn.bspapp.com/shopHomeGrid/带看新房.svg',
						text: '供应大厅'
					},
					{
						icon: 'https://mp-6ee8886e-bdb9-43fa-a027-9714a1deafe6.cdn.bspapp.com/shopHomeGrid/二手房.svg',
						text: '采购大厅'
					},
					{
						icon: 'https://mp-6ee8886e-bdb9-43fa-a027-9714a1deafe6.cdn.bspapp.com/shopHomeGrid/车库.svg',
						text: '看行情'
					},
					{
						icon: 'https://mp-6ee8886e-bdb9-43fa-a027-9714a1deafe6.cdn.bspapp.com/shopHomeGrid/医院.svg',
						text: '招商代理'
					},
					{
						icon: 'https://mp-6ee8886e-bdb9-43fa-a027-9714a1deafe6.cdn.bspapp.com/shopHomeGrid/带看新房.svg',
						text: '惠农大数据'
					},
					{
						icon: 'https://mp-6ee8886e-bdb9-43fa-a027-9714a1deafe6.cdn.bspapp.com/shopHomeGrid/房屋拍卖.svg',
						text: '农批通'
					},
					{
						icon: 'https://mp-6ee8886e-bdb9-43fa-a027-9714a1deafe6.cdn.bspapp.com/shopHomeGrid/二手房.svg',
						text: '农惠严选'
					},
					{
						icon: 'https://mp-6ee8886e-bdb9-43fa-a027-9714a1deafe6.cdn.bspapp.com/shopHomeGrid/二手房.svg',
						text: '采购榜'
					},
					{
						icon: 'https://mp-6ee8886e-bdb9-43fa-a027-9714a1deafe6.cdn.bspapp.com/shopHomeGrid/带看新房.svg',
						text: '一键代发'
					},
					{
						icon: 'https://mp-6ee8886e-bdb9-43fa-a027-9714a1deafe6.cdn.bspapp.com/shopHomeGrid/购房资讯.svg',
						text: '农技学堂'
					},
				],
				current: 0,
				screenList: [{
						name: '推荐食品'
					},
					{
						name: '农产品'
					},
					{
						name: '农用物资'
					},
					{
						name: '农业服务'
					},
				],
			}
		},
		/* 		
				computed: {
					naviStyle() {
						return this.isTop ? {
							bg: '#00000000',
							colo: '#fff'
						} : {
							bg: '#ffffff90',
							colo: '#fff'
						};
					}
				} */
	}
</script>

<style lang="scss">
	page {
		background: linear-gradient(to bottom, rgb(123, 12, 203) 20%, rgb(255, 172, 236), #f1f1f1 65%);
		background-repeat: no-repeat;
	}

	.container {
		width: 700rpx;
		margin-top: 60rpx;
		margin-left: auto;
		margin-right: auto;
	}

	.logo-area {
		display: flex;
	}
	
	.i_logo {
		width: 80rpx;
		height: 80rpx;
		margin-right: 10rpx;
		vertical-align: middle;
	}

	.logo-area text {
		font-size: 44rpx;
		font-weight: 600;
		color: #fff;
		margin-top: 15rpx;
	}

	.flex-msg {
		display: flex;
		justify-content: space-between;
		color: #fff;
		font-size: 28rpx;
		margin-top: 30rpx;
		margin-bottom: 30rpx;
	}

	.flex-msg .item {
		display: flex;
	}
	
	.flex-msg .item u-icon {
		vertical-align: middle;
	}

	.card {
		display: flex;
		flex-direction: column;
		align-content: center;
		background-color: #fff;
		font-size: 25rpx;
		border-radius: 30rpx;
		margin-top: 24rpx;
		margin-bottom: 24rpx;
	}

	.grid-area {
		font-size: 27rpx;
		padding: 14rpx;
	}

	.grid-img {
		width: 110rpx;
		height: 110rpx;
		border-radius: 50%;
	}

	.advertisement {
		width: 700rpx;
		height: 250rpx;
	}
	
	.grey-box {
		margin-top: -30rpx;
		padding-top: 20rpx;
		background-color: #f1f1f1;
	}

	.title {
		text-align: center;
		height: 80rpx;
		line-height: 80rpx;
		font-size: 40rpx;
		font-weight: 600;
	}
	
	.i_dz {
		width: 60rpx;
		height: 60rpx;
		vertical-align: middle;
	}

	/* 	.u-nav-slot_left {
		display: flex;
		align-items: baseline;

		text {
			color: #000000;
		}

		.name {
			font-size: 38rpx;
			font-family: 'SourceHanSerifCN-Bold';
		}

		.desc {
			font-size: 28rpx;
			font-weight: 400;
			margin-left: 10rpx;
			font-family: 'SourceHanSerifCN-Medium';
		}
	}

	.title {
		text-align: center;
		height: 80rpx;
		line-height: 80rpx;
	}
	
	.search {
		background-color: #fff;
	}
	
	.ipt {
		width: 700rpx;
		height: 80rpx;
		border-radius: 30rpx;
	} */
</style>