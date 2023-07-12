<template>
	<view class="">
		<u-navbar
			:title="'位置修改'"
			:autoBack="true"
			:placeholder="true"
			bgColor="#ffffff00"
			leftIconColor="#000"
			:titleStyle="{ color: '#000' }"
		>
			<!--    <view class="u-nav-slot_right" slot="right"
    	:style="'right:' + menuwidth + 'px;bottom:' + menuwidth / 11 + 'px'" @click="submit">
    	<view class="title"><text>更新</text></view>
    </view> -->
		</u-navbar>

		<view class="content_map">
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
		<view class="content_form">
			<view class="form_list">
				<view class="title"><text>资讯状态</text></view>
				<view class="info right">
					<u-subsection :list="statusList" :current="cuStatus" @change="sectionChange"></u-subsection>
				</view>
			</view>
			<view class="form_list" v-if="cuStatus == 2">
				<view class="title"><text>驳回理由</text></view>
				<view class="info">
					<u--textarea v-model="fail_msg" @input="check" placeholder="请输入驳回理由"></u--textarea>
				</view>
			</view>
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
						:initData="fileList1"
					></ru-file-upload>
				</view>
			</view>
			<view class="form_list" @click="pickerShow = true">
				<view class="title"><text>位置标签</text></view>
				<view class="info right">
					<text>{{ checkboxValue1.label ? checkboxValue1.label : '请选择' }}</text>
				</view>
			</view>
			<view class="button"><u-button text="更新位置" color="#04c354" @click="submit"></u-button></view>
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
import { mapState } from 'vuex';
var QQMapWX = require('../../../commonJS/qqmap-wx-jssdk.min.js');
const imgBaseUrl = getApp().globalData.imgBaseUrl + '/app/static/';
const chooseLocation = requirePlugin('chooseLocation');
const MAPKEY = getApp().globalData.positionAPI_key;
import { apiBusinessCardInfo_Get } from '@/API/乡村名片.js';
import { apiBusinessCoordinateInfocoordinateId_Get, apiBusinessCoordinateEdit_Put } from '@/API/坐标位置.js';
import { apiBusinessCoordinateTagTagLabel_Get } from '@/API/坐标分类62.js';
export default {
	data() {
		return {
			mapKey: MAPKEY,
			rural_name: '',
			disabled: true, //按钮置灰
			cardId: 0, // 传过来的乡村id
			rural_info: [],
			pagesWidth: 0,
			menuwidth: 0,
			latitude: '',
			locationname: '', //位置名称
			introduce: '', //位置介绍
			fileList1: [],
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
			xaweoas: {
				latitude: 0,
				longitude: 0,
				address: ''
			},
			pickerShow: false, //位置标签显示
			columns: [[]], //位置内容
			checkboxValue1: {
				label: ''
			}, //位置标签文字
			coordinateId: null,
			statusList: ['待审', '通过', '驳回'],
			cuStatus: null,
			fail_msg: ''
		};
	},

	onLoad: function(option) {
		var that = this;
		this.cardId = option.cardId ? option.cardId : option.cardid;
		this.coordinateId = option.coordinateId;
		this.getMapInfo();
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

		console.log('您所选择的位置：', location);
		if (location) {
			this.xaweoas = location;
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
			// console.log('接收图片数据', para);
			try {
				let temp = para.map(value => {
					return {
						imgUrl: value
					};
				});
				this.imgJson = JSON.stringify(temp);
				// console.log(this.imgJson);
			} catch (e) {}
		},
		sectionChange(index) {
			this.cuStatus = index;
		},
		getMapInfo() {
			var that = this;
			apiBusinessCoordinateInfocoordinateId_Get({
				coordinateId: this.coordinateId
			}).then(res => {
				console.log('获取该地址详细信息:', res.data.data);
				this.locationname = res.data.data.name;
				this.introduce = res.data.data.detail;
				this.longitude = res.data.data.longitude;
				this.latitude = res.data.data.latitude;
				this.checkboxValue1.id = res.data.data.tagId[0];
				this.fileList1 = JSON.parse(res.data.data.images).map(value => {
					return value.url ? value.url : value.imgUrl;
				});
				this.marker[0].latitude = res.data.data.latitude;
				this.marker[0].longitude = res.data.data.longitude;
				this.marker[0].callout.content = res.data.data.name;
				this.xaweoas.address = res.data.data.name;
				this.xaweoas.latitude = res.data.data.latitude;
				this.xaweoas.longitude = res.data.data.longitude;
				this.cuStatus = res.data.data.status;
				this.fail_msg = res.data.data.failMag;
			});
		},
		/* 切换地图类型 */
		mapTypeChange(type) {
			this.map_type = type;
			this.enable_satellite = type == 1 ? true : false;
		},
		getruralinfo() {
			apiBusinessCardInfo_Get({
				cardId: this.cardId
			})
				.then(res => {
					console.log(res.data.data);
					this.rural_info = res.data.data;
					// this.latitude = this.rural_info.latitude;
					// this.longitude = this.rural_info.longitude;
					// this.marker[0].latitude = this.rural_info.latitude;
					// this.marker[0].longitude = this.rural_info.longitude;
				})
				.catch(err => {
					console.log('请求异常');
				})
				.finally(() => {});
		},
		getAddress() {
			const referer = getApp().globalData.appName; //调用插件的app的名称
			const location = JSON.stringify({
				latitude: this.marker[0].latitude, //纬度
				longitude: this.marker[0].longitude //经度
			});
			const category = '行政地名';
			wx.navigateTo({
				url:
					'plugin://chooseLocation/index?key=' +
					this.mapKey +
					'&referer=' +
					referer +
					'&category=' +
					category +
					'&location=' +
					location +
					'&scale=17'
			});
		},

		// 删除图片
		deletePic(event) {
			this[`fileList${event.name}`].splice(event.index, 1);
		},

		//位置标签弹窗内容
		confirm(e) {
			this.checkboxValue1 = e.value[0];
			this.pickerShow = false;
			this.check();
		},

		//更新内容
		submit() {
			apiBusinessCoordinateEdit_Put({
				coordinateId: this.coordinateId,
				cardId: this.cardId, //乡村id
				name: this.locationname, //位置名称
				detail: this.introduce, //位置介绍
				longitude: this.longitude, //经度
				latitude: this.latitude, //维度
				images: this.imgJson, //轮播图
				choiceness: 0, //是否精选 1精选 0非精选
				tagId: [this.checkboxValue1.id], //分类ID，数组结构
				status: this.cuStatus,
				failMag: this.fail_msg
			}).then(res => {
				if (res.data.code == 200) {
					uni.showToast({
						icon: 'success',
						title: `更新成功`
					});
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
			if (this.introduce && this.checkboxValue1.label && this.locationname) {
				this.disabled = false;
			} else {
				this.disabled = true;
			}
		}
	},
	// 生命周期 - 挂载完成（可以访问DOM元素）
	mounted() {
		//位置标签
		apiBusinessCoordinateTagTagLabel_Get({
			//    cardId: this.cardId, //乡村id
			cardId: this.cardId //乡村id
		}).then(res => {
			if (res.data.code == 200) {
				res.data.data.map(item => {
					this.columns[0].push({
						label: `${item.name}`,
						id: `${item.coordinateTagId}`
					});
				});
				this.columns[0].map(item => {
					if (this.checkboxValue1.id == item.id) {
						this.checkboxValue1.label = item.label;
					}
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
