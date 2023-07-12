<!-- 名片 -->
<template>
	<view class="home">
		<view class="top_bg"><ru-background-slide :slideImgList="bannerimg"></ru-background-slide></view>
		<u-navbar
			:showAction="false"
			:placeholder="true"
			title=" "
			bgColor="#ffffff00"
			leftIconColor="#fff"
			:titleStyle="{ color: '#fff' }"
			@rightClick="sendMsg()"
		>
			<view class="u-nav-slot_left" slot="left">
				<view class="name">
					<text>{{ rural_info.name }}</text>
				</view>
			</view>
			<view
				class="u-nav-slot_right"
				slot="right"
				:style="'right:' + menuwidth + 'px;bottom:' + menuwidth / 11 + 'px'"
			>
				<view class="title"><text>退出预览</text></view>
			</view>
		</u-navbar>
		<view class="banner_bottom">
			<view class="banner_text" v-if="rural_info.province">
				<view class="description">
					<u-icon name="map" size="16" color="#eaeaea"></u-icon>
					<text>{{ rural_info.province }}</text>
					<text>{{ rural_info.city }}</text>
					<text>{{ rural_info.county }}</text>
				</view>
				<!-- <view class="map"><text>导航</text></view> -->
			</view>
			<view class="right_text" @click="messageclick"><text>给乡村留言祝福</text></view>
		</view>
		<ru-card-module-control
			:moduleData="vs1"
			:navData="{ bannerimg, navigationJson: rural_info.navigationJson }"
		></ru-card-module-control>
	</view>
</template>

<script>
export default {
	props: ['subPageData'],
	data() {
		return {
			vs1: {},
			menuwidth: 0,
			bannerimg: [],
			rural_info: {},
			stmessagec: {
				//乡村留言祝
				shoiuwe: false, //是否显示弹窗
				cardId: '' //乡村id
			}
		};
	},
	watch: {
		subPageData: {
			deep: true,
			handler(newName) {
				this.rural_info = newName.rural_info;
				this.vs1 = newName.vs1;
				this.menuwidth = newName.menuwidth;
				this.bannerimg = newName.bannerimg;
			}
		}
	},
	methods: {
		magicTap(e) {
			this.$emit('magicTap', e);
		},
		sendMsg() {
			this.$emit('pageData', 0);
		},
		//乡村留言弹窗
		messageclick() {
			this.stmessagec.cardId = this.rural_info.cardId; //乡村id
			this.stmessagec.shoiuwe = true; //是否显示弹窗
		}
	}
};
</script>

<style scoped lang="scss">
.home {
	height: 100%;
	width: 100%;
	position: relative;
	display: flex;
	flex-direction: column;

	.u-navbar__placeholder {
		display: none;
	}

	.u-nav-slot_left {
		display: flex;
		// background: #0006;
		padding: 10rpx 20rpx;
		// border-radius: 30rpx;
		color: #fff;
		.name {
			font-size: 48rpx;
			font-family: 'SourceHanSerifCN-Medium';
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
		z-index: 21;
		.name {
			font-size: 28rpx;
			font-family: 'SourceHanSerifCN-Bold';
		}
		.title {
			font-size: 26rpx;
			font-weight: 400;
		}
	}

	.top_bg {
		width: 100%;
		z-index: -1;
		position: relative;
	}
	.banner_bottom {
		margin-top: -20vh;
		margin-bottom: 10rpx;
		padding: 0 20rpx;
		display: flex;
		justify-content: space-between;
		.banner_text {
			z-index: 2;
			display: flex;
			overflow: hidden;
			align-self: center;
			align-items: center;
			.title {
				font-size: 36rpx;
				font-family: 'SourceHanSerifCN-Bold';
				color: #fff;
				margin-bottom: 10rpx;
			}
			.description {
				font-size: 26rpx;
				color: #eaeaea;
				display: flex;
			}
			.map {
				color: #100f0f;
				border-radius: 32rpx;
				font-size: 22rpx;
				padding: 6rpx 20rpx;
				margin-left: 10rpx;
				line-height: inherit;
				background: #ffffffe3;
				align-self: center;
			}
		}
		.right_text {
			color: #eaeaea;
			background: #00000085;
			font-size: 24rpx;
			padding: 10rpx 20rpx;
			border-radius: 30rpx;
			display: flex;
		}
	}
}
</style>
