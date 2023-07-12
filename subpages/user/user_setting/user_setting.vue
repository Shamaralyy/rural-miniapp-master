<template>
	<view class="">
		<u-gap height="10" bgColor="#ededed"></u-gap>
		<view class="content_info" :class="[bigSizeFontClass('bigSize_content_info')]">
			<view class="info_list" v-for="(item, index) in info_list1" :key="index" @click="listTap(item.type)">
				<view class="title">
					<text>{{ item.title }}</text>
				</view>
				<view class="value" v-if="item.type == 'bigFont'">
					<u-switch v-model="fonstMode" @change="changeFonstSize" activeColor="#3fc700"></u-switch>
					<!-- <text>{{ item.value }}</text> -->
					<!-- <u-icon name="arrow-right" color="#0b0202" size="16"></u-icon> -->
				</view>
				<view class="value" v-else>
					<text>{{ item.value }}</text>
					<u-icon name="arrow-right" color="#0b0202" size="16"></u-icon>
				</view>
			</view>
		</view>
		<u-gap height="10" bgColor="#ededed"></u-gap>
		<view class="content_info">
			<view
				class="info_center"
				v-for="(item, index) in info_list2"
				:key="index"
				v-if="item.show"
				@click="clicklist2(item.type)"
			>
				<view class="title">
					<text>{{ item.title }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			cardId: null,
			fonstMode: this.$store.state.login.isBigFonst,
			info_list1: [
				{
					title: '名片大字模式',
					value: '已关闭',
					type: 'bigFont'
				},
				{
					title: '当前版本',
					value: '内测版v1.8.27.1',
					type: 'version'
				},
				{
					title: '清空缓存',
					value: '',
					type: 'clear'
				},
				/* {
					title: '用户协议',
					value: '',
					type: 'userAgreement'
				} */
				{
					title: '授权设置',
					value: '',
					type: 'authorization'
				}
			],
			info_list2: [
				{
					title: '退出登录',
					show: false,
					type: 'exit'
				},
				{
					title: '登录',
					show: false,
					type: 'login'
				}
			],
			userInfo: getApp().globalData.userInfo,
			exit: false,
			keyList: []
		};
	},
	onShow() {
		uni.getStorageInfo({
			success: res => {
				console.log(res);
				this.keyList = res.keys;
			}
		});
		if (this.userInfo) {
			this.info_list2[0].show = true;
		} else {
			this.info_list2[1].show = true;
		}
	},
	onLoad: function(option) {
		// console.log('页面启动参数', option);
		// 获取导航栏高度
		this.cardId = option.cardId ? option.cardId : option.cardid;
	},
	methods: {
		/* 大字模式切换 */
		changeFonstSize(e) {
			this.$store.commit('login/setFontmod', e);
			uni.setStorageSync(getApp().globalData.storageKey.fonstMode, e);
		},

		/* 第一列数据点击事件 */
		listTap(type) {
			// console.log('点击事件', type);
			if (type == 'clear') {
				this.clear();
			}
			else if (type == 'authorization') {
				uni.openSetting({
				  success(res) {
				    console.log(res.authSetting)
				  }
				});
			}
		},
		clicklist2(type) {
			uni.clearStorageSync();
			getApp().globalData.token = null;
			getApp().globalData.userInfo = null;

			if (this.cardId == null || this.cardId == undefined) {
				this.$store.commit('build/setCurrentRural_all', null);
			}

			if (type == 'login') {
				uni.redirectTo({
					url: '/subpages/login/login?cardId=' + this.cardId
				});
			}
			if (type == 'exit') {
				uni.redirectTo({
					url: '/subpages/login/login?cardId=' + this.cardId
				});
			}
		},
		/* 清除缓存 */
		clear() {
			getApp().globalData.userInfo = null;
			this.$store.commit('build/setCurrentRural_all', null);

			//空值不清了
			if (this.keyList.length == 0) {
				uni.showToast({ icon: 'none', title: '缓存清除成功' });
				return;
			}

			this.keyList.map(keyValue => {
				// 出特定数据外全部清除
				if (
					keyValue != getApp().globalData.storageKey.userInfo &&
					keyValue != getApp().globalData.storageKey.token
				) {
					try {
						uni.removeStorageSync(keyValue);
					} catch (e) {
						console.warn('清除 <' + keyValue + '> 异常');
					}
				}
			});
			this.keyList = [];
			uni.showToast({ icon: 'none', title: '缓存清除成功' });
		}
	}
};
</script>

<style lang="scss">
page {
	background: #f1f1f1;
}

.content_info {
	padding: 0 40rpx;
	background-color: #fff;
	.info_list {
		display: flex;
		justify-content: space-between;
		padding: 30rpx 0rpx;
		border-bottom: 1rpx #f3f3f3 solid;
		.title {
			font-size: 32rpx;
		}
		.value {
			display: flex;
			color: #595959;
			width: 60%;
			justify-content: flex-end;
			font-size: 30rpx;
			text-align: right;
		}
	}
	.info_center {
		display: flex;
		justify-content: center;
		padding: 30rpx 0rpx;
		border-bottom: 1rpx #f3f3f3 solid;
		.title {
			font-size: 32rpx;
		}
		.value {
			display: flex;
			color: #595959;
			width: 60%;
			justify-content: flex-end;
			font-size: 30rpx;
			text-align: right;
		}
	}
}
.bigSize_content_info {
	.info_list {
		.title {
			font-size: 38rpx !important;
		}
		.value {
			font-size: 36rpx !important;
		}
	}
	.info_center {
		.title {
			font-size: 38rpx !important;
		}
		.value {
			font-size: 36rpx !important;
		}
	}
}
</style>
