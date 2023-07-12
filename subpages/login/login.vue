<template>
	<view class="page">
		<view class="top_bg">
			<view class="box"></view>
			<u-swiper :list="bgimg" height="900" duration="600"></u-swiper>
		</view>
		<u-navbar
			title="登录"
			:autoBack="true"
			:placeholder="true"
			bgColor="#ffffff00"
			leftIconColor="#fff"
			:titleStyle="{ color: '#fff' }"
		></u-navbar>
		<view class="content_welcome">
			<view class="welcome_text" v-if="mode == 0">
				<u-transition mode="fade-down" :show="true" duration="500">
					<text>共建家乡名片</text>
					<text>一起助力乡村振兴</text>
				</u-transition>
			</view>
			<view class="login_text" v-if="mode == 1">
				<u-transition mode="fade-down" :show="true" duration="500">
					<view class="title"><text>账号密码登录</text></view>
					<view class="sutitle"><text>欢迎您使用乡村名片平台</text></view>
				</u-transition>
			</view>
		</view>
		<view class="content_login" v-if="mode == 1">
			<view class="account">
				<u--input
					placeholder="请输入账号"
					v-model="account"
					shape="circle"
					color="#fff"
					:focus="true"
				></u--input>
			</view>
			<view class="password">
				<u--input placeholder="请输入密码" v-model="password" shape="circle" color="#fff" password></u--input>
			</view>
			<view class="">
				<u-button
					text="登录"
					shape="circle"
					:customStyle="{ background: '#2aae67', borderColor: '#2aae67' }"
					color="#fff"
					@click="login()"
					:hairline="false"
				></u-button>
			</view>
			<view class=""></view>
		</view>
		<view class="content_button">
			<view class="button_list" @tap="wechatlogin()">
				<u-icon name="weixin-fill" size="22" color="#07c160"></u-icon>
				<text>微信一键登录注册</text>
			</view>
			<view class="button_list" @tap="showlogin()" v-if="mode == 0">
				<u-icon name="fingerprint" size="22"></u-icon>
				<text>账号密码登录</text>
			</view>
		</view>
		<!-- 底部弹出绑定手机 -->
		<u-popup :show="register_popup" round="20" duration="600" bgColor="transparent">
			<view class="content_register">
				<view class="invitation">
					<view class="register_title"><text>乡村共建邀请函</text></view>
					<view class="register_back" @click="backPage()"><text>不用了</text></view>
					<view class="register_text">
						<text>尊敬的 {{ userInfo.nickName }} :</text>
						<text>在这里您可以一起参与乡村共建</text>
						<text>例如乡村宣传、帮扶、义教、带货等</text>
						<text>这里有待挖掘美丽/需帮扶的乡村</text>
						<text>为您提供乡村导航及乡村百科</text>
						<text>希望与您一起助力乡村发展</text>
					</view>
				</view>
				<view class="register_fold">
					<view class="fold_left"></view>
					<view class="fold_right"></view>
				</view>

				<view class="register_content">
					<view class="text"><text>已有 16411 位乡村共建者加入</text></view>
					<view class="button">
						<u-button
							open-type="getPhoneNumber"
							@getphonenumber="getPhoneNumber"
							text="注册并加入"
							shape="circle"
							:customStyle="{ background: '#ff2b48', borderColor: '#ff2b48' }"
							color="#fff"
							:hairline="false"
						></u-button>
					</view>
					<view class="agreement"><text>注册即同意《乡村名片用户使用协议》</text></view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
import {
	apiBusinessMemberUsernameLogin_Post,
	apiBusinessMemberInfo_Get,
	apiBusinessMemberWxLogin_Post,
	apiBusinessMemberLoginWxRegister_Post,
	apiBusinessMemberLoginWx_Post
} from '@/API/用户会员接口.js';
const imgBaseUrl = getApp().globalData.imgBaseUrl + '/app' + '/static/';
const imgSuffix = getApp().globalData.imgSuffix;
export default {
	data() {
		return {
			bgimg: [`${imgBaseUrl}login_bg_2.jpg${imgSuffix[0]}`, `${imgBaseUrl}login_bg_4.jpg${imgSuffix[0]}`],
			register_popup: false,
			mode: 0, //1为账号密码登录
			userInfo: getApp().globalData.userInfo,
			account: '',
			password: '',
			/* quickLoginData: {//之前第一次登录接口用的数据
				wxCode: '',
				appId: 'wxbabacacc5e9088e8',
				encryptedData: '',
				iv: ''
			}, */
			onekeyLoginData: {
				//目前一键登录接口的数据
				wxCode: '',
				nickName: '',
				appId: 'wxbabacacc5e9088e8',
				sex: '',
				encryptedData: '',
				avatar: '',
				iv: ''
			},
			pageBackUrl: '', //上级页面返回路径
			cardId: null, //接受其他页面返回过来的乡村名片ID
			ruralid: null //接受乡村点亮页面返回过来的五级联动ID
		};
	},
	computed: {
		/* 跳转方式 */
		toLoginType() {
			return this.$store.state.login.toLoginType;
		}
	},
	onLoad(option) {
		this.cardId = option.cardid != undefined ? option.cardid : option.cardId != undefined ? option.cardId : null;
		this.ruralid = option.ruralid;
		if (option.type == 'getPhoneNumber') {
			this.register_popup = true;
		}
	},
	onShow() {
		let route = [].concat(getCurrentPages());
		let lastRoute = route[route.length - 2].route;
		console.log('上级路径', lastRoute, '跳转方式', this.toLoginType);

		if (lastRoute == 'pages/user/user_setting/user_setting') {
			lastRoute = 'pages/user/user';
		}
		this.pageBackUrl = '/' + lastRoute;
	},
	methods: {
		showpopup() {
			this.register_popup = true;
		},
		showlogin() {
			this.mode = 1;
		},
		login() {
			if (this.account.length == 0) {
				uni.showToast({ icon: 'none', title: '请输入账号' });
			} else if (this.password.length == 0) {
				uni.showToast({ icon: 'none', title: '请输入密码' });
			} else {
				apiBusinessMemberUsernameLogin_Post({
					username: this.account,
					password: this.password
				})
					.then(res => {
						console.log('账号密码登录请求结果:', res);
						if (res.data.code == 700 || res.data.code == 703 || res.data.code == 500) {
							uni.showToast({ icon: 'none', title: '账号不存在或密码不正确' });
							return Promise.reject(res);
						} else if (res.data.code == 200) {
							uni.showToast({ icon: 'none', title: '登录成功' });
							this.saveToken(res.data.token);
							return Promise.resolve(res);
						} else {
							return Promise.reject(res);
						}
					})
					.then(res => {
						// 登录获取用户信息
						apiBusinessMemberInfo_Get().then(res => {
							console.log('用户登录信息', res);
							if (res.data.code == 200) {
								getApp().saveUserInfor(res);
								this.backPage();
							}
						});
					})
					.catch(err => {
						console.warn('请求结果异常', err);
					});
			}
		},

		/* 点击微信登录 */
		wechatlogin() {
			new Promise((resolve, reject) => {
				uni.getUserProfile({
					desc: '登录后可同步数据',
					// 点击允许
					success: loginres => {
						console.log('登录信息', loginres);
						let sex = loginres.userInfo.gender;
						this.onekeyLoginData.encryptedData = loginres.encryptedData;
						this.onekeyLoginData.iv = loginres.iv;
						this.onekeyLoginData.avatar = loginres.userInfo.avatarUrl;
						this.onekeyLoginData.sex = sex.toString();
						this.onekeyLoginData.nickName = loginres.userInfo.nickName;
						// this.userInfo = loginres.userInfo;
						resolve();
					},
					// 点击取消
					fail: () => {
						uni.showToast({ title: '授权已取消/获取微信失败', icon: 'none' });
						reject('取消授权');
					}
				});
			})
				.then(() => {
					uni.showLoading({ title: '登录中' });
					return new Promise((resolve, reject) => {
						uni.login({
							success: res => {
								console.log('获取wxcode：', res);
								if (res.errMsg == 'login:ok') {
									this.onekeyLoginData['wxCode'] = res.code;
									resolve(res.code);
								}
							},
							fail: err => {
								reject('code请求失败');
							}
						});
					});
				})
				.then(() => {
					return new Promise((resolve, reject) => {
						apiBusinessMemberLoginWxRegister_Post(this.onekeyLoginData).then(res => {
							console.log('登录请求:', res);
							if (res.data.code == 200) {
								uni.showToast({ title: '登陆成功', type: 'success' });
								this.saveToken(res.data.token);
								resolve(200);
							} else if (res.data.code != 200) {
								// 虚假提示
								uni.showToast({ title: '网络异常，请重试', icon: 'none' });
								reject('登录请求失败');
							}
						});
					});
				})
				.then(result => {
					if (result == 200) {
						apiBusinessMemberInfo_Get().then(res => {
							console.log('请求用户登录信息', res);
							if (res.data.code == 200) {
								getApp().saveUserInfor(res);
								this.backPage();
							}
						});
					}
				})
				.catch(err => {
					console.warn('Promise中断原因：', err);
				})
				.finally(() => {
					uni.hideLoading();
				});
		},
		/* wechatlogin() {
			new Promise((resolve, reject) => {
				uni.getUserProfile({
					desc: '登录后可同步数据',
					// 点击允许
					success: loginres => {
						console.log('登录信息', loginres);
						this.quickLoginData.encryptedData = loginres.encryptedData;
						this.quickLoginData.iv = loginres.iv;
						this.userInfo = loginres.userInfo;
						resolve();
					},
					// 点击取消
					fail: () => {
						uni.showToast({ title: '授权已取消/获取微信失败', icon: 'none' });
						reject('取消授权');
					}
				});
			})
				.then(() => {
					return new Promise((resolve, reject) => {
						uni.login({
							success: res => {
								console.log('获取wxcode：', res);
								if (res.errMsg == 'login:ok') {
									this.quickLoginData.wxCode = res.code;
									resolve(res.code);
								}
							},
							fail: err => {
								reject(-1);
							}
						});
					});
				})
				.then(() => {
					return new Promise((resolve, reject) => {
						apiBusinessMemberLoginWx_Post(this.quickLoginData).then(res => {
							console.log('登录请求:', res);
							if (res.data.code == 200) {
								uni.showToast({ title: '登陆成功', type: 'success' });
								this.saveToken(res.data.token);
								resolve(200);
							} else if (res.data.code != 200) {
								// 虚假提示
								uni.showToast({ title: '网络异常，请重试', icon: 'none' });
								reject('第一次请求失败');
							}
						});
					});
				})
				.then(result => {
					if (result == 200) {
						apiBusinessMemberInfo_Get().then(res => {
							console.log('请求用户登录信息', res);
							if (res.data.code == 200) {
								getApp().saveUserInfor(res);
								this.backPage();
							}
						});
					}
				})
				.catch(err => {
					console.warn('Promise中断原因：', err);
				});
		}, */

		// 微信注册
		weChatRegister(para) {},
		getPhoneNumber(e) {
			console.log(e);
			new Promise((resolve, reject) => {
				uni.login({
					success(res) {
						console.log('uni请求结果', res);
					}
				});
			});
		},

		/* 设置 缓存、全局token */
		saveToken(token) {
			getApp().globalData.token = token;
			uni.setStorageSync(getApp().globalData.storageKey.token, token);
		},
		/* 返回上一页 */
		backPage() {
			// 区分 tabbar、普通页
			if (
				this.pageBackUrl == '/pages/user/user' ||
				this.pageBackUrl == '/pages/build/buildad' ||
				this.pageBackUrl == '/pages/index/index'
			) {
				uni.switchTab({ url: this.pageBackUrl });
			} else {
				// 先判断特殊路由模式
				if (this.toLoginType.router) {
					if (this.toLoginType.router == 'card') {
						this.$store.commit('login/setToLoginType', {});
						uni.navigateBack({ delta: 1 });
					} else if (this.cardId != null) {
						//带参返回card
						uni.navigateTo({ url: this.pageBackUrl + '?cardId=' + this.cardId + '&page=3' });
					}
				} else {
					if (this.ruralid != null) {
						console.log('带参返回点亮');
						uni.navigateBack({ delta: 1 });
					} else {
						// 其他
						uni.redirectTo({ url: this.pageBackUrl });
					}
				}
			}
		}
	}
};
/* 转正备用
 if (res.data.data.type == 'member') {
 	that.register_popup = true;
 	uni.setStorageSync('userinfo', res.data);
 }
 if (res.data.data.type == 'user') {
 	that.register_popup = true;
 	uni.setStorageSync('userinfo', res.data);
 	uni.switchTab({
 		url: '../index/index'
 	});
 }
 */
</script>

<style lang="scss">
//背景图片
.top_bg {
	width: 100%;
	position: fixed;
	top: 0;
	z-index: -1;
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
}

page {
	background: #f1f1f1;
	height: 100%;
	width: 100%;
}

.page {
	height: 100%;
	width: 100%;
	position: relative;
}

.content_welcome {
	margin: 80rpx 80rpx 50rpx 80rpx;
	.welcome_text {
		display: flex;
		text-align: center;
		justify-content: center;
		font-size: 48rpx;
		color: #fff;
		line-height: 70rpx;
		font-weight: 500;
	}
	.login_text {
		.title {
			display: flex;
			text-align: left;
			justify-content: left;
			font-size: 48rpx;
			color: #fff;
			line-height: 70rpx;
			font-weight: 500;
		}
		.sutitle {
			display: flex;
			text-align: left;
			justify-content: left;
			font-size: 28rpx;
			color: #fff;
			line-height: 70rpx;
			font-weight: 500;
		}
	}
}

.content_login {
	margin: 40rpx 80rpx;
	.account {
		margin-bottom: 30rpx;
	}
	.password {
		margin-bottom: 30rpx;
	}
}

.content_button {
	position: fixed;
	bottom: 200rpx;
	width: 60%;
	padding: 0 20%;
	.button_list {
		width: 100%;
		height: 78rpx;
		line-height: 78rpx;
		background: #fff;
		border-radius: 50rpx;
		opacity: 0.9;
		font-size: 30rpx;
		text-align: center;
		margin-bottom: 30rpx;
		display: flex;
		justify-content: center;
	}
}

.content_register {
	// padding:30rpx;
	height: 600rpx;
	background: #fce3e6;
	border-radius: 20rpx;
	.invitation {
		position: relative;
		margin-top: -200rpx;
		margin-left: 30rpx;
		margin-right: 30rpx;
		padding: 30rpx;
		height: 500rpx;
		// background: #fff;
		border-radius: 20rpx;
		box-shadow: 0 1px 2px #dadada;
		background: #fff;
		background: linear-gradient(#ffffff 46%, #00000005 100%);
		.register_title {
			font-size: 42rpx;
			font-family: 'SourceHanSerifCN-Bold';
			color: #000;
		}
		.register_back {
			font-size: 32rpx;
			position: absolute;
			font-weight: 500;
			right: 30rpx;
			top: 35rpx;
			color: #8c8c8c;
		}
		.register_text {
			padding: 20rpx 0;
			display: flex;
			flex-flow: column;
			object-position: top;
			text {
				height: 70rpx;
				line-height: 70rpx;
				border-bottom: 1rpx #e2e1e1 dashed;
				color: #5d5d5d;
			}
		}
	}
	.register_fold {
		position: relative;
		margin-top: -20rpx;
		.fold_left {
			position: absolute;
			border-style: solid;
			border-width: 0px 400px 40px 0px;
			border-color: transparent transparent #b0b0b02b transparent;
			z-index: 3;
			margin-top: -20rpx;
			top: 0;
		}
		.fold_left::before {
			content: '';
			position: absolute;
			border-style: solid;
			border-width: 0px 400px 40px 0px;
			border-color: transparent transparent #fedbe1 transparent;
			z-index: -1;
			margin-top: 3rpx;
			top: 0;
		}
		.fold_right {
			position: absolute;
			border-style: solid;
			border-width: 0 0 40px 400px;
			border-color: transparent transparent #ffd9df transparent;
			z-index: 1;
			margin-top: -20rpx;
			top: 0;
		}
	}

	.register_content {
		height: 100%;
		background-color: #fedbe1;
		margin-top: 30rpx;
		padding: 30rpx;
		padding-top: 50rpx;
		text-align: center;
		font-size: 600;
		display: flex;
		flex-direction: column;
		justify-content: normal;
		.button {
			width: 60%;
			height: 70rpx;
			line-height: 70rpx;
			// background:#ff2b48;
			border-radius: 50rpx;
			color: #fff;
			justify-items: center;
			margin: 34rpx auto;
		}
		.agreement {
			font-size: 26rpx;
		}
	}
}
</style>
