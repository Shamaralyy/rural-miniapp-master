<!-- 魔方地址 -->
<template>
	<view>
		<u-navbar
			:autoBack="true"
			:placeholder="true"
			title="名片模块选择"
			bgColor="#ffffff"
			leftIconColor="#303030"
			:titleStyle="{ color: '#303030' }"
		></u-navbar>
		<view class="">
			<u-tabs
				:list="list1"
				@click="clickTags()"
				lineColor="#04c354"
				:current="current"
				:activeStyle="{
					color: '#04c354',
					fontSize: '32rpx',
					fontWeight: 'bold',
					transform: 'scale(1.05)'
				}"
			></u-tabs>
		</view>
		<u-gap height="12" bgColor="#f1f1f1"></u-gap>
		<view v-for="(item, index) in urlList" :key="index" class="modular_list">
			<view class="nav">
				<view class="title">
					<text>{{ item.name }}模块</text>
				</view>
				<view class="more">
					<u-button text="选择此模块" size="small" shape="circle" @click="select(item)"></u-button>
				</view>
			</view>
			<!-- <diy-photo :style="{ order: index + 1 }" :title="item.name" v-if="item.type == 'photo'" /> -->
			<ru-food
				:style="{ order: index + 1 }"
				:title="item.name"
				v-if="item.type == 'food'"
				:isPublic="isPublic"
				:modularType="item.type"
			/>
			<ru-guide
				:style="{ order: index + 1 }"
				:title="item.name"
				v-if="item.type == 'guide'"
				:isPublic="isPublic"
				:modularType="item.type"
			/>
			<ru-news
				:style="{ order: index + 1 }"
				:title="item.name"
				v-if="item.type == 'news'"
				:isPublic="isPublic"
				:modularType="item.type"
			/>
			<ru-diy01
				:style="{ order: index + 1 }"
				:title="item.name"
				v-if="item.type == 'ru-diy01'"
				:isPublic="isPublic"
				:modularType="item.type"
			/>
			<ru-diy02
				:style="{ order: index + 1 }"
				:title="item.name"
				v-if="item.type == 'ru-diy02'"
				:isPublic="isPublic"
				:modularType="item.type"
			/>
			<ru-diy03
				:style="{ order: index + 1 }"
				:title="item.name"
				v-if="item.type == 'ru-diy03'"
				:isPublic="isPublic"
				:modularType="item.type"
			/>
			<ru-diy04
				:style="{ order: index + 1 }"
				:title="item.name"
				v-if="item.type == 'ru-diy04'"
				:isPublic="isPublic"
				:modularType="item.type"
			/>
			<ru-diy05
				:style="{ order: index + 1 }"
				:title="item.name"
				v-if="item.type == 'ru-diy05'"
				:isPublic="isPublic"
				:modularType="item.type"
			/>
			<ru-diy06
				:style="{ order: index + 1 }"
				:title="item.name"
				v-if="item.type == 'ru-diy06'"
				:isPublic="isPublic"
				:modularType="item.type"
			/>
			<ru-diy07
				:style="{ order: index + 1 }"
				:title="item.name"
				v-if="item.type == 'ru-diy07'"
				:isPublic="isPublic"
				:modularType="item.type"
			/>
			<ru-diy08
				:style="{ order: index + 1 }"
				:title="item.name"
				v-if="item.type == 'ru-diy08'"
				:isPublic="isPublic"
				:modularType="item.type"
			/>
			<ru-diy09
				:style="{ order: index + 1 }"
				:title="item.name"
				v-if="item.type == 'ru-diy09'"
				:isPublic="isPublic"
				:modularType="item.type"
			/>
			<ru-menu
				:style="{ order: index + 1 }"
				:title="item.name"
				v-if="item.type == 'ru-menu'"
				:isPublic="isPublic"
				:modularType="item.type"
			/>
			<u-gap height="12" bgColor="#f1f1f1"></u-gap>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			isPublic: false,
			/**
			 * |-name
			 * 		用于魔方跳转路径的显示 掩盖真实程序路径
			 * |-type
			 * 		页面类型  0本村本card跳转tabbar	其他待定
			 * |-page
			 * 		跳转目标
			 * */
			list1: [
				{
					name: '全部'
				},
				{
					name: '列表类'
				},
				{
					name: '专题类'
				},
				{
					name: '介绍类'
				},
				{
					name: '功能类'
				}
			],
			vs: [
				// { name: '图片模块', type: 'photo', tag: 1 },
				{ name: '资讯模块', type: 'news', tag: 1 },
				{ name: '美食模块', type: 'food', tag: 2 },
				{ name: '栏目模块', type: 'guide', tag: 1 },
				{ name: '菜单导航', type: 'ru-menu', tag: 4 },
				{ name: '样式1', type: 'ru-diy01', tag: 1 },
				{ name: '样式2', type: 'ru-diy02', tag: 1 },
				{ name: '样式3', type: 'ru-diy03', tag: 1 },
				{ name: '图集模块', type: 'ru-diy04', tag: 1 },
				{ name: '样式5', type: 'ru-diy05', tag: 1 },
				{ name: '样式6', type: 'ru-diy06', tag: 1 },
				{ name: '样式7', type: 'ru-diy07', tag: 1 },
				{ name: '样式8', type: 'ru-diy08', tag: 1 },
				{ name: '样式9', type: 'ru-diy09', tag: 1 }
			],
			urlList: [],
			current: 0
		};
	},
	onLoad() {
		this.urlList = this.vs;
	},
	methods: {
		clickTags(e) {
			console.log(e.index);
			this.urlList = [];
			if (e.index == 0) {
				this.urlList = this.vs;
				this.current = 0;
				return;
			} else {
				this.current = e.index;
				this.vs.map((value, index) => {
					if (value.tag == e.index) {
						this.urlList = this.urlList.concat(value);
					}
				});
			}
		},
		/* 选中 */
		select(item) {
			this.$store.commit('build/setTempNavPara', item);
			uni.showToast({ title: '选择成功' });
			setTimeout(() => {
				uni.navigateBack({ delta: 1 });
			}, 500);
		}
	}
};
</script>

<style lang="scss">
	page{
		background: #efefef;
	}
.modular_list {
	border-bottom: 1rpx #d9d9d9 solid;
	.nav {
		display: flex;
		justify-content: space-between;
		padding: 20rpx 30rpx;
		align-items: center;
		border-bottom: 1rpx #d9d9d9 solid;
		background: #fafafa;
	}
}
</style>
