<template>
	<view class="">
		<u-navbar
			:title="rural_info.name + '位置发布'"
			:autoBack="true"
			:placeholder="true"
			bgColor="#ffffff00"
			leftIconColor="#000"
			:titleStyle="{ color: '#000' }"
		></u-navbar>

		<view class="content_map" v-if="columns[0].length != 0">
			<view class="map_nav">
				<view class="nav_title"><text>地图类型</text></view>
				<view class="nav_maptype">
					<view
						class="maptype_list"
						:class="[{ on: map_type == 0 }]"
						@click="mapTypeChange(0)"
						:style="'background: url(' + mp_1 + ')round;'"
					>
						<text>地图模式</text>
					</view>
					<view
						class="maptype_list"
						:class="[{ on: map_type == 1 }]"
						@click="mapTypeChange(1)"
						:style="'background: url(' + mp_2 + ')round;color:#fff'"
					>
						<text>卫星模式</text>
					</view>
				</view>
			</view>
			<map
				:style="{ width: pagesWidth + 'px', height: '300px' }"
				:latitude="latitude"
				:longitude="longitude"
				:enable-satellite="enable_satellite"
				:enable-3D="true"
				:scale="scale"
				:subkey="mapKey"
				layer-style="1"
				:markers="marker"
			></map>
		</view>
		<view style="margin: 30rpx;" v-if="columns[0].length == 0">
			<u-empty
				text="该模块暂无标签分类,需在名片装修-模块管理-标签管理-新建标签后再来哦~"
				:icon="imgBaseUrl + 'noTags.png'"
			></u-empty>
		</view>
		<view class="content_form" v-if="columns[0].length != 0">
			<view class="form_list">
				<view class="title"><text>位置选择</text></view>
				<view class="info right">
					<text @click="getAddress()">{{ xaweoas ? xaweoas.address : '点击选择位置>' }}</text>
				</view>
			</view>
			<view class="form_list">
				<view class="title"><text>位置名称</text></view>
				<view class="info">
					<u--input
						placeholder="请输入位置名称"
						border="surround"
						maxlength="10"
						@change="check"
						v-model="locationname"
					></u--input>
				</view>
			</view>
			<view class="form_list">
				<view class="title"><text>资讯类型</text></view>
				<view class="info">
					<u-subsection
						@change="typeChange"
						:list="typeList"
						:current="typeCurrent"
						activeColor="#2aae67"
					></u-subsection>
				</view>
			</view>
			<view class="form_list" v-if="isShowVR">
				<u--input placeholder="请输VR全景链接地址" border="surround" v-model="vrAddr"></u--input>
			</view>
			<view class="form_list">
				<view class="title"><text>位置介绍</text></view>
				<view class="info">
					<u--textarea v-model="introduce" @input="check" placeholder="请输入位置介绍"></u--textarea>
				</view>
			</view>
			<view class="form_list up">
				<view class="title"><text>位置图片</text></view>
				<view class="info" style="width: 100%">
					<ru-file-upload
						@upPara="getImgData"
						paraGetMethods="active"
						iniTopPath="images/naviMagic"
					></ru-file-upload>
				</view>
			</view>
			<view class="form_list" @click="pickerShow = true">
				<view class="title"><text>位置标签</text></view>
				<view class="info right">
					<text>{{ checkboxValue1.label ? checkboxValue1.label : '请选择' }}</text>
				</view>
			</view>
			<view class="button">
				<u-button :disabled="disabled" text="添加位置" color="#04c354" @click="submit"></u-button>
			</view>
		</view>
		<!-- 点击选择标签 -->
		<u-picker
			:show="pickerShow"
			:columns="columns"
			keyName="label"
			@cancel="pickerShow = false"
			@close="pickerShow = false"
			@confirm="confirm"
		></u-picker>
		<!-- 点击选择标签 end -->
	</view>
</template>

<script>
// 当前这个页面一进来肯定是要拿这个村的信息、包括位置标签列表
// 引入SDK核心类
var QQMapWX = require('../../../commonJS/qqmap-wx-jssdk.min.js');
const imgBaseUrl = getApp().globalData.imgBaseUrl + '/app/static/';
const chooseLocation = requirePlugin('chooseLocation');
const MAPKEY = getApp().globalData.positionAPI_key;
import { apiBusinessCardInfo_Get } from '@/API/乡村名片.js';
import { apiBusinessCoordinateAdd_Post } from '@/API/坐标位置.js';
import { apiBusinessCoordinateTagTagLabel_Get } from '@/API/坐标分类62.js';
import { buildType, buildAdd } from '@/components/mixins/buildMixins.js';
export default {
	mixins: [buildType, buildAdd],
	data() {
		return {
			imgBaseUrl: imgBaseUrl,
			mapKey: MAPKEY,
			disabled: true, //按钮置灰
			pagesWidth: 0,
			menuwidth: 0,
			latitude: '',
			locationname: '', //位置名称
			introduce: '', //位置介绍
			imgJson: '',
			longitude: '',
			scale: 16,
			enable_satellite: true,
			map_type: 1, //地图显示类型
			mp_1: imgBaseUrl + 'map_1.png',
			mp_2: imgBaseUrl + 'map_2.png',
			marker: [
				{
					id: 0,
					latitude: 0, //纬度
					longitude: 0, //经度
					iconPath: imgBaseUrl + 'map.png', //显示的图标
					width: '24',
					height: '28',
					rotate: 0, // 旋转度数
					alpha: 1, //透明度
					callout: {
						content: '位置名称',
						display: 'ALWAYS',
						padding: '10',
						borderRadius: 10
					}
				}
			],
			xaweoas: '', //位置名称
			pickerShow: false, //位置标签显示
			columns: [[]], //位置内容
			checkboxValue1: { label: '' } //位置标签文字
		};
	},

	onLoad: function(option) {
		var that = this;
		uni.getSystemInfo({
			success: function(res) {
				let menu = wx.getMenuButtonBoundingClientRect();
				that.menuwidth = menu.width + menu.width / 7;
				that.pagesWidth = res.windowWidth;
				console.log(that.menuwidth);
			}
		});
		this.getruralinfo();
	},
	onUnload() {
		// 页面卸载时设置插件选点数据为null，防止再次进入页面，geLocation返回的是上次选点结果
		chooseLocation.setLocation(null);
	},
	onShow() {
		const location = chooseLocation.getLocation(); // 如果点击确认选点按钮，则返回选点结果对象，否则返回null
		this.xaweoas = location;
		console.log('您所选择的位置：', location);
		if (location) {
			this.chooseLocation = location.address;
			this.marker[0].latitude = location.latitude;
			this.marker[0].longitude = location.longitude;
			this.latitude = location.latitude;
			this.longitude = location.longitude;
		}
		this.check();
	},
	methods: {
		getImgData(para) {
			console.log('接收图片数据', para);
			try {
				let temp = para.map(value => {
					return {
						imgUrl: value
					};
				});
				this.imgJson = JSON.stringify(temp);
				console.log(this.imgJson);
			} catch (e) {}
		},
		/* 切换地图类型 */
		mapTypeChange(type) {
			this.map_type = type;
			this.enable_satellite = type == 1 ? true : false;
		},
		getruralinfo() {
			this.latitude = this.rural_info.latitude;
			this.longitude = this.rural_info.longitude;
			this.marker[0].latitude = this.rural_info.latitude;
			this.marker[0].longitude = this.rural_info.longitude;
		},
		getAddress() {
			const key = getApp().globalData.positionAPI_key; //使用在腾讯位置服务申请的key
			const referer = getApp().globalData.appName; //调用插件的app的名称
			const location = JSON.stringify({
				latitude: this.marker[0].latitude, //纬度
				longitude: this.marker[0].longitude //经度
			});
			const category = '行政地名';
			wx.navigateTo({
				url:
					'plugin://chooseLocation/index?key=' +
					key +
					'&referer=' +
					referer +
					'&category=' +
					category +
					'&location=' +
					location +
					'&scale=17'
			});
		},

		//位置标签弹窗内容
		confirm(e) {
			this.checkboxValue1 = e.value[0];
			this.pickerShow = false;
			this.check();
		},

		//添加位置
		async submit() {
			if (this.isShowVR) {
				if (uni.$u.trim(this.vrAddr) == '') {
					uni.showToast({ icon: 'none', title: '全景链接不能为空' });
					return;
				}
				if (this.vrAddr.indexOf('xiangcunmingpian.com') == -1) {
					uni.showToast({ icon: 'none', title: '全景链接不合法' });
					return;
				}
			}
			if (
				!(await this.safe_dataContentCheck(this.locationname)) ||
				!(await this.safe_dataContentCheck(this.introduce))
			) {
				return;
			}
			apiBusinessCoordinateAdd_Post({
				cardId: this.rural_info.cardId, //乡村id
				name: this.locationname, //位置名称
				detail: this.introduce, //位置介绍
				longitude: this.xaweoas.longitude, //经度
				latitude: this.xaweoas.latitude, //维度
				images: this.imgJson, //轮播图
				choiceness: 0, //是否精选 1精选 0非精选
				tagId: [this.checkboxValue1.id], //分类ID，数组结构
				vrUrl: this.isShowVR ? this.vrAddr : null
			}).then(res => {
				if (res.data.code == 200) {
					uni.showToast({ icon: 'success', title: `发布成功` });
					uni.navigateBack({});
				} else {
					uni.showToast({
						icon: 'error',
						title: res.data.msg
					});
				}
			});
		},

		//校验
		check(e) {
			if (this.locationname != '') {
				this.marker[0].callout.content = this.locationname;
			} else {
				this.marker[0].callout.content = '位置名称';
			}
			if (this.introduce && this.checkboxValue1.label && this.xaweoas && this.locationname) {
				this.disabled = false;
			} else {
				this.disabled = true;
			}
		}
	},
	onReady() {
		//位置标签
		apiBusinessCoordinateTagTagLabel_Get({
			//    cardId: this.rural_info.cardId, //乡村id
			cardId: this.rural_info.cardId //乡村id
		}).then(res => {
			console.log('请求标签', res);
			if (res.data.code == 200) {
				res.data.data.map(item => {
					this.columns[0].push({
						label: `${item.name}`,
						id: `${item.coordinateTagId}`
					});
				});
			}
		});
	}
};
</script>

<style lang="scss">
.content_map {
	.map_nav {
		padding: 18rpx 24rpx;
		display: flex;
		justify-content: space-between;
		.nav_title {
			display: flex;
			align-items: center;
		}
		.nav_maptype {
			display: flex;
			font-size: 24rpx;
			align-items: center;
			.maptype_list {
				margin-left: 20rpx;
				padding: 18rpx;
				border-radius: 30rpx;
			}
			.on {
				border: 3rpx #0cab24 solid;
			}
		}
	}
}
.content_form {
	display: flex;
	flex-direction: column;
	margin: 30rpx;
	.form_list {
		display: flex;
		justify-content: space-between;
		padding-bottom: 20rpx;
		align-items: center;
		border-bottom: 1rpx #f7f7f7 solid;
		margin-top: 30rpx;
		.title {
		}
		.info {
			align-items: right;
			width: 70%;
		}
		.right {
			text-align: right;
		}
	}
	.up {
		flex-flow: column;
		align-items: baseline;
		.title {
			margin-bottom: 20rpx;
		}
	}
}
.button {
	margin: 50rpx 30rpx;
}
</style>
