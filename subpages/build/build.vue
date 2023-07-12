<template>
	<view class="page">
		<image
			:src="(bannerimg[0] ? bannerimg[0] : imgBaseUrl + '/xs/index_banner_2.jpg') + mySuffix[1]"
			class="top_bg"
			:style="{ height: pagesHeight - 100 + 'px' }"
			mode="heightFix"
		></image>
		<u-navbar
			:showAction="false"
			:placeholder="true"
			title=" "
			:bgColor="naviStyle.bg"
			:leftIconColor="naviStyle.colo"
		>
			<view class="u-nav-slot_left" slot="left" :style="{color:naviStyle.colo,border:'1rpx solid '+naviStyle.colo+';'}">
				<view class="" v-if="rural_list.length != 0" @click="navhome()">
					<u-icon name="home" size="20" :color="naviStyle.colo" v-></u-icon>
				</view>
				<view class="" v-if="rural_list.length != 0">
					<u-line
						direction="column"
						:hairline="false"
						length="20"
						margin="0 16rpx"
						:color="isTop?'#dcdcdc':'#b6b6b6'"
					></u-line>
				</view>
				<view class="name" v-if="rural_list.length != 0" @click="navleft()">
					<text>{{ currentRural.name }}</text>
				</view>
				<view class="name" v-if="rural_list.length == 0"><text>加入乡村</text></view>
				<view class="" v-if="rural_list.length != 0">
					<u-line
						direction="column"
						:hairline="false"
						length="20"
						margin="0 16rpx"
						:color="isTop?'#dcdcdc':'#b6b6b6'"
					></u-line>
				</view>
				<view class="" v-if="rural_list.length != 0" @click="navleft()">
					<u-icon name="list" size="18" :color="naviStyle.colo"></u-icon>
				</view>
			</view>
			<view
				class="u-nav-slot_right"
				slot="right"
				:style="'right:' + menuwidth + 'px;bottom:' + menuwidth / 11 + 'px'"
				@click="navright()"
			>
				<view class="title" v-if="rural_list.length != 0"><text>查看名片</text></view>
				<view class="title" v-if="rural_list.length == 0"><text>返回首页</text></view>
			</view>
		</u-navbar>
		<u-loading-page loading-text="进入名片页中..." :loading="loading"></u-loading-page>
		<view class="nobuild" v-if="!show" style="color: black;">
			<ru-application-build
				@refresh="refresh"
				:welcome_text="welcome_text"
				:currentRural="currentRural"
				:userStatus="userStatus"
				:applicationText="applicationText"
			></ru-application-build>
		</view>
		<view class="build" v-if="show">
			<u-notice-bar
				bgColor="#f56c6c90"
				color="#fdf6ec"
				:text="welcome_text"
				v-if="welcome_text.length != 0"
			></u-notice-bar>
			<view class="content_nav">
				<view class="nav_one">
					<view class="text_left">
						<text>{{ userInfo.nickName }},欢迎您</text>
					</view>
					<view class="text_right">
						<text v-if="sysRole.roleId == 100">游客</text>
						<text v-if="sysRole.roleId == 101">村民</text>
						<text v-if="sysRole.roleId == 102">共建者</text>
						<text v-if="sysRole.roleId == 103">管理员</text>
					</view>
				</view>
				<view class="nav_two">
					<view class="text_left">
						<text>参与{{ currentRural.name }}的名片共建</text>
					</view>
					<view class="text_right"><text>本村身份</text></view>
				</view>
				<!-- <view class="nav_three">
					<view class="text_left">
						<text>乡村名片状态:</text>
						<text>待发布</text>
					</view>
					<view class="text_right">
						<u-button text="发布" size="small" shape="circle"></u-button>
					</view>
				</view> -->
			</view>

			<view class="content_data">
				<view class="data_list">
					<view class="list_text">
						<view class="title"><text>名片曝光</text></view>
						<view class="number">
							<text>{{ pv }}次</text>
						</view>
					</view>
					<view class="img">
						<image :src="imgBaseUrl + '/static/build_data_1.png' + mySuffix[1]" mode="widthFix"></image>
					</view>
				</view>
				<view class="data_list">
					<view class="list_text">
						<view class="title"><text>共建成员</text></view>
						<view class="number">
							<text>{{ userNum }}名</text>
						</view>
					</view>
					<view class="img">
						<image :src="imgBaseUrl + '/static/build_data_2.png' + mySuffix[1]" mode="widthFix"></image>
					</view>
				</view>
			</view>

			<view class="content_noticebar" v-if="!loading">
				<u-notice-bar
					:text="bartext"
					direction="column"
					bgColor="#fff"
					icon="calendar"
					color="#000"
					mode="link"
				></u-notice-bar>
			</view>
			<view style="margin:0 30rpx">
				<u-alert title="温馨提示" type="warning" effect="dark" :closable="true" @click="kefu()" description="因近期点亮乡村名片用户较多,如果您有意向帮助您家乡完善名片并发布上线,点击此公告请联系客服,免费为您提供使用指导服务."></u-alert>
			</view>
			<view class="content_menu">
				<view class="menu_list" v-for="(item, index) in menu_list" :key="index" @click="clickmenu(item)">
					<view class="list_img"><image :src="item.img + mySuffix[1]" mode=""></image></view>
					<view class="list_title">
						<text>{{ item.title }}</text>
					</view>
					<view class="list_desc">
						<text>{{ item.desc }}</text>
					</view>
				</view>
			</view>
			<u-gap height="100" bgColor="#f1f1f1"></u-gap>
			<view class="content_bottom" v-if="currentRural.status != 1">
				<!-- 用户名片状态是非 已上线状态就显示
				 点击发布，其实就是执行名片修改状态，把0改成2
				 发布完会刷新当前页面，则状态变成2，按钮不能点击就显示 名片发布审核中。
				 如果名片状态3审核驳回，如果是审核驳回就把上面这行文字，显示名片的一个驳回字段
				 如果名片上线后，这整一块不显示
				 驳回 按钮会显示  重新发布
				 -->
				<view
					class=""
					style="text-align: center;padding: 20rpx 0;font-size: 28rpx;border-top: 1rpx solid #eee;"
				>
					<text>{{ tipStr }}</text>
				</view>
				<view class="button">
					<u-button :text="btnStr" :disabled="currentRural.status == 2" @click="submit(2)"></u-button>
					<!-- <u-button :text="0" @click="submit(0)"></u-button>
					<u-button :text="1" @click="submit(1)"></u-button>
					<u-button :text="2" @click="submit(2)"></u-button>
					<u-button :text="3" @click="submit(3)"></u-button> -->
				</view>
			</view>
		</view>
		<!-- <button @click="aaa">xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</button> -->
	</view>
</template>

<script>
import {
	apiBusinessCardEdit_Put,
	apiBusinessCardInfo_Get,
	apiBusinessCardPage_Post,
	apiBusinessCardMyRural_Get,
	apiBusinessCardGetJoinNumcardId_Get,
	apiBusinessCardGetPageviewscardId_Get
} from '@/API/乡村名片.js';
import { apiBusinessRoleApplyApply_Post, apiBusinessRoleApplyPage_Get } from '@/API/名片角色62.js';
import { apiBusinessMemberInfo_Get, apiBusinessMemberEdit_Put } from '@/API/用户会员接口.js';
const imgBaseUrl = getApp().globalData.imgBaseUrl + '/app';
const imgSuffix = getApp().globalData.imgSuffix;
import { mapState, mapMutations } from 'vuex';
export default {
	computed: {
		...mapState('build', ['currentRural']),
		naviStyle() {
			return this.isTop ? { bg: '#00000000', colo: '#fff' } : { bg: '#ffffffcc', colo: '#797979' };
		},
		tipStr() {
			try {
				return this.currentRural.status == 0
					? '名片需先发布审核通过后即可上线'
					: this.currentRural.status == 2
					? '名片审核需要1-3天，请耐心等待'
					: this.currentRural.status == 3
					? '审核驳回:【信息不完整】'
					: '';
			} catch (e) {
				return '';
				//TODO handle the exception
			}
		}
	},
	watch: {
		currentRural(newValue) {
			try {
				if (newValue) {
					this.btnStr =
						newValue.status == 0
							? '发布名片'
							: newValue.status == 2
							? '名片审核中'
							: newValue.status == 3
							? '重新发布'
							: '';
				}
			} catch (e) {}
		}
	},
	data() {
		return {
			btnStr: '发布名片',
			mySuffix: imgSuffix,
			isTop: true, //是否在顶部
			imgBaseUrl: imgBaseUrl,
			welcome_text: '欢迎您参与乡村共建，请点击左上角“加入乡村”,加入后才可以参与共建哦~',
			bannerimg: [],
			menuwidth: 0,
			show: true,
			desc: false,
			bartext: ['平台刚刚同步了最新乡村数据，欢迎共建'],
			userInfo: getApp().globalData.userInfo,
			menu_list: [
				{
					id: 0,
					title: '乡村基本信息',
					desc: '本村宣传基础信息介绍',
					img: imgBaseUrl + '/static/index_nav_2.png',
					url: '/subpages/build/rural_info/rural_info'
				},
				
				{
					id: 1,
					title: '名片模块化设计',
					desc: '本村名片页DIY模块化',
					img: imgBaseUrl + '/static/rural_home_nav7.png',
					url: '/subpages/build/rural_diy/rural_diy'
				},
				{
					id: 2,
					title: '名片魔方导航',
					desc: '名片首页魔方导航设计',
					img: imgBaseUrl + '/static/rural_home_nav9.png',
					url: '/subpages/build/rural_info/info_navmagic'
				},
				{
					id: 3,
					title: '名片资讯管理',
					desc: '管理用户发布的资讯',
					img: imgBaseUrl + '/static/rural_home_nav2.png',
					url: '/subpages/build/rural_news/rural_news'
				},
				{
					id: 4,
					title: '地图向导配置',
					desc: '乡村地图乡村基础配置',
					img: imgBaseUrl + '/static/index_nav_11.png',
					url: '/subpages/build/rural_info/info_map'
				},
				{
					id: 4,
					title: '向导位置管理',
					desc: '地图坐标标注位置管理',
					img: imgBaseUrl + '/static/index_nav_5.png',
					url: '/subpages/build/rural_map/rural_map'
				},
				{
					id: 5,
					title: '手绘增强地图',
					desc: '可在地图上自定义图层',
					img: imgBaseUrl + '/static/rural_home_nav4.png',
					url: '/subpages/build/rural_map/map_drawn'
				},
				{
					id: 6,
					title: '乡村图集管理',
					desc: '本村图片视频管理',
					img: imgBaseUrl + '/static/rural_home_nav1.png',
					url: '/subpages/build/rural_photo/rural_photo'
				}, 
				{
					id: 7,
					title: '名片留言管理',
					desc: '管理用户发布的资讯',
					img: imgBaseUrl + '/static/index_nav_9.png',
					url: '/subpages/build/rural_message/rural_message'
				},
				{
					id: 8,
					title: '乡村好物管理',
					desc: '管理本村村民发布的好物',
					img: imgBaseUrl + '/static/rural_home_nav6.png',
					url: '/subpages/build/rural_service/rural_service'
				},
				{
					id: 9,
					title: '路线规划管理',
					desc: '自定义地图路线规划管理',
					img: imgBaseUrl + '/menuIcon/menu%20(153).png',
					url: '/subpages/build/rural_planning/rural_planning'
				},
			],
			cardId: '',
			sysRole: [],
			pv: null,
			userNum: null,
			pagesHeight: 2000,
			pagesWidth: null,
			loading: true,
			userStatus: null,
			applicationText: ''
		};
	},

	onLoad: function(option) {
		this.cardId = option.cardid != undefined ? option.cardid : option.cardId != undefined ? option.cardId : -1;
		if (this.cardId == -1) {
			console.warn('cardId无效，非法跳转', this.cardId);
			uni.navigateBack({ delta: 1 });
			return;
		}
		this.getruralinfo();
		// 获取导航栏高度
		let menu = wx.getMenuButtonBoundingClientRect();
		this.menuwidth = menu.width + menu.width / 7;

		let sysInfo = getApp().globalData.sysInfo;

		this.pagesWidth = sysInfo.windowWidth;
		this.pagesHeight = sysInfo.windowHeight;

		this.getData1();
		this.getData2();
	},
	onReady() {},
	methods: {
		kefu(){
			wx.openCustomerServiceChat({
				extInfo: { url: 'https://work.weixin.qq.com/kfid/kfc0c2a44f97c4dbade' },
				corpId: 'ww03db49f5e1dad3f3',
				success(res) {}
			});
			uni.hideLoading();
			return;
		},
		aaa() {
			uni.navigateTo({
				url: '/subpages/card/card_news/card-list-news'
			});
		},
		...mapMutations('build', ['setCurrentRural_all']),
		// 获取申请
		getApplicationList() {
			apiBusinessRoleApplyPage_Get({
				cardId: this.cardId
			}).then(res => {
				// console.log('用户申请乡村的权限状态列表', res.data.data.records);
				//过滤已审核的列表状态
				// let enable = res.data.data.records.filter(value => {
				// 	return value.status != 1;
				// });
				let enable = res.data.data.records;
				// console.log('用户状态列表', enable);
				if (enable != 0) {
					this.userStatus = enable[0].status;
				}
				//修改驳回信息
				if (this.userStatus == 2) {
					this.applicationText = enable[0].failMag;
				}
			});
		},
		//获取当前乡村数据
		getData1() {
			apiBusinessCardGetPageviewscardId_Get({
				cardId: this.cardId
			}).then(res => {
				// console.log(res.data.data);
				this.pv = res.data.data;
			});
		},
		getData2() {
			apiBusinessCardGetJoinNumcardId_Get({
				cardId: this.cardId
			}).then(res => {
				// console.log(res.data.data);
				this.userNum = res.data.data;
			});
		},
		getruralinfo() {
			uni.showLoading({
				icon: 'none',
				title: '初始化布局中'
			});

			new Promise((resolve, reject) => {
				apiBusinessCardInfo_Get({ cardId: this.cardId }).then(res => {
					// console.log('获取乡村数据', res);
					if (res.data.data.images != null) {
						let imgJSON = JSON.parse(res.data.data.images);
						this.bannerimg = imgJSON.map(value => value.imgUrl);
					}
					if (res.data.code == 200 && res.data.msg.indexOf('成功') != -1) {
						this.setCurrentRural_all(res.data.data);
						this.userCheck();
						resolve();
					} else {
						reject('乡村数据——请求异常');
					}
				});
			})
				.catch(err => {
					console.warn('本村数据异常', err);
					this.show = false;
				})
				.finally(() => {
					uni.hideLoading();
					this.getApplicationList();
				});
		},
		//刷新
		refresh(para) {
			// console.log('传输数据', para);
			apiBusinessMemberEdit_Put({ name: para }).then(res => {
				// console.log('修改用户姓名', res);
				this.getruralinfo();
			});
		},
		/* 检测用户 */
		userCheck() {
			if (this.userInfo == null) {
				//判断用户是否已经登录 拿他的权限信息 是否加入这个乡村
				// this.tabbarChange(3);
			}
			apiBusinessCardMyRural_Get({
				cardId: this.cardId
			}).then(res => {
				console.log('请求检测用户是否在本村', res);
				// 本村
				if (res.data.code == 200) {
					// console.log('在本村');
					this.sysRole = res.data.data[0].sysRole;
					if (this.sysRole.roleId != 103 && this.currentRural.status == 1) {
						this.show = false;
						this.welcome_text = '很抱歉，本村名片已上线，目前仅乡村管理员才可使用乡村名片管理端功能。';
					}
					if (this.sysRole.roleId == 103) {
						this.show = true;
						this.welcome_text = '';
					}
					if (this.currentRural.status != 1) {
						this.show = true;
						this.welcome_text =
							'当前名片未还未发布，加入本村的成员都可进入名片管理页设计装修本村名片,名片上线后需申请管理员才能再次进到本页面。';
					}
					this.loading = false;
					return res;
				}
				// 非本村
				if (res.data.code == 500) {
					// console.log('不在本村');
					this.show = false;
					this.sysRole = [];
					return -1;
				}
				// 没有登录
				if (res.data.code == 401) {
					// console.log('没有登录');
					this.show = false;
					uni.navigateTo({
						url: '/subpages/login/login'
					});
					return -1;
				}
			});
		},

		clickmenu(e) {
			if (e.url == "/subpages/build/rural_planning/rural_planning") {
				uni.showModal({
					title: '温馨提示',
					content: "该功能目前仅对部分村开放内测使用，尽请期待。",
					showCancel: false,
					confirmColor: '#04c354',
					confirmText: '我知道了'
				});
				return
			}
			
			if (e.url.length != 0) {
				uni.navigateTo({
					url: e.url + '?cardId=' + this.cardId
				});
			}
		},
		navhome() {
			uni.switchTab({
				url: '/pages/build/buildad'
			});
		},
		navleft() {
			uni.navigateTo({
				url: '../myrural/rural_list'
			});
		},
		navright() {
			uni.redirectTo({
				url: '/subpages/card/card?cardId=' + this.cardId
			});
			// uni.navigateTo({
			// 	url: '/subpages/card/card?cardId=' + this.cardId
			// });
		},
		submit(e) {
			let sta = null;
			if (e) {
				sta = e;
			}
			apiBusinessCardEdit_Put({ status: sta ? sta : 2, cardId: this.currentRural.cardId }).then(res => {
				console.log(res);
				this.getruralinfo();
			});
		}
	},
	onPageScroll(e) {
		this.isTop = e.scrollTop < 20;
	}
};
</script>

<style lang="scss">
page {
	background: #f1f1f1;
	height: 100%;
	width: 100%;
}

.page {
	height: 100%;
	width: 100%;
}

.u-nav-slot_left {
	display: flex;
	padding: 10rpx 20rpx;
	border-radius: 30rpx;
	border: 1rpx solid #ffffff9e;
	.name {
		font-size: 28rpx;
		font-family: 'SourceHanSerifCN-Bold';
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

//背景图片
.top_bg {
	width: 100%;
	position: fixed;
	top: 0;
	height: 650rpx;
	z-index: -1;
	border-radius: 0rpx 0rpx 36rpx 36rpx;
	filter: blur(1px);
}
.top_bg::before {
	content: '';
	position: absolute;
	background: linear-gradient(to bottom, #e3eceb00, #f9f9f9);
	width: 100%;
	height: 100%;
	left: 0;
	bottom: 0;
	margin: 0;
	border-radius: 0rpx 0rpx 36rpx 36rpx;
}

.nobuild {
	margin: 10rpx 30rpx;

	.welcome_text {
		font-size: 32rpx;
		color: #fff;
		text-align: center;
	}
}

.content_nav {
	margin: 20rpx 20rpx 20rpx 20rpx;
	padding: 50rpx 30rpx;
	background-color: #fff;
	border-radius: 20rpx;
	z-index: 2;
	display: flex;
	flex-direction: column;
	background: url('https://cdn.xiangcunmingpian.com/app/static/build_nav_bg.jpg?x-oss-process=style/p20')
		100% 60%;
	justify-content: center;

	.nav_one {
		display: flex;
		justify-content: space-between;
		font-size: 38rpx;
		font-family: 'SourceHanSerifCN-Bold';
		margin-bottom: 10rpx;
	}

	.nav_two {
		display: flex;
		justify-content: space-between;
		font-size: 28rpx;
		color: #383838;
		margin-bottom: 10rpx;
	}

	.nav_three {
		display: flex;
		justify-content: space-between;
		font-size: 28rpx;
		color: #383838;
	}
}

.content_data {
	margin: 25rpx;
	display: flex;
	justify-content: space-between;
	.data_list {
		display: flex;
		background: #fff;
		padding: 30rpx;
		border-radius: 20rpx;
		width: 40%;
		justify-content: space-between;

		.list_text {
			.title {
				font-size: 32rpx;
				font-family: 'SourceHanSerifCN-Bold';
				margin-bottom: 5rpx;
			}

			.number {
				font-size: 28rpx;
			}
		}

		.img {
			image {
				width: 80rpx;
				height: 80rpx;
			}
		}
	}
}

.content_noticebar {
	margin: 25rpx;

	.u-notice-bar {
		border-radius: 20rpx;
	}
}

.content_menu {
	display: flex;
	margin: 25rpx;
	flex-flow: wrap;
	justify-content: space-between;

	.menu_list {
		display: flex;
		justify-content: space-between;
		padding: 40rpx 30rpx;
		border-radius: 20rpx;
		width: 40%;
		background: #fff;
		margin-bottom: 20rpx;
		flex-direction: column;

		.list_img {
			image {
				width: 80rpx;
				height: 80rpx;
			}
		}

		.list_title {
			font-size: 32rpx;
			font-family: 'SourceHanSerifCN-Bold';
			margin: 8rpx 0;
		}

		.list_desc {
			font-size: 26rpx;
		}
	}
}
.content_bottom {
	position: fixed;
	bottom: 0rpx;
	background: #fff;
	width: 100%;
	.button {
		display: flex;
		width: 80%;
		margin: 0rpx auto 40rpx auto;
	}
}
</style>
