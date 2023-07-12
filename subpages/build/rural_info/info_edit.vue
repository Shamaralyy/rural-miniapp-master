<template>
	<view class="">
		<view class="input" v-if="editKey == 'name'">
			<u--input
				v-model="input_value"
				:placeholder="placeholdername"
				border="surround"
				:maxlength="maxlength"
			></u--input>
		</view>
		<view class="textarea" v-if="editKey == 'synopsis'">
			<u--textarea v-model="textarea_value" :placeholder="placeholdername"></u--textarea>
		</view>
		<view v-if="editKey == 'details'">
			<cu-editor
				:content="richText_value"
				@before="onUploadBefore"
				@update="onUpdate"
				@save="onSave"
				@onEditorFocus="controlButton"
			></cu-editor>
		</view>

		<view class="content_bottom" v-show="buttonState">
			<view class="button"><u-button text="保存" @click="saveChange()"></u-button></view>
		</view>
	</view>
</template>

<script>
import { mapState } from 'vuex';
import { apiBusinessCardEdit_Put } from '@/API/乡村名片.js';
import cuEditor from '@/components/cu-editor/cu-editor';
import { handleHtmlImage } from '@/components/cu-editor/util';
export default {
	data() {
		return {
			value: '',
			tip: '支持2~8个汉字',
			input_value: '',
			textarea_value: '',
			richText_value: '',
			placeholdername: '请输入内容',
			maxlength: 8,
			buttonState: true
		};
	},
	computed: {
		...mapState('build', ['editKey', 'currentRural'])
	},
	onLoad() {
		console.log('编辑页跳转接收参数', this.editKey);
		this._initInputData();
	},
	methods: {
		/* 初始化输入数据 */
		_initInputData() {
			switch (this.editKey) {
				case 'name':
					this.input_value = this.currentRural.name;
					break;
				case 'synopsis':
					this.textarea_value = this.currentRural.synopsis;
					break;
				case 'details':
					this.richText_value = this.currentRural.details;
					break;
				default:
					return undefined;
					break;
			}
		},
		controlButton(editorState) {
			console.log('托盘状态', editorState);
			this.buttonState = !editorState;
		},
		/* 编辑 */
		async saveChange() {
			const para = this.getPara();
			if (para == undefined || para == null) return;
			if (!(await this.safe_dataContentCheck(para))) {
				return;
			}
			new Promise((resolve, reject) => {
				apiBusinessCardEdit_Put({
					...para,
					cardId: this.currentRural.cardId
				}).then(res => {
					console.log('更新请求结果', res);
					if (res.data.code == 200) {
						resolve();
					} else {
						reject();
					}
				});
			})
				.then(() => {
					return new Promise((resolve, reject) => {
						this.setBuildStore();
						uni.showToast({ icon: 'success', title: '信息更新完成' });
						setTimeout(() => {
							uni.navigateBack({ delta: 1 });
							resolve();
						}, 1000);
					});
				})
				.catch(() => {
					uni.showToast({ icon: 'error', title: '信息更新失败' });
					console.log('错误');
				});
		},
		/* 获取请求参数 */
		getPara() {
			switch (this.editKey) {
				case 'name':
					if (this.input_value.length == 0) {
						uni.showToast({ icon: 'success', title: '村名不可为空' });
						return null;
					}
					return { name: this.input_value };
					break;
				case 'synopsis':
					if (this.textarea_value.length == 0) {
						console.log(this.textarea_value.length, this.textarea_value);
						uni.showToast({ icon: 'success', title: '简介不可为空' });
						return null;
					}
					return { synopsis: this.textarea_value };
					break;
				case 'details':
					return { details: this.richText_value };
					break;
				default:
					return undefined;
					break;
			}
		},
		/* 设置对应全局数据 */
		setBuildStore() {
			switch (this.editKey) {
				case 'name':
					this.$store.commit('build/setCurrentRural_name', this.input_value);
					break;
				case 'synopsis':
					this.$store.commit('build/setCurrentRural_synopsis', this.textarea_value);
					break;
				case 'details':
					this.$store.commit('build/setCurrentRural_details', this.richText_value);
					break;
				default:
					return undefined;
					break;
			}
		},

		/* 富文本相关事件 */

		onUpdate(e) {
			// console.log('富文本内容更新', e.html);
		},
		onSave(e) {
			// console.log('接收保存传参', e.html);
			this.richText_value = e.html;
		}
	}
};
</script>

<style lang="scss">
page {
	background: #f1f1f1;
}
.input {
	margin: 30rpx;
	background: #fff;
}

.textarea {
	margin: 30rpx;
}

.content_bottom {
	position: fixed;
	bottom: 10rpx;
	background: #fff;
	width: 100%;
	.button {
		display: flex;
		width: 80%;
		margin: 20rpx auto 40rpx auto;
	}
}
</style>
