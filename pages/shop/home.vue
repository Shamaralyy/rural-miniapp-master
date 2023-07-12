<template>
	<view>
		<u-navbar title=" " :placeholder="true" :bgColor="naviStyle.bg" leftIconColor="#ffffff00"
			:titleStyle="{ color: naviStyle.colo,backdropFilter:'blur(2px) saturate(240%)'}">
			<view class="u-nav-slot_left" slot="left">
				<view class="name"><text>好礼商城</text></view>
				<view class="desc"><text>来一场别样的乡村探寻之旅</text></view>
			</view>
		</u-navbar>
		<Swiper style="margin-bottom: 104rpx;" />
		<Sort />
		<view class="search">
			<u--input
			    placeholder="搜索商品"
			    border="surround"
				:customStyle="{backGround:'#ffffff'}"
				prefixIcon="search"
			  ></u--input>
		</view>
		<view class="title">
			———— 高端精品 耗牛肉制品 ————
		</view>
		<Goods/>
	</view>
</template>

<script>
	import Swiper from '@/components/shop/Swiper.vue'
	import Sort from '@/components/shop/Sort.vue'
	import Goods from '@/components/shop/Goods.vue'

	export default {
		components: {
			Swiper,
			Sort,
			Goods
		},
		computed: {
			naviStyle() {
				return this.isTop ? {
					bg: '#00000000',
					colo: '#fff'
				} : {
					bg: '#ffffff90',
					colo: '#fff'
				};
			}
		}
	}
</script>

<style lang="scss">
	page {
		padding-bottom: 200rpx;
	}
	
	.u-nav-slot_left {
		display: flex;
		align-items: baseline;

		text {
			color: #000000;
		}

		.name {
			font-size: 38rpx;
			font-family: 'SourceHanSerifCN-Bold';
		}

		.desc {
			font-size: 28rpx;
			font-weight: 400;
			margin-left: 10rpx;
			font-family: 'SourceHanSerifCN-Medium';
		}
	}
	
	.title {
		text-align: center;
		height: 80rpx;
		line-height: 80rpx;
	}
</style>