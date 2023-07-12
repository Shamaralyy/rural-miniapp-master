<template>
	<view class="">
		<u-navbar :showAction="false" :placeholder="true" title=" " bgColor="#ffffff00" @getNavbarHeight="getNavbarHeight">
			<view class="u-nav-slot_left" slot="left">
				<view class="name" :class="enable_satellite?'':'black'"><text>手绘地图DIY</text></view>
			</view>
			<view
				class="u-nav-slot_right"
				slot="right"
				:style="'right:' + menuwidth + 'px;bottom:' + menuwidth / 11 + 'px'"
			>
				<view class="title" @click="saveData()"><text>保存配置</text></view>
			</view>
		</u-navbar>
		<view class="left_top_tool" :class="enable_satellite ? 'satellite' : ''" v-if="showOverlay">
			<view class="reload">
				<text style="margin-bottom: 10rpx;">只看本图</text>
				<u-switch v-model="editMap" @change="openEditMap" size="10" activeColor="#04c354"
					inactiveColor="rgb(230, 230, 230)"></u-switch>
			</view>
			<view class="reload">
				<text style="margin-bottom: 10rpx;">拖拉移动</text>
				<u-switch v-model="editMap" @change="openEditMap" size="10" activeColor="#04c354"
					inactiveColor="rgb(230, 230, 230)"></u-switch>
			</view>
		</view>
		<view class="right_top_tool" :class="enable_satellite ? 'satellite' : ''" :style="{ top: navbarHeight + '' }">
			<view class="reload">
				<text style="margin-bottom: 10rpx;">卫星地图</text>
				<u-switch size="10" v-model="enable_satellite" activeColor="#04c354" inactiveColor="rgb(230, 230, 230)"></u-switch>
			</view>
			<view class="reload">
				<u-icon name="plus" :color="enable_satellite ? '#fff' : '#1f1f1f'" size="16" @click="scalePlus()"></u-icon>
				<text>地图{{scale}}层</text>
				<u-icon name="minus" :color="enable_satellite ? '#fff' : '#1f1f1f'" size="16" @click="scaleMinus()"></u-icon>
			</view>
			<view class="reload">
				<text style="margin-bottom: 10rpx;">显示村点</text>
				<u-switch size="10" v-model="enable_satellite" activeColor="#04c354" inactiveColor="rgb(230, 230, 230)"></u-switch>
			</view>
			<view class="reload">
				<text style="margin-bottom: 10rpx;">隐藏图层</text>
				<u-switch size="10" v-model="enable_satellite" activeColor="#04c354" inactiveColor="rgb(230, 230, 230)"></u-switch>
			</view>
		</view>
		<view class="content_map">
			<map :style="{ width: pagesWidth + 'px', height: '65vh' }" :latitude="latitude" :longitude="longitude"
				:enable-satellite="enable_satellite" :enable-3D="true" :scale="scale" :subkey="mapKey" layer-style="1"
				id="map" class="map" @regionchange="moveMap" :polyline="polyline"></map>
				<form>
				    <label>起点坐标：<input style="border:1px solid #000;" v-model="start"></input></label>
				    <!--终点输入框,例：39.984060,116.307520-->
				    <label>终点坐标：<input style="border:1px solid #000;" v-model="dest"></input></label> 
				    <!--提交表单数据-->
				    <button @click="formSubmit()">路线规划</button>
				</form>
				
		</view>
		<view class="editMap" v-show="showOverlay">
			<view class="nav">
				<view class="title">
					<view class="">
						<text>编辑图层</text>
					</view>
					<view class="" style="margin-left: 10rpx;">
						<u-button text="保存配置" size="small" shape="circle" @click="saveOverlay()"></u-button>
					</view>
				</view>
				<view class="">
				</view>
				<view class="add">
					<u-icon name="close" @click="closeShowOverlay()"></u-icon>
				</view>
			</view>
			<view class="listd">
				<view class="">
					<text>贴图图层大小</text>
				</view>
				<view class="">
					<u-slider v-model="mapImages[0].mapSize" :min="mapSize.min" :max="mapSize.max" @change="getSize"  activeColor="#04c354" inactiveColor="#c0c4cc">
					</u-slider>
				</view>
			</view>
			<view class="listd">
				<view class="">
					<text>贴图透明度({{mapImages[0].opacity*100}}%)</text>
				</view>
				<view class="">
					<u-slider v-model="mapImages[0].opacity" min="0" max="1" step="0.1" @change="getSize" activeColor="#04c354" inactiveColor="#c0c4cc"></u-slider>
				</view>
			</view>
			<view class="list">
				<view class="title"><text>贴图素材</text></view>
				<view class="content">
					<ru-file-upload @upPara="getImgData" :iniCount="1" :initData="[editOverlay.src]"
						paraGetMethods="active" iniTopPath="images/overlay"></ru-file-upload>
					<text v-if="editOverlay.width">{{editOverlay.width}}*{{editOverlay.height}}</text>
				</view>
			</view>
			<view class="list">
				<view class="title"><text>图层名称</text></view>
				<view class="content">
					<u--input placeholder="请输入内容" border="surround" v-model="editOverlay.name"></u--input>
				</view>
			</view>
			<view class="listd">
				<view class="">
					<text>贴图对角经纬度</text>
				</view>
				<view class="">
					<text>东北角:{{editOverlay.bounds.northeast.latitude}},{{editOverlay.bounds.northeast.longitude}}</text>
					<text>西南角:{{editOverlay.bounds.southwest.latitude}},{{editOverlay.bounds.southwest.longitude}}</text>
				</view>
			</view>
			
		</view>
		<view class="mapOverlayList" v-if="showOverlayList">
			<view class="nav">
				<view class="title">
					<text>地图图层列表</text>
				</view>
				<!-- <view class="">
						<u-icon name="arrow-up" color="#333333" size="28"></u-icon>
					</view> -->
				<view class="add">
					<u-button text="快速创建" size="small" shape="circle" @click="addOverlay()"></u-button>
				</view>
			</view>
			<view class="list">
				<HM-dragSorts :list="mapImages" :isLongTouch="false" :isAutoScroll="true" :feedbackGeneratorState="true"
					:rowHeight="55" @change="change" @confirm="confirm" @onclick="onclick">
					<template v-slot:rowContent="{row}">
						<view class="row">
							<u-avatar :src="row.src" @click="clickAvatar(row.src)"></u-avatar>
							<text class="text" style="margin-left: 10rpx;">{{row.name?row.name:'未命名'}}</text>
						</view>
					</template>
				</HM-dragSorts>
			</view>
		</view>
	</view>
</template>

<script>
	// 当前这个页面一进来肯定是要拿这个村的信息、包括位置标签列表
	// 引入SDK核心类
	import {
		mapState
	} from 'vuex';
	var QQMapWX = require('@/commonJS/qqmap-wx-jssdk.min.js');
	const imgBaseUrl = getApp().globalData.imgBaseUrl + '/app/static/';
	const chooseLocation = requirePlugin('chooseLocation');
	const MAPKEY = getApp().globalData.positionAPI_key;
	import { apiBusinessCardEdit_Put,apiBusinessCardInfo_Get } from '@/API/乡村名片.js';
	export default {
		data() {
			return {
				mapKey: MAPKEY,
				cardId: 0, // 传过来的乡村id
				pagesWidth: 0,
				menuwidth: 0,
				start:'',
				dest:'',
				latitude: 28.941871,
				introduce: '', //位置介绍
				longitude: 108.67746,
				scale: 16,
				enable_satellite: true,
				map_type: 1, //地图显示类型
				mp_1: imgBaseUrl + 'map_1.png',
				mp_2: imgBaseUrl + 'map_2.png',
				marker: [{
					id: 0,
					latitude: 28.941871, //纬度
					longitude: 108.67746, //经度
					iconPath: imgBaseUrl + 'map.png', //显示的图标
					width: '24',
					height: '28',
					rotate: 0, // 旋转度数
					alpha: 0.2, //透明度
					callout: {
						content: '位置名称',
						display: 'ALWAYS',
						padding: '10',
						borderRadius: 10
					}
				}],
				_mapContext: null,
				mapSize: {
					mix: 0,
					max: 5000
				},
				editOverlay: {},
				mapImages: [{
						id: 0,
						src: 'https://cdn.xiangcunmingpian.com/app/static/diyMap.png',
						mapSize: 2000,
						opacity: 1,
						name: '',
						zIndex: 11,
						bounds: {
							southwest: {
								latitude: null,
								longitude: null
							},
							northeast: {
								latitude: null,
								longitude: null
							}
						}
					},
					{
						id: 1,
						src: 'https://cdn.xiangcunmingpian.com/app/static/map_1.png',
						mapSize: 2000,
						opacity: 1,
						name: '111',
						zIndex: 2,
						bounds: {
							southwest: {
								latitude: null,
								longitude: null
							},
							northeast: {
								latitude: null,
								longitude: null
							}
						}
					}
				],
				editMap: false,
				showOverlay: false,
				showOverlayList: true,
				tempImgObject: [], //组件键
				timerID: 0,
				openLock: false, //初次设定锁
				lock: false ,//弹框状态锁 开启时无法关闭弹出窗
				navbarHeight:50,
				polyline:[
					{
						points:[],
						color:'',
						width:''
					}
				]
			};
		},
		computed: {
			...mapState('build', ['currentRural'])
		},
		onReady() {
			if (this.currentRural == null) {
				console.warn('乡村参数异常', this.currentRural);
				uni.navigateBack({ delta: 1 });
				return;
			}
			try {
				if (this.currentRural.mapOverlay) {
					this.mapImages = JSON.parse(this.currentRural.mapOverlay);
					console.log('我拿到的线上的数据', this.mapImages);
				} else {
					console.log('使用默认的数据', this.mapImages);
				}
			} catch (e) {
				console.log('地图配置数据渲染失败，使用默认数据');
			}

		},
		onLoad: function(option) {
			var that = this;
			this.cardId = option.cardId ? option.cardId : option.cardid;
			this.coordinateId = option.coordinateId;
			uni.getSystemInfo({
				success: function(res) {
					let menu = wx.getMenuButtonBoundingClientRect();
					that.menuwidth = menu.width + menu.width / 7;
					that.pagesWidth = res.windowWidth;
					console.log(that.menuwidth);
				}
			});
			that._mapContext = uni.createMapContext("map", that);
			that._mapContext.addGroundOverlay({
				id: that.mapImages[0].id,
				src: that.mapImages[0].src,
				bounds: that.mapImages[0].bounds,
				opacity: that.mapImages[0].opacity,
				complete(res) {
					console.log('initMarkerCluster', res);
				}
			});
			console.log('当前的经纬度', this.latitude, this.longitude)
		},

		methods: {
			formSubmit(){
			    var _this = this;
				var qqmapsdk = new QQMapWX({
				    key: MAPKEY // 必填
				});
			    //调用距离计算接口
			    qqmapsdk.direction({
			      mode: 'walking',//可选值：'driving'（驾车）、'walking'（步行）、'bicycling'（骑行），不填默认：'driving',可不填
			      //from参数不填默认当前地址
			      from: this.start,
			      to: this.dest, 
			      success: function (res) {
			        console.log(res);
			        var ret = res;
			        var coors = ret.result.routes[0].polyline, pl = [];
			        //坐标解压（返回的点串坐标，通过前向差分进行压缩）
			        var kr = 1000000;
			        for (var i = 2; i < coors.length; i++) {
			          coors[i] = Number(coors[i - 2]) + Number(coors[i]) / kr;
			        }
			        //将解压后的坐标放入点串数组pl中
			        for (var i = 0; i < coors.length; i += 2) {
			          pl.push({ latitude: coors[i], longitude: coors[i + 1] })
			        }
			        console.log(pl)
			        //设置polyline属性，将路线显示出来,将解压坐标第一个数据作为起点
					_this.latitude = pl[0].latitude
					_this.longitude = pl[0].longitude
					_this.polyline[0].points = pl
					_this.polyline[0].color = '#FF0000DD'
					_this.polyline[0].width = 3
			      },
			      fail: function (error) {
			        console.error(error);
			      },
			      complete: function (res) {
			        console.log(res);
			      }
			    });
			  },
			scalePlus(){
				if(this.scale==20){
					this.scale = 20
				}else{
					this.scale = this.scale + 1
				}
			},
			scaleMinus(){
				if(this.scale==3){
					this.scale = 3
				}else{
					this.scale = this.scale - 1
				}
			},
			saveOverlay(){
				this.mapImages[this.editOverlay.index] = this.editOverlay
				uni.showToast({
					icon: 'none',
					title: '保存参数成功'
				});
			},
			getNavbarHeight(e) {
				console.log('拿到的顶部参数', e);
				this.navbarHeight = e;
			},

			//关闭编辑框
			closeShowOverlay() {
				this.showOverlay = false
				this.showOverlayList = true
			},

			// 获取组件图片数据
			getImgData(para) {
				var that = this
				console.log('接收图片数据', para);
				if (para.length == 0) return;
				this.editOverlay.src = para[0];
				uni.getImageInfo({
					src: this.editOverlay.src,
					success: function(image) {
						console.log('获取到的图片信息:', image);
						that.editOverlay.width = image.width
						that.editOverlay.height = image.height
						var bili = Math.round(that.editOverlay.width / that.editOverlay.height * 10000) /
							1000.00
						console.log('当前图片百分比:', bili + ':100');
						var onSize = bili / 2
						var mapSize = (that.mapSize.max + 1) - that.editOverlay.mapSize
						that.editOverlay.bounds.northeast.latitude = that.latitude + (5 / mapSize)
						that.editOverlay.bounds.northeast.longitude = that.longitude + (onSize / mapSize)
						that.editOverlay.bounds.southwest.latitude = that.latitude - (5 / mapSize)
						that.editOverlay.bounds.southwest.longitude = that.longitude - (onSize / mapSize)
						console.log(that.editOverlay.bounds)
					}
				});
			},
			setNowImg(imgArray) {
				console.log('设置图片样式', imgArray);
				this.model1.navInfo.bgimg = imgArray;
				this.editOverlay.src = imgArray[0];
				
			},

			addOverlay() {
				var data = {
					id: 0,
					src: 'https://cdn.xiangcunmingpian.com/app/static/diyMap.png',
					mapSize: 2000,
					opacity: 1,
					name: '',
					bounds: {
						southwest: {
							latitude: null,
							longitude: null
						},
						northeast: {
							latitude: null,
							longitude: null
						}
					}
				}
				this.mapImages = this.mapImages.concat(data);
			},

			openEditMap() {
				var that = this
				that.latitude = that.latitude + 0.00000001
				that.longitude = that.longitude + 0.00000001
				uni.showToast({
					icon: 'none',
					title: '已校对地图中心'
				});
			},
			// 移动地图的事件
			moveMap() {
				var that = this
				that._mapContext = uni.createMapContext("map", that);
				that._mapContext.getCenterLocation({
					complete(res) {
						console.log('移动位置中心', res)
						if (that.editMap) {
							that.latitude = res.latitude
							that.longitude = res.longitude
							that.getSize()
						}
					}
				})
			},
			getOpacity() {
				// that.mapImages[0].opacity = index
			},
			getSize() {
				var that = this
				// that.mapImages[0].mapSize = index
				var bili = Math.round(that.mapImages[0].width / that.mapImages[0].height * 10000) / 1000.00
				console.log('当前图片百分比:', bili + ':100');
				var onSize = bili / 2
				var mapSize = (that.mapSize.max + 1) - that.mapImages[0].mapSize
				that.mapImages[0].bounds.northeast.latitude = that.latitude + (5 / mapSize)
				that.mapImages[0].bounds.northeast.longitude = that.longitude + (onSize / mapSize)
				that.mapImages[0].bounds.southwest.latitude = that.latitude - (5 / mapSize)
				that.mapImages[0].bounds.southwest.longitude = that.longitude - (onSize / mapSize)
				console.log(that.mapImages[0].bounds)
				that._mapContext = uni.createMapContext("map", that);
				that._mapContext.updateGroundOverlay({
					id: that.mapImages[0].id,
					src: that.mapImages[0].src,
					bounds: that.mapImages[0].bounds,
					opacity: that.mapImages[0].opacity,
					complete(res) {
						console.log('initMarkerCluster', res)
					}
				});
			},
			clickAvatar(e) {
				uni.previewImage({
					urls: e
					// current: e
				});
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
			
			
			saveData(){
				let mapOverlay = JSON.stringify(this.mapImages);
					console.log('保存内容', mapOverlay);
					let editApi_map = {
						mapOverlay: mapOverlay,
						cardId: this.currentRural.cardId,
					};
				
					new Promise((resolve, reject) => {
						apiBusinessCardEdit_Put(editApi_map).then(res => {
							console.log('手绘请求数据', res);
							if (res.data.code == 200 && res.data.msg.indexOf('成功') != -1) {
								this.$store.commit('build/setMapJson', mapOverlay);
								resolve();
							} else {
								reject();
							}
						});
					})
					.then(() => {
						return new Promise((resolve, reject) => {
							uni.showToast({ icon: 'success', title: '手绘地图更新完成' });
							setTimeout(() => {
								resolve();
							}, 1000);
						});
					})
					.catch(() => {
						uni.showToast({ icon: 'error', title: '地图更新失败' });
						console.log('错误');
					});
			},
			onclick(e) {
				console.log('=== onclick start ===');
				console.log("被点击行: " + JSON.stringify(e.value));
				console.log("被点击下标: " + JSON.stringify(e.index));
				console.log('=== onclick end ===');
				var index = JSON.stringify(e.index)
				this.editOverlay = e.value
				this.editOverlay.index = e.index
				this.showOverlayList = false
				this.showOverlay = true
			},
			change(e) {
				console.log('=== change start ===');
				console.log("被拖动行: " + JSON.stringify(e.moveRow));
				console.log('原始下标：', e.index);
				console.log('移动到：', e.moveTo);
				console.log('=== change end ===');
			},
			confirm(e) {
				console.log("e.list: ", e.list);
				console.log('=== confirm start ===');
				console.log("被拖动行: " + JSON.stringify(e.moveRow));
				console.log('原始下标：', e.index);
				console.log('移动到：', e.moveTo);
				console.log('=== confirm end ===');
			}
		},
	};
</script>

<style lang="scss">
	.u-nav-slot_left {
		display: flex;
		padding: 10rpx 0rpx;

		.name {
			font-size: 38rpx;
			font-family: 'SourceHanSerifCN-Bold';
			color: #fff;
		}

		.title {
			font-size: 26rpx;
			font-weight: 400;
		}
		.black{
			color:#333;
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

	.mapOverlayList {
		padding: 30rpx 20rpx;
		position: relative;
		top: -46rpx;
		border-radius: 20rpx 20rpx 0 0;
		background-color: #fff;

		.nav {
			display: flex;
			margin-bottom: 20rpx;
			justify-content: space-between;

			// padding-right: 10vw;
			.title {
				font-size: 32rpx;
			}
		}
	
	.list {
			.row {
				display: flex;
				align-items: center;
			}
		}
	}

	.editMap {
		padding: 20rpx;
		position: relative;
		top: -46rpx;
		border-radius: 20rpx 20rpx 0 0;
		background-color: #fff;
		.nav {
			display: flex;
			margin-bottom: 20rpx;
			justify-content: space-between;
			align-items: center;
			// padding-right: 10vw;
			.title {
				font-size: 32rpx;
				align-items: center;
				display: flex;
			}
		}

		.list {
			font-size: 32rpx;
			padding: 30rpx 0rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-top: 1rpx #f1f1ff solid;
			.content{
				font-size: 28rpx;
			}
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
	}

	.left_top_tool {
		position: absolute;
		top: 8%;
		left: 20rpx;
		z-index: 2;
		width: 78rpx;
		text-align: center;
		.noMap {
			font-size: 24rpx;
			background: #ffffffc4;
			padding: 8rpx 15rpx;
			border-radius: 16rpx;
			text-align: center;
			margin-bottom: 10rpx;
			width: fit-content;
		}

		.weather {
			display: flex;
			align-items: center;
			background: #ffffffc4;
			padding: 8rpx 15rpx;
			border-radius: 16rpx;
			width: fit-content;
		}

		.reload {
			display: flex;
			flex-direction: column;
			font-size: 24rpx;
			color: #1f1f1f;
			padding: 14rpx 10rpx;
			align-items: center;
			background: #ffffffcc;
			border-radius: 20rpx;
			margin-bottom: 20rpx;
		}
	}

	.right_top_tool {
		position: absolute;
		top: 9%;
		right: 20rpx;
		z-index: 2;
		width: 78rpx;
		text-align: center;

		.reload {
			display: flex;
			flex-direction: column;
			font-size: 24rpx;
			color: #1f1f1f;
			padding: 14rpx 10rpx;
			align-items: center;
			background: #ffffffcc;
			border-radius: 20rpx;
			margin-bottom: 20rpx;
		}
	}
	.satellite {
		.reload {
			background: #00000080;
			color: #fff;
		}
		.weather {
			background: #00000080;
			color: #fff;
		}
		.noMap {
			background: #00000080;
			color: #fff;
		}
		.currentPositioning {
			background: #00000080;
			color: #fff;
		}
	}
	.u-navbar__placeholder {
		display: none !important;
	}
</style>
