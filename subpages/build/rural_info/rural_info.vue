<template>
	<view class="page">
		<u-navbar
			:autoBack="true"
			:placeholder="true"
			:title="currentRural.name + '基本信息'"
			bgColor="#ffffff"
			leftIconColor="#303030"
			:titleStyle="{ color: '#303030' }"
		></u-navbar>
		<view class="content_menu">
			<view class="menu_list" v-for="(item, index) in menu_list" :key="index" @click="menuclick(item)">
				<view class="list_info">
					<view class="title">
						<text>{{ item.title }}</text>
					</view>
					<view class="desc">
						<text>{{ item.desc }}</text>
					</view>
				</view>
				<view class="list_url">
					<view class="">
						<text v-if="item.type == 0">修改></text>
						<u-button
							v-if="item.type == 1"
							text="完善信息"
							shape="circle"
							:customStyle="{ background: '#2aae67' }"
							color="#fff"
						></u-button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { mapState } from 'vuex';
export default {
	data() {
		return {
			bannerimg: [
				// 'https://cdn.xiangcunmingpian.com/app/static/index_banner_2.jpg',
				'https://cdn.xiangcunmingpian.com/app/static/-imagery-animation.gif'
			],
			menuwidth: 0,
			show: false,
			menu_list: [
				{
					id: 0,
					title: '乡村名称',
					desc: '本村对外展示的名称',
					type: 0,
					key: 'name',
					url: 'info_edit'
				},
				{
					id: 0,
					title: '乡村简介',
					desc: '简单介绍下本村吧',
					type: 1,
					key: 'synopsis',
					url: 'info_edit'
				},
				{
					id: 0,
					title: '乡村详细信息',
					desc: '本村宣传的详细信息介绍',
					type: 1,
					key: 'details',
					url: 'info_edit'
				},
				// {
				// 	id: 0,
				// 	title: '名片标签',
				// 	desc: '名片介绍展示标签',
				// 	type: 1,
				// 	key: 'tags',
				// 	url: 'info_edit'
				// },
				// {
				// 	id: 0,
				// 	title: '名片魔方导航编辑',
				// 	desc: '本村首页魔方导航修改',
				// 	type: 1,
				// 	key: 'name',
				// 	url: 'info_navmagic'
				// },
				{
					id: 1,
					title: '本村轮播图片',
					desc: '用于乡村名片的轮播大图',
					type: 1,
					key: 'images',
					url: 'info_banner'
				}
				// {
				// 	id: 4,
				// 	title: '本村坐标位置',
				// 	desc: '设置可导航到本村的位置',
				// 	type: 0,
				// 	key: 'map',
				// 	url: 'info_map'
				// }
			]
		};
	},
	computed: {
		...mapState('build', ['currentRural'])
	},

	onLoad() {
		// 获取导航栏高度
		let menu = wx.getMenuButtonBoundingClientRect();
		this.menuwidth = menu.width + menu.width / 7;
	},
	methods: {
		menuclick(e) {
			if (e.key != '') {
				this.$store.commit('build/setEditKey', e.key);
			}
			if (e.key == 'name' && this.currentRural.status == 1) {
				console.log('企图改名');
				this.errTip();
				return;
			}
			uni.navigateTo({
				url: e.url
			});
		},
		errTip() {
			uni.showModal({
				title: '提醒',
				content: `村庄已上线，无法改名。如有需要请联系客服进行改名`,
				showCancel: false,
				confirmColor: '#04c354',
				confirmText: '我知道了'
			});
		}
	},
	onShow() {
		console.log('显示数据', this.currentRural);
		if (this.currentRural.synopsis != null) {
			this.menu_list[1].type = 0;
		}
		if (this.currentRural.details != null) {
			this.menu_list[2].type = 0;
		}
		if (this.currentRural.images != null) {
			this.menu_list[4].type = 0;
		}
		if (this.currentRural.navigationJson != null) {
			this.menu_list[3].type = 0;
		}
	},
	onUnload() {
		this.$store.commit('build/setEditKey', null);
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
	margin: 25rpx;
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
</style>
