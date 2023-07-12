<template>
	<view>
		<view class="content_news">
			<view class="news_nav" v-if="isShowTitle == true">
				<view class="title">
					<text>{{ title }}</text>
				</view>
				<view class="more"><!-- <text>查看全部</text> --></view>
			</view>

			<view class="iib_sectionswiper">
				<!-- 轮播图 -->
				<swiper class="image-container" next-margin="40rpx" circular @change="swiperChange">
					<swiper-item v-for="(item, index) in swipersd" :key="index" class="image-container">
						<view class="item">
							<image class="image" :src="item.img" mode=""></image>
							<view class="title">{{ item.title }}</view>
							<view class="subtitle">{{ item.subtitle }}</view>
						</view>
					</swiper-item>
				</swiper>
			</view>
		</view>
	</view>
</template>

<script>
import { cardData, cardProps, cardWatch, cardMethods, diyDefault } from '@/components/mixins/cardMixins.js';
export default {
	name: 'ru-diy07',
	mixins: [cardData, cardProps, cardMethods, cardWatch, diyDefault],
	data() {
		return {
			swipersd: []
		};
	},
	// 方法集合
	methods: {
		swiperChange(e) {
			this.dontFirstAnimation = false;
			this.currentIndex = e.detail.current;
		},
		getDataList(type) {
			const netFun = this.getNetFunction(type),
				para_body = this.getPara();

			netFun(para_body).then(res => {
				// console.log('ru-diy07 结果', res, '抽离列表', res.data.data.records);
				if (res.data.code == 200) {
					if (res.data.data.records.length == 0) return;
					const data_list = this.dataHandling(res.data.data.records);
					this.set07Data(data_list);
				}
			});
		},
		set07Data(res) {
			let tempData = res.map(val => {
				return {
					...val,
					subtitle: val.synopsis
				};
			});
			this.swipersd = tempData.filter((val, index) => index < this.limit);
			this.$forceUpdate();
		},
		/* 获取、配置预览所需默认数据 */
		getDefaultData(res) {
			console.log('diy07 接收数据', res);
			this.swipersd = this.swipersd.concat(res.swipersd);
		}
	}
};
</script>
<style lang="scss" scoped>
/* /deep/ */
.content_news {
	margin: 20rpx 30rpx;
	overflow: hidden;
	.news_nav {
		display: flex;
		width: 100%;
		justify-content: space-between;
		margin-bottom: 20rpx;
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

	.iib_sectionswiper {
		// 轮播图
		.image-container {
			width: 100%;
			//   height: 320rpx;
			.image-container {
				width: 100%;
				.item {
					padding-right: 25rpx;
					position: relative;
					height: 145px;
					image {
						width: 100%;
						height: 100%;
						border-radius: 15rpx;
					}

					.title {
						position: absolute;
						bottom: 54rpx;
						left: 20rpx;
						color: #fff;
						font-size: 28rpx;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
					.subtitle {
						position: absolute;
						bottom: 15rpx;
						color: #fff;
						left: 20rpx;
						font-size: 24rpx;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
				}
			}
		}
	}
}
</style>
