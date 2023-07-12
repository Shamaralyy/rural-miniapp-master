<template>
	<view>
		<view class="content_news">
			<view class="news_nav" v-if="isShowTitle == true">
				<view class="title">
					<text>{{ title }}</text>
				</view>
				<view class="more"><!-- <text>查看全部</text> --></view>
			</view>
		</view>

		<view class="iib_wonderful">
			<view class="ul">
				<view class="li" v-for="(item, index) in left_list" :key="index">
					<image
						class="image"
						:src="item.img"
						:style="{ height: item.img_height + 'rpx' }"
						mode="widthFix"
					></image>
					<view class="title">{{ item.title }}</view>
				</view>
			</view>
			<view class="ul">
				<view class="li" v-for="(item, index) in right_list" :key="index">
					<image
						class="image"
						:src="item.img"
						:style="{ height: item.img_height + 'rpx' }"
						mode="widthFix"
					></image>
					<view class="title">{{ item.title }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { cardData, cardProps, cardWatch, cardMethods, diyDefault } from '@/components/mixins/cardMixins.js';
export default {
	name: 'ru-diy08',
	mixins: [cardData, cardProps, cardMethods, cardWatch, diyDefault],
	data() {
		return {
			left_list: [],
			right_list: []
		};
	},
	methods: {
		getDataList(type) {
			const netFun = this.getNetFunction(type),
				para_body = this.getPara();

			netFun(para_body).then(res => {
				// console.log('ru-diy08 结果', res, '抽离列表', res.data.data.records);
				if (res.data.code == 200) {
					if (res.data.data.records.length == 0) return;
					const data_list = this.dataHandling(res.data.data.records);
					this.set08Data(data_list);
				}
			});
		},
		// 单独处理组件数据
		set08Data(res) {
			res.map((val, index) => {
				if (index + 1 > this.limit) {
				} else {
					index % 2 == 0
						? (this.left_list = this.left_list.concat(val))
						: (this.right_list = this.right_list.concat(val));
				}
			});
		},
		/* 获取、配置预览所需默认数据 */
		getDefaultData(res) {
			this.left_list = res.left_list;
			this.right_list = res.right_list;
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
}

.iib_wonderful {
	display: flex;
	justify-content: space-between;
	padding: 0 30rpx;
	.ul {
		width: 48.5%;
		.li {
			margin-bottom: 30rpx;
			image {
				width: 100%;
				border-radius: 15rpx;
			}
			.title {
				font-size: 26rpx;
				margin-top: 0rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
		}
	}
}
</style>
