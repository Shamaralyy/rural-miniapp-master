<template>
	<view :class="newsList.length==0?'':'page'" :style="{ background: 'url(' + rural_info.images[0].imgUrl + ')' }">
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
			<view class="list_top">
				<u-tabs
					:list="columns"
					lineColor="#04c354"
					:activeStyle="{
						color: '#04c354',
						fontSize: '32rpx',
						fontWeight: 'bold',
						transform: 'scale(1.05)'
					}"
				></u-tabs>
			</view>
			<view class="list_content">
				<view class="list" v-for="(item, index1) in newsList" :key="index1">
					<view class="title" @click="$emit('toInfo', item.informationId)">
						<view class="name">
							<text>{{ item.title }}</text>
						</view>
						<view class="more"><u-icon name="arrow-right" size="20"></u-icon></view>
					</view>
					<view class="img" v-if="item.urls">
						<u-swiper
							:list="item.urls"
							height="160"
							:indicator="true"
							@click="clickBanner(item.urls)"
						></u-swiper>
					</view>
					<view class="text">
						<view class="tag">
							<u-tag
								:text="item.tagName"
								bgColor="#fff8eb"
								borderColor="#fff8eb"
								color="#ad946c"
								size="mini"
							></u-tag>
						</view>
						<view class="map">
							<u-read-more
								showHeight="90"
								:closeText="'展开' + item.title"
								textIndent="0em"
								color="#2aae67"
								:toggle="true"
							>
								<u-parse :content="item.content"></u-parse>
							</u-read-more>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { cardListData, cardListProps, cardListComputedFilter } from '@/components/mixins/cardList.js';
export default {
	name: 'list_1',
	mixins: [cardListData, cardListProps, cardListComputedFilter],
	computed: {
		naviStyle() {
			return this.isTop
				? {
						bg: '#00000000',
						colo: '#fff'
				  }
				: {
						bg: '#f1f1f100',
						colo: '#fff'
				  };
		},
		newsList() {
			return this.list;
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

<style lang="scss">
.page::before {
	content: ' ';
	height: 100vh;
	width: 100vw;
	background-color: rgba(255, 255, 255, 0.3);
	backdrop-filter: blur(2rpx);
	position: fixed;
	z-index: 0;
}

.u-nav-slot_left {
	display: flex;
	padding: 8rpx 20rpx;
	border-radius: 30rpx;
	// border: 1rpx solid #ffffff9e;
	background: #0000004f;
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
	position: relative;
	z-index: 1;

	.list_top {
		margin: 0rpx 20rpx 20rpx;
	}

	.list_content {
		display: flex;
		flex-direction: column;

		.list {
			display: flex;
			margin: 10rpx 30rpx 20rpx 30rpx;
			border-radius: 30rpx;
			background: #ffffffd1;
			flex-direction: column;
			background-image: linear-gradient(-180deg, rgba(255, 255, 255, 0) 0%, #fff 80%);

			.title {
				font-size: 36rpx;
				padding: 20rpx 30rpx 10rpx 30rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
			}

			.name::before {
				content: '';
				width: 3px;
				height: 17px;
				background-color: #2aae67;
				display: inline-block;
				position: relative;
				top: 2px;
				margin-right: 10px;
			}

			.img {
				padding: 10rpx 30rpx;

				image {
					width: 100%;
					height: inherit;
					border: 1rpx #e8e8e8 solid;
				}
			}

			.text {
				padding: 20rpx;

				.tag {
					display: flex;
					margin-bottom: 16rpx;
				}

				.map {
					// display: flex;
					font-size: 28rpx;
					margin-left: 10rpx;
				}
			}
		}
	}
}
</style>
