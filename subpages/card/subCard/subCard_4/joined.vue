<!-- user 已加入 -->
<template>
	<view>
		<u-navbar
			title="个人中心"
			:placeholder="true"
			leftIcon="grid"
			bgColor="#ffffff00"
			leftIconColor="#fff"
			:titleStyle="{ color: '#fff' }"
		>
			<view class="nav-left" slot="left"><view class="title" @click="$emit('toBuild', 0)">名片装修</view></view>
		</u-navbar>
		<view class="user_info">
			<view class="avatar"><u-avatar :src="subData.userInfo.avatar" size="58" shape="square"></u-avatar></view>
			<view class="info">
				<view class="name">
					<text>{{ subData.userInfo.nickName }}</text>
				</view>
				<view class="user_tag">
					<view class="tag_name" v-if="subData.userInfo">
						<text v-if="subData.sysRole.roleId == 103">乡村管理员</text>
						<text v-if="subData.sysRole.roleId == 102">乡村共建者</text>
						<text v-if="subData.sysRole.roleId == 101">乡村村民</text>
						<text v-if="subData.sysRole.roleId == 100">乡村游客</text>
					</view>
				</view>
			</view>
		</view>

		<!-- 共建内容菜单 -->
		<view class="content_grid" :class="[bigSizeFontClass('bigSize_content_grid')]">
			<view class="grid_nav">
				<view class="title"><text>共建内容</text></view>
				<view class="more"><text @click="$emit('newContentTap')">参与共建</text></view>
			</view>
			<view class="grid_content">
				<u-grid :border="false" col="4">
					<u-grid-item
						v-for="(baseListItem, baseListIndex) in baseList"
						:key="baseListIndex"
						@click="toPage(baseListItem)"
					>
						<u-icon :customStyle="{ paddingTop: 35 + 'rpx' }" :name="baseListItem.name" :size="26"></u-icon>
						<text class="grid-text">{{ baseListItem.title }}</text>
					</u-grid-item>
				</u-grid>
			</view>
		</view>
		<view class="content_grid" :class="[bigSizeFontClass('bigSize_content_grid')]">
			<view class="grid_nav">
				<view class="title"><text>其他功能</text></view>
			</view>
			<view class="grid_content">
				<u-grid :border="false" col="4">
					<u-grid-item
						v-for="(baseListItem, baseListIndex) in entryList"
						:key="baseListIndex"
						@click="toPage(baseListItem)"
					>
						<u-icon :customStyle="{ paddingTop: 35 + 'rpx' }" :name="baseListItem.name" :size="22"></u-icon>
						<text class="grid-text">{{ baseListItem.title }}</text>
					</u-grid-item>
				</u-grid>
			</view>
		</view>
	</view>
</template>

<script>
const imgBaseUrl = getApp().globalData.imgBaseUrl + '/app';
export default {
	name: 'joined',
	props: ['subData'],
	data() {
		return {
			baseList: [
				{
					name: `${imgBaseUrl}/static/rural_home_nav1.png`,
					title: '当地风采',
					url: '/subpages/card/card_photo/photo_list'
				},
				{
					name: `${imgBaseUrl}/static/rural_home_nav2.png`,
					title: '当地资讯',
					url: '/subpages/card/card_news/news_list'
				},
				{
					name: `${imgBaseUrl}/static/rural_home_nav4.png`,
					title: '当地位置',
					url: '/subpages/card/card_map/map_list'
				},
				{
					name: `${imgBaseUrl}/static/rural_home_nav7.png`,
					title: '好物服务',
					url: '/subpages/card/card_service/service_list'
				}
			],
			//  功能入口列表
			entryList: [
				{ name: 'account', title: '我的信息', url: '/subpages/user/user_info/user_info' },
				{ name: 'bookmark', title: '名片学院', url: '/subpages/edu/edu' },
				{ name: 'kefu-ermai', title: '使用帮助', url: '/subpages/user/qa' },
				{ name: 'setting', title: '设置', url: '/subpages/user/user_setting/user_setting' }
			]
		};
	},
	methods: {
		toPage(para) {
			if (para.url.indexOf('user_info/user_info') != -1) {
				console.log('当前', this.$store.state.login.toPageType);
				this.$store.commit('login/setToPageType', true);
				console.log('当前', this.$store.state.login.toPageType);
			} else if (para.url.indexOf('user_setting/user_setting') != -1) {
				this.$store.commit('login/setToLoginType', { router: 'card', page: 0 });
			}
			this.$emit('toPage', para);
		}
	}
};
</script>

<style scoped lang="scss">
.nav-left {
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
.user_info {
	display: flex;
	margin: 10% 30rpx 40rpx 30rpx;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	.avatar {
		align-self: center;
	}

	.info {
		display: flex;
		flex-direction: column;
		margin-top: 20rpx;
		align-items: center;
		.name {
			font-size: 38rpx;
			font-family: 'SourceHanSerifCN-Bold';
			color: #333;
		}
		.user_tag {
			display: flex;
			margin-top: 14rpx;
			font-size: 28rpx;
			color: #444;
			.tag_name {
				margin-right: 12rpx;
			}
		}
		.phone {
			font-size: 26rpx;
		}
	}
}
.content_grid {
	margin: 20rpx 30rpx;
	padding: 30rpx;
	background: #ffffffc4;
	border-radius: 20rpx;
	.grid_nav {
		display: flex;
		width: 100%;
		justify-content: space-between;
		margin-bottom: 10rpx;
		align-items: center;
		.title {
			font-size: 30rpx;
			font-family: 'SourceHanSerifCN-Bold';
		}
		.more {
			font-size: 26rpx;
			padding: 3rpx 10rpx;
			border: 1rpx #0006 solid;
			border-radius: 30rpx;
			color: #333;
		}
	}
	.grid_content {
		.grid-text {
			font-size: 24rpx;
			color: #232426;
			padding: 20rpx 0 20rpx 0rpx;
		}
	}
}
.bigSize_content_grid.content_grid {
	.grid_nav {
		.title {
			font-size: 34rpx;
			font-family: 'SourceHanSerifCN-Bold';
		}
		.more {
			font-size: 30rpx;
		}
	}
	.grid_content {
		.grid-text {
			font-size: 28rpx;
		}
	}
}
</style>
