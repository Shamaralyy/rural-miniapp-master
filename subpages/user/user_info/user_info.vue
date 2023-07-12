<template>
	<view class="">
		<u-picker
			:show="pickerShow"
			:defaultIndex="[Number(userInfo.sex)]"
			:columns="sexColumns"
			@confirm="getSex"
			@cancel="pickerShow = false"
		></u-picker>
		<view class="content_header">
			<view class="avatar" @click="newAvatarSelect"><u-avatar :src="showAvatarUrl" size="64"></u-avatar></view>
			<view class="user_info">
				<view class="name" @click="toEditPage('nickName')">
					<text>{{ userInfo.nickName }}</text>
				</view>
			</view>
			<view class="edit" @click="toEditPage('nickName')"><u-icon name="edit-pen"></u-icon></view>
		</view>
		<u-gap height="10" bgColor="#ededed"></u-gap>
		<view class="content_info">
			<view class="info_list" v-for="(item, index) in info_list" :key="index" @click="clicklist(item)">
				<view class="title">
					<text>{{ item.title }}</text>
				</view>
				<view class="value">
					<text>{{ showData(item.type) }}</text>
					<u-icon name="arrow-right" color="#0b0202" size="16"></u-icon>
				</view>
			</view>
		</view>
		<!-- 获取手机号 -->
		<view class="exit" v-if="false">
			<u-button type="success" shape="circle" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">
				更新手机号
			</u-button>
		</view>
		<!-- 退出 -->
		<view class="exit" v-if="isShowExit">
			<u-button type="error" :text="'退出' + rural_info.name" shape="circle" @click="exit"></u-button>
		</view>
	</view>
</template>

<script>
import {
	apiBusinessMemberEdit_Put,
	apiBusinessMemberInfo_Get,
	apiBusinessMemberDecryptPhone_Post //解析手机号
} from '@/API/用户会员接口.js';
import { apiBusinessCardExit_Post } from '@/API/乡村名片.js';
import { mapState } from 'vuex';
export default {
	data() {
		return {
			info_list: [
				{
					title: '绑定手机',
					type: 'phone'
				},
				{
					title: '性别',
					type: 'sex'
				},
				{
					title: '真实姓名',
					type: 'name'
				}
				/*{
					title: '个人简介',
					type: 'descriPtion'
				} */
			],
			pickerShow: false,
			sexColumns: [['保密', '男', '女']],
			userInfo: getApp().globalData.userInfo,
			tempAvatar: '',
			isNewAvatar: false
		};
	},
	computed: {
		/* 当前显示头像 */
		showAvatarUrl() {
			return this.isNewAvatar ? this.tempAvatar : this.userInfo.avatar;
		},
		showData(type) {
			return type => {
				let tempData = '';
				switch (type) {
					case 'sex':
						tempData =
							this.userInfo.sex == 0
								? '保密'
								: this.userInfo.sex == 1
								? '男'
								: this.userInfo.sex == 2
								? '女'
								: '其他';
						break;
					case 'phone':
						tempData =
							this.userInfo.phonenumber.length < 5 || this.userInfo.phonenumber == ''
								? '暂无'
								: this.userInfo.phonenumber;
						break;
					case 'name':
						tempData =
							this.userInfo.name == '' || this.userInfo.name == null || this.userInfo.name == undefined
								? '点击填写'
								: this.userInfo.name;
						break;
					case 'descriPtion':
						tempData =
							this.userInfo.remark == '' || this.userInfo.remark == null ? '暂无' : this.userInfo.remark;
						break;
					default:
						tempData = '';
						break;
				}
				return tempData;
			};
		},
		/* 拿取本乡村数据 */
		rural_info() {
			return this.$store.state.build.currentRural;
		},
		/* 是否显示退出 */
		isShowExit() {
			return this.$store.state.login.toPageType;
		}
	},
	methods: {
		getPhoneNumber(e) {
			if (!e.detail.code) return;
			console.log('233', e.detail.code);
			let para_body = {
				appId: 'wxbabacacc5e9088e8',
				code: e.detail.code
			};
			apiBusinessMemberDecryptPhone_Post(para_body).then(res => {
				console.log('解析结果', res);
				if (res.code == 200) {
					uni.showToast({ icon: 'none', title: res.data.phoneNumber });
				}
			});
		},
		/* 带参跳转编辑页 */
		toEditPage(suffix) {
			uni.navigateTo({ url: './info_edit?type=' + suffix });
		},

		/* 点击事件 */
		clicklist(e) {
			console.log(e);
			//过滤
			if (e.type == 'descriPtion' || e.type == 'phone') {
				uni.showToast({ icon: 'none', title: '暂不支持修改' + e.title });
				return;
			}
			if (e.type == 'sex') {
				this.pickerShow = true;
				return;
			}
			this.toEditPage(e.type);
		},

		/* 更新数据 */
		refreshData() {
			if (this.userInfo != getApp().globalData.userInfo) {
				console.log('数据改变', this.userInfo);
				this.userInfo = getApp().globalData.userInfo;
			} else {
				console.log('数据不变', this.userInfo);
			}
		},

		/* 获取性别 */
		getSex(e) {
			uni.showToast({ icon: 'none', title: '修改中' });
			let para = { sex: e.indexs[0].toString() };
			this.saveChange(para);
		},

		/* 选择新头像 */
		async newAvatarSelect() {
			if (Object.keys(this.ossToken).length == 0) {
				const netResult = await this.getOssToken();
				/* 当前无法获取OSS签名 */
				if (netResult === false) {
					console.error('获取不到OSS签名，当前无法上传文件', netResult);
					return;
				} else {
					this.ossToken = netResult;
				}
			}
			console.log('取得上传签名', this.ossToken);

			new Promise((resolve, reject) => {
				uni.chooseImage({
					count: 1,
					success: res => {
						console.log('图片选择结果', res);
						const tempFilePaths = res.tempFiles[0]; //拿到选择的图片，是一个数组
						resolve(tempFilePaths);
					},
					fail: err => {
						reject(err);
					}
				});
			})
				.then(async file => {
					//图片接入风控
					const imgState = await this.safe_dataContentCheck(file, 'img');
					return new Promise((resolve, reject) => {
						console.log('xxxxx------结果判断', imgState);
						if (imgState) {
							resolve(file.path);
						} else {
							reject('风控不通过');
						}
					});
				})
				.then(pathResult => {
					//上传图片
					const ossTopPath = 'images/avatar/',
						suffix = '.jpg';
					const fileName = ossTopPath + uni.$u.guid(10) + suffix;

					this.ossToken.key = fileName;
					return new Promise((resolve, reject) => {
						uni.uploadFile({
							url: this.ossToken.host,
							filePath: pathResult,
							name: 'file',
							formData: this.ossToken,
							success: res => {
								resolve(this.ossToken.host + '/' + fileName);
							}
						});
					});
				})
				.then(imgResult => {
					//显示新头像
					this.tempAvatar = imgResult;
					this.isNewAvatar = true;
					return new Promise((resolve, reject) => {
						uni.showModal({
							content: '是否更改新头像',
							success: res => {
								if (res.confirm) {
									resolve();
								} else if (res.cancel) {
									this.isNewAvatar = false;
									reject();
								}
							}
						});
					});
				})
				.then(() => {
					let para = { avatar: this.tempAvatar };
					this.saveChange(para);
				})
				.catch(err => {
					console.log('阻断原因', err);
				});
		},

		/** 异步获取oss签名
		 * 请求成功  返回oss签名
		 * 请求异常	返回false
		 * */

		/* 保存修改 */
		saveChange(para) {
			new Promise((resolve, reject) => {
				apiBusinessMemberEdit_Put(para).then(res => {
					console.log('更新请求结果', res);
					if (res.data.code == 200) {
						resolve();
					} else {
						reject();
					}
				});
			})
				.then(() => {
					apiBusinessMemberInfo_Get().then(res => {
						console.log('用户登录信息', res);
						if (res.data.code == 200) {
							getApp().saveUserInfor(res);
							uni.showToast({ icon: 'success', title: '修改成功' });
							setTimeout(() => {
								this.refreshData();
								this.pickerShow = false;
							}, 100);
						}
					});
				})
				.catch(err => {
					console.error('用户信息更新异常');
					uni.showToast({ icon: 'error', title: '网络异常' });
				});
		},
		exit() {
			new Promise((resolve, reject) => {
				uni.showModal({
					title: '提示',
					confirmColor: '#f55850',
					cancelColor: '#39B54A',
					content: `退出${this.rural_info.name}后，需要重新进入`,
					success: res => {
						if (res.confirm) {
							console.log('comfirm'); //点击确定之后执行的代码
							resolve();
						} else {
							reject('点击取消');
						}
					}
				});
			})
				.then(() => {
					apiBusinessCardExit_Post({ cardId: this.rural_info.cardId }).then(res => {
						console.log('退出乡村结果', res);
						if (res.data.code == 200) {
							console.log('退出了');
						} else if (res.data.code == 500) {
						}
						let route = [].concat(getCurrentPages());
						let prePage = route[route.length - 2];
						prePage.$vm.pageState = 'refresh';

						uni.navigateBack({ delta: 1 });
					});
				})
				.catch(err => {
					console.err('取消原因', err);
				});
		}
	},
	onShow() {
		this.refreshData();
	},
	// 页面卸载 更改页面跳状态 隐藏退出按键
	onUnload() {
		this.$store.commit('login/setToPageType', false);
	}
};
</script>

<style lang="scss">
page {
	background: #f1f1f1;
}

//头部头像、姓名、等级、组织
.content_header {
	display: flex;
	padding: 40rpx;
	background-color: #fff;
	.avatar {
		margin-right: 30rpx;
		// border: 1rpx #8c8c8c solid;
		position: relative;
		.edit {
			position: absolute;
			bottom: 10rpx;
			right: 0rpx;
			background: #fff;
			border-radius: 20rpx;
			opacity: 0.9;
		}
	}

	.user_info {
		display: flex;
		flex-flow: column;
		justify-content: space-evenly;
		margin-left: 20rpx;
		.name {
			font-size: 42rpx;
			font-weight: 500;
		}
	}

	.edit {
		display: flex;
		flex-flow: column;
		justify-content: space-evenly;
		margin-top: 18rpx;
		margin-left: 10rpx;
	}
}

.content_info {
	padding: 0 40rpx;
	background-color: #fff;
	.info_list {
		display: flex;
		justify-content: space-between;
		padding: 30rpx 0rpx;
		border-bottom: 1rpx #f3f3f3 solid;
		.title {
			font-size: 32rpx;
		}
		.value {
			display: flex;
			color: #595959;
			width: 60%;
			justify-content: flex-end;
			font-size: 30rpx;
			text-align: right;
		}
	}
}
.exit {
	width: 50%;
	margin: 40px auto;
}
</style>
