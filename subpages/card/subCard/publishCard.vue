<!-- 发布组件 -->
<template>
	<view>
		<u-popup :show="publishData.plus_show" @close="$emit('clos')" round="20" bgColor="#ffffffe6">
			<view class="plus_show">
				<view class="show_title"><text>一起丰富乡村名片内容</text></view>
				<view class="show_nav">
					<u-grid :border="false" col="4">
						<u-grid-item
							v-for="(baseListItem, baseListIndex) in baseList"
							:key="baseListIndex"
							@click="$emit('toPage', baseListItem)"
						>
							<u-icon
								:customStyle="{ paddingTop: 20 + 'rpx' }"
								:name="baseListItem.name"
								:size="34"
							></u-icon>
							<text class="nav_text">{{ baseListItem.title }}</text>
						</u-grid-item>
					</u-grid>
				</view>
				<view class="show_close" @click="$emit('clos')">
					<view class="close_text"><text>关闭</text></view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
const imgBaseUrl = getApp().globalData.imgBaseUrl + '/app';
export default {
	name: 'publishCard',
	props: ['publishData'],
	data() {
		return {
			baseList: [
				{
					name: `${imgBaseUrl}/static/rural_home_nav1.png`,
					title: '照片视频',
					url: '/subpages/card/card_photo/add_photo'
				},
				{
					name: `${imgBaseUrl}/static/rural_home_nav2.png`,
					title: '发布村志',
					url: '/subpages/card/card_news/add_news'
				},
				{
					name: `${imgBaseUrl}/static/rural_home_nav4.png`,
					title: '推荐地点',
					url: '/subpages/card/card_map/add_map'
				},
				{
					name: `${imgBaseUrl}/static/rural_home_nav7.png`,
					title: '提供服务',
					url: '/subpages/card/card_service/add_service'
				}
			]
		};
	},
	methods: {}
};
</script>

<style scoped lang="scss">
.plus_show {
	margin: 60rpx 40rpx 20rpx 40rpx;
	height: 400rpx;
	.show_title {
		margin-bottom: 60rpx;
		font-size: 36rpx;
		font-family: 'SourceHanSerifCN-Bold';
	}
	.show_nav {
		.nav_text {
			font-size: 28rpx;
		}
	}
	.show_close {
		display: flex;
		justify-content: center;
		margin-top: 60rpx;
		.close_text {
			background: #cacaca63;
			padding: 16rpx 30rpx;
			border-radius: 50rpx;
			font-size: 28rpx;
			color: #696969;
		}
	}
}
</style>
