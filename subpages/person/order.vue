<template>
	<view>
		<u-navbar @leftClick="leftClick()" title="下单" :autoBack="true" :placeholder="true" leftIconColor="black"
			:titleStyle="{ color: 'black' }"></u-navbar>

		<view class="card flex-card">
			<text>预约时间：</text>
			<text class="choose-time" v-if="!timeFlag" @tap="toggle('center')">点击选择服务时间</text>
			<text class="choose-time" v-else @tap="toggle('center')" style="color: black;">{{date+ '  '+time}}</text>
			<uni-icons @tap="toggle('center')" type="forward" color="rgb(198, 198, 198)" size="20"></uni-icons>
		</view>

		<view v-if="!defaultAddr" class="card addAddr" @click="addAddr">
			+添加新地址
		</view>
		<view v-else class="card" @click="addAddr">
			<view class="text">收货人：{{defaultAddr.name}}</view>
			<view class="text">联系方式：{{defaultAddr.phone}}</view>
			<view class="text">收货地址：{{defaultAddr.addr}}{{defaultAddr.detail}}</view>
			<uni-icons class="i_forward" type="forward" size="20"></uni-icons>
		</view>

		<view class="card">
			<view class="grey-title-area">
				<text>预约代理人</text>
				<text>支付后不可修改</text>
			</view>
			<view class="person-order-item">
				定金： ￥100
			</view>
			<view class="person-order-item">
				优惠券： 无
			</view>
			<view class="person-order-item">
				实付金额： ￥100
			</view>
		</view>
		<button class="person-order-btn">立即下单</button>
		<!-- 普通弹窗 -->
		<uni-popup ref="popup" background-color="#fff" @change="change">
			<view class="popup-content" :class="{ 'popup-height': type === 'left' || type === 'right' }">
				<text class="time-title">预约时间选择：</text>
				<view class="time-picker-box">
					<uni-icons class="i_calendar" @tap="toggle('center')" type="calendar-filled"
						color="rgb(198, 198, 198)" size="20"></uni-icons>
					<picker class="time-picker-item" mode="date" :value="date" :start="startDate" :end="endDate"
						@change="bindDateChange">
						<view class="uni-input">{{date}}</view>
					</picker>
					<picker class="time-picker-item" mode="time" :value="time" start="09:01" end="21:01"
						@change="bindTimeChange">
						<view class="uni-input">{{time}}</view>
					</picker>
				</view>
			</view>
		</uni-popup>
	</view>

</template>

<script>
	import {
		mapGetters
	} from 'vuex'

	export default {
		components: {},
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				timeFlag: false, //查看是否设置时间 false为未设置  true为已设置
				date: currentDate,
				time: '12:01'
			}
		},
		computed: {
			...mapGetters('shop', ['defaultAddr']),
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		methods: {
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.detail.value)
				this.index = e.detail.value
			},
			bindDateChange: function(e) {
				this.date = e.detail.value
			},
			bindTimeChange: function(e) {
				this.time = e.detail.value
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			toggle(type) {
				this.type = type
				// open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
				this.$refs.popup.open(type);
				if (this.timeFlag) return;
				this.timeFlag = true;
			},
			change(e) {
				console.log('当前模式：' + e.type + ',状态：' + e.show);
			},
			addAddr() {
				uni.navigateTo({
					url: '/pages/shop/selectAddr?index=2'
				})
			},
		}
	}
</script>

<style>
	page {
		background: #f1f1f1;
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.card {
		position: relative;
		width: 700rpx;
		background-color: #fff;
		border-radius: 10rpx;
		padding: 15rpx;
		padding-left: 20rpx;
		line-height: 50rpx;
		margin-top: 20rpx;
		padding: 18rpx;
		font-size: 29rpx;
	}

	.flex-card {
		display: flex;
		justify-content: space-between;
	}

	.grey-title-area {
		display: flex;
		justify-content: space-between;
		width: 100%;
		height: 65rpx;
		line-height: 65rpx;
		background-color: rgb(248, 248, 248);
		font-size: 26rpx;
		color: rgb(147, 147, 147);
	}

	.person-order-item {
		width: 690rpx;
		border-bottom: 1px solid rgb(229, 229, 229);
		margin: 20rpx 0;
	}

	.person-order-btn {
		position: fixed;
		bottom: 0rpx;
		width: 750rpx;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		color: #fff;
		background-color: rgb(19, 193, 104);
		border: 0px;
		font-size: 31rpx;
	}

	.popup-content {
		width: 500rpx;
		padding: 15px;
	}

	.choose-time {
		font-size: 24rpx;
		color: rgb(189, 189, 189);
		margin-left: 280rpx;
	}

	.time-title {
		font-weight: 600;
	}

	.time-picker-box {
		display: flex;
		padding: 12rpx;
		border: 1px solid rgb(189, 189, 189);
		margin-top: 30rpx;
	}

	.time-picker-item {
		margin-left: 12rpx;
	}

	.addAddr {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.i_forward {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		right: 10rpx;
	}
</style>