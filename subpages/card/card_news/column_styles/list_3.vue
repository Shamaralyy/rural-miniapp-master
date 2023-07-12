<template>
	<view class="page" :style="{ background: 'url(' + rural_info.images[0].imgUrl + ');' }">
		<u-navbar
			:showAction="false"
			:placeholder="true"
			:title="newsTitle"
			:bgColor="naviStyle.bg"
			:leftIconColor="naviStyle.colo"
			:titleStyle="{ color: '#fff' }"
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
				<view
					class="list"
					v-for="(item, index) in newsList"
					:key="index"
					@click="$emit('toInfo', item.informationId)"
				>
					<!-- <view class="list" v-for="(item, index) in newsList" :key="index" @click="aaa(item)"> -->
					<view class="img"><image :src="item.urls[0]" mode="aspectFill"></image></view>
					<view class="text">
						<view class="tag">
							<u-tag
								:text="item.tagName"
								bgColor="#fafafa90"
								borderColor="#fafafa00"
								color="#312d27"
								size="mini"
							></u-tag>
						</view>
						<!-- <view class="map">
							<u--text :text="item.synopsis" size="12" lines="2" mode="text"></u--text>
						</view> -->
						<view class="title">
							<text>{{ item.title }}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { cardListData, cardListProps } from '@/components/mixins/cardList.js';
export default {
	name: 'list_3',
	mixins: [cardListData, cardListProps],
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
		}
	}
};
</script>

<style scoped lang="scss">
.page::before {
	content: ' ';
	height: 100%;
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
	.list_top {
	}
	.list_content {
		display: flex;
		flex-direction: column;
		.list {
			display: flex;
			margin: 10rpx 30rpx;
			border-radius: 20rpx;
			background: #fff;
			position: relative;
			.img {
				width: 100%;
				height: 20vh;
				image {
					width: 100%;
					height: inherit;
					border-radius: 20rpx;
				}
			}
			.text {
				padding: 30rpx 10rpx;
				width: -webkit-fill-available;
				position: absolute;
				bottom: 0rpx;
				background-image: linear-gradient(
					rgba(0, 0, 0, 0) 0%,
					rgba(0, 0, 0, 0.26) 61%,
					rgba(0, 0, 0, 0.3) 72%,
					#272727b5 100%
				);
				border-radius: 20rpx;
				.title {
					font-size: 36rpx;
					// margin-bottom: 16rpx;
					color: #fff;
				}
				.tag {
					display: flex;
					margin-bottom: 8rpx;
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
