<template>
	<view class="content_news" v-if="data_list.length" :class="[bigSizeFontClass('bigSize_content_news')]">
		<view class="news_nav" v-if="isShowTitle == true">
			<view class="title">
				<text>{{ title }}</text>
			</view>
			<view class="more"><!-- <text>查看全部</text> --></view>
		</view>
		<view class="news_content">
			<view
				class="news_list"
				v-for="(item, index) in data_list"
				:key="index"
				@click="goInfo(item)"
				v-if="!isPublic ? true : item.urls[0].imgUrl"
			>
				<view class="img">
					<image class="img" :src="item.urls[0].imgUrl + mySuffix" mode="aspectFill"></image>
				</view>
				<view class="title">
					<text>{{ item.title ? item.title : item.name }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { cardData, cardProps, cardWatch, cardMethods, diyDefault } from '@/components/mixins/cardMixins.js';
export default {
	name: 'ru-diy01',
	mixins: [cardData, cardProps, cardMethods, cardWatch, diyDefault],
	methods: {
		getDataList(type) {
			const netFun = this.getNetFunction(type),
				para_body = this.getPara();

			netFun(para_body).then(res => {
				// console.log('ru-diy01 结果', res, '抽离列表', res.data.data.records);
				if (res.data.code == 200) {
					if (res.data.data.records.length == 0) return;
					this.data_list = this.dataHandling(res.data.data.records).filter(
						(val, index) => index < this.showMax
					);
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
	overflow: hidden;
	.news_nav {
		display: flex;
		width: 100%;
		justify-content: space-between;
		margin-bottom: 20rpx;
		padding: 0 30rpx;
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
		display: flex;
		flex-flow: wrap;
		justify-content: space-between;
		padding: 0 30rpx;
		.news_list {
			width: 48%;
			background: #fff;
			border-radius: 15rpx;
			margin-bottom: 24rpx;
			.img {
				display: flex;
			}
			.img {
				display: flex;
				border-radius: 15rpx 15rpx 0 0;
				height: 380rpx;
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
