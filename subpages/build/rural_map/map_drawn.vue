<template>
	<view class="">
		<u-navbar
			:showAction="false"
			:placeholder="true"
			title=" "
			bgColor="#ffffff00"
			@getNavbarHeight="getNavbarHeight"
		>
			<view class="u-nav-slot_left" slot="left">
				<view class="name" :class="enable_satellite ? '' : 'black'"><text>手绘地图DIY</text></view>
			</view>
			<view
				class="u-nav-slot_right"
				slot="right"
				:style="'right:' + menuwidth + 'px;bottom:' + menuwidth / 11 + 'px'"
			>
				<view class="title" @click="saveData()"><text>保存配置</text></view>
			</view>
		</u-navbar>
		<view
			class="left_top_tool"
			:class="enable_satellite ? 'satellite' : ''"
			v-if="showOverlay"
			:style="{ top: navbarHeight + '' }"
		>
			<view class="reload">
				<text style="margin-bottom: 10rpx;">只看本图</text>
				<u-switch
					v-model="showOnlyOverlay"
					@change="onlyOverlay"
					size="12"
					activeColor="#04c354"
					inactiveColor="rgb(230, 230, 230)"
				></u-switch>
			</view>
			<view class="reload">
				<text style="margin-bottom: 10rpx;">拖拉移动</text>
				<u-switch
					v-model="editMap"
					@change="openEditMap"
					size="12"
					activeColor="#04c354"
					inactiveColor="rgb(230, 230, 230)"
				></u-switch>
			</view>
		</view>
		<view class="right_top_tool" :class="enable_satellite ? 'satellite' : ''" :style="{ top: navbarHeight + '' }">
			<view class="reload">
				<text style="margin-bottom: 10rpx;">卫星地图</text>
				<u-switch
					size="10"
					v-model="enable_satellite"
					activeColor="#04c354"
					inactiveColor="rgb(230, 230, 230)"
				></u-switch>
			</view>
			<view class="reload">
				<u-icon
					name="plus"
					:color="enable_satellite ? '#fff' : '#1f1f1f'"
					size="16"
					@click="scalePlus()"
				></u-icon>
				<text>地图{{ scale }}层</text>
				<u-icon
					name="minus"
					:color="enable_satellite ? '#fff' : '#1f1f1f'"
					size="16"
					@click="scaleMinus()"
				></u-icon>
			</view>
			<view class="reload">
				<text style="margin-bottom: 10rpx;">显示村点</text>
				<u-switch
					size="12"
					v-model="showRuralCenter"
					@change="ruralCenter"
					activeColor="#04c354"
					inactiveColor="rgb(230, 230, 230)"
				></u-switch>
			</view>
			<view class="reload">
				<text style="margin-bottom: 10rpx;">隐藏图层</text>
				<u-switch
					size="10"
					v-model="showHideOverlay"
					@change="hideOverlay"
					activeColor="#04c354"
					inactiveColor="rgb(230, 230, 230)"
				></u-switch>
			</view>
		</view>
		<view class="content_map">
			<map
				:style="{ width: pagesWidth + 'px', height: '100%' }"
				:latitude="latitude"
				:longitude="longitude"
				:enable-satellite="enable_satellite"
				:enable-3D="true"
				:scale="scale"
				:subkey="mapKey"
				layer-style="1"
				:markers="marker"
				id="map"
				class="map"
				@regionchange="moveMap"
			></map>
			<view class="left_bottom_tool" :class="enable_satellite ? 'satellite' : ''" :style="showOverlayList?'bottom:220rpx;':''">
				<view class="reload" @click="goRuralCenter">
					<u-icon
						:name="
							enable_satellite
								? 'https://cdn.xiangcunmingpian.com/app/static/currentPositioning_on.png'
								: 'https://cdn.xiangcunmingpian.com/app/static/currentPositioning.png'
						"
						color="#1f1f1f"
						size="20"
					></u-icon>
				</view>
			</view>
			<view class="center_bottom_tool" :class="enable_satellite ? 'satellite' : ''" v-if="showOverlay">
				<view class="reload" @click="zoomOverlay(1)">
					<u-icon name="minus" :color="enable_satellite ? '#fff' : '#1f1f1f'" size="20"></u-icon>
				</view>
				<!-- <view class="reload" @click="mvOverlay(1)">
					<u-icon name="arrow-leftward" :color="enable_satellite ? '#fff' : '#1f1f1f'" size="20"></u-icon>
				</view>
				<view class="reload" @click="mvOverlay(2)">
					<u-icon name="arrow-upward" :color="enable_satellite ? '#fff' : '#1f1f1f'" size="20"></u-icon>
				</view>
				<view class="reload" @click="mvOverlay(3)">
					<u-icon name="arrow-downward" :color="enable_satellite ? '#fff' : '#1f1f1f'" size="20"></u-icon>
				</view>
				<view class="reload" @click="mvOverlay(4)">
					<u-icon name="arrow-rightward" :color="enable_satellite ? '#fff' : '#1f1f1f'" size="20"></u-icon>
				</view> -->
				<view class="reload" @click="zoomOverlay(2)">
					<u-icon name="plus" :color="enable_satellite ? '#fff' : '#1f1f1f'" size="20"></u-icon>
				</view>
			</view>
		</view>
		<view class="editMap" v-show="showOverlay">
			<view class="nav">
				<view class="title">
					<view class=""><text>编辑图层</text></view>
					<!-- <view class="" style="margin-left: 10rpx;">
						<u-button text="复位" size="small" shape="circle" @click="saveOverlay()"></u-button>
					</view> -->
					<view class="" style="margin-left: 10rpx;">
						<u-button text="保存配置" size="small" shape="circle" @click="saveOverlay()"></u-button>
					</view>
				</view>
				<view class=""></view>
				<view class="add">
					<view class="" style="margin-right: 16rpx;">
						<u-button text="删除图层" size="small" shape="circle" @click="deleteOverlay()"></u-button>
					</view>
					<view class=""><u-icon name="close" @click="closeShowOverlay()"></u-icon></view>
				</view>
			</view>
			<!-- <view class="listd">
				<view class="">
					<text>贴图图层大小</text>
				</view>
				<view class="">
					<u-number-box v-model="editOverlay.zIndex" @change="overlayZindex"></u-number-box>
				</view>
			</view> -->
			<view class="listd">
				<view class="" style="display: flex;flex-direction: column;">
					<text>贴图图层大小</text>
					<text v-if="editOverlay.mapSize<300" style="font-size: 26rpx;">(请使用上排加减号微调配合地图放大层级进行微调)</text>
					<text v-if="editOverlay.mapSize>4500" style="font-size: 26rpx;">(请使用上排加减号，越大的数值，可以缩放越大)</text>
				</view>
				<view class="">
					<u-slider
						v-model="editOverlay.mapSize"
						:min="mapSize.min"
						:max="mapSize.max"
						step="0.1"
						@change="getSize"
						activeColor="#04c354"
						inactiveColor="#c0c4cc"
						:showValue="true"
					></u-slider>
				</view>
			</view>
			<view class="listd">
				<view class="">
					<text>贴图透明度({{ editOverlay.opacity * 100 }}%)</text>
				</view>
				<view class="">
					<u-slider
						v-model="editOverlay.opacity"
						min="0"
						max="1"
						step="0.1"
						@change="getOpacity"
						activeColor="#04c354"
						inactiveColor="#c0c4cc"
					></u-slider>
				</view>
			</view>
			<view class="list">
				<view class="title"><text>贴图素材(正方形)</text></view>
				<view class="content">
					<ru-file-upload
						@upPara="getImgData"
						:iniCount="1"
						:initData="imageBoss"
						paraGetMethods="active"
						iniTopPath="images/overlay"
					></ru-file-upload>
					<text v-if="editOverlay.width">{{ editOverlay.width }}px*{{ editOverlay.height }}px</text>
				</view>
			</view>
			<view class="list">
				<view class="title"><text>是否显示</text></view>
				<view class="content">
					<u-switch
						size="20"
						v-model="editOverlay.show"
						activeColor="#04c354"
						inactiveColor="rgb(230, 230, 230)"
					></u-switch>
				</view>
			</view>
			<view class="list">
				<view class="title"><text>图层名称</text></view>
				<view class="content">
					<u--input placeholder="请输入内容" border="surround" v-model="editOverlay.name"></u--input>
				</view>
			</view>
			<view class="listd">
				<view class="" style="display: flex;align-items: center;margin-bottom: 10rpx;">
					<text>贴图配置</text>
					<u-icon name="question-circle" @click="questionCode()"></u-icon>
				</view>
				<view class="">
					<u--textarea
						v-model="editOverlay.code"
						placeholder="请输入内容"
						maxlength="999"
						@input="overlayCode"
						size="12"
					></u--textarea>
				</view>
			</view>
		</view>
		<u-popup :show="showOverlayList" :overlay="false" round="20">
			<view class="mapOverlayList">
				<view class="nav">
					<view class="title"><text>地图图层列表</text></view>
					<view class="add">
						<u-button text="快速创建" size="small" shape="circle" @click="addOverlay()"></u-button>
					</view>
				</view>
				<HM-dragSorts
					:list="mapImages"
					:isLongTouch="false"
					:isAutoScroll="true"
					:feedbackGeneratorState="true"
					:rowHeight="55"
					@change="change"
					@confirm="confirm"
					@onclick="onclick"
				>
					<template v-slot:rowContent="{ row }">
						<view class="row">
							<u-avatar :src="row.src" @click="clickAvatar(row.src)"></u-avatar>
							<text class="text" style="margin-left: 10rpx;">{{ row.name ? row.name : '未命名' }}</text>
							<u-icon v-if="!row.show" name="eye-off"></u-icon>
						</view>
					</template>
				</HM-dragSorts>
			</view>
		</u-popup>
	</view>
</template>

<script>
// 当前这个页面一进来肯定是要拿这个村的信息、包括位置标签列表
// 引入SDK核心类
import { mapState } from 'vuex';
var QQMapWX = require('@/commonJS/qqmap-wx-jssdk.min.js');
const imgBaseUrl = getApp().globalData.imgBaseUrl + '/app/static/';
const chooseLocation = requirePlugin('chooseLocation');
const MAPKEY = getApp().globalData.positionAPI_key;
import { apiBusinessCardEdit_Put, apiBusinessCardInfo_Get } from '@/API/乡村名片.js';
export default {
	data() {
		return {
			mapKey: MAPKEY,
			pagesWidth: 0,
			menuwidth: 0,
			latitude: null,
			introduce: '', //位置介绍
			longitude: null,
			scale: 15,
			enable_satellite: true,
			map_type: 1, //地图显示类型
			mp_1: imgBaseUrl + 'map_1.png',
			mp_2: imgBaseUrl + 'map_2.png',
			marker: [],
			_mapContext: null,
			mapSize: {
				mix: 10,
				max: 5000
			},
			editOverlay: {},
			mapImages: [], //图层列表
			editMap: false, //是否允许拖拉编辑图层
			showOverlay: false, //是否展示贴图编辑
			showOverlayList: true, //是否展示贴图列表
			navbarHeight: 50, //顶部导航高度
			showRuralCenter: true, //展示村中心图标
			showHideOverlay: false, //是否隐藏全部贴图
			showOnlyOverlay: false, //只看本贴图
			nowScale: 15 ,//当前实际缩放层级
			imageBoss:[]
		};
	},
	computed: {
		...mapState('build', ['currentRural'])
	},
	onReady() {
		var that = this;
		if (this.currentRural == null) {
			console.warn('乡村参数异常', this.currentRural);
			uni.navigateBack({
				delta: 1
			});
			return;
		} else {
			this.latitude = this.currentRural.latitude;
			this.longitude = this.currentRural.longitude;
			this.ruralCenter(true);
			console.log('当前的经纬度', this.latitude, this.longitude);
		}
		try {
			if (this.currentRural.mapOverlay) {
				this.mapImages = JSON.parse(this.currentRural.mapOverlay);
				console.log('我拿到的线上的数据', this.mapImages);
				that._mapContext = uni.createMapContext('map', that);
				that.mapImages.map((item, index) => {
					that._mapContext.addGroundOverlay({
						id: item.id,
						src: item.src,
						bounds: item.bounds,
						opacity: item.opacity,
						visible: item.show,
						zIndex: item.zIndex,
						complete(res) {
							console.log('更新图层列表的贴图', res);
						}
					});
				});
			} else {
				console.log('使用默认的数据', this.mapImages);
			}
		} catch (e) {
			console.log('地图配置数据渲染失败，使用默认数据');
		}
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
		// console.log(this.getBounds(117.176276,40.688021,2))
		// console.log(this.calcAlongCoord({lng:117.176276, lat: 40.688021, ang: 45, spd: 2}))
		// console.log(this.getSqrt(60,100))
	},

	methods: {
		//通用经纬度东北角、西南角算法
		getBounds(lng1,lat1,long1){
			return {
				southwest: {
					longitude:this.calcAlongCoord({lng: lng1, lat: lat1, ang: 225, spd: long1}).lng,
					latitude: this.calcAlongCoord({lng: lng1, lat: lat1, ang: 225, spd: long1}).lat
				},
				northeast: {
					longitude:this.calcAlongCoord({lng: lng1, lat: lat1, ang: 45, spd: long1}).lng,
					latitude: this.calcAlongCoord({lng: lng1, lat: lat1, ang: 45, spd: long1}).lat
				}
			}
		},
		// 获取图层信息
		getSize(){
			var that = this;
			// that.editOverlay.mapSize = index
			var bili = Math.round((that.editOverlay.width / that.editOverlay.height) * 10000) / 100.0;
			console.log('当前图片百分比:', bili + ':100');
			var diagonal = that.getSqrt(bili,100)
			var newSize = diagonal*20/((that.mapSize.max+10)-that.editOverlay.mapSize);
			var newsSize = that.myFixed(newSize,3);
			// var mapSize = that.mapSize.max + 10 - data.mapSize;
			console.log(Number(that.longitude),Number(that.latitude),Number(newsSize));
			that.editOverlay.bounds = that.getBounds(Number(that.editOverlay.longitude),Number(that.editOverlay.latitude),Number(newsSize));
			console.log('返回的数据',that.editOverlay);
			that._mapContext.updateGroundOverlay({
				id: that.editOverlay.id,
				src: that.editOverlay.src,
				bounds: that.editOverlay.bounds,
				opacity: that.editOverlay.opacity,
				zIndex: that.editOverlay.zIndex,
				complete(res) {
					console.log('然后创建新的图层', res);
				}
			});
			// that.mapImages.unshift(data);
			// that.restartOverlay() //重启全部
			// that._mapContext.removeGroundOverlay({
			// 	id: that.editOverlay.id,
			// 	complete(res) {
			// 		console.log('先删除图层', res);
			// 		that._mapContext.addGroundOverlay({
			// 			id: that.editOverlay.id,
			// 			src: that.editOverlay.src,
			// 			bounds: that.editOverlay.bounds,
			// 			opacity: that.editOverlay.opacity,
			// 			zIndex: that.editOverlay.zIndex,
			// 			complete(res) {
			// 				console.log('然后创建新的图层', res);
			// 			}
			// 		});
			// 	}
			// });
		},
		
		// 添加图层
		addOverlay() {
			var that = this;
			that._mapContext = uni.createMapContext('map', that);
			that._mapContext.getCenterLocation({
				complete(res) {
					console.log('获取图层现在最新位置中心', res);
					that.latitude = that.myFixed(res.latitude,7);
					that.longitude = that.myFixed(res.longitude,7);
					let nowTime = new Date().getTime().toFixed();
					console.log(nowTime, 'time'); // {} time
					var data = {
						id: Number(nowTime),
						src: 'https://cdn.xiangcunmingpian.com/app/static/mapLogo.png',
						mapSize: 1900,
						opacity: 1,
						name: '',
						show: true,
						index: that.mapImages.length + 1,
						zIndex: that.mapImages.length + 1,
						latitude: that.latitude,
						longitude: that.longitude,
					};
					uni.getImageInfo({
						src: data.src,
						success: function(image) {
							console.log('获取到的上传图片信息:', image);
							data.width = image.width;
							data.height = image.height;
							var bili = Math.round((data.width / data.height) * 10000) / 100.0;
							console.log('当前图片百分比:', bili + ':100');
							var diagonal = that.getSqrt(bili,100)
							var newSize = diagonal*20/3100;
							var mapSize = that.mapSize.max + 10 - data.mapSize;
							console.log(Number(that.longitude),Number(that.latitude),Number(newSize));
							data.bounds = that.getBounds(Number(that.longitude),Number(that.latitude),Number(newSize));
							console.log('返回的数据',data);
							that.mapImages.unshift(data);
							that.restartOverlay()
						}
					});
				}
			});
		},
		
		
		// 获取组件图片数据
		getImgData(para) {
			var that = this;
			console.log('一开始的我的数据格式',that.editOverlay.src)
			console.log('目前接收图片数据', para);
			if (para.length == 0) return;
			var imsSrc = para[0]
			that.editOverlay.src = imsSrc.toString();
			setTimeout(function() {
				console.log('拿到赋值的图片',that.editOverlay.src)
			}, 1000);
			uni.getImageInfo({
				src: that.editOverlay.src,
				success: function(image) {
					console.log('获取到的图片信息:', image);
					if (that.editOverlay.src == null) {
						console.log('当前图片是空的');
						return;
					}
					if (that.mapImages[that.editOverlay.index].src != that.editOverlay.src) {
						
						console.log('当前与之前图片不一样，重新更新',that.editOverlay.src);
						that.editOverlay.width = image.width;
						that.editOverlay.height = image.height;
						var bili = Math.round((that.editOverlay.width / that.editOverlay.height) * 10000) / 1000.0;
						console.log('当前图片百分比:', bili + ':100');
						var onSize = bili / 2;
						var mapSize = that.mapSize.max + 1 - that.editOverlay.mapSize;
						that.editOverlay.bounds = that.getBounds(Number(that.editOverlay.longitude),Number(that.editOverlay.latitude),Number(newSize));
						console.log(that.editOverlay.bounds);
						that.editOverlay.code = JSON.stringify(that.editOverlay.bounds);
						that._mapContext.updateGroundOverlay({
							id: that.editOverlay.id,
							src: that.editOverlay.src,
							bounds: that.editOverlay.bounds,
							opacity: that.editOverlay.opacity,
							zIndex: that.editOverlay.zIndex,
							complete(res) {
								console.log('新图片更新成功', res);
							}
						});
					} else {
						console.log('当前与之前图片重复 不更新');
						return;
					}
				},fail(cuowu) {
					console.log("读取失败显示这个",cuowu)
					console.log("再来一次")
					uni.showToast({
						icon: 'none',
						title: '风控检查中'
					});
					setTimeout(function() {
					uni.getImageInfo({
						src: that.editOverlay.src,
						success: function(image1) {
							console.log('获取到的图片信息:', image1);
							if (that.editOverlay.src == null) {
								console.log('当前图片是空的');
								return;
							}
							if (that.mapImages[that.editOverlay.index].src != that.editOverlay.src) {
								console.log('当前与之前图片不一样，重新更新',that.editOverlay.src);
								that.editOverlay.width = image1.width;
								that.editOverlay.height = image1.height;
								
								var bili = Math.round((that.editOverlay.width / that.editOverlay.height) * 10000) / 100.0;
								console.log('当前图片百分比:', bili + ':100');
								var diagonal = that.getSqrt(bili,100)
								var newSize = diagonal*20/((that.mapSize.max+10)-that.editOverlay.mapSize);
								var newsSize = that.myFixed(newSize,3);
								// var mapSize = that.mapSize.max + 10 - data.mapSize;
								console.log(Number(that.editOverlay.longitude),Number(that.editOverlay.longitude),Number(newsSize));
								that.editOverlay.bounds = that.getBounds(Number(that.editOverlay.longitude),Number(that.editOverlay.latitude),Number(newsSize));
								console.log('返回的数据',that.editOverlay);
								// that.mapImages.unshift(data);
								// that.restartOverlay() //重启全部
								that._mapContext.removeGroundOverlay({
									id: that.editOverlay.id,
									complete(res) {
										console.log('先删除图层', res);
										that._mapContext.addGroundOverlay({
											id: that.editOverlay.id,
											src: that.editOverlay.src,
											bounds: that.editOverlay.bounds,
											opacity: that.editOverlay.opacity,
											zIndex: that.editOverlay.zIndex,
											complete(res) {
												console.log('然后创建新的图层', res);
											}
										});
									}
								});
							} else {
								console.log('当前与之前图片重复 不更新');
								return;
							}
						},fail(cuowu1) {
							console.log("还是读取失败",cuowu1)
							uni.showToast({
								icon: 'none',
								title: '很抱歉，尝试重新上传，可能图片过大'
							});
						}
					});
					}, 3000);
				}
			});
		},
		
		//透明度
		getOpacity(e){
			this.editOverlay.opacity = parseFloat(e).toFixed(1)
			this.getSize()
		},
		//移动位置
		mvOverlay(e){
			var that = this
			var chuyu = parseInt(that.nowScale)/10
			var realVal = parseFloat(chuyu).toFixed(4)
			console.log("加减多少哇",realVal)
			console.log('修改前的信息',that.editOverlay)
			//点击左
			if(e==1){
				that.editOverlay.latitude = that.calcAlongCoord({lng: Number(that.editOverlay.longitude), lat: Number(that.editOverlay.latitude), spd: Number(realVal)}).lat
				that.editOverlay.longitude = Number(that.editOverlay.longitude)
				console.log('用户点击了左',that.editOverlay.latitude,that.editOverlay.longitude)
				this.getSize()
			}
			//点击上
			if(e==2){
				that.editOverlay.longitude = (Number(that.editOverlay.longitude) - Number(realVal))
				that.editOverlay.latitude = Number(that.editOverlay.latitude)
			
			}
			//点击下
			if(e==3){
				that.editOverlay.longitude = Number(that.editOverlay.longitude) - Number(realVal)
				that.editOverlay.latitude = Number(that.editOverlay.latitude)
			}
			//点击右
			if(e==4){
				that.editOverlay.latitude = Number(that.editOverlay.latitude) - Number(realVal)
				that.editOverlay.longitude = Number(that.editOverlay.longitude)
			}
		},
		zoomOverlay(e){
			var that = this
			//点击缩小
			if(e==1){
				if (that.editOverlay.mapSize < that.mapSize.mix) {
					that.editOverlay.mapSize = that.mapSize.mix
					uni.showToast({
						icon: 'none',
						title: '已经最小值'
					});
					that.getSize()
				} else {
					console.log(parseInt(21-that.nowScale))
					that.editOverlay.mapSize = that.editOverlay.mapSize - (1*parseInt(21-that.nowScale))
					that.getSize()
				}
			}
			
			//点击放大
			if(e==2){
				if (that.editOverlay.mapSize > that.mapSize.max) {
					that.editOverlay.mapSize = that.mapSize.max
					uni.showToast({
						icon: 'none',
						title: '已经最大值'
					});
					that.getSize()
				} else {
					console.log(parseInt(21-that.nowScale))
					that.editOverlay.mapSize = that.editOverlay.mapSize + (1*parseInt(21-that.nowScale))
					that.getSize()
				}
			}
			
			
		},
		
		// 图片层级顺序测试
		overlayZindex(e) {
			var that = this;
			that._mapContext.updateGroundOverlay({
				id: that.editOverlay.id,
				zIndex: that.editOverlay.zIndex,
				complete(res) {
					console.log('自定义图层顺序', res);
				}
			});
		},
		// 回到村中心
		goRuralCenter() {
			var that = this;
			if (Number(that.latitude) == Number(that.currentRural.latitude)) {
				that.latitude = Number(that.currentRural.latitude) + 0.00001;
				that.longitude = Number(that.currentRural.longitude) + 0.00001;
			} else {
				that.latitude = Number(that.currentRural.latitude);
				that.longitude = Number(that.currentRural.longitude);
			}
			uni.showToast({
				icon: 'none',
				title: '已复位村中心'
			});
		},

		// 只看本图
		onlyOverlay(e) {
			//onlyOverlay
			var that = this;
			that._mapContext = uni.createMapContext('map', that);
			if (e) {
				that.mapImages.map((item, index) => {
					that._mapContext.removeGroundOverlay({
						id: item.id,
						complete(res) {
							console.log('initMarkerCluster', res);
						}
					});
				});
				that._mapContext.addGroundOverlay({
					id: that.editOverlay.id,
					src: that.editOverlay.src,
					bounds: that.editOverlay.bounds,
					opacity: that.editOverlay.opacity,
					complete(res) {
						console.log('initMarkerCluster', res);
					}
				});
			} else {
				that.mapImages.map((item, index) => {
					that._mapContext.addGroundOverlay({
						id: item.id,
						src: item.src,
						bounds: item.bounds,
						opacity: item.opacity,
						visible: item.show,
						complete(res) {
							console.log('initMarkerCluster', res);
						}
					});
				});
			}
		},

		//隐藏图层
		hideOverlay(e) {
			var that = this;
			that._mapContext = uni.createMapContext('map', that);
			if (e) {
				that.mapImages.map((item, index) => {
					that._mapContext.removeGroundOverlay({
						id: item.id,
						complete(res) {
							console.log('initMarkerCluster', res);
						}
					});
				});
			} else {
				that.mapImages.map((item, index) => {
					that._mapContext.addGroundOverlay({
						id: item.id,
						src: item.src,
						bounds: item.bounds,
						opacity: item.opacity,
						visible: item.show,
						complete(res) {
							console.log('initMarkerCluster', res);
						}
					});
				});
			}
		},

		// 贴图代码提醒
		questionCode() {
			uni.showModal({
				title: '温馨提醒',
				content: `贴图配置是指下载设计贴图时，当时尺寸的配置，可用于下次直接复制导入，请配合教程使用，非专业人士用不到此功能。`,
				showCancel: false,
				confirmColor: '#04c354',
				confirmText: '我知道了'
			});
		},

		//显示村点
		ruralCenter(e) {
			console.log(e);
			if (e) {
				var mapData = {
					id: 0,
					latitude: this.currentRural.latitude, //纬度
					longitude: this.currentRural.longitude, //经度
					iconPath: imgBaseUrl + 'map.png', //显示的图标
					alpha: 1, //透明度
					width: '24',
					height: '28',
					callout: {
						content: this.currentRural.name,
						display: 'ALWAYS',
						padding: '10',
						borderRadius: 10
					}
				};
				this.marker = this.marker.concat(mapData);
			} else {
				this.marker = [];
			}
		},

		// 地图层级增大
		scalePlus() {
			if (this.scale == 20) {
				this.scale = 20;
			} else {
				this.scale = this.scale + 1;
			}
		},

		// 地图层级增小
		scaleMinus() {
			if (this.scale == 3) {
				this.scale = 3;
			} else {
				this.scale = this.scale - 1;
			}
		},

		// 保存图层
		saveOverlay() {
			this.mapImages[this.editOverlay.index] = this.editOverlay;
			this.editMap = false;
			uni.showToast({
				icon: 'none',
				title: '保存参数成功'
			});
		},

		// 获取顶部高度
		getNavbarHeight(e) {
			console.log('拿到的顶部参数', e);
			this.navbarHeight = e;
		},

		//关闭编辑框
		closeShowOverlay() {
			var that = this
			that.mapImages.map((item, index) => {
				that._mapContext.removeGroundOverlay({
					id: item.id,
					complete(res) {
						console.log('initMarkerCluster', res);
					}
				});
			});
			that.mapImages.map((item, index) => {
				that._mapContext.addGroundOverlay({
					id: item.id,
					src: item.src,
					bounds: item.bounds,
					opacity: item.opacity,
					visible: item.show,
					complete(res) {
						console.log('initMarkerCluster', res);
					}
				});
			});
			this.editMap = false; //不能移动啦
			this.editOverlay = {};
			this.showOverlay = false;
			this.showOverlayList = true;
		},

		// 删除图层贴图
		deleteOverlay() {
			var that = this;
			uni.showModal({
				title: '温馨提示',
				content: '你是否删除此图层',
				success: function(res) {
					if (res.confirm) {
						console.log('用户点击确定');
						that.mapImages.splice(that.editOverlay.index, 1);
						that._mapContext = uni.createMapContext('map', that);
						that._mapContext.removeGroundOverlay({
							id: that.editOverlay.id,
							complete(res) {
								console.log('创建新建图层的贴图', res);
							}
						});
						that.closeShowOverlay();
					} else if (res.cancel) {
						console.log('用户点击取消');
					}
				}
			});
		},
		
		//计算方法
		myFixed(num, digit) {
		     if(Object.is(parseFloat(num), NaN)) {
		     return console.log(`传入的值：${num}不是一个数字`);
		     }
		     num = parseFloat(num);
		     return (Math.round((num + Number.EPSILON) * Math.pow(10, digit)) / Math.pow(10, digit)).toFixed(digit);
		},

		//计算比例对角线长度的加宽度
		getSqrt(width,height){
			var long = Math.sqrt(width*width+height*height)
			return parseInt(long/2)
		},
		
		// 计算沿线坐标
		calcAlongCoord(opts) {
		    var spd = opts.spd / 3600;
		    // 计算偏移坐标
		    var lengthen = spd * 600000; // 延长10分钟的距离
		    var d = lengthen / 6371004; // 6371004地球平均半径
		    var lng = (Math.PI / 180) * opts.lng;
		    var lat = (Math.PI / 180) * opts.lat;
		    var tc = (Math.PI / 180) * opts.ang;
		    var y = Math.asin(Math.sin(lat) * Math.cos(d) + Math.cos(lat) * Math.sin(d) * Math.cos(tc));
		    var dlng = Math.atan2(Math.sin(tc) * Math.sin(d) * Math.cos(lat), Math.cos(d) - Math.sin(lat) * Math.sin(y));
		    var x = lng + dlng;
		    var lon2 = (x * (180 / Math.PI) + 540 % 360 - 180).toFixed(6);
		    var lat2 = (y * (180 / Math.PI)).toFixed(6);
		    return {
		        lng: Number(lon2),
		        lat: Number(lat2)
		    }
		},
		
		// 经纬度转弧度
		millerXY (lon, lat){
		     var L = 6381372 * Math.PI * 2,     // 地球周长
		         W = L, // 平面展开后，x轴等于周长
		         H = L / 2, // y轴约等于周长一半
		         mill = 2.3, // 米勒投影中的一个常数，范围大约在正负2.3之间
		         x = lon * Math.PI / 180, // 将经度从度数转换为弧度
		         y = lat * Math.PI / 180; // 将纬度从度数转换为弧度
		     // 这里是米勒投影的转换
		     y = 1.25 * Math.log( Math.tan( 0.25 * Math.PI + 0.4 * y ) );
		     // 这里将弧度转为实际距离
		     x = ( W / 2 ) + ( W / (2 * Math.PI) ) * x;
		     y = ( H / 2 ) - ( H / ( 2 * mill ) ) * y;
		     // 转换结果的单位是公里
		     // 可以根据此结果，算出在某个尺寸的画布上，各个点的坐标
		     return {
		          x : x,
		          y : y
		     };
		},
		
		// 打开图片编辑
		openEditMap(e) {
			var that = this;
			if (e) {
				if (Number(that.latitude) == Number(that.editOverlay.latitude)){
					that.latitude = Number(that.editOverlay.latitude) + 0.00001;
					that.longitude = Number(that.editOverlay.longitude) + 0.00001;
				} else {
					that.latitude = Number(that.editOverlay.latitude);
					that.longitude = Number(that.editOverlay.longitude);
				}
				uni.showToast({
					icon: 'none',
					title: '已校对图层中心'
				});
			} else {
				uni.showToast({
					icon: 'none',
					title: '已关闭拖拉设计'
				});
			}
		},

		// 移动地图的事件
		moveMap() {
			var that = this;
			that._mapContext = uni.createMapContext('map', that);
			that._mapContext.getScale({
				complete(res) {
					console.log('当前的地图缩放层级', res);
					that.nowScale = res.scale;
				}
			});
			that._mapContext.getCenterLocation({
				complete(res) {
					console.log('移动位置中心', res);
					if (that.editMap) {
						that.editOverlay.latitude = parseFloat(res.latitude).toFixed(7);
						that.editOverlay.longitude = parseFloat(res.longitude).toFixed(7);
						that.getSize();
					}
				}
			});
		},

		// 点击头像弹出贴图内容 但是这个用不了
		clickAvatar(e) {
			uni.previewImage({
				urls: e
				// current: e
			});
		},

		// 编辑图层代码实时修改图层坐标
		overlayCode(e) {
			console.log(e.detail.value);
			this.editOverlay.bounds = JSON.parse(e.detail.value);
		},

		// 保存图层数据
		saveData() {
			let mapOverlay = JSON.stringify(this.mapImages);
			console.log('保存内容', mapOverlay);
			let editApi_map = {
				mapOverlay,
				cardId: this.currentRural.cardId
			};

			new Promise((resolve, reject) => {
				apiBusinessCardEdit_Put(editApi_map).then(res => {
					console.log('手绘请求数据', res);
					if (res.data.code == 200 && res.data.msg.indexOf('成功') != -1) {
						this.$store.commit('build/setMapOverlay', mapOverlay);
						resolve();
					} else {
						reject();
					}
				});
			})
				.then(() => {
					return new Promise((resolve, reject) => {
						uni.showToast({
							icon: 'success',
							title: '手绘地图更新完成'
						});
						setTimeout(() => {
							resolve();
						}, 500);
					});
				})
				.catch(() => {
					uni.showToast({
						icon: 'error',
						title: '地图更新失败'
					});
					console.log('错误');
				});
		},

		//	点击图层列表list
		onclick(e) {
			var that = this;
			console.log('=== onclick start ===');
			console.log('被点击行: ' + JSON.stringify(e.value));
			console.log('被点击下标: ' + JSON.stringify(e.index));
			console.log('=== onclick end ===');
			var index = JSON.stringify(e.index);

			this.editOverlay = e.value;
			this.editOverlay.index = e.index;
			this.imageBoss = [this.editOverlay.src]
			if(Number(that.latitude) == Number(that.editOverlay.latitude)) {
				console.log('点击图层list，发现当前的经纬是list定位+0.1')
				that.latitude = Number(that.editOverlay.latitude) + 0.00001;
				that.longitude = Number(that.editOverlay.longitude) + 0.00001;
			} else {
				console.log('点击图层list，发现当前的经纬与list一致')
				that.latitude = Number(that.editOverlay.latitude);
				that.longitude = Number(that.editOverlay.longitude);
			}
			this.editOverlay.code = JSON.stringify(this.editOverlay.bounds);
			this.showOverlayList = false;
			this.showOverlay = true;
			that._mapContext.updateGroundOverlay({
				id: that.editOverlay.id,
				opacity: 0.4,
				src: that.editOverlay.src,
				bounds: that.editOverlay.bounds,
				opacity: that.editOverlay.opacity,
				zIndex: that.editOverlay.zIndex,
				complete(res) {
					console.log('编辑图层闪烁', res);
					setTimeout(function() {
						that._mapContext.updateGroundOverlay({
							id: that.editOverlay.id,
							opacity: 1,
							src: that.editOverlay.src,
							bounds: that.editOverlay.bounds,
							opacity: that.editOverlay.opacity,
							zIndex: that.editOverlay.zIndex,
							complete(res) {
								console.log('编辑图层闪烁', res);
							}
						});
					}, 1000);
				}
			});
	
			
		},

		// 触碰图层列表list
		change(e) {
			var that = this;
			console.log('=== change start ===');
			console.log('被拖动行: ' + JSON.stringify(e.moveRow));
			console.log('原始下标：', e.index);
			console.log('移动到：', e.moveTo);
			console.log('=== change end ===');
		},

		// 拖拉图层list
		confirm(e) {
			var that = this;
			console.log('e.list: ', e.list);
			that.mapImages = e.list;
			//更改层级
			that.restartOverlay()
			console.log('=== confirm start ===');
			console.log('被拖动行: ' + JSON.stringify(e.moveRow));
			console.log('原始下标：', e.index);
			console.log('移动到：', e.moveTo);
			console.log('=== confirm end ===');
		},
		//重新刷新全部图层
		restartOverlay(){
			var that = this
			that._mapContext = uni.createMapContext('map', that);
			that.mapImages.map((item, index) => {
				that._mapContext.removeGroundOverlay({
					id: item.id,
					complete(res) {
						console.log('删除全部图层', res);
					}
				});
			});
			that.mapImages.map((item, index) => {
				item.zIndex = that.mapImages.length - index;
				that._mapContext.addGroundOverlay({
					id: item.id,
					src: item.src,
					bounds: item.bounds,
					opacity: item.opacity,
					visible: item.show,
					zIndex: item.zIndex,
					complete(res) {
						console.log('重新渲染全部图层', res);
					}
				});
			});
		}
	}
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

	.black {
		color: #333;
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
	height: 65vh;
	position: relative;
	.left_bottom_tool {
		position: absolute;
		bottom: 50rpx;
		left: 20rpx;
		z-index: 10;
		width: 70rpx;
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
	.center_bottom_tool {
		position: absolute;
		bottom: 50rpx;
		left: 0rpx;
		z-index: 2;
		width: 100%;
		text-align: center;
		display: flex;
		justify-content: center;
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
			margin-right: 10rpx;
		}
	}
	.satellite {
		.reload {
			background: #00000080;
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

.mapOverlayList {
	margin: 30rpx 20rpx;
	background-color: #fff;
	height: 40vh;
	overflow: scroll;
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

		.add {
			display: flex;
			align-items: center;
		}
	}

	.list {
		font-size: 32rpx;
		padding: 30rpx 0rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-top: 1rpx #f1f1ff solid;

		.content {
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
