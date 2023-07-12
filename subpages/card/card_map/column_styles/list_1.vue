<template>
	<view class="page">
		<u-navbar
			:showAction="false"
			:placeholder="true"
			:title="newsTitle"
			:bgColor="naviStyle.bg"
			:leftIconColor="naviStyle.colo"
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
					@click="$emit('toInfo', item.coordinateId)"
				>
					<view class="img"><image :src="srcFac(item.urls[0])" mode="aspectFill"></image></view>
					<view class="text">
						<view class="title">
							<text>{{ item.name }}</text>
						</view>
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
							<u--text v-if="item.distance" :text="'距离你 '+item.distance+' km'" size="12" lines="1" mode="text"></u--text>
							<u--text v-if="item.distance" :text="item.detail" size="12" lines="1" mode="text"></u--text>
							<u--text v-if="!item.distance" :text="item.detail" size="12" lines="2" mode="text"></u--text>
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
						bg: '#f1f1f1',
						colo: '#000'
				  };
		}
	}
};
</script>

<style scoped lang="scss">
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
		flex-direction: column;
		.list {
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
					font-size: 36rpx;
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
</style>
