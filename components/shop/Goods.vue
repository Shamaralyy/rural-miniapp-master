<template>
	<uni-grid :column="2" :highlight="true" @change="change" :showBorder="false">
		<uni-grid-item :class="['item-'+index]" v-for="(item, index) in products" :index="index" :key="index" @tap="toDetail(item)"
			style="height: 420rpx;">
			<view class="grid-item-box" style="background-color: #fff;">
				<img mode="scaleToFill" class="goods-img":src="item.show?item.image:''" alt="" srcset="">
				<text class="text">{{item.name}}</text>
				<view class="purchaseBox">
					<view class="price">￥{{item.price}}</view>
					<view class="circle" @click.stop="clickCircle">
						<img class="icon_car" src="@/static/shop/car_1.svg" alt="">
					</view>
				</view>
			</view>
		</uni-grid-item>
		<Popup ref="popup" />
	</uni-grid>
</template>

<script>
	import Popup from '@/components/shop/Popup.vue'
	export default {
		components: {
			Popup
		},
		data() {
			return {
				dynamicList: [],
				products: [{
						"id": "1",
						"name": "特产原味腐竹黄豆制品素食腐竹360克袋装",
						"description": "",
						"price": "28",
						"image": "https://mp-6ee8886e-bdb9-43fa-a027-9714a1deafe6.cdn.bspapp.com/bean/WPS图片(1).jpg",
						show: false
					},
					{
						"id": "2",
						"name": "特产桑甚茶叶112g*4礼盒装送家人朋友",
						"description": "",
						"price": "178",
						"image": "https://mp-6ee8886e-bdb9-43fa-a027-9714a1deafe6.cdn.bspapp.com/dry/WPS图片(8).jpg",
						show: false
					},
					{
						"id": "3",
						"name": "牦牛乳品全脂营养奶粉",
						"description": "",
						"price": "75",
						"image": "https://mp-6ee8886e-bdb9-43fa-a027-9714a1deafe6.cdn.bspapp.com/bean/WPS图片(3).jpg",
						show: false
					},
					{
						"id": "4",
						"name": "丛岭藏鸡蛋30枚一盘",
						"description": "",
						"price": "48",
						"image": "https://mp-6ee8886e-bdb9-43fa-a027-9714a1deafe6.cdn.bspapp.com/fast/WPS图片(4).jpg",
						show: false
					},
					{
						"id": "5",
						"name": "博峪家文党花蜂蜜500g*3",
						"description": "",
						"price": "460",
						"image": "https://mp-6ee8886e-bdb9-43fa-a027-9714a1deafe6.cdn.bspapp.com/fast/WPS图片(5).jpg",
						show: false
					},
					{
						"id": "6",
						"name": "年货节超值优惠大礼包",
						"description": "",
						"price": "399",
						"image": "https://mp-6ee8886e-bdb9-43fa-a027-9714a1deafe6.cdn.bspapp.com/bacon/WPS图片(3).jpg",
						show: false
					},
				],
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
		created() {
			this.lazyImg(this.products);
		},
		methods: {
			lazyImg(proList) {
				for (let i = 0; i < proList.length; i++) {
					this.createIntersectionObserver().relativeToViewport({
						bottom: 20
					}).observe('.item-' + i, (res) => {
						proList[i].show = true
					})
				}
			},
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