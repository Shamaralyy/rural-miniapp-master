<template>
	<view class="page">
		<u-navbar
			:showAction="false"
			:placeholder="true"
			:title="newsTitle"
			:bgColor="naviStyle.bg"
			:leftIconColor="naviStyle.colo"
			:titleStyle="{ color: '#333' }"
		>
			<view class="u-nav-slot_left" slot="left" :style="'color:' + naviStyle.colo">
				<view class="" @click="$emit('goCard')">
					<u-icon name="home" size="18" :color="naviStyle.colo"></u-icon>
				</view>
				<view class="name" @click="$emit('goCard')">
					<text>{{ rural_info.name }}</text>
				</view>
			</view>
		</u-navbar>
		<view style="margin: 30rpx;">
			<u-empty text="暂无内容~" v-if="newsList.length == 0" :icon="imgBaseUrl + 'noTags.png'"></u-empty>
		</view>
		<view class="rural_list">
			<view class="list_top"></view>
			<view class="list_content">
				<view class="list" v-for="(item, index) in newsList" :key="index" @click="clickBanner(item.urls)">
					<view class="img"><image :src="item.urls[0]" mode="aspectFill"></image></view>
					<view class="text">
						<view class="title">
							<text>{{ item.title }}</text>
						</view>
						<!-- <view class="tag">
							<u-tag
								:text="item.tagName"
								bgColor="#fff8eb"
								borderColor="#fff8eb"
								color="#ad946c"
								size="mini"
							></u-tag>
						</view>
						<view class="map">
							<u--text :text="item.synopsis" size="12" lines="2" mode="text"></u--text>
						</view> -->
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { cardListData, cardListProps } from '@/components/mixins/cardList.js';
export default {
	name: 'list_1',
	mixins: [cardListData, cardListProps],
	computed: {
		naviStyle() {
			return this.isTop
				? {
						bg: '#00000000',
						colo: '#333'
				  }
				: {
						bg: '#f1f1f1',
						colo: '#000'
				  };
		},
		/* 过滤数据 */
		newsList() {
			try {
				if (typeof this.list != 'object') return [];
				if (this.list.lenght == 0) return [];
				return this.list.filter(value => {
					return value.urls ? true : false;
				});
			} catch (e) {
				return [];
			}
		}
	},
	methods: {
		clickBanner(e) {
			console.log('获取到轮播图', e);
			uni.previewImage({
				urls: e
				// current: e
			});
		}
	}
};
</script>

<style scoped lang="scss">
// .page::before {
// 	content: ' ';
// 	height: 100%;
// 	width: 100vw;
// 	background-color: rgba(255, 255, 255, 0.3);
// 	backdrop-filter: blur(2rpx);
// 	position: fixed;
// 	z-index: 0;
// }
.u-nav-slot_left {
	display: flex;
	padding: 8rpx 20rpx;
	border-radius: 30rpx;
	// border: 1rpx solid #ffffff9e;
	background: #ffffff9e;
	align-items: center;

	.name {
		font-size: 28rpx;
		font-family: 'SourceHanSerifCN-Bold';
		margin-left: 5rpx;
		padding-bottom: 3rpx;
	}

	.title {
		font-size: 26rpx;
		font-weight: 400;
	}
}

.u-nav-slot_right {
	display: flex;
	background: #0006;
	padding: 10rpx 20rpx;
	border-radius: 30rpx;
	color: #fff;
	position: absolute;
	width: max-content;
	height: 38rpx;
	line-height: 38rpx;

	.name {
		font-size: 28rpx;
		font-family: 'SourceHanSerifCN-Bold';
	}

	.title {
		font-size: 26rpx;
		font-weight: 400;
	}
}
.rural_list {
	.list_top {
	}
	.list_content {
		display: flex;
		flex-flow: wrap;
		padding: 10rpx 30rpx;
		justify-content: space-between;
		.list {
			display: flex;
			border-radius: 30rpx;
			background: #fff;
			width: 48%;
			flex-direction: column;
			margin-bottom: 20rpx;
			.img {
				width: 100%;
				image {
					width: 100%;
					border: 1rpx #e8e8e8 solid;
					border-radius: 20rpx 20rpx 0 0;
				}
			}
			.text {
				padding: 10rpx 10rpx;
				.title {
					font-size: 28rpx;
					margin-bottom: 16rpx;
				}
				.tag {
					display: flex;
					margin-bottom: 16rpx;
				}
				.map {
					display: flex;
					font-size: 28rpx;
				}
			}
		}
	}
}
</style>
