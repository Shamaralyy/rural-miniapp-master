<template>
	<view class="footer">
		<u-tabbar :value="cTab" @change="changeTab()" :fixed="true" :placeholder="true"
			:safeAreaInsetBottom="true">
			<u-tabbar-item text="首页" icon="home"></u-tabbar-item>
			<u-tabbar-item text="技师" icon="photo"></u-tabbar-item>
			<u-tabbar-item text="订单" icon="play-right"></u-tabbar-item>
		</u-tabbar>
	</view>
</template>

<script>
	import homeSrc from '@/static/person/locate.svg'

	export default {
		data() {
			return {
				cTab: 0,
			}
		},
		methods: {
			changeTab(val) {
				console.log('val',val);
				this.cTab = val;
				this.$emit('getTab',this.cTab);
			}
		}
	}
</script>

<style>
</style>