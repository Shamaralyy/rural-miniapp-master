<template>
	<view class="">
		<view class="top_bg">
			<!-- <image src="https://cdn.xiangcunmingpian.com/app/static/login_bg_1.jpg" class="top_bg"  mode="widthFix"></image> -->
			<view class="news_info">
				<view class="ruralName">
					<text>{{ rural_info.province }}{{ rural_info.city }}{{ rural_info.county }}</text>
				</view>
				<view class="title">
					<text>关于{{rural_info.name}}</text>
				</view>
				<view class="tag">
					<view class="list" v-for="(item,index) in showLabel" :key="index">
						<text>{{item}}</text>
					</view>
				</view>
			</view>
			<u-swiper :list="bannerimg" :height="pagesHeight*0.5" @click="click"></u-swiper>
		</view>
		<view class="content_news">
			<view class="news_content">
				<u-parse :content="rural_info.details"></u-parse>
			</view>
		</view>
		<u-navbar 
		:showAction="false" 
		:placeholder="true" 
		:title="' '" 
		bgColor="#ffffff00" 
		leftIcon="home" 
		leftIconColor="#fff" 
		:titleStyle="{'color':'#fff'}"
		@leftClick="goCard()"
		>
		
		</u-navbar>
	</view>
</template>

<script>
	const imgBaseUrl = getApp().globalData.imgBaseUrl + '/app' + '/static/';
	import {apiBusinessCardInfo_Get } from '@/API/乡村名片.js';
	export default {
		computed: {
			/* 拿取本乡村数据 */
			rural_info() {
				return this.$store.state.build.currentRural;
			},
		},
		data() {
			return {
				bannerimg: [],
				navList: [
					{ name: imgBaseUrl + 'index_nav_2.png', title: '示范乡村' },
					{ name: imgBaseUrl + 'index_nav_11.png', title: '点亮乡村' },
					{ name: imgBaseUrl + 'index_nav_8.png', title: '共建计划' },
					{ name: imgBaseUrl + 'index_nav_10.png', title: '名片学院' },
				],
				pagesHeight:1000,
				cardId:null,
				showLabel:[]
			};
		},
		onLoad: function(option) {
			var that = this
			this.cardId = option.cardId
			this.getruralinfo()
			// 获取导航栏高度
			let menu = wx.getMenuButtonBoundingClientRect();
			this.menuwidth = menu.width + menu.width / 7;
		},
		methods:{
			goCard(){
				uni.redirectTo({
					url:'../card?cardId='+this.rural_info.cardId
				})
			},
			// 获取当前乡村数据
			getruralinfo(){
				let apiBusinessCardInfocardId_Param = {
				    cardId: this.rural_info.cardId,   /**     string required:true */
				}
				apiBusinessCardInfo_Get(apiBusinessCardInfocardId_Param)            
				.then(res=>{
					console.log(res.data.data)
					this.rural_title = '关于'+res.data.data.name
					if(res.data.data.showLabel != null){
						var showLabel= res.data.data.showLabel
						this.showLabel = showLabel.split(',');
					}
					try {
						let imgJSON = JSON.parse(res.data.data.images);
						this.bannerimg = imgJSON.map(value => value.imgUrl);
					} catch (e) {
						this.bannerimg = [];
					}
				});
			},
			clickmenu(e){
				if(e.url.lenght!=0){
					uni.navigateTo({
						url:e.url
					})
				}
			},
			navhome(){
				uni.switchTab({
					url:'/pages/build/buildad'
				})
			},
			navleft(){
				uni.navigateTo({
					url:'../myrural/rural_list'
				})
			},
			navright(){
				uni.navigateTo({
					url:'../card/card?cardid='+this.rural_info.cardId
				})
			}
		}
	}
</script>

<style lang="scss">
	.top_bg {
		width: 100%;
		position: relative;
		// top: 0;
		z-index: -1;
		.box {
			position: absolute;
			background: linear-gradient(#0000ff00 80%, #312b2b 100%);
			z-index: 1;
			bottom: 0;
			width: 100%;
		}
		.news_info{
			position: absolute;
			bottom: 80rpx;
			z-index: 2;
			color:#fff;
			left: 30rpx;
			.ruralName{
				margin-bottom: 20rpx;
				text{
					padding: 8rpx 15rpx;
					background: #fff;
					color:#333;
					border-radius: 50rpx;
				}
			}
			.title{
				font-size: 48rpx;
				font-family: 'SourceHanSerifCN-Bold';
				margin-bottom: 10rpx;
			}
			.tag{
				display: flex;
				flex-wrap: wrap;
				.list{
					margin-right: 20rpx;
					margin-top: 20rpx;
					text{
						padding: 8rpx 16rpx;
						background: #ffffff5e;
						border-radius: 40rpx;
						font-size: 26rpx;
						color: #fff;
					}
				}
			}
		}
	}
	.content_news{
		border-radius: 30rpx 30rpx 0 0;
		background: #fff;
		z-index: 1000;
		margin-top: -40rpx;
		padding: 30rpx;
		font-size: 28rpx;
	}
</style>