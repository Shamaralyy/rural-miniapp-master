<template>
	<view>
		<view class="">
			<image :src="myrural_bottom_bg1" class="bottom_bg" mode="widthFix"></image>
			<u-navbar
				@leftClick="leftClick()"
				title="我的村"
				:autoBack="true"
				:placeholder="true"
				bgColor="#ffffff00"
				leftIconColor="#fff"
				:titleStyle="{ color: '#fff' }"
			></u-navbar>
		</view>
		<view class="content">
			<view class="welcome_text">
				<u-transition mode="fade-down" :show="true" duration="500">
					<text>{{ welcome_text_1 }}</text>
					<text>{{ welcome_text_2 }}</text>
				</u-transition>
				<u-transition mode="fade-down" :show="mode != 0" duration="500">
					<text class="exit" @click="exitcity()">{{ exit_text }}</text>
				</u-transition>
			</view>
			<view class="myrural_add">
				<u-transition mode="fade-down" :show="mode == 0" duration="500">
					<view class="rural">
						<view class="rural_list" @click="rural_search()"><text>搜索乡村名称</text></view>
						<view class="rural_list" @click="rural_map()"><text>地区筛选乡村</text></view>
					</view>
				</u-transition>

				<u-transition mode="fade-down" :show="mode != 0" duration="500">
					<view class="city">
						<!-- <view class="city_title">
							<text>附近的乡镇</text>
						</view> -->
						<view class="city_list">
							<view
								class="city_name"
								:class="[{ on: item.property == 1 }]"
								v-for="(item, index) in city_list"
								:key="index"
								@click="clickcity(item)"
								v-if="item.status == 1"
							>
								<text>{{ item.name }}</text>
							</view>
							<view class="" v-if="level == 4 && city_list.length == 0" style="color:#fff;margin:30rpx;">
								<text>您好，部分市辖区及地区暂不支持直接点亮，请尝试搜索乡村名称或联系客服点亮。</text>
							</view>
						</view>
					</view>
					<view class="moreRural" v-if="level == 5">
						<view class="title" @click="addShow = true"><text>没有找到自己的家乡？点击创建</text></view>
					</view>
				</u-transition>
			</view>
		</view>
		<u-popup :show="addShow" @close="addShow = false" round="20">
			<view class="addRural">
				<view class="list" v-if="addrShow">
					<view class=""><text>这里面有没有您想点亮的村？</text></view>
					<view class="rural">
						<view class="city">
							<!-- <view class="city_title">
								<text>附近的乡镇</text>
							</view> -->
							<view class="city_list">
								<view
									class="city_name"
									:class="[{ on: item.property == 1 }]"
									v-for="(item, index) in hidCityList"
									:key="index"
									@click="clickcity(item)"
								>
									<text>{{ item.name }}</text>
								</view>
							</view>
						</view>
					</view>
					<view class="btn"><u-button text="还是没有,点击创建" @click="addrShow = false"></u-button></view>
				</view>
				<view class="add" v-else>
					<view class="title"><text>添加社区/乡村/景区</text></view>
					<view class="name">
						<u--input placeholder="请输入名称" border="surround" v-model="newName"></u--input>
					</view>
					<view class="text">
						<text>温馨提示</text>
						<text>1、创建后可先行点亮乡村</text>
					</view>
					<view class="btn">
						<u-button @click="toCreate" type="success" :text="'创建 ' + newName"></u-button>
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
// 引入SDK核心类
var QQMapWX = require('../../commonJS/qqmap-wx-jssdk.min.js');
import { apiBusinessAddrLower_Get, apiBusinessAddrLevel_Get, apiBusinessAddrAdd_Post } from '@/API/五级联动地址数据.js';
import { apiBusinessCardMyRural_Get, apiBusinessCardPage_Post } from '@/API/乡村名片.js';
import { uniTrim } from '@/utils/Utils-tool.js';
// const ADDR = require("@/API/五级联动地址数据.js");
const imgBaseUrl = getApp().globalData.imgBaseUrl + '/app' + '/static/';
export default {
	data() {
		return {
			userInfo: getApp().globalData.userInfo,
			newName: '', //新村名称
			myrural_bottom_bg1: imgBaseUrl + 'myrural_bottom_bg1.jpg',
			zb: {
				latitude: 22.61439697401481,
				longitude: 114.03365271642711
			},
			qqmapsdk: {},
			welcome_text_1: '进入你的家乡',
			welcome_text_2: '一起共建家乡名片',
			mode: 0, // 0初始模式   1地区筛选
			city_list: [],
			exit: false,
			level: 0,
			records: [],
			exit_text: '返回上一级',
			ownedVillageList: [],
			parentCode: {
				one: 0,
				two: -1,
				three: -1,
				four: -1,
				five: -1
			},
			addShow: false,
			addrShow: true
		};
	},
	computed: {
		hidCityList() {
			if (this.city_list.length == 0) {
				return [];
			} else {
				return this.city_list.filter(value => {
					return value.status != 1;
				});
			}
		}
	},
	onShow() {
		uni.showTabBar({});
		this.userInfo = getApp().globalData.userInfo;
		if (this.userInfo != null) {
			this.getrurallist();
		}
	},
	onLoad: function(option) {
		// 实例化API核心类
		this.qqmapsdk = new QQMapWX({
			key: getApp().globalData.positionAPI_key // 必填
		});
		this.qqmapsdk.reverseGeocoder({
			location: this.zb,
			success: res => {
				console.log(res.result.address);
			}
		});
		this.getcitylist();
		if (option.type == 'map') {
			this.rural_map();
		}
	},
	watch: {
		city_list(newValue) {
			if (this.hidCityList.length == 0) {
				this.addrShow = false;
			} else {
				this.addrShow = true;
			}
		}
	},
	methods: {
		//获取已有乡村
		getrurallist() {
			uni.showLoading({ title: '加载乡村数据' });
			apiBusinessCardMyRural_Get()
				.then(res => {
					console.log('请求匹配乡村数据', res);
					if (res.data.code == 200) {
						this.ownedVillageList = res.data.data;
					} else {
						this.ownedVillageList = [];
					}
				})
				.finally(() => {
					uni.hideLoading();
				});
		},
		getcitylist() {
			apiBusinessAddrLevel_Get({
				pageNum: 1 /**     string required:false */,
				pageSize: 100 /**     string required:false */,
				level: 1 /** 等级    string required:false */
			}).then(res => {
				console.log(res.data.data.records);
				this.city_list = res.data.data.records;
			});
		},
		exitcity() {
			var that = this;
			this.level = this.level - 1;
			if (this.level == 0) {
				this.mode = 0;
				this.records = [];
				return;
			}

			if (this.level == 1) {
				this.getcitylist();
				this.exit = false;
				this.parentCode = { one: 0, two: -1, three: -1, four: -1, five: -1 };
				this.welcome_text_2 = '所位于的省份';
				return;
			}
			let para_body = {
				pageNum: 1 /**     string required:false */,
				pageSize: 1000 /**     string required:false */,
				level: null /** 等级    string required:false */,
				keyword: null /**     string required:false */,
				parentCode:
					this.level == 2
						? this.parentCode.two
						: this.level == 3
						? this.parentCode.three
						: this.level == 4
						? this.parentCode.four
						: null /**     string required:false */
			};
			apiBusinessAddrLower_Get(para_body).then(res => {
				console.log(res.data.data.records);
				this.city_list = res.data.data.records;
			});
			this.welcome_text_2 =
				this.level == 2
					? '所位于的城市'
					: this.level == 3
					? '所位于的区/县'
					: this.level == 4
					? '所位于的街道/镇/林场等'
					: '';
		},
		/* 重新城市 */
		async toCreate() {
			if (this.userInfo == null) {
				this.modSelect();
				return;
			}
			// 内容检测
			if (uniTrim(this.newName) == '') {
				this.newName = '';
				uni.showToast({ icon: 'none', title: '输入内容无效' });
				return;
			}
			if (!(await this.safe_dataContentCheck(this.newName))) {
				return;
			}
			uni.showLoading({ title: '创建中' });
			let nowParentCod =
				this.parentCode.five != -1
					? this.parentCode.five
					: this.parentCode.four != -1
					? this.parentCode.four
					: this.parentCode.three != -1
					? this.parentCode.three
					: this.parentCode.two != -1
					? this.parentCode.two
					: this.parentCode.one;
			let para_body = {
				level: 5,
				name: this.newName,
				oldName: this.newName,
				parentCode: nowParentCod,
				property: 0 /* 注册状态 */
			};
			console.log('当前参数', para_body);
			apiBusinessAddrAdd_Post(para_body).then(res => {
				console.log('创建请求结果', res);
				if (res.data.code == 200) {
					//将数据添加至当前数组，防止返回看不见
					this.city_list.push(res.data.data);
					uni.hideLoading();
					uni.navigateTo({
						url: './rural_add?upid=' + nowParentCod + '&ruralid=' + res.data.data.id
					});
				}
			});
		},
		modSelect() {
			uni.showModal({
				title: '登录提示',
				content: '需要登录才能进行乡村的创建操作，是否登录',
				confirmText: '去登录',
				cancelText: '再看看',
				success: res => {
					if (res.confirm) {
						uni.navigateTo({
							url: '/subpages/login/login?ruralid=' + -1
						});
					} else if (res.cancel) {
						this.addrShow = true;
					}
				}
			});
		},
		clickcity(e) {
			uni.showLoading({ title: '' });
			console.log(e);
			//五级前判断跳转  防止最多4级的情况
			let cardID = -1;
			if (this.ownedVillageList.length != 0) {
				this.ownedVillageList.map(value => {
					cardID = value.addrId == e.id ? value.cardId : cardID;
				});
				if (cardID != -1) {
					console.log('卡片id匹配成功：', cardID);
					uni.navigateTo({ url: '/subpages/card/card?cardid=' + cardID });
					return;
				}
			}

			if (e.level == 5) {
				uni.hideLoading();
				this.level = 5;
				console.log('已经到第五级了', e);
				if (e.property == 1) {
					console.log('~~~~这个是点亮的');
					// uni.navigateTo({
					// 	url: './rural_join?upid=' + e.parentCode + '&ruralid=' + e.id + '&name=' + e.name
					// });

					apiBusinessCardPage_Post({
						addrId: e.id,
						sortType: 1
					}).then(res => {
						console.log('乡村结果', res.data);
						uni.navigateTo({ url: '/subpages/card/card?cardId=' + res.data.data.records[0].cardId });
						return;
					});
				} else {
					console.log('+++++这个没点亮');
					uni.navigateTo({
						url: './rural_add?upid=' + e.parentCode + '&ruralid=' + e.id
					});
				}
			} else {
				if (e.level == 1) {
					this.welcome_text_2 = '所位于的城市';
					this.exit = true;
					this.level = 2;
					this.parentCode.two = e.id;
					this.parentCode.code = this.parentCode.two;
				}
				if (e.level == 2) {
					this.welcome_text_2 = '所位于的区/县';
					this.exit = true;
					this.level = 3;
					this.parentCode.three = e.id;
				}
				if (e.level == 3) {
					this.welcome_text_2 = '所位于的街道/镇/林场等';
					this.exit = true;
					this.level = 4;
					this.parentCode.four = e.id;
				}
				if (e.level == 4) {
					this.welcome_text_2 = '你的村名/社区/部门';
					this.exit = true;
					this.level = 5;
					this.parentCode.five = e.id;
				}
				console.log('点击' + e.level + '级', e);
				let apiBusinessAddrLower_Param = {
					pageNum: 1 /**     string required:false */,
					pageSize: 1000 /**     string required:false */,
					level: null /** 等级    string required:false */,
					keyword: null /**     string required:false */,
					parentCode: e.id /**     string required:false */
				};
				apiBusinessAddrLower_Get(apiBusinessAddrLower_Param)
					.then(res => {
						console.log('请求下一级，当前显示为', res.data.data);
						this.city_list = res.data.data.records;
					})
					.finally(() => {
						uni.hideLoading();
					});
			}
		},
		rural_search() {
			uni.navigateTo({
				url: '/subpages/search/search'
			});
		},
		leftClick() {
			console.log('测试');
			uni.navigateBack({
				delta: 1
			});
		},
		rural_map() {
			this.mode = 1;
			this.level = 1;
			this.parentCode.one = -1;
			this.welcome_text_1 = '请选择家乡';
			this.welcome_text_2 = '所位于的省份';
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
	background: #68c6ec;
}

.content {
	margin: 30rpx;
	.welcome_text {
		display: flex;
		flex-direction: column;
		font-size: 48rpx;
		color: #fff;
		line-height: 70rpx;
		margin: 60rpx 30rpx 0rpx 30rpx;
		.exit {
			font-size: 32rpx;
		}
	}
	.myrural_add {
		margin-top: 10rpx;
		.rural {
			margin: 0 30rpx;
			margin-top: 70rpx;
			.rural_list {
				width: 100%;
				height: 90rpx;
				background: #fff;
				border-radius: 50rpx;
				opacity: 0.8;
				text-align: center;
				line-height: 90rpx;
				margin-bottom: 20rpx;
			}
		}

		.city {
			.city_title {
				margin-top: 20rpx;
				color: #fff;
				font-family: 'SourceHanSerifCN-Bold';
			}
			.city_list {
				margin-top: 10rpx;
				display: flex;
				flex-wrap: wrap;
				// object-position: left;
				justify-content: space-evenly;
				.city_name {
					margin-top: 20rpx;
					margin-right: 20rpx;
					padding: 10rpx 30rpx;
					background: #fff;
					border-radius: 50rpx;
					width: max-content;
					opacity: 0.7;
					color: #193039;
				}
				.on {
					background: #ffffff;
					color: #000;
					opacity: 1;
				}
			}
		}

		.moreRural {
			display: flex;
			flex-direction: column;
			margin: 30rpx;
			align-items: center;
			.title {
				font-size: 28rpx;
				color: #4c4c4c;
			}
		}
	}
}
.addRural {
	height: 600rpx;
	margin: 30rpx;
	.list {
		.rural {
			height: 500rpx;
			overflow: auto;
			.city_list {
				margin-top: 10rpx;
				display: flex;
				flex-wrap: wrap;
				// object-position: left;
				justify-content: space-evenly;
				.city_name {
					margin-top: 20rpx;
					margin-right: 20rpx;
					padding: 10rpx 30rpx;
					background: #eaeaea;
					border-radius: 50rpx;
					width: max-content;
					opacity: 0.7;
					color: #193039;
					height: fit-content;
				}
				.on {
					background: #ffffff;
					color: #000;
					opacity: 1;
				}
			}
		}
		.btn {
			margin-top: 26rpx;
			button {
				width: 60%;
			}
		}
	}
	.add {
		.title {
			margin-bottom: 30rpx;
		}
		.text {
			margin: 30rpx 0;
			display: flex;
			font-size: 29rpx;
		}
		.btn {
			margin-top: 46rpx;
			button {
				width: 60%;
			}
		}
	}
}
</style>
