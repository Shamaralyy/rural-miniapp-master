<!-- 向导 -->
<template>
	<view class="map">
		<u-navbar
			:showAction="false"
			:placeholder="true"
			title=" "
			bgColor="#ffffff00"
			leftIconColor="#fff"
			:titleStyle="{ color: '#fff00' }"
			@getNavbarHeight="getNavbarHeight"
		>
			<view class="u-nav-slot_left" slot="left">
				<view class="name" :style="{ color: mapJson.mapType ? '#fff' : '#333' }">
					<text :user-select="true">{{ subPageData.rural_info.name }}向导</text>
				</view>
			</view>
			<!-- <view
				class="u-nav-slot_right"
				slot="right"
				:style="'right:' + subPageData.menuwidth + 'px;bottom:' + subPageData.menuwidth / 11 + 'px'"
			>
				<view class="title" @click="$emit('mapJsonChange')">
					<text v-if="isSatellite">切换道路地图</text>
					<text v-if="!isSatellite">切换卫星地图</text>
				</view>
			</view> -->
		</u-navbar>
		<view class="content_mapmenu" v-if="page == 1" :style="{ bottom: subPageData.tabbarHeight + 'px' }">
			<view class="mapmenu">
				<u-tabs
					:list="subPageData.mapmenu"
					@change="e => $emit('mapCurrentChange', e)"
					:current="subPageData.mapCurrent"
					lineColor="#04c354"
					:inactiveStyle="{ color: '#333', fontSize: '28rpx', transform: 'scale(1.05)' }"
					:activeStyle="{ color: '#04c354', fontSize: '30rpx', fontWeight: '500', transform: 'scale(1.05)' }"
				>
					<!-- <view slot="right" style="padding-left: 4px" @click="goTag()">
						<u-icon name="list" size="21" color="#333"></u-icon>
					</view> -->
				</u-tabs>
			</view>
		</view>
		<view
			class="right_bottom_tool"
			:class="mapJson.mapType ? 'satellite' : ''"
			:style="{ bottom: subPageData.tabbarHeight + 50 + 'px' }"
		>
			<view class="reload" @click="goVR()" v-if="mapJson.vrShow">
				<!-- <u-icon name="reload" :color="mapJson.mapType ? '#fff' : '#1f1f1f'" size="18"></u-icon> -->
				<text>全景导览</text>
			</view>
		</view>
		<view
			class="left_bottom_tool"
			:class="mapJson.mapType ? 'satellite' : ''"
			:style="{ bottom: subPageData.tabbarHeight + 50 + 'px' }"
		>
			<view class="reload" @click="goMap()">
				<u-icon name="list-dot" :color="mapJson.mapType ? '#fff' : '#1f1f1f'" size="18"></u-icon>
				<!-- <text >重进</text> -->
			</view>
			<view class="reload" @click="$emit('reloadMap')">
				<u-icon name="reload" :color="mapJson.mapType ? '#fff' : '#1f1f1f'" size="18"></u-icon>
				<!-- <text >重进</text> -->
			</view>
			<view class="currentPositioning" @click="cent">
				<u-icon
					:name="
						mapJson.mapType
							? 'https://cdn.xiangcunmingpian.com/app/static/currentPositioning_on.png'
							: 'https://cdn.xiangcunmingpian.com/app/static/currentPositioning.png'
					"
					color="#1f1f1f"
					size="20"
				></u-icon>
			</view>
		</view>
		<view class="left_top_tool" :class="mapJson.mapType ? 'satellite' : ''" :style="{ top: navbarHeight + '' }">
			<view class="noMap" v-if="subPageData.nearby > 5">
				<u--text
					text="您当前不在本村，点击导航到本村"
					size="13"
					:color="mapJson.mapType ? '#fff' : '#1f1f1f'"
					@click="goRural()"
				></u--text>
			</view>
			<view class="weather" v-if="mapJson.weatherShow">
				<i :class="'qi-' + subPageData.winterData.icon" v-if="subPageData.winterData"></i>
				<u--text
					:text="subPageData.winterData.text + ' ' + subPageData.winterData.temp + '°'"
					size="13"
					:color="mapJson.mapType ? '#fff' : '#1f1f1f'"
					margin="0 0 0 8rpx"
					v-if="subPageData.winterData"
				></u--text>
			</view>
		</view>
		<view class="right_top_tool" :class="mapJson.mapType ? 'satellite' : ''" :style="{ top: navbarHeight + '' }">
			<view class="reload">
				<text style="margin-bottom: 10rpx;">卫星地图</text>
				<u-switch
					v-model="mapJson.mapType"
					size="13"
					activeColor="#04c354"
					inactiveColor="rgb(230, 230, 230)"
				></u-switch>
			</view>
			<view class="reload" v-if="mapJson.overlayShow">
				<text style="margin-bottom: 10rpx;">手绘增强</text>
				<u-switch
					v-model="mapJson.defaultOverlayShow"
					@change="switchOver"
					size="13"
					activeColor="#04c354"
					inactiveColor="rgb(230, 230, 230)"
				></u-switch>
			</view>
			<view class="reload" v-if="mapJson.noticeShow" @click="showNotice">
				<u-icon name="volume" :color="mapJson.mapType ? '#fff' : '#1f1f1f'" size="18"></u-icon>
				<text>公告</text>
			</view>
			<view class="reload" v-if="mapJson.helpShow" @click="showHelp">
				<u-icon
					name="https://cdn.xiangcunmingpian.com/app/static/warning.png"
					color="#1f1f1f"
					size="20"
					style="margin-bottom: 10rpx;"
				></u-icon>
				<u--text text="求助" size="13" type="warning" align="center"></u--text>
			</view>
		</view>
		<view class="content_map" v-if="subPageData.reloadMapShow">
			<map
				id="map"
				:show-location="isShowme"
				:style="{ width: subPageData.pagesWidth + 'px', height: subPageData.pagesHeight + 'px' }"
				:latitude="subPageData.rural_info.latitude"
				:longitude="subPageData.rural_info.longitude"
				:enable-satellite="scale < mapJson.mapLevel ? true : mapJson.mapType"
				:enable-3D="true"
				:scale="scale"
				:subkey="subPageData.mapKey"
				layer-style="1"
				:include-points="markersList"
				:markers="markersList"
				
				@regionchange="region"
				@markertap="markertap"
			></map>
			<!-- :polyline="polyline1" -->
		</view>
	</view>
</template>

<script>
const imgSuffix = getApp().globalData.imgSuffix[1];
export default {
	props: ['subPageData', 'mapMarkers'],
	data() {
		return {
			isShowme: true, //是否显示当前位置
			isShowOverMap: false,
			lock: false,
			mountedLock: true,
			page: 0,
			scale: 0,
			map: null,
			mapJson: {},
			isSatellite: false,
			markersList: [],
			tempMask: [],
			_mapContext: null,
			tempUrl: '/static/map.png', //图标临时路径
			navbarHeight: 50,
			polyline1:[{
			  color: "#31c27c",
			  width: 4,
			  arrowLine: true,
			  colorList:true,
			  borderWidth: 1, //线的边框宽度，还有很多参数，请看文档 
				points:[{
					latitude: '25.853479',
					longitude: '100.133507'
					},
					{
						latitude: '25.853037',
						longitude: '100.134285'
					},
					{
						latitude: '25.852901',
						longitude: '100.130524'
					},
					{
						latitude: '25.85177',
						longitude: '100.131531'
					},
					{
						latitude: '25.855251',
						longitude: '100.133873'
					}]
			}]
		};
	},
	computed: {
		maxLeve() {
			try {
				return this.mapJson.mapLevel;
			} catch (e) {
				return 16;
			}
		}
	},
	watch: {
		g_myPosition(newValue) {
			if (newValue.longitude == null) {
				this.isShowme = false;
			} else {
				this.isShowme = true;
			}
		},
		subPageData: {
			deep: true,
			handler(newValue) {
				// console.log('拿到subCard_2数据', newValue);
				this.scale = newValue.scale;
				this.isSatellite = newValue.isSatellite;
				this.mapJson = newValue.mapJson;
				this.page = newValue.page;
				try {
					this.region();
				} catch (e) {
					//TODO handle the exception
				}
			}
		},
		mapMarkers: {
			deep: true,
			handler(newValue) {
				try {
					this.tempMask = this.dataProcessing(newValue);
					console.log('剩余标记点', this.tempMask);
					this.mySc();
				} catch (e) {
					//TODO handle the exception
				}
			}
		}
	},
	mounted() {
		var that = this;
		try {
			that._mapContext = uni.createMapContext('map', that);
			// 仅调用初始化，才会触发 on.("markerClusterCreate", (e) => {})
			that._mapContext.initMarkerCluster({
				// 初始化点聚合的配置
				enableDefaultStyle: true, // 是否使用默认样式
				zoomOnClick: true,
				gridSize: 20,
				complete(res) {
					console.log('initMarkerCluster', res);
					// that.lock = false;
					// console.log('当前拿到的的数据:',that.mapJson.overlayShow,that.mapJson.defaultOverlayShow)
					// if (that.mapJson.overlayShow && that.mapJson.defaultOverlayShow){
					// 	that.randOverMap();
					// }
				}
			});
		} catch (e) {
			console.log('mounted 异常');
			//TODO handle the exception
		}
	},
	onReady() {
		var that = this
		// that.lock = false;
		// console.log('当前拿到的的数据:',that.mapJson.overlayShow,that.mapJson.defaultOverlayShow)
		// if (that.mapJson.overlayShow && that.mapJson.defaultOverlayShow){
		// 	that.randOverMap();
		// }
	},
	methods: {
		switchOver(e) {
			if (this.page != 1) return;
			// this.$emit('mapJsonChange', this.mapJson);
			if (this.mapJson.defaultOverlayShow) {
				this.lock = false;
				this.randOverMap();
			} else {
				this.removeOverMap();
			}
		},
		removeOverMap() {
			this.subPageData.mapOverlay.map((item, index) => {
				this._mapContext.removeGroundOverlay({
					id: item.id
				});
			});
		},
		randOverMap(e){
			var that = this
			console.log(e,this.subPageData.mapOverlay)
			if(this.subPageData.mapOverlay.length==0){
				var mapImages = e
			}else{
				var mapImages = this.subPageData.mapOverlay
			}
			if (this.lock) {
				console.log('-----------锁状态无法触发');
				return;
			} else {
				console.log('-----------触发了', mapImages);
			}
			that._mapContext = uni.createMapContext('map', that);
			mapImages.map((item, index) => {
				console.log('遍历', index, item);
				if (index) {
					that.lock = true;
				}
				that._mapContext.addGroundOverlay({
					id: item.id,
					src: item.src,
					bounds: item.bounds,
					opacity: item.opacity,
					zIndex: item.zIndex,
					complete(res) {
						console.log('创建', res);
					}
				});
			});
		},
		goVR() {
			uni.navigateTo({
				url: '/subpages/vr/vr?src=' + this.mapJson.vrUrl
			});
			return;
		},
		showHelp() {
			uni.showModal({
				title: '求助提醒',
				content: this.mapJson.helpContent,
				showCancel: false,
				confirmColor: '#04c354',
				confirmText: '我知道了'
			});
		},
		showNotice() {
			uni.showModal({
				title: this.subPageData.rural_info.name + '公告',
				content: this.mapJson.noticeContent,
				showCancel: false,
				confirmColor: '#04c354',
				confirmText: '我知道了'
			});
		},
		goMap() {
			uni.navigateTo({
				url: 'card_map/map_column?'
			});
		},
		cent() {
			console.log('点击当前定位');
			if (this.subPageData.nearby > 5) {
				uni.showToast({
					icon: 'none',
					title: '您当前不在本村'
				});
			} else {
				this.$emit('reloadMap');
			}
		},
		getNavbarHeight(e) {
			console.log('拿到的顶部参数', e);
			this.navbarHeight = e;
		},
		goRural() {
			var that = this;

			const latitude = Number(this.subPageData.rural_info.latitude);
			const longitude = Number(this.subPageData.rural_info.longitude);
			uni.getLocation({
				type: 'gcj02', //返回可以用于uni.openLocation的经纬度
				success(res) {
					uni.openLocation({
						latitude: latitude,
						longitude: longitude,
						scale: 17,
						name: that.subPageData.rural_info.name,
						success() {
							console.log('success');
						}
					});
				}
			});
		},
		/* 触发缩放 */
		mySc() {
			this._mapContext.includePoints({
				points: this.markersList,
				padding: [10]
			});
		},
		addMap() {
			uni.navigateTo({
				url: '../card_map/add_map'
			});
		},
		region() {
			if (this.scale > this.subPageData.rural_info.mapLevel - 3) {
				this.markersList = this.tempMask;
			} else {
				this.markersList = [];
			}
		},
		markertap(e) {
			console.log('点击图标', e.detail.markerId);
			// this.$emit('mapPointTap', e.detail.markerId);
			// uni.$emit('getInfo', e.detail.markerId);
			// return;
			if (this.id == -1) return;
			uni.navigateTo({
				url: '/subpages/card/card_map/map_info?coordinateId=' + e.detail.markerId
			});
		},

		/* 处理地图标点数据 */
		dataProcessing(para) {
			// 处理图片
			
			let temp = para.map((value, index) => {
				value.images = JSON.parse(value.images);
				// console.log(index, '地图标点图片地址\n', value.images[0].imgUrl);
				if(value.tags[0].icon==null||value.tags[0].icon==''){
					var iconUrl = 'https://cdn.xiangcunmingpian.com/app/map/map_01.png'
				}else{
					var iconUrl = value.tags[0].icon
				}
				return {
					id: value.coordinateId,
					latitude: value.latitude,
					longitude: value.longitude,
					title: value.name,
					width: 30,
					height: 30,
					status: value.status,
					rotate: 0, // 旋转度数
					alpha: 1, //透明度
					// iconPath: value.images[0].imgUrl + imgSuffix,
					iconPath: iconUrl,
					joinCluster: true,
					// callout: {
					// 	content: value.name,
					// 	padding: '5',
					// 	borderRadius: 5,
					// 	display: 'ALWAYS',
					// 	customCallout:{
					// 		display:'ALWAYS',
					// 	}
					// },
					label: {
						content: value.name,
						borderRadius: 8,
						textAlign: 'center',
						bgColor: '#fff',
						padding: '3',
						borderColor: '#f1f1f1',
						customCallout: {
							display: 'BYCLICK'
						}
					}
				};
			});
			// 过滤数据
			return temp.filter(value => {
				return value.status == 1 && !this.equalsMask(value.latitude, value.longitude);
			});
		},
		/**坐标点查重
		 * historyPointList 历史坐标点 [{latitude, longitude}...]
		 * point	检测目标点 {latitude, longitude}
		 * 	存在返回		true
		 * 	不存在返回	false
		 * */
		equalsMask(latitude, longitude) {
			let historyPointList = this.subPageData.rural_info;
			return (
				Number(historyPointList.latitude) == Number(latitude) &&
				Number(historyPointList.longitude) == Number(longitude)
			);
		}
	}
};
</script>

<style scoped lang="scss">
.map {
	.u-nav-slot_left {
		display: flex;
		// background: #0006;
		padding: 0rpx;
		// border-radius: 30rpx;

		.name {
			font-size: 42rpx;
			font-family: 'SourceHanSerifCN-Bold';
			display: flex;
			align-self: center;
			// font-family: 'SourceHanSerifCN-Bold';
			margin-bottom: 10rpx;
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

	.left_bottom_tool {
		position: absolute;
		bottom: 13%;
		left: 20rpx;
		z-index: 2;
		width: 70rpx;
		text-align: center;
		.currentPositioning {
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

	.right_bottom_tool {
		position: absolute;
		bottom: 13%;
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

	.left_top_tool {
		position: absolute;
		top: 8%;
		left: 20rpx;
		z-index: 2;
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
			font-size: 20rpx;
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
	.content_map {
		position: absolute;
		top: 0;
	}

	.content_mapmenu {
		z-index: 12;
		display: flex;
		position: absolute;
		background: #ffffffd9;
		width: 100%;
		bottom: 6.7vh;
		left: 0;
		border-radius: 14rpx 14rpx 0 0;
		padding-bottom: 10rpx;
		.mapmenu {
			width: 100%;
			color: #333;
		}
	}
}
.u-navbar__placeholder {
	display: none !important;
}
</style>
