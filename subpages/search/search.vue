<template>
	<view>
		<view class="content">
			<view class="content_search">
				<u-search
					placeholder="输入乡村名称搜索"
					:showAction="false"
					bgColor="#fff"
					shape="square"
					:focus="true"
					v-model="search_name"
					height="42"
					@search="getsearch(false)"
				></u-search>
				<text style="margin-left: 30rpx;" @click="goRural()">省份地区筛选</text>
			</view>
			<view class="content_hot" v-if="rural_list.length == 0">
				<view class="hot_title"><text>热门搜索</text></view>
				<view class="hot_list">
					<view class="list" v-for="(item, index) in hotList" :key="index" @click="goCard(item)">
						<text>{{ item.name }}</text>
					</view>
				</view>
			</view>
			<view class="content_list" v-for="(item, index) in rural_list" :key="index">
				<view class="info_left">
					<view class="title">
						<text>{{ item.lowerAddr[3].name }}{{ item.name }}</text>
					</view>
					<view class="map">
						<text>
							{{ item.lowerAddr[0].name }}{{ item.lowerAddr[1].name }}{{ item.lowerAddr[2].name }}
						</text>
					</view>
				</view>
				<view class="info_right">
					<text v-if="item.property == 1" @click="go(item)" style="background: #67c71dd9;color: #fff;">
						进入
					</text>
					<text v-if="item.property != 1" @click="go(item)">点亮</text>
				</view>
			</view>
			<view class="bottomTip" v-show="isNoMore" @click="goRural()">
				<text>没有找到我的村?点击尝试用地区筛选</text>
			</view>
		</view>
		<u-back-top :scroll-top="scrollTop"></u-back-top>
	</view>
</template>

<script>
import { uniTrim } from '@/utils/Utils-tool.js';
import { apiBusinessAddrRecursionSearch_Post } from '@/API/五级联动地址数据.js';
import { apiBusinessCardPage_Post, apiBusinessCardMyRural_Get } from '@/API/乡村名片.js';
const imgBaseUrl = getApp().globalData.imgBaseUrl + '/app' + '/static/';
export default {
	data() {
		return {
			search_name: '',
			rural_list: [],
			hotList: [],
			isNoMore: false, //是否还有更多
			para_body: {
				pageNum: 1 /**     string required:false */,
				pageSize: 10 /**     string required:false */,
				keyword: '' /** 关键字, 可为空,为空不筛选    string required:false */,
				level: 5 /** 筛选第几级的数据,可为空默认第五级    string required:false */
			},
			scrollTop: 0
		};
	},
	onPageScroll(e) {
		this.scrollTop = e.scrollTop;
	},
	onLoad() {
		this.getHotList();
	},
	watch: {
		/* 检测输入 并更新请求体 */
		search_name(newValue) {
			if (uniTrim(newValue) != '') {
				// 输入有效字符串
				this.para_body.keyword = uniTrim(newValue);
			} else {
				// 输入无效字符串
				this.rural_list = [];
			}
		}
	},
	onReachBottom() {
		if (this.rural_list.length == 0) return;
		if (this.isNoMore) return;
		this.getsearch(true);
	},
	methods: {
		go(e) {
			//获取列表中数据
			if (e.property == 1) {
				apiBusinessCardPage_Post({
					addrId: e.id,
					sortType: 1,
					status: null
				}).then(res => {
					console.log('乡村结果', res.data);
					uni.navigateTo({ url: '/subpages/card/card?cardId=' + res.data.data.records[0].cardId });
					return;
				});
			}
			if (e.property == 0) {
				uni.navigateTo({
					url: '/subpages/myrural/rural_add?upid=' + e.parentCode + '&ruralid=' + e.id
				});
			}
		},
		goCard(e) {
			uni.navigateTo({
				url: '/subpages/card/card?cardId=' + e.cardId
			});
		},
		goRural() {
			uni.showLoading({ title: '跳转中' });
			uni.navigateTo({
				url: '/subpages/myrural/myrural?type=map'
			});
			uni.hideLoading();
		},
		getHotList() {
			apiBusinessCardPage_Post({
				sortType: 1,
				searchLabel: '搜索'
			}).then(res => {
				return new Promise((resolve, reject) => {
					console.log('获取列表数据', res);
					if (res.data.code == 200) {
						//请求成功 增加请求体页数
						this.hotList = res.data.data.records;
					}
				});
			});
		},
		/**执行搜索
		 * state 执行状态
		 * 	|-true 翻页加载
		 * 	|-false 第一页 缺省项
		 * */
		async getsearch(state = false) {
			if (this.search_name == '工具页') {
				uni.navigateTo({
					url: '/subpages/build/rural_info/tools'
				});
				return;
			}
			if (this.search_name == '手绘地图') {
				uni.navigateTo({
					url: '/subpages/testPage/testMap'
				});
				return;
			}
			if (this.search_name == '菜单编辑') {
				uni.navigateTo({
					url: '/subpages/build/rural_diy/diy_menu'
				});
				return;
			}
			if (this.search_name == '栏目测试') {
				uni.navigateTo({
					url: '/subpages/card/card_news/news_column'
				});
				return;
			}
			if (this.search_name == 'AR') {
				uni.navigateTo({
					url: '/arservice/pages/imcar/index?tag=4C7P9HSB'
				});
				return;
			}
			uni.showLoading({ title: '加载中' });
			if (uniTrim(this.search_name) == '') return;
			if (!(await this.safe_dataContentCheck(this.search_name))) {
				return;
			}
			let para_body;
			if (state) {
				this.para_body.pageNum++;
			} else {
				this.isNoMore = false;
				this.rural_list = [];
				this.para_body.pageNum = 1;
			}
			para_body = this.para_body;
			apiBusinessAddrRecursionSearch_Post(para_body)
				.then(res => {
					console.log(res.data.data.records);
					let newList = res.data.data.records;

					this.rural_list = this.rural_list.concat(newList);
					if (newList == 0 && this.para_body.pageNum != 1) {
						this.isNoMore = true;
						this.para_body.pageNum--;
						uni.showToast({ icon: 'none', title: '没有更多了' });
					} else if (newList == 0 && this.para_body.pageNum == 1) {
						this.isNoMore = true;
						this.para_body.pageNum--;
						uni.showToast({ icon: 'none', title: '没有找到，请用地区筛选' });
					} else {
						uni.showToast({
							icon: 'none',
							title: '加载成功'
						});
					}
					if (newList.length != this.para_body.pageSize) {
						this.isNoMore = true;
					}
				})
				.finally(() => {
					uni.hideLoading();
				});
		}
	}
};
</script>

<style lang="scss">
//背景图片
page {
	background: #f1f1f1;
}

.content {
	margin: 30rpx;
	.content_search {
		margin-bottom: 20rpx;
		display: flex;
		align-items: center;
	}
	.content_hot {
		display: flex;
		flex-direction: column;

		.hot_title {
			margin: 20rpx 0rpx;
		}
		.hot_list {
			display: flex;
			flex-wrap: wrap;
			// object-position: left;
			justify-content: flex-start;
			.list {
				padding: 8rpx 10rpx;
				background: #fff;
				border-radius: 30rpx;
				font-size: 26rpx;
				margin: 20rpx 20rpx 0rpx 0rpx;
			}
		}
	}
	.content_list {
		display: flex;
		margin-bottom: 20rpx;
		padding: 40rpx;
		background: #fff;
		border-radius: 20rpx;
		justify-content: space-between;
		.info_left {
			width: 90%;
			.title {
				font-size: 38rpx;
				font-weight: 500;
				margin-bottom: 14rpx;
			}
			.map {
				font-size: 26rpx;
			}
		}
		.info_right {
			display: flex;
			align-items: center;
			text {
				background: #f1f1f1;
				padding: 10rpx 20rpx;
				border-radius: 30rpx;
				font-size: 24rpx;
				width: max-content;
			}
			.on {
				background: #f1f1f1;
				color: #fff;
			}
		}
	}
	.bottomTip {
		font-size: 28rpx;
		width: 100%;
		height: 40px;
		text-align: center;
		line-height: 40px;
		color: #333;
	}
}
</style>
