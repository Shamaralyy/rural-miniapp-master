<template>
	<view>
		<view class="">
			<u-navbar title="乡村搜索" :autoBack="true" :placeholder="true" leftIcon="arrow-left" bgColor="#ffffff" leftIconColor="#000" :titleStyle="{'color':'#000'}"></u-navbar>
		</view>
		<view class="content">
			<view class="content_search">
				<u-search placeholder="输入乡村名称搜索" :showAction="false" bgColor="#fff" shape="square" v-model="search_name" @change="getsearch()"></u-search>
			</view>
			<view class="content_list" v-for="(item,index) in rural_list" :key="index">
				<view class="info_left">
					<view class="title">
						<text>{{item.parentAddr.name}}{{item.name}}</text>
					</view>
					<view class="map">
						<text>{{item.parentAddr.parentAddr.parentAddr.parentAddr.oldName}}{{item.parentAddr.parentAddr.parentAddr.name}}{{item.parentAddr.parentAddr.name}}</text>
					</view>
				</view>
				<view class="info_right">
					<text v-if="item.property==1">进入</text>
					<text v-if="item.property!=1">点亮</text>
				</view>
			</view>
		</view>
			
		</view>
	</view>
</template>

<script>
	import {
		apiBusinessAddrSearch_Post
	} from '@/API/五级联动地址数据.js'
	export default {
		data() {
			return {
				search_name:'',
				rural_list:[]
			}
		},
		onLoad() {
			
		},
		methods: {
			getsearch(){
				if(this.search_name.length>1){
					let apiBusinessAddrSearch_Param = {
						 pageNum: 1,   /**     string required:false */
						 pageSize: 50,   /**     string required:false */
						 keyword: this.search_name,   /** 关键字, 可为空,为空不筛选    string required:false */
						 level: 5,   /** 筛选第几级的数据,可为空默认第五级    string required:false */
					}
					uni.showLoading({
					  icon: 'none',
					  title: "搜索中"
					})
					apiBusinessAddrSearch_Post(apiBusinessAddrSearch_Param).then(res=>{
						console.log(res.data.data.records)
						this.rural_list = res.data.data.records
						uni.hideLoading();
					});
				}
			}
		}
	}
</script>

<style lang="scss">
	//背景图片
	page{
		background:#ededed;
	}
	
	.content{
		margin:30rpx;
		.content_search{
			margin-bottom: 20rpx;
		}
		.content_list{
			display: flex;
			margin-bottom: 20rpx;
			padding: 40rpx;
			background: #fff;
			border-radius: 20rpx;
			justify-content: space-between;
			.info_left{
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
				align-items: center;
				text{
					background: #f1f1f1;
					padding: 10rpx 20rpx;
					border-radius: 30rpx;
					font-size: 24rpx;
				}
				.on{
					background: #f1f1f1;
					color:#fff;
				}
			}
		}
	}
</style>
