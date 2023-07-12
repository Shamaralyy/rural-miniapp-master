<template>
	<view class="">
		<view class="">
			<image :src="user_bg + mySuffix[1]" class="top_bg"></image>
			<u-navbar
				title="个人中心"
				:placeholder="true"
				:bgColor="naviStyle.bg"
				:titleStyle="{ color: naviStyle.colo }"
			>
				<view class="u-nav-slot" slot="left"></view>
			</u-navbar>
		</view>
		<view class="content_header">
			<view class="avatar" @click="clickgrid(0)">
				<u-avatar :src="userInfo.avatar + mySuffix[0]" size="64"></u-avatar>
			</view>
			<view class="user_info">
				<view class="name" v-if="userInfo == null" @click="login()"><text>登录/注册</text></view>
				<view class="name" @click="clickgrid(0)">
					<text>{{ userInfo.nickName }}</text>
				</view>
				<view class="user_tag">
					<view class="tag_name" v-if="userInfo">
						<u-tag
							bgColor="#fff"
							borderColor="#fff"
							color="#000"
							:icon="user_tag_x"
							text="乡村游客"
							size="mini"
							shape="circle"
						></u-tag>
					</view>
					<view class="tag_name" v-if="userInfo.type == 'user'">
						<!-- <u-tag bgColor="#fff" borderColor="#fff" color="#000" icon="user_tag_logo.png" text="华南师范大学" size="mini" shape="circle"></u-tag> -->
					</view>
					<!-- <view class="phone" v-if="userInfo.phonenumber == ''"><text>点击绑定手机并同步用户信息</text></view> -->
					<view class="phone" v-if="userInfo == null" @click="login()"><text>同步会员信息</text></view>
				</view>
			</view>
		</view>
		<view class="content_data">
			<view class="data_list" v-for="(item, index) in selfData" :key="index">
				<view class="data_info">
					<view>
						<!-- <text class="number">{{item.number}}</text> -->
						<u-count-to :startVal="0" :endVal="item.number" class="number" color="#000"></u-count-to>
					</view>
					<view>
						<text class="title">{{ item.title }}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="content_quick">
			<view class="quick_list" v-for="(item, index) in quick" :key="index" @click="quickclick(item)">
				<view class="icon">
					<view><image :src="item.icon + mySuffix[1]" mode="widthFix"></image></view>
				</view>
				<view class="info">
					<view class="title">
						<text>{{ item.title }}</text>
					</view>
					<view class="description">
						<text>{{ item.description }}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="content_rural">
			<view class="rural_nav">
				<view class="title"><text>我的乡村</text></view>
				<view class="more" @click="toRural()" v-if="rural_list.length != 0">
					<text>更多</text>
					<u-icon name="arrow-right" color="#0b0202" size="16"></u-icon>
				</view>
			</view>
			<view class="rural_content">
				<view class="rural_nolist" v-if="loadingStata">
					<u-loading-icon text="加载乡村数据中" textSize="18"></u-loading-icon>
				</view>
				<view class="rural_nolist" v-if="rural_list.length == 0 && userInfo != null && !loadingStata">
					<text style="margin-bottom: 30rpx;font-size: 28rpx;">你还没有加入乡村</text>
					<u-button color="#56a96e" text="点击加入/点亮乡村" @click="addclick()"></u-button>
				</view>
				<view class="rural_nolist" v-if="userInfo == null && rural_list.length == 0 && !loadingStata">
					<text style="margin-bottom: 30rpx;font-size: 28rpx;">登录后才可以查看哦</text>
					<u-button color="#56a96e" text="立即登录" @click="login()"></u-button>
				</view>
				<u-scroll-list :indicator="false">
					<view
						class="rural_list"
						v-for="(item, index) in rural_list"
						:key="index"
						@click="goToRural(item)"
						v-if="!loadingStata"
					>
						<image class="img" :src="bgUrlList[index].imgUrl + mySuffix[1]" mode="scaleToFill"></image>
						<view class="box"></view>
						<view class="info">
							<view class="name">
								<text>{{ item.name }}</text>
							</view>
							<view class="poi">
								<u--text :text="item.province+item.city+item.county" lines="1" size="12" color="#fff"></u--text>
								<!-- <text>{{ item.province }}{{ item.city }}{{ item.county }}</text> -->
							</view>
						</view>
						<view class="type">
							<text>{{ identityStr(item.sysRole.roleId) }}</text>
						</view>
					</view>
				</u-scroll-list>
			</view>
		</view>
		<view class="content_grid">
			<view class="grid_nav">
				<view class="title"><text>常用功能</text></view>
			</view>
			<view class="grid_content">
				<u-grid :border="false" col="4">
					<u-grid-item
						v-for="(baseListItem, baseListIndex) in baseList"
						:key="baseListIndex"
						@click="toPage(baseListItem)"
					>
						<u-icon :customStyle="{ paddingTop: 35 + 'rpx' }" :name="baseListItem.name" :size="22"></u-icon>
						<text class="grid-text">{{ baseListItem.title }}</text>
					</u-grid-item>
				</u-grid>
				<u-toast ref="uToast" />
			</view>
		</view>
		<view class="content_bottom">
		</view>
		<u-action-sheet
			@close="shareSheet = false"
			:actions="shareList"
			:show="shareSheet"
			@select="selectClick"
			cancelText="取消分享"
			round="16"
		></u-action-sheet>
	</view>
</template>

<script>
import { apiBusinessMemberContribute_Get } from '@/API/用户会员接口.js';
import { apiBusinessCardMyRural_Get } from '@/API/乡村名片.js';
import { mapRural_imgList, getStrIdentity } from '@/utils/Utils-tool.js';
const imgBaseUrl = getApp().globalData.imgBaseUrl + '/app/static/';
const imgSuffix = getApp().globalData.imgSuffix;

import cuEditor from '@/components/cu-editor/cu-editor';
export default {
	data() {
		return {
			mySuffix: imgSuffix,
			isTop: true, //是否在顶部
			loadingStata: false, //加载状态
			user_bg: imgBaseUrl + 'user_bg.png',
			user_tag_x: imgBaseUrl + 'user_tag_x.png',
			selfData: [
				{ title: '关注乡村', number: 0, url: '' },
				{ title: '获得点赞', number: 0, url: '' },
				{ title: '贡献值', number: 0, url: '' }
			],
			quick: [
				{
					title: '共建乡村',
					description: '参与名片建设',
					icon: imgBaseUrl + 'user_quick_1.png',
					url: '/pages/build/buildad'
				},
				{
					title: '名片学院',
					description: '名片共建学习',
					icon: imgBaseUrl + 'user_quick_2.png',
					url: '/subpages/edu/edu'
				}
			],
			rural_list: [],
			bgUrlList: [],
			baseList: [
				{
					name: 'account',
					title: '个人信息',
					url: '/subpages/user/user_info/user_info'
				},
				{
					name: 'share-square',
					title: '分享小程序'
				},
				{
					name: 'question-circle',
					title: '常见问题',
					url: '/subpages/user/qa'
				},
				{
					name: 'kefu-ermai',
					title: '在线客服'
				},
				{
					name: 'weixin-fill',
					title: '关注我们',
					url: '/subpages/user/user_setting/follow'
				},
				{
					name: 'email',
					title: '吐槽建议'
				},
				{
					name: 'play-right',
					title: '视频号'
				},
				{
					name: 'setting',
					title: '设置',
					url: '/subpages/user/user_setting/user_setting'
				}
			],
			userInfo: getApp().globalData.userInfo,
			shareSheet: false,
			shareList: [
				{
					name: '分享给好友',
					openType: 'share'
				}
			]
		};
	},
	computed: {
		/* 获取身份字符串 */
		identityStr(para) {
			return para => {
				return getStrIdentity(para);
			};
		},
		naviStyle() {
			return this.isTop ? { bg: '#00000000', colo: '#333' } : { bg: '#00000000', colo: '#333' };
		}
	},
	onLoad() {
		wx.showShareMenu({
			withShareTicket: true,
			menus: ['shareAppMessage', 'shareTimeline']
		});
	},
	onShareAppMessage(res) {
		return {
			title: '乡村名片',
			// path: '/subpages/card/card?cardId',
			path: '/pages/index/index',
			imageUrl: imgBaseUrl + 'rural_share.jpg' + imgSuffix[1]
		};
	},
	onShareTimeline(res) {
		return {
			title: '乡村名片',
			path: '/pages/index/index',
			imageUrl: imgBaseUrl + 'rural_share.jpg' + imgSuffix[1]
		};
	},
	onPageScroll(e) {
		this.isTop = e.scrollTop < 20;
	},
	onShow() {
		//更新数据
		this.userInfo = getApp().globalData.userInfo;
		//用户鉴权	无用户数据则清空数据
		if (this.userInfo == null) {
			this.rural_list = [];
			this.selfData.forEach(value => {
				value.number = 0;
			});
			return;
		}
		this.getrurallist();
	},
	methods: {
		selectClick(index) {
			console.log(index);
		},
		toPage(para) {
			uni.showLoading({ title: '加载中' });
			if (para.title == '个人信息' || para.title == '举报投诉') {
				if (this.userInfo == null) {
					this.login();
					uni.hideLoading();
					return;
				}
			}
			if (para.title == '在线客服') {
				wx.openCustomerServiceChat({
					extInfo: { url: 'https://work.weixin.qq.com/kfid/kfc0c2a44f97c4dbade' },
					corpId: 'ww03db49f5e1dad3f3',
					success(res) {}
				});
				uni.hideLoading();
				return;
			}

			if (para.title == '分享小程序') {
				this.shareSheet = true;
				uni.hideLoading();
				return;
			}

			if (para.title == '吐槽建议') {
				wx.openEmbeddedMiniProgram({
					appId: 'wx8abaf00ee8c3202e',
					extraData: {
						// 把406610数字换成你的产品ID，否则会跳到别的产品
						id: '406610',
						// 自定义参数，具体参考文档
						customData: {
							clientInfo: this.userInfo
						}
					}
				});
				uni.hideLoading();
				return;
			}

			// if (para.title == '常见问题') {
			// 	uni.navigateTo({
			// 		url:'web_view?url=https://www.xiangcunmingpian.com/help/'
			// 	})
			// 	return;
			// }

			if (para.title == '常见问题') {
				uni.navigateTo({
					url: para.url
				});
				uni.hideLoading();
				return;
			}

			if (para.title == '视频号') {
				wx.openChannelsUserProfile({
					finderUserName: 'sphlpVv0h2paGAs'
				});
				uni.hideLoading();
				return;
			}

			if (para.url != undefined) {
				uni.navigateTo({ url: para.url });
				uni.hideLoading();
			}
			uni.hideLoading();
		},
		quickclick(e) {
			// if (this.userInfo == null) {
			// 	this.login();
			// 	return;
			// }
			if (e.url == '/pages/build/buildad') {
				uni.switchTab({
					url: '/pages/build/buildad'
				});
				return;
			}
			if (e.url == '/subpages/edu/edu') {
				uni.navigateTo({
					url: '/subpages/edu/edu'
				});
			}
		},
		getrurallist() {
			this.loadingStata = true;
			apiBusinessCardMyRural_Get({
				pageNum: 1 /**     string required:false */,
				pageSize: 1000 /**     string required:false */
			})
				.then(res => {
					console.log('乡村结果', res);
					if (res.data.code == 200) {
						this.rural_list = res.data.data;
						this.bgUrlList = mapRural_imgList(res.data.data);
						// 匹配关注数据
						this.selfData.forEach(value => {
							if (value.title.indexOf('关注') != -1) {
								value.number = res.data.data.length;
							}
						});
					}
				})
				.finally(() => {
					this.getContribution();
					this.loadingStata = false;
				});
		},
		/* 获取贡献值 */
		getContribution() {
			apiBusinessMemberContribute_Get()
				.then(res => {
					// console.log('贡献值接口返回', res.data.data);
					return Object.keys(res.data.data).reduce(
						(previous, value) => previous + Number(res.data.data[value]),
						0
					);
				})
				.then(result => {
					// 匹配贡献 数据
					this.selfData.forEach(value => {
						if (value.title.indexOf('贡献') != -1) {
							value.number = result;
						}
					});
				});
		},
		toRural() {
			uni.showLoading({ title: '加载中' });
			if (this.userInfo == null) {
				this.login();
				uni.hideLoading();
				return;
			}
			uni.navigateTo({
				url: '/subpages/myrural/rural_list'
			});
			uni.hideLoading();
		},
		login() {
			uni.navigateTo({
				url: '/subpages/login/login'
			});
		},
		goToRural(e) {
			uni.showLoading({ title: '加载中' });
			if (this.userInfo == null) {
				this.login();
				uni.hideLoading();
				return;
			}
			if (e.sysRole.roleId == 103) {
				uni.navigateTo({
					url: '/subpages/build/build?cardId=' + e.cardId
				});
			} else {
				uni.navigateTo({
					url: '/subpages/card/card?cardId=' + e.cardId
				});
			}
			uni.hideLoading();
		},
		addclick() {
			uni.showLoading({ title: '加载中' });
			if (this.userInfo == null) {
				this.login();
				uni.hideLoading();
				return;
			}
			uni.navigateTo({
				url: '/subpages/myrural/myrural'
			});
			uni.hideLoading();
		},
		clickgrid(name) {
			uni.showLoading({ title: '加载中' });
			if (this.userInfo == null) {
				this.login();
				uni.hideLoading();
				return;
			}
			console.log(name);
			var url = this.baseList[name].url;
			if (name == 0) {
				if (this.userInfo != null) {
					uni.navigateTo({ url: url });
				}
				if (this.userInfo.type == 'member') {
					console.log('请先绑定手机号');
					uni.showToast({ icon: 'none', title: '请先绑定手机号' });
				}
				if (Object.keys(this.userInfo).length == 0) {
					console.log('请先登录');
					uni.showToast({ icon: 'none', title: '请先登录' });
					uni.navigateTo({
						url: '/subpages/login/login'
					});
				}
			}
			uni.hideLoading();
		}
	},
	components: { cuEditor }
};
</script>

<style lang="scss">
.aaa {
	color: red;
	font-size: 50px;
}

//背景图片
.top_bg {
	width: 100%;
	position: fixed;
	top: 0;
	z-index: -1;
}

page {
	background: #f1f1f1;
}

//头部头像、姓名、等级、组织
.content_header {
	display: flex;
	margin: 30rpx 30rpx;

	.avatar {
		margin-right: 30rpx;
	}

	.user_info {
		display: flex;
		flex-direction: column;

		.name {
			font-size: 42rpx;
			font-family: 'SourceHanSerifCN-Bold';
		}
		.user_tag {
			display: flex;
			margin-top: 14rpx;
			.tag_name {
				margin-right: 12rpx;
			}
		}
		.phone {
			font-size: 26rpx;
		}
	}
}

//用户的数据
.content_data {
	display: flex;
	margin: 20rpx 0rpx;
	justify-content: space-around;
	.data_list {
		display: flex;
		.data_info {
			display: flex;
			flex-direction: column;
			text-align: center;
			.number {
				font-size: 42rpx;
			}
			.title {
				font-size: 28rpx;
			}
		}
	}
}

//快捷按钮
.content_quick {
	display: flex;
	margin: 20rpx 30rpx;
	justify-content: space-between;
	.quick_list {
		display: flex;
		background: #fff;
		padding: 30rpx;
		border-radius: 20rpx;
		width: 40%;
		// justify-content: space-between;
		.icon {
			display: flex;
			flex-flow: column-reverse;
		}
		.icon image {
			width: 60rpx;
		}
		.info {
			margin-left: 30rpx;
			.title {
				font-size: 32rpx;
				font-family: 'SourceHanSerifCN-Bold';
			}
			.description {
				margin-top: 10rpx;
				font-size: 24rpx;
				font-family: 'SourceHanSerifCN-Bold';
			}
		}
	}
}

.content_rural {
	margin: 20rpx 30rpx;
	padding: 30rpx;
	background: #fff;
	border-radius: 20rpx;
	overflow: hidden;
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
	.rural_content {
		width: 100%;
		.rural_nolist {
			display: flex;
			flex-direction: column;
			justify-items: center;
			margin: 10rpx 50rpx;
			text {
				text-align: center;
			}
		}
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
					font-family: 'SourceHanSerifCN-Bold';
					color: #fff;
				}
				.poi {
					text{
						font-size: 22rpx;
						color: #fff;
					}
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

.content_ad {
	margin: 20rpx 30rpx;
	border-radius: 20rpx;
}

.content_grid {
	margin: 20rpx 30rpx;
	padding: 30rpx;
	background: #fff;
	border-radius: 20rpx;
	.grid_nav {
		display: flex;
		width: 100%;
		justify-content: space-between;
		margin-bottom: 10rpx;
		.title {
			font-size: 32rpx;
			font-family: 'SourceHanSerifCN-Bold';
		}
	}
	.grid_content {
		.grid-text {
			font-size: 24rpx;
			color: #232426;
			padding: 20rpx 0 20rpx 0rpx;
		}
	}
}

.content_bottom{
	height: 200rpx;
	display: flex;
	
}
</style>
