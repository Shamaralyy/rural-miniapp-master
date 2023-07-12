<template>
	<view>
		<u-navbar @leftClick="leftClick()" title="新增地址" :autoBack="true" :placeholder="true" bgColor="#ffffff00"
			leftIconColor="black" :titleStyle="{ color: 'black' }"></u-navbar>
		<view class="card">
			<view class="item">
				<text class="title">
					收货人
				</text>
				<input type="text" v-model="address.name" />
			</view>
			<view class="item">
				<text class="title">
					联系电话
				</text>
				<input type="text" v-model="address.phone" />
			</view>
			<view class="item">
				<text class="title">
					所在地区
				</text>
				<input type="text" v-model="address.addr" />
			</view>
			<view class="item">
				<text class="title">
					详细地址
				</text>
				<textarea class="text-area" name="" id="" cols="30" rows="10" v-model="address.detail"></textarea>
			</view>
		</view>
		<view class="footer">
			<button class="btn" @click="save" :style="{'backgroundColor': themeColor}">保存并使用</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				address: {
					name: '',
					phone: '',
					addr: '',
					detail: ''
				},
				idx: -1, //从编辑跳转过来时，idx为选中的地址的索引
				themeColor: 'transparent'
			}
		},
		onLoad(options) {
			/* options.index 为1：购物添加地址    为2：乡村经理人添加地址 */
			if (options.index == 1) {
				this.themeColor = 'red';
			} else if (options.index == 2) {
				this.themeColor = 'rgb(19, 193, 104)';
				uni.hideLoading();
			}
			if (JSON.stringify(options) != '{}') {
				console.log('options', options)
				this.address = JSON.parse(options.obj);
				this.idx = options.idx;
			}
		},
		methods: {
			leftClick() {
				uni.navigateBack({
					delta: 1
				});
			},
			/* 判断对象，只要有一个值为空，则返回false */
			isAllKeyValuesNotNull(obj) {
				for (let [key, value] of Object.entries(obj)) {
					if (value === null || value === undefined || value === '') {
						return false;
					}
				}
				return true;
			},
			save() {
				console.log(this.address);
				if (!this.isAllKeyValuesNotNull(this.address)) {
					uni.showToast({
						title: '请填写完整信息',
						icon: 'error',
						duration: 300
					});
					return false;
				}
				if (this.idx === -1) {
					this.$store.dispatch('shop/addAddr', this.address);
					uni.showToast({
						title: '保存成功',
						duration: 300
					});
				} else {
					console.log('修改' + this.idx);
					let val = {
						idx: this.idx,
						obj: this.address
					}
					this.$store.dispatch('shop/modifyAddr', val);
					uni.showToast({
						title: '修改成功',
						duration: 300
					});
				};
				setTimeout(() => {
					uni.navigateBack(-1);
				}, 300);
			}
		}
	}
</script>

<style>
	page {
		background: #f1f1f1;
		height: 100%;
		width: 100%;
		font-size: 29rpx;
	}

	.card {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		width: 670rpx;
		background-color: #fff;
		border-radius: 10rpx;
		padding: 15rpx;
		padding-left: 20rpx;
		line-height: 50rpx;
		margin-top: 20rpx;
	}

	.item {
		padding: 22rpx 0;
	}

	.title {
		font-weight: 600;
	}

	input {
		float: right;
		width: 540rpx;
		border-bottom: 1px solid rgb(195, 195, 195);
	}

	.text-area {
		width: 662rpx;
		margin-top: 12rpx;
		border: 1px solid rgb(195, 195, 195);
		padding: 8rpx;
	}

	.footer {
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 140rpx;
		background-color: #fff;
		box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
	}

	.btn {
		width: 680rpx;
		height: 90rpx;
		color: #fff;
		text-align: center;
		border-radius: 40rpx;
		margin-top: 25rpx;
	}
</style>