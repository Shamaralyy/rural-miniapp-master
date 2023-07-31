<template>
	<view>
		<u-navbar @leftClick="leftClick()" title="乡村代理人" :autoBack="true" :placeholder="true" 
			leftIconColor="black" :titleStyle="{ color: 'black' }"></u-navbar>
		<view class="staff-top">
			<Region class="region" />
			<view class="search-box">
				<u-search class="search" height="23" inputAlign="center" bgColor="white"></u-search>
			</view>
		</view>
		<PersonList />
	</view>
</template>

<script>
	import Region from '@/components/person/Region.vue'
	import PersonList from '@/components/person/PersonList.vue'

	export default {
		components: {
			Region,
			PersonList,
		},
		methods: {
			leftClick() {
				uni.navigateBack({
					delta: 1
				});
			},
		}
	}
</script>

<style>
	page {
		background: #f1f1f1;
		height: 100%;
		width: 100%;
	}
	
	.staff-top {
		width: 750rpx;
		height: 80rpx;
		margin-top: 24rpx;
	}

	.search-box {
		float: right;
		width: 590rpx;
	}
</style>