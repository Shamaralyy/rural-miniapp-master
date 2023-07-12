<template>
	<view class="content">
		<uni-swiper-dot class="uni-swiper-dot-box" @clickItem="clickItem" :info="info" :current="current" :mode="mode"
			:dots-styles="dotsStyles" field="content">
			<swiper class="swiper-box" @change="change" :current="swiperDotIndex">
				<swiper-item v-for="(item, index) in info" :key="index">
					<view class="swiper-item" :class="'swiper-item' + index">
						<img class="swiper-item-img" :src="item.url" alt="" srcset="">
					</view>
				</swiper-item>
			</swiper>
		</uni-swiper-dot>
	</view>
</template>
<script>
	export default {
		components: {},
		data() {
			return {
				info: [{
						colorClass: 'uni-bg-red',
						url: "https://mp-6ee8886e-bdb9-43fa-a027-9714a1deafe6.cdn.bspapp.com/dry/WPS图片(6).jpg",
						content: '内容 A'
					},
					{
						colorClass: 'uni-bg-green',
						url: "https://mp-6ee8886e-bdb9-43fa-a027-9714a1deafe6.cdn.bspapp.com/dry/WPS图片(5).jpg",
						content: '内容 B'
					},
					{
						colorClass: 'uni-bg-blue',
						url: "https://mp-6ee8886e-bdb9-43fa-a027-9714a1deafe6.cdn.bspapp.com/beef/WPS图片(3).jpg",
						content: '内容 C'
					}
				],
				current: 0,
				mode: 'default',
				dotsStyles: {
					backgroundColor: 'rgba(0, 0, 0, .1)',
					border: '1px rgba(0, 0, 0, .3) solid',
					color: '#fff',
					selectedBackgroundColor: 'rgba(0, 0, 0, .3)',
					selectedBorder: '1px rgba(0, 0, 0, .3) solid'
				},
				swiperDotIndex: 0
			}
		},
		methods: {
			change(e) {
				this.current = e.detail.current
			},
			clickItem(e) {
				this.swiperDotIndex = e
			},
			onBanner(index) {
				console.log(22222, index);
			}
		}
	}
</script>
<style lang="scss">
	.swiper-box {
		height: 200px;
	}

	.swiper-item {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 200px;
		color: #fff;
	}

	.swiper-item-img {
		width: 750rpx;
		height: 200px;
	}

	/* #ifndef APP-NVUE */
	::v-deep .image img {
		-webkit-user-drag: none;
		-khtml-user-drag: none;
		-moz-user-drag: none;
		-o-user-drag: none;
		user-drag: none;
	}

	/* #endif */

	@media screen and (min-width: 500px) {
		.uni-swiper-dot-box {
			width: 400px;
			margin: 0 auto;
			margin-top: 8px;
		}

		.image {
			width: 100%;
		}
	}

	.uni-bg-red {
		background-color: #ff5a5f;
	}

	.uni-bg-green {
		background-color: #09bb07;
	}

	.uni-bg-blue {
		background-color: #007aff;
	}

	.example-body {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		padding: 20rpx;
	}

	.example-body-item {

		flex-direction: row;
		justify-content: center;
		align-items: center;
		margin: 15rpx;
		padding: 15rpx;
		height: 60rpx;
		/* #ifndef APP-NVUE */
		display: flex;
		padding: 0 15rpx;
		/* #endif */
		flex: 1;
		border-color: #e5e5e5;
		border-style: solid;
		border-width: 1px;
		border-radius: 5px;
	}

	.example-body-item-text {
		font-size: 28rpx;
		color: #333;
	}

	.example-body-dots {
		width: 16rpx;
		height: 16rpx;
		border-radius: 50px;
		background-color: #333333;
		margin-left: 10rpx;
	}

	.active {
		border-style: solid;
		border-color: #007aff;
		border-width: 1px;
	}
</style>