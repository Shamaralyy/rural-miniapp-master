<template>
	<view class="content">
		<u-navbar :placeholder="true" title=" " bgColor="#ffffff" leftIconColor="#fff" :titleStyle="{ color: '#333' }">
			<view class="u-nav-slot_left" slot="left">
				<view class="name"><text>DIY菜单编辑</text></view>
			</view>
			<view
				class="u-nav-slot_right"
				slot="right"
				:style="'right:' + menuwidth + 'px;bottom:' + menuwidth / 11 + 'px'"
			>
				<!-- <view class="title"><text @click="page = 1">保存</text></view> -->
				<view class="title"><text @click="saveAll()">保存</text></view>
			</view>
		</u-navbar>
		<view class="menu_view" :class="menuBg ? '' : 'white'">
			<view class="view_content" :class="menuMr ? 'Mr' : ''" v-if="menuType == 0">
				<u-scroll-list :indicator="false">
					<view class="menuList" v-for="(item, index) in menuList" :key="index" v-if="item.show">
						<view class="icon">
							<u-icon v-if="item.imgUrl" :name="item.imgUrl" :size="item.size"></u-icon>
						</view>
						<view class="title">
							<text>{{ item.title }}</text>
						</view>
					</view>
				</u-scroll-list>
			</view>
			<view class="view_content" :class="menuMr ? 'Mr' : ''" v-if="menuType != 0">
				<u-grid :border="false" :col="menuNum">
					<u-grid-item v-for="(listItem, listIndex) in menuList" :key="listIndex" v-if="listItem.show">
						<u-icon
							:name="listItem.imgUrl"
							:customStyle="{ paddingTop: 20 + 'rpx' }"
							:size="listItem.size"
						></u-icon>
						<text class="grid-text">{{ listItem.title }}</text>
					</u-grid-item>
				</u-grid>
			</view>
		</view>
		<view class="menu_edit">
			<view class="nav">
				<view class="title">
					<u-tabs
						:list="list1"
						@change="list1CuOn"
						lineColor="#04c354"
						:activeStyle="{
							color: '#04c354',
							fontSize: '28rpx',
							fontWeight: 'bold',
							transform: 'scale(1.05)'
						}"
					></u-tabs>
				</view>
				<view class="more">
					<u-button text="快速新增" size="small" shape="circle" @click="add()"></u-button>
				</view>
			</view>
			<view class="list" v-if="list1Cu == 0">
				<HM-dragSorts
					:list="menuList"
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
							<u-icon v-if="row.imgUrl" :name="row.imgUrl"></u-icon>
							<text class="text" style="margin-left: 30rpx;">{{ row.title }}</text>
							<u-icon v-if="!row.show" name="eye-off"></u-icon>
						</view>
					</template>
				</HM-dragSorts>
			</view>
			<view class="set" v-if="list1Cu == 1">
				<u--form labelPosition="left" :model="model1" labelWidth="100">
					<u-form-item label="菜单名称" prop="tagInfo.name" borderBottom ref="item1">
						<u-subsection
							activeColor="#3fc700"
							:list="statusList"
							:current="menuType"
							@change="sectionChange"
						></u-subsection>
					</u-form-item>
					<u-form-item label="背景透明" prop="navInfo.url" borderBottom ref="item1">
						<view style="display: flex;flex-direction: row-reverse;">
							<u-switch v-model="menuBg" activeColor="#3fc700"></u-switch>
						</view>
					</u-form-item>
					<u-form-item label="白底边框" prop="navInfo.url" borderBottom ref="item1">
						<view style="display: flex;flex-direction: row-reverse;">
							<u-switch v-model="menuMr" activeColor="#3fc700"></u-switch>
						</view>
					</u-form-item>
				</u--form>
			</view>
		</view>

		<u-popup :show="editShow" @close="editShow = false" round="16" :closeable="true">
			<view class="editForm">
				<view class=""><text>修改菜单项信息</text></view>
				<u--form labelPosition="left" :model="model1" labelWidth="100">
					<u-form-item label="名称" prop="tagInfo.name" borderBottom ref="item1">
						<u--input v-model="editInfo.title" placeholder="请输入名称" border="none"></u--input>
					</u-form-item>
					<u-form-item label="图标" prop="navInfo.url" borderBottom ref="item1">
						<view @click="toChangePage('icon')" class="icon">
							<view class=""><u-icon :name="editInfo.imgUrl" size="24"></u-icon></view>
							<view class=""><text>更换</text></view>
						</view>
					</u-form-item>
					<u-form-item label="链接" prop="navInfo.url" borderBottom ref="item1">
						<view @click="toChangePage(1)" v-if="editInfo.url.name == null">
							<u--input value="选择链接" inputAlign="center" disabled border="none"></u--input>
						</view>
						<view @click="toChangePage(1)" v-if="editInfo.url.name != null" class="icon">
							<view class="">
								<u--input
									:value="editInfo.url.name"
									inputAlign="center"
									disabled
									border="none"
								></u--input>
							</view>
							<view class=""><text>更换</text></view>
						</view>
					</u-form-item>
					<u-form-item label="显示开关" prop="navInfo.url" borderBottom ref="item1">
						<view style="display: flex;flex-direction: row-reverse;">
							<u-switch v-model="editInfo.show" activeColor="#3fc700"></u-switch>
						</view>
					</u-form-item>
				</u--form>
				<view class="editBtn" style="margin-top: 30rpx;">
					<view class="btn" v-if="editInfo.type != 'nav'">
						<u-button type="error" text="删除菜单项" @click="changeData(false)"></u-button>
					</view>
					<view class="btn">
						<u-button type="success" color="#04c354" text="更改菜单项" @click="changeData(true)"></u-button>
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>
<script>
import { mapState } from 'vuex';
import { getDefault_menu } from '@/utils/defaultData.js';
import { apiBusinessCardInfo_Get } from '@/API/乡村名片.js';
export default {
	data() {
		return {
			menuType: 0, //显示行数
			menuBg: true,
			menuMr: false,
			menuNum: 4, //单行最多
			menuList: [], //菜单项数据
			ispush: false,
			addShow: false,
			editShow: false,
			model1: {
				tagInfo: {
					name: '',
					introduce: '',
					id: ''
				}
			},
			cardId: '',
			editInfo: {},
			list1: [{ name: '菜单列表' }, { name: '菜单设置' }],
			list1Cu: 0,
			statusList: ['单行', '多行4列', '多行5列'],
			pagesWidth: 750,
			pagesHeight: 2000,
			editCurrent: 0,
			menuwidth: 0
			/* 最终的数据结构 */
			/* endData: {
				type: 'menu',
				title: '菜单导航',
				show: true,
				menuType: 0,
				menuNum: 4,
				menuMr: true,
				menuBg: true,
				menuList: []
			} */
		};
	},
	computed: {
		/* 拿取本乡村数据 */
		...mapState('build', ['currentRural', 'tempMenuContent'])
	},
	onLoad: function(option) {
		// console.log('页面启动参数', option);
		// 获取导航栏高度
		var that = this;
		this.cardId = option.cardId ? option.cardId : option.cardid;
		// 获取导航栏高度
		let sysInfo = getApp().globalData.sysInfo;

		this.pagesWidth = sysInfo.windowWidth;
		this.pagesHeight = sysInfo.windowHeight;
		let menu = wx.getMenuButtonBoundingClientRect();
		this.menuwidth = menu.width + menu.width / 7;
	},
	onReady() {
		this._setInitData();
		uni.$on('menuIcon', icon => {
			this.editInfo.imgUrl = icon;
		});
	},
	methods: {
		/* 初始化页面数据 */
		_setInitData() {
			if (this.tempMenuContent) {
				Object.keys(this.tempMenuContent).map(value => {
					this[value] = this.tempMenuContent[value];
				});

				return;
			}
			let DefaultData = getDefault_menu();
			console.log(DefaultData);
			this.menuMr = DefaultData.menuMr;
			this.menuBg = DefaultData.menuBg;
			this.menuNum = DefaultData.menuNum;
			this.menuType = DefaultData.menuType;
			this.menuList = DefaultData.menuList;
		},
		saveAll() {
			const endData = {
				// type: 'ru-menu',
				// title: '菜单导航',
				// show: true,
				menuMr: this.menuMr,
				menuBg: this.menuBg,
				menuNum: this.menuNum,
				menuType: this.menuType,
				menuList: this.menuList
			};

			console.log('保存的数据', endData);
			uni.$emit('setMenu', endData);
			uni.navigateBack({ delta: 1 });
		},

		/* 修改源数据数据 */
		changeData(flag) {
			if (flag) {
				this.menuList.splice(this.editInfo.index, 1, this.editInfo);
			} else {
				this.menuList.splice(this.editInfo.index, 1);
			}
			this.editShow = false;
		},
		/* ----------------------------------------- */
		sectionChange(index) {
			this.menuType = index;
			if (index == 1) {
				this.menuNum = 4;
			}
			if (index == 2) {
				this.menuNum = 5;
			}
		},
		toChangePage(e) {
			console.log('触发', e);
			if (e == 'icon') {
				uni.navigateTo({
					url: '/subpages/build/rural_diy/cubeIcon?type=1'
				});
			}
		},
		list1CuOn(e) {
			if (this.list1Cu == e.index) return;
			console.log(e);
			this.list1Cu = e.index;
		},
		add() {
			var data = {
				url: null,
				title: '新增示例',
				imgUrl: 'https://cdn.xiangcunmingpian.com/app/static/myrural_nav_1.png',
				show: true,
				size: 26
			};
			this.menuList = this.menuList.concat(data);
		},
		onclick(e) {
			console.log('被点击下标: ', e.index);
			console.log('被点击项目数据: ', e.value);
			console.log('=== onclick end ===');
			this.editShow = true;
			this.editInfo = e.value;
			this.editInfo.index = e.index;
			if (e.value.status == '0') {
				this.editInfo.status = false;
			}
			if (e.value.status == '1') {
				this.editInfo.status = true;
			}
			this.editInfo.index = e.index;
		},
		change(e) {
			console.log('=== change start ===');
			console.log('被拖动行: ' + JSON.stringify(e.moveRow));
			console.log('原始下标：', e.index);
			console.log('移动到：', e.moveTo);
			console.log('=== change end ===');
		},
		confirm(e) {
			console.log('this.list: ', this.menuList);
			console.log('e.list: ', e.list);
			this.menuList = e.list;
			var sort = [];

			console.log('=== confirm start ===');
			console.log('被拖动行: ' + JSON.stringify(e.moveRow));
			console.log('原始下标：', e.index);
			console.log('移动到：', e.moveTo);
			console.log('=== confirm end ===');
		}
	}
};
</script>
<style lang="scss" scoped>
//scoped css只在当前页生效 不影响子组件
page {
	background-color: #efeff4;
}
@media (prefers-color-scheme: dark) {
	page {
		background-color: #000000;
	}
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

.scoped-ref {
	width: 100%;
}
.content {
	background-color: #efeff4;
	.row {
		display: flex;
		// flex-direction: row;
		align-items: center;
		.icon {
			width: 30px;
			height: 30px;
			border-radius: 6px;
			margin-right: 13px;
		}
		.text {
			font-size: 30rpx;
		}
	}
}

.editForm {
	height: 800rpx;
	margin: 30rpx;
	.editBtn {
		display: flex;
		justify-content: space-evenly;
		.btn {
			width: 40%;
		}
	}
	.icon {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
}
.addForm {
	height: 800rpx;
	margin: 30rpx;
	.addBtn {
		display: flex;
		justify-content: space-evenly;
		.btn {
			width: 40%;
		}
	}
}
.white {
	background: #fff;
}
.menu_view {
	display: flex;
	margin: 50rpx 0;

	.Mr {
		padding: 20rpx 0 40rpx 0;
		margin: 0 30rpx;
		border-radius: 20rpx;
		background: #fff;
	}
	.view_content {
		display: inherit;
		width: 100%;
		padding: 20rpx 0;
		// justify-content: space-evenly;
		overflow: scroll;
		.menuList {
			display: flex;
			width: 18vw;
			margin-right: 30rpx;
			flex-direction: column;
			.icon {
				display: flex;
				justify-content: center;
			}
			.title {
				text-align: center;
				font-size: 28rpx;
			}
		}
		.u-grid-item {
			display: flex;
			width: 20vw;
			flex-direction: column;
			.u-icon {
				display: flex;
				justify-content: center;
			}
			.grid-text {
				text-align: center;
				font-size: 28rpx;
			}
		}
	}
}
.menu_edit {
	display: flex;
	flex-direction: column;
	background: #fff;
	border-radius: 30rpx 30rpx 0 0;
	.nav {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 30rpx;
	}
	.set {
		margin: 0rpx 30rpx;
	}
}
</style>
