<template>
	<view class="content" :style="{ background: 'url(' + bejij + ')' }">
		<u-navbar
			:showAction="false"
			:placeholder="true"
			:title="cardName"
			bgColor="#00000000"
			leftIconColor="#fff"
			:titleStyle="{ color: '#fff' }"
		></u-navbar>
		<swiper
			class="swiper-box"
			:current="current"
			circular="true"
			previous-margin="40px"
			next-margin="40px"
			@change="swiperchange"
		>
			<swiper-item v-for="(item, index) in info" :key="index">
				<view class="swiper-item">
					<canvas style="width: 290px;height:350px" :canvas-id="item.content"></canvas>
				</view>
			</swiper-item>
		</swiper>
		<view class="bottom">
			<view class="btn_list"><button @click="saveImg">保存到手机</button></view>
			<view class="btn_list"><button @click="sendfriend">分享给好友</button></view>
		</view>
	</view>
</template>

<script>
import { apiBusinessNewQrCode_Get } from '@/API/新接口.js';
export default {
	computed: {
		/* 拿取本乡村数据 */
		rural_info() {
			return this.$store.state.build.currentRural;
		}
	},
	data() {
		return {
			current: 0, //轮播图index
			bejij: '', //背景图
			info: [],
			pagesHeight: 1000,
			cardName: '',
			qrCode: null
		};
	},

	oonLoad() {
		var that = this;
		this.pagesHeight = getApp().globalData.sysInfo.windowHeight;
	},
	methods: {
		// canvas 图片适配（aspectFill）
		imageSize(imageSize, w, h) {
			var scale, imageHeight, imageWidth;
			scale = imageSize.width / imageSize.height;
			imageHeight = w / scale;
			if (imageHeight > h) {
				imageWidth = h * scale;
				imageSize.width = imageWidth;
				imageSize.height = h;
			} else {
				imageSize.width = w;
				imageSize.height = imageHeight;
			}
			console.log('改变imageSize', imageSize.width, imageSize.height);
			return imageSize;
		},
		//临时绘制图片,未组件化
		createImg1(qrcode) {
			console.log('生成中', qrcode);
			uni.showLoading({
				title: '生成中'
			});
			const that = this;
			const ctx = uni.createCanvasContext(qrcode);
			console.log('拿到的图片地址:', this.info[0].url);
			uni.getImageInfo({
				src: this.info[0].url, // 上半部分的图片地址
				success(info) {
					console.log('拿到的图片解析信息', info);
					let draw_height = 280;
					if (info.height < info.width) {
						let width = info.width;
						ctx.drawImage(info.path, 0, 0, width, info.height, 0, 0, 290, draw_height);
					} else {
						let view_height = parseInt(info.width / 1.3); // 计算出可视区域的图片高度
						let height = info.height;
						if (info.height > draw_height) {
							height = parseInt((info.height - view_height) / 2); // 计算出图片绘制的y方向起点
						}
						ctx.drawImage(info.path, 0, height, info.width, view_height, 0, 0, 290, draw_height);
					}
					// 绘制底部矩形
					ctx.setFillStyle('#ffffff');
					ctx.fillRect(0, 280, 420, 71);

					// 绘制标题
					ctx.setFillStyle('#000');
					ctx.setFontSize(18);
					ctx.font = '20px SourceHanSerifCN-Medium';
					//标题加粗

					ctx.fillText(that.rural_info.name, 20, 310);
					ctx.font = '14px SourceHanSerifCN-Regular';
					ctx.setFillStyle('#555555');
					ctx.fillText(that.rural_info.province + that.rural_info.city + that.rural_info.county, 20, 330);
					// 绘制二维码
					// ctx.setFillStyle("#ffffff");
					// ctx.fillRect(220, 345, 56, 56);
					// qrcode：二维码url地址
					// ctx.drawImage(that.qrCode, 224, 349, 48, 48);
					ctx.draw(true);
					uni.hideLoading();
				}
			});
		},
		createImg2(qrcode) {
			console.log('生成中', qrcode);
			uni.showLoading({
				title: '生成中'
			});
			const that = this;
			let ctx = uni.createCanvasContext(qrcode);
			uni.getImageInfo({
				src: 'http://www.alst-sz.com/template/default/images/fsdahu.jpg', // 上半部分的图片地址
				success(info) {
					// 绘制图片, 原理：始终保持宽高比为1.3 : 1, 可以根据自己的情况调
					let draw_height = 225;
					if (info.height < info.width) {
						let width = info.width;
						ctx.drawImage(info.path, 0, 0, width, info.height, 0, 0, 293, draw_height);
					} else {
						let view_height = parseInt(info.width / 1.3); // 计算出可视区域的图片高度
						let height = info.height;
						if (info.height > draw_height) {
							height = parseInt((info.height - view_height) / 2); // 计算出图片绘制的y方向起点
						}
						ctx.drawImage(info.path, 0, height, info.width, view_height, 0, 0, 293, draw_height);
					}
					ctx.setFillStyle('#ffffff');
					ctx.fillRect(0, draw_height, 293, 150);

					// 绘制标题
					ctx.setFillStyle('#333333');
					ctx.setFontSize(13);
					//标题加粗
					ctx.fillText('标题', 19.5, 250);
					ctx.fillText('标题', 20, 249.5);

					// 绘制描述
					ctx.setFillStyle('#777777');

					// 绘制底部矩形
					ctx.setFillStyle('#f5f5f5');
					ctx.fillRect(0, 338, 293, 71);

					// 绘制底部信息提示
					ctx.setFontSize(11.5);
					ctx.setFillStyle('#777777');
					ctx.fillText('达人SHOW-互动式社群新零售', 20, 368);
					ctx.fillText('扫码查看更多内容', 20, 392);

					// 绘制二维码
					ctx.setFillStyle('#ffffff');
					ctx.fillRect(220, 345, 56, 56);
					// qrcode：二维码url地址
					//   ctx.drawImage(qrcode, 224, 349, 48, 48);
					ctx.draw(true);
					uni.hideLoading();
				}
			});
		},
		createImg3(qrcode) {
			console.log('生成中', qrcode);
			uni.showLoading({
				title: '生成中'
			});
			const that = this;
			let ctx = uni.createCanvasContext(qrcode);

			uni.getImageInfo({
				src: 'http://www.alst-sz.com/template/default/images/fsdahu.jpg', // 上半部分的图片地址

				success(info) {
					// 绘制图片, 原理：始终保持宽高比为1.3 : 1, 可以根据自己的情况调
					let draw_height = 225;

					if (info.height < info.width) {
						let width = info.width;
						ctx.drawImage(info.path, 0, 0, width, info.height, 0, 0, 293, draw_height);
					} else {
						let view_height = parseInt(info.width / 1.3); // 计算出可视区域的图片高度
						let height = info.height;
						if (info.height > draw_height) {
							height = parseInt((info.height - view_height) / 2); // 计算出图片绘制的y方向起点
						}
						ctx.drawImage(info.path, 0, height, info.width, view_height, 0, 0, 293, draw_height);
					}
					ctx.setFillStyle('#ffffff');
					ctx.fillRect(0, draw_height, 293, 150);

					// 绘制标题
					ctx.setFillStyle('#fff');
					ctx.setFontSize(13);
					//标题加粗
					ctx.fillText('标题', 19.5, 250);
					ctx.fillText('标题', 20, 249.5);

					// 绘制描述
					ctx.setFillStyle('#fff');

					// 绘制底部矩形
					ctx.setFillStyle('#f5f5f5');
					ctx.fillRect(0, 338, 293, 71);

					// 绘制底部信息提示
					ctx.setFontSize(11.5);
					ctx.setFillStyle('#fff');
					ctx.fillText('达人SHOW-互动式社群新零售', 20, 368);
					ctx.fillText('扫码查看更多内容', 20, 392);

					// 绘制二维码
					ctx.setFillStyle('#ffffff');
					ctx.fillRect(220, 345, 56, 56);
					// qrcode：二维码url地址
					//   ctx.drawImage(qrcode, 224, 349, 48, 48);
					ctx.draw(true);
					uni.hideLoading();
				}
			});
		},

		//下载图片
		saveImg() {
			uni.showLoading({
				title: '正在下载'
			});
			const baseW = 290,
				baseH = 350;
			uni.canvasToTempFilePath({
				x: 0,
				y: 0,
				width: baseW * 3,
				height: baseH * 3,
				destWidth: baseW * 3,
				destHeight: baseH * 3,
				quality: 1,
				fileType: 'jpg',
				canvasId: this.info[this.current].content,
				success(res) {
					// 在H5平台下，tempFilePath 为 base64
					uni.saveImageToPhotosAlbum({
						filePath: res.tempFilePath,
						success: function(data) {
							uni.hideLoading();
							uni.showToast({
								title: '已保存至相册！',
								icon: 'success',
								duration: 2000
							});
						},
						fail: response => {
							console.log(response, 'error');
							uni.openSetting({
								//打开权限
								success: response => {
									if (!response.authSetting['scope.writePhotosAlbum']) {
										uni.showToast({
											title: '获取权限成功, 再次点击即可保存',
											icon: none
										});
									} else {
										uni.showToast({
											title: '获取权限失败, 无法保存',
											icon: none
										});
									}
								}
							});
						}
					});
				}
			});
		},

		//不成功,暂时不知道为什么
		sendfriend() {
			//   const that = this;
			//   let imgUrl = "http://www.alst-sz.com/template/default/images/fsdahu.jpg";
			//   console.log("微信分享-海报生成图片", imgUrl);
			//   uni.hideLoading();
			// let arr = [];
			// arr[0] = imgUrl;
			// plus.share.sendWithSystem({content:'',href:'',pictures:arr}, function(){
			// 	console.log('分享成功');
			// }, function(e){
			// 	console.log('分享失败：'+JSON.stringify(e));
			// });
		},
		back() {},
		//切换背景
		swiperchange(e) {
			this.current = e.detail.current;
			this.bejij = this.info[e.detail.current].url;
		}
	},
	onReady() {
		var that = this;
		apiBusinessNewQrCode_Get({
			// path: 'subpages/card/card?cardId=' + this.rural_info.cardId
			path: '/subpages/card/card?cardId=' + this.rural_info.cardId
		}).then(res => {
			console.log('二维码结果', res, res.data.data);
			if (res.data.data) {
				//把base64转换成图片
				/// 获取到base64Data
				var base64Data = res.data.data;
				/// 通过微信小程序自带方法将base64转为二进制去除特殊符号，再转回base64
				base64Data = wx.arrayBufferToBase64(wx.base64ToArrayBuffer(base64Data));
				/// 拼接请求头，data格式可以为image/png或者image/jpeg等，看需求
				const base64ImgUrl = 'data:image/png;base64,' + base64Data;
				/// 得到的base64ImgUrl直接给图片:src使用即可

				that.qrCode = base64ImgUrl;
			} else {
				console.log('结果异常');
			}
		});
		const banner = JSON.parse(this.rural_info.images);
		console.log('本村数据', banner);
		this.info = [
			banner.map((value, index) => {
				return {
					url: value.imgUrl,
					content: 'myCanvas' + index
				};
			})[0]
		];
		this.cardName = this.rural_info.name + '明信片';
		this.bejij = this.info[0].url;
		console.log('解析后的this.info', this.info);
		this.createImg1('myCanvas0');
		// this.createImg2('myCanvas1');
		// this.createImg3('myCanvas2');
	}
};
</script>

<style lang="scss">
page {
	width: 100%;
	height: 100vh;
}
.bejij {
	position: absolute;
	z-index: -1;
	width: 100%;
	filter: blur(8px);
	background-size: 100% 100%;
	transform: scale(1.2);
	// height: 100vh;
}
.content {
	/* text-align: center; */
	height: 100vh;
	width: 100%;
	background-size: 100% 100%;
}

.content:before {
	content: ' ';
	width: 110%;
	height: 100vh;
	background: inherit;
	position: absolute;
	left: -25px;
	right: 0;
	top: 0px;
	/* bottom: 0px; */
	/* box-shadow: inset 0 0 0 112px rgba(255, 255, 255, 0.3); */
	-webkit-filter: blur(10px);
	filter: blur(10px);
}
.swiper-box {
	padding-top: 100rpx;
	height: 1000rpx;
}

.swiper-item {
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background-color: #999;
	color: #fff;
	margin: 10px;
	border-radius: 30rpx;
	height: 676rpx;
}
.image {
	/* width: 750rpx; */
	height: 100%;
	border-radius: 15upx;
}
.bottom {
	margin-top: 50rpx;
	display: flex;
	justify-content: space-around;
	.btn_list {
		width: 40%;
	}
}
</style>
