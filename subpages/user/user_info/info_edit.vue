<template>
	<view class="">
		<view class="input" v-if="isShowInput">
			<u--input
				:placeholder="placeholder"
				border="surround"
				v-model="input_value"
				:maxlength="maxlength"
			></u--input>
		</view>
		<view class="textarea" v-if="editType == 'descriPtion'">
			<u--textarea v-model="input_value" placeholder="请输入内容"></u--textarea>
		</view>
		<view class="content_bottom">
			<view class="button"><u-button text="保存" @click="saveChange()"></u-button></view>
		</view>
	</view>
</template>

<script>
import { apiBusinessMemberEdit_Put, apiBusinessMemberInfo_Get } from '@/API/用户会员接口.js';
export default {
	data() {
		return {
			type: 'input',
			editType: '', //当前修改参数类型
			tip: '支持2~8个汉字',
			input_value: '',
			placeholder: '请输入内容',
			maxlength: 16,
			ab: null,
			userInfo: getApp().globalData.userInfo
		};
	},
	onLoad: function(option) {
		if (option.type == undefined) {
			this.errorExit();
		} else {
			console.log(option.type);
			this.editType = option.type;
			this.setShowStyle();
		}
	},
	computed: {
		isShowInput() {
			return this.editType == 'name' || this.editType == 'nickName' || this.editType == 'phone';
		}
	},
	methods: {
		errorExit() {
			uni.showToast({ icon: 'none', title: '非法操作' });
			setTimeout(() => {
				uni.navigateBack({ delta: 1 });
			}, 1000);
		},

		setShowStyle() {
			switch (this.editType) {
				case 'nickName':
					this.setInputStatus('昵称', 16, this.userInfo.nickName);
					break;
				case 'name':
					this.setInputStatus('姓名', 16, this.userInfo.name);
					break;
				case 'descriPtion':
					this.setInputStatus('个人简介', 100, this.userInfo.remark);
					break;
				case 'phone':
					this.setInputStatus('手机号', 11, this.userInfo.phonenumber);
					break;
				default:
					this.errorExit();
					break;
			}
		},

		/* 设置输入框状态 */
		setInputStatus(placeholder, maxLength, defaultInput) {
			this.placeholder = '请输入' + placeholder;
			this.maxlength = maxLength;
			this.input_value = defaultInput;
		},

		/* 获取请求参数 */
		getPara() {
			switch (this.editType) {
				case 'nickName':
					if (this.input_value.length == 0) {
						uni.showToast({ icon: 'error', title: '昵称不可为空' });
						return null;
					}
					return { nickName: this.input_value };
					break;
				case 'name':
					if (this.input_value.length == 0) {
						uni.showToast({ icon: 'error', title: '姓名不可为空' });
						return null;
					}
					return { name: this.input_value };
					break;

				// 获取手机参数
				case 'phone':
					if (this.input_value.length != 11) {
						uni.showToast({ icon: 'error', title: '手机号格式不正确' });
						return null;
					}
					return { phonenumber: this.input_value };
					break;
				case 'descriPtion':
					return { remark: this.input_value };
					break;
			}
		},
		/* 保存编辑 */
		async saveChange() {
			const para = this.getPara();
			if (!(await this.safe_dataContentCheck(para))) {
				return;
			}
			if (para == undefined || para == null) return;
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
								uni.navigateBack({});
							}, 1000);
						}
					});
				})
				.catch(err => {
					console.error('用户信息更新异常');
					uni.showToast({ icon: 'error', title: '修改失败 请重试' });
				});
		}
	}
};
</script>

<style lang="scss">
page {
	background: #f1f1f1;
}
.input {
	margin: 30rpx;
	background: #fff;
}

.textarea {
	margin: 30rpx;
}

.content_bottom {
	position: fixed;
	bottom: 10rpx;
	background: #fff;
	width: 100%;
	.button {
		display: flex;
		width: 80%;
		margin: 20rpx auto 40rpx auto;
	}
}
</style>
