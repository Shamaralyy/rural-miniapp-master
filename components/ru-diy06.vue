<template>
	<view class="content_news" v-if="data_list.length" :class="[bigSizeFontClass('bigSize_content_news')]">
		<view class="news_nav" v-if="isShowTitle == true">
			<view class="title">
				<text>{{ title }}</text>
			</view>
			<view class="more"><!-- <text>查看全部</text> --></view>
		</view>
		<view class="u-demo-block">
			<u-swiper
				:list="swiperList"
				previousMargin="30"
				nextMargin="30"
				circular
				:autoplay="true"
				radius="5"
				height="200"
				bgColor="#ffffff00"
				keyName="img"
				:showTitle="true"
				@click="go"
			></u-swiper>
		</view>
	</view>
</template>

<script>
import { cardData, cardProps, cardWatch, cardMethods, diyDefault } from '@/components/mixins/cardMixins.js';
export default {
	name: 'ru-diy06',
	mixins: [cardData, cardProps, cardMethods, cardWatch, diyDefault],
	data() {
		return {
			swiperList: []
		};
	},
	methods: {
		go(e) {
			console.log(e);
			var data = this.data_list[e];
			this.goInfo(data);
		},
		getDataList(type) {
			const netFun = this.getNetFunction(type),
				para_body = this.getPara();

			netFun(para_body).then(res => {
				// console.log('ru-diy06 结果', res, '抽离列表', res.data.data.records);
				if (res.data.code == 200) {
					if (res.data.data.records.length == 0) return;

					this.data_list = this.dataHandling(res.data.data.records);
					const swiperList = this.data_list.map(value => {
						return value.img;
					});
					this.swiperList = this.swiperList.concat(swiperList);
				}
			});
		},

		/* 获取、配置预览所需默认数据 */
		getDefaultData(res) {
			const swiperList = res.data_list.map(value => {
				return value.urls[0].imgUrl;
			});
			this.swiperList = this.swiperList.concat(swiperList);
			this.data_list = [].concat(res);
		}
	}
};
</script>

<style scoped lang="scss">
.content_news {
	margin: 20rpx 0rpx 40rpx 30rpx;
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
	.news_content {
		.news_list {
			width: 270rpx;
			background: #fff;
			border-radius: 15rpx;
			margin-right: 20rpx;
			.img {
				display: flex;
			}
			.img {
				display: flex;
				border-radius: 15rpx 15rpx 0 0;
				height: 350rpx;
			}
			.title {
				display: flex;
				padding: 18rpx 10rpx;
				font-size: 28rpx;
				font-weight: 300;
				justify-content: center;
			}
		}
	}
}

.bigSize_content_news {
	.news_nav {
		.title {
			font-size: 38rpx;
			font-weight: 300;
		}
		.more {
			font-size: 32rpx;
		}
	}
	.news_content {
		.news_list {
			.img {
			}
			.img {
			}
			.title {
				font-size: 32rpx;
			}
		}
	}
}
</style>
