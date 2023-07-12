<!-- 魔方地址 -->
<template>
	<view>
		<u-navbar
			:autoBack="true"
			:placeholder="true"
			title="名片数据选择"
			bgColor="#ffffff"
			leftIconColor="#303030"
			:titleStyle="{ color: '#303030' }"
		></u-navbar>
		<view class="cube">
			<view class="navTitle"><text>栏目数据</text></view>
			<view v-for="(item, index) in urlList">
				<view class="cubeList">
					<view>
						<text>{{ item.name }}</text>
					</view>
					<view><u-button text="选择" size="small" shape="circle" @click="select(item)"></u-button></view>
				</view>
				<view class="cubeList1" v-for="(item1, index1) in item.list">
					<view>
						<text>{{ item1.name }}</text>
					</view>
					<view>
						<u-button text="选择" size="small" shape="circle" @click="select(item, item1)"></u-button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { apiBusinessCoordinateTagTagLabel_Get } from '@/API/坐标分类62.js';
import { apiBusinessInformationTagTagLabel_Get } from '@/API/资讯标签.js';
import { apiBusinessCommodityTagTagLabel_Get } from '@/API/好物标签.js';
import { apiBusinessAtlasTagTagLabel_Get } from '@/API/图集标签.js';
export default {
	data() {
		return {
			/**
			 * |-name
			 * 		用于魔方跳转路径的显示 掩盖真实程序路径
			 * |-type
			 * 		页面类型  0本村本card跳转tabbar	其他待定
			 * |-page
			 * 		跳转目标
			 * */
			urlList: [
				{
					name: '全部资讯',
					type: 1,
					page: 0,
					tags: 0,
					list: {}
				},
				{
					name: '全部坐标',
					type: 2,
					page: 0,
					tags: 0,
					list: {}
				},
				{
					name: '全部好物',
					type: 3,
					page: 0,
					tags: 0,
					list: {}
				},
				{
					name: '全部图集',
					type: 4,
					page: 0,
					tags: 0,
					list: {}
				}
			],
			cardId: 0
		};
	},
	onLoad(option) {
		this.cardId = option.cardid != undefined ? option.cardid : option.cardId != undefined ? option.cardId : -1;
		//标签
		this.mapTagList1();
		this.mapTagList2();
		this.mapTagList3();
		this.mapTagList4();
	},

	methods: {
		mapTagList1() {
			apiBusinessCoordinateTagTagLabel_Get({
				cardId: this.cardId //名片
			}).then(res => {
				console.log('坐标分类获取结果', res);
				if (res.data.code == 200) {
					this.urlList[1].list = res.data.data;
				}
			});
		},
		//标签
		mapTagList2() {
			apiBusinessInformationTagTagLabel_Get({
				cardId: this.cardId //名片
			}).then(res => {
				console.log('坐标分类获取结果', res);
				if (res.data.code == 200) {
					if (res.data.code == 200) {
						this.urlList[0].list = res.data.data;
					}
				}
			});
		},
		//标签
		mapTagList3() {
			apiBusinessCommodityTagTagLabel_Get({
				cardId: this.cardId //名片
			}).then(res => {
				console.log('坐标分类获取结果', res);
				if (res.data.code == 200) {
					if (res.data.code == 200) {
						this.urlList[2].list = res.data.data;
					}
				}
			});
		},
		mapTagList4() {
			apiBusinessAtlasTagTagLabel_Get({
				cardId: this.cardId //名片
			}).then(res => {
				console.log('坐标分类获取结果', res);
				if (res.data.code == 200) {
					if (res.data.code == 200) {
						this.urlList[3].list = res.data.data;
					}
				}
			});
		},
		/* 选中 */
		select(item, item1) {
			console.log(item, item1);
			if (item1 == undefined || item1 == null) {
				item.list = [];
				this.$store.commit('build/setTempListPara', item);
				uni.showToast({
					title: '选择成功'
				});
				setTimeout(() => {
					uni.navigateBack({
						delta: 1
					});
				}, 500);
			} else {
				let data = item;
				data.name = item1.name;
				if (data.type == 1) {
					data.tags = item1.infoTagId;
				}
				if (data.type == 2) {
					data.tags = item1.coordinateTagId;
				}
				data.list = [];
				this.$store.commit('build/setTempListPara', data);
				uni.showToast({
					title: '选择成功'
				});
				setTimeout(() => {
					uni.navigateBack({
						delta: 1
					});
				}, 500);
			}
		}
	}
};
</script>

<style lang="scss">
.navTitle {
	margin-bottom: 20rpx;
}

.cube {
	margin: 30rpx;

	.cubeList {
		padding: 20rpx 30rpx;
		text-align: center;
		display: flex;
		background: #f1f1f1;
		margin-bottom: 30rpx;
		align-items: center;
		justify-content: space-between;
		border-radius: 20rpx;
	}

	.cubeList1 {
		padding: 20rpx 30rpx;
		text-align: center;
		display: flex;
		background: #f1f1f1;
		margin-bottom: 30rpx;
		align-items: center;
		justify-content: space-between;
		border-radius: 20rpx;
		margin-left: 60rpx;
	}
}
</style>
