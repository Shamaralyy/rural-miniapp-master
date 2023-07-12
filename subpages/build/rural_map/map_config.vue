<template>
	<view>
		<u-navbar
			:title="'向导配置'"
			:autoBack="true"
			:placeholder="true"
			bgColor="#ffffff00"
			leftIconColor="#000"
			:titleStyle="{ color: '#000' }"
		>
			<view
				class="u-nav-slot_right"
				slot="right"
				:style="'right:' + menuwidth + 'px;bottom:' + menuwidth / 11 + 'px'"
				@click="submit"
			>
				<view class="title"><text>保存</text></view>
			</view>
		</u-navbar>
		<view class="content_form">
			<view class="form_list">
				<view class="title"><text>地图默认层级</text></view>
				<view class="info">
					<u--input
						placeholder="请输入好物名称"
						border="surround"
						maxlength="10"
						@change="check"
						v-model="newsTitle"
					></u--input>
				</view>
			</view>
			<view class="form_list">
				<view class="title"><text>地图默认类型</text></view>
				<view class="info">
					<u--input
						placeholder="请输入好物名称"
						border="surround"
						maxlength="10"
						@change="check"
						v-model="newsTitle"
					></u--input>
				</view>
			</view>
			<view class="form_list">
				<view class="title"><text>显示天气预报</text></view>
				<view class="info">
					<u--input
						placeholder="请输入好物名称"
						border="surround"
						maxlength="10"
						@change="check"
						v-model="newsTitle"
					></u--input>
				</view>
			</view>
			<view class="form_list">
				<view class="title"><text>显示天气预报</text></view>
				<view class="info">
					<u--input
						placeholder="请输入好物名称"
						border="surround"
						maxlength="10"
						@change="check"
						v-model="newsTitle"
					></u--input>
				</view>
			</view>
			<view class="form_list">
				<view class="title"><text>是否显示公告</text></view>
				<view class="info">
					<u--textarea v-model="introduce" @input="check" placeholder="请输入好物简介"></u--textarea>
				</view>
			</view>
			<view class="form_list">
				<view class="title"><text>公告通知</text></view>
				<view class="info">
					<u--textarea v-model="introduce" @input="check" placeholder="请输入好物简介"></u--textarea>
				</view>
			</view>
			<view class="form_list">
				<view class="title"><text>公告通知</text></view>
				<view class="info">
					<u--textarea v-model="introduce" @input="check" placeholder="请输入好物简介"></u--textarea>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
// 当前这个页面一进来肯定是要拿这个村的信息、包括位置标签列表
// 引入SDK核心类
import { mapState } from 'vuex';
const imgBaseUrl = getApp().globalData.imgBaseUrl + '/app/static/';
import { apiBusinessCardInfo_Get } from '@/API/乡村名片.js';
import { getDefault_mapJson } from '@/utils/defaultData.js';
export default {
	data() {
		return {
			rural_name: '',
			disabled: true, //按钮置灰
			cardId: 0, // 传过来的乡村id
			rural_info: [],
			pagesWidth: 0,
			menuwidth: 0,
			latitude: '',
			newsTitle: '', //位置名称
			introduce: '', //位置介绍
			mapJson:null
		};
	},
	computed: {
		...mapState('build', ['currentRural'])
	},
	onLoad: function(option) {
		var that = this;
		console.log(this.mapJson)
		this.cardId = option.cardId ? option.cardId : option.cardid;
		uni.getSystemInfo({
			success: function(res) {
				let menu = wx.getMenuButtonBoundingClientRect();
				that.menuwidth = menu.width + menu.width / 7;
				that.pagesWidth = res.windowWidth;
				console.log(that.menuwidth);
			}
		});
	},
	onReady() {
		try {
			if (this.currentRural.theme_json != null) {
				this.mapJson = JSON.parse(this.currentRural.theme_json);
			} else {
				this.mapJson = getDefault_mapJson()
				console.log(this.mapJson)
			}
		} catch (e) {
			console.log('地图配置数据渲染失败，使用默认数据');
		}
	},
	methods: {
	},
	// 生命周期 - 挂载完成（可以访问DOM元素）
	mounted() {
		
	}
};
</script>

<style lang="scss">
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

.content_form {
	display: flex;
	flex-direction: column;
	margin: 30rpx;
	.form_list {
		display: flex;
		justify-content: space-between;
		padding-bottom: 20rpx;
		align-items: center;
		border-bottom: 1rpx #f7f7f7 solid;
		margin-top: 30rpx;
		.title {
		}
		.info {
			align-items: right;
			width: 70%;
		}
		.right {
			text-align: right;
		}
	}
	.up {
		flex-flow: column;
		align-items: baseline;
		.title {
			margin-bottom: 20rpx;
		}
	}
}
.button {
	margin: 50rpx 30rpx;
}
</style>
