<template>
	<view>
		<u-navbar
			:showAction="false"
			:placeholder="true"
			title=" "
			bgColor="#ffffff00"
			leftIconColor="#fff"
			:titleStyle="{ color: '#fff' }"
		>
			<view class="u-nav-slot_left" slot="left">
				<view class="name" :class="mapJson.mapType ? '' : 'black'">
					<text>{{ currentRural.name }}向导</text>
				</view>
			</view>
			<view
				class="u-nav-slot_right"
				slot="right"
				:style="'right:' + menuwidth + 'px;bottom:' + menuwidth / 11 + 'px'"
			>
				<view class="title" @click="saveData()"><text>保存配置</text></view>
			</view>
		</u-navbar>
		<map
			:style="{ width: '100%', height: pagesHeight * 0.7 + 'px' }"
			:latitude="marker[0].latitude"
			:longitude="marker[0].longitude"
			:enable-3D="true"
			:enable-satellite="mapJson.mapType"
			:markers="marker"
			:scale="mapJson.mapLevel"
		></map>
		<view class="content_map">
			<view class="nav">地图向导配置</view>
			<view class="list">
				<view class="title"><text>地图中心位置</text></view>
				<view class="content">
					<u-button text="重新选点" @click="getAddress()" size="small" shape="circle"></u-button>
				</view>
			</view>
			<view class="listd">
				<view class="title"><text>地图默认层级</text></view>
				<view class="content">
					<u-slider
						v-model="mapJson.mapLevel"
						min="12"
						max="18"
						:showValue="true"
						activeColor="#04c354"
						inactiveColor="#c0c4cc"
					></u-slider>
				</view>
			</view>
			<view class="list">
				<view class="title"><text>卫星地图模式</text></view>
				<view class="content">
					<u-switch
						v-model="mapJson.mapType"
						@change=""
						activeColor="#04c354"
						inactiveColor="rgb(230, 230, 230)"
					></u-switch>
				</view>
			</view>
			<view class="list">
				<view class="title"><text>是否显示VR</text></view>
				<view class="content">
					<u-switch
						v-model="mapJson.vrShow"
						@change="vrShow"
						activeColor="#04c354"
						inactiveColor="rgb(230, 230, 230)"
					></u-switch>
				</view>
			</view>
			<view class="listd" v-if="mapJson.vrShow">
				<view class="title"><text>VR导览地址</text></view>
				<view class="content">
					<u--input placeholder="请输入内容" border="surround" v-model="mapJson.vrUrl"></u--input>
				</view>
			</view>
			<view class="list">
				<view class="title"><text>是否开启天气</text></view>
				<view class="content">
					<u-switch
						v-model="mapJson.weatherShow"
						@change="weatherShow"
						activeColor="#04c354"
						inactiveColor="rgb(230, 230, 230)"
					></u-switch>
				</view>
			</view>
			<view class="list">
				<view class="title"><text>是否显示公告</text></view>
				<view class="content">
					<u-switch
						v-model="mapJson.noticeShow"
						activeColor="#04c354"
						inactiveColor="rgb(230, 230, 230)"
					></u-switch>
				</view>
			</view>
			<view class="listd" v-if="mapJson.noticeShow">
				<view class="title"><text>公告通知内容</text></view>
				<view class="content">
					<u--textarea
						v-model="mapJson.noticeContent"
						placeholder="可填写游客提醒\疫情防控要求\当地禁忌等内容"
					></u--textarea>
				</view>
			</view>
			<view class="list">
				<view class="title"><text>是否显示求助</text></view>
				<view class="content">
					<u-switch
						v-model="mapJson.helpShow"
						activeColor="#04c354"
						inactiveColor="rgb(230, 230, 230)"
					></u-switch>
				</view>
			</view>
			<view class="listd" v-if="mapJson.helpShow">
				<view class="title"><text>求助联系内容</text></view>
				<view class="content">
					<u--textarea
						v-model="mapJson.helpContent"
						placeholder="可填写遇到紧急情况联系村哪个部门/在哪里等"
					></u--textarea>
				</view>
			</view>
			<view class="list">
				<view class="title"><text>显示手绘地图</text></view>
				<view class="content">
					<u-switch
						v-model="mapJson.overlayShow"
						@change="overlayShow"
						activeColor="#04c354"
						inactiveColor="rgb(230, 230, 230)"
					></u-switch>
				</view>
			</view>
			<view class="list" v-if="mapJson.overlayShow">
				<view class="title"><text>默认手绘地图</text></view>
				<view class="content">
					<u-switch
						v-model="mapJson.defaultOverlayShow"
						activeColor="#04c354"
						inactiveColor="rgb(230, 230, 230)"
					></u-switch>
				</view>
			</view>
			<view class="list">
				<view class="title"><text>开启AR向导</text></view>
				<view class="content">
					<u-switch
						v-model="mapJson.arShow"
						@change="arShow"
						activeColor="#04c354"
						inactiveColor="rgb(230, 230, 230)"
					></u-switch>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
const imgBaseUrl = getApp().globalData.imgBaseUrl + '/app' + '/static/';
import { apiBusinessCardEdit_Put } from '@/API/乡村名片.js';
import { getDefault_mapJson } from '@/utils/defaultData.js';
const locationEntity = requirePlugin('chooseLocation');
import { mapState, mapMutations } from 'vuex';
export default {
	data() {
		return {
			scaleValue: 14,
			chooseLocation: '中国',
			pagesWidth: 750,
			pagesHeight: 2000,
			map_type: 0, //地图显示类型
			enable_satellite: false,
			mp_1: imgBaseUrl + 'map_1.png',
			mp_2: imgBaseUrl + 'map_2.png',
			marker: [
				{
					id: 0,
					latitude: 22.613062, //纬度
					longitude: 114.033613, //经度
					iconPath: imgBaseUrl + 'map.png', //显示的图标
					width: '24',
					height: '28',
					rotate: 0, // 旋转度数
					alpha: 1, //透明度
					callout: {
						content: '平安村',
						display: 'ALWAYS',
						padding: '5'
					}
				}
			],
			onceFlag: true, //单次执行标记
			menuwidth: null,
			mapJson: getDefault_mapJson()
		};
	},
	computed: {
		...mapState('build', ['currentRural'])
	},
	onLoad() {
		var that = this;
		uni.getSystemInfo({
			success: function(res) {
				let menu = wx.getMenuButtonBoundingClientRect();
				that.menuwidth = menu.width + menu.width / 7;
				that.pagesWidth = res.windowWidth;
				that.pagesHeight = res.windowHeight;
				console.log(that.menuwidth);
			}
		});
	},
	onReady() {
		if (this.currentRural == null) {
			console.warn('乡村参数异常', this.currentRural);
			uni.navigateBack({ delta: 1 });
			return;
		}
		try {
			if (this.currentRural.mapJson) {
				this.mapJson = JSON.parse(this.currentRural.mapJson);
				console.log('我拿到的线上的数据', this.mapJson);
			} else {
				console.log('使用默认的数据', this.mapJson);
			}
		} catch (e) {
			console.log('地图配置数据渲染失败，使用默认数据');
		}
		if (this.onceFlag) {
			this.map_type = this.currentRural.mapType == null ? this.map_type : this.currentRural.mapType;
			this.scaleValue = this.currentRural.mapLevel == null ? this.scaleValue : this.currentRural.mapLevel;
			this.marker[0].latitude = Number(this.currentRural.latitude);
			this.marker[0].longitude = Number(this.currentRural.longitude);
			this.marker[0].callout.content = this.currentRural.name;
			this.onceFlag = false;
		}
	},
	// 从地图选点插件返回后，在页面的onShow生命周期函数中能够调用插件接口，取得选点结果对象
	onShow() {
		if (this.onceFlag) return;
		const location = locationEntity.getLocation(); // 如果点击确认选点按钮，则返回选点结果对象，否则返回null
		console.log('您所选择的位置：', location);
		if (location != null) {
			// this.chooseLocation = location.address;
			this.marker[0].latitude = location.latitude;
			this.marker[0].longitude = location.longitude;
		}
	},
	onUnload() {
		// 页面卸载时设置插件选点数据为null，防止再次进入页面，geLocation返回的是上次选点结果
		locationEntity.setLocation(null);
	},
	methods: {
		//点击手绘地图开关
		overlayShow(e) {
			console.log('手绘地图开关', e);
			if (e) {
				if (this.currentRural.mapOverlay == null) {
					this.mapJson.overlayShow = false;
					uni.showModal({
						title: '温馨提醒',
						content: `名片暂无手绘地图,请添加后再开启。`,
						showCancel: false,
						confirmColor: '#04c354',
						confirmText: '我知道了'
					});
				}
			} else {
			}
		},

		//点击AR开关
		arShow(e) {
			console.log('AR开关', e);
			this.mapJson.arShow = false;
			uni.showModal({
				title: '温馨提醒',
				content: `AR向导功能目前仅支持部分乡村内测，即将公测尽请期待。`,
				showCancel: false,
				confirmColor: '#04c354',
				confirmText: '我知道了'
			});
		},

		/* 获取当前地址 跳转插件*/
		getAddress() {
			const location = JSON.stringify({
				latitude: this.marker[0].latitude,
				longitude: this.marker[0].longitude
			});
			const category = '行政地名';
			wx.navigateTo({
				url:
					'plugin://chooseLocation/index?key=' +
					getApp().globalData.positionAPI_key +
					'&referer=' +
					getApp().globalData.appName +
					'&category=' +
					category +
					'&location=' +
					location +
					'&scale=' +
					this.scaleValue
			});
		},

		/* 保存数据 */
		saveData() {
			//数据筛查
			if (this.mapJson.vrShow) {
				if (this.mapJson.vrUrl == null) {
					uni.showToast({ icon: 'none', title: 'VR全景URL不能为空' });
					return;
				}
				if (this.mapJson.vrUrl.indexOf('vr.xiangcunmingpian.com') == -1) {
					uni.showModal({
						title: '温馨提醒',
						content: `暂时仅支持输入乡村名片VR平台的全景URL,可在vr.xiangcunmingpian.com上传,仅对名片用户免费开放。`,
						showCancel: false,
						confirmColor: '#04c354',
						confirmText: '我知道了'
					});
					return;
				}
			}
			if (this.mapJson.noticeShow) {
				if (this.mapJson.noticeContent == null) {
					uni.showToast({ icon: 'none', title: '公告内容不能为空' });
					return;
				}
			}
			if (this.mapJson.helpShow) {
				if (this.mapJson.helpContent == null) {
					uni.showToast({ icon: 'none', title: '求助内容不能为空' });
					return;
				}
			}

			let mapJson = JSON.stringify(this.mapJson);
			console.log('保存内容', mapJson);
			let editApi_map = {
				mapJson: mapJson,
				cardId: this.currentRural.cardId,
				latitude: this.marker[0].latitude.toString(),
				longitude: this.marker[0].longitude.toString()
			};

			new Promise((resolve, reject) => {
				apiBusinessCardEdit_Put(editApi_map).then(res => {
					console.log('地图请求数据', res);
					if (res.data.code == 200 && res.data.msg.indexOf('成功') != -1) {
						this.$store.commit('build/setMapJson', mapJson);
						resolve();
					} else {
						reject();
					}
				});
			})
				.then(() => {
					return new Promise((resolve, reject) => {
						uni.showToast({ icon: 'success', title: '地图更新完成' });
						setTimeout(() => {
							uni.navigateBack({ delta: 1 });
							resolve();
						}, 1000);
					});
				})
				.catch(() => {
					uni.showToast({ icon: 'error', title: '地图更新失败' });
					console.log('错误');
				});
		}
	}
};
</script>

<style lang="scss">
page {
	// background: #f1f1f1;
}
.u-navbar__placeholder {
	display: none !important;
}
.u-nav-slot_left {
	display: flex;
	// background: #0006;
	padding: 0rpx;
	// border-radius: 30rpx;
	color: #fff;
	.name {
		font-size: 38rpx;
		font-family: 'SourceHanSerifCN-Medium';
		display: flex;
		align-self: center;
		// font-family: 'SourceHanSerifCN-Bold';
		margin-bottom: 10rpx;
	}
	.black {
		color: #333;
	}

	.title {
		font-size: 26rpx;
		display: flex;
		align-self: center;
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
.content_guide {
	padding: 20rpx 30rpx;
	background: #fff;
	margin-bottom: 30rpx;
	.guide_title {
		font-size: 36rpx;
		font-family: 'SourceHanSerifCN-Bold';
		margin-bottom: 10rpx;
	}
}
.content_map {
	padding: 30rpx;
	border-radius: 30rpx 30rpx 0 0;
	/* margin-top: -16px; */
	// z-index: 999;
	position: relative;
	top: -50rpx;
	background: #fff;
	.nav {
		font-size: 36rpx;
		margin-bottom: 30rpx;
	}
	.list {
		font-size: 32rpx;
		padding: 30rpx 0rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-top: 1rpx #f1f1ff solid;
	}
	.listd {
		font-size: 32rpx;
		padding: 16rpx 0rpx;
		align-items: center;
		.title {
			margin-bottom: 20rpx;
		}
		border-top: 1rpx #f1f1ff solid;
	}
	.map_info {
		padding: 30rpx;
		background: #fff;
		font-size: 28 rpx;
		border-radius: 0 0 20rpx 20rpx;
	}
}

.content_bottom {
	position: fixed;
	bottom: 10rpx;
	background: #fff;
	width: 100%;
	.button {
		display: flex;
		width: 80%;
		justify-content: space-around;
		margin: 20rpx auto 40rpx auto;
		.btn_item {
			margin-left: 4vw;
			margin-right: 4vw;
		}
	}
}
</style>
