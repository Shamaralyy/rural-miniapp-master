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
				v-if="!isPublic ? true : item.urls[0].imgUrl && index < showMax"
			>
				<view class="img"><image :src="item.urls[0].imgUrl + mySuffix" mode="aspectFill"></image></view>
				<view class="text">
					<view class="title">
						<text>{{ item.title ? item.title : item.name }}</text>
						<!-- <u--text size="14" color="#333333" margin="10 0 0 0" lines="1" :text="item.title ? item.title : item.name"></u--text> -->
					</view>
					<view class="">{{ item.synopsis }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { cardData, cardProps, cardWatch, cardMethods, diyDefault } from '@/components/mixins/cardMixins.js';
export default {
	name: 'ru-diy03',
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
		flex-direction: column;
		justify-content: space-between;
		.news_list {
			display: flex;
			margin: 10rpx 30rpx;
			border-radius: 30rpx;
			background: #fff;
			.img {
				width: 25%;
				height: 25vw;
				padding: 30rpx;
				image {
					width: 100%;
					height: inherit;
					border: 1rpx #e8e8e8 solid;
				}
			}
			.text {
				padding: 30rpx 10rpx;
				width: 60%;
				.title {
					font-size: 34rpx;
					margin-bottom: 16rpx;
				}
				.tag {
					display: flex;
					margin-bottom: 16rpx;
				}
				.map {
					display: flex;
					font-size: 28rpx;
					flex-direction: column;
				}
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
