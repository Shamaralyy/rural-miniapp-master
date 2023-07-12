<template>
	<view class="">
		<view class="content_guide">
			<view class="guide_title">
				<text>乡村基础设施</text>
			</view>
			<view class="guide_desc">
				<text>完善本村基础设施的内容</text>
			</view>
		</view>
		<view class="content_service">
			<view class="service_info">
				<view class="info_list" v-for="(item,index) in info_list">
					<u-tag :text="item.name" shape="circle" bgColor="#2aae67" borderColor="#2aae67" :closable="true"></u-tag>
				</view>
			</view>
		</view>
		<view class="content_suggest">
			
		</view>
		<view class="content_bottom">
			<view class="button">
				  <u-button text="保存"></u-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info_list:[
					{
						name:'停车场'
					},
					{
						name:'公共卫生间'
					},
					{
						name:'篮球场'
					},
					{
						name:'绿化带'
					},
					{
						name:'文化广场'
					},
					{
						name:'观景台'
					},
					{
						name:'图书馆'
					},
					{
						name:'充电桩'
					}
				]
			}
		},
		onLoad(){

		},
		methods:{

		}
	}
</script>

<style lang="scss">
	page{
		background:#f5f5f5;
		height: 100%;
		width: 100%;
	}
	.content_guide{
		padding: 30rpx;
		background: #fff;
		.guide_title{
			font-size: 36rpx;
			font-family: 'SourceHanSerifCN-Bold';
			margin-bottom: 10rpx;
		}
	}
	
	.content_service{
		margin: 20rpx;
		background: #fff;
		border-radius: 20rpx;
		display: flex;
		padding: 20rpx;
		.service_info{
			display: flex;
			flex-wrap: wrap;
			.info_list{
				padding: 10rpx;
			}
		}
	}
	
	.content_bottom{
		position: fixed;
		bottom: 10rpx;
		background: #fff;
		width: 100%;
		.button{
			display: flex;
			width: 80%;
			margin:20rpx auto 40rpx auto;
		}
	}
</style>