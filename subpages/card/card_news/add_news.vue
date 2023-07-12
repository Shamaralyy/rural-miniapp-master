<template>
	<view>
		<u-navbar
			:title="'资讯发布'"
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
		<view style="margin: 30rpx;">
			<u-empty
				text="该模块暂无标签分类,需在名片装修-模块管理-标签管理-新建标签后再来哦~"
				v-if="columns[0].length == 0"
				:icon="imgBaseUrl + 'noTags.png'"
			></u-empty>
		</view>
		<view class="content_form" v-if="columns[0].length != 0">
			<view class="form_list" @click="pickerShow = true">
				<view class="title"><text>资讯分类</text></view>
				<view class="info right">
					<text>{{ checkboxValue1.label ? checkboxValue1.label : '请选择' }}</text>
				</view>
			</view>
			<!-- <view class="form_list">
        <view class="title">
          <text>关联位置(非必选)</text>
        </view>
        <view class="info right">
          <text @click="getAddress()">{{
            xaweoas ? xaweoas.address : "点击选择位置>"
          }}</text>
        </view>
      </view> -->
			<view class="form_list">
				<view class="title"><text>资讯名称</text></view>
				<view class="info">
					<u--input
						placeholder="请输入资讯名称"
						border="surround"
						maxlength="10"
						@change="check"
						v-model="newsTitle"
					></u--input>
				</view>
			</view>
			<view class="form_list">
				<view class="title"><text>资讯简介</text></view>
				<view class="info">
					<u--textarea v-model="introduce" @input="check" placeholder="请输入资讯简介"></u--textarea>
				</view>
			</view>
			<view class="form_list up">
				<view class="title"><text>资讯图片</text></view>
				<view class="info" style="width: 100%">
					<ru-file-upload
						@upPara="getImgData"
						paraGetMethods="active"
						iniTopPath="images/naviMagic"
					></ru-file-upload>
				</view>
			</view>
			<view class="form_list up">
				<view class="title"><text>资讯内容</text></view>
				<view class="info" style="width: 100%">
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
import { apiBusinessCardInfo_Get } from '@/API/乡村名片.js';
import { apiBusinessInformationPage_Post, apiBusinessInformationAdd_Post } from '@/API/乡村名片资讯.js'; //列表
import { apiBusinessInformationTagTagLabel_Get } from '@/API/资讯标签.js'; //标签
import cuEditor from '@/components/cu-editor/cu-editor';
import { handleHtmlImage } from '@/components/cu-editor/util';
import { buildAdd } from '@/components/mixins/buildMixins.js';
export default {
	mixins: [buildAdd],
	data() {
		return {
			disabled: true, //按钮置灰
			cardId: 0, // 传过来的乡村id
			pagesWidth: 0,
			menuwidth: 0,
			latitude: '',
			newsTitle: '', //位置名称
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
			checkboxValue1: { label: '' }, //位置标签文字
			value: '',
			tip: '支持2~8个汉字',
			input_value: '',
			textarea_value: '',
			richText_value: '',
			placeholdername: '请输入内容',
			maxlength: 8,
			buttonState: true,
			imgBaseUrl: imgBaseUrl
		};
	},
	computed: {
		...mapState('build', ['editKey', 'currentRural'])
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
		// chooseLocation.setLocation(null);
	},

	methods: {
		// 主动触发图片参数获取
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

		controlButton(editorState) {
			console.log('托盘状态', editorState);
			this.buttonState = !editorState;
		},

		/* 富文本相关事件 */
		onUpdate(e) {
			// console.log('富文本内容更新', e.html);
		},
		onSave(e) {
			console.log('接收保存传参', e.html);
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
			this.check();
		},

		//添加位置
		async submit() {
			if (this.disabled) {
				uni.showToast({ icon: 'none', title: `请完善内容` });
				return;
			}
			if (
				!(await this.safe_dataContentCheck(this.richText_value)) ||
				!(await this.safe_dataContentCheck(this.newsTitle)) ||
				!(await this.safe_dataContentCheck(this.introduce))
			) {
				return;
			}

			apiBusinessInformationAdd_Post({
				tagId: [this.checkboxValue1.id], //分类ID，数组结构
				coordinateId: null /** 坐标ID   integer required: */,
				synopsis: this.introduce /** 简介   string required: */,
				title: this.newsTitle /** 标题   string required: */,
				content: this.richText_value /** 内容(富文本)   string required: */,
				url: null /** 自定义URL   string required: */,
				urls: this.imgJson /** 图集   string required: */,
				videoUrl: null /** 视频   string required: */,
				cardId: this.rural_info.cardId /** 乡村名片ID   integer required: */,
				themeTime: null /** 主题时间   string required: */
			}).then(res => {
				if (res.data.code == 200) {
					uni.showToast({
						icon: 'success',
						title: `发布成功`
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
			if (this.newsTitle != '') {
				this.marker[0].callout.content = this.newsTitle;
			} else {
				this.marker[0].callout.content = '位置名称';
			}
			if (this.introduce && this.checkboxValue1.label && this.newsTitle) {
				this.disabled = false;
			} else {
				this.disabled = true;
			}
		}
	},
	// 生命周期 - 挂载完成（可以访问DOM元素）
	onReady() {
		//位置标签
		apiBusinessInformationTagTagLabel_Get({
			//    cardId: this.rural_info.cardId, //乡村id
			cardId: this.rural_info.cardId //乡村id
		}).then(res => {
			if (res.data.code == 200) {
				if (res.data.data.length != 0) {
					res.data.data.map(item => {
						this.columns[0].push({
							label: `${item.name}`,
							id: `${item.infoTagId}`
						});
					});
				}
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
