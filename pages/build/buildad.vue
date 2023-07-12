<template>
	<view class="">
		<u-navbar
			title=" "
			:placeholder="true"
			:bgColor="naviStyle.bg"
			leftIconColor="#ffffff00"
			:titleStyle="{ color: naviStyle.colo,backdropFilter:'blur(2px) saturate(240%)'}"
		>
			<view class="u-nav-slot_left" slot="left">
				<view class="name"><text>名片共建</text></view>
				<view class="desc"><text>让更多的乡村被看见</text></view>
			</view>
		</u-navbar>
		<view class="bottom_bg"></view>
		<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scrolltoupper="upper" @scrolltolower="lower" @scroll="scroll">
		<view class="content">
			<view class="search">
				<u--input
				    placeholder="输入村名,搜索乡村"
				    border="surround"
					:customStyle="{backGround:'#ffffff'}"
					prefixIcon="search"
					@focus="gosearch()"
				  ></u--input>
			</view>
			<view class="banner">
				<u-swiper
						:list="bannerList"
						height="130"
						radius="10"
				></u-swiper>
			</view>
			<!-- <view class="content_topimg">
				<view class="text">
					<text>当前已有</text>
					<u-count-to :startVal="0" :endVal="cardCount" color="#fff"></u-count-to>
					<text>个</text>
					<text>村点亮乡村名片</text>
				</view>
			</view> -->
			<view class="content_rurallist">
				<view class="rural_nav" v-if="rural_list.length != 0 || loadingStata">
					<view class="title"><text>我参与的乡村</text></view>
					<view class="more" @click="rurallist()">
						<view class="">
							<text>更多</text>
						</view>
						<view class="">
							<u-icon name="arrow-right" color="#0b0202" size="16"></u-icon>
						</view>
					</view>
				</view>
				<view class="rural_content">
					<u-scroll-list :indicator="false" v-if="rural_list.length != 0 && !loadingStata">
						<view
							class="rural_list"
							v-for="(item, index) in rural_list"
							:key="index"
							@click="goToRural(item)"
						>
							<image class="img" :src="bgUrlList[index].imgUrl + mySuffix[1]" mode="scaleToFill"></image>
							<view class="box"></view>
							<view class="info">
								<view class="name">
									<text>{{ item.name }}</text>
								</view>
								<view class="poi">
									<!-- <text>{{ item.poi }}</text> -->
									<u--text :text="item.province+item.city+item.county" lines="1" size="12" color="#fff"></u--text>
								</view>
							</view>
							<view class="type">
								<text>{{ identityStr(item.sysRole.roleId) }}</text>
							</view>
						</view>
					</u-scroll-list>
				</view>
				<view class="rural_nolist" v-if="loadingStata">
					<u-loading-icon text="加载乡村数据中" textSize="18"></u-loading-icon>
				</view>
				<view class="rural_nolist" v-if="rural_list.length == 0 && authenticationFlage && !loadingStata">
					<text style="margin-bottom: 30rpx;font-size: 28rpx;">你还没有加入乡村</text>
					<u-button color="#56a96e" text="点击加入/点亮乡村" @click="addclick()"></u-button>
				</view>
				<view class="rural_nolist" v-if="!authenticationFlage && !loadingStata">
					<text style="margin-bottom: 30rpx;font-size: 28rpx;">登录后才可以查看您的乡村哦</text>
					<u-button color="#56a96e" text="立即登录" @click="login()"></u-button>
				</view>
			</view>
			<view class="content_ruraltext" v-for="(item, index) in ruraltext" :key="index">
				<view class="rural_nav">
					<view class="title">
						<text>{{ item.title }}</text>
					</view>
					<!-- <view class="more">
						<text>了解更多</text>
						<u-icon name="arrow-right" color="#0b0202" size="16"></u-icon>
					</view> -->
				</view>
				<view class="rural_content">
					<u-read-more  showHeight="100" closeText="展开了解乡村名片" color="#56a96e" :toggle="true">
						<rich-text :nodes="item.content"></rich-text>
					</u-read-more>
				</view>
			</view>
			<view class="ruralFunction">
				<view class="rural_nav">
					<view class="title"><text>乡村名片功能</text></view>
					<!-- <view class="more">
						<text>了解更多</text>
						<u-icon name="arrow-right" color="#0b0202" size="16"></u-icon>
					</view> -->
				</view>
				<view class="list" v-for="(item, index) in functionList1" :key="index">
					<view class="icon"></view>
					<view class="title">
						<text :user-select="true">{{ item.title }}</text>
					</view>
					<view class="desc">
						<text :user-select="true">{{ item.desc }}</text>
					</view>
				</view>
			</view>
			<view class="ruralFunction">
				<view class="rural_nav">
					<view class="title"><text>内测功能</text></view>
					<!-- <view class="more">
						<text>了解更多</text>
						<u-icon name="arrow-right" color="#0b0202" size="16"></u-icon>
					</view> -->
				</view>
				<view class="list" v-for="(item, index) in functionList2" :key="index">
					<view class="icon"></view>
					<view class="title">
						<text :user-select="true">{{ item.title }}</text>
					</view>
					<view class="desc">
						<text :user-select="true">{{ item.desc }}</text>
					</view>
				</view>
			</view>
		</view>
		</scroll-view>
	</view>
</template>

<script>
import { apiBusinessCardMyRural_Get, apiBusinessCardCount_Get } from '@/API/乡村名片.js';
import { apiBusinessMemberUsernameCount_Post } from '@/API/用户会员接口.js';
import { mapRural_imgList, getStrIdentity } from '@/utils/Utils-tool.js';
const imgBaseUrl = getApp().globalData.imgBaseUrl + '/app/static/';
const imgSuffix = getApp().globalData.imgSuffix;
export default {
	computed: {
		/* 获取身份字符串 */
		identityStr(para) {
			return para => {
				return getStrIdentity(para);
			};
		},
		naviStyle() {
			return this.isTop ? { bg: '#00000000', colo: '#fff' } : { bg: '#ffffff90', colo: '#fff' };
		}
	},
	data() {
		return {
			isTop: true, //是否在顶部
			cardCount: 0, //已点亮村总数
			loadingStata: false,
			rural_list: [],
			myimgBase: imgBaseUrl,
			mySuffix: imgSuffix,
			bgurl: imgBaseUrl + 'index_banner_2.jpg' + imgSuffix[0],
			ruraltext: [
				{
					title: '乡村名片介绍',
					content:
						'乡村名片是一款针对乡村开发的可个性化设计的乡村对外传播形象数字名片，能够实现与互联网头部流量平台对接，灵活融入主流平台功能生态，是用户在主流互联网平台也能“触手可及”的乡村数字名片，帮助乡村产业文化宣传传播。产品兼具全民参与名片共建、查看乡村内容等多项互动功能，提供“乡村展示”“地图向导”“民俗文化展示”等多项服务，推动乡村优秀文化资源数字化，带动全民共同参与乡村文化建设，实现乡村信息透明化，助力农业、旅游、文化等产业振兴发展。'
				}
			],
			bgUrlList: [],
			functionList1: [
				{
					title: '名片装修',
					desc: '支持拖拽DIY名片模块内容及装修',
					icon: ''
				},
				{
					title: '栏目模板',
					desc: '栏目支持配置选择不同列表模板',
					icon: ''
				},
				{
					title: '导航菜单',
					desc: '名片支持配置魔方DIY导航展示',
					icon: ''
				},
				{
					title: '对外接入',
					desc: '支持接入公众号/小程序链接名片',
					icon: ''
				},
				{
					title: '全景展示',
					desc: '提供VR全景平台及VR全景链接展示',
					icon: ''
				},
				{
					title: '手绘地图',
					desc: '用户可以制作乡村手绘/增强地图',
					icon: ''
				},
				{
					title: '跳转小程序',
					desc: '名片可自定义跳转其他微信小程序',
					icon: ''
				},
				{
					title: '资讯模块',
					desc: '支持资讯分类自定义及自由展示模块',
					icon: ''
				},
				{
					title: '位置模块',
					desc: '景区级地图坐标展示支持多标签筛选',
					icon: ''
				},
				{
					title: '图集模块',
					desc: '支持自定义图集视频展示多标签筛选',
					icon: ''
				},
				{
					title: '好物模块',
					desc: '可创建服务、好物,接入自定小程序',
					icon: ''
				},
				{
					title: '综合功能',
					desc: '含轮播图、留言、菜单导航等功能',
					icon: ''
				},{
					title: '乡村海报',
					desc: '根据乡村图集自定义合成宣传海报',
					icon: ''
				},{
					title: '多村建设',
					desc: '用户可多角色参与他村的名片建设',
					icon: ''
				}
			],
			functionList2: [
				{
					title: 'AR向导',
					desc: '自动根据乡村坐标生成AR实时向导',
					icon: ''
				},
				{
					title: '路线规划',
					desc: '可自定义地图坐标景点路线规划',
					icon: ''
				},
				// {
				// 	title: '自助扩容',
				// 	desc: '当名片超出限额，支持付费扩容',
				// 	icon: ''
				// },
				// {
				// 	title: '详情页可选模板',
				// 	desc: '支持奖励裂变、广告投放助引流',
				// 	icon: ''
				// },
			],
			authenticationFlage: false ,//鉴权标记 true-通过、false 不通过
			bannerList:[
				'https://cdn.xiangcunmingpian.com/app/static/buildAd3.jpg',
				'https://cdn.xiangcunmingpian.com/app/static/buildAd1.jpg',
			]
		};
	},
	onLoad() {},
	onShow() {
		this.authenticationFlage = getApp().globalData.userInfo == null ? false : true;
		this.getRealRuralNumber();
		if (this.authenticationFlage) {
			this.getrurallist();
			return;
		} else {
			// 没有用户数据  清空页面数据
			this.rural_list = [];
		}
	},
	onPageScroll(e) {
		this.isTop = e.scrollTop < 20;
	},
	methods: {
		/* 接口请求真实卡片数 */
		getRealRuralNumber() {
			apiBusinessCardCount_Get().then(res => {
				if (res.data.code == 200) {
					this.cardCount = res.data.data.count;
				}
			});
		},
		getrurallist() {
			this.loadingStata = true;
			let apiBusinessCardMyRural_Param = {
				pageNum: 1 /**     string required:false */,
				pageSize: 1000 /**     string required:false */
			};
			apiBusinessCardMyRural_Get(apiBusinessCardMyRural_Param)
				.then(res => {
					console.log('获取乡村结果', res);
					if (res.data.code == 200) {
						this.rural_list = res.data.data;
						this.bgUrlList = mapRural_imgList(res.data.data);
					}
				})
				.finally(() => {
					this.loadingStata = false;
				});
		},
		gosearch() {
			uni.showLoading({ title: '加载中' });
			uni.navigateTo({
				url: '/subpages/search/search'
			});
			uni.hideLoading();
		},
		addclick() {
			// 先鉴权
			if (!this.authenticationFlage) {
				this.login();
				return;
			}

			// 获取用户手机
			/* if(getApp().globalData.userInfo.phonenumber == ""){
					console.log('需要绑定手机');
					uni.navigateTo({url: '/subpages/loginlogin?type=getPhoneNumber'});
					return
				} */

			//正常跳转
			uni.showLoading({ title: '加载中' });
			uni.navigateTo({
				url: '/subpages/myrural/myrural'
			});
			uni.hideLoading();
		},
		rurallist() {
			uni.showLoading({ title: '加载中' });
			uni.navigateTo({
				url: '/subpages/myrural/rural_list'
			});
			uni.hideLoading();
		},
		goToRural(e) {
			uni.showLoading({ title: '加载中' });

			uni.navigateTo({
				url: '/subpages/build/build?cardId=' + e.cardId
			});
			uni.hideLoading();

			return;
			if (e.sysRole.roleId == 103) {
				uni.navigateTo({
					url: '/subpages/build/build?cardId=' + e.cardId
				});
			} else {
				uni.navigateTo({
					url: '/subpages/card/card?cardId=' + e.cardId
				});
			}
		},
		login() {
			uni.showLoading({ title: '加载中' });
			uni.navigateTo({
				url: '/subpages/login/login'
			});
			uni.hideLoading();
		}
	}
};
</script>

<style lang="scss">
//背景图片
.bottom_bg {
	width: 100%;
	position: fixed;
	top: 0;
	z-index: -1;
	height: 100%;
	width: 100%;
	background-color: #fafafa;
	background-image: url(https://cdn.xiangcunmingpian.com/app/static/ruralBg10.jpg);
	background-position: 0 0;
	background-repeat: no-repeat;
	background-size: 100% auto;
}

// page {
// 	background: #56a96e;
// }
page {
	height: 100%;
	width: 100%;
}

.u-nav-slot_left {
	display: flex;
	// background: #0006;
	// padding: 10rpx 20rpx;
	// border-radius: 30rpx;
	// color: #fff;
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
.content {
	margin: 10rpx 30rpx 30rpx 30rpx;
	margin-bottom: 200rpx;
	.banner{
		margin-top: 20rpx;
	}
	
	.content_add {
		display: flex;
		margin: 40rpx 0;
		flex-flow: row-reverse;
		.add {
			color: #fff;
			background: #00000057;
			padding: 16rpx 20rpx;
			border-radius: 30rpx;
			font-size: 28rpx;
		}
	}
	.content_topimg {
		margin: 0rpx 20rpx;
		display: flex;
		justify-content: center;
		flex-direction: column;
		.img {
			color: #fff;
			display: flex;
			text-align: center;
			flex-direction: column;
			justify-items: center;
			image {
				width: 100%;
			}
		}
		.text {
			display: flex;
			color: #fff;
			font-size: 32rpx;
			justify-content: center;
			align-items: center;
		}
	}
	.content_rurallist {
		margin: 30rpx 0rpx;
		padding: 30rpx;
		// background: #fff;
		border-radius: 20rpx;
		overflow: hidden;
		background-color: hsla(0, 0%, 100%, 0.7);
		-webkit-backdrop-filter: blur(2px) saturate(240%);
		backdrop-filter: blur(2px) saturate(240%);
		border: 2rpx #fff solid;
		border-bottom: 1rpx #ececec solid;
		.rural_nav {
			display: flex;
			width: 100%;
			justify-content: space-between;
			margin-bottom: 20rpx;
			.title {
				font-size: 32rpx;
				font-family: 'SourceHanSerifCN-Bold';
			}
			.more {
				display: flex;
				font-size: 28rpx;
				height: 38rpx;
			}
		}
		.rural_nolist {
			display: flex;
			flex-direction: column;
			justify-items: center;
			margin: 10rpx 20rpx;
			text {
				text-align: center;
			}
		}
		.rural_content {
			width: 100%;
			.rural_list {
				display: flex;
				width: 280rpx;
				position: relative;
				margin-right: 20rpx;
				border-radius: 16rpx;
				.box {
					position: absolute;
					background-image: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%);
					z-index: 1;
					bottom: 0;
					height: 100%;
					width: 100%;
					opacity: 0.36;
					border-radius: 16rpx;
				}
				.img {
					width: 280rpx;
					height: 160rpx;
					border-radius: 16rpx;
				}
				.info {
					position: absolute;
					bottom: 10rpx;
					left: 10rpx;
					z-index: 2;
					.name {
						font-size: 28rpx;
						font-weight: 300;
						color: #fff;
					}
					.poi {
						font-size: 22rpx;
						color: #fff;
					}
				}
				.type {
					position: absolute;
					top: 0rpx;
					right: 0rpx;
					color: #fff;
					z-index: 2;
					width: 90rpx;
					padding: 5rpx;
					text-align: center;
					font-size: 22rpx;
					background-color: #000000;
					opacity: 0.5;
					border-radius: 0rpx 16rpx 0rpx 16rpx;
				}
			}
		}
	}
	.content_ruraltext {
		margin: 20rpx 0rpx;
		padding: 30rpx;
		// background: #fff;
		border-radius: 20rpx;
		overflow: hidden;
		background-color: hsla(0, 0%, 100%, 0.7);
		-webkit-backdrop-filter: blur(2px) saturate(240%);
		backdrop-filter: blur(2px) saturate(240%);
		border: 2rpx #fff solid;
		border-bottom: 1rpx #ececec solid;
		.rural_nav {
			display: flex;
			width: 100%;
			justify-content: space-between;
			margin-bottom: 20rpx;
			align-items: center;
			.title {
				font-size: 32rpx;
				font-family: 'SourceHanSerifCN-Bold';
			}
			.more {
				display: flex;
				font-size: 28rpx;
				height: 38rpx;
				align-items: center;
			}
		}
		.rural_content {
			font-size: 28rpx;
			text-align: justify;
		}
	}
	.content_list {
		display: flex;
		margin-bottom: 20rpx;
		padding: 40rpx 30rpx;
		// background: #fff;
		border-radius: 20rpx;
		position: relative;
		justify-content: space-between;
		background-color: hsla(0, 0%, 100%, 0.7);
		-webkit-backdrop-filter: blur(2px) saturate(240%);
		backdrop-filter: blur(2px) saturate(240%);
		border: 2rpx #fff solid;
		border-bottom: 1rpx #ececec solid;
		.info_left {
			color: #fff;
			.title {
				font-size: 38rpx;
				font-weight: 500;
				margin-bottom: 14rpx;
			}
			.map {
				font-size: 26rpx;
			}
		}
		.info_right {
			display: flex;
			flex-direction: column-reverse;
		}
		.right_top {
			position: absolute;
			top: 0;
			right: 0;
			background: #00000057;
			border-radius: 0 20rpx 0 20rpx;
			font-size: 26rpx;
			padding: 10rpx 20rpx;
			color: #fff;
		}
	}
	.ruralFunction {
		margin: 30rpx 0rpx;
		padding: 30rpx;
		// background: #fff;
		border-radius: 20rpx;
		display: flex;
		flex-flow: wrap;
		background-color: hsla(0, 0%, 100%, 0.7);
		-webkit-backdrop-filter: blur(2px) saturate(240%);
		backdrop-filter: blur(2px) saturate(240%);
		border: 2rpx #fff solid;
		border-bottom: 1rpx #ececec solid;
		.rural_nav {
			display: flex;
			width: 100%;
			justify-content: space-between;
			margin-bottom: 30rpx;
			.title {
				font-size: 32rpx;
				font-family: 'SourceHanSerifCN-Bold';
			}
			.more {
				display: flex;
				font-size: 28rpx;
				height: 38rpx;
			}
		}
		.list {
			width: 50%;
			display: flex;
			align-items: center;
			flex-direction: column;
			margin-bottom: 30rpx;
			.title {
				font-size: 32rpx;
				font-family: 'SourceHanSerifCN-Medium'
			}
			.desc {
				font-size: 26rpx;
				padding: 5px 30rpx;
				text-align: center;
				color: #676767;
			}
		}
	}
	.u-count-num {
		padding-bottom: 6rpx;
	}
}
.u-border{
	border-radius: 16rpx!important;
	// background-color: #fff;
	background-color: hsla(0, 0%, 100%, 0.8);
	-webkit-backdrop-filter: blur(2px) saturate(240%);
	backdrop-filter: blur(2px) saturate(240%);
}
.u-read-more__content{
	font-size: 28rpx!important;
}
</style>
