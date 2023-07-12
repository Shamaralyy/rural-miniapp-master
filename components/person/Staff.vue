<template>
	<view>
		<view class="staff-top">
			<Region class="region" />
			<view class="search-box">
				<u-search class="search" height="23" inputAlign="center" bgColor="white"></u-search>
			</view>
		</view>
		<PersonList/>
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
	}
</script>

<style>
	.staff-top {
		width: 750rpx;
		height: 80rpx;
	}

	.search-box {
		float: right;
		width: 590rpx;
	}
</style>