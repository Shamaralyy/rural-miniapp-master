<template>
	<view class="u-demo-block">
		<!-- 轮播图 -->
		<u-swiper
			:list="eduList"
			@change="e => (current = e.current)"
			:current="current"
			@click="viewImage"
			keyName="cover"
			height="500"
			:autoplay="false"
		>
			<view slot="indicator" class="indicator">
				<view
					class="indicator__dot"
					v-for="(item, index) in eduList"
					:key="index"
					:class="[index == current && 'indicator__dot--active']"
				></view>
			</view>
		</u-swiper>
		<!-- 轮播图 end -->

		<!-- 内容 -->
		<view v-for="(item, index) in eduList" :key="index" v-show="current == index" class="textInfo">
			<view class="info">
				<view class="title">第{{ current + 1 }}步 {{ item.name }}</view>
				<view class="desc">{{ item.present }}</view>
			</view>
		</view>
		<!-- 内容 end -->
		<view class="bottom_left">
			<u-button
				v-if="current != 0"
				@click="--current"
				:customStyle="{ background: '#04c354', borderColor: '#04c354' }"
				color="#fff"
				text="上一步"
			></u-button>
		</view>

		<view class="bottom_right">
			<u-button
				v-if="current != eduList.length - 1"
				@click="++current"
				:customStyle="{ background: '#04c354', borderColor: '#04c354' }"
				color="#fff"
				text="下一步"
			></u-button>
			<u-button
				v-if="current + 1 == eduList.length"
				@click="goEdu()"
				:customStyle="{ background: '#04c354', borderColor: '#04c354' }"
				color="#fff"
				text="学习更多"
			></u-button>
		</view>
	</view>
</template>

<script>
import { apiBusinessRuralCourseStepPage_Post } from '@/API/名片学院.js';
export default {
	data() {
		return {
			current: 0, //轮播图当前index
			courseId: null,
			eduList: []
		};
	},
	onLoad(option) {
		this.courseId = option.courseId;
		this.getEduList();
	},
	// 方法集合
	methods: {
		goEdu() {
			uni.navigateTo({
				url: 'edu'
			});
		},
		getEduList() {
			let apiBusinessRuralCourseStepPage_Param = {
				pageNum: null /**     string required:false */,
				pageSize: null /**     string required:false */,
				name: null /** 步骤名称    string required:false */,
				present: null /** 步骤说明    string required:false */,
				courseId: this.courseId /** 课程ID    string required:false */,
				status: null /** 状态(0:未审核,1:已通过,2:未通过)    string required:false */,
				aside: null /** 步骤旁白    string required:false */
			};
			apiBusinessRuralCourseStepPage_Post(apiBusinessRuralCourseStepPage_Param).then(res => {
				this.eduList = res.data.data.records;
				console.log(res.data);
			});
		},
		//点击确定按钮
		click() {
			if (this.current != this.eduList.length - 1) {
				this.current += 1;
			}
		},

		//图册
		viewImage() {
			uni.previewImage({
				indicator: 'number',
				loop: true,
				current: this.current,
				urls: this.eduList
			});
		}
	}
};
</script>
<style lang="scss" scoped>
/* /deep/ */

.indicator {
	@include flex(row);
	justify-content: center;

	&__dot {
		height: 6px;
		width: 6px;
		border-radius: 100px;
		background-color: rgba(255, 255, 255, 0.35);
		margin: 0 5px;
		transition: background-color 0.3s;

		&--active {
			background-color: #ffffff;
		}
	}
}

.indicator-num {
	padding: 2px 0;
	background-color: rgba(0, 0, 0, 0.35);
	border-radius: 100px;
	width: 35px;
	@include flex;
	justify-content: center;

	&__text {
		color: #ffffff;
		font-size: 12px;
	}
}

.bottom_right {
	position: absolute;
	bottom: 1%;
	right: 3%;
}
.bottom_left {
	position: absolute;
	bottom: 1%;
	left: 3%;
}
.textInfo {
	margin: 30rpx;
	.info {
		.title {
			font-size: 32rpx;
			margin-bottom: 20rpx;
		}
		.desc {
			font-size: 28rpx;
		}
	}
}
</style>
