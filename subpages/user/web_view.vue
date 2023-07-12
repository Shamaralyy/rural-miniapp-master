<template>
	<view class="">
		<web-view :src="url"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url:'https://www.xiangcunmingpian.com/'
			}
		},
		onLoad: function(option) {
			var that = this
			this.url = option.url
		}
	}
</script>

<style>
</style>