<!-- 文化组件 -->
<template>
	<view class="content_food" :class="[bigSizeFontClass('bigSize_content_food')]">
		<view class="food_nav">
			<view class="title">
				<text>{{ title }}</text>
			</view>
			<view class="more"><!-- <text>查看全部</text> --></view>
		</view>
		<view class="food_list">
			<u-scroll-list :indicator="false">
				<view
					class="list"
					:class="[{ on: footon == index }]"
					v-for="(item, index) in data_list"
					:key="index"
					@click="foodlist(index, true)"
					v-if="!isPublic ? true : item.urls[0].imgUrl && index < showMax"
				>
					<view>
						<u--image
							class="img"
							:showLoading="true"
							:src="item.urls[0].imgUrl"
							width="110rpx"
							height="110rpx"
							shape="circle"
						></u--image>
					</view>
					<view class="title">
						<text>{{ item.name ? item.name : item.title }}</text>
					</view>
				</view>
			</u-scroll-list>
		</view>
		<view class="food_info">
			<view class="info">
				<text>{{ footinfo }}</text>
			</view>
		</view>
	</view>
</template>
<script>
import { cardData, cardProps, cardWatch, cardMethods, diyDefault } from '@/components/mixins/cardMixins.js';
import { diy_DefaultData } from '@/utils/diyData.js';
export default {
	name: 'ru-food',
	mixins: [cardData, cardProps, cardMethods, cardWatch, diyDefault],
	data() {
		return {
			food_list: [],
			footinfo: '',
			footon: 0
		};
	},
	computed: {},
	methods: {
		getDataList(type) {
			const netFun = this.getNetFunction(type),
				para_body = this.getPara();

			netFun(para_body).then(res => {
				// console.log('~~~~news结果', res, '列表', res.data.data.records);
				if (res.data.code == 200) {
					if (res.data.data.records.length == 0) return;

					this.data_list = this.dataHandling(res.data.data.records);
					setTimeout(() => {
						this.foodlist(0, false);
					}, 500);
				}
			});
		},

		/* 获取、配置预览所需默认数据 */
		getDefaultData(res) {
			this.data_list = [].concat(res.data_list);
			this.foodlist(0, false);
		},
		/** 点击切换
		 * index 切换索引值
		 * flag 触发方式
		 * 		|-false 自动触发	。用于初始化
		 * 		|-true 手动点击触发。用户使用
		 * */
		foodlist(index, flag = false) {
			// 防误触、多次触发
			if (flag && index == this.footon) return;

			this.footon = index;
			this.footinfo = this.data_list[index].synopsis;
		}
	},

	mounted() {},

	/* 卸载时清除所有定时器 */
	onUnload() {}
};
</script>

<style scoped lang="scss">
.content_food {
	margin: 30rpx;
	// background: #fff;
	border-radius: 20rpx;
	// background-image:url("http://xc.ls.m1y.cn/zanba.jpg");
	background-image: linear-gradient(to bottom, #ffffff90, #ffffff);
	.food_nav {
		display: flex;
		justify-content: space-between;
		margin-bottom: 10rpx;
		padding: 30rpx;
		.title {
			font-size: 32rpx;
			font-family: 'SourceHanSerifCN-Bold';
		}
		.more {
			display: flex;
			font-size: 28rpx;
			height: 38rpx;
		}
	}
	.food_list {
		overflow: hidden;
		margin: 0 20rpx;
		.list {
			display: flex;
			flex-direction: column;
			justify-items: center;
			width: 120rpx;
			align-items: center;
			margin-right: 30rpx;
			.img {
				margin-bottom: 16rpx;
			}
			.title {
				font-size: 28rpx;
				text-align: center;
			}
		}
		.on {
			.img {
				border: 2rpx solid #2aae67;
			}
			.title {
				color: #2aae67;
			}
		}
	}
	.food_info {
		padding: 30rpx 40rpx;
		.info {
			padding: 30rpx;
			border-radius: 16rpx;
			background: #e8e8e885;
			font-size: 28rpx;
			letter-spacing: 2rpx;
			color: #333;
		}
	}
}

.bigSize_content_food {
	.food_nav {
		.title {
			font-size: 38rpx;
			font-family: 'SourceHanSerifCN-Bold';
		}
		.more {
			font-size: 32rpx;
			height: 38rpx;
		}
	}
	.food_list {
		.list {
			.img {
			}
			.title {
				font-size: 32rpx;
			}
		}
		.on {
			.img {
			}
			.title {
			}
		}
	}
	.food_info {
		.info {
			font-size: 32rpx;
			letter-spacing: 2rpx;
		}
	}
}
</style>
