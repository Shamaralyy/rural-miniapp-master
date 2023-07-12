<!-- 组件模板 -->
<template>
	<view>
		<view class="content_tabs">
			<u-tabs
				:list="tabslist"
				@click="clickTabs"
				lineColor="#04c354"
				:current="tabNowCurrent"
				:activeStyle="{
					color: '#04c354',
					fontSize: '32rpx',
					fontWeight: 'bold',
					transform: 'scale(1.05)'
				}"
			></u-tabs>
		</view>
		<view class="content_sort">
			<view class="sort_list" v-for="(item, index) in tabRadios" :key="index">
				<u-tag
					:text="item.name"
					:plain="!item.checked"
					:name="index"
					size="mini"
					@click="radioClick"
					shape="circle"
					:bgColor="item.checked ? '#04c354' : '#ffffff'"
					:borderColor="item.checked ? '#04c354' : '#ffffff'"
					:color="item.checked ? '#fff' : '#000'"
				></u-tag>
			</view>
		</view>
	</view>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
export default {
	name: 'tab-list',
	computed: {
		...mapState('login', ['tabRadios', 'tabNowCurrent'])
	},
	data() {
		return {
			tabslist: [
				{ name: '乡村推荐' },
			]
		};
	},
	methods: {
		...mapMutations('login', ['setTabRadios', 'setTabNowCurrent']),
		// tab 点击事件
		clickTabs(e) {
			uni.$emit('clickTabs', e);
			this.setTabNowCurrent(e.index);
		},
		// 筛选条件 点击事件
		radioClick(e) {
			if (this.tabRadios[e].checked) return;
			uni.$emit('radioClick', {
				radiosList: this.tabRadios,
				name: e
			});
		},
		// 筛选样式改变
		radiosStatuChange(name) {
			this.setTabRadios(name);
		}
	},
	mounted() {
		uni.$on('radiosStatuChange', name => {
			this.radiosStatuChange(name);
		});
	},
	unmounted() {
		console.log('卸载');
		uni.$off('upData');
		uni.$off('radiosStatuChange');
	}
};
</script>

<style scoped lang="scss">
.content_tabs {
	margin: 10rpx 20rpx;
}
.content_sort {
	margin: 20rpx 40rpx -10rpx 40rpx;
	padding-bottom: 10px;
	display: flex;
	.sort_list {
		margin-right: 20rpx;
	}
}
</style>
