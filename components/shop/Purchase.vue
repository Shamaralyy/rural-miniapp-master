<template>
	<uni-goods-nav :options="options" :fill="true" :button-group="buttonGroup" @click="onClick"
		@buttonClick="buttonClick" />
</template>

<script>
	export default {
		components: {},
		props: {
			num: Number,
			pickIdx: Number
		},
		data() {
			return {
				options: [],
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
		methods: {
			onClick(e) {
				uni.showToast({
					title: `点击${e.content.text}`,
					icon: 'none'
				})
			},
			buttonClick(e) {
				console.log(e);
				if(this.$props.pickIdx === -1) {
					uni.showToast({
						title: '请选择规格',
						icon: 'error',
						duration: 1500
					});
					return;
				}
				if(e.index === 0) {
					/* 注意：vuex为模块化调用，这里必须写shop/setCartNum，不能只写setCartNum*/
					this.$store.dispatch('shop/setCartNum',this.num);  
					this.$store.dispatch('shop/addCartItem',null);
					uni.showToast({
						title: '添加购物车成功',
						duration: 1500
					});
				}else if(e.index === 1) {
					console.log('立即购买');
					uni.navigateTo({
						url: '/pages/shop/settle'
					})
				}
			}
		}
	}
</script>


<style lang="scss">
	.goods-carts {
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