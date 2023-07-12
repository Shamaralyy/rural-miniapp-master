<!--
 * @Description: 描述
 * @Date: 2022-05-11 15:00:47
 * @LastEditTime: 2022-05-15 17:20:29
 * @FilePath: \rural-miniapp\uni_modules\helang-waterfall\components\helang-waterfall\helang-waterfall.vue
-->
<template>
	<view class="waterfall-item" @tap="onTap" :style="[dynamicStyle]">
		<view class="img">
			<image
				:src="params.url + mySuffix"
				mode="aspectFill"
				:height="itemHeight + 'px'"
				@load="emitHeight"
				@error="emitHeight"
			></image>
			<view class="map" v-if="params.shop">
				<u-icon name="map" color="#fff" size="16"></u-icon>
				<!-- <text>{{ params.shop }}</text> -->
				<u--text :text="params.shop" color="#fff" size="12" lines="1"></u--text>
			</view>
		</view>
		<view class="content">
			<view style="" class="csdfgs">{{ params.title }}</view>
			<view class="tag" v-if="params.tag">
				<view class="list" v-for="(item,index) in params.tag" :key="index">
					<u-tag :text="item" size="mini" shape="circle" bgColor="#00000050" color="#fff" borderColor="#ffffff00"></u-tag>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
const imgSuffix = getApp().globalData.imgSuffix[1];
export default {
	name: 'helang-waterfall',
	data() {
		return {
			mySuffix: imgSuffix
		};
	},
	props: {
		params: {
			type: Object,
			default() {
				return {};
			}
		},
		tag: {
			type: String | Number,
			default: ''
		},
		index: {
			type: Number,
			default: -1
		},
		itemPad: {
			//自定义内边距
			type: Number,
			default: 16
		}
	},
	computed: {
		dynamicStyle() {
			return {
				padding: this.itemPad + 'rpx'
			};
		},
		itemHeight() {
			let base1 = Math.floor(Math.random() * 10),
				base2 = Math.floor(Math.random() * 10);
			return base1 * base2 * base1;
		}
	},
	methods: {
		// 发出组件高度信息，在此处可以区分正确和错误的加载，给予错误的提示图片
		emitHeight(e) {
			const query = uni.createSelectorQuery().in(this);
			query
				.select('.waterfall-item')
				.boundingClientRect(data => {
					let height = Math.floor(data.height);
					this.$emit('height', height, this.$props.tag);
				})
				.exec();
		},
		onTap() {
			this.$emit('click', this.$props.index, this.$props.tag);
		}
	}
};
</script>

<style lang="scss" scoped>
.waterfall-item {
	background-color: #fff;
	border-radius: 10px;
	font-size: 32rpx;
	color: #666;
	margin-bottom: 20rpx;
	.img{
		position: relative;
		image {
			display: block;
			width: 100%;
			// 默认设置一个图片的大约值
			max-height: 350rpx;
			border-radius: 10px;
		}
		.map{
			position: absolute;
			bottom: 10rpx;
			left: 10rpx;
			display: flex;
			align-items: center;
			text{
				font-size: 24rpx;
				color: #fff;
			}
		}
	}
	

	.content {
		margin-top: 16rpx;

		.money {
			color: #fa3534;
			margin-top: 8rpx;
		}
		
		.tag{
			display: flex;
			margin-top: 5rpx;
			flex-flow: wrap;
			.list{
				margin-right: 10rpx;
				margin-top: 5rpx;
			}
		}
		
		.label {
			background-color: #fa3534;
			color: #fff;
			font-size: 20rpx;
			padding: 4rpx 16rpx;
			border-radius: 20rpx;
		}

		.shop-name {
			font-size: 24rpx;
			color: #999;
		}
	}
}
.pd_0 {
	padding: 16rpx;
}

/* @font-face {
  font-family: "blosdd";
  src: url("https://cdn.xiangcunmingpian.com/app/SourceHanSerifCN.otf");
} */

.csdfgs {
	font-family: 'SourceHanSerifCN-Medium';
}
</style>
