<!--
 * @Description: 描述
 * @Date: 2022-05-26 11:21:34
 * @LastEditTime: 2022-05-30 10:24:06
 * @FilePath: \rural-miniapp\pages\card\subCard\sharebusinesscards.vue
-->
<template>
	<view>
		<cu-editor
			ref="editor"
			:url="uploadUrl"
			:header="header"
			:formData="formData"
			:content="content"
			@before="onUploadBefore"
			@update="onUpdate"
			@save="onSave"
		></cu-editor>
	</view>
</template>

<script>
import cuEditor from '@/components/cu-editor/cu-editor';
import { handleHtmlImage } from '@/components/cu-editor/util';

export default {
	components: {
		cuEditor
	},
	data() {
		return {
			content: '',
			uploadUrl: '',
			header: {},
			formData: {}
		};
	},
	onLoad(options) {
		if (options.item) {
			const item = JSON.parse(decodeURIComponent(options.item));
			item.content ? (this.content = item.content) : '';
		}
		wx.enableAlertBeforeUnload({
			message: '询问对话框内容'
		});
	},
	methods: {
		onUploadBefore: function() {
			this.formData = {
				timestamp: Date.parse(new Date()) / 1000
			};
		},
		onUpdate(res) {
			res.html = handleHtmlImage(res.html);
			this.value = res.html;
		},
		//保存
		onSave(e) {
			let html = e.html;
			var containsImage = html.search(/<img /i) >= 0; //内容是否包含图片标签
			let txt = e.text.replace(/(^\s*)|[\r\n]|(\s*$)/g, ''); //去掉换行符和两端空格

			uni.$emit('save', {
				html: txt == '' && !containsImage ? txt : html
			});
		}
	}
};
</script>

<style>
page {
	padding-top: 50px;
}
</style>
