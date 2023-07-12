<template>
	<view class="">
		<u-navbar :autoBack="true" :showAction="false" :placeholder="true" title="模板选择" :bgColor="naviStyle.bg"
			:leftIconColor="naviStyle.colo" :titleStyle="{color:'#333'}">
			<view
				class="u-nav-slot_right"
				slot="right"
				:style="'right:' + menuwidth + 'px;bottom:' + menuwidth / 11 + 'px'"
				@click="submit"
			>
				<view class="title"><text>确定</text></view>
			</view>
		</u-navbar>
		<view class="rural_list">
			<view class="list_top">

			</view>
			<view class="list_content">
				<radio-group  @change="setRadio">
					<view class="list" v-for="(item,index) in listStyle" :key="index">
						<view style="align-self: center;margin-left: 30rpx;">
							<radio :value="index" :checked="item.name==tab_template.list_style.name"/>
						</view>
						<view class="text"  @click="clickRadio(index)">
							<view class="suTitle">
								<text>模板{{index+1}}</text>
							</view>
							<view class="title">
								<text>{{item.title}}</text>
							</view>
							<view class="tag">
								<view class="tagList" v-for="(item,index1) in item.tag" :key="index1">
									<u-tag :text="item" bgColor="#fff8eb" borderColor="#fff8eb" color="#ad946c" size="mini"></u-tag>
								</view>
							</view>
						</view>
						<view class="img">
							<image :src="item.imgUrl" mode="widthFix" @click="clickImg(index)"></image>
						</view>
					</view>
				</radio-group>
			</view>
		</view>
	</view>
</template>

<script>
	const imgBaseUrl = getApp().globalData.imgBaseUrl + '/app' + '/static/';
	import {
		apiBusinessCardInfo_Get
	} from '@/API/乡村名片.js';
	import { apiBusinessCommodityTagTagLabel_Get } from '@/API/好物标签.js'; //标签
	import { apiBusinessCommodityPage_Post } from '@/API/商品好物news.js'; //列表

	export default {
		computed: { 
			/* 拿取本乡村数据 */
			rural_info() {
				return this.$store.state.build.currentRural;
			},
			naviStyle() {
				return this.isTop ? {
					bg: '#00000000',
					colo: '#333'
				} : {
					bg: '#f1f1f100',
					colo: '#333'
				};
			}
		},
		data() {
			return {
				bannerimg: [],
				listStyle: [{
						imgUrl: [imgBaseUrl + 'tagStyle01.jpg'],
						title: '默认风格',
						tag:['必须有图'],
						name:'list_1'
					}
				],
				pagesHeight: 1000,
				cardId: null,
				menuwidth: 0,
				pagesWidth: null,
				nowCurrent: 0,
				infoTagId: null,
				tab_template:{
					list_style:{
						title:'默认风格',
						name:'list_1',
					}
				}
				
			};
		},
		onLoad: function(option) {
			this.infoTagId = option.infoTagId
			if(option.tabStyle!=null){
				this.tab_template.list_style.name = option.tabStyle
			}else{
				// if(this.infoTagId!=null){
				// 	this.getTagInfo()
				// }
			}
			
			// 获取导航栏高度
			let menu = wx.getMenuButtonBoundingClientRect();
			this.menuwidth = menu.width + menu.width / 7;

			let sysInfo = getApp().globalData.sysInfo;

			this.pagesWidth = sysInfo.windowWidth;
			this.pagesHeight = sysInfo.windowHeight;
			
		},
		methods: {
			setRadio(e){
				console.log(e.detail.value)
				this.tab_template.list_style.name = this.listStyle[e.detail.value].name
				this.tab_template.list_style.title = this.listStyle[e.detail.value].title
			},
			clickRadio(e){
				console.log(e)
				this.tab_template.list_style.name = this.listStyle[e].name
				this.tab_template.list_style.title = this.listStyle[e].title
			},
			getTagInfo(){
				apiBusinessInformationTagInfoinfoTagId_Get({infoTagId:this.infoTagId}).then(res => {
					console.log(res.data)
				})
			},
			goCard() {
				uni.redirectTo({
					url: '../card?cardId=' + this.rural_info.cardId
				});
			},
			clickImg(e) {
				// console.log('点击事件', e);
				uni.previewImage({
					urls: this.listStyle[e].imgUrl
				});
			},
			navright() {
				uni.navigateTo({
					url: '../card/card?cardid=' + this.cardid
				});
			},
			submit(){
				this.$store.commit('build/setTempStylePara',this.tab_template);
				uni.showToast({ title: '选择成功' });
				setTimeout(() => {
					uni.navigateBack({ delta: 1 });
				}, 500);
			}
			
		},
		// 生命周期 - 挂载完成（可以访问DOM元素）
		mounted() {
			//位置标签
			
		}
	};
</script>

<style lang="scss">
	page{
		background: #f1f1f1;
	}
	.u-nav-slot_left {
		display: flex;
		padding: 8rpx 20rpx;
		border-radius: 30rpx;
		// border: 1rpx solid #ffffff9e;
		background: #ffffff9e;
		align-items: center;

		.name {
			font-size: 28rpx;
			font-family: 'SourceHanSerifCN-Bold';
			margin-left: 5rpx;
			padding-bottom: 3rpx;
		}

		.title {
			font-size: 26rpx;
			font-weight: 400;
		}
	}

	.u-nav-slot_right {
		display: flex;
		background: #0006;
		padding: 10rpx 20rpx;
		border-radius: 30rpx;
		color: #fff;
		position: absolute;
		width: max-content;
		height: 38rpx;
		line-height: 38rpx;

		.name {
			font-size: 28rpx;
			font-family: 'SourceHanSerifCN-Bold';
		}

		.title {
			font-size: 26rpx;
			font-weight: 400;
		}
	}
	.rural_list{
		.list_top{
			
		}
		.list_content{
			display: flex;
			flex-direction: column;
			.list{
				display: flex;
				margin: 20rpx 30rpx;
				border-radius: 30rpx;
				background: #fff;
				.img{
					width: 40%;
					padding: 30rpx;
					image{
						width: 100%;
						border: 1rpx #e8e8e8 solid;
						border-radius: 20rpx;
					}
				}
				.tag{
					display: flex;
					.tagList{
						margin-right: 8rpx;
					}
				}
				.text{
					padding: 30rpx 30rpx 30rpx 30rpx;
					width: 30%;
					align-self: center;
					.title{
						font-size: 36rpx;
						margin-bottom: 16rpx;
					}
					.tag{
						display: flex;
						margin-bottom: 16rpx;
					}
					.map{
						display: flex;
						font-size: 28rpx;
					}
				}
			}
		}
	}
</style>