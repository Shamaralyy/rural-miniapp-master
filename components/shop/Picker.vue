<template>
	<view>
		<text v-for="(item,index) in list" :key="index" :class="['picker',{'active':current == index}]" @click="clickTag(index)">
			{{item}}
		</text>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				list: ['250g','500g'],
				current: -1
			}
		},
		methods: {
			clickTag(idx) {
				console.log(idx);
				this.current = idx;
				this.$emit('getPickIdx',idx);
			}
		}
	}
</script>

<style>
	.picker {
		padding: 20rpx;
		background-color: rgba(0,0,0,0.1);
		margin: 0rpx 20rpx 20rpx 0;
		border-radius: 10rpx;
		font-size: 27rpx;
	}
	
	.active {
		color: red;
		border: 1px solid red;
		background-color: rgba(252,238,237);
	}
</style>