<template>
	<view>
		<image
			src="https://cdn.xiangcunmingpian.com/app/static/login_bg_4.jpg"
			class="bottom_bg"
			mode="widthFix"
		></image>
		<view class="">
			<!-- <image src="/static/myrural_bottom_bg1.jpg"  class="bottom_bg" mode="widthFix"></image> -->
			<u-navbar
				title="乡村名片点亮"
				:autoBack="true"
				:placeholder="true"
				leftIcon="arrow-left"
				bgColor="#ffffff00"
				leftIconColor="#fff"
				:titleStyle="{ color: '#fff' }"
			></u-navbar>
		</view>
		<view class="content">
			<view class="content_welcome">
				<view class="title"><text>点亮名片共建乡村</text></view>
				<view class="desc"><text>请确认一下乡村信息</text></view>
			</view>
			<view class="content_name">
				<view class="nav">
					<text>村庄名称</text>
					<text v-if="rural_city.oldName != null" style="font-size: 28rpx;margin-left: 10rpx;">
						{{ rural_city.oldName }}
					</text>
				</view>
				<view class="input">
					<u--input
						placeholder="请输入村庄名称"
						border="surround"
						v-model="rural_name"
						@focus="desc = true"
						@blur="desc = false"
						@input="getruralmap()"
					></u--input>
				</view>
				<view class="desc" v-if="desc">
					<text>说明</text>
					<text>1、请简化名称，如：xxx村、xxx社区等</text>
					<text>2、名称尽量与选择的地址一致或包含在内</text>
					<text>3、如果存在同一个村多个名字可取主名字</text>
					<text>4、村庄的名字最短两个汉字最长十个汉字</text>
					<text>5、修改名称遇到问题或太长可联系客服处理</text>
				</view>
				<view class="button"></view>
			</view>
			<view class="content_type">
				<view class="nav"><text>选择你的身份</text></view>
				<view class="info">
					<view class="list" :class="[{ on: buildtype == 1 }]" @click="buildtype = 1">
						<text>我是本村人</text>
					</view>
					<view class="list" :class="[{ on: buildtype == 2 }]" @click="buildtype = 2">
						<text>我不是该村人</text>
					</view>
				</view>
			</view>
			<view class="content_position" v-if="buildtype == 1">
				<view class="nav"><text>选择你的村民身份</text></view>
				<view class="info">
					<view class="list" :class="[{ on: buildjob == 1 }]" @click="buildjob = 1">
						<text>普通村民</text>
					</view>
					<view class="list" :class="[{ on: buildjob == 2 }]" @click="buildjob = 2">
						<text>村委干部</text>
					</view>
				</view>
			</view>
			<view class="content_map">
				<view class="nav">
					<text>村庄所在位置</text>
					<text style="font-weight: 300;" @click="getAddress()">手动选择</text>
				</view>
				<view class="info">
					<text>{{ rural_city.parentAddr.parentAddr.parentAddr.parentAddr.name }}</text>
					<text>{{ rural_city.parentAddr.parentAddr.parentAddr.name }}</text>
					<text>{{ rural_city.parentAddr.parentAddr.name }}</text>
					<text>{{ rural_city.parentAddr.name }}</text>
					<text>{{ rural_name }}</text>
				</view>
				<view class="map_content">
					<map
						:style="{ width: '100%', height: '300rpx' }"
						:latitude="marker[0].latitude"
						:longitude="marker[0].longitude"
						:enable-3D="true"
						:enable-satellite="enable_satellite"
						:markers="marker"
					></map>
				</view>
			</view>
			<view class="content_bottom">
				<view class="button">
					<u-button :text="'点亮' + rural_name" color="#04c354" @click="lightrural()"></u-button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import QQMapWX from '../../commonJS/qqmap-wx-jssdk.min.js';
import {
	apiBusinessAddrLower_Get,
	apiBusinessAddrLevel_Get,
	apiBusinessAddrSearch_Post
} from '@/API/五级联动地址数据.js';
import { apiBusinessCardAdd_Post, apiBusinessCardMyRural_Get } from '@/API/乡村名片.js';
const imgBaseUrl = getApp().globalData.imgBaseUrl + '/app/static/';
const chooseLocation = requirePlugin('chooseLocation');
export default {
	data() {
		return {
			rural_name: '',
			desc: false,
			upid: 0, // 传过来的乡村上级id
			ruralid: 0, // 传过来的乡村id
			rural_city: [],
			buildtype: 0,
			buildjob: 0,
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
						content: '',
						display: 'ALWAYS',
						padding: '5'
					}
				}
			],
			ownedVillageList: [],
			userInfo: getApp().globalData.userInfo
		};
	},
	onShow() {
		//更新数据
		this.userInfo = getApp().globalData.userInfo;
		//用户鉴权	无用户数据则清空数据
		if (this.userInfo == null) {
			this.modSelect();
			return;
		}
		const location = chooseLocation.getLocation(); // 如果点击确认选点按钮，则返回选点结果对象，否则返回null
		console.log('您所选择的位置：', location);
		if (location) {
			this.chooseLocation = location.address;
			this.marker[0].latitude = location.latitude;
			this.marker[0].longitude = location.longitude;
		}
	},
	onUnload() {
		// 页面卸载时设置插件选点数据为null，防止再次进入页面，geLocation返回的是上次选点结果
		chooseLocation.setLocation(null);
	},
	onLoad: function(option) {
		var that = this;
		this.upid = option.upid;
		this.ruralid = option.ruralid;
		this.getruralname(); //获取乡村名称
	},
	methods: {
		modSelect() {
			uni.showModal({
				title: '登录提示',
				content: '需要登录才能进行乡村的点亮操作，是否登录',
				confirmText: '去登录',
				cancelText: '再看看',
				success: res => {
					if (res.confirm) {
						uni.navigateTo({
							url: '/subpages/login/login?ruralid=' + this.ruralid
						});
					} else if (res.cancel) {
						uni.navigateBack({ delta: 1 });
					}
				}
			});
		},
		async lightrural() {
			if (this.rural_name.length < 2) {
				uni.showToast({
					title: '村名不少得于两个汉字',
					duration: 3000,
					icon: 'none'
				});
				return;
			}
			if (this.buildtype == 0) {
				uni.showToast({
					title: '请选择你的身份',
					duration: 3000,
					icon: 'none'
				});
				return;
			}
			if (this.buildtype == 1) {
				if (this.buildjob == 0) {
					uni.showToast({
						title: '请选择你的村民身份',
						duration: 3000,
						icon: 'none'
					});
					return;
				}
			}
			if (!(await this.safe_dataContentCheck(this.rural_name))) {
				return;
			}
			uni.showLoading({
				icon: 'none',
				title: '点亮中'
			});
			let typeid = this.buildtype == 1 ? 101 : this.buildtype == 2 ? 102 : '';
			let typename = this.buildjob == 1 ? '普通村民' : this.buildjob == 2 ? '村委干部' : '';
			let apiBusinessCardAdd_Body = {
				nickName: null /** 别名   string required: */,
				latitude: this.marker[0].latitude /** 纬度   string required: */,
				longitude: this.marker[0].longitude /** 经度   string required: */,
				name: this.rural_name /** 村名   string required: */,
				addrId: parseInt(this.ruralid) /** 五级联动地址ID   integer required: */,
				job: typename /** 村内职务   string required: */,
				roleId: typeid /** 申请身份   integer required: */
			};
			console.log(apiBusinessCardAdd_Body);
			apiBusinessCardAdd_Post(apiBusinessCardAdd_Body).then(res => {
				console.log(res.data);
				if (res.data.code == 200) {
					uni.showToast({
						title: '点亮成功',
						duration: 2000,
						icon: 'none'
					});
					this.toCard();
					return;
				}
				if (res.data.code == 500 && res.data.msg == null) {
					uni.showToast({
						title: '点亮异常，请联系客服',
						duration: 2000,
						icon: 'none'
					});
				}
				if (res.data.code == 500 && res.data.msg == '已经被点亮了') {
					uni.showToast({
						title: '该乡村已经被点亮了',
						duration: 2000,
						icon: 'none'
					});
				}
				uni.hideLoading();
			});
		},
		/* 跳转到名片 */
		toCard() {
			let cardID = -1;
			uni.showLoading({ title: '加载乡村数据' });
			new Promise((resolve, reject) => {
				// 等待3s 防止网络延迟
				setTimeout(() => {
					resolve();
				}, 3000);
			})
				.then(() => {
					return new Promise((resolve, reject) => {
						//获取列表中数据
						apiBusinessCardMyRural_Get({
							pageNum: 1 /**     string required:false */,
							pageSize: 1000 /**     string required:false */
						}).then(res => {
							console.log('乡村结果', res);
							if (res.data.code == 200) {
								this.ownedVillageList = res.data.data;
							} else {
								this.ownedVillageList = [];
							}
							resolve();
						});
					});
				})
				.then(() => {
					//遍历数据 若存在
					if (this.ownedVillageList.length != 0) {
						this.ownedVillageList.map(value => {
							if (value.addrId == this.rural_city.id) {
								cardID = value.cardId;
								console.log('卡片id匹配成功：', cardID);
							}
						});
						if (cardID != -1) {
							uni.redirectTo({ url: '/subpages/card/card?add=rural&cardId=' + cardID });
							return;
						}
					}
					uni.hideLoading();
					//网络过慢  来不及同步  返回用户页
					uni.switchTab({ url: '/pages/user/user' });
				});
		},

		getruralmap() {
			var that = this;
			const tMap = new QQMapWX({
				key: getApp().globalData.positionAPI_key //开发者密钥
			});
			this.marker[0].callout.content = this.rural_name;
			tMap.geocoder({
				address:
					this.rural_city.parentAddr.parentAddr.parentAddr.parentAddr.name +
					this.rural_city.parentAddr.parentAddr.parentAddr.name +
					this.rural_city.parentAddr.parentAddr.name +
					this.rural_city.parentAddr.name +
					this.rural_name,
				success: res => {
					console.log('解析地址成功', res);
					that.marker[0].latitude = res.result.location.lat;
					that.marker[0].longitude = res.result.location.lng;
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
		getruralname() {
			let id = Number(this.ruralid);
			apiBusinessAddrSearch_Post({ id }).then(res => {
				console.log(res);
				this.rural_name = res.data.data.records[0].name;
				this.marker[0].callout.content = res.data.data.records[0].name;
				this.rural_city = res.data.data.records[0];
				this.getruralmap();
			});
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
		clickmap() {
			this.getAddress();
		}
	}
};
</script>

<style lang="scss">
//背景图片
.bottom_bg {
	width: 100%;
	position: fixed;
	bottom: 0;
	z-index: -1;
}

page {
	// background:#68c6ec;
}

.content_welcome {
	padding: 30rpx 40rpx 10rpx 40rpx;
	// background: #fff;
	color: #fff;
	.title {
		font-size: 38rpx;
		font-family: 'SourceHanSerifCN-Bold';
		margin-bottom: 16rpx;
	}
	.desc {
		font-size: 30rpx;
		font-family: 'SourceHanSerifCN-Bold';
	}
}
.content_map {
	margin: 30rpx;
	padding: 30rpx;
	background: #ffffffc9;
	border-radius: 20rpx;
	margin-bottom: 30%;
	// border: 1px solid #eee;
	// box-shadow: 0 6rpx 18rpx #eee;
	.nav {
		font-size: 32rpx;
		font-family: 'SourceHanSerifCN-Bold';
		margin-bottom: 20rpx;
		display: flex;
		justify-content: space-between;
	}
	.info {
		font-size: 32rpx;
		color: #353535;
		margin-bottom: 10rpx;
	}
}
.content_name {
	margin: 30rpx;
	padding: 30rpx;
	background: #ffffffc9;
	border-radius: 20rpx;
	// border: 1px solid #eee;
	// box-shadow: 0 6rpx 18rpx #eee;
	.nav {
		font-size: 32rpx;
		font-family: 'SourceHanSerifCN-Bold';
		margin-bottom: 20rpx;
	}
	.input {
		.u-border {
			border-color: #c1c1c180 !important;
		}
	}
	.desc {
		font-size: 28rpx;
		color: #353535;
		display: flex;
		flex-flow: column;
		margin-top: 10rpx;
		text {
			line-height: 46rpx;
		}
	}
}
.content_type {
	margin: 30rpx;
	padding: 30rpx;
	background: #ffffffc9;
	border-radius: 20rpx;
	// border: 1px solid #eee;
	// box-shadow: 0 6rpx 18rpx #eee;
	.nav {
		font-size: 32rpx;
		font-family: 'SourceHanSerifCN-Bold';
		margin-bottom: 30rpx;
	}
	.info {
		font-size: 34rpx;
		color: #353535;
		display: flex;
		justify-content: space-around;
		.list {
			width: 45%;
			display: flex;
			background: #f1f1f1;
			height: 100rpx;
			align-items: center;
			justify-content: center;
			font-size: 28rpx;
			border-radius: 20rpx;
			color: #353535;
		}
		.on {
			background: #04c354;
			color: #fff;
		}
	}
}
.content_position {
	margin: 30rpx;
	padding: 30rpx;
	background: #ffffffc9;
	border-radius: 20rpx;
	// border: 1px solid #eee;
	// box-shadow: 0 6rpx 18rpx #eee;
	.nav {
		font-size: 32rpx;
		font-family: 'SourceHanSerifCN-Bold';
		margin-bottom: 30rpx;
	}
	.info {
		font-size: 34rpx;
		color: #353535;
		display: flex;
		justify-content: space-around;
		.list {
			width: 45%;
			display: flex;
			background: #f1f1f1;
			height: 100rpx;
			align-items: center;
			justify-content: center;
			font-size: 28rpx;
			border-radius: 20rpx;
			color: #353535;
		}
		.on {
			background: #04c354;
			color: #fff;
		}
	}
}
.content_bottom {
	position: fixed;
	bottom: 10rpx;
	background: #ffffffc9;
	width: 100%;
	.button {
		display: flex;
		width: 80%;
		margin: 20rpx auto 40rpx auto;
	}
}
</style>
