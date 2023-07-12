<template>
	<view>
		<view v-for="(item,index) in follow" :key="index" class="content_list">
			<view class="title">
				<text>{{item.title}}</text>
			</view>
			<view class="img" v-if="item.img">
				<image :src="item.img" mode="widthFix"></image>
			</view>
			<view class="weburl" v-if="item.weburl" @click="copy(item.weburl)">
				<text>{{item.weburl}}</text>
			</view>
			<view class="desc" v-if="item.desc">
				<text>{{item.desc}}</text>
			</view>
		</view>
		
	</view>
</template>

<script>
	const imgBaseUrl = getApp().globalData.imgBaseUrl + '/app/static/';
	export default {
		data() {
			return {
				follow:[
					{
						id:0,
						title:'微信公众号',
						desc:'微信搜一搜：乡村名片',
						img:imgBaseUrl+'wxqr.jpg'
					},
					{
						id:1,
						title:'官方网站',
						desc:'点击复制或百度搜索：乡村名片',
						img:'',
						weburl:'www.xiangcunmingpian.com'
					}
				],
				share: {
					title: '让你的乡村拥有名片',
					path: '/pages/index/index',
					imageUrl: '',
				}
			};
		},
		onLoad() {

		},
		methods: {
			copy(e){
			  uni.setClipboardData({
			    data:e,
			    success:()=>{
			      uni.showToast({
			        title:'复制成功'
			      })
			    }
			  });
			},
		},
	}
</script>

<style lang="scss">
	page{
		background: #f1f1f1;
	}
	.content_list{
		margin: 30rpx;
		background: #fff;
		padding: 50rpx 30rpx;
		border-radius: 30rpx;
		box-shadow: 0 6rpx 20rpx 0 #00000020;
		.img{
			padding: 30rpx 30rpx 0rpx 30rpx;
			text-align: center;
			image{
				width: 80%;
			}
		}
		.weburl{
			margin-top: 20rpx;
			background: #f7f7f7;
			padding: 10rpx 20rpx;
			border-radius: 20rpx;
			color: #444;
			text-align: center;
			height: 60rpx;
			line-height: 60rpx;
		}
		.desc{
			margin-top:20rpx;
			color:#333;
			text-align: center;
		}
	}
</style>