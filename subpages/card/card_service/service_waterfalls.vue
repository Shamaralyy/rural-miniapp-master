<template>
	<view>
		<view class="service_waterfalls_ul">
			<view class="li" v-for="(item1, index1) in list" :key="index1">
				<view v-for="(item2, index2) in item1.nav" :class="index2 == 0 ? 'left' : 'right'" :key="index2">
					<view
						v-for="(item3, index3) in item2.sublist"
						class="twoPic"
						:class="index2 == 1 && index3 == 0 && item2.sublist.length % 2 != 0 ? 'big' : 'small'"
						:key="index3"
					>
						<img :src="item3.bgimg" />
					</view>
				</view>
			</view>
		</view>

		<u-button @click="weatherforecastshow = true">打开</u-button>
	</view>
</template>

<script>
export default {
	data() {
		return {
			list: [
				{
					nav: [
						{
							sublist: [
								{
									bgimg:
										'https://cdn.xiangcunmingpian.com/ruralImg/53290110401/672be5de628c4f0b87469db9ee50be60.jpg?x-oss-process=style/p20',
									title: '123'
								},
								{
									bgimg:
										'https://cdn.xiangcunmingpian.com/ruralImg/53290110401/672be5de628c4f0b87469db9ee50be60.jpg?x-oss-process=style/p20',
									title: '123'
								}
							]
						},
						{
							sublist: [
								{
									bgimg:
										'https://cdn.xiangcunmingpian.com/ruralImg/53290110401/672be5de628c4f0b87469db9ee50be60.jpg?x-oss-process=style/p20',
									title: '123'
								}
							]
						}
					]
				},
				{
					nav: [
						{
							sublist: [
								{
									bgimg:
										'https://cdn.xiangcunmingpian.com/ruralImg/53290110401/672be5de628c4f0b87469db9ee50be60.jpg?x-oss-process=style/p20',
									title: '123'
								}
							]
						},
						{
							sublist: [
								{
									bgimg:
										'https://cdn.xiangcunmingpian.com/ruralImg/53290110401/672be5de628c4f0b87469db9ee50be60.jpg?x-oss-process=style/p20',
									title: '123'
								},
								{
									bgimg:
										'https://cdn.xiangcunmingpian.com/ruralImg/53290110401/672be5de628c4f0b87469db9ee50be60.jpg?x-oss-process=style/p20',
									title: '123'
								}
							]
						}
					]
				},
				{
					nav: [
						{
							sublist: [
								{
									bgimg:
										'https://cdn.xiangcunmingpian.com/ruralImg/53290110401/672be5de628c4f0b87469db9ee50be60.jpg?x-oss-process=style/p20',
									title: '123'
								},
								{
									bgimg:
										'https://cdn.xiangcunmingpian.com/ruralImg/53290110401/672be5de628c4f0b87469db9ee50be60.jpg?x-oss-process=style/p20',
									title: '123'
								},
								{
									bgimg:
										'https://cdn.xiangcunmingpian.com/ruralImg/53290110401/672be5de628c4f0b87469db9ee50be60.jpg?x-oss-process=style/p20',
									title: '123'
								}
							]
						},
						{
							sublist: [
								{
									bgimg:
										'https://cdn.xiangcunmingpian.com/ruralImg/53290110401/672be5de628c4f0b87469db9ee50be60.jpg?x-oss-process=style/p20',
									title: '123'
								},
								{
									bgimg:
										'https://cdn.xiangcunmingpian.com/ruralImg/53290110401/672be5de628c4f0b87469db9ee50be60.jpg?x-oss-process=style/p20',
									title: '123'
								},
								{
									bgimg:
										'https://cdn.xiangcunmingpian.com/ruralImg/53290110401/672be5de628c4f0b87469db9ee50be60.jpg?x-oss-process=style/p20',
									title: '123'
								}
							]
						}
					]
				}
			],
			
		};
	},

	// 计算属性，会监听依赖属性值随之变化
	components: {},

	// 方法集合
	methods: {},
	computed: {},
	// 监控data中的数据变化
	watch: {},
	// 生命周期 - 创建完成（可以访问当前this实例）
	created() {
		console.log(this.list);
	},
	// 生命周期 - 挂载完成（可以访问DOM元素）
	mounted() {},
	beforeCreate() {}, // 生命周期 - 创建之前
	beforeMount() {}, // 生命周期 - 挂载之前
	beforeUpdate() {}, // 生命周期 - 更新之前
	updated() {}, // 生命周期 - 更新之后
	beforeDestroy() {}, // 生命周期 - 销毁之前
	destroyed() {}, // 生命周期 - 销毁完成
	activated() {} // 如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style scoped lang="scss">
/* /deep/ */
.service_waterfalls_ul {
	padding: 25rpx;
	.li {
		display: flex;
		width: 100%;
		.left {
			width: 33%;
			.small {
				height: 214rpx;
				margin: 8rpx 0;
			}
			// .small:first-child {
			//   margin-top: 0;
			// }
			.twoPic {
				border-radius: 16rpx;
				overflow: hidden;
			}
		}
		.right {
			width: 66%;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			margin-left: 1%;
			.small {
				height: 214rpx;
				margin: 8rpx;
				flex: 1;
			}
			.small:last-child {
				margin-right: 0rpx;
			}
			.twoPic {
				border-radius: 16rpx;
				overflow: hidden;
				margin-left: 0;
			}
			.big {
				margin-top: 8rpx;
				height: 439rpx;
				border-radius: 16rpx;
				overflow: hidden;
				width: 100%;
			}
		}
		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
			object-position: center;
		}
	}
}

</style>
