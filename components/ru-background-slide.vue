<!-- 轮播图组件 -->
<template>
	<view class="">
		<view class="slidContainer">
			<!-- 存放图片的占位容器 -->
			<view class="img_slot" :style="[style_background_image]" :class="[class_animat_img]">
				<!-- 子容器为遮罩层 用于转场 -->
				<view class="mask" :class="[class_animat_Mask]"></view>
			</view>
		</view>
	</view>
</template>

<script>
const imgBaseUrl = getApp().globalData.imgBaseUrl + '/app';
const imgSuffix = getApp().globalData.imgSuffix[0];
export default {
	name: 'ru-background-slide',
	props: {
		slideImgList: {
			type: Array,
			default: []
		}
	},
	data() {
		return {
			imgList: [],
			timeID_bg: 0,
			timeID_mask: 0,
			showID_img: 0,
			animatStat_img: true, //动画状态  true放大、false缩小
			animatStat_mask: true //遮罩动画状态
		};
	},
	watch: {
		slideImgList: {
			immediate: true,
			handler(newVale) {
				// console.log('轮播图数据', newVale);
				if (newVale.length == 0) {
					(this.imgList = [
						imgBaseUrl + '/static/demo_banner_2.jpg',
						imgBaseUrl + '/static/demo_banner_1.jpg',
						imgBaseUrl + '/static/demo_banner_3.jpg'
					]),
						this.animatStart();
				} else {
					this.imgList = newVale;
					this.animatStart();
				}
			}
		}
	},
	computed: {
		/* 动态切换背景 */
		style_background_image() {
			return {
				'background-image': 'url(' + this.imgList[this.showID_img] + imgSuffix + ')'
			};
		},

		/* 背景动画类 */
		class_animat_img() {
			return this.animatStat_img ? 'in_animat' : 'out_animat';
		},

		/* 动态转场遮罩 */
		class_animat_Mask() {
			return this.animatStat_mask ? 'mask_animat' : '';
		}
	},
	methods: {
		/* 控制遮罩的动画 */
		setMaskAnimat() {
			this.animatStat_mask = true;
			this.timeID_mask = setTimeout(() => {
				this.animatStat_mask = false;
				// console.log('轮播图切换');
			}, 1000);
		},

		/* 控制背景图片切换 */
		setBackGroundAnimat() {
			this.showID_img = this.showID_img == this.imgList.length - 1 ? 0 : ++this.showID_img;
			this.animatStat_img = !this.animatStat_img;
		},

		/* 开始执行动画 */
		animatStart() {
			// 判断当前是否可以开始轮播
			if (this.imgList.length == 0) {
				console.error('轮播图错误：无图片列表');
				return;
			}
			// 遍历内容
			if (typeof this.imgList[0] != 'string') {
				console.error('传入数据异常', this.imgList);
				return;
			}
			// 终止之前的定时器
			if (this.timeID_bg != 0) {
				clearInterval(this.timeID_bg);
			}
			/* 定时轮播图片 */
			this.timeID_bg = setInterval(() => {
				// console.log('轮播数据');
				this.setMaskAnimat();
				this.setBackGroundAnimat();
			}, 5000);
		}
	},

	mounted() {
		this.animatStart();
	},
	/* 卸载时清除所有定时器 */
	beforeDestroy() {
		console.log('销毁2');
		if (this.timeID_bg == 0) return;
		clearInterval(this.timeID_bg);
		if (this.timeID_mask == 0) return;
		clearTimeout(this.timeID_mask);
	}
};
</script>

<style scoped lang="scss">
$animat_time: 5s;
$animat_small: 135%;
$animat_big: 150%;

//幻灯片容器
.slidContainer {
	width: 100%;
	height: 350px;
	.img_slot {
		width: 100%;
		height: 100%;
		background-repeat: unset;
		background-position: center;
		animation-timing-function: ease-in;
		// 遮罩
		.mask {
			width: 100%;
			height: 100%;
		}
		// 遮罩动画
		.mask_animat {
			animation: mask_flid 1.5s;
		}
	}
	// 动画类单独动态添加
	.in_animat {
		animation: img_slid_in $animat_time;
	}
	.out_animat {
		animation: img_slid_out $animat_time;
	}
}

// 放大渐变动画
@keyframes img_slid_in {
	0% {
		background-size: $animat_small;
	}
	20% {
		background-size: $animat_small;
	}
	100% {
		background-size: $animat_big;
	}
}

// 缩小渐变动画
@keyframes img_slid_out {
	0% {
		background-size: $animat_big;
	}
	20% {
		background-size: $animat_big;
	}
	100% {
		background-size: $animat_small;
	}
}

//遮罩渐变动画
@keyframes mask_flid {
	from {
		background-color: #fff;
	}
	to {
		background-color: transparent;
	}
}
</style>
