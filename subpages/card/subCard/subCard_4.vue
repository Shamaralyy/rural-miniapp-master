<!-- 我的页-->
<template>
	<view class="user">
		<!-- 背景图 -->
		<view :style="sysRoleLength == 0 ? [user_login] : []">
		<!-- <view :style="[user_login]"> -->
			<image
				:style="[imgStyle]"
				:src="imgSrc"
				:class="subPageData.isJoinRural ? 'top_bg' : 'bg_img'"
				mode="heightFix"
			></image>
		</view>

		<!-- 未加入 -->
		<nojoin
			:subData="{
				user_login: user_login,
				hellodesc: subPageData.hellodesc,
				hellotitle: subPageData.hellotitle,
				rural_info: subPageData.rural_info
			}"
			@reLoding="$emit('reLoding')"
			@toBuild="toBuild"
			v-if="subPageData.userInfo != null && sysRoleLength == 0"
		></nojoin>

		<!-- 没登录 -->
		<nologin
			:subData="{
				user_login: user_login,
				hellodesc: subPageData.hellodesc,
				hellotitle: subPageData.hellotitle
			}"
			@login="$emit('login', { router: 'card', page: 2 })"
			v-if="subPageData.userInfo == null && sysRoleLength == 0"
		></nologin>

		<!-- 登录+村里人 -->
		<joined
			v-if="subPageData.isJoinRural"
			:subData="{
				imgSrc,
				userInfo: subPageData.userInfo,
				pagesHeight: subPageData.pagesHeight,
				sysRole: subPageData.sysRole
			}"
			@toPage="toPage"
			@toBuild="toBuild"
			@newContentTap="$emit('newContentTap')"
		></joined>
		<!-- 底部标签 -->
		<view class="content_bottom">
			<text style="font-size: 28rpx;" @click="goHome">{{ subPageData.rural_info.name }} x 乡村名片</text>
		</view>
	</view>
</template>

<script>
const imgBaseUrl = getApp().globalData.imgBaseUrl + '/app/static/';
import nojoin from './subCard_4/nojoin.vue';
import joined from './subCard_4/joined.vue';
import nologin from './subCard_4/nologin.vue';
export default {
	components: {
		nojoin,
		joined,
		nologin
	},
	props: ['subPageData', 'imgSrc'],
	computed: {
		/* 获取权限长度 */
		sysRoleLength() {
			return Object.keys(this.subPageData.sysRole).length;
		},
		/* 动态图片背景样式 */
		imgStyle() {
			return this.subPageData.isJoinRural
				? { height: this.subPageData.pagesHeight - 0 + 'px' }
				: { height: this.subPageData.pagesHeight + 'px' };
		},

		/* 统一的一个动态样式 */
		user_login() {
			return {
				width: 100 + '%',
				position: 'relative',
				top: 0,
				display: 'flex',
				flexFlow: 'wrap',
				justifyContent: 'center'
			};
		}
	},
	methods: {
		goHome() {
			uni.switchTab({
				url: '/pages/index/index'
			});
		},
		toBuild(e) {
			this.$emit('toBuild', e);
		},
		toPage(para) {
			this.$emit('toPage', para);
		}
	}
};
</script>

<style scoped lang="scss">
.user{
	height: 100%;
}
.top_bg {
	width: 100%;
	position: fixed;
	top: 0;
	height: 100vh;
	z-index: -1;
	border-radius: 0rpx 0rpx 36rpx 36rpx;
	filter: blur(1px);
}
.top_bg::before {
	content: '';
	position: absolute;
	background: linear-gradient(to bottom, #e3eceb00, #f9f9f9);
	width: 100%;
	height: 100%;
	left: 0;
	bottom: 0;
	margin: 0;
	border-radius: 0rpx 0rpx 36rpx 36rpx;
}
.bg_img {
	width: 100%;
	position: absolute;
	border-radius: 0rpx 0rpx 30rpx 30rpx;
	z-index: -1;
}
.bg_img::before {
	content: '';
	position: absolute;
	background: linear-gradient(to bottom, #e3eceb, #f7f7f790);
	width: 100%;
	height: 100%;
	left: 0;
	bottom: 0;
	margin: 0;
	border-radius: 0rpx 0rpx 36rpx 36rpx;
}
.content_bottom {
	position: fixed;
	bottom: 12%;
	width: 100%;
	color: #4a4a4a;
	text-align: center;
	.button {
		display: flex;
		width: 25%;
		margin: 20rpx auto 40rpx auto;
		border-radius: 30rpx;
	}
}
</style>
