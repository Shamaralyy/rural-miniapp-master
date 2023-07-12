<template>
	<view class="content_news" v-if="data_list.length" :class="[bigSizeFontClass('bigSize_content_news')]">
		<view class="news_nav">
			<view class="title">
				<text>{{ title }}</text>
			</view>
			<view class="more"><!-- <text>查看全部</text> --></view>
		</view>
		<view class="news_content">
			<u-scroll-list :indicator="false">
				<view
					class="news_list"
					v-for="(item, index) in data_list"
					:key="index"
					@click="goInfo(item)"
					v-if="!isPublic ? true : item.urls[0].imgUrl && index < showMax"
				>
					<view class="img">
						<image class="img" :src="item.urls[0].imgUrl + mySuffix" mode="aspectFill"></image>
					</view>
					<view class="title">
						<text>{{ item.title ? item.title : item.name }}</text>
					</view>
				</view>
			</u-scroll-list>
		</view>
	</view>
</template>

<script>
import { cardData, cardProps, cardWatch, cardMethods, diyDefault } from '@/components/mixins/cardMixins.js';
export default {
	name: 'ru-diy09',
	mixins: [cardData, cardProps, cardMethods, cardWatch, diyDefault],
	methods: {
		getDataList(type) {
			const netFun = this.getNetFunction(type),
				para_body = this.getPara();

			netFun(para_body).then(res => {
				// console.log('~~~~news结果', res, '列表', res.data.data.records);
				if (res.data.code == 200) {
					if (res.data.data.records.length == 0) return;

					this.data_list = this.dataHandling(res.data.data.records);
				}
			});
		},

		/* 获取、配置预览所需默认数据 */
		getDefaultData(res) {
			this.data_list = [].concat(res.data_list);
		}
	}
};
</script>

<style scoped lang="scss">
.content_news {
	margin: 20rpx 0rpx 20rpx 30rpx;
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
