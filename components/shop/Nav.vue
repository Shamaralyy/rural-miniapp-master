<template>
	<view class="goods-carts">
		<uni-goods-nav :options="options" :fill="true" :button-group="buttonGroup" @click="onClick"
			@buttonClick="buttonClick" />
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
				options: [{
					icon: 'chat',
					text: '客服'
				}, {
					icon: 'shop',
					text: '店铺',
					info: 2,
					infoBackgroundColor: '#007aff',
					infoColor: "#f5f5f5"
				}, {
					icon: 'cart',
					text: '购物车',
					info: 0
				}],
				buttonGroup: [{
						text: '加入购物车',
						backgroundColor: 'linear-gradient(90deg, #FFCD1E, #FF8A18)',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: 'linear-gradient(90deg, #FE6035, #EF1224)',
						color: '#fff'
					}
				],
				customButtonGroup: [{
						text: '加入购物车',
						backgroundColor: 'linear-gradient(90deg, #1E83FF, #0053B8)',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: 'linear-gradient(90deg, #60F3FF, #088FEB)',
						color: '#fff'
					}
				],
				customButtonGroup1: [{
					text: '立即购买',
					backgroundColor: 'linear-gradient(90deg, #FE6035, #EF1224)',
					color: '#fff'
				}]
			}
		},
		computed: {
			n() {
				return this.$store.state.shop.cartNum; /* 注意: 由于vuex为模块化开发，这里必须写,this.$store.state.shop.cartNum*/
			},
			...mapGetters('shop', ['cartNum']),
		},
		watch: {
			n() {
				this.options[2].info = this.n;
			},
			cartNum() {
				this.options[2].info = this.cartNum;
			}
		},
		mounted() {
			this.options[2].info = this.cartNum;
		},
		methods: {
			onClick(e) {
				if (e.content.text === '购物车') {
					uni.navigateTo({
						url: '/pages/shop/cart'
					})
				}else {
					uni.showToast({ icon: 'none', title: '功能暂未上线' });
				}
			},
			buttonClick(e) {
				this.$parent.choosePopup();
				console.log(this.options)
			},
			changeInfo() {
				/* 直接在前面把info写为store.state里的元素，state改变了不会更新视图，目前还不知道什么原因。所以写这个方法更新info。*/
				this.options[2].info = this.$store.state.shop.cartNum;
			}
		}
	}
</script>

<style lang="scss">
	.goods-carts {
		z-index: 2;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		position: fixed;
		left: 0;
		right: 0;
		/* #ifdef H5 */
		left: var(--window-left);
		right: var(--window-right);
		/* #endif */
		bottom: 0;
	}
</style>