<template>
	<view class="region-container">
		<img @tap="chooseRegion" class="icon i_locate" src="@/static/person/locate.svg" alt="" srcset="">
		<text @tap="chooseRegion" style="margin-left: 3rpx;">{{region}}</text>
		<RegionPopup ref="popup" @getRegion="getRegion" />
	</view>
</template>

<script>
	import RegionPopup from '@/components/person/RegionPopup.vue'

	export default {
		components: {
			RegionPopup,
		},
		data() {
			return {
				region: '重庆',
			}
		},
		methods: {
			chooseRegion() {
				this.$refs.popup.openPopup();
			},
			getRegion(val) {
				this.region = val;
			},
		}
	}
</script>

<style>
	.region-container {
		position: absolute;
	}
</style>