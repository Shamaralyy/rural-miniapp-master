<!-- user 未加入 -->
<template>
	<view :style="[subData.user_login]">
		<view class="hello_content">
			<view class="title">
				<text>{{ subData.hellotitle }}</text>
			</view>
			<view class="desc">
				<text>{{ subData.hellodesc }}</text>
			</view>
			<view class="content_type">
				<view class="nav">
					<text>选择你的身份</text>
					<!-- <text style="font-weight: 500;font-size: 28rpx;">了解区别</text> -->
				</view>
				<view class="info">
					<view class="list" :class="[{ on: buildtype == 1 }]" @click="buildtype = 1">
						<text>我是本村人</text>
					</view>
					<view class="list" :class="[{ on: buildtype == 2 }]" @click="buildtype = 2">
						<text>我不是该村人</text>
					</view>
				</view>
			</view>
			<view class="content_position" v-if="buildtype == 1">
				<view class="nav">
					<text>选择你的村民身份</text>
					<text style="font-size: 26rpx;font-weight: 500;margin-top: 10rpx;">该身份不会展示到名片页面</text>
				</view>
				<view class="info">
					<view class="list" :class="[{ on: buildjob == 1 }]" @click="buildjob = 1">
						<text>普通村民</text>
					</view>
					<view class="list" :class="[{ on: buildjob == 2 }]" @click="buildjob = 2">
						<text>村委干部</text>
					</view>
				</view>
			</view>
			<view class="button" @click="submit()"><text>立即加入</text></view>
		</view>
	</view>
</template>

<script>
import { apiBusinessCardJoin_Post } from '@/API/乡村名片.js';
import { getStrJob, getIntegerIdentity } from '@/utils/Utils-tool.js';
export default {
	name: 'nojoin',
	props: ['subData'],
	data() {
		return {
			buildjob: 0,
			buildtype: 0
		};
	},
	methods: {
		// 点击提交申请
		submit() {
			if (this.buildtype == 0) {
				console.log('选择身份');
				uni.showToast({ icon: 'none', title: '请选择身份' });
				return;
			}

			if (this.buildtype == 1 && this.buildjob == 0) {
				console.log('选择职位');
				uni.showToast({ icon: 'none', title: '请选择村内身份' });
				return;
			}

			let jonPara = {
				roleId: getIntegerIdentity(this.buildtype),
				/** 角色ID   integer required: */
				cardId: this.subData.rural_info.cardId,
				/** 乡村名片ID   integer required: */
				whitelists: null,
				/** 白名单(0-否,1-是)   integer required: */
				job: getStrJob(this.buildjob)
				/** 村内职务   string required: */
			};
			console.log('加入村庄参数', jonPara);

			apiBusinessCardJoin_Post(jonPara).then(res => {
				console.log(res);
				if (res.data.code == 200 && res.data.msg.indexOf('成功') != -1) {
					this.$emit('reLoding'); //调用页面接口数据重载
					uni.showToast({
						icon: 'success',
						title: `加入${this.subData.rural_info.name}成功`
					});
					//加入未发布村庄弹出邀请卡
					if (this.subData.rural_info.status != 1) {
						this.$emit('toBuild', 2);
					}
				} else {
					uni.showToast({ icon: 'error', title: '异常操作,加入失败' });
				}
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
	margin-top: 30%;
	flex-direction: column;
	width: 85%;
	.title {
		font-size: 44rpx;
		color: #222;
		text-align: center;
		margin-bottom: 20rpx;
	}
	.desc {
		font-size: 30rpx;
		color: #222;
		text-align: center;
		margin-bottom: 70rpx;
	}
	.button {
		width: 60%;
		height: 73rpx;
		line-height: 73rpx;
		background: #fff;
		border-radius: 50rpx;
		opacity: 0.9;
		font-size: 30rpx;
		text-align: center;
		margin-bottom: 30rpx;
		display: flex;
		justify-content: center;
		align-self: center;
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
		// border: 1px solid #eee;
		// box-shadow: 0 6rpx 18rpx #eee;
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
