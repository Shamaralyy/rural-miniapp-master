<template>
	<!-- 因为swiper特性的关系，请指定swiper的高度 ，swiper的高度并不会被内容撑开-->
	<swiper class="swiper" :indicator-dots="false">
		<swiper-item>
			<!--  -->
			<uni-grid :column="4" :highlight="true" @change="change" :showBorder="false">
				<uni-grid-item v-for="(item, index) in list" :index="index" :key="indexF" style="height: 150rpx;">
					<view class="grid-item-box">
						<image :src="item.url" class="image" mode="aspectFill" />
						<text class="text">{{ item.text }}</text>
					</view>
				</uni-grid-item>
			</uni-grid>
		</swiper-item>
	</swiper>
</template>
<script>
	export default {
		components: {},
		data() {
			return {
				list: [{
						url: "https://mp-6ee8886e-bdb9-43fa-a027-9714a1deafe6.cdn.bspapp.com/beef/WPS图片(1).jpg",
						text: '耗牛肉制品',
						badge: '0',
						type: "primary"
					},
					{
						url: "https://mp-6ee8886e-bdb9-43fa-a027-9714a1deafe6.cdn.bspapp.com/bacon/WPS图片(1).jpg",
						text: '腊味肉制品',
						badge: '1',
						type: "success"
					},
					{
						url: "https://mp-6ee8886e-bdb9-43fa-a027-9714a1deafe6.cdn.bspapp.com/dry/WPS图片(1).jpg",
						text: '干货类',
						badge: '99',
						type: "warning"
					},
					{
						url: "https://mp-6ee8886e-bdb9-43fa-a027-9714a1deafe6.cdn.bspapp.com/edibleFungi/WPS图片(1).jpg",
						text: '食用菌类',
						badge: '2',
						type: "error"
					},
					{
						url: "https://mp-6ee8886e-bdb9-43fa-a027-9714a1deafe6.cdn.bspapp.com/fast/WPS图片(1).jpg",
						text: '方便速食'
					},
					{
						url: "https://mp-6ee8886e-bdb9-43fa-a027-9714a1deafe6.cdn.bspapp.com/bean/WPS图片(1).jpg",
						text: '豆制品'
					},
					{
						url: "https://mp-6ee8886e-bdb9-43fa-a027-9714a1deafe6.cdn.bspapp.com/grain/WPS图片(1).jpg",
						text: '谷物杂粮类'
					},
					{
						url: "https://mp-6ee8886e-bdb9-43fa-a027-9714a1deafe6.cdn.bspapp.com/condiment/WPS图片(1).jpg",
						text: '调味制品'
					},
				]
			}
		},
		methods: {
			change(e) {
				let {
					index
				} = e.detail
				this.list[index].badge && this.list[index].badge++
				uni.navigateTo({
					url: '/pages/shop/goodsList?index=' + index
				})
			}
		}
	}
</script>
<style lang="scss">
	.image {
		width: 25px;
		height: 25px;
	}

	.text {
		font-size: 14px;
		margin-top: 5px;
	}

	.grid-item-box {
		flex: 1;
		max-height: 120rpx;
		// position: relative;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 15px 0;
	}

	.swiper {
		height: 360rpx;
	}
</style>