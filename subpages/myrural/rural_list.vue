<template>
	<view>
		<view class="">
			<image src="https://cdn.xiangcunmingpian.com/app/static/myrural_list_bg1.jpg"  class="bottom_bg" mode="widthFix"></image>
			<u-navbar title="我加入的村" :autoBack="true" :placeholder="true" leftIcon="arrow-left" bgColor="#25a5fc" leftIconColor="#fff" :titleStyle="{'color':'#fff'}">
			</u-navbar>
		</view>
		
		<view class="content">
			<view class="content_add" @click="addrural()">
				<view class="add">
					<text>创建 / 加入乡村</text>
				</view>
			</view>
			<view :class="rural_list.length>5?'list bt':'list'">
				<view class="content_list" v-for="(item,index) in rural_list" :key="index" :style="{'background':'url('+bgUrlList[index].imgUrl+')100% 100%;background-size:cover'}" @click="goToRural(item)">
					<view class="info_left">
						<view class="title">
							<text>{{item.name}}</text>
						</view>
						<view class="map">
							<text>{{ item.province }}</text>
							<text>{{ item.city }}</text>
							<text>{{ item.county }}</text>
						</view>
					</view>
					<view class="info_right">
						<u-icon name="arrow-right" color="#fff" size="18"></u-icon>
					</view>
					<view class="right_top">
						<text v-if="item.sysRole.roleId==100">游客</text>
						<text v-if="item.sysRole.roleId==101">村民</text>
						<text v-if="item.sysRole.roleId==102">共建者</text>
						<text v-if="item.sysRole.roleId==103">管理员</text>
						<text v-if="item.sysRole.roleId==null">其他</text>
					</view>
				</view>
			</view>
			
			<view class="content_nolist" v-if="rural_list.length==0">
				<view class="nolist_text">
					<text>你好呀，请先点击右上角</text>
					<text>“创建 / 加入乡村”</text>
					<text>加入后可参与共建哦~</text>
				</view>
			</view>
		</view>
			
		</view>
	</view>
</template>

<script>
	import {
		apiBusinessCardMyRural_Get
	} from '@/API/乡村名片.js'
	import { mapRural_imgList, getStrIdentity } from '@/utils/Utils-tool.js';
	const imgBaseUrl = getApp().globalData.imgBaseUrl + '/app' + '/static/';
	export default {
		data() {
			return {
				rural_list:[],
				bgurl:imgBaseUrl + 'rural_list_1.jpg',
				bgUrlList:[]
			}
		},
		onLoad() {
			this.getrurallist()
		},
		methods: {
			goToRural(e){
				if(e.sysRole.roleId==103){
					uni.navigateTo({
						url:'../build/build?cardid='+e.cardId
					})
				}else{
					uni.navigateTo({
						url:'../card/card?cardId='+e.cardId
					})
				}
			},
			addrural(){
				uni.navigateTo({
					url:'./myrural'
				})
			},
			getrurallist(){
				let apiBusinessCardMyRural_Param = {
					pageNum: 1,   /**     string required:false */
					pageSize: 1000,   /**     string required:false */
				}
				apiBusinessCardMyRural_Get(apiBusinessCardMyRural_Param)
				.then(res=>{
					console.log(res.data.data)
					this.rural_list = res.data.data
					this.bgUrlList = mapRural_imgList(res.data.data);
					this.rural_list.map((value, index) => {
						value.images = JSON.parse(value.images)
					})
				})
			}
			
		}
	}
</script>

<style lang="scss">
//背景图片
	.bottom_bg{
		width: 100%;
		position:fixed;
		bottom:0;
		z-index: -1;
	}
	
	page{
		background:#25a5fc ;
	}
	.u-nav-slot_left{
		display: flex;
		// background: #0006;
		padding: 10rpx 20rpx;
		border-radius: 30rpx;
		color: #fff;
		.name{
			font-size: 28rpx;
			font-family: 'SourceHanSerifCN-Bold';
			
		}
		.title{
			font-size: 26rpx;
			font-weight: 400;
		}
	}
	.content{
		margin:30rpx 40rpx;
		position: relative;
		.list{
			height:900rpx;
			overflow: auto;
			border-radius: 0 0 20rpx 20rpx;
		}
		.bt::before {
			content: '';
			position: absolute;
			background-image: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #ffffff9e 90%);
			bottom: 0;
			height: 60rpx;
			width: 100%;
			z-index: 101;
			border-radius: 0 0 20rpx 20rpx;
		}
		.content_add{
			display: flex;
			margin:40rpx 0;
			flex-flow: row-reverse;
			.add{
				color: #fff;
				background: #00000057;
				padding: 16rpx 20rpx;
				border-radius: 30rpx;
				font-size: 28rpx;
			}
		}
		.content_nolist{
			margin-top: 50%;
			display: flex;
			justify-content: center;
			.nolist_text{
				color: #fff;
				display: flex;
				text-align: center;
				flex-direction: column;
				justify-items: center;
				text{
					height: 48rpx;
				}
			}
		}
		.content_list{
			display: flex;
			margin-bottom: 20rpx;
			padding: 40rpx 30rpx;
			background: #fff;
			border-radius: 20rpx;
			position: relative;
			justify-content: space-between;
			.info_left{
				z-index: 1;
				color: #fff;
				.title{
					font-size: 38rpx;
					font-weight: 500;
					margin-bottom: 14rpx;
				}
				.map{
					font-size: 26rpx;
				}
			}
			.info_right{
				display: flex;
				flex-direction: column-reverse;
			}
			.right_top{
				position: absolute;
				top: 0;
				right: 0;
				background: #00000057;
				border-radius:0 20rpx 0 20rpx;
				font-size: 26rpx;
				padding: 10rpx 20rpx;
				color: #fff;
			}
			
		}
		.content_list::before {
			content: '';
			position: absolute;
			background: linear-gradient(to top right, #00000090, #ffffff00);
		    width: 100%;
		    height: 100%;
		    left: 0;
		    bottom: 0;
			margin: 0;
			border-radius: 20rpx;
		}
	}
</style>
