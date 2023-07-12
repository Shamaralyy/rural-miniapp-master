<template>
	<view class="page">
		<!-- 导航 -->
		<u-navbar :placeholder="true" title=" " bgColor="#ffffff" leftIconColor="#fff" :titleStyle="{ color: '#333' }">
			<view class="u-nav-slot_left" slot="left">
				<view class="name"><text>名片留言功能</text></view>
			</view>
			<view
				class="u-nav-slot_right"
				slot="right"
				:style="'right:' + menuwidth + 'px;bottom:' + menuwidth / 11 + 'px'"
			>
				<view class="title">
					<u-switch
						v-model="messageShow"
						@change="msgChange"
						size="22"
						activeColor="#04c354"
						inactiveColor="rgb(230, 230, 230)"
					></u-switch>
				</view>
			</view>
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

		<!-- 列表 -->
		<view class="content_news">
			<view class="news_list" v-for="(item, index) in news_list" :key="index">
				<view class="album">
					<view class="avatar"><u-avatar :src="item.avatar" shape="square"></u-avatar></view>
					<view class="content">
						<u--text :text="item.nickname" size="16"></u--text>
						<u--text :text="'留言内容：' + item.msg" size="12" margin="15rpx 0"></u--text>
						<view class="right_top">
							<view class="" style="margin-left: 30rpx" v-if="item.status == 0">
								<u-button text="通过" size="small" @click="submit(1, item)"></u-button>
								<u-button text="驳回" size="small" @click="submit(2, item)"></u-button>
							</view>
							<view class="" style="margin-left: 30rpx" v-if="item.status == 1 || item.status == 2">
								<u-button text="审核" size="small" @click="submit(0, item)"></u-button>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
// const imgBaseUrl = getApp().globalData.imgBaseUrl + "/app" + "/static/";
import { apiBusinessCardEdit_Put } from '@/API/乡村名片.js';
import { apiDevBusinessMsgPage_Post, devBusinessMsgEdit_Put } from '@/API/留言.js'; //查询留言
import { buildData, buildMethods, buildComputed } from '@/components/mixins/buildMixins.js';
import { mapState } from 'vuex';
export default {
	mixins: [buildData, buildMethods, buildComputed],
	computed: {
		...mapState('build', ['currentRural'])
	},
	data() {
		return {
			//对应card页的is_msg字段
			messageShow: false
		};
	},
	onLoad(option) {
		this.Pageinput.cardId =
			option.cardid != undefined ? option.cardid : option.cardId != undefined ? option.cardId : -1;

		// 获取导航栏高度
		let menu = wx.getMenuButtonBoundingClientRect();
		this.menuwidth = menu.width + menu.width / 7;
	},
	onReady() {
		this.messageShow = this.currentRural.isMsg == 1 ? true : false;
	},
	methods: {
		msgChange(e) {
			console.log('状态', e);
			let isMsg = e ? 1 : 0;
			apiBusinessCardEdit_Put({
				isMsg,
				cardId: this.currentRural.cardId
			}).then(res => {
				console.log('更新请求结果', res);
				if (res.data.code == 200) {
					this.$store.commit('build/setBulletChat', isMsg);
				}
			});
		},
		//列表
		mapList() {
			let devBusinessMsgPage_Param = {
				pageNum: null /**     string required:false */,
				pageSize: 1000 /**     string required:false */,
				status: this.Pageinput.status,
				ruralCardId: this.Pageinput.cardId /** 名片id    string required:false */
			};

			apiDevBusinessMsgPage_Post(devBusinessMsgPage_Param).then(res => {
				console.log('留言结果', res);
				if (res.data.code == 200 && res.data.data.records) {
					this.news_list = res.data.data.records;
				}
			});
		},
		mapTagList() {},
		submit(type, target) {
			console.log('类型', type, '数据', target);
			let para_body = {
				ruralCardId: this.Pageinput.cardId /** 乡村id   integer required: */,
				msg: target.msg /** 留言内容   string required: */,
				leaMsgId: target.leaMsgId /** $column.columnComment   integer required: */,
				reviewerStatus: type /** 状态(0:未审核,1:已通过,2:未通过)   integer required: */,
				avatar: target.avatar,
				status: type
			};
			devBusinessMsgEdit_Put(para_body).then(res => {
				console.log('修改结果', res);
				if (res.data.code == 200) {
					this.news_list = this.news_list.filter(value => {
						return value.leaMsgId != target.leaMsgId;
					});
				}
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
		font-family: 'SourceHanSerifCN-Medium';
		font-family: 'SourceHanSerifCN-Bold';
	}

	.title {
		font-size: 26rpx;
		font-weight: 400;
	}
}

.u-nav-slot_right {
	display: flex;
	// background: #0006;
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
