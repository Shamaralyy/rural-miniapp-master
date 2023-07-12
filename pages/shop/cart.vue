<template>
	<view>
		<u-navbar @leftClick="leftClick()" title="购物车" :autoBack="true" :placeholder="true" bgColor="#ffffff00"
			leftIconColor="black" :titleStyle="{ color: 'black' }"></u-navbar>
		<view class="cart-box">
			<view class="edit" @click="edit">{{isEdit?'编辑':'完成'}}</view>
			<CarList v-for="(item,index) in carList" :key="index" :carList="item" :shopIdx="index"/>
		</view>
		<CartFooter :isEdit="isEdit"/>
	</view>
</template>
<script>
	import {
		mapState
	} from 'vuex'
	import CarList from '@/components/shop/CarList.vue'
	import CartFooter from '@/components/shop/CartFooter.vue'

	export default {
		components: {
			CarList,
			CartFooter
		},
		data() {
			return {
				isEdit: true,  //文字为编辑时，为true
			}
		},
		computed: {
			...mapState('shop', ['carList'])
		},
		methods: {
			leftClick() {
				uni.navigateBack({
					delta: 1
				});
			},
			edit() {
				this.isEdit = !this.isEdit;
			}
		}
	}
</script>

<style lang="scss">
	.cart-box {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 320rpx;
		padding-bottom: 130rpx;
	}

	.card {
		position: relative;
		width: 670rpx;
		background-color: #fff;
		border-radius: 10rpx;
		padding: 15rpx;
		padding-left: 20rpx;
		line-height: 50rpx;
		margin-top: 20rpx;
	}

	.edit {
		width: 670rpx;
		text-align: right;
		color: gray;
		font-size: 26rpx;
	}
</style>