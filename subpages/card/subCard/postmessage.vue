<!--
 * @Description: 留言组件
 * @Date: 2022-05-28 16:48:24
 * @LastEditTime: 2022-06-02 17:54:28
 * @FilePath: \rural-miniapp\pages\card\subCard\postmessage.vue
-->
<template>
	<u-popup :show="postmessageclick.shoiuwe" round="16" mode="bottom" closeable="true" @close="$emit('clickState', false)">
		<view class="camter">
			<view class="title">
				<text>给乡村留言祝福</text>
			</view>
			<u--input
				placeholder="请输入内容(不超过十个文字)"
				maxlength="10"
				border="surround"
				v-model="value"
			></u--input>
			<view class="button">
				<u-button
					color="#56a96e"
					text="留言"
					@click="checkInput"
					:disabled="disabled"
					v-model="value"
				></u-button>
			</view>
		</view>
	</u-popup>
</template>
<script>
import {
	apiDevBusinessMsgAdd_Post, //新增留言
	devBusinessMsgAdd_Post
} from '@/API/留言.js';

import { uniTrim } from '@/utils/Utils-tool.js';
export default {
	data() {
		return {
			value: '', //留言内容
			disabled: true //按钮置灰
		};
	},
	props: ['postmessageclick'],
	// 方法集合
	methods: {
		// 校验输入
		checkInput() {
			this.value = uniTrim(this.value);
			if (this.value == '') {
				uni.showToast({
					icon: 'none',
					title: '无效内容'
				});
				return;
			}
			this.valuebutton();
		},

		//提交留言
		async valuebutton() {
			let para = {
				status: 0, //初始留状态
				msg: this.value, //留言内容
				ruralCardId: this.postmessageclick.cardId, //乡村id
				userId: this.userInfo.userId
			};

			if (!(await this.safe_dataContentCheck(this.value))) {
				this.value = '';
				return;
			}
			devBusinessMsgAdd_Post(para).then(res => {
				if (res.data.code == 200) {
					this.$emit('clickState', false);
					this.value = '';
					uni.showToast({
						title: '留言成功,已提交审核',
						icon: 'none',
						duration: 3000
					});
					para['avatar'] = this.userInfo.avatar;
					para['nickname'] = this.userInfo.nickname; //留言者昵称
					this.$emit('ok', para);
				} else {
					uni.showToast({
						title: res.data.msg,
						icon: 'error'
					});
				}
			});
		}
	},
	computed: {
		userInfo() {
			return getApp().globalData.userInfo;
		}
	},
	// 监控data中的数据变化
	watch: {
		//无内容时按钮置灰
		value(e) {
			e ? (this.disabled = false) : (this.disabled = true);
		}
	},
	// 生命周期 - 创建完成（可以访问当前this实例）
	created() {},
	// 生命周期 - 挂载完成（可以访问DOM元素）
	mounted() {},
	beforeCreate() {}, // 生命周期 - 创建之前
	beforeMount() {}, // 生命周期 - 挂载之前
	beforeUpdate() {}, // 生命周期 - 更新之前
	updated() {}, // 生命周期 - 更新之后
	beforeDestroy() {}, // 生命周期 - 销毁之前
	destroyed() {}, // 生命周期 - 销毁完成
	activated() {} // 如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="scss" scoped>
/* /deep/ */
.camter {
	padding: 0 35rpx;
	padding-top: 30rpx;
	.title{
		margin-bottom: 40rpx;
	}
}
.button {
	padding: 60rpx 10%;
}
</style>
