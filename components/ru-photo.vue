<template>
	<view class="content_photo" v-if="false" :class="[bigSizeFontClass('bigSize_content_photo')]">
		<view class="photo_tabs">
			<u-tabs
				:list="photo_tabs"
				@click="click"
				lineColor="#00000000"
				:inactiveStyle="{
					color: '#444',
					background: '#e3e3e390',
					padding: '12rpx 18rpx',
					BorderRadius: '42rpx',
					fontSize: '26rpx',
					transform: 'scale(1.05)'
				}"
				:activeStyle="{
					color: '#fff',
					background: '#2aae6790',
					padding: '12rpx 18rpx',
					BorderRadius: '42rpx',
					fontSize: '26rpx',
					transform: 'scale(1.05)'
				}"
			></u-tabs>
		</view>
		<view class="photo_list">
			<view class="list" v-for="(item, index) in photolist" :key="index">
				<view class="img"><image :src="item.imgurl + imgSuffix" mode="widthFix"></image></view>
				<view class="title"><u--text :lines="1" :text="item.name" align="center"></u--text></view>
			</view>
		</view>
	</view>
</template>

<script>
const imgBaseUrl = getApp().globalData.imgBaseUrl + '/app/static/';
const imgSuffix = getApp().globalData.imgSuffix[1];
export default {
	name: 'ru-photo',
	props: {
		// photoList: {
		// 	type: Array,
		// 	default: []
		// }
	},
	data() {
		return {
			mySuffix: imgSuffix,
			photolist: [
				{
					id: '1',
					name: '村口',
					imgurl: imgBaseUrl + 'rural_guide_1.png' + imgSuffix,
					type: '1',
					url: ''
				},
				{
					id: '2',
					name: '那拉提旅游风',
					imgurl: imgBaseUrl + 'rural_guide_1.png' + imgSuffix,
					type: '1',
					url: ''
				},
				{
					id: '3',
					name: '那拉提旅游风',
					imgurl: imgBaseUrl + 'rural_guide_1.png' + imgSuffix,
					type: '2',
					url: ''
				},
				{
					id: '3',
					name: '那拉提旅游风',
					imgurl: imgBaseUrl + 'rural_guide_1.png' + imgSuffix,
					type: '2',
					url: ''
				},
				{
					id: '3',
					name: '那拉提旅游风',
					imgurl: imgBaseUrl + 'rural_guide_1.png' + imgSuffix,
					type: '2',
					url: ''
				},
				{
					id: '3',
					name: '那拉提旅游风',
					imgurl: imgBaseUrl + 'rural_guide_1.png' + imgSuffix,
					type: '2',
					url: ''
				}
			],
			photo_tabs: [
				{
					name: '村容村貌'
				},
				{
					name: '乡风文明'
				},
				{
					name: '产业特色'
				},
				{
					name: '基础设施'
				},
				{
					name: '基层治理'
				}
			]
		};
	},
	watch: {
		photoList: {
			immediate: true,
			handler(newVale) {
				// this.photolist = newVale;
				// this.animatStart();
				console.log(newVale);
			}
		}
	},
	computed: {},
	methods: {},

	mounted() {},

	/* 卸载时清除所有定时器 */
	onUnload() {}
};
</script>

<style scoped lang="scss">
.content_photo {
	margin: 20rpx;
	.photo_list {
		display: flex;
		justify-content: space-around;
		margin: 20rpx 0;
		flex-flow: wrap;
		.list {
			width: 30%;
			.img {
				width: 100%;
				height: 200rpx;
				display: flex;
				border-radius: 15rpx;
			}
			.title {
				text-align: center;
				font-size: 26rpx;
				height: 80rpx;
				line-height: 60rpx;
			}
		}
	}
	.u-album__row__wrapper {
		border-radius: 20rpx;
	}
}

.bigSize_content_photo{
	.photo_list {
		.list {
			.img {
			}
			.title {
				font-size: 30rpx;
			}
		}
	}
	.u-album__row__wrapper {
	}
}
</style>
