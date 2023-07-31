<template>
	<view class="product-list">
		<u-navbar @leftClick="leftClick()" title="商品列表" :autoBack="true" :placeholder="true" bgColor="#ffffff00"
			leftIconColor="black" :titleStyle="{ color: 'black' }"></u-navbar>
		<view class="search-box">
			<i class="iconfont icon-search"></i>
			<input type="text" placeholder="搜索商品" v-model="searchText">
		</view>
		<view class="nav">
			<view v-for="(item,index) in navArr" :key="index" @click="changeN(index)"
				:class="['nav-item',{active:n==(index+1)}]">
				<text>{{item}}</text>
				<Triangle v-if="index==2||index==3" class="triangle" :isActive="n==index+1" :order="order" />
			</view>
			<img :src="viewSrc" alt="" srcset="" class="img-view" @click="changeView">
		</view>
		<ul class="product-items" v-if="isGrid">
			<li :class="'item-'+index" v-for="product,index in filteredProducts" :key="product.id"
				@click="toDetail(product)">
				<view class="product-img">
					<img :src="product.show?product.image:''" alt="Product image">
				</view>
				<view class="product-info">
					<h2>{{ product.name }}</h2>
					<p class="product-desc">{{ product.description }}</p>
					<p class="product-price">¥ {{ product.price }}</p>
					<view class="circle" @click="addToCart(product)">
						<img class="icon_car" src="@/static/shop/car_1.svg" alt="">
					</view>
				</view>
			</li>
		</ul>
		<ul class="product-list-items" v-if="!isGrid">
			<li :class="'item-'+index" v-for="product in filteredProducts" :key="product.id" @click="toDetail(product)">
				<view>
					<img class="product-list-img" :src="product.show?product.image:''" alt="Product image">
				</view>
				<view class="product-list-info">
					<h2>{{ product.name }}</h2>
					<p class="product-list-desc">{{ product.description }}</p>
					<p class="product-list-price">¥ {{ product.price }}</p>
					<view class="list-circle" @click="addToCart(product)">
						<img class="icon_car" src="@/static/shop/car_1.svg" alt="">
					</view>
				</view>
			</li>
		</ul>
	</view>
</template>

<script>
	import Triangle from '@/components/shop/Triangle.vue'
	import gridSrc from '@/static/shop/gridView.svg'
	import listSrc from '@/static/shop/listView.svg'

	export default {
		components: {
			Triangle
		},

		data() {
			return {
				n: 1,
				searchText: '',
				products: [],
				navArr: ['综合', '最新', '价格', '销量'],
				order: -1,
				/*0：升序   1：降序 */
				viewSrc: gridSrc,
				isGrid: true,
				/* json渲染idx */
				idx: 0,
			}
		},
		watch: {
			order(newVal, oldVal) {
				/* 为什么升降序反过来了，还没搞懂 */
				if (newVal === 0) {
					console.log('升序');
					this.products.sort((a, b) => b.price - a.price);
				} else if (newVal === 1) {
					console.log('降序')
					this.products.sort((a, b) => a.price - b.price);
				}
			}
		},
		computed: {
			filteredProducts() {
				return this.products.filter(product => {
					return product.name.toLowerCase().includes(this.searchText.toLowerCase())
				})
			}
		},
		onLoad(options) {
			this.idx = options.index;
			if (this.idx == 0) {
				const data = require('@/static/shop/data/beef.json')
				this.products = data;
			} else if (this.idx == 1) {
				const data = require('@/static/shop/data/bacon.json')
				this.products = data;
			} else if (this.idx == 2) {
				const data = require('@/static/shop/data/dry.json')
				this.products = data;
			} else if (this.idx == 3) {
				const data = require('@/static/shop/data/edibleFungi.json')
				this.products = data;
			} else if (this.idx == 4) {
				const data = require('@/static/shop/data/fast.json')
				this.products = data;
			} else if (this.idx == 5) {
				const data = require('@/static/shop/data/bean.json')
				this.products = data;
			} else if (this.idx == 6) {
				const data = require('@/static/shop/data/grain.json')
				this.products = data;
			} else if (this.idx == 7) {
				const data = require('@/static/shop/data/condiment.json')
				this.products = data;
			};
		},
		mounted() {
			this.lazyImg(this.products);
		},
		methods: {
			leftClick() {
				uni.navigateBack({
					delta: 1
				});
			},
			lazyImg(proList) {
				for (let i = 0; i < proList.length; i++) {
					this.createIntersectionObserver().relativeToViewport({
						bottom: 20
					}).observe('.item-' + i, (res) => {
						proList[i].show = true
					})
				}
			},
			addToCart(product) {
				// 加入购物车的逻辑
			},
			searchProducts() {
				// 搜索商品的逻辑
			},
			toDetail(pro) {
				uni.navigateTo({
					url: '/pages/shop/detail?item=' + JSON.stringify(pro)
				});
			},
			changeN(index) {
				/* 点击价格时，升序降序排列切换 */
				if ((this.n != 3 && (index + 1) === 3) || (this.n != 4 && (index + 1) === 4)) {
					/* 从其他选项切换到价格、销量*/
					this.order = 0;
				} else if ((this.n === 3 && (index + 1) === 3) || (this.n === 4 && (index + 1) === 4)) {
					/* 从价格切换到价格/  销量到销量*/
					if (!this.order) this.order = 1;
					else this.order = 0;
				}
				this.n = index + 1;
			},
			changeView() {
				if (this.viewSrc === gridSrc) {
					this.viewSrc = listSrc;
					this.isGrid = false;
				} else if (this.viewSrc === listSrc) {
					this.viewSrc = gridSrc;
					this.isGrid = true;
				}
			}
		}
	}
</script>

<style scoped>
	.product-list {
		padding: 10px;
	}

	.product-list h1 {
		margin-top: 20px;
		margin-bottom: 10px;
		font-size: 16px;
		font-weight: bold;
	}

	.search-box {
		display: flex;
		height: 80rpx;
		justify-content: center;
		align-items: center;
		background-color: #f2f2f2;
		border-radius: 50px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	.search-box i {
		font-size: 18px;
		margin-right: 5px;
		color: #999;
	}

	.search-box input {
		flex: 1;
		border: none;
		background-color: transparent;
		font-size: 30rpx;
		text-align: center;
	}

	.search-box .btn-search:hover {
		background-color: #cc2233;
	}

	.product-items {
		display: flex;
		flex-wrap: wrap;
		margin-left: -5px;
		margin-right: -5px;
	}

	.product-items li {
		position: relative;
		margin: 5px;
		width: calc(50% - 10px);
		border-radius: 5px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		background-color: #fff;
		transition: box-shadow 0.2s ease-in-out;
	}

	.product-items li:hover {
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
	}

	.product-items li .product-img {
		height: 0;
		padding-bottom: 75%;
		position: relative;
		overflow: hidden;
		border-radius: 5px 5px 0 0;
	}

	.product-items li .product-img img {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.product-items li .product-info {
		padding: 10px;
	}

	.product-list-info {
		margin-right: 20rpx;
	}

	.product-desc {
		margin-bottom: 56rpx;
	}

	.product-price {
		position: absolute;
		left: 20rpx;
		bottom: 20rpx;
		color: red;
		font-size: 40rpx;
		font-weight: 600;
	}

	.circle,
	.list-circle {
		position: absolute;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 42rpx;
		height: 42rpx;
		border-radius: 50%;
		border: 1px solid red;
		margin-top: 5rpx;
	}

	.circle {
		right: 20rpx;
		bottom: 20rpx;
	}

	.list-circle {
		right: 80rpx;
		bottom: 30rpx;
	}

	.icon_car {
		width: 36rpx;
		height: 36rpx;
	}

	.nav {
		display: flex;
		width: 100%;
		justify-content: space-around;
		font-size: 26rpx;
		margin: 20rpx 0;
	}

	.active {
		color: red;
	}

	.img-view {
		width: 32rpx;
		height: 32rpx;
	}

	.product-list-items li {
		position: relative;
		display: flex;
		width: 750rpx;
		margin-bottom: 14rpx;
	}

	.product-list-items li .product-list-img {
		width: 200rpx;
		height: 200rpx;
		margin-right: 20rpx;
	}

	.product-list-price {
		color: red;
		font-size: 40rpx;
		font-weight: 600;
		margin-top: 50rpx;
	}

	.nav-item {
		position: relative;
	}

	.triangle {
		position: absolute;
		top: 4rpx;
		left: 56rpx;
	}
</style>