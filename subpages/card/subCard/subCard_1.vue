<!-- 名片 -->
<template>
	<view class="home">
		<view class="top_bg">
			<ru-barrage
				ref="ruBarrage2"
				:marginlr="20"
				:maxTop="200"
				:margintop="90"
				type="leftBottom"
				v-if="stmessagec.isEnable == 1"
			></ru-barrage>
			<ru-background-slide :slideImgList="bannerimg"></ru-background-slide>
		</view>
		<u-navbar
			:showAction="false"
			:placeholder="true"
			title=" "
			:bgColor="naviStyle.bg"
			leftIconColor="#fff"
			:titleStyle="{ color: '#fff' }"
		>
			<view class="u-nav-slot_left" slot="left" :style="'color:' + naviStyle.colo">
				<view class="name">
					<text :user-select="true">{{ rural_info.name }}</text>
				</view>
			</view>
			<view
				class="u-nav-slot_right"
				@click="topTap"
				slot="right"
				:style="'right:' + menuwidth + 'px;bottom:' + menuwidth / 11 + 'px'"
			>
				<view class="title">
					<text>{{ rural_info.status == 1 ? '分享名片' : '名片装修' }}</text>
				</view>
			</view>
		</u-navbar>
		<post-message :postmessageclick="stmessagec" @clickState="changePostState" @ok="addNewMsg"></post-message>
		<view class="banner_bottom" :class="[bigSizeFontClass('bigSize_banner_bottom')]">
			<view class="banner_text" v-if="rural_info.province">
				<view class="description">
					<view class=""><u-icon name="map" size="15" color="#eaeaea"></u-icon></view>
					<view class="">
						<text :user-select="true" lines="1" size="14" color="#fff">
							{{ rural_info.province + rural_info.city + rural_info.county }}
						</text>
					</view>
					<!-- <text>{{ rural_info.province }}</text>
					<text>{{ rural_info.city }}</text>
					<text>{{ rural_info.county }}</text> -->
				</view>
			</view>
			<view class="right_text" @click="btnTap">
				<text>{{ showStr }}</text>
			</view>
		</view>
		<u-notice-bar
			v-if="rural_info.status != 1"
			bgColor="#f56c6c90"
			color="#fdf6ec"
			text="该乡村名片目前还在建设中未发布,暂不支持分享,可点击(我的-进入名片建设页,先补充好乡村基础信息),发布审核通过即可分享."
		></u-notice-bar>
		<!-- 资讯模块 -->
		<ru-card-module-control
			:moduleData="subPageData.vs1"
			:navData="{ bannerimg, navigationJson }"
			@magicTap="magicTap"
		></ru-card-module-control>
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
import postmessage from '@/subpages/card/subCard/postmessage.vue';
const MAPKEY = getApp().globalData.positionAPI_key;
export default {
	components: { 'post-message': postmessage },
	props: ['subPageData'],
	computed: {
		showStr() {
			return this.stmessagec.isEnable == 1 ? '给乡村留言祝福' : '导航';
		},
		navigationJson() {
			if (this.rural_info) {
				return this.rural_info.navigationJson;
			}
			return '';
		}
	},
	data() {
		return {
			shareSheet: false,
			shareList: [
				{
					name: '分享给好友',
					openType: 'share'
				}
				// {
				// 	name: '生成明信片',
				// 	openType: 'none'
				// }
			],
			menuwidth: 0,
			bannerimg: [],
			rural_info: {},
			stmessagec: {
				//乡村留言
				isEnable: false, //是否启用
				shoiuwe: false, //是否显示弹窗
				cardId: '' //乡村id
			},
			naviStyle: {},
			barIndex: 0, //弹幕索引
			timer: null, //本地记录定时器
			MAPKEY: ''
		};
	},
	watch: {
		subPageData: {
			deep: true,
			handler(newValue) {
				if (newValue.page != 0) return;
				// console.log('更新subCard_1数据：', newValue);
				this.rural_info = newValue.rural_info;
				this.menuwidth = newValue.menuwidth;
				this.bannerimg = newValue.bannerimg;
				this.naviStyle = newValue.naviStyle;
				this.userInfo = newValue.userInfo;
				this.Barragelist = newValue.Barragelist;
				this.MAPKEY = newValue.MAPKEY;
				try {
					this.stmessagec.isEnable = this.rural_info.isMsg;
				} catch (e) {
					//TODO handle the exception
				}
			}
		}
	},
	methods: {
		// 魔方点击事件
		magicTap(e) {
			console.log('subCard1触发 魔方点击', e);
			// 阻断自定义链接
			if (e.type == 2) {
				uni.navigateTo({
					url: '/subpages/vr/vr?src=' + e.url
				});
				return;
			}
			// 回传本card链接至card
			this.$emit('magicTap', e);
		},
		// 按钮点击事件
		btnTap() {
			if (this.stmessagec.isEnable == 1) {
				if (this.subPageData.isJoinRural) {
					this.messageclick();
				} else {
					this.toPage({ name: 'login' });
					uni.showToast({
						icon: 'none',
						title: '必须加入本村才可以留言'
					});
				}
			} else {
				const latitude = Number(this.rural_info.latitude),
					longitude = Number(this.rural_info.longitude),
					name = this.rural_info.name;
				let endPoint = JSON.stringify({
					//终点
					name: name,
					latitude: latitude,
					longitude: longitude
				});
				let plugin = requirePlugin('routePlan');
				wx.navigateTo({
					url: 'plugin://routePlan/index?key=' + MAPKEY + '&referer=乡村名片&endPoint=' + endPoint
				});

				// uni.getLocation({
				// 	type: 'gcj02', //返回可以用于uni.openLocation的经纬度
				// 	success(res) {
				// 		uni.openLocation({
				// 			name,
				// 			latitude: latitude,
				// 			longitude: longitude,
				// 			scale: 17,
				// 			success() {
				// 				console.log('success');
				// 			}
				// 		});
				// 	}
				// });
				// this.$emit('navi');
			}
		},
		// 调用外部页面跳转
		toPage(para) {
			this.$emit('toPage', para);
		},
		// 修改留言框状态
		changePostState(state) {
			this.stmessagec.shoiuwe = state;
		},
		//乡村留言弹窗
		messageclick() {
			if (this.userInfo) {
				this.stmessagec.cardId = this.rural_info.cardId; //乡村id
				this.changePostState(true); //显示弹窗
			} else {
				uni.showToast({
					icon: 'none',
					title: '请先登录再留言'
				});
			}
		},

		// 分享列表点击
		selectClick(para) {
			// this.onShareAppMessage()
			console.log('选择分享类别', para);
			if (para.openType == 'none') {
				uni.navigateTo({
					url: '/subpages/card/subCard/shareImg'
				});
			}
		},

		// 点击顶部事件
		topTap() {
			// 发布状态 展开分享列表
			if (this.rural_info.status == 1) {
				this.shareSheet = true;
			} else {
				this.$emit('toBuild', 0);
			}
		},
		// 新增一条留言
		addNewMsg(para) {
			this.$emit('addNewMsg', para);
		},
		//循环更换弹幕
		runMsg() {
			if (!this.stmessagec.isEnable == 1) return; //检测留言是否启用

			if (this.Barragelist.length == 0) return; //检测留言内容是否为空

			if (this.subPageData.page != 0) return; //切页暂停

			this.$refs.ruBarrage2.add({ item: this.Barragelist[this.barIndex] });

			this.barIndex = this.barIndex == this.Barragelist.length - 1 ? 0 : ++this.barIndex;

			this.reFrshTimeID();
		},
		/* 刷新定时器 */
		reFrshTimeID() {
			if (this.subPageData.ruTime == null) {
				this.$emit('timerChange', this.timer);
			}
		}
	},
	mounted() {
		this.timer = setInterval(() => {
			this.runMsg();
		}, 3000);
	}
};
</script>

<style scoped lang="scss">
.home {
	// height: 100%;
	// position: relative;
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
				align-items: center;
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
	.bigSize_banner_bottom {
		.banner_text {
			.title {
				font-size: 40rpx;
			}
			.description {
				font-size: 30rpx;
			}
			.map {
				font-size: 26rpx;
			}
		}
		.right_text {
			font-size: 28rpx;
		}
	}
}
</style>
