<template>
	<view>
		<view class="checkout-container">
			<u-navbar @leftClick="leftClick()" title="结算" :autoBack="true" :placeholder="true" bgColor="#ffffff00"
				leftIconColor="black" :titleStyle="{ color: 'black' }"></u-navbar>
			<view v-if="!defaultAddr" class="card addAddr" @click="addAddr">
				+请添加收货地址
			</view>
			<view v-else class="card" @click="addAddr">
				<view class="text">收货人：{{defaultAddr.name}}</view>
				<view class="text">联系方式：{{defaultAddr.phone}}</view>
				<view class="text">收货地址：{{defaultAddr.addr}}{{defaultAddr.detail}}</view>
				<uni-icons class="i_forward" type="forward" size="20"></uni-icons>
			</view>
			<view class="card">
				<view class="ls">
					<view class="shopName">
						商家名字
					</view>
					<view class="product-list-info">
						<img class="product-img"
							src="https://mp-6ee8886e-bdb9-43fa-a027-9714a1deafe6.cdn.bspapp.com/test.jpeg" alt="">
						<view class="">
							<h2 class="title">耗牛三角肉500g/1.5kg 甘南耗牛 高营养</h2>
							<p class="grey product-list-desc">生鲜：1.5kg</p>
							<p class="grey product-list-desc">X1</p>
							<p class="grey product-list-price">¥ 402.00</p>
						</view>
					</view>
				</view>
				<view class="ls ls-flex">
					<view class="">
						配送方式
					</view>
					<view class="">
						快速配送
					</view>
				</view>
				<view class="ls ls-flex">
					<view class="">
						优惠券
					</view>
					<view class="">
						暂无优惠券可用
					</view>
				</view>
				<view class="ls ls-flex">
					<view class="">
						运费
					</view>
					<view class="red">
						￥0.00
					</view>
				</view>
				<view class="ls">
					<input type="text" placeholder="买家留言" />
				</view>
				<text class="grey totalNum">共一件</text>
				<text>小计：</text>
				<text class="red">￥402.00</text>
			</view>
		</view>
		<view class="footer">
			<text class="red total">
				合计：￥
			</text>
			<text class="red price">402.00</text>
			<button class="submit" @tap="submitOrder">提交订单</button>
		</view>
	</view>
</template>

<script>
	import {
		mapGetters
	} from 'vuex'

	export default {
		components: {},
		data() {
			return {
				shoppingAddress: {
					name: '',
					address: '',
					phone: ''
				},
				product: {
					image: 'https://picsum.photos/200',
					title: '示例商品',
					description: '这是一个示例商品的描述',
					price: '￥100'
				},
				shippingMethod: 'express', // 快递 | 自取
				coupon: '',
				couponDiscount: '',
				buyerMessage: '',
			};
		},
		onShow() {
			this.defaultAddr = this.$store.state.shop.defaultAddr;
		},
		computed: {
			...mapGetters('shop', ['defaultAddr']),
			// 计算总价
			totalPrice() {
				let price = parseInt(this.product.price.slice(1));
				if (this.couponDiscount) {
					price -= parseInt(this.couponDiscount.slice(1));
				}
				if (this.shippingMethod === 'express') {
					price += 10;
				}
				return '￥' + price;
			},
		},
		methods: {
			leftClick() {
				uni.navigateBack({
					delta: 1
				});
			},
			// 新增收货地址
			addAddr() {
				uni.navigateTo({
					url: '/pages/shop/selectAddr?index=1'
				})
			},
			// 保存收货地址
			saveshoppingAddress() {
				// 这里需要自行实现，可以调用后端API保存收获地址，并更新下面的 shoppingAddress 数据
			},
			// 应用优惠券
			applyCoupon() {
				// 这里需要自行实现，可以调用后端API，对 coupon 进行验证，并更新下面的 couponDiscount 数据
				if (this.coupon === '123456') {
					this.couponDiscount = '￥30';
				} else {
					this.couponDiscount = '';
				}
			},
			// 提交订单
			submitOrder() {
				// 这里需要自行实现，可以调用后端API提交订单，并跳转到订单详情页
				// 结算
				uni.showToast({
					icon: 'none',
					title: '功能暂未上线'
				});
			}
		}
	}
</script>

<style>
	page {
		background: #f1f1f1;
		height: 100%;
		width: 100%;
		font-size: 28rpx;
	}

	.checkout-container {
		display: flex;
		flex-direction: column;
		align-items: center;
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

	.addAddr {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.ls {
		padding: 20rpx 0;
		border-bottom: 1px solid rgb(241, 241, 241);
	}

	.product-list-info {
		position: relative;
		display: flex;
		width: 750rpx;
		margin-bottom: 14rpx;
	}

	.shopName {
		margin: -20rpx 0rpx 8rpx 0rpx;
		font-weight: 600;
	}

	.product-img {
		width: 200rpx;
		height: 200rpx;
		margin-right: 20rpx;
	}

	.title {
		width: 87%;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.grey {
		color: grey;
		font-size: 26rpx;
	}

	.product-list-price {
		position: absolute;
		bottom: 30rpx;
		right: 80rpx;
		color: black;
		font-size: 30rpx;
	}

	.ls-flex {
		display: flex;
		justify-content: space-between;
	}

	.red {
		color: red;
	}

	.totalNum {
		margin: 0 18rpx 0 370rpx;
	}

	.footer {
		position: fixed;
		bottom: 0;
		width: 750rpx;
		height: 120rpx;
		line-height: 120rpx;
		padding-left: 20rpx;
		box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
		background-color: #fff;
	}

	.price {
		font-size: 45rpx;
		font-weight: 600;
	}

	.submit {
		position: absolute;
		top: 50%;
		right: 40rpx;
		transform: translateY(-50%);
		display: inline-block;
		width: 220rpx;
		height: 80rpx;
		line-height: 80rpx;
		border-radius: 40rpx;
		color: white;
		background-color: red;
		font-size: 34rpx;
	}

	.i_forward {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		right: 10rpx;
	}
</style>