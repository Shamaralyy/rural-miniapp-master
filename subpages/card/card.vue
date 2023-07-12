<template>
	<view class="page">
		<!-- <view class="page"> -->
		<u-loading-page loading-text="进入乡村名片中..." :loading="loading"></u-loading-page>
		<!-- 名片页 -->
		<view v-show="page == 0">
			<!-- 引入名片页组件 -->
			<subCard_1
				:subPageData="{
					vs1,
					page,
					ruTime,
					userInfo,
					menuwidth,
					bannerimg,
					naviStyle,
					rural_info,
					isJoinRural,
					Barragelist,
					MAPKEY
				}"
				@toPage="toPage"
				@timerChange="setTimer"
				@magicTap="magicTap"
				@toBuild="toBuild"
				@addNewMsg="addNewMsg"
				@navi="tabbarChange(1)"
			></subCard_1>
		</view>

		<!-- 向导页 -->
		<view v-show="page == 1">
			<subCard_2
				:subPageData="{
					page,
					scale,
					nearby,
					mapmenu,
					mapJson,
					mapOverlay,
					menuwidth,
					winterData,
					rural_info,
					pagesWidth,
					mapCurrent,
					pagesHeight,
					isSatellite,
					reloadMapShow,
					tabbarHeight
				}"
				:mapMarkers="mapMarkers"
				@reloadMap="reloadMap"
				@mapJsonChange="mapJsonChange"
				@mapCurrentChange="mapCurrentChange"
				@goRural="goRural"
				ref="showMapOverlay"
			></subCard_2>
		</view>

		<!-- 我的页 -->
		<view v-show="page == 2">
			<subCard_4
				:subPageData="{
					sysRole,
					userInfo,
					hellodesc,
					rural_info,
					hellotitle,
					isJoinRural,
					pagesHeight
				}"
				:imgSrc="imgSrc"
				@login="gologin"
				@toBuild="toBuild"
				@toPage="toPage"
				@reLoding="reLodingPageData"
				@newContentTap="newContentTap"
			></subCard_4>
		</view>

		<!-- 发布内容弹框 -->
		<publishCard :publishData="{ plus_show }" @clos="plus_show = false" @toPage="toPage"></publishCard>

		<!-- 共建邀请弹窗 -->
		<invitationCard
			@toBuild="toBuild"
			:inviType="inviType"
			:userInfo="userInfo"
			:rural_info="rural_info"
			:isShow_popup="build_popup"
			@changeState="changePopupState"
		></invitationCard>

		<miniMapInfo></miniMapInfo>
		<!-- 7天天气弹窗 -->
		<weatherPopup></weatherPopup>
		<!-- 底部tabbar -->
		<u-tabbar
			:fixed="true"
			:value="pageon"
			:placeholder="true"
			@change="tabbarChange"
			:safeAreaInsetBottom="true"
			activeColor="#2aae67"
			inactiveColor="#7d7e80"
			zIndex="99"
			@getTabbarHeight="getTabbarHeight"
		>
			<u-tabbar-item text="名片">
				<image
					class="slot-icon"
					slot="active-icon"
					:src="myImg + '/icon/card_nav_1_1.png' + mySuffix"
					mode="widthFix"
				></image>
				<image
					class="slot-icon"
					slot="inactive-icon"
					:src="myImg + '/icon/card_nav_1.png' + mySuffix"
					mode="widthFix"
				></image>
			</u-tabbar-item>
			<u-tabbar-item text="向导">
				<image
					class="slot-icon"
					slot="active-icon"
					:src="myImg + '/icon/card_nav_2_1.png' + mySuffix"
					mode="widthFix"
				></image>
				<image
					class="slot-icon"
					slot="inactive-icon"
					:src="myImg + '/icon/card_nav_2.png' + mySuffix"
					mode="widthFix"
				></image>
			</u-tabbar-item>
			<u-tabbar-item text="我的">
				<image
					class="slot-icon"
					slot="active-icon"
					:src="myImg + '/icon/card_nav_4_1.png' + mySuffix"
					mode="widthFix"
				></image>
				<image
					class="slot-icon"
					slot="inactive-icon"
					:src="myImg + '/icon/card_nav_4.png' + mySuffix"
					width="30rpx"
					mode="widthFix"
				></image>
			</u-tabbar-item>
		</u-tabbar>
	</view>
</template>

<script>
import { getDefault_navJson, getDefault_mapJson, get7Day } from '@/utils/defaultData.js';
import subCard_1 from './subCard/subCard_1.vue';
import subCard_2 from './subCard/subCard_2.vue';
import subCard_4 from './subCard/subCard_4.vue';
import publishCard from './subCard/publishCard.vue';
import invitationCard from './subCard/invitationCard.vue';
import miniMapInfo from './subCard/miniMapInfo.vue';
import weatherPopup from './subCard/weatherPopup.vue';

import {
	random,
	getStrJob,
	getStr_lv5,
	getMapType,
	getZoomLeve,
	equalsArray,
	getStrIdentity,
	getIntegerIdentity
} from '@/utils/Utils-tool.js';
import { apiBusinessCoordinatePage_Post } from '@/API/坐标位置.js';
import { apiBusinessAtlasPage_Post } from '@/API/图集.js';
import { apiBusinessCommodityPage_Post } from '@/API/商品好物news.js';
import { apiBusinessInformationPage_Post } from '@/API/乡村名片资讯.js';

import { apiBusinessAtlasTagTagLabel_Get } from '@/API/图集标签.js';
import { apiBusinessCommodityTagTagLabel_Get } from '@/API/好物标签.js';
import { apiBusinessInformationTagTagLabel_Get } from '@/API/资讯标签.js';

import { apiBusinessCoordinateTagTagLabel_Get } from '@/API/坐标分类62.js';
import {
	apiBusinessCardPage_Post,
	apiBusinessCardJoin_Post,
	apiBusinessCardInfo_Get,
	apiBusinessCardMyRural_Get,
	apiBusinessCardJoin_Body
} from '@/API/乡村名片.js';

import {
	apiDevBusinessMsgPage_Post //查询留言
} from '@/API/留言.js';

const imgBaseUrl = getApp().globalData.imgBaseUrl + '/app';
const imgSuffix = getApp().globalData.imgSuffix[1];
const MAPKEY = getApp().globalData.positionAPI_key;
export default {
	components: { subCard_1, subCard_2, subCard_4, invitationCard, publishCard, miniMapInfo, weatherPopup },
	computed: {
		/* 拿取本乡村数据 */
		rural_info() {
			return this.$store.state.build.currentRural;
		},
		/* 获取身份字符串 */
		identityStr(para) {
			return para => {
				return getStrIdentity(para);
			};
		},
		/* 自定义navi样式 */
		naviStyle() {
			return this.isTop ? { bg: '#00000000', colo: '#fff' } : { bg: '#eeeeeec9', colo: '#000' };
		},
		/* 背景图 */
		imgSrc() {
			return this.bannerimg[0]
				? // ? this.bannerimg[0] + this.mySuffix
				  this.bannerimg[0]
				: this.myImg + '/xs/index_banner_2.jpg';
		}
	},

	data() {
		return {
			mapKey: MAPKEY,
			isTop: true, //是否在顶部
			pageState: 'new', //页面状态

			tabbarHeight: 80, //底部tabbar高度

			isSatellite: true,
			cardId: null,
			//基础图片URL、当前页面宽度及高度、关闭胶囊宽度659011502000
			myImg: imgBaseUrl, //全局图片URL
			mySuffix: imgSuffix, //全局缩略后缀
			pagesWidth: 750, //当前页面宽度
			pagesHeight: 2000, //当前页面高度
			menuwidth: 0, //右上角小程序胶囊宽度
			//用户信息
			userInfo: getApp().globalData.userInfo, //获取用户信息
			sysRole: {}, //获取当前用户在该乡村权限信息
			//当前显示的页面及选中那个页面
			page: 0, //当前属于什么页面
			pageon: 0,

			/*————————共建邀请————————*/
			build_popup: false, //共建邀请的弹框状态
			//名片首页
			loading: true,
			//首页组件布局排序
			vs1: [], //首页布局排序存的对象变量
			bannerimg: [], // 名片首页轮播图
			navList: [], //魔方导航数据
			// 当前美食
			food_list: [],
			//乡村图集数据、切换tab（到时候会融合）
			photolist: [],
			photo_tabs: [],

			/*————————向导页————————*/
			//经纬度初始放大层级数
			mapJson: getDefault_mapJson(),
			mapOverlay: [], //手绘地图数据
			winterData: {},
			nearby: '',
			scale: 3,
			mapmenu: [{ name: '推荐', tagsIconShow: false, tagsIconValue: null }], //向导地点筛选标签列表
			mapCurrent: 0, //地图默认聚焦
			reloadMapShow: true,
			show: false,
			//发现页的瀑布流参数设置开始
			leftHeight: 0,
			rightHeight: 0,
			/*————————我的页————————*/
			// 未登录或加入显示的文字
			hellotitle: '欢迎来到我们村',
			hellodesc: '登录后才可以参与本村名片建设及互动',
			//弹幕测试数据、模拟发送的index、定时器自动发
			ruTime: null, //留言定时器
			Barragelist: [],
			BarrageIndex: 0,
			timer: null,
			plus_show: false, // 我的页发布按钮、发布的菜单
			mynavList: [
				{ name: `${imgBaseUrl}/static/myrural_nav_1.png${imgSuffix}`, title: '本村故事' },
				{ name: `${imgBaseUrl}/static/myrural_nav_2.png${imgSuffix}`, title: '本村地图' },
				{ name: `${imgBaseUrl}/static/myrural_nav_3.png${imgSuffix}`, title: '本村好物' },
				{ name: `${imgBaseUrl}/static/myrural_nav_4.png${imgSuffix}`, title: '参与共建' }
			],
			isJoinRural: false, //是否已加入当前乡村
			rural_list: [],
			mapMarkers: [],
			inviType: 'join', //邀请卡类型 join加入、light点亮
			msgPara_body: { pageNum: 1, pageSize: 100 }, //留言请求体
			infoPara_body: { pageNum: 1, pageSize: 10 }, //资讯数据请求体
			winterReady: false //天气组件注册状态
		};
	},
	onShow() {
		//更新用户数据
		this.getruralinfo();
		this.userInfo = getApp().globalData.userInfo;
		if (this.userInfo) return;
		//无用户信息时 清除认证相关数据
		this.isJoinRural = false;
		this.sysRole = {};
		// console.log('页面状态', this.pageState);
	},
	// 监听滚动
	onPageScroll(e) {
		// page值 自纠正
		this.page = this.page == undefined ? 0 : this.page;

		if (this.page == 0) {
			this.isTop = e.scrollTop < 190;
		} else if (this.page == 100) {
			//100的意思是 取消原来的发现页
			this.isTop = e.scrollTop < 20;
		} else {
			this.isTop = true;
		}
	},
	onUnload() {
		this.saveNowCardPage(false);
		this.$store.commit('build/setCurrentRural_all', null);
		if (this.ruTime) {
			clearInterval(this.ruTime);
		}
	},
	onReady() {
		this.getMapTagList();
		uni.$on('openWeather', () => {
			this.openWeather();
		});
		uni.$once('winterReady', () => {
			this.winterReady = true;
		});
	},
	onLoad: function(option) {
		// console.log('页面启动参数', option);
		// 获取导航栏高度
		if (option.source == 'index') {
			uni.showToast({ icon: 'none', duration: 1300, title: '可通过返回键返回' });
		}
		this.cardId = option.cardId ? option.cardId : option.cardid;
		this.page = option.page;
		this.pageon = option.page;

		let sysInfo = getApp().globalData.sysInfo;

		this.pagesWidth = sysInfo.windowWidth;
		this.pagesHeight = sysInfo.windowHeight;
		let menu = wx.getMenuButtonBoundingClientRect();
		this.menuwidth = menu.width + menu.width / 7;
		if (option.add == 'rural') {
			this.inviType = 'light';
			this.changePopupState(true);
		}
	},
	onShareAppMessage(res) {
		return {
			title: this.rural_info.name + '欢迎您',
			path: '/subpages/card/card?cardId=' + this.rural_info.cardId,
			imageUrl: this.bannerimg[0] + this.mySuffix
		};
	},
	methods: {
		/* 7天天气打开响应 */
		openWeather() {
			const routes = getCurrentPages(); // 获取当前打开过的页面路由数组
			const curRoute = routes[routes.length - 1].route;
			if (curRoute == 'subpages/card/card') {
				uni.$emit('open7Day', this.rural_info.cardId);
			}
		},

		//获取底部tabbar高度
		getTabbarHeight(e) {
			console.log('拿到的高度', e);
			this.tabbarHeight = e;
		},
		/* 循环检测天气查询状态 */
		roundGetWeather() {
			const weatherID = setInterval(() => {
				if (this.winterReady) {
					clearInterval(weatherID);
					uni.$emit('upWinterData', this.winterData);
				}
			}, 500);
		},
		//获取今天天气
		getWeather1d() {
			uni.request({
				url:
					'https://api.qweather.com/v7/weather/now?key=4d3a9ddcae29427b9907f1cc0984dd2c&location=' +
					this.rural_info.longitude +
					',' +
					this.rural_info.latitude,
				method: 'GET',
				success: res => {
					console.log('拿当天的天气数据:', res);
					this.winterData = res.data.now;
				}
			});
		},

		/* 弹出发布内容框 */
		newContentTap() {
			this.plus_show = true;
			this.build_popup = this.build_popup ? false : this.build_popup;
		},
		// 修改PopupS 状态
		changePopupState(state) {
			this.build_popup = state;
		},
		// 外部调用 共建页跳板
		toBuild(para) {
			// console.log('toBuild参数', para);
			this.goAdmin(para);
		},
		/**我的页左上角点击事件
		 * target 为触发对象
		 * 	|-0 subcard触发	直接跳转
		 * 	|-1	邀请卡触发 可跳转至build共建页
		 * 	|-2 切换邀请卡显示状态
		 * */
		goAdmin(para) {
			if (!this.userInfo || !this.isJoinRural) {
				this.tabbarChange(2);
				return;
			}
			if (para == 0) {
				uni.navigateTo({
					url: '/subpages/build/build?cardId=' + this.rural_info.cardId
				});
				this.saveNowCardPage(false);
				return;
			}
			if (this.build_popup && para == 1) {
				uni.navigateTo({
					url: '/subpages/build/build?cardId=' + this.rural_info.cardId
				});
				this.saveNowCardPage(false);
			}
			this.inviType = 'light';
			this.build_popup = !this.build_popup;
		},

		//父组件点击魔方事件
		magicTap(e) {
			// console.log('父组件点击魔方事件', e);
			//tyle 说明
			// type:0 代表跳转的是当前名片页的视图页 page:0 = 名片页,page:1 = 向导页,page:2 = 发现页,page:3 = 我的页,
			// type:1 代表跳转的是当前名片页的单页面 page:0 = 关于我们页
			// 		|-3	自定义小程序URL
			// 			|-url	整个小程序万能URL 支持加参数
			// 		|-4 news资讯
			// 			|-tag标签分类id
			// 		|-5 map位置
			// 			|-tag标签分类id
			// 		|-6 service好物
			// 			|-tag标签分类id
			// 		|-7 photo图集
			// 			|-tag标签分类id
			if (e.type == 0) {
				this.tabbarChange(e.page);
			}
			if (e.type == 1 && e.page == 0) {
				uni.navigateTo({
					url: 'card_info/about?cardId=' + this.rural_info.cardId
				});
			}
			if (e.type == 4) {
				uni.navigateTo({
					url: 'card_news/news_column?tagId=' + e.tag
				});
			}
			if (e.type == 5) {
				uni.navigateTo({
					url: 'card_map/map_column?tagId=' + e.tag
				});
			}
			if (e.type == 6) {
				uni.navigateTo({
					url: 'card_service/service_column?tagId=' + e.tag
				});
			}
			if (e.type == 7) {
				uni.navigateTo({
					url: 'card_photo/photo_column?tagId=' + e.tag
				});
			}
			if (e.type == 8) {
				if(e.appId=="wxbabacacc5e9088e8"){
					uni.navigateTo({
						url:e.path
					})
					return
				}
				if(e.appId=="wxcover"){
					wx.showRedPackage({
						url:e.path
					})
					return
				}
				uni.navigateToMiniProgram({
					appId: e.appId,
					path: e.path,
					extraData: {
						data1: 'test'
					},
					success(res) {
						// 打开成功
					},
					fail(err) {
						uni.showModal({
							title: '外部小程序异常',
							content: `外部小程序(appid:${e.appId})打开出错。请于共建页重新配置`,
							showCancel: false,
							confirmColor: '#04c354',
							confirmText: '我知道了'
						});
					}
				});
			}
		},
		/* 加入后 重新请求数据 */
		reLodingPageData() {
			this.getrurallist();
			this.userCheck();
		},

		/* 重载瀑布流 */

		/**跳转登录页
		 * 跳转缺省参数para{router: 'card', page: 0}
		 * */
		gologin(para = { router: 'card', page: 0 }) {
			this.$store.commit('login/setToLoginType', para);
			uni.navigateTo({
				url: '/subpages/login/login'
			});
		},
		/* 修改地图点标签 */
		mapCurrentChange(e) {
			this.mapmenu[this.mapCurrent].tagsIconGray = true;
			this.mapCurrent = e.index;
			this.mapmenu[this.mapCurrent].tagsIconGray = false;
			this.getMapTagData(e.coordinateTagId);
		},
		/* 获取地图标签列表 */
		getMapTagList() {
			apiBusinessCoordinateTagTagLabel_Get({
				cardId: this.cardId /** 名片   number required: */
			}).then(res => {
				// console.log('坐标分类', res);
				if (res.data.code == 200) {
					// 保留全部选项
					var mapMenu = res.data.data;
					mapMenu.map((item, index) => {
						// console.log('当前拿到的分类', item);
						if (item.icon == null || item.icon == '') {
							item.tagsIconShow = false;
							item.tagsIconValue = null;
							item.tagsIconGray = true;
						} else {
							item.tagsIconShow = false;
							item.tagsIconValue = item.icon;
							item.tagsIconGray = true;
						}
					});
					this.mapmenu = this.mapmenu.concat(mapMenu);
				}
			});
			this.getMapTagData();
		},
		/* 获取地图指定标签的所有标点 */
		getMapTagData(tagId) {
			let para_body = {
				pageNum: 1 /**     string required:false */,
				pageSize: 40 /**     string required:false */,
				cardId: this.cardId /** 乡村ID    string required:false */,
				choiceness: null /** 是否精选 1精选 0非精选    string required:false */,
				tagId: tagId /** 分类ID    string required:false */
			};
			apiBusinessCoordinatePage_Post(para_body).then(res => {
				// console.log('坐标分类获取结果1', res.data.data.records);
				if (res.data.code == 200) {
					this.mapMarkers = res.data.data.records;
				} else {
					this.mapMarkers = null;
				}
			});
		},
		/* 页面跳转方法 */
		toPage(para) {
			// console.log('点击', para);
			this.plus_show = false;
			if (this.userInfo == null) {
				this.gologin();
				return;
			}
			if (para.name == 'login') {
				this.tabbarChange(2);
				return;
			}
			if (para.name == 'setting') {
				uni.navigateTo({ url: para.url + '?&cardId=' + +this.rural_info.cardId });
				return;
			}
			if (para.url != undefined) {
				uni.navigateTo({ url: para.url + '?&cardId=' + +this.rural_info.cardId });
			}
		},

		// 获取留言
		getPostMsg() {
			apiDevBusinessMsgPage_Post({
				...this.msgPara_body,
				ruralCardId: this.rural_info.cardId,
				reviewerStatus: 1
			}).then(res => {
				// console.log('留言数据', res.data.data);
				// 判空
				if (res.data.data.records.length == 0) return;
				// 过滤留言留言数据
				let newList = res.data.data.records.map(value => {
					return {
						avatar: value.avatar,
						status: value.status,
						msg: value.msg,
						nickname: value.nickname
					};
				});
				this.addNewMsg(newList);
			});
		},

		// 静态添加留言
		addNewMsg(para) {
			this.Barragelist = this.Barragelist.concat(para);
			// console.log('留言数据', this.Barragelist);
		},

		/* 切换地图类型 */
		mapJsonChange(para) {
			this.mapJson = para;
		},

		/* 重新缩放地图 */
		reloadMap() {
			uni.showToast({
				icon: 'none',
				title: '刷新中'
			});
			this.queue(4);
		},

		/**地图层级缩放
		 * init 缩放起始值
		 * 	 无值则从当前开始缩放
		 * 	 有值则按传入的init值开始缩放
		 * */
		queue(init) {
			this.scale = init ? init : this.scale;
			let nowShow = this.scale,
				max = getZoomLeve(this.mapJson.mapLevel);
			if (nowShow >= max) return; //阈值检测

			new Promise((resolve, reject) => {
				if (init) {
					this.reloadMapShow = !this.reloadMapShow;
					this.reloadMapShow = !this.reloadMapShow;
					setTimeout(() => {
						resolve();
					}, 1500);
				} else {
					resolve();
				}
			}).then(() => {
				let timer = setInterval(() => {
					if (nowShow < max && this.page == 1) {
						nowShow += 1;
						this.scale = nowShow;
					} else {
						clearInterval(timer);
					}
				}, 200 + (max - nowShow) * 10);
			});
		},

		/* 切换tabbar */
		tabbarChange(index) {
			this.pageon = index;
			this.page = index;
			if (index == 1 && this.scale != 17) {
				this.queue();
				return;
			}
			if (index == 2 && this.isJoinRural) {
				this.getrurallist();
			}
		},

		/* 获取用户乡村数据 */
		getrurallist() {
			apiBusinessCardMyRural_Get().then(res => {
				// console.log('拥有乡村结果', res);
				if (res.data.code == 200) {
					this.rural_list = res.data.data;
				}
			});
		},
		/* 点击乡村跳转 */
		goToRural(e) {
			if (e.sysRole.roleId == 103) {
				uni.navigateTo({
					url: '../build/build?cardid=' + e.cardId
				});
				this.saveNowCardPage(false);
			} else {
				uni.navigateTo({
					url: '../card/card?cardid=' + e.cardId
				});
			}
		},

		//获取当前乡村数据
		getruralinfo() {
			apiBusinessCardInfo_Get({ cardId: this.cardId })
				.then(res => {
					// console.log('获取当前乡村数据', res);
					if (res.data.code == 200) {
						let tempRuralData = res.data.data;
						if (tempRuralData.mapOverlay != null) {
							this.mapOverlay = JSON.parse(tempRuralData.mapOverlay);
						}
						if (tempRuralData.mapJson != null) {
							this.mapJson = JSON.parse(tempRuralData.mapJson);
							console.log('当前拿到的的数据:', this.mapJson.overlayShow, this.mapJson.defaultOverlayShow);
							if (this.mapJson.overlayShow && this.mapJson.defaultOverlayShow) {
								this.$refs.showMapOverlay.randOverMap(this.mapOverlay);
							}
						}

						this.$store.commit('build/setCurrentRural_all', tempRuralData);
						this.getWeather1d();
						if (tempRuralData.module != null) {
							if (tempRuralData.module != '[]') {
								this.vs1 = JSON.parse(tempRuralData.module);
							} else {
								this.vs1 = getDefault_navJson();
							}
						} else {
							this.vs1 = getDefault_navJson();
						}
						this.hellotitle = '欢迎来到' + tempRuralData.name;
						this.hellodesc = '登录后才可以参与' + tempRuralData.name + '名片建设及互动';
						this.isSatellite = getMapType(this.rural_info.mapType);
						try {
							let imgJSON = JSON.parse(tempRuralData.images);
							this.bannerimg = imgJSON.map(value => value.imgUrl);
						} catch (e) {
							this.bannerimg = [];
						}
						this.getPostMsg();
						this.getLocation();
						this.roundGetWeather();
					}
				})
				.then(() => {
					// 检测用户
					this.userCheck();
				})
				.catch(err => {
					console.log('请求异常');
				})
				.finally(() => {
					this.loading = false;
				});
		},

		/* 检测用户 */
		userCheck() {
			if (this.userInfo == null) {
				//判断用户是否已经登录 拿他的权限信息 是否加入这个乡村
				// this.tabbarChange(3);
			}
			apiBusinessCardMyRural_Get({ cardId: this.cardId })
				.then(res => {
					// console.log('请求检测用户是否在本村', res);
					// 本村
					if (res.data.code == 200 && res.data.msg.indexOf('成功') != -1) {
						return res;
					}
					// 非本村
					if (res.data.code == 500) {
						console.log('不在本村');
						this.isJoinRural = false;
						// this.tabbarChange(3);
						this.hellotitle = this.userInfo.nickName + ',欢迎来到' + this.rural_info.name;
						this.hellodesc = '加入' + this.rural_info.name + '才能参与名片建设及互动';
						this.sysRole = {};
						return -1;
					}
				})
				.then(result => {
					if (result == -1) {
						return;
					}
					let state = false,
						dataIndex = 0;
					// console.log('判断数据', result, this.rural_info);
					result.data.data.map((value, index) => {
						state = this.rural_info.cardId == value.cardId ? true : state;
						dataIndex = this.rural_info.cardId == value.cardId ? index : dataIndex;
					});

					if (state) {
						this.isJoinRural = true;
						this.sysRole = result.data.data[dataIndex].sysRole;
					} else {
						this.isJoinRural = false;
						this.hellotitle = this.userInfo.nickName + ',欢迎来到' + this.rural_info.name;
						this.hellodesc = '加入' + this.rural_info.name + '才能参与名片建设及互动';
						this.sysRole = {};
					}
					// console.log('权限列表', this.sysRole);
				})
				.catch(err => {
					// 没有登录
					console.log('请求异常，没有登录', err);
					this.isJoinRural = false;
					this.sysRole = {};
				});
		},

		/**存储当前页面
		 * type
		 * 	|-true	添加缓存
		 * 	|-false 清除缓存
		 * */
		saveNowCardPage(type) {
			try {
				let pageData = { cardId: type ? this.rural_info.cardId : -1 };
				// console.log('当前存储id', pageData);
				uni.setStorageSync(getApp().globalData.storageKey.lastPage, pageData);
			} catch (e) {
				console.warn('存储异常', e);
			}
		},

		//外部带参返回调用
		showFuntion(para) {
			if (para) {
				// console.log('携带参数', para);
			} else {
				return;
			}
		},
		/* 设置弹幕轮询定时器 */
		setTimer(e) {
			this.ruTime = e;
		},
		/* 获取用户位置 */
		getLocation() {
			return new Promise((reserve, reject) => {
				//因为获取位置是异步接口所以需要使用promise
				uni.getLocation({
					success(res) {
						console.log('获取位置信息', res);
						reserve({
							longitude: res.longitude,
							latitude: res.latitude
						});
					},
					fail(err) {
						reject(location); //获取失败则返回经纬坐标为0
					}
				});
			})
				.then(position => {
					this.g_myPosition.longitude = position.longitude;
					this.g_myPosition.latitude = position.latitude;
				})
				.then(() => {
					this.nearby = Number(this.g_distance(this.rural_info));
					console.log('相距', this.nearby);
				});
		}
	},
	watch: {
		// 检测是否加入  加入则指向本村
		isJoinRural(newValue) {
			// 从邀请页进入时  无论登录与否 均保存 2022年7月11日
			if (
				getApp().globalData.scene == 1007 ||
				getApp().globalData.scene == 1008 ||
				getApp().globalData.scene == 1073 ||
				getApp().globalData.scene == 1074 ||
				getApp().globalData.scene == 1044
			) {
				this.saveNowCardPage(true);
				return;
			}
			// console.log('乡村加入情况', newValue);
			if (newValue) {
				this.saveNowCardPage(true);
			}
		},
		// 页面参数变动 重载数据 修改页面状态
		pageState(newValue) {
			if (newValue == 'refresh') {
				this.reLodingPageData();
				this.pageState = 'new';
			}
		}
	}
};
</script>

<style scoped lang="scss">
// page {
// 	height: 100vh;
// 	width: 100%;
// 	background: #efefef;
// 	overflow-x: hidden;
// }
.page {
	width: 100%;
	overflow-x: hidden;
	font-family: 'SourceHanSerifCN-Medium';
}
.slot-icon {
	width: 46rpx;
}
.u-tabbar__content.u-border-top {
	background-color: #ffffffd9 !important;
}
.content_barrage {
	position: absolute;
	bottom: -15%;
	width: 100%;
	.title {
		margin-left: 20rpx;
		font-size: 32rpx;
		color: #222;
		text-align: center;
	}
}

.u-tabbar__content {
}
</style>
