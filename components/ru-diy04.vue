<template>
	<view class="content_news" :style="[bgStyle]">
		<!-- diy04 -->
		<view class="navi-tit"  v-if="isShowTitle == true">{{ title }}</view>
		<u-scroll-list :indicator="false">
			<view
				v-for="(item, index) in data_list"
				:key="index"
				class="navi-item"
				@click="itemTap(index)"
				:class="index == nowCurrent ? 'select-ok' : 'select-no'"
				v-if="!isPublic ? true : item.urls[0].imgUrl && index < showMax"
			>
				{{ item.name ? item.name : item.title }}
			</view>
		</u-scroll-list>
	</view>
</template>

<script>
import { cardData, cardProps, cardWatch, cardMethods, diyDefault } from '@/components/mixins/cardMixins.js';
export default {
	name: 'ru-diy04',
	mixins: [cardData, cardProps, cardMethods, cardWatch, diyDefault],
	data() {
		return {
			nowCurrent: 0
		};
	},
	computed: {
		bgStyle() {
			if (this.data_list.length == 0) {
				return {
					'background-image':
						'url(' +
						'https://cdn.xiangcunmingpian.com/ruralImg/53290110401/672be5de628c4f0b87469db9ee50be60.jpg' +
						')'
				};
			} else {
				return {
					'background-image': 'url(' + this.data_list[this.nowCurrent].urls[0].imgUrl + ')'
				};
			}
		}
	},
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
			// console.log('模块组件获取的数据', res);
		},
		/* 点击项目 */
		itemTap(index) {
			if (this.nowCurrent == index) return;
			this.nowCurrent = index;
			// console.log('this', this.data_list[this.nowCurrent]);
		}
	}
};
</script>

<style scoped lang="scss">
.content_news {
	margin: 20rpx 30rpx;
	min-height: 380rpx;
	overflow: hidden;
	padding: 30rpx 0rpx 30rpx 30rpx;
	border-radius: 20rpx;
	background-size: 120%;
	background-position-x: center;
	background-position-y: center;
	.navi-tit {
		color: #fff;
		margin-bottom: 30rpx;
	}
	.navi-item {
		font-size: 24rpx;
		height: 40rpx;
		margin-right: 20rpx;
		line-height: 40rpx;
		padding: 4rpx 20rpx;
		white-space: nowrap;
		border-radius: 30rpx;
	}
	.select-ok {
		color: #fff;
		background-color: #56a96e;
	}
	.select-no {
		color: #000;
		background-color: #fff;
	}
}
</style>
