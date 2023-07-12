<template>
	<view>
		<u-navbar @leftClick="leftClick()" title="选择地址" :autoBack="true" :placeholder="true" bgColor="#ffffff00"
			leftIconColor="black" :titleStyle="{ color: 'black' }"></u-navbar>
		<view v-if="addrs.length<=0" class="addr-list">
			暂无有效地址信息
		</view>
		<view v-else class="list">
			<view class="addr-item" v-for="item,index in addrs" :key="index" @click="leftClick()">
				<view class="text">收货人：{{item.name}}</view>
				<view class="text">联系方式：{{item.phone}}</view>
				<view class="text">{{funcAddr}}：{{item.addr}}{{item.detail}}</view>
				<label class="radio grey">
					<radio value="r1" :color="themeColor" :checked="item.default" @click.stop="setDefault(index)"/>设为默认地址
				</label>
				<text class="grey edit" @click.stop="edit(item,index)">
					编辑
				</text>
				<text class="grey delete" @click="removeAddr(index)">
					删除
				</text>
			</view>
		</view>
		<view class="addr-footer">
			<button class="add-btn" @click="addAddr" :style="{'backgroundColor': themeColor}">{{addAddrVal}}</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				addrs: [],
				themeColor: 'transparent',
				funcAddr: '收货地址',
				addAddrVal: '新建收货地址'
			}
		},
		onShow() {
			this.addrs = this.$store.state.shop.addrs;
		},
		onLoad(options) {
			/* options.index 为1：购物添加地址    为2：乡村经理人添加地址 */
			if (options.index == 1) {
				this.themeColor = 'red';
			} else if (options.index == 2) {
				uni.showLoading({
					title: '加载中'
				});
				this.themeColor = 'rgb(19, 193, 104)'
				this.funcAddr = '代理地址'
				this.addAddrVal = '新建地址';
				uni.hideLoading();
			}
		},
		methods: {
			leftClick() {
				uni.navigateBack({
					delta: 1
				});
			},
			addAddr() {
				uni.navigateTo({
					url: '/pages/shop/address'
				})
			},
			removeAddr(index) {
				this.$store.dispatch('shop/deleteAddr', index);
			},
			edit(item, index) {
				uni.navigateTo({
					url: '/pages/shop/address?index=2&obj=' + JSON.stringify(item) + '&idx=' + index
				})
			},
			setDefault(index) {
				this.$store.dispatch('shop/setDefaultAddr', index);
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

	.addr-list {
		width: 100%;
		height: 500rpx;
		background-color: #fff;
		display: flex;
		justify-content: center;
		align-items: center;
		color: rgb(200, 200, 200);
	}

	.addr-footer {
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 140rpx;
		background-color: #fff;
		box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
	}

	.add-btn {
		width: 680rpx;
		height: 90rpx;
		color: #fff;
		text-align: center;
		border-radius: 40rpx;
		margin-top: 25rpx;
	}

	.list {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.addr-item {
		position: relative;
		width: 700rpx;
		height: 260rpx;
		line-height: 50rpx;
		background-color: #fff;
		border-radius: 14rpx;
		padding: 14rpx 0 0 14rpx;
		margin-top: 20rpx;
	}

	.addr-item .text {
		margin-bottom: 10rpx;
	}

	.radio {
		display: inline-block;
		margin-top: 20rpx;
	}

	.grey {
		color: grey;
		font-size: 26rpx;
	}

	.edit {
		margin-left: 320rpx;
	}

	.delete {
		margin-left: 30rpx;
	}
</style>