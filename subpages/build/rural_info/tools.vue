<template>
	<view>
		<view class="content_map">
			<!-- 顶部选项 -->
			<view class="rural_tool" v-if="openType">
				<view class="">
					<u-button type="primary" :plain="workType != 0" text="地区绑定 " @click="workType = 0"></u-button>
				</view>
				<view class="">
					<u-button type="primary" :plain="workType != 1" text="标点修正 " @click="workType = 1"></u-button>
				</view>
			</view>
			<!-- 乡村id -->
			<view class="rural_tool" v-if="openType">
				<view class=""><text>乡村ID</text></view>
				<view class="">
					<u--input
						type="number"
						placeholder="请名片ID"
						border="surround"
						v-model="ruralId"
						@change="changeRuralId"
					></u--input>
				</view>
				<view class=""><u-button text="上个村" @click="nextRual(-1)"></u-button></view>
				<view class=""><u-button text="下个村" @click="nextRual(1)"></u-button></view>
			</view>
			<view class="rural_tool">
				<view class=""><text>乡村名称</text></view>
				<view class="" v-if="workType == 1">
					<u-button
						type="primary"
						:plain="!openFilter"
						text="仅看冲突"
						@click="openFilter = !openFilter"
					></u-button>
				</view>
				<view class=""><u--input border="surround" v-model="currentRural.name" disabled></u--input></view>
			</view>
			<view class="rural_tool" v-if="workType == 0">
				<view class=""><text>乡村地址</text></view>
				<view class="">
					<u-tag
						@click="getruralmap()"
						:size="large"
						:text="currentRural.name + '   x 无经纬，点击获取'"
						type="error"
						v-if="currentRural.latitude == null"
					></u-tag>
					<u-tag :size="large" :text="currentRural.name + '   √ 有经纬'" type="success " v-else></u-tag>
				</view>
				<view class="">
					<u-tag :size="large" text="x 没有地址" type="error" v-if="currentRural.town == null"></u-tag>
					<u-tag :size="large" :text="'√ 有地址 -> ' + currentRural.town" type="success" v-else></u-tag>
				</view>
			</view>
			<view class="rural_tool" v-if="workType == 0">
				<view class=""><text>采集对象ID</text></view>
				<view class="">
					<u--input
						placeholder="请输入联动地址"
						border="surround"
						v-model="currentRural.versions"
						@change="getAddrList"
					></u--input>
				</view>
				<view class=""><u-button text="退一格" @click="exitRural()"></u-button></view>
			</view>
			<view class="rural_list" v-if="workType == 1">
				<view class="title" @click="getMapPoint()">
					<text>标点列表：{{ filterData.length }} / {{ pointList.length }} 个</text>
					<text style="font-weight: bolder;color: red;">（点击加载、更新标点）</text>
				</view>
				<!-- 本村坐标 -->
				<view class="list">
					<view class="addr" style="color: #d660d6; background-color: #d382d247;">
						<text class="">{{ currentRural.name }}</text>
						<text class="">{{ currentRural.longitude }}</text>
						<text class="">{{ currentRural.latitude }}</text>
					</view>
				</view>
				<!-- 本村标点坐标 -->
				<view class="list" v-for="(item, index) in filterData" :key="index">
					<view class="addr" :class="index == pointCarrent ? 'act' : ''" @click="pointTap(index)">
						<text class="">{{ item.name }}</text>
						<text class="">{{ item.longitude }}</text>
						<text class="">{{ item.latitude }}</text>
					</view>
				</view>
			</view>
			<view class="rural_list" v-if="workType == 0">
				<view class="title"><text>五级列表</text></view>
				<view class="list" v-for="(item, index) in addrList" :key="index">
					<view class="addr" :class="item.property == 1 ? 'act' : ''" @click="select(item)">
						<text>{{ item.name }}</text>
						<text v-if="item.property == 0">未激活</text>
						<text v-if="item.property == 1">已激活</text>
						<text>选择</text>
					</view>
				</view>
			</view>
			<view class="map_nav">
				<view class="nav_title">
					<text>当前{{ workType == 0 ? '村庄' : '标点' }}位置</text>
				</view>
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
			<view class="map_content">
				<map
					:style="{ width: '100%', height: pagesHeight * 0.9 + 'px' }"
					:latitude="marker[0].latitude"
					:longitude="marker[0].longitude"
					:enable-3D="true"
					:enable-satellite="enable_satellite"
					:markers="marker"
					:enable-scroll="false"
					:enable-zoom="false"
					:scale="scaleValue"
				></map>
			</view>
			<view class=""><u-slider v-model="scaleValue" min="12" max="18" activeColor="#04c354" inactiveColor="#c0c4cc"></u-slider></view>
		</view>
		<view class="content_bottom">
			<view class="button">
				<view class="btn_item" v-show="workType == 0">
					<u-button type="success" text="五级绑定 确认保存" @click="saveData()"></u-button>
				</view>
				<view class="btn_item" v-show="workType == 1">
					<u-button type="success" shape="circle" text="标点修改、下一个" @click="pointSave()"></u-button>
				</view>
				<view class="btn_item"><u-button type="warning" text="坐标细调" @click="getAddress()"></u-button></view>
			</view>
		</view>
	</view>
</template>

<script>
import QQMapWX from '@/commonJS/qqmap-wx-jssdk.js';

const imgBaseUrl = getApp().globalData.imgBaseUrl + '/app' + '/static/';

import { apiBusinessAddrCascader_Get } from '@/API/五级联动地址数据.js';
import { apiBusinessCoordinatePage_Post, apiBusinessCoordinateEdit_Put } from '@/API/坐标位置.js';
import { apiBusinessCardEdit_Put, apiBusinessCardInfo_Get, apiBusinessCardActivation_Get } from '@/API/乡村名片.js';
const locationEntity = requirePlugin('chooseLocation');
import { mapState } from 'vuex';
export default {
	data() {
		return {
			workType: 0, //当前工作类型
			scaleValue: 14,
			chooseLocation: '中国',
			pagesWidth: 750,
			pagesHeight: 2000,
			map_type: 0, //地图显示类型
			enable_satellite: false,
			currentRural: {},
			mp_1: imgBaseUrl + 'map_1.png',
			mp_2: imgBaseUrl + 'map_2.png',
			pointList: [], //标点列表 仅做存储 不做展示
			pointCarrent: -1, //点选中的标点
			openFilter: false, //是否开启过滤
			marker: [
				{
					id: 0,
					latitude: 22.613062, //纬度
					longitude: 114.033613, //经度
					iconPath: imgBaseUrl + 'map.png', //显示的图标
					width: '44',
					height: '48',
					rotate: 0, // 旋转度数
					alpha: 1, //透明度
					callout: {
						content: '平安村',
						display: 'ALWAYS',
						color: '#fff',
						padding: '10',
						borderRadius: '10',
						bgColor: '#ff0000'
					}
				}
			],
			onceFlag: true, //单次执行标记
			ruralId: 93000,
			addrList: [],
			openType: true //开启状态 true 直接进入，false map页带参进入
		};
	},
	computed: {
		/* 经过处理 用于显示的数据 */
		filterData() {
			if (this.openFilter) {
				return this.pointList.filter(value => {
					return (
						value.longitude == this.currentRural.longitude && value.latitude == this.currentRural.latitude
					);
				});
			} else {
				return this.pointList;
			}
		}
	},
	watch: {
		addrList(newValue, oldValue) {
			let temp = newValue.filter(value => {
				return value.property == 1;
			});
			if (temp.length == 0) return;
			console.log('查询到激活数据', temp);
		}
	},
	onLoad(option) {
		if (option) {
			this.workType = 1;
			this.openType = false;
			this.ruralId = option.cardId;
		}
		var that = this;
		this.pagesWidth = getApp().globalData.sysInfo.windowWidth;
		this.pagesHeight = getApp().globalData.sysInfo.windowHeight;
		this.changeRuralId();
	},
	onReady() {},
	// 从地图选点插件返回后，在页面的onShow生命周期函数中能够调用插件接口，取得选点结果对象
	onShow() {
		if (this.onceFlag) return;
		const location = locationEntity.getLocation(); // 如果点击确认选点按钮，则返回选点结果对象，否则返回null
		console.log('您所选择的位置：', location);
		if (location != null) {
			// this.chooseLocation = location.address;
			if (this.workType == 0) {
				this.marker[0].latitude = location.latitude;
				this.marker[0].longitude = location.longitude;
			} else {
				this.marker[1].latitude = location.latitude;
				this.marker[1].longitude = location.longitude;
			}
		}
	},
	onUnload() {
		// 页面卸载时设置插件选点数据为null，防止再次进入页面，geLocation返回的是上次选点结果
		locationEntity.setLocation(null);
	},
	methods: {
		// 五级联动列表 点击选择事件
		select(item) {
			console.log(item);
			let para = {
				cardId: this.currentRural.cardId,
				addrId: item.id
			};
			uni.showModal({
				title: '提示',
				content: '选中 ' + item.name,
				success: res => {
					if (res.confirm) {
						console.log('用户点击确定');
						this.actRural(para);
					}
				}
			});
		},
		/* 五级联动激活 */
		actRural(para) {
			uni.showLoading({
				title: '激活中'
			});
			apiBusinessCardActivation_Get(para)
				.then(res => {
					console.log('更新结果', res);
					uni.showToast({ icon: 'none', title: '激活 -> ok' });
					uni.hideLoading();
				})
				.then(() => {
					this.changeRuralId();
				});
		},
		/* 获取五级联动地址列表 */
		getAddrList() {
			uni.showLoading({ title: '加载列表' });
			let apiBusinessAddrCascader_Param = {
				level: 5,
				officialCode: this.currentRural.versions /** 官方代码    string required:false */
			};
			apiBusinessAddrCascader_Get(apiBusinessAddrCascader_Param)
				.then(res => {
					console.log(res.data.data);
					this.addrList = res.data.data;
				})
				.finally(() => {
					uni.showToast({ icon: 'none', title: '加载 -> ok' });
				});
		},
		exitRural() {
			this.currentRural.versions = parseInt(this.currentRural.versions / 10);

			this.getAddrList();
		},
		nextRual(para) {
			this.ruralId = Number(this.ruralId) + para;
			this.changeRuralId();
			if (this.workType == 1) {
				this.pointList = [];
			}
		},
		changeRuralId() {
			this.cardId = this.ruralId;

			uni.showLoading({
				title: '查询' + this.cardId
			});
			let apiBusinessCardInfocardId_Param = {
				cardId: this.ruralId /**     string required:true */
			};
			apiBusinessCardInfo_Get(apiBusinessCardInfocardId_Param)
				.then(res => {
					console.log(res.data.data);
					this.currentRural = res.data.data;
					this.currentRural.versions = parseInt(this.currentRural.versions / 100);
					if (this.currentRural.latitude) {
						this.marker[0].latitude = Number(this.currentRural.latitude);
						this.marker[0].longitude = Number(this.currentRural.longitude);
					}
				})
				.then(() => {
					this.map_type = this.currentRural.mapType == null ? this.map_type : this.currentRural.mapType;
					this.scaleValue = this.currentRural.mapLevel == null ? this.scaleValue : this.currentRural.mapLevel;
					this.marker[0].callout.content = this.currentRural.name;
					if (this.currentRural.latitude) {
						this.marker[0].latitude = Number(this.currentRural.latitude);
						this.marker[0].longitude = Number(this.currentRural.longitude);
					} else {
						this.getruralmap();
					}

					this.mapTypeChange(this.map_type);
					this.onceFlag = false;
				})
				.then(() => {
					if (this.workType == 1) {
						this.getMapPoint();
						return;
					}
					this.getAddrList();
					uni.hideLoading();
				});
		},
		/* 获取某村的标点 */
		getMapPoint() {
			this.pointCarrent = -1;
			uni.showLoading({
				title: '获取标点'
			});
			let para_body = {
				pageNum: 1,
				pageSize: 5000,
				cardId: this.ruralId
			};
			apiBusinessCoordinatePage_Post(para_body).then(res => {
				if (res.data.code == 200) {
					this.pointList = this.dataProcessing(res.data.data.records);
					// console.log('得到乡村标点数据', this.pointList);
				} else {
					this.pointList = [];
				}
				uni.showToast({ icon: 'none', title: `查到 ${this.pointList.length} 个位置` });
			});
			// .finally(() => {
			// 	uni.hideLoading();
			// });
		},
		/* 标点数据处理 */
		dataProcessing(para) {
			// 处理图片
			let temp = para.map((value, index) => {
				value.images = JSON.parse(value.images);
				return {
					...value,
					id: value.coordinateId,
					latitude: value.latitude,
					longitude: value.longitude,
					title: value.name,
					width: 30,
					height: 30,
					status: value.status,
					rotate: 0, // 旋转度数
					alpha: 1, //透明度
					iconPath: '/static/map.png'
				};
			});
			return temp;
		},
		getruralmap(point) {
			let exPoint = point ? point : ''; //额外标记点
			if (this.workType == 0) {
				uni.showLoading({ title: '查询经纬' });
			}
			var that = this;
			const tMap = new QQMapWX({
				key: getApp().globalData.positionAPI_key //开发者密钥
			});
			let address =
				this.currentRural.province +
				this.currentRural.city +
				this.currentRural.county +
				this.currentRural.town +
				this.currentRural.name +
				exPoint;

			console.log('请求地址', address);

			tMap.geocoder({
				address: address,
				success: res => {
					console.log('解析地址成功', res);
					if (this.workType == 0) {
						that.marker[0].latitude = res.result.location.lat;
						that.marker[0].longitude = res.result.location.lng;
						uni.showToast({ icon: 'none', title: '五级联动经纬 -> ok' });
					} else if (this.workType == 1) {
						this.changePointMask({ latitude: res.result.location.lat, longitude: res.result.location.lng });
					}
					this.scaleValue--;
					this.scaleValue = 12;
					setTimeout(() => {
						uni.pageScrollTo({
							scrollTop: 2000000, //滚动到页面的目标位置（单位px）
							duration: 1000 //滚动动画的时长，默认300ms，单位 ms
						});
					}, 500);
				},
				fail: res => {
					uni.showToast({
						title: '定位失败',
						duration: 2000,
						icon: 'none'
					});
					console.log(res);
				}
			});
		},
		/* 切换地图类型 */
		mapTypeChange(type) {
			this.map_type = type;
			this.enable_satellite = type == 1 ? true : false;
		},

		/* 获取当前地址 跳转插件*/
		getAddress() {
			const location = JSON.stringify({
				latitude: this.workType == 0 ? this.marker[0].latitude : this.marker[1].latitude,
				longitude: this.workType == 0 ? this.marker[0].longitude : this.marker[1].longitude
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
		/* 修改当前标记点的mask */
		changePointMask(result) {
			let nowPoint = this.filterData[this.pointCarrent];
			let nowMask = {
				id: nowPoint.coordinateId,
				latitude: result.latitude, //纬度
				longitude: result.longitude, //经度
				iconPath: nowPoint.iconPath, //显示的图标
				width: '24',
				height: '28',
				rotate: 0, // 旋转度数
				alpha: 1, //透明度
				callout: {
					content: nowPoint.name,
					display: 'ALWAYS',
					padding: '5',
					bgColor: '#aaffff'
				}
			};
			if (this.marker.length == 1) {
				this.marker.push(nowMask);
			} else if (this.marker.length == 2) {
				this.marker[1] = nowMask;
			}
		},
		/* 标记点触发事件 更新坐标点 */
		pointTap(index) {
			if (this.workType == 1 && index == undefined) {
				if (index == this.pointCarrent) return;
				//处于过滤模式时
				if (this.filterData.length == 0) return; //没有数据时
				setTimeout(() => {
					this.pointTap(0);
				}, 1000);
				return;
			}
			this.pointCarrent = index;
			// console.log(this.filterData[index]);
			uni.showToast({ icon: 'none', title: `选中：${this.filterData[index].name}` });
			this.getruralmap(this.filterData[this.pointCarrent].name);
		},

		/* 保存数据 五级联动经纬度数据 */
		saveData() {
			let editApi_map = {
				mapType: this.map_type,
				mapLevel: this.scaleValue,
				cardId: this.currentRural.cardId,
				latitude: this.marker[0].latitude.toString(),
				longitude: this.marker[0].longitude.toString()
			};

			new Promise((resolve, reject) => {
				apiBusinessCardEdit_Put(editApi_map).then(res => {
					console.log('地图请求数据', res);
					if (res.data.code == 200 && res.data.msg.indexOf('成功') != -1) {
						// this.$store.commit('build/setCurrentRural_map', editApi_map);
						resolve();
					} else {
						reject();
					}
				});
			})
				.then(() => {
					return new Promise((resolve, reject) => {
						uni.showToast({ icon: 'none', title: '地图更新完成' });
						this.onceFlag = true;
						this.changeRuralId();
						uni.pageScrollTo({
							scrollTop: 0, //滚动到页面的目标位置（单位px）
							duration: 1000 //滚动动画的时长，默认300ms，单位 ms
						});
						resolve();
					});
				})
				.catch(() => {
					uni.showToast({ icon: 'error', title: '地图更新失败' });
					console.log('错误');
				});
		},
		/* 保存坐标点经纬度数据 */
		pointSave() {
			if (this.pointCarrent < 0) {
				uni.showToast({ icon: 'none', title: `无效索引：${this.pointCarrent}` });
				return;
			}
			if (this.filterData.length == 0) {
				uni.showToast({ icon: 'none', title: `列表为空` });
				return;
			}

			let nowData = this.filterData[this.pointCarrent];
			let para = {
				coordinateId: nowData.coordinateId,
				cardId: nowData.cardId, //乡村id
				name: nowData.locationname, //位置名称
				detail: nowData.introduce, //位置介绍
				latitude: this.marker[1].latitude.toString(),
				longitude: this.marker[1].longitude.toString(),
				images: nowData.imgJson, //轮播图
				choiceness: nowData.nowData, //是否精选 1精选 0非精选
				tagId: nowData.tagId, //分类ID，数组结构
				status: nowData.status,
				failMag: nowData.failMag
			};
			apiBusinessCoordinateEdit_Put(para)
				.then(res => {
					if (res.data.code == 200) {
						uni.showToast({ icon: 'success', title: `${nowData.name}成功` });
					} else {
						uni.showToast({ icon: 'error', title: res.data.msg });
					}
				})
				.then(() => {
					// 修改存储本地数组，不请求新更新页面  以防浪费时间  更新需要手动获取
					setTimeout(() => {
						this.pointList.forEach(value => {
							if (value.coordinateId == nowData.coordinateId) {
								value.latitude = para.latitude;
								value.longitude = para.longitude;
							}
						});
					}, 0);
				})
				.then(() => {
					uni.pageScrollTo({
						scrollTop: 0, //滚动到页面的目标位置（单位px）
						duration: 1000 //滚动动画的时长，默认300ms，单位 ms
					});
				})
				.then(() => {
					// 自动选择
					this.pointTap();
				});
		}
	}
};
</script>

<style lang="scss">
page {
	background: #f1f1f1;
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
	// margin: 30rpx;
	background: #fff;
	border-radius: 20rpx;
	padding-bottom: 150rpx;
	.rural_tool {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 20rpx;
		.tab {
			flex: 1;
			text-align: center;
		}
		.selec-ok {
			background-color: #930eff;
			color: #fff;
		}
	}
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
.map_info {
	padding: 30rpx;
	background: #fff;
	font-size: 28 rpx;
	border-radius: 0 0 20rpx 20rpx;
}
.rural_list {
	padding: 30rpx;
	.list {
		.addr {
			font-size: 26rpx;
			display: flex;
			justify-content: space-between;
			height: 61rpx;
			line-height: 60rpx;
			border-bottom: 1rpx solid #efefef;
			background: #fbfbfb;
		}
		.act {
			background: #0eab0ca3;
		}
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
