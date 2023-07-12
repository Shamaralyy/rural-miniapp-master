<template>
	<view class="page">
		<u-navbar :autoBack="true" :placeholder="true" title="乡村全景管理" bgColor="#ffffff" leftIconColor="#303030" :titleStyle="{ color: '#303030' }"></u-navbar>
		<view class="content_menu">
			<view class="menu_list">
				<view class="list_info">
					<view class="title"><text>乡村地图</text></view>
					<view class="desc"><text>乡村秒变智慧景区</text></view>
				</view>
				<view class="list_url">
					<view class=""><text>地图预览></text></view>
				</view>
			</view>
		</view>
		<view class="content_subsection"><u-subsection :list="subsection" :current="curNow" @change="sectionChange" activeColor="#2aae67"></u-subsection></view>
		<view class="content_tabs">
			<u-tabs :list="tabs" @click="clicktabs()" lineColor="#2aae67">
				<view slot="right" style="padding-left: 4px;" @tap="$u.toast('插槽被点击')"><u-icon name="setting" size="21"></u-icon></view>
			</u-tabs>
		</view>
		<view class="content_news">
			<view class="news_list" v-for="(item, index) in news_list" :key="index">
				<view class="album">
					<view class="avatar"><u-avatar :src="item.avatar" shape="square"></u-avatar></view>
					<view class="content">
						<u--text :text="item.author" size="16"></u--text>
						<u--text margin="10rpx 0 8px 0" :text="item.desc"></u--text>
						<u-album :urls="item.img" keyName="src2"></u-album>
						<u--text text="2022-4-24 - 乡村文化" size="14" margin="20rpx 0 0px 0"></u--text>
						<view class="right_top">
							<view class=""><u--text text="驳回" type="warning" size="16"></u--text></view>
							<view class="" style="margin-left: 30rpx;"><u--text text="通过" type="success" size="16"></u--text></view>
						</view>
						<!-- 单图模式、多图模式、单视频模式、图文模式、纯文字格式 -->
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
const imgBaseUrl = getApp().globalData.imgBaseUrl + '/app' + '/static/';
export default {
	data() {
		return {
			bannerimg: [
				// 'https://cdn.xiangcunmingpian.com/app/static/index_banner_2.jpg',
				imgBaseUrl + 'wayback-imagery-animation.gif'
			],
			subsection: ['待审核', '已通过', '已驳回'],
			curNow: 0,
			menuwidth: 0,
			show: false,
			news_list: [
				{
					id: 0,
					title: '乡村基本信息',
					desc: '本村宣传基础信息介绍',
					img: [
						'https://cdn.uviewui.com/uview/album/1.jpg',
						'https://cdn.uviewui.com/uview/album/2.jpg',
						'https://cdn.uviewui.com/uview/album/3.jpg',
						'https://cdn.uviewui.com/uview/album/4.jpg',
						'https://cdn.uviewui.com/uview/album/5.jpg',
						'https://cdn.uviewui.com/uview/album/6.jpg',
						'https://cdn.uviewui.com/uview/album/7.jpg',
						'https://cdn.uviewui.com/uview/album/8.jpg',
						'https://cdn.uviewui.com/uview/album/9.jpg',
						'https://cdn.uviewui.com/uview/album/10.jpg'
					],
					author: '颂超',
					avatar: imgBaseUrl + 'avatar.jpg'
				},
				{
					id: 1,
					title: '乡村基本信息',
					desc: '本村宣传基础信息介绍',
					img: ['https://cdn.uviewui.com/uview/album/1.jpg'],
					author: '颂超',
					avatar: imgBaseUrl + 'avatar.jpg'
				},
				{
					id: 2,
					title: '乡村基本信息',
					desc: '本村宣传基础信息介绍',
					img: ['https://cdn.uviewui.com/uview/album/1.jpg', 'https://cdn.uviewui.com/uview/album/2.jpg'],
					author: '颂超',
					avatar: imgBaseUrl + 'avatar.jpg'
				},
				{
					id: 3,
					title: '本村产业信息',
					desc: '完善本村产业基础的信息',
					type: 0,
					url: '',
					author: '颂超',
					avatar: imgBaseUrl + 'avatar.jpg'
				},
				{
					id: 4,
					title: '本村坐标位置',
					desc: '设置可导航到本村的位置',
					type: 0,
					url: '',
					author: '颂超',
					avatar: imgBaseUrl + 'avatar.jpg'
				}
			],
			tabs: [
				{
					name: '全部'
				},
				{
					name: '乡村文化'
				},
				{
					name: '乡村活动'
				},
				{
					name: '乡村资讯'
				},
				{
					name: '乡村图集'
				}
			],
			albumWidth: 0,
			urls1: [
				{
					src2: 'https://cdn.uviewui.com/uview/album/1.jpg'
				}
			],
			urls2: [
				'https://cdn.uviewui.com/uview/album/1.jpg',
				'https://cdn.uviewui.com/uview/album/2.jpg',
				'https://cdn.uviewui.com/uview/album/3.jpg',
				'https://cdn.uviewui.com/uview/album/4.jpg',
				'https://cdn.uviewui.com/uview/album/5.jpg',
				'https://cdn.uviewui.com/uview/album/6.jpg',
				'https://cdn.uviewui.com/uview/album/7.jpg',
				'https://cdn.uviewui.com/uview/album/8.jpg',
				'https://cdn.uviewui.com/uview/album/9.jpg',
				'https://cdn.uviewui.com/uview/album/10.jpg'
			]
		};
	},
	onLoad() {
		// 获取导航栏高度
		let menu = wx.getMenuButtonBoundingClientRect();
		this.menuwidth = menu.width + menu.width / 7;
	},
	methods: {}
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
	background: #0006;
	padding: 10rpx 20rpx;
	border-radius: 30rpx;
	color: #fff;
	.name {
		font-size: 28rpx;
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
	width: 100rpx;
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
	margin: 0rpx 25rpx 0rpx 25rpx;
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
</style>
