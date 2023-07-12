<!-- 邀请卡 -->
<template>
	<view>
		<u-popup
			:show="isShow_popup"
			round="20"
			@close="clos(false)"
			:overlay="false"
			duration="600"
			bgColor="transparent"
		>
			<view class="content_register">
				<view class="invitation">
					<view class="register_title"><text>名片装修邀请函</text></view>
					<view class="register_back" @click="clos(false)"><text>暂不装修</text></view>
					<view class="register_text">
						<text>尊敬的 {{ userInfo.nickName }} :</text>
						<text>
							{{ inviType != 'join' ? '恭喜您成功点亮了' : '欢迎您加入' }}{{ rural_info.name }}名片
						</text>
						<text>现在可以开始完善丰富乡村名片的内容啦~</text>
						<text>为您提供图集、资讯、地图、服务等功能</text>
						<text>并且为您提供详细的乡村名片装修教程</text>
						<text>希望与您一起助力咱们乡村名片宣传</text>
					</view>
				</view>
				<view class="register_fold">
					<view class="fold_left"></view>
					<view class="fold_right"></view>
				</view>

				<view class="register_content">
					<view class="button">
						<u-button
							@click="toBuild"
							text="进入名片装修"
							shape="circle"
							:customStyle="{ background: '#04c354', borderColor: '#04c354' }"
							color="#fff"
							:hairline="false"
						></u-button>
					</view>
					<view class="agreement"><text>完善名片内容审核通过后才可分享名片</text></view>
					<view class="agreement"><text>可在“乡村名片-我的-左上角装修名片”进入</text></view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
export default {
	name: 'invitationCard',
	props: ['isShow_popup', 'userInfo', 'rural_info', 'inviType'],
	methods: {
		clos(state) {
			this.$emit('changeState', state);
		},
		toBuild() {
			this.$emit('toBuild', 1);
		}
	}
};
</script>

<style scoped lang="scss">
.content_register {
	// padding:30rpx;
	height: 600rpx;
	background: #d1e9dc;
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
			border-color: transparent transparent #f8fffb transparent;
			z-index: -1;
			margin-top: 3rpx;
			top: 0;
		}
		.fold_right {
			position: absolute;
			border-style: solid;
			border-width: 0 0 40px 400px;
			border-color: transparent transparent #f0f0f0 transparent;
			z-index: 1;
			margin-top: -20rpx;
			top: 0;
		}
	}

	.register_content {
		height: 100%;
		background-color: #f8fffb;
		margin-top: 20rpx;
		padding: 30rpx;
		padding-top: 50rpx;
		text-align: center;
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
