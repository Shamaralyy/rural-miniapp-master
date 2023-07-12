<template>
	<view><web-view :webview-styles="webviewStyles" :src="src"></web-view></view>
</template>

<script>
export default {
	name: '',
	props: [],
	data() {
		return {
			src: 'https://vr.xiangcunmingpian.com/tour/5976c4c21b04a837',
			webviewStyles: {
				progress: {
					color: '#FF3333'
				}
			}
		};
	},
	onLoad(option) {
		if (option.src) {
			this.src = option.src;
		} else {
			uni.showToast({ icon: 'none', title: '参数异常' });
			setTimeout(() => {
				uni.navigateBack({ delta: 1 });
			}, 3000);
		}
	}
};
</script>

<style scoped lang="scss"></style>
