<template>
	<view class="page">
		<view class="top_bg">
			<image :src="imgBaseUrl + '/xs/rural_list_1.jpg'" class="top_bg"  mode="center"></image>
			<!-- <view class="box"></view> -->
		</view>
		<u-navbar :showAction="false" :placeholder="true" :title="'关于'+rural_name" bgColor="#ffffff00" leftIconColor="#fff" :titleStyle="{'color':'#fff'}">
			<view class="u-nav-slot_left" slot="left" @click="navhome()">
				<view class="" v-if="rural_list.length!=0" >
					<u-icon name="home" size="20" color="#fff"></u-icon>
				</view>
				<!-- <view class="name" v-if="rural_list.length!=0">
					<text>{{rural_name}}</text>
				</view> -->
			</view>
		</u-navbar>
		<view class="content_rural">
			<view class="rural_img">
				<image :src="imgBaseUrl + '/xs/rural_list_1.jpg'" mode="center"></image>
				<view class="num">
					<text>101张</text>
				</view>
				<view class="">
					<!-- <image src="" mode=""></image> -->
				</view>
			</view>
			<view class="rural_info">
				<view class="title">
					<text>{{rural_name}}</text>
				</view>
				<view class="tag">
					<text>广东美丽乡村</text>
					<text>振兴示范村</text>
					<text>马铃薯之乡</text>
				</view>
				<view class="desc">
					
				</view>
			</view>
		</view>
		<view class="content_rural">
			<view class="">
				<view class="">
					
				</view>
				<view class="">
					
				</view>
				<view class="">
					
				</view>
			</view>
			<view class="">
				<view class="">
					
				</view>
				<view class="">
					
				</view>
				<view class="">
					
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		apiBusinessCardPage_Post,
		apiBusinessCardMyRural_Get
	} from '@/API/乡村名片.js'
	const imgBaseUrl = getApp().globalData.imgBaseUrl + '/app';
	export default {
		data() {
			return {
				imgBaseUrl:imgBaseUrl,
				cardid:'',
				rural_title:' ',
				welcome_text:'欢迎您参与乡村共建，请点击左上角“加入乡村”,加入后才可以参与共建哦~',
				bannerimg: [
					// 'https://cdn.xiangcunmingpian.com/app/static/index_banner_2.jpg',
					'/static/wayback-imagery-animation.gif',
				],
				menuwidth:0,
				show:false,
				bartext:[
					'刚刚 颂超提交了名片海报图片修改建议',
					'昨天 颂超提交了名片海报图片修改建议'
				],
				rural_name:'',
				rural_info:[],
				
				
			}
		},
		onLoad: function(option) {
			// 获取导航栏高度
			var that = this
			this.cardid = option.cardid
			this.getruralinfo()
			uni.getSystemInfo({
				success: function(res){
					let menu = wx.getMenuButtonBoundingClientRect();
					that.menuwidth = menu.width+menu.width/7
					console.log(that.menuwidth)
				}
			})
		},
		methods:{
			//获取当前乡村数据
			getruralinfo(){
				uni.showLoading({
				  icon: 'none',
				  title: "初始化布局中"
				})
				let apiBusinessCardInfocardId_Param = {
				    cardId: this.cardid,   /**     string required:true */
				}
				apiBusinessCardMyRural_Get(apiBusinessCardInfocardId_Param)            
				.then(res=>{
					console.log(res.data.data)
					uni.hideLoading();
					this.rural_info = res.data.data
					this.rural_name = res.data.data.name
					// this.rural_title = '关于'+res.data.data.name
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
					url:'../card/card?cardid='+this.cardid
				})
			}
		}
	}
</script>

<style lang="scss">
	page{
		background:#fff;
		height: 100%;
		width: 100%;
	}

	.page{
		height: 100%;
		width: 100%;
		position: relative;
	}

	input{
		background-color: #00000000!important;
	}

	.u-nav-slot_left{
		display: flex;
		background: #0006;
		padding: 10rpx 20rpx;
		border-radius: 30rpx;
		color: #fff;
		.name{
			font-size: 28rpx;
			font-family: 'SourceHanSerifCN-Bold';
			margin-left: 10rpx;
		}
		.title{
			font-size: 26rpx;
			font-weight: 400;
		}
	}

	.u-nav-slot_right{
		display: flex;
		background: #0006;
		padding: 10rpx 20rpx;
		border-radius: 30rpx;
		color: #fff;
		position: absolute;
		width: 100rpx;
		height: 38rpx;
		line-height: 38rpx;
		.name{
			font-size: 28rpx;
			font-family: 'SourceHanSerifCN-Bold';
		}
		.title{
			font-size: 26rpx;
			font-weight: 400;
		}
	}

	//背景图片
	.top_bg{
		width: 100%;
		position:fixed;
		top:0;
		z-index: -1;
		// filter: blur(2rpx);
		// overflow: hidden;
		.box{
			position: absolute;
			background: #2aae67;
			z-index: 1;
			top: 0;
			width: 100%;
			overflow: hidden;
		}
	}
	.top_bg::before {
		content: '';
		position: absolute;
		background: linear-gradient(to top right, #0f2100c4, #ffffff00);
	    width: 100%;
	    height: 100%;
	    left: 0;
	    bottom: 0;
		margin: 0;
	}
	
	.content_rural{
		display:flex;
		flex-direction:row;
		margin:30rpx;
		.rural_img{
			position: relative;
			image{
				width: 210rpx;
				height: 210rpx;
				border-radius: 20rpx;
				box-shadow: 4rpx 2rpx 34rpx #00000020;
			}
			.num{
				position: absolute;
				right: 14rpx;
				bottom: 25rpx;
				color: #f1f1f1;
				font-size: 28rpx;
			}
		}
		.rural_info{
			padding: 10rpx 30rpx;
			.title{
				font-size: 48rpx;
				font-family: 'SourceHanSerifCN-Bold';
				color: #fff;
				margin-bottom: 10rpx;
				font-family: '宋体';
			}
			.tag{
				display: flex;
				flex-flow: wrap;
				text{
					font-size: 26rpx;
					padding: 8rpx 20rpx;
					background: #2b9e60;
					color: #fff;
					border-radius: 30rpx;
					margin-right: 10rpx;
					margin-top: 10rpx;
				}
			}
		}
	}
</style>
