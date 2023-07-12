<template>
	<view class="footer">
		<radio value="r2" color="red" :checked="isAllSelected" class="radio" @click="selectAll"/>
		<text>全选</text>
		<text class="total" v-show="isEdit">总计：￥{{totalPrice}}</text>
		<button v-show="isEdit" @click="settle" :class="['settle',{'settle-active':totalPrice>0}]">去结算</button>
		<button v-show="!isEdit" @click="remove" :class="['remove',{'remove-active':totalPrice>0}]">删除</button>
	</view>
</template>

<script>
	import {
		mapGetters
	} from 'vuex'
	export default {
		props: ['isEdit'],
		data() {
			return {
				isQx: false,
			}
		},
		computed: {
			...mapGetters('shop', ['totalPrice','isAllSelected']),
		},
		mounted() {},
		methods: {
			settle() {
				console.log('getters.isAllSelected', this.isAllSelected);
				if(this.totalPrice>0) uni.showToast({ icon: 'none', title: '功能暂未上线' });
			},
			selectAll() {
				this.isQx = !this.isQx;
				this.$store.dispatch('shop/setAllSelected',this.isQx);
			},
			remove() {
				this.$store.dispatch('shop/deleteCartItem',null);
			}
		},
	}
</script>

<style scoped>
	.footer {
		position: fixed;
		display: flex;
		bottom: 0;
		width: 100%;
		height: 115rpx;
		line-height: 115rpx;
		background-color: #fff;
		border-top: 1px solid rgba(0, 0, 0, 0.1);
		z-index: 2;
	}
	
	.radio {
		margin-left: 20rpx;
		transform:scale(0.7);
	}

	.total {
		margin-left: 30rpx;
		color: red;
	}
	
	button {
		position: absolute;
		top: 20rpx;
		right: 32rpx;
		width: 250rpx;
		height: 75rpx;
		line-height: 75rpx;
		border-radius: 30rpx;
		font-size: 30rpx;
	}

	.settle {
		background-color: gray;
		color: #fff;
	}
	
	.settle-active {
		background-color: rgba(221, 44, 0, 1.0);
	}
	
	.remove {
		color: gray;
		border: 1px solid gray;
	}
	
	.remove-active {
		color: red;
		border: 1px solid red;
	}
	
</style>