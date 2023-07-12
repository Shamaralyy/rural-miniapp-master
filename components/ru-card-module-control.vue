<!-- card模块控制器 -->
<template>
	<view style="background: #f1f1f1;border-radius: 30rpx 30rpx 0 0;">
		<view v-for="(item, index) in moduleData" :key="index">
			<ru-nav-magic
				v-if="item.type == 'nav' && item.show"
				:style="{ order: index + 1 }"
				:navData="navData.navigationJson"
				@magicTap="magicTap"
				:exNavi="navData.bannerimg"
				:isPublic="isPublic"
			/>
			<ru-menu
				v-if="item.type == 'ru-menu' && item.show"
				:style="{ order: index + 1 }"
				:title="item.title"
				@menuItemTap="menuItemTap"
				:content="item.content"
				:isPublic="isPublic"
				:isShowTitle="item.isShowTitle"
			/>
			<ru-photo
				v-if="item.type == 'photo' && item.show"
				:style="{ order: index + 1 }"
				:title="item.title"
				:list="item.list"
				:limit="item.count"
				:isPublic="isPublic"
				:isShowTitle="item.isShowTitle"
			></ru-photo>
			<ru-food
				v-if="item.type == 'food' && item.show"
				:style="{ order: index + 1 }"
				:title="item.title"
				:list="item.list"
				:limit="item.count"
				:isPublic="isPublic"
				:isShowTitle="item.isShowTitle"
			></ru-food>
			<ru-guide
				v-if="item.type == 'guide' && item.show"
				:list="item.list"
				:style="{ order: index + 1 }"
				:title="item.title"
				:limit="item.count"
				:isPublic="isPublic"
				:isShowTitle="item.isShowTitle"
			/>
			<ru-news
				v-if="item.type == 'news' && item.show"
				:list="item.list"
				:style="{ order: index + 1 }"
				:title="item.title"
				:limit="item.count"
				:isPublic="isPublic"
				:isShowTitle="item.isShowTitle"
			/>
			<ru-diy01
				v-if="item.type == 'ru-diy01' && item.show"
				:style="{ order: index + 1 }"
				:title="item.title"
				:list="item.list"
				:limit="item.count"
				:isPublic="isPublic"
				:isShowTitle="item.isShowTitle"
			/>
			<ru-diy02
				v-if="item.type == 'ru-diy02' && item.show"
				:style="{ order: index + 1 }"
				:title="item.title"
				:list="item.list"
				:limit="item.count"
				:isPublic="isPublic"
				:isShowTitle="item.isShowTitle"
			/>
			<ru-diy03
				v-if="item.type == 'ru-diy03' && item.show"
				:style="{ order: index + 1 }"
				:title="item.title"
				:list="item.list"
				:limit="item.count"
				:isPublic="isPublic"
				:isShowTitle="item.isShowTitle"
			/>
			<ru-diy04
				v-if="item.type == 'ru-diy04' && item.show"
				:style="{ order: index + 1 }"
				:title="item.title"
				:list="item.list"
				:limit="item.count"
				:isPublic="isPublic"
				:isShowTitle="item.isShowTitle"
			/>
			<ru-diy05
				v-if="item.type == 'ru-diy05' && item.show"
				:style="{ order: index + 1 }"
				:title="item.title"
				:list="item.list"
				:limit="item.count"
				:isPublic="isPublic"
				:isShowTitle="item.isShowTitle"
			/>
			<ru-diy06
				v-if="item.type == 'ru-diy06' && item.show"
				:style="{ order: index + 1 }"
				:title="item.title"
				:list="item.list"
				:limit="item.count"
				:isPublic="isPublic"
				:isShowTitle="item.isShowTitle"
			/>
			<ru-diy07
				v-if="item.type == 'ru-diy07' && item.show"
				:style="{ order: index + 1 }"
				:title="item.title"
				:list="item.list"
				:limit="item.count"
				:isPublic="isPublic"
				:isShowTitle="item.isShowTitle"
			/>
			<ru-diy08
				v-if="item.type == 'ru-diy08' && item.show"
				:style="{ order: index + 1 }"
				:title="item.title"
				:list="item.list"
				:limit="item.count"
				:isPublic="isPublic"
				:isShowTitle="item.isShowTitle"
			/>
			<ru-diy09
				v-if="item.type == 'ru-diy09' && item.show"
				:style="{ order: index + 1 }"
				:title="item.title"
				:list="item.list"
				:limit="item.count"
				:isPublic="isPublic"
				:isShowTitle="item.isShowTitle"
			/>
		</view>
	</view>
</template>

<script>
export default {
	name: 'ru-card-module-control',
	/**组件传参
	 * @moduleData 	模块排列数据
	 * @navData		魔方显示数据 构成 {navigationJson, bannerimg}
	 * @isPublic	是否公开数据 true公开数据 false预览数据
	 * */
	props: {
		isPublic: {
			type: Boolean,
			default: true
		},
		moduleData: {
			type: Array,
			default: []
		},
		navData: {
			type: Object,
			default: {}
		}
	},
	watch: {
		// moduleData(newValue) {
		// 	console.log('数据挂载', newValue);
		// }
	},
	methods: {
		/**魔方点击事件传递
		 * 在控制器所在标签添加 @magicTap事件即可
		 * 非card页 不要加此事件
		 * */
		magicTap(e) {
			console.log('控制器响应魔方点击事件');
			this.$emit('magicTap', e);
		},

		menuItemTap(e) {
			console.log('控制器响应菜单点击事件');
			this.$emit('magicTap', e);
		}
	}
};
</script>

<style lang="scss" scoped></style>
