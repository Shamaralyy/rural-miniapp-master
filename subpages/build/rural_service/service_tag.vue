<template>
	<view class="content">
		<u-navbar
			title="好物标签管理"
			:autoBack="true"
			:placeholder="true"
			leftIcon="arrow-left"
			bgColor="#fff"
			leftIconColor="#333"
			:titleStyle="{ color: '#333' }"
		></u-navbar>
		<HM-dragSorts
			:list="list"
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
					<u-icon v-if="row.icon" :name="row.icon"></u-icon>
					<text class="text" style="margin-left: 30rpx;">{{ row.name }}</text>
					<u-icon v-if="row.isShow == 1" name="eye-off"></u-icon>
					<text class="text" style="margin-left: 30rpx;font-size: 26rpx;" v-if="row.status==0">[审核中]</text>
				</view>
			</template>
		</HM-dragSorts>
		<u-popup :show="editShow" @close="editShow = false" round="16" :closeable="true">
			<view class="editForm">
				<view class=""><text>修改标签</text></view>
				<u--form labelPosition="left" :model="model1" labelWidth="100">
					<u-form-item label="标签名称" prop="tagInfo.name" borderBottom ref="item1">
						<u--input v-model="editInfo.name" placeholder="请输入标签名称" border="none"></u--input>
					</u-form-item>
					<!-- <u-form-item label="标签介绍" prop="tagInfo.introduce" borderBottom ref="item1">
						<u--input v-model="editInfo.introduce" placeholder="请输入标签简介" border="none" ></u--input>
					</u-form-item> -->
					<u-form-item label="标签图标" prop="navInfo.url" borderBottom ref="item1">
						<view @click="toChangePage(1)" v-if="editInfo.icon == null">
							<u--input value="图标选择" inputAlign="center" disabled border="none"></u--input>
						</view>
						<view @click="toChangePage(1)" v-if="editInfo.icon != null" class="icon">
							<view class=""><u-icon :name="editInfo.icon" size="24"></u-icon></view>
							<view class=""><text>更换</text></view>
						</view>
					</u-form-item>
					<u-form-item label="列表模板" prop="navInfo.url" borderBottom ref="item1">
						<view @click="toChangePage(2,editInfo)" v-if="editInfo.tabTemplate==null">
							<u--input value="默认模板" inputAlign="center" disabled border="none"></u--input>
						</view>
						<view @click="toChangePage(2,editInfo)" v-if="editInfo.tabTemplate!=null" class="icon">
							<view class="">
								<u--input :value="editInfo.tabTemplate.list_style.title+'模板'" inputAlign="center" disabled border="none"></u--input>
							</view>
							<view class="">
								<text>更换</text>
							</view>
						</view>
					</u-form-item>
					<u-form-item label="标签状态" prop="navInfo.url" borderBottom ref="item1">
						<view style="display: flex;flex-direction: row-reverse;">
							<u-switch v-model="editInfo.status" activeColor="#3fc700"></u-switch>
						</view>
					</u-form-item>
				</u--form>
				<view class="editBtn" style="margin-top: 30rpx;">
					<view class="btn" v-if="editInfo.type != 'nav'">
						<u-button type="error" text="删除标签" @click="deleteEdit()"></u-button>
					</view>
					<view class="btn">
						<u-button type="success" color="#04c354" text="保存" @click="saveEdit()"></u-button>
					</view>
				</view>
			</view>
		</u-popup>
		<u-popup :show="addShow" @close="addShow = false" round="16" :closeable="true">
			<view class="addForm">
				<view class=""><text>新增标签</text></view>
				<u--form labelPosition="left" :model="model1" labelWidth="100">
					<u-form-item label="标签名称" prop="tagInfo.name" borderBottom>
						<u--input
							v-model="model1.tagInfo.name"
							placeholder="请输入标签名称"
							border="none"
							@change="editTag()"
						></u--input>
					</u-form-item>
					<!-- <u-form-item label="标签介绍" prop="tagInfo.introduce" borderBottom>
						<u--input v-model="model1.tagInfo.introduce" placeholder="请输入标签简介" border="none" @change="editTag()"></u--input>
					</u-form-item> -->
				</u--form>
				<u-button text="创建标签" @click="add()"></u-button>
			</view>
		</u-popup>
		<view class="content_bottom">
			<view class="button"><u-button text="点击新增标签" @click="addShow = true"></u-button></view>
		</view>
	</view>
</template>
<script>
import {
	apiBusinessCommodityTagBatchUpdateSort_Post,
	apiBusinessCommodityTagList_Post,
	apiBusinessCommodityTagInfoinfoTagId_Get,
	apiBusinessCommodityTagRemoveinfoTagIds_Delete,
	apiBusinessCommodityTagEdit_Post,
	apiBusinessCommodityTagTagLabel_Get,
	apiBusinessCommodityTagAdd_Post
} from '@/API/好物标签.js';
import { request } from '@/utils/request';
import { mapState } from 'vuex';

export default {
	data() {
		return {
			list: [],
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
			editInfo: {}
		};
	},
	computed: {
		...mapState('build', ['tempIconPara','currentRural','tempStylePara']),
		/* 拿取本乡村数据 */
	},
	onShow() {
		console.log('拿回来的图标:',this.tempIconPara)
		console.log('拿回来的模板:',this.tempStylePara)
		if (this.editShow && this.tempIconPara.name != undefined) {
			console.log('√ 路径编辑状态', this.tempIconPara);
			this.editInfo.icon = this.tempIconPara.name;
			this.editInfo.iconName = this.tempIconPara.title;
			return
		} else if (this.addShow && this.tempIconPara.name != undefined) {
			console.log('√ 路径编辑状态', this.tempIconPara);
			this.addInfo.icon = this.tempIconPara.name;
			this.addInfo.iconName = this.tempIconPara.title;
			return
		}else{
			console.log('x 路径编辑状态,');
		}
		if (this.editShow && this.tempStylePara.list_style.name != undefined) {
			console.log('√ 路径编辑状态', this.tempStylePara);
			this.editInfo.tabTemplate = this.tempStylePara;
			return
		} else if (this.addShow && this.tempStylePara != undefined) {
			console.log('√ 路径编辑状态', this.tempStylePara);
			this.addInfo.tabTemplate = this.tempStylePara;
			return
		}else{
			console.log('x 路径编辑状态,');
		}
	},
	onLoad: function(option) {
		// console.log('页面启动参数', option);
		// 获取导航栏高度
		var that = this;
		this.cardId = option.cardId ? option.cardId : option.cardid;
		this.getTagList();
	},
	methods: {
		toChangePage(e,id) {
			if (e == 1) {
				uni.navigateTo({
					url: '../rural_diy/cubeIcon?type=1'
				});
			}
			if(e==2){
				if(id.tabTemplate!=null){
					uni.navigateTo({
						url:'list_style?infoTagId='+id.createByUserId + '&tabStyle='+id.tabTemplate.list_style.name
					})
				}else{
					uni.navigateTo({
						url:'list_style?infoTagId='+id.createByUserId
					})
				}
			}
		},
		deleteEdit() {
			request({
				url: '/api/business/commodityTag/remove/' + this.editInfo.infoTagId,
				method: 'DELETE',
				data: {
					tagId: this.editInfo.infoTagId
				}
			}).then(res => {
				console.log('删除返回的数据', res.data);
				this.getTagList();
				uni.showToast({
					icon: 'none',
					title: `删除成功`
				});

				this.editInfo = {};
				this.editShow = false;
			});
		},
		getTagList() {
			apiBusinessCommodityTagList_Post({ cardId: this.cardId }).then(res => {
				console.log('返回的标签List数据', res.data.data.records);
				this.list = res.data.data.records;
				this.list.map((item, index) => {
					item.tabTemplate = JSON.parse(item.tabTemplate)
				})
			});
		},
		add() {
			var status = 0
			if(this.currentRural.status!=1){
				status = 1
			}
			apiBusinessCommodityTagAdd_Post({
				// introduce: this.model1.tagInfo.introduce,   /** 介绍   string required: */
				cardId: this.cardId /** 名片   number required: */,
				name: this.model1.tagInfo.name /** 名称   string required: */,
				icon: null, /**, 图标   string required: */
				status:status
			}).then(res => {
				console.log('添加结果', res);
				if (res.data.code == 200) {
					uni.showToast({
						icon: 'success',
						title: `添加成功`
					});
					this.getTagList();
					this.addShow = false;
					this.model1.tagInfo.introduce = '';
					this.model1.tagInfo.name = '';
				} else {
					uni.showToast({
						title: `添加异常`
					});
				}
			});
		},
		saveEdit() {
			if (this.editInfo.status) {
				var status = 0;
			}
			if (!this.editInfo.status) {
				var status = 1;
			}
			let apiBusinessInformationTagEdit_Body = {
				infoTagId: this.editInfo.infoTagId /** ID   number required: */,
				cardId: this.editInfo.cardId /** 名片   number required: */,
				name: this.editInfo.name /** 名称   string required: */,
				icon: this.editInfo.icon /** 图标   string required: */,
				isShow: status,
				tabTemplate:JSON.stringify(this.editInfo.tabTemplate)
			};
			apiBusinessCommodityTagEdit_Post(apiBusinessInformationTagEdit_Body).then(res => {
				console.log('修改结果', res);
				if (res.data.code == 200) {
					uni.showToast({
						icon: 'success',
						title: `修改成功`
					});
					this.getTagList();
					this.editShow = false;
					this.editInfo = {};
				} else {
					uni.showToast({
						title: `修改异常`
					});
				}
			});
		},
		onclick(e) {
			console.log('=== onclick start ===');
			console.log('被点击行: ' + JSON.stringify(e.value));
			console.log('被点击下标: ' + JSON.stringify(e.index));
			console.log('=== onclick end ===');
			var index = JSON.stringify(e.index);
			this.editShow = true;
			this.editInfo = e.value;
			if (e.value.isShow == 0) {
				this.editInfo.status = true;
			}
			if (e.value.isShow == 1) {
				this.editInfo.status = false;
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
			console.log('this.list: ', this.list);
			console.log('e.list: ', e.list);
			this.list = e.list;
			var sort = [];
			this.list.map((item, index) => {
				var demo = {
					coordinateTagId: item.coordinateTagId,
					sort: index + 1
				};
				sort = sort.concat(demo);
			});
			console.log(sort);
			apiBusinessCommodityTagBatchUpdateSort_Post(sort).then(res => {
				console.log('位置排序结果', res);
			});
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
.scoped-ref {
	width: 100%;
}
.content {
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
.content_bottom {
	position: fixed;
	bottom: 10rpx;
	background: #fff;
	width: 100%;
	.button {
		display: flex;
		width: 80%;
		margin: 20rpx auto 40rpx auto;
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
</style>
