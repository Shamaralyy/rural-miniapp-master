<template>
	<view>
		<uni-popup ref="popup" background-color="rgba(0,0,0,0)" @change="change">
			<view class="radius">
				<view class="goods-msg">
					<img class="display-img" src="https://web-assets.dcloud.net.cn/unidoc/zh/shuijiao.jpg" alt=""
						srcset="">
					<view class="msg">
						<view class="price">
							￥38
						</view>
						<view class="mount">
							库存：500
						</view>
					</view>
				</view>
				<view class="type">
					干货类
				</view>
				<Picker @getPickIdx="getPickIdx"></Picker>
				<view class="number">
					<text class="text">数量</text>
					<uni-number-box @change="changeValue" />
				</view>
				<Purchase :num="num" :pickIdx="pickIdx" />
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import Picker from '@/components/shop/Picker.vue'
	import Purchase from '@/components/shop/Purchase.vue'
	import {
		mapGetters
	} from 'vuex'

	export default {
		components: {
			Picker,
			Purchase
		},
		data() {
			return {
				num: this.cartNum,
				pickIdx: -1, // 选择规格的索引
			}
		},
		computed: {
			...mapGetters('shop', ['cartNum']),
		},
		methods: {
			change(e) {
				console.log('当前模式：' + e.type + ',状态：' + e.show);
			},
			openPopup() {
				this.$refs.popup.open('bottom')
			},
			changeValue(value) {
				console.log('返回数值：', value);
				this.num = value;
			},
			getPickIdx(msg) {
				console.log(msg.detail.__args__[0]);
				this.pickIdx = msg.detail.__args__[0];
			}
		}
	}
</script>

<style lang="scss">
	@mixin flex {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
	}

	@mixin height {
		/* #ifndef APP-NVUE */
		height: 100%;
		/* #endif */
		/* #ifdef APP-NVUE */
		flex: 1;
		/* #endif */
	}

	.popup-content {
		@include flex;
		align-items: center;
		justify-content: center;
		padding: 15px;
		height: 50px;
		background-color: #fff;
	}

	.popup-height {
		@include height;
		width: 200px;
	}

	.radius {
		height: 500rpx;
		border-radius: 30rpx 30rpx 0 0;
		background-color: #fff;
		padding: 15rpx;
	}

	.goods-msg {
		display: flex;
		border-bottom: 1px solid rgba(0, 0, 0, 0.2);
		padding-bottom: 15rpx;
	}

	.text {
		font-size: 12px;
		color: #333;
	}

	.display-img {
		width: 150rpx;
		height: 150rpx;
		border-radius: 30rpx;
	}

	.msg {
		margin: 44rpx 0 0 12rpx;
	}

	.price {
		font-weight: 600;
		color: red;
	}

	.mount {
		color: gray;
		font-size: 24rpx;
		margin-left: 12rpx;
	}

	.type {
		color: rgba(0, 0, 0, 0.7);
		font-size: 25rpx;
		margin: 30rpx 0 26rpx 0;
	}

	.number {
		width: 98%;
		height: 80rpx;
		border-bottom: 1px solid rgba(0, 0, 0, 0.2);
		display: flex;
		justify-content: space-between;
		margin-top: 40rpx;
	}

	.number .text {
		font-size: 27rpx;
		margin-top: 15rpx;
	}
</style>