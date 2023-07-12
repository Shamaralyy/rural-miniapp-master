<!-- 组件模板 -->
<template>
	<view>
		<view class="welcome_text">
			<u-notice-bar bgColor="#f56c6c90" color="#fdf6ec" :text="welcome_text"></u-notice-bar>
		</view>
		<view class="" style="margin-top: 20rpx;" v-if="userStatus == 2">
			<u-alert
				title="审核驳回:"
				type="warning"
				:closable="true"
				effect="light"
				:description="applicationText"
			></u-alert>
		</view>
		<view class="hello_content" v-if="userStatus == 0">
			<view class="desc">
				<view class="title"><text>您已经提交名片管理员申请正在审核中</text></view>
				<view class="desc">
					<text>审核说明:</text>
					<text>1、申请周期1-7个工作日,审核期间建议多参与名片的建设</text>
					<text>2、审核权重：村上级部门领导>村委干部>参与本村名片优秀共建者</text>
				</view>
			</view>
		</view>
		<view class="hello_content" v-if="userStatus == null || userStatus == 2">
			<view class="desc">
				<view class="title">
					<text>{{ currentRural.name }}名片管理员申请</text>
				</view>
				<view class="desc">
					<text>申请说明:</text>
					<text>
						1、本村名片所有权由：{{
							currentRural.ruralAddr.oldName
						}}及上级部门所属，名片支持多个管理员管理。
					</text>
					<text>2、管理员需公平公正维护名片内容，不出现偏袒部分用户/服务等，保证名片内容质量。</text>
					<text>
						3、平台评定标准以申请者贡献的内容及质量为主(拥有{{
							currentRural.ruralAddr.oldName
						}}及以上部门推荐证明除外)
					</text>
					<text>4、审核权重：村上级部门领导>村委干部>参与本村名片优秀共建者</text>
				</view>
			</view>
			<view class="content_name">
				<view class="nav"><text>申请人实名姓名</text></view>
				<view class="input">
					<u--input
						placeholder="请输入你的实名姓名"
						border="surround"
						v-model="name"
						@focus="desc = true"
						@blur="desc = false"
					></u--input>
				</view>
				<view class="desc" v-if="desc">
					<text>说明</text>
					<text>1、互联网监管要求发布及注册需进行实名认证</text>
					<text>2、平台不会展示您真实姓名，仅展示用户名称</text>
					<text>3、平台会对您的姓名及您微信进行一致性校验</text>
					<text>4、填写虚假姓名会直接影响你的平台账号使用</text>
					<text>5、本实名姓名与个人用户中心实名姓名相关联</text>
				</view>
			</view>

			<view class="content_type">
				<view class="nav"><text>申请原因</text></view>
				<view class="info">
					<u--textarea v-model="applyInfo.reason" placeholder="申请管理员原因,申请后会怎么做"></u--textarea>
				</view>
			</view>
			<view class="content_position">
				<view class="nav"><text>证明文件上传(非必填)</text></view>
				<text style="font-size: 26rpx;">
					如果您有{{ currentRural.ruralAddr.oldName }}及上级部门推荐或证明文件可以点击上传
				</text>
				<!-- <view class="info"><u-upload :fileList="fileList1" @afterRead="afterRead" @delete="deletePic" name="1" multiple :maxCount="10"></u-upload></view> -->
				<view class="info"><ru-file-upload @upPara="getImgData" paraGetMethods="active"></ru-file-upload></view>
			</view>
			<view class="button" @click="checkForm()"><text>立即申请</text></view>
		</view>
	</view>
</template>

<script>
import { apiBusinessRoleApplyApply_Post } from '@/API/名片角色62.js';
export default {
	name: 'ru-application-build',
	props: ['currentRural', 'userStatus', 'welcome_text', 'applicationText'],
	data() {
		return {
			name: getApp().globalData.userInfo.name,
			applyInfo: {
				reason: null /** 申请原因   string required: */,
				prove: null /** 证明材料   string required: */,
				isWhitelist: 1 /** 白名单(1:是,0:否)   number required: */,
				roleId: 103 /** 申请的角色ID   number required: */,
				cardId: null /** 名片ID   number required: */,
				remark: null /** 备注   string required: */,
				job: null /** 村内职务   string required: */,
				type: 3 /** 申请类型(1:村民,2:共建者,3:管理员)   number required: */,
				orgId: null /** 组织ID(暂时未用)   number required: */,
				status: 0 /** 审核状态(0:待审核,1:通过,2:失败)   number required: */
			}
		};
	},
	methods: {
		// 主动触发图片参数获取
		getImgData(para) {
			console.log('接收图片数据', para);
			try {
				this.applyInfo.prove = JSON.stringify(para);
			} catch (e) {}
		},
		// 校验表单内容
		async checkForm() {
			if (this.name == '') {
				uni.showToast({
					icon: 'none',
					title: `姓名不能为空`
				});
				return;
			}
			if (
				!(await this.safe_dataContentCheck(this.name)) ||
				!(await this.safe_dataContentCheck(this.applyInfo.reason))
			) {
				return;
			}
			this.submit();
		},
		// 提交表单数据
		submit() {
			uni.showLoading({
				icon: 'none',
				title: '提交中'
			});
			this.applyInfo.cardId = this.currentRural.cardId;
			apiBusinessRoleApplyApply_Post(this.applyInfo)
				.then(res => {
					console.log(res.data.data);
					if (res.data.code == 200) {
						uni.showToast({
							icon: 'none',
							title: `申请提交成功`
						});
						this.$emit('refresh', this.name);
					} else if (res.data.code == 500) {
						uni.showToast({
							icon: 'none',
							title: res.data.msg
						});
					} else {
						uni.showToast({
							icon: 'none',
							title: `服务器异常,请联系客服`
						});
					}
				})
				.finally(() => {
					uni.hideLoading();
				});
		}
	}
};
</script>

<style scoped lang="scss">
.hello_content {
	display: flex;
	justify-content: center;
	z-index: 2;
	flex-direction: column;
	margin-top: 40rpx;

	.desc {
		.title {
			font-size: 34rpx;
			font-family: 'SourceHanSerifCN-Bold';
			margin-bottom: 16rpx;
		}
		font-size: 28rpx;
		font-weight: 300;
		display: flex;
		flex-direction: column;
		margin-bottom: 20rpx;
		padding: 30rpx;
		background: #ffffffc9;
		border-radius: 20rpx;
	}
	.button {
		width: 60%;
		height: 73rpx;
		line-height: 73rpx;
		background: #04c354;
		border-radius: 50rpx;
		opacity: 0.9;
		font-size: 30rpx;
		text-align: center;
		margin-bottom: 100rpx;
		display: flex;
		justify-content: center;
		align-self: center;
		color: #fff;
	}
	.bg_img {
		width: 100%;
		position: absolute;
		border-radius: 0rpx 0rpx 30rpx 30rpx;
		z-index: -1;
	}
	.bg_img::before {
		content: '';
		position: absolute;
		background: linear-gradient(to bottom, #e3eceb, #f7f7f790);
		width: 100%;
		height: 100%;
		left: 0;
		bottom: 0;
		margin: 0;
		border-radius: 0rpx 0rpx 36rpx 36rpx;
	}
	.content_barrage {
		position: absolute;
		bottom: -15%;
		width: 100%;
		.title {
			margin-left: 20rpx;
			font-size: 32rpx;
			color: #222;
			text-align: center;
		}
	}
	.content_name {
		margin-bottom: 30rpx;
		padding: 30rpx;
		background: #ffffffc9;
		border-radius: 20rpx;
		.nav {
			font-size: 32rpx;
			font-family: 'SourceHanSerifCN-Bold';
			margin-bottom: 20rpx;
		}
		.input {
			.u-border {
				border-color: #c1c1c180 !important;
			}
		}
		.desc {
			font-size: 28rpx;
			color: #353535;
			display: flex;
			flex-flow: column;
			margin-top: 10rpx;
			text {
				line-height: 46rpx;
			}
		}
	}
	.content_type {
		margin-bottom: 30rpx;
		padding: 30rpx;
		background: #ffffffc9;
		border-radius: 20rpx;
		.nav {
			font-size: 30rpx;
			font-family: 'SourceHanSerifCN-Bold';
			margin-bottom: 30rpx;
			display: flex;
			justify-content: space-between;
			align-self: center;
			align-items: center;
		}
		.info {
			font-size: 34rpx;
			color: #353535;
			display: flex;
			justify-content: space-around;
			.list {
				width: 45%;
				display: flex;
				background: #f5f5f585;
				height: 100rpx;
				align-items: center;
				justify-content: center;
				font-size: 28rpx;
				border-radius: 20rpx;
				color: #353535;
				border: 1rpx solid #33333324;
			}
			.on {
				background: #04c354eb;
				color: #fff;
			}
		}
	}
	.content_position {
		margin-bottom: 30rpx;
		padding: 30rpx;
		background: #ffffffc9;
		border-radius: 20rpx;
		.nav {
			font-size: 30rpx;
			font-family: 'SourceHanSerifCN-Bold';
			margin-bottom: 30rpx;
			display: flex;
			flex-direction: column;
		}
		.info {
			font-size: 34rpx;
			color: #353535;
			display: flex;
			justify-content: space-around;
			.list {
				width: 45%;
				display: flex;
				background: #f5f5f585;
				height: 100rpx;
				align-items: center;
				justify-content: center;
				font-size: 28rpx;
				border-radius: 20rpx;
				color: #353535;
				border: 1rpx solid #33333324;
			}
			.on {
				background: #04c354eb;
				color: #fff;
			}
		}
	}
}
</style>
