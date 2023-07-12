<template>
	<view class="content">
		<view class="" v-show="page == 1">
			<subCard_diy
				:subPageData="{ rural_info, vs1, menuwidth, bannerimg, page }"
				@pageData="pageData"
			></subCard_diy>
		</view>
		<view class="" v-show="page == 0">
			<u-navbar
				:placeholder="true"
				title=" "
				bgColor="#ffffff"
				leftIconColor="#fff"
				:titleStyle="{ color: '#333' }"
			>
				<view class="u-nav-slot_left" slot="left">
					<view class="name"><text>名片页装修</text></view>
				</view>
				<view
					class="u-nav-slot_right"
					slot="right"
					:style="'right:' + menuwidth + 'px;bottom:' + menuwidth / 11 + 'px'"
				>
					<view class="title"><text @click="page = 1">名片预览</text></view>
				</view>
			</u-navbar>
			<view class="diy">
				<ru-card-module-control
					:moduleData="vs1"
					:navData="{ bannerimg, navigationJson: rural_info.navigationJson }"
				></ru-card-module-control>
			</view>
		</view>
		<u-popup
			:show="addShow"
			@close="addShow = false"
			overlayOpacity="0.8"
			round="20"
			:closeable="true"
			zIndex="10076"
			:closeOnClickOverlay="false"
		>
			<view class="addForm">
				<view class="addName"><text>新增模块</text></view>
				<u--form labelPosition="left" :model="addInfo" labelWidth="100">
					<u-form-item label="模块名称" inputAlign="center" borderBottom>
						<u--input v-model="addInfo.title" placeholder="请输入模块名称" border="none"></u--input>
					</u-form-item>
					<u-form-item label="模块样式" borderBottom @click="toChangePage(0)">
						<u--input v-model="addInfo.typeName" inputAlign="center" disabled border="none"></u--input>
					</u-form-item>
					<u-form-item label="模块数据" borderBottom v-if="addInfo.type != 'ru-menu'">
						<view v-if="addInfo.type != 'nav' && addInfo.list.length == 0" @click="toChangePage(1)">
							<u--input value="点击选择模块数据" inputAlign="center" disabled border="none"></u--input>
						</view>
						<view v-if="addInfo.type != 'nav' && addInfo.list.length != 0" @click="toChangePage(1)">
							<u--input v-model="addInfo.listName" inputAlign="center" disabled border="none"></u--input>
						</view>
					</u-form-item>
					<u-form-item label="是否显示" borderBottom style="display: flex;flex-direction: row-reverse;">
						<u-switch v-model="addInfo.show" @change="addShow()" activeColor="#3fc700"></u-switch>
					</u-form-item>
				</u--form>
				<view class="">
					<text v-if="addInfo.type == 'ru-menu'" style="font-size: 26rpx;color:#444444">
						菜单模块需先创建后，再编辑模块数据
					</text>
				</view>
				<view class="addBtn" style="margin-top: 30rpx;">
					<view class="btn">
						<u-button type="success" color="#04c354" text="保存新的模块" @click="saveAdd()"></u-button>
					</view>
				</view>
			</view>
		</u-popup>
		<u-popup
			:show="editShow"
			@close="editShow = false"
			overlayOpacity="0.8"
			round="20"
			:closeable="true"
			zIndex="10076"
			:closeOnClickOverlay="false"
		>
			<view class="editForm">
				<view class="editName"><text>编辑模块</text></view>
				<u--form labelPosition="left" labelWidth="100" :labelStyle="{ height: '70rpx' }">
					<u-form-item label="模块名称" borderBottom>
						<view v-if="editInfo.type != 'nav'">
							<u--input
								v-model="editInfo.title"
								inputAlign="center"
								placeholder="请输入模块名称"
								border="none"
							></u--input>
						</view>
						<view v-if="editInfo.type == 'nav'">
							<u--input
								v-model="editInfo.title"
								inputAlign="center"
								disabled
								placeholder="请输入模块名称"
								border="none"
							></u--input>
						</view>
					</u-form-item>
					<u-form-item label="模块样式" borderBottom>
						<view v-if="editInfo.type == 'nav'">
							<u--input v-model="editInfo.typeName" inputAlign="center" disabled border="none"></u--input>
						</view>
						<view v-if="editInfo.type != 'nav'" @click="toChangePage(0)">
							<u--input v-model="editInfo.typeName" inputAlign="center" disabled border="none"></u--input>
						</view>
					</u-form-item>
					<u-form-item label="模块数据" borderBottom>
						<view v-if="editInfo.type == 'ru-menu'" @click="toChangePage(2)">
							<u--input
								value="点击编辑菜单模块数据"
								inputAlign="center"
								disabled
								border="none"
							></u--input>
						</view>
						<view v-if="editInfo.type == 'nav'" @click="toChangePage(1)">
							<u--input
								value="点击编辑魔方导航数据"
								inputAlign="center"
								disabled
								border="none"
							></u--input>
						</view>

						<view
							v-if="editInfo.type != 'ru-menu' && editInfo.type != 'nav' && editInfo.list.length == 0"
							@click="toChangePage(1)"
						>
							<u--input value="点击选择模块数据" inputAlign="center" disabled border="none"></u--input>
						</view>
						<view v-if="editInfo.type != 'nav' && editInfo.list.length != 0" @click="toChangePage(1)">
							<u--input v-model="editInfo.listName" inputAlign="center" disabled border="none"></u--input>
						</view>
					</u-form-item>
					<u-form-item label="是否显示" borderBottom>
						<view style="display: flex;flex-direction: row-reverse;">
							<u-switch v-model="editInfo.show" @change="editModShow" activeColor="#3fc700"></u-switch>
						</view>
					</u-form-item>
					<u-form-item label="显示数量" borderBottom>
						<view v-if="editInfo.type != 'nav'" style="display: flex;flex-direction: row-reverse;">
							<u-number-box v-model="editInfo.count"></u-number-box>
							<!-- <u--input v-model="" placeholder="请输入展示数量,默认5条" border="none"  "></u--input> -->
						</view>
					</u-form-item>
					<u-form-item label="显示标题" borderBottom>
						<view style="display: flex;flex-direction: row-reverse;">
							<u-switch
								v-model="editInfo.isShowTitle"
								@change="editModShowTitle"
								activeColor="#3fc700"
							></u-switch>
						</view>
					</u-form-item>
				</u--form>
				<view class="">
					<text v-if="editInfo.type == 'nav'" style="font-size: 26rpx;color:#444444">
						不需要可不显示，本模块不支持删除，推荐放第一位
					</text>
				</view>
				<view class="editBtn" style="margin-top: 30rpx;">
					<view class="btn" v-if="editInfo.type != 'nav'">
						<u-button type="error" text="删除模块" @click="deleteEdit()"></u-button>
					</view>
					<view class="btn">
						<u-button type="success" color="#04c354" text="保存此模块数据" @click="saveEdit()"></u-button>
					</view>
				</view>
			</view>
		</u-popup>

		<u-popup
			:show="show"
			@close="show = false"
			overlayOpacity="0.1"
			round="20"
			:closeable="true"
			:closeOnClickOverlay="false"
		>
			<view class="diySlot" :style="{ height: pagesHeight * 0.9 + 'rpx' }">
				<view class="nav">
					<view class="title"><text>名片模块排序</text></view>
					<view class="add">
						<u-button text="新增模块" size="small" shape="circle" @click="addNewNav()"></u-button>
					</view>
				</view>
				<view class="list">
					<HM-dragSorts
						:list="vs1"
						:isLongTouch="false"
						:isAutoScroll="true"
						:feedbackGeneratorState="true"
						:rowHeight="50"
						@change="change"
						@confirm="confirm"
						@onclick="onclick"
					>
						<template v-slot:rowContent="{ row }">
							<view class="row">
								<text class="typeText" v-if="row.type == 'nav'">[魔方导航]</text>
								<text class="typeText" v-if="row.type == 'photo'">[筛选图集]</text>
								<text class="typeText" v-if="row.type == 'news'">[资讯模块]</text>
								<text class="typeText" v-if="row.type == 'guide'">[栏目模块]</text>
								<text class="typeText" v-if="row.type == 'food'">[美食模块]</text>
								<text class="typeText" v-if="row.type == 'ru-menu'">[菜单模块]</text>
								<text class="typeText" v-if="row.type == 'ru-diy01'">[样式1]</text>
								<text class="typeText" v-if="row.type == 'ru-diy02'">[样式2]</text>
								<text class="typeText" v-if="row.type == 'ru-diy03'">[样式3]</text>
								<text class="typeText" v-if="row.type == 'ru-diy04'">[图集模块]</text>
								<text class="typeText" v-if="row.type == 'ru-diy05'">[样式5]</text>
								<text class="typeText" v-if="row.type == 'ru-diy06'">[样式6]</text>
								<text class="typeText" v-if="row.type == 'ru-diy07'">[样式7]</text>
								<text class="typeText" v-if="row.type == 'ru-diy08'">[样式8]</text>
								<text class="typeText" v-if="row.type == 'ru-diy09'">[样式9]</text>
								<text class="text">{{ row.title }}</text>
								<u-icon v-if="!row.show" name="eye-off"></u-icon>
							</view>
						</template>
					</HM-dragSorts>
				</view>
			</view>
		</u-popup>
		<view class="content_bottom">
			<view class="button" v-if="!show && page == 0">
				<view class="btn"><u-button text="模块编辑管理" @click="show = true"></u-button></view>
				<view class="btn"><u-button text="保存" color="#04c354" @click="save()"></u-button></view>
			</view>
		</view>
	</view>
</template>
<script>
import { apiBusinessCardEdit_Put } from '@/API/乡村名片.js';
import { mapState, mapMutations } from 'vuex';
import { getDefault_navJson } from '@/utils/defaultData.js';
import subCard_diy from '@/subpages/card/subCard/subCard_diy.vue';
import {
	random,
	getStr_lv5,
	getZoomLeve,
	getMapType,
	getStrIdentity,
	getIntegerIdentity,
	getStrJob
} from '@/utils/Utils-tool.js';
import {
	apiBusinessCardPage_Post,
	apiBusinessCardJoin_Post,
	apiBusinessCardInfo_Get,
	apiBusinessCardMyRural_Get,
	apiBusinessCardJoin_Body
} from '@/API/乡村名片.js';
const imgBaseUrl = getApp().globalData.imgBaseUrl + '/app';
export default {
	components: { subCard_diy },
	computed: {
		...mapState('build', ['currentRural', 'tempNavPara', 'tempListPara']),
		/* 拿取本乡村数据 */
		rural_info() {
			return this.$store.state.build.currentRural;
		}
	},
	onReady() {
		uni.$on('setMenu', content => {
			this.editInfo['content'] = content;
		});
	},
	data() {
		return {
			vs1: [],
			ispush: false,
			show: false,
			bannerimg: [], //轮播图数据
			//基础图片URL、当前页面宽度及高度、关闭胶囊宽度659011502000
			imgBaseUrl: imgBaseUrl,
			pagesWidth: 750,
			pagesHeight: 2000,
			menuwidth: 0,
			page: 0,
			editShow: false,
			editInfo: {
				type: '',
				title: '',
				show: true,
				list: '',
				isShowTitle: true,
				count: 5
			},
			addShow: false,
			addInfo: {
				type: '',
				title: '',
				show: true,
				list: '',
				isShowTitle: true,
				count: 5
			},
			model1: {
				tagInfo: {
					name: '',
					introduce: '',
					id: ''
				}
			}
		};
	},
	onShow() {
		console.log('拿回来的数据1', this.tempNavPara, '拿回来的数据2', this.tempListPara);
		if (this.editShow && this.tempListPara.name != undefined) {
			console.log('√ 路径编辑状态', this.tempListPara);
			this.editInfo.list = this.tempListPara;
			this.editInfo.listName = this.tempListPara.name;
			this.setTempListPara([]);
		} else if (this.addShow && this.tempListPara.name != undefined) {
			console.log('√ 路径编辑状态', this.tempListPara);
			this.addInfo.list = this.tempListPara;
			this.addInfo.listName = this.tempListPara.name;
			this.setTempListPara([]);
		} else {
			console.log('x 路径编辑状态,');
		}

		if (this.editShow && this.tempNavPara.name != undefined) {
			console.log('√ 路径编辑状态', this.tempNavPara);
			this.editInfo.type = this.tempNavPara.type;
			this.editInfo.typeName = this.tempNavPara.name;
			this.setTempNavPara([]);
		} else if (this.addShow && this.tempNavPara.name != undefined) {
			console.log('√ 路径编辑状态', this.tempNavPara);
			this.addInfo.type = this.tempNavPara.type;
			this.addInfo.typeName = this.tempNavPara.name;
			this.setTempNavPara([]);
		} else {
			console.log('x 路径编辑状态,');
		}
	},
	onLoad() {
		// 获取导航栏高度
		let sysInfo = getApp().globalData.sysInfo;

		this.pagesWidth = sysInfo.windowWidth;
		this.pagesHeight = sysInfo.windowHeight;
		let menu = wx.getMenuButtonBoundingClientRect();
		this.menuwidth = menu.width + menu.width / 7;
		// 打开直接解析缓存
		this.paseData();
	},
	onUnload() {
		// 退出再更新缓存数据
		this.refreshRuralinfo();
	},
	methods: {
		...mapMutations('build', ['setTempNavPara', 'setTempListPara', 'setCurrentRural_all', 'setTempMenuContent']),
		saveAdd() {
			if (uni.$u.trim(this.addInfo.title) == '') {
				uni.showToast({ icon: 'none', title: `请先填写标题` });
			} else {
				console.log('合并的数据',this.addInfo);
				this.vs1 = this.vs1.concat(this.addInfo);
				uni.showToast({ icon: 'success', title: `新增成功` });
				this.addInfo = {
					type: '',
					title: '',
					show: true,
					list: '',
					isShowTitle: true,
					count: 5
				};
				this.addShow = false;
			}
		},
		addNewNav() {
			this.addInfo = {
				type: '',
				title: '',
				show: true,
				list: '',
				isShowTitle: true,
				count: 5
			};
			this.addShow = true;
			uni.navigateTo({ url: './modular' });
		},
		// 进行页面跳转 选择导航链接路径
		toChangePage(e) {
			if (e == 0) {
				uni.navigateTo({ url: './modular' });
			}
			if (e == 1) {
				if (this.editInfo.type == 'nav' || this.addInfo.type == 'nav') {
					uni.navigateTo({
						url: '../rural_info/info_navmagic?cardid=' + this.rural_info.cardId
					});
				} else {
					uni.navigateTo({ url: './cubeUrl?cardId=' + this.rural_info.cardId });
				}
			}
			if (e == 2) {
				if (this.editInfo.type == 'ru-menu' || this.addInfo.type == 'ru-menu') {
					this.setTempMenuContent(this.editInfo.content);
					uni.navigateTo({
						url: '../rural_diy/diy_menu?cardid=' + this.rural_info.cardId
					});
				} else {
					uni.navigateTo({ url: './cubeUrl?cardId=' + this.rural_info.cardId });
				}
			}
		},
		/* 模块显示开关 */
		editModShow(e) {
			// console.log(e);
			this.editInfo.show = e;
			this.vs1[this.editInfo.index] = this.editInfo;
		},
		/*  标题显示开关 */
		editModShowTitle(e) {
			// console.log(e);
			this.editInfo.isShowTitle = e;
			this.vs1[this.editInfo.index] = this.editInfo;
		},
		saveEdit() {
			console.log('保存的数据', this.editInfo);
			this.vs1[this.editInfo.index] = this.editInfo;
			uni.showToast({
				icon: 'success',
				title: `保存成功`
			});
			this.editShow = false;
		},
		deleteEdit() {
			this.vs1.splice(this.editInfo.index, 1);
			this.editInfo = [];
			uni.showToast({
				icon: 'success',
				title: `删除成功`
			});
			this.editShow = false;
		},
		save() {
			let navJson = JSON.stringify(this.vs1);
			apiBusinessCardEdit_Put({
				module: navJson,
				cardId: this.rural_info.cardId
			}).then(res => {
				console.log('更新请求结果', res);
				if (res.data.code == 200) {
					uni.showToast({
						icon: 'success',
						title: `保存成功`
					});
				} else {
				}
			});
		},
		pageData(subPageData) {
			console.log(subPageData);
			this.page = subPageData;
		},
		onclick(e) {
			console.log('=== onclick start ===');
			console.log('被点击行数据: ', e.value);
			// console.log('被点击下标: ', e.index);
			this.editInfo = e.value;
			this.editInfo.index = e.index;
			this.editInfo.typeName =
				e.value.type == 'nav'
					? '导航魔方'
					: e.value.type == 'news'
					? '新闻模块'
					: e.value.type == 'photo'
					? '图集模块'
					: e.value.type == 'guide'
					? '位置模块'
					: e.value.type == 'food'
					? '页脚模块'
					: e.value.type == 'ru-diy04'
					? '图集模块'
					: e.value.type == 'ru-diy01'
					? '样式1'
					: e.value.type == 'ru-diy02'
					? '样式2'
					: e.value.type == 'ru-diy03'
					? '样式3'
					: e.value.type == 'ru-diy05'
					? '样式5'
					: e.value.type == 'ru-diy06'
					? '样式6'
					: e.value.type == 'ru-diy07'
					? '样式7'
					: e.value.type == 'ru-diy08'
					? '样式8'
					: e.value.type == 'ru-diy09'
					? '样式9'
					: e.value.type == 'ru-menu'
					? '菜单模块'
					: '未知模块';
			this.editShow = true;
		},
		change(e) {
			console.log('=== change start ===\n被拖动行: ' + JSON.stringify(e.moveRow));
			console.log('原始下标：', e.index, '\n移动到：', e.moveTo, '\n=== change end ===');
		},
		confirm(e) {
			console.log('this.list: ', this.vs1);
			console.log('e.list: ', e.list);
			this.vs1 = e.list;
			console.log('=== confirm start ===');
			console.log('被拖动行: ' + JSON.stringify(e.moveRow));
			console.log('原始下标：', e.index);
			console.log('移动到：', e.moveTo);
			console.log('=== confirm end ===');
		},
		paseData() {
			console.log('乡村数据', this.rural_info);
			if (this.rural_info.module) {
				if (this.rural_info.module != '[]') {
					this.vs1 = JSON.parse(this.rural_info.module);
				} else {
					uni.showToast({
						icon: 'none',
						title: `载入默认导航数据中`
					});
					this.vs1 = getDefault_navJson();
				}
			} else {
				uni.showToast({
					icon: 'none',
					title: `载入默认导航数据中`
				});
				this.vs1 = getDefault_navJson();
			}
			try {
				let imgJSON = JSON.parse(this.rural_info.images);
				this.bannerimg = imgJSON.map(value => value.imgUrl);
			} catch (e) {
				this.bannerimg = [];
			}
		},
		/* 更新乡村数据 */
		refreshRuralinfo() {
			apiBusinessCardInfo_Get({ cardId: this.rural_info.cardId })
				.then(res => {
					// console.log('获取当前乡村数据', res);
					if (res.data.code == 200) {
						this.setCurrentRural_all(res.data.data);
						console.log('更新乡村数据', res.data.data);
					}
				})
				.catch(err => {
					console.log('请求异常');
				});
		}
	}
};
</script>
<style lang="scss" scoped>
//scoped css只在当前页生效 不影响子组件
.content {
	// background: #f1f1f1;
}

.diy {
	margin-bottom: 200rpx;
}
.u-nav-slot_left {
	display: flex;
	// background: #0006;
	padding: 10rpx 20rpx;
	// border-radius: 30rpx;
	color: #333;
	.name {
		font-size: 32rpx;
		font-family: 'SourceHanSerifCN-Medium';
		font-family: 'SourceHanSerifCN-Bold';
	}
	.title {
		font-size: 26rpx;
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

.content_bottom {
	position: fixed;
	bottom: 0rpx;
	background: #fff;
	width: 100%;
	z-index: 20;
	border-top: 1rpx #e4e4e4 solid;
	.button {
		display: flex;
		width: 80%;
		margin: 20rpx auto 40rpx auto;
		justify-content: space-evenly;
		.btn {
			width: 40%;
		}
	}
}
.diySlot {
	margin: 30rpx;
	.nav {
		display: flex;
		align-items: center;
		.title {
			font-size: 32rpx;
			margin: 10rpx 0rpx 30rpx 0rpx;
		}
		.add {
			margin: 10rpx 0rpx 30rpx 20rpx;
		}
	}
	.typeText {
		color: red;
		font-size: 26rpx;
		margin-right: 10rpx;
	}
}
.form {
	margin: 30rpx;
}
.content {
	margin-bottom: 150rpx;
	.row {
		display: flex;
		flex-direction: row;
		align-items: center;
		.icon {
			width: 30px;
			height: 30px;
			border-radius: 6px;
			margin-right: 13px;
		}
		.text {
			font-size: 13px;
		}
	}
}
.editForm {
	height: 1000rpx;
	margin: 30rpx;
	.editBtn {
		display: flex;
		justify-content: space-evenly;
		.btn {
			width: 40%;
		}
	}
}
.addForm {
	height: 1000rpx;
	margin: 30rpx;
	.addBtn {
		display: flex;
		justify-content: space-evenly;
		.btn {
			width: 40%;
		}
	}
}
</style>
