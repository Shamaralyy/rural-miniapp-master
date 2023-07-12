export const serviceMixins = {
	methods: {
		/* 校验 */
		check() {
			let toast = {
					icon: 'none',
					title: ''
				},
				state = true;

			if (uni.$u.trim(this.checkboxValue1.label) == '' && state) {
				toast.title = '请选择好物分类';
				state = false;
			}
			if (uni.$u.trim(this.newsTitle) == '' && state) {
				toast.title = '请填写标题';
				state = false;
			}
			if (uni.$u.trim(this.introduce) == '' && state) {
				toast.title = '请填写简介';
				state = false;
			}
			if (uni.$u.trim(this.richText_value) == '' && state) {
				toast.title = '请填写详细信息';
				state = false;
			}
			if (uni.$u.trim(this.contact.name) == '' && state) {
				toast.title = '请填写联系人姓名';
				state = false;
			}
			if (uni.$u.trim(this.contact.desc) == '' && state) {
				toast.title = '请填写联系人简介';
				state = false;
			}
			if (uni.$u.trim(this.contact.phone) == '' && state) {
				toast.title = '请填写联系人手机';
				state = false;
			}
			if (uni.$u.trim(this.contact.avatar) == '' && state) {
				toast.title = '请上传联系人头像';
				state = false;
			}
			if (uni.$u.trim(this.contact.name) == '' && state) {
				toast.title = '请填写姓名';
				state = false;
			}
			if (uni.$u.trim(this.imgJson) == '' && state) {
				toast.title = '请上传图片';
				state = false;
			}

			if ((this.xaweoas == null || JSON.stringify(this.xaweoas) == '{}') && state) {
				this.getAddress();
				state = false;
			}

			if (this.vr_urlShow && uni.$u.trim(this.vr_urlValue) == '' && state) {
				toast.title = '请填写vr链接';
				state = false;
			}
			if (this.appShowUrl && uni.$u.trim(this.appUrl.appId) == '' && state) {
				toast.title = '请填写外部小程序appid';
				state = false;
			}
			//统一处理检测结果
			if (state == false) {
				uni.showToast(toast);
				return state;
			}
			return state;
		}
	},
	watch: {
		newsTitle(newValue) {
			if (uni.$u.trim(newValue) != '') {
				this.marker[0].callout.content = newValue;
			} else {
				this.marker[0].callout.content = '位置名称';
			}
		}
	},
}
