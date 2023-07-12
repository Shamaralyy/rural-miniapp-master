<template>
	<view>
		<u-popup customStyle="width:80%;" :show="popShow" @close="popShow = false" :round="10" mode="center">
			<view class="weatherforecast">
				<view class="title" style="display: flex;">
					<view>当地最近七日天气</view>
					<u-icon @click="popShow = false" name="close" color="#fdfffb" size="22"></u-icon>
				</view>
				<view class="ul">
					<view class="li" v-for="(item, index) in weatherforecast" :key="index">
						<view class="tiem">
							<text>{{ item.fxDate }}</text>
						</view>
						<view class="imges">
							<i :class="'qi-' + item.iconDay"></i>
							<!-- {{ item.textDay }} -->
						</view>
						<view class="imges">
							<i :class="'qi-' + item.iconNight"></i>
							<!-- {{ item.textNight }} -->
						</view>
						<view class="temperature">{{ item.tempMin }}°C~{{ item.tempMax }}°C</view>
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
import { get7Day } from '@/utils/defaultData.js';
import { mapState, mapMutations } from 'vuex';
export default {
	name: 'weatherPopup',
	computed: {
		...mapState('login', ['globalWeather']),
		...mapState('build', ['currentRural'])
	},
	data() {
		return {
			popShow: false,
			weatherforecast: []
		};
	},
	methods: {
		...mapMutations('login', ['setWeatherID', 'setWeatherData']),
		async elss(cardId) {
			console.log('全局天气数据', this.globalWeather);
			if (this.globalWeather.cardId != cardId) {
				console.log('x id 数据不匹配  更新天气数据');
				try {
					const res = await this.getWeather7d();
					this.setWeatherData(res);
					this.setWeatherID(cardId);
					this.weatherforecast = res;
				} catch (e) {
					uni.showToast({ icon: 'error', title: '天气异常' });
				}
			} else {
				console.log('√ id 数据匹配  使用缓存天气数据');
				this.weatherforecast = this.globalWeather.weatherData;
			}
			this.popShow = true;
		},
		//获取最近七天天气
		getWeather7d() {
			return new Promise((resolve, reject) => {
				uni.request({
					url:
						'https://api.qweather.com/v7/weather/7d?key=4d3a9ddcae29427b9907f1cc0984dd2c&location=' +
						this.currentRural.longitude +
						',' +
						this.currentRural.latitude,
					method: 'GET',
					success: res => {
						console.log('拿7天的天气数据:', res.data.daily);
						let temp = res.data.daily;
						if (temp.length > 0 || temp != undefined) {
							temp.forEach(val => {
								val.fxDate = val.fxDate.substr(-5, 5);
							});
							resolve(temp);
						} else {
							console.log('7天接口数据异常', res);
							reject();
						}
					}
				});
			});
		}
	},
	mounted() {
		// 配置默认数据数据;
		let temp = get7Day();
		temp.forEach(val => {
			val.fxDate = val.fxDate.substr(-5, 5);
		});
		this.weatherforecast = temp;
		uni.$on('open7Day', cardId => {
			this.elss(cardId);
		});
	},
	unmounted() {
		uni.$off('open7Day');
	}
};
</script>

<style scoped lang="scss">
.weatherforecast {
	position: relative;
	.title {
		display: flex;
		background: #00B050;
		color: #fff;
		justify-content: space-between;
		padding: 16rpx 30rpx;
		border-radius: 20rpx 20rpx 0 0;
		font-size: 32rpx;
	}
	.ul {
		opacity: 1;
		.li {
			display: flex;
			justify-content: center;
			width: 100%;
			.tiem {
				width: 25%;
				text-align: center;
				font-size: 30rpx;
				color: #333;
				background: #00B05047;
				padding: 20rpx 0;
				border-bottom: 1rpx solid #eaeaea;
				text {
					display: block;
					font-size: 25rpx;
					margin-top: 6rpx;
					color: #6d6d6d;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
			}
			.imges {
				width: 20%;
				text-align: center;
				align-items: center;
				display: flex;
				justify-content: center;
				border-bottom: 1rpx solid #dadada;
				img {
					width: 62%;
					height: 60%;
				}
			}
			.temperature {
				width: 35%;
				/* text-align: center; */
				font-size: 28rpx;
				padding: 18rpx 0;
				border-bottom: 1rpx solid #dadada;
				text {
					display: block;
					color: #6d6d6d;
					font-size: 26rpx;
					margin-bottom: 10rpx;
				}
			}
		}
		.li:last-child {
			.temperature,
			.imges,
			.tiem {
				border-bottom: none;
			}
			.tiem {
				border-radius: 0 0 0 20rpx;
			}
		}
	}
	/deep/ .u-icon__icon {
		position: absolute;
		right: 32rpx;
		top: 20rpx !important;
	}
}
.u-safe-bottom{
	display: none!important;
}
</style>
