<template>
	<uni-grid :column="2" :highlight="true" @change="change" :showBorder="false">
		<uni-grid-item v-for="(item, index) in products" :index="index" :key="index" @tap="toDetail(item)" style="height: 420rpx;">
			<view class="grid-item-box" style="background-color: #fff;">
				<img mode="scaleToFill" class="goods-img" :src="item.image" alt="" srcset="">
				<text class="text">{{item.name}}</text>
				<view class="purchaseBox">
					<view class="price">￥{{item.price}}</view>
					<view class="circle" @click.stop="clickCircle">
						<img class="icon_car" src="@/static/shop/car_1.svg" alt="">
					</view>
				</view>
			</view>
		</uni-grid-item>
		<Popup ref="popup"/>
	</uni-grid>
</template>

<script>
	import Popup from '@/components/shop/Popup.vue'
	const beefData = require('@/static/shop/data/beef.json')
	export default {
		components: {Popup},
		data() {
			return {
				dynamicList: [],
				products: beefData,
				list: [{
						url: '/static/c1.png',
						text: 'Grid 1',
						badge: '0',
						type: "primary"
					},
					{
						url: '/static/c2.png',
						text: 'Grid 2',
						badge: '1',
						type: "success"
					},
					{
						url: '/static/c3.png',
						text: 'Grid 3',
						badge: '99',
						type: "warning"
					},
					{
						url: '/static/c4.png',
						text: 'Grid 4',
						badge: '2',
						type: "error"
					},
					{
						url: '/static/c5.png',
						text: 'Grid 5'
					},
					{
						url: '/static/c6.png',
						text: 'Grid 6'
					},
					{
						url: '/static/c7.png',
						text: 'Grid 7'
					},
					{
						url: '/static/c8.png',
						text: 'Grid 8'
					},
					{
						url: '/static/c9.png',
						text: 'Grid 9'
					}
				]
			}
		},
		methods: {
			change(e) {
				let {
					index
				} = e.detail
				this.list[index].badge && this.list[index].badge++
				uni.showToast({
					title: `点击第${index+1}个宫格`,
					icon: 'none'
				})
				uni.showLoading({
					title: '加载中'
				});

				uni.hideLoading();
			},
			add() {
				if (this.dynamicList.length < 9) {
					this.dynamicList.push({
						url: `/static/c${this.dynamicList.length+1}.png`,
						text: `Grid ${this.dynamicList.length+1}`,
						color: this.dynamicList.length % 2 === 0 ? '#f5f5f5' : "#fff"
					})
				} else {
					uni.showToast({
						title: '最多添加9个',
						icon: 'none'
					});
				}
			},
			del() {
				this.dynamicList.splice(this.dynamicList.length - 1, 1)
			},
			clickCircle() {
				console.log('点击圆圈');
				this.$refs.popup.openPopup();
			},
			toDetail(item) {
				uni.navigateTo({
					url: '/pages/shop/detail?item=' + JSON.stringify(item)
				});
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
		display: block;
		width: 95%;
		font-size: 14px;
		margin-top: 5px;
	}

	.grid-item-box {
		flex: 1;
		border: 1px solid rgba(0, 0, 0, 0.1);
		border-left: transparent;
		// position: relative;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 15px 0;
	}

	.goods-img {
		width: 340rpx;
		height: 250rpx;
	}

	.purchaseBox {
		width: 100%;
		display: flex;

		/* justify-content: space-between; */
	}

	.price {
		width: 290rpx;
		padding-left: 15rpx;
		font-size: 40rpx;
		font-weight: 600;
		color: red;
	}

	.circle {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 42rpx;
		height: 42rpx;
		border-radius: 50%;
		border: 1px solid red;
		margin-top: 5rpx;
	}

	.icon_car {
		width: 36rpx;
		height: 36rpx;
	}
</style>