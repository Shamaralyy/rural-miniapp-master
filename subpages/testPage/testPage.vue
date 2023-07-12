<template>
	<view class="">
		<ru-file-upload ref="up" :isImg="true" :isAvatar="false" />
		<button @click="updata">up</button>
		<button @click="toSH">分享</button>
		<!-- <ru-background-slide :slideImgList="imgList"></ru-background-slide> -->
	</view>
</template>

<script>
const imgBaseUrl = getApp().globalData.imgBaseUrl + '/app';
// import shareImg  from "@/subpages/card/subCard/shareImg.vue";
export default {
	data() {
		return {
			imgList: [
				imgBaseUrl + '/testImg/1.png',
				imgBaseUrl + '/testImg/2.png',
				imgBaseUrl + '/testImg/3.png',
				imgBaseUrl + '/testImg/4.png'
			]
		};
	},
	computed: {},
	methods: {
		updata() {
			this.$refs.up.upData;
		},
		toSH(){
			uni.navigateTo({
				url:'/subpages/card/subCard/shareImg'
			})
		}
	}
};
</script>

<style scoped lang="scss"></style>
