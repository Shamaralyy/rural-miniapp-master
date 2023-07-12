<template>
	<view>
		<u-navbar
			:title="'服务发布'"
			:autoBack="true"
			:placeholder="true"
			bgColor="#ffffff00"
			leftIconColor="#000"
			:titleStyle="{ color: '#000' }"
		>
			<view
				class="u-nav-slot_right"
				slot="right"
				:style="'right:' + menuwidth + 'px;bottom:' + menuwidth / 11 + 'px'"
				@click="submit"
			>
				<view class="title"><text>发布</text></view>
			</view>
		</u-navbar>
		<view style="margin: 30rpx;" v-if="columns[0].length == 0">
			<u-empty
				text="该模块暂无标签分类,需在名片装修-模块管理-标签管理-新建标签后再来哦~"
				:icon="imgBaseUrl + 'noTags.png'"
			></u-empty>
		</view>
		<view class="content_form" v-if="columns[0].length != 0">
			<view class="form_list" @click="pickerShow = true">
				<view class="title"><text>服务分类</text></view>
				<view class="info right">
					<text>{{ checkboxValue1.label ? checkboxValue1.label : '请选择' }}</text>
				</view>
			</view>
			<view class="form_list">
				<view class="title"><text>名称</text></view>
				<view class="info">
					<u--input
						placeholder="可输入好物/服务/店铺名称"
						border="surround"
						maxlength="20"
						v-model="newsTitle"
					></u--input>
				</view>
			</view>
			<view class="form_list">
				<view class="title"><text>简单介绍</text></view>
				<view class="info">
					<u--textarea v-model="introduce" placeholder="请小段话介绍您的好物/服务"></u--textarea>
				</view>
			</view>
			<view class="form_list up">
				<view class="title"><text>图片</text></view>
				<view class="info" style="width: 100%">
					<ru-file-upload
						@upPara="e => getImgData({ img: e, target: 'imgArr' })"
						paraGetMethods="active"
						iniTopPath="images/service"
					></ru-file-upload>
				</view>
			</view>
			<view class="form_list">
				<view class="title"><text>联系人头像</text></view>
				<view class="info">
					<ru-file-upload
						@upPara="e => getImgData({ img: e, target: 'avatar' })"
						:iniCount="1"
						paraGetMethods="active"
						iniTopPath="images/service"
					></ru-file-upload>
				</view>
			</view>
			<view class="form_list">
				<view class="title"><text>联系人名称</text></view>
				<view class="info">
					<u--input
						placeholder="可输入姓名或称呼"
						border="surround"
						maxlength="20"
						v-model="contact.name"
					></u--input>
				</view>
			</view>
			<view class="form_list">
				<view class="title"><text>联系人介绍</text></view>
				<view class="info">
					<u--input
						placeholder="可写身份/欢迎联系词"
						border="surround"
						maxlength="20"
						v-model="contact.desc"
					></u--input>
				</view>
			</view>
			<view class="form_list">
				<view class="title"><text>联系人手机号</text></view>
				<view class="info">
					<u--input
						placeholder="提供服务好物的手机号"
						border="surround"
						maxlength="20"
						v-model="contact.phone"
					></u--input>
				</view>
			</view>
			<view class="form_list">
				<view class="title"><text>联系人微信号</text></view>
				<view class="info">
					<u--input
						placeholder="提供服务好物的微信号"
						border="surround"
						maxlength="20"
						v-model="contact.wechat"
					></u--input>
				</view>
			</view>
			<view class="form_list">
				<view class="title"><text>所在位置</text></view>
				<view class="info right">
					<text @click="getAddress()">{{ xaweoas ? xaweoas.name + '>' : '点击选择位置>' }}</text>
				</view>
			</view>
			<view class="form_list">
				<map
					:style="{ width: pagesWidth - 40 + 'px', height: '180px' }"
					:latitude="latitude"
					:longitude="longitude"
					:enable-satellite="false"
					:enable-3D="true"
					:scale="16"
					:subkey="mapKey"
					layer-style="1"
					:markers="marker"
					v-if="latitude"
				></map>
			</view>
			<view class="list">
				<view class="title"><text>环境设施</text></view>
				<view class="content">
					<u-switch
						v-model="environmentShow"
						activeColor="#04c354"
						inactiveColor="rgb(230, 230, 230)"
					></u-switch>
				</view>
			</view>
			<view class="listd" v-if="environmentShow">
				<view class="title" style="border-bottom: 1rpx solid #cbcbcb;">
					<u-grid :border="false" col="5">
						<u-grid-item
							v-for="(listItem, listIndex) in environment"
							:key="listIndex"
							@click="closeEnvironment"
						>
							<u-icon :customStyle="{ paddingTop: 20 + 'rpx' }" :name="listItem.name" :size="28"></u-icon>
							<text class="grid-text" style="margin-top: 10rpx;">{{ listItem.title }}</text>
						</u-grid-item>
					</u-grid>
				</view>
				<view class="content" style="margin-bottom: 10rpx;">
					<view class=""><text>服务图标</text></view>
					<view class=""><u-icon :name="environmentIcon" size="28" color="#000"></u-icon></view>
					<view class=""><u-button text="更换" @click="toChangePage()"></u-button></view>
				</view>
				<view class="content">
					<view class=""><text>服务名称</text></view>
					<view class="">
						<u--input placeholder="输入服务名称" border="surround" v-model="environmentValue"></u--input>
					</view>
					<view class=""><u-button text="添加" @click="addEnvironment()"></u-button></view>
				</view>
			</view>
			<view class="list">
				<view class="title"><text>提供服务</text></view>
				<view class="content">
					<u-switch
						v-model="supply_serveShow"
						activeColor="#04c354"
						inactiveColor="rgb(230, 230, 230)"
					></u-switch>
				</view>
			</view>
			<view class="listd" v-if="supply_serveShow">
				<view class="title">
					<u-tag
						:text="item"
						bgColor="#ececec"
						color="#333"
						v-for="(item, index) in supply_serve"
						:key="index"
						borderColor="#ececec"
						type="warning"
						closable
						@close="closeSupply_serve(index)"
					></u-tag>
				</view>
				<view class="content">
					<view class=""><text>服务名称</text></view>
					<view class="">
						<u--input placeholder="输入服务名称" border="surround" v-model="supply_serveValue"></u--input>
					</view>
					<view class=""><u-button text="添加" @click="addSupply_serve(supply_serveValue)"></u-button></view>
				</view>
			</view>
			<view class="list">
				<view class="title"><text>环境VR展示</text></view>
				<view class="content">
					<u-switch v-model="vr_urlShow" activeColor="#04c354" inactiveColor="rgb(230, 230, 230)"></u-switch>
				</view>
			</view>
			<view class="listd" v-if="vr_urlShow">
				<view class="title"><text>全景链接</text></view>
				<view class="content">
					<u--input
						placeholder="请输入乡村名片平台全景Url"
						border="surround"
						v-model="vr_urlValue"
					></u--input>
				</view>
			</view>
			<view class="list">
				<view class="title"><text>跳转到小程序</text></view>
				<view class="content">
					<u-switch v-model="appShowUrl" activeColor="#04c354" inactiveColor="rgb(230, 230, 230)"></u-switch>
				</view>
			</view>
			<view class="listd" v-if="appShowUrl">
				<view class="title"><text>跳转信息</text></view>
				<view class="content" style="margin-bottom: 10rpx;">
					<u--input placeholder="跳转小程序APPID" border="surround" v-model="appUrl.appId"></u--input>
				</view>
				<view class="content">
					<u--input placeholder="小程序具体URL" border="surround" v-model="appUrl.path"></u--input>
				</view>
			</view>
			<view class="form_list up">
				<view class="title"><text>详细内容介绍</text></view>
				<view class="info" style="width:100%;background: #f9f9f9;border-radius:20rpx;">
					<cu-editor
						:content="richText_value"
						@before="onUploadBefore"
						@update="onUpdate"
						@save="onSave"
						@onEditorFocus="controlButton"
					></cu-editor>
				</view>
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
import { mapState } from 'vuex';
const imgBaseUrl = getApp().globalData.imgBaseUrl + '/app/static/';
const chooseLocation = requirePlugin('chooseLocation');
import { apiBusinessCardInfo_Get } from '@/API/乡村名片.js';
import { apiBusinessCommodityAdd_Post } from '@/API/商品好物news.js'; //列表
import { apiBusinessCommodityTagTagLabel_Get } from '@/API/好物标签.js'; //标签
import cuEditor from '@/components/cu-editor/cu-editor';
import { handleHtmlImage } from '@/components/cu-editor/util';
import { buildAdd } from '@/components/mixins/buildMixins.js';
import { serviceMixins } from './service';

export default {
	mixins: [buildAdd, serviceMixins],
	data() {
		return {
			pagesWidth: 0,
			menuwidth: 0,
			latitude: '',
			newsTitle: '', //位置名称
			introduce: '', //简单介绍
			imgJson: [],
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
			xaweoas: {}, //位置名称
			pickerShow: false, //位置标签显示
			columns: [[]], //位置内容
			checkboxValue1: {
				label: ''
			}, //位置标签文字
			value: '',
			tip: '支持2~8个汉字',
			input_value: '',
			textarea_value: '',
			richText_value: '',
			placeholdername: '请输入内容',
			maxlength: 8,
			buttonState: true,
			imgBaseUrl: imgBaseUrl,
			environmentShow: false,
			supply_serveShow: false,
			vr_urlShow: false,
			appShowUrl: false,
			environment: [],
			environmentIcon: 'checkmark-circle',
			environmentValue: '',
			supply_serve: [],
			supply_serveValue: '',
			vr_urlValue: '',
			contact: {
				name: '',
				phone: '',
				wechat: '',
				desc: '',
				avatar: ''
			},
			appUrl: {
				appId: '',
				path: ''
			}
		};
	},
	computed: {
		...mapState('build', ['editKey'])
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
		console.log('编辑页跳转接收参数', this.editKey);
	},
	onUnload() {
		// 页面卸载时设置插件选点数据为null，防止再次进入页面，geLocation返回的是上次选点结果
		chooseLocation.setLocation(null);
	},
	onShow() {
		const location = chooseLocation.getLocation(); // 如果点击确认选点按钮，则返回选点结果对象，否则返回null
		this.xaweoas = location;
		if (location) {
			console.log('您所选择的位置：', location);
			this.chooseLocation = location.address;
			this.marker[0].latitude = location.latitude;
			this.marker[0].longitude = location.longitude;
			this.latitude = location.latitude;
			this.longitude = location.longitude;
		}
	},

	methods: {
		// 添加服务到提供服务
		addSupply_serve(e) {
			if (e == '') {
				uni.showToast({
					icon: 'none',
					title: `请输入服务名称`
				});
				return;
			}
			this.supply_serve = this.supply_serve.concat(e);
			this.supply_serveValue = '';
		},
		toChangePage() {
			uni.navigateTo({
				url: '/subpages/build/rural_diy/cubeIcon?type=1'
			});
		},
		addEnvironment() {
			if (uni.$u.trim(this.environmentValue) == '') {
				uni.showToast({ icon: 'none', title: `请输先输入服务名称` });
				return;
			}
			var data = {
				name: this.environmentIcon,
				title: this.environmentValue
			};
			this.environment = this.environment.concat(data);
			this.environmentValue = '';
		},
		closeEnvironment(index) {
			console.log(index);
		},
		closeSupply_serve(index) {
			this.supply_serve.splice(index, 1);
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
		/* 组件返回图片 */
		getImgData({ img, target }) {
			if (target == 'avatar') {
				this.contact.avatar = img[0] || '';
				console.log('头像改变', this.imgJson);
			} else if (target == 'imgArr') {
				let imgJson = img.map(value => {
					return {
						imgUrl: value
					};
				});
				this.imgJson = imgJson.length == 0 ? '' : JSON.stringify(imgJson);
				console.log('页面图片改变', this.imgJson);
			}
		},
		controlButton(editorState) {
			console.log('托盘状态', editorState);
			this.buttonState = !editorState;
		},

		/* 富文本相关事件 */
		onUpdate(e) {
			// console.log('富文本内容更新', e.html);
		},
		onSave(e) {
			// console.log('接收保存传参', e.html);
			this.richText_value = e.html;
		},
		/* 切换地图类型 */

		getruralinfo() {
			this.latitude = this.rural_info.latitude;
			this.longitude = this.rural_info.longitude;
			this.marker[0].latitude = this.rural_info.latitude;
			this.marker[0].longitude = this.rural_info.longitude;
		},

		//位置标签弹窗内容
		confirm(e) {
			this.checkboxValue1 = e.value[0];
			this.pickerShow = false;
		},

		//添加好物
		async submit() {
			if (this.check() == false) {
				return;
			}
			// 重构联系人数据
			const contact = Object.keys(this.contact).map(val => {
				return {
					[val]: uni.$u.trim(this.contact[val])
				};
			});
			const para = {
				tagId: [this.checkboxValue1.id], //分类ID，数组结构
				contact: JSON.stringify(contact), //用户信息
				environment: this.environmentShow ? JSON.stringify(this.environment) : null, //图标列表
				supplyServe: this.supply_serveShow ? JSON.stringify(this.supply_serve) : null, //服务列表
				synopsis: this.introduce /* 简介   string required: */,
				title: this.newsTitle /* 标题   string required: */,
				content: this.richText_value /* 内容(富文本)   string required: */,
				url: this.appShowUrl ? JSON.stringify(this.appUrl) : null /* 外部小程序跳转 string required: */,
				urls: this.imgJson /* 图集   string required: */,
				cardId: this.rural_info.cardId /* 乡村名片ID   integer required: */,
				vrUrl: this.vr_urlShow ? this.vr_urlValue : null /* vr链接 */,
				latitude: this.xaweoas.latitude,
				longitude: this.xaweoas.longitude
			};
			console.log('提交参数', para);
			// return;
			apiBusinessCommodityAdd_Post(para).then(res => {
				if (res.data.code == 200) {
					uni.showToast({ icon: 'success', title: `发布成功` });
					uni.navigateBack({});
				} else {
					uni.showToast({ icon: 'error', title: res.data.msg });
					console.log(res.data);
				}
			});
		}
	},
	// 生命周期 - 挂载完成（可以访问DOM元素）
	onReady() {
		uni.$on('menuIcon', icon => {
			this.environmentIcon = icon;
		});
		//位置标签
		apiBusinessCommodityTagTagLabel_Get({
			cardId: this.rural_info.cardId //乡村id
		}).then(res => {
			if (res.data.code == 200) {
				res.data.data.map(item => {
					this.columns[0].push({
						label: `${item.name}`,
						id: `${item.infoTagId}`
					});
				});
			}
		});
	}
};
</script>

<style lang="scss">
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

.content_form {
	display: flex;
	flex-direction: column;
	margin: 0rpx 30rpx;

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
			display: flex;
		}

		border-top: 1rpx #f1f1ff solid;

		.content {
			display: flex;
			justify-content: space-around;
			align-items: center;
		}
	}

	.map_info {
		padding: 30rpx;
		background: #fff;
		font-size: 28 rpx;
		border-radius: 0 0 20rpx 20rpx;
	}
}

.button {
	margin: 50rpx 30rpx;
}
</style>
