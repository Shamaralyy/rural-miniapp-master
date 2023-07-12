<template>
	<view>
		<image src="https://cdn.xiangcunmingpian.com/app/static/login_bg_5.jpg" class="bottom_bg" mode="widthFix"></image>
		<view class="">
			<!-- <image src="/static/myrural_bottom_bg1.jpg"  class="bottom_bg" mode="widthFix"></image> -->
			<u-navbar
				:title="'申请' + rural_name + '管理员'"
				:autoBack="true"
				:placeholder="true"
				leftIcon="arrow-left"
				bgColor="#ffffff00"
				leftIconColor="#fff"
				:titleStyle="{ color: '#fff' }"
			></u-navbar>
		</view>
		<view class="content">
			<view class="content_welcome">
				<view class="title">
					<text>欢迎申请{{ rural_name }}乡村名片管理员</text>
				</view>
				<view class="desc">
					<text>申请说明:</text>
					<text>1、本村管理员最终决定权由：{{ rural_info.ruralAddr.oldName }}及上级部门与平台所属，不代表通过后永久保留本村管理员身份。</text>
					<text>2、管理员需公平公正维护名片内容，不出现偏袒部分用户/服务等，保证名片内容质量。</text>
					<text>3、平台评定标准以申请者贡献的内容及质量为主(拥有{{ rural_info.ruralAddr.oldName }}及以上部门推荐证明除外)</text>
					<text>4、审核权重：村上级部门领导>村委干部>参与本村名片优秀共建者</text>
				</view>
			</view>
			<view class="content_name">
				<view class="nav"><text>申请人实名姓名</text></view>
				<view class="input"><u--input placeholder="请输入你的实名姓名" border="surround" v-model="user_name" @focus="desc = true" @blur="desc = false"></u--input></view>
				<view class="desc" v-if="desc">
					<text>说明</text>
					<text>1、互联网监管要求发布及注册需进行实名认证</text>
					<text>2、平台不会展示您真实姓名，仅展示用户名称</text>
					<text>3、平台会对您的姓名及您微信进行一致性校验</text>
					<text>4、填写虚假姓名会直接影响你的平台账号使用</text>
				</view>
				<view class="button"></view>
			</view>
			<view class="content_type">
				<view class="nav"><text>申请书</text></view>
				<view class="info"><u--textarea v-model="value1" placeholder="请输入你为什么申请该村管理员,你后面会怎么做"></u--textarea></view>
			</view>
			<view class="content_position">
				<view class="nav"><text>证明文件上传(非必填)</text></view>
				<text style="font-size: 26rpx;">如果您有{{ rural_info.ruralAddr.oldName }}及上级部门推荐或证明文件可以点击上传</text>
				<view class="info">
					<view class="list" @click="buildjob = 1"><text>点击上传图片</text></view>
				</view>
			</view>
			<view class="content_bottom">
				<view class="button"><u-button :text="'申请' + rural_name + '管理员'" color="#04c354" @click="lightrural()"></u-button></view>
			</view>
		</view>
	</view>
</template>

<script>
import { apiBusinessAddrLower_Get, apiBusinessAddrLevel_Get, apiBusinessAddrSearch_Post } from '@/API/五级联动地址数据.js';
import { apiBusinessCardPage_Post, apiBusinessCardMyRural_Get, apiBusinessCardJoin_Post, apiBusinessCardInfo_Get } from '@/API/乡村名片.js';
export default {
	data() {
		return {
			rural_name: '',
			user_name: '',
			rural_info: [],
			desc: false,
			upid: 0, // 传过来的乡村上级id
			ruralId: 0, // 传过来的乡村id
			buildtype: 0,
			buildjob: 0
		};
	},
	onLoad: function(option) {
		console.log('<加入村庄>跳转参数', option);
		this.ruralId = option.ruralid;
		this.getruralname(); //获取乡村名称
	},
	methods: {
		lightrural() {
			if (this.rural_name.length < 2) {
				uni.showToast({
					title: '村名不少得于两个汉字',
					duration: 3000,
					icon: 'none'
				});
				return;
			}
			if (this.buildtype == 0) {
				uni.showToast({
					title: '请选择你的身份',
					duration: 3000,
					icon: 'none'
				});
				return;
			}
			if (this.buildtype == 1) {
				if (this.buildjob == 0) {
					uni.showToast({
						title: '请选择你的村民身份',
						duration: 3000,
						icon: 'none'
					});
					return;
				}
			}
			uni.showLoading({
				icon: 'none',
				title: '点亮中'
			});

			let typeid = this.buildtype == 1 ? 101 : this.buildtype == 2 ? 102 : '';
			let typename = this.buildjob == 1 ? '普通村民' : this.buildjob == 2 ? '村委干部' : '';
			apiBusinessCardJoin_Post({
				cardId: id,
				whitelists: 0,
				job: typename,
				roleId: typeid
			}).then(res => {
				console.log(res.data);
				if (res.data.code == 200) {
					uni.showToast({
						title: '点亮成功',
						duration: 2000,
						icon: 'none'
					});
				}
				if (res.data.code == 500 && res.data.msg == null) {
					uni.showToast({
						title: '点亮异常，请联系客服',
						duration: 2000,
						icon: 'none'
					});
				}
				if (res.data.code == 500 && res.data.msg == '已经被点亮了') {
					uni.showToast({
						title: '该乡村已经被点亮了',
						duration: 2000,
						icon: 'none'
					});
				}
				uni.hideLoading();
			});
		},

		getruralname() {
			var that = this;
			apiBusinessCardInfo_Get({ cardId: this.ruralId })
				.then(res => {
					console.log(res.data.data);
					that.rural_name = res.data.data.name;
					that.rural_info = res.data.data;
				})
				.catch(err => {
					console.log('请求异常');
				})
				.finally(() => {});
		}
	}
};
</script>

<style lang="scss">
//背景图片
.bottom_bg {
	width: 100%;
	position: fixed;
	bottom: 0;
	z-index: -1;
}

page {
	// background:#68c6ec;
}

.content_welcome {
	padding: 30rpx 40rpx 10rpx 40rpx;
	// background: #fff;
	color: #fff;
	.title {
		font-size: 38rpx;
		font-family: 'SourceHanSerifCN-Bold';
		margin-bottom: 16rpx;
	}
	.desc {
		font-size: 30rpx;
		font-family: 'SourceHanSerifCN-Bold';
		display: flex;
		flex-direction: column;
	}
}

.content_name {
	margin: 30rpx;
	padding: 30rpx;
	background: #ffffffc9;
	border-radius: 20rpx;
	// border: 1px solid #eee;
	// box-shadow: 0 6rpx 18rpx #eee;
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
	margin: 30rpx;
	padding: 30rpx;
	background: #ffffffc9;
	border-radius: 20rpx;
	// border: 1px solid #eee;
	// box-shadow: 0 6rpx 18rpx #eee;
	.nav {
		font-size: 32rpx;
		font-family: 'SourceHanSerifCN-Bold';
		margin-bottom: 30rpx;
	}
	.info {
		font-size: 34rpx;
		color: #353535;
		display: flex;
		justify-content: space-around;
		.list {
			width: 45%;
			display: flex;
			background: #f1f1f1;
			height: 100rpx;
			align-items: center;
			justify-content: center;
			font-size: 28rpx;
			border-radius: 20rpx;
			color: #353535;
		}
		.on {
			background: #04c354;
			color: #fff;
		}
	}
}
.content_position {
	margin: 30rpx;
	padding: 30rpx;
	background: #ffffffc9;
	border-radius: 20rpx;
	margin-bottom: 200rpx;
	// border: 1px solid #eee;
	// box-shadow: 0 6rpx 18rpx #eee;
	.nav {
		font-size: 32rpx;
		font-family: 'SourceHanSerifCN-Bold';
		margin-bottom: 30rpx;
	}
	.info {
		font-size: 34rpx;
		color: #353535;
		display: flex;
		justify-content: space-around;
		.list {
			width: 45%;
			display: flex;
			background: #f1f1f1;
			height: 100rpx;
			align-items: center;
			justify-content: center;
			font-size: 28rpx;
			border-radius: 20rpx;
			color: #353535;
		}
		.on {
			background: #04c354;
			color: #fff;
		}
	}
}
.content_bottom {
	position: fixed;
	bottom: 10rpx;
	background: #ffffffc9;
	width: 100%;
	.button {
		display: flex;
		width: 80%;
		margin: 20rpx auto 40rpx auto;
	}
}
</style>
