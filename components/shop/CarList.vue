<template>
	<view class="card">
		<view>
			<radio value="r2" @click="setStatus(-1)" :checked="carList.status" color="red"
				style="transform:scale(0.7)" />
			<text class="shop-name">{{carList.shopName}}</text>
			<img class="i_select" src="@/static/shop/detail_select.svg" alt="" srcset="">
		</view>
		<view class="cart-item" v-for="(item,index) in carList.list" :key="index">
			<radio value="r2" color="red" @click="setStatus(index)" :checked="item.status"
				style="transform:scale(0.7)" />
			<img class="goods-img" :src="item.image" alt="" srcset="">
			<view class="cart-item-msg">
				<view class="goods-name">
					{{item.name}}
				</view>
				<view class="goods-detail">
					{{item.detail}}
				</view>
				<view class="goods-price">
					￥{{item.price.toFixed(2)}}
				</view>
				<uni-number-box class="counter" @change="changeValue(index,$event)" />
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: ['carList', 'shopIdx'],
		data() {
			return {}
		},
		methods: {
			setStatus(index) {
				let storeCarList = this.$store.state.shop.carList;
				/* 选中店铺*/
				if (index === -1) {
					this.carList.status = !this.carList.status;
					if (this.carList.status) {
						/* 全选 */
						this.carList.list.map(item => {
							item.status = true;
						})
					} else {
						this.carList.list.map(item => {
							item.status = false;
						})
					}
				}
				/* 选中店铺下的单个项目*/
				else {
					this.$set(this.carList.list[index], 'status', !this.carList.list[index]
						.status); /* 购物车列表，status为ture时为选中 */
					if (this.carList.status) {
						/* 如果有未选中的，店铺为未选中*/
						this.carList.list.map(item => {
							if (!item.status) {
								this.carList.status = false;
								return;
							}
						})
					} else {
						/* 如果全部选中，店铺为选中*/
						let flag = true;
						this.carList.list.map(item => {
							if (!item.status) {
								flag = false;
								return;
							}
						});
						this.carList.status = flag;
					}
				}
				let obj = {
					shopIdx: this.shopIdx,
					list: this.carList
				}
				this.$store.dispatch('shop/setStatus', obj);
			},
			changeValue(currentIdx,event) {
				/* shopIdx:当前店铺在购物车里的索引
				currentIdx:当前商品在当前列表（店铺商品）里的索引 */
				let obj = {
					num: event,
					shopIdx: this.shopIdx,
					currentIdx: currentIdx
				}
				this.$store.dispatch('shop/setItemNum', obj);
			}
		}
	}
</script>

<style>
	page {
		background: #f1f1f1;
		height: 100%;
		width: 100%;
	}

	.shop-name {
		font-weight: 600;
	}

	.i_select {
		position: absolute;
		top: 20rpx;
		right: 10rpx;
		width: 40rpx;
		height: 40rpx;
	}

	.goods-img {
		width: 140rpx;
		height: 140rpx;
		border-radius: 16rpx;
	}

	.cart-item {
		position: relative;
		display: flex;
		line-height: 50rpx;
		margin-top: 30rpx;
	}

	.cart-item-msg {
		width: 70%;
		margin-left: 10rpx;
	}

	.goods-name {
		width: 100%;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.goods-detail {
		color: gray;
		font-size: 30rpx;
	}

	.goods-price {
		color: red;
		font-weight: 600;
		font-size: 40rpx;
	}

	.counter {
		position: absolute;
		right: 30rpx;
		bottom: 0;
	}
</style>