<template>
	<view class="page">
		<!-- 导航 -->
		<u-navbar :placeholder="true" title=" " bgColor="#ffffff" leftIconColor="#fff" :titleStyle="{ color: '#333' }">
			<view class="u-nav-slot_left" slot="left">
				<view class="name"><text>乡村好物管理</text></view>
			</view>
			<!-- <view class="u-nav-slot_right" slot="right"
				:style="'right:' + menuwidth + 'px;bottom:' + menuwidth / 11 + 'px'">
				<view class="title"><text @click="page=1">资讯预览</text></view>
			</view> -->
		</u-navbar>
		<!-- 导航  end-->

		<!-- 审核状态 -->
		<view class="content_subsection">
			<u-subsection
				@change="sectionChange()"
				:list="subsection"
				:current="curNow"
				activeColor="#2aae67"
			></u-subsection>
		</view>
		<!-- 审核状态 end -->

		<!-- 标签 -->
		<view class="content_tabs">
			<u-tabs :list="tabs" @change="clicktabs" :current="tabCurrent" lineColor="#2aae67">
				<view slot="right" style="padding-left: 4px" @click="goTag()">
					<u-icon name="setting" size="21"></u-icon>
				</view>
			</u-tabs>
		</view>
		<!-- 标签 -->

		<!-- 列表 -->
		<view class="content_news">
			<view class="news_list" v-for="(item, index) in news_list" :key="index" @click="goEdit(item)">
				<view class="album">
					<view class="avatar"><u-avatar :src="item.avatar" shape="square"></u-avatar></view>
					<view class="content">
						<u--text :text="item.nickName" size="16"></u--text>
						<u--text margin="10rpx 0 8px 0" :text="item.title"></u--text>
						<u--text :text="item.synopsis" size="12" margin="15rpx 0"></u--text>
						<u-album :urls="item.urls" keyName="url"></u-album>
						<u--text :text="item.tagName" size="12" margin="20rpx 0 0px 0"></u--text>
						<view class="right_top">
							<view class="" style="margin-left: 30rpx" v-if="item.status == 0">
								<u-button text="审核" size="small"></u-button>
							</view>
						</view>
						<!-- 单图模式、多图模式、单视频模式、图文模式、纯文字格式 -->
					</view>
				</view>
			</view>
		</view>
		<view class="button-text" style="height: 5vh;width: 100%;text-align: center;">{{ bottomStr }}</view>
		<!-- 列表 -->
		<view class="plus" @click="pluson()">
			<view><u-icon name="plus" color="#fff" size="18"></u-icon></view>
			<view><text>发布</text></view>
		</view>
	</view>
</template>

<script>
// const imgBaseUrl = getApp().globalData.imgBaseUrl + "/app" + "/static/";
import { apiBusinessCommodityTagTagLabel_Get } from '@/API/好物标签.js'; //标签
import { apiBusinessCommodityPage_Post } from '@/API/商品好物news.js'; //列表
import { buildData, buildMethods, buildComputed } from '@/components/mixins/buildMixins.js';
import { mapState} from 'vuex';
export default {
	mixins: [buildData, buildMethods, buildComputed],
	computed: {
		...mapState('build', ['currentRural'])
	},
	data() {
		return {};
	},
	onLoad(option) {
		this.Pageinput.cardId =
			option.cardid != undefined ? option.cardid : option.cardId != undefined ? option.cardId : -1;

		// 获取导航栏高度
		let menu = wx.getMenuButtonBoundingClientRect();
		this.menuwidth = menu.width + menu.width / 7;
	},
	methods: {
		goEdit(item) {
			uni.navigateTo({
				url: 'edit_service?commodityId=' + item.commodityId + '&cardId=' + this.Pageinput.cardId
			});
		},

		goTag() {
			uni.navigateTo({
				url: 'service_tag?cardId=' + this.Pageinput.cardId
			});
		},

		//标签
		mapTagList() {
			apiBusinessCommodityTagTagLabel_Get({
				cardId: this.Pageinput.cardId //名片
			}).then(res => {
				console.log('好物分类获取结果', res);
				if (res.data.code == 200) {
					this.tabs = res.data.data;
					this.tabs.unshift({
						infoTagId: null,
						name: '全部'
					});
				}
			});
		},

		//列表
		mapList() {
			this.loding();
			apiBusinessCommodityPage_Post({
				...this.pagePara,
				cardId: this.Pageinput.cardId, //乡村ID
				choiceness: this.Pageinput.choiceness, // 是否精选 1精选 0非精选
				tagId: this.Pageinput.tagId, //分类ID,
				status: this.Pageinput.status
			})
				.then(res => {
					if (res.data.code == 200) {
						if (!this.checkData(res.data.data.records, '好物')) {
							return;
						}
						let temp = res.data.data.records.reverse();
						temp.map((value, index) => {
							try {
								value.urls = JSON.parse(value.urls);
								value.urls = value.urls.map(vImg => {
									if (vImg.imgUrl) {
										return vImg.imgUrl;
									}
									return vImg.url;
								});
							} catch (e) {
								console.log('x value.urls解析失败', value.urls);
								//TODO handle the exception
							}
						});
						this.news_list = this.news_list.concat(temp);
						this.pageChange(res.data.data.records);
					}
				})
				.finally(() => {
					uni.hideLoading();
				});
		},

		pluson() {
			uni.navigateTo({
				url: '/subpages/card/card_service/add_service?cardId=' + this.Pageinput.cardId
			});
		}
	}
};
</script>

<style lang="scss">
page {
	background: #f1f1f1;
	height: 100%;
	width: 100%;
}

.page {
	height: 100%;
	width: 100%;
	position: relative;
}

input {
	background-color: #00000000 !important;
}

.u-nav-slot_left {
	display: flex;
	// background: #0006;
	padding: 10rpx 20rpx;
	// border-radius: 30rpx;
	color: #333;

	.name {
		font-size: 32rpx;
		// font-family: 'blosdd';
		font-family: 'SourceHanSerifCN-Bold';
	}

	.title {
		font-size: 26rpx;
		font-weight: 400;
	}
}

.u-nav-slot_right {
	display: flex;
	background: #0006;
	padding: 10rpx 20rpx;
	border-radius: 30rpx;
	color: #fff;
	position: absolute;
	width: max-content;
	height: 38rpx;
	line-height: 38rpx;

	.name {
		font-size: 28rpx;
		font-family: 'SourceHanSerifCN-Bold';
	}

	.title {
		font-size: 26rpx;
		font-weight: 400;
	}
}

//背景图片
.top_bg {
	width: 100%;
	position: fixed;
	top: 0;
	z-index: -1;

	.box {
		position: absolute;
		background: #2aae67;
		z-index: 1;
		top: 0;
		height: 300rpx;
		width: 100%;
		overflow: hidden;
	}
}

.content_menu {
	display: flex;
	margin: 25rpx 25rpx 0rpx 25rpx;
	flex-flow: column;
	justify-content: space-between;

	.menu_list {
		display: flex;
		justify-content: space-between;
		padding: 40rpx;
		border-radius: 20rpx;
		background: #fff;
		margin-bottom: 20rpx;

		.list_info {
			.title {
				font-size: 34rpx;
				font-family: 'SourceHanSerifCN-Bold';
				margin: 8rpx 0;
			}

			.desc {
				font-size: 26rpx;
			}
		}

		.list_url {
			display: flex;
			flex-direction: column;
			justify-content: center;
			font-size: 28rpx;
		}
	}
}

.content_subsection {
	margin: 30rpx 25rpx 0rpx 25rpx;
}

.content_tabs {
	margin: 10rpx 25rpx 25rpx 25rpx;
}

.content_news {
	display: flex;
	margin: 25rpx;
	flex-flow: column;
	justify-content: space-between;

	.news_list {
		display: flex;
		justify-content: space-between;
		padding: 40rpx 30rpx;
		border-radius: 20rpx;
		background: #fff;
		margin-bottom: 20rpx;
		position: relative;

		.right_top {
			position: absolute;
			right: 30rpx;
			top: 40rpx;
			display: flex;
			font-size: 26rpx;
		}

		.album {
			@include flex;
			align-items: flex-start;

			.avatar {
				background-color: $u-bg-color;
				border-radius: 3px;
			}

			.content {
				margin-left: 10px;
				flex: 1;
			}
		}
	}
}

.plus {
	position: fixed;
	bottom: 120rpx;
	right: 30rpx;
	background: #07b60590;
	font-size: 26rpx;
	padding: 20rpx;
	border-radius: 40rpx;
	color: #fff;
	display: flex;
	flex-direction: column;
	text-align: center;
	align-items: center;
	z-index: 10;
	box-shadow: 0 6rpx 18rpx #eee;
}
</style>
