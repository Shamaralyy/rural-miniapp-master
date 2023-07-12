<template>
	<view class="page">
		<view class="">
			<u-navbar
				title="乡村名片学院"
				:placeholder="true"
				bgColor="#ffffff00"
			>
				<view class="u-nav-slot" slot="left"></view>
			</u-navbar>
		</view>
		<view class="content_banner">
			<u-swiper
				:list="list3"
				previousMargin="30"
				nextMargin="30"
				circular
				:autoplay="false"
				radius="5"
				bgColor="#ffffff00"
				height="180"
			></u-swiper>
		</view>
		<u-tabs
			:list="screenList"
			lineWidth="20"
			lineHeight="4"
			lineColor="#04c354"
			@change="tabChange"
			:activeStyle="{
				color: '#303133',
				fontWeight: 'bold',
				transform: 'scale(1.05)'
			}"
			:inactiveStyle="{
				color: '#606266',
				transform: 'scale(1)'
			}"
			itemStyle="padding-left: 15px; padding-right: 15px; height: 34px;"
			:current="current"
		></u-tabs>
		<view class="content_title"><text></text></view>
		<view class="content_list">
			<view class="list_edu" v-for="(item, index) in eduList" :key="index" @click="goedu(item)">
				<view class="img"><image :src="item.cover + mySuffix[1]" mode="widthFix"></image></view>
				<view class="info">
					<view class="title">
						<text>{{ item.name }}</text>
					</view>
					<view class="map">
						<text>{{ item.present }}</text>
					</view>
					<view class="content" v-if="item.synopsis != null">
						<text>{{ item.synopsis }}</text>
					</view>
				</view>
			</view>
		</view>
		<view v-if="eduList.length == 0">
			<u-empty mode="data" icon="http://cdn.uviewui.com/uview/empty/data.png"></u-empty>
		</view>
	</view>
</template>

<script>
const lineBg =
	'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAOCAYAAABdC15GAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFxSURBVHgBzZNRTsJAEIb/WTW+lpiY+FZPIDew3ABP4GJ8hxsI9zBpOYHeQDwBPQI+mRiRvpLojtPdYhCorQqF/6GdbGd2vvwzBXZcNAt4oj1ANeUoAT5iqkUjbEFLHNmhD1YPEvpZ3ghkGlVDCkc94/BmHMq998I5ONiY1ZBfpKAyuOtgAc5yOEDmYEWNh32BHF91sGHZHmwW4azciN9aQwnz3SJEgOmte+R2tdLprTYoa50mvuomlLpD4Y3oQZnov6D2RzCqI93bWOHaEmAGqQUyRBlZR1WfarcD/EJ2z8DtzDGvsMCwpm8XOCfDUsVOCYhiqRxI/CTQo4UOvjzO7Pow18vfywneuUHHUUxLn55lLw5JFpZ8bEUcY8oXdOLWiHLTxvoGpLqoUmy6dBT15o/ox3znpoycAmxUsiJTbs1cmxeVKp+0zmFIS7bGWiVghC7Vwse8jFKAX9eljh4ggKLLv7uaQvG9/F59Oo2SouxPu7OTCxN/s8wAAAAASUVORK5CYII=';
const imgBaseUrl = getApp().globalData.imgBaseUrl + '/app/static/';
const imgSuffix = getApp().globalData.imgSuffix;
import { apiBusinessCoursePage_Post } from '@/API/名片学院.js';
export default {
	data() {
		return {
			lineBg: lineBg,
			mySuffix: imgSuffix,
			current: 0,
			list3: [
				imgBaseUrl + 'edu_banner01.jpg' + imgSuffix[0],
				imgBaseUrl + 'edu_banner02.jpg' + imgSuffix[0],
				imgBaseUrl + 'edu_banner01.jpg' + imgSuffix[0]
			],
			eduList: [
				{
					id: 1,
					title: '555',
					img: imgBaseUrl + 'edu_banner01.jpg' + imgSuffix[1],
					desc: '的顶顶顶顶顶的顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶',
					type: 'dddd'
				},
				{
					id: 1,
					title: '555',
					img: imgBaseUrl + 'edu_banner01.jpg' + imgSuffix[1],
					desc: '的顶顶顶顶顶的顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶',
					type: 'dddd'
				}
			],
			screenList: [
				{ name: '推荐' },
				{ name: '名片点亮' },
				{ name: '名片装修' },
				{ name: '平台功能' },
				{ name: '功能介绍' }
			]
		};
	},
	onLoad() {
		this.getEduList();
	},
	methods: {
		getEduList(filterTag = null) {
			let para_body = {
				pageNum: null /**     string required:false */,
				pageSize: null /**     string required:false */,
				name: null /** 课程标题    string required:false */,
				present: null /** 课程介绍    string required:false */,
				filterTag: filterTag /** 筛选标题    string required:false */,
				status: null /** 状态(0:未审核,1:已通过,2:未通过)    string required:false */,
				exhibitTag: null /** 展示标题    string required:false */
			};

			apiBusinessCoursePage_Post(para_body).then(res => {
				this.eduList = res.data.data.records;
			});
		},
		goedu(e) {
			console.log(e);
			uni.navigateTo({
				url: 'edu_info?courseId=' + e.courseId
			});
		},
		tabChange(para) {
			if (this.current == para.index) return;
			this.current = para.index;
			if (para.index == 0) {
				this.getEduList();
			} else {
				this.getEduList(para.name);
			}
		}
	}
};
</script>

<style lang="scss">
page {
	background: #f1f1f1;
}
.page{
	height: 100%;
	width: 100%;
	position: relative;
	background-color: #f8f9fc;
	background-image: url(https://cdn.xiangcunmingpian.com/app/static/ruralBg3.jpg);
	background-position: 0 0;
	background-repeat: no-repeat;
	background-size: 100% auto;
}
.content_banner {
	margin: 30rpx 0rpx;
}
.content_list {
	margin: 30rpx;
	.list_edu {
		display: flex;
		margin: 20rpx 0;
		.img {
			width: 40%;
			image {
				border-radius: 15rpx;
				width: 100%;
			}
		}
		.info {
			width: 60%;
			padding: 0 20rpx;
			.title {
				font-size: 34rpx;
			}
			.map {
				font-size: 26rpx;
			}
		}
	}
}
</style>
