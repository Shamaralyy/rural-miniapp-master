<template>
	<view class="">
		<view class="content_banner">
			<view class="banner_list" v-for="(item, index) in banner_list" :key="index">
				<view class="list_nav">
					<view class="nav_title">
						<text v-if="index == 0">{{ index + 1 }} - 首封面图</text>
						<text v-if="index != 0">{{ index + 1 }} - 轮播大图</text>
					</view>
					<view class="navi_control">
						<view class="control_icon" @click="imgMove(index, 'up')" v-if="index != 0">
							<u-icon name="arrow-up" :color="control_color(index, 'up')" size="28"></u-icon>
						</view>
						<view
							class="control_icon"
							@click="imgMove(index, 'down')"
							v-if="index != banner_list.length - 1"
						>
							<u-icon name="arrow-down" :color="control_color(index, 'down')" size="28"></u-icon>
						</view>
					</view>
					<view class="nav_more" @click="imgDelet(index)">
						<u-icon name="close-circle-fill" color="#ff2326" size="20"></u-icon>
						<text>删除</text>
					</view>
				</view>
				<view class="list_content"><image :src="src(item.imgUrl)" mode="widthFix"></image></view>
			</view>
		</view>
		<view class="content_bottom">
			<view class="button">
				<view class="btn_item" @click="saveBaner()"><u-button text="确定保存"></u-button></view>
				<view class="btn_item" @click="toPrimg()"><u-button text="从图集选择"></u-button></view>
				<view class="btn_item" @click="imgAdd()"><u-button text="新增轮播图"></u-button></view>
			</view>
		</view>
	</view>
</template>

<script>
import { apiBusinessCardEdit_Put } from '@/API/乡村名片.js';
import { mapState } from 'vuex';
const imgSuffix = getApp().globalData.imgSuffix[1];
export default {
	data() {
		return {
			banner_list: []
		};
	},
	computed: {
		...mapState('build', ['currentRural']),
		/* 箭头动态颜色 */
		control_color(index, type) {
			return (index, type) => {
				if (type == 'up') {
					return index == 0 ? '#fff' : '#ff0a0a';
				} else if (type == 'down') {
					return index == this.banner_list.length - 1 ? '#fff' : '#47d875';
				}
				return '#000000';
			};
		},
		src(url) {
			return url => {
				if (url.indexOf('cdn.xiangcunmingpian.com') != -1) {
					return url + imgSuffix;
				} else {
					return url;
				}
			};
		}
	},
	methods: {
		/* 简单更改轮播图顺序 */
		imgMove(index, type) {
			if ((index == 0 && type == 'up') || (index == this.banner_list.length - 1 && type == 'down')) {
				console.log('点了', index, type);
				return;
			}

			let tempContent = '';
			if (type == 'up') {
				tempContent = this.banner_list[index].imgUrl;
				this.banner_list[index].imgUrl = this.banner_list[index - 1].imgUrl;
				this.banner_list[index - 1].imgUrl = tempContent;
			} else if (type == 'down') {
				tempContent = this.banner_list[index].imgUrl;
				this.banner_list[index].imgUrl = this.banner_list[index + 1].imgUrl;
				this.banner_list[index + 1].imgUrl = tempContent;
			}
		},
		/* 点击删除图片 */
		imgDelet(index) {
			this.banner_list = this.banner_list.filter((imgValue, imgIndex) => index !== imgIndex);
		},

		/* 点击增加图片 */
		async imgAdd() {
			if (Object.keys(this.ossToken).length == 0) {
				const netResult = await this.getOssToken();
				/* 当前无法获取OSS签名 */
				if (netResult === false) {
					console.error('获取不到OSS签名，当前无法上传文件', netResult);
					return;
				} else {
					this.ossToken = netResult;
				}
			}
			console.log('取得上传签名', this.ossToken);

			uni.showLoading({ title: '图片上传中' });
			new Promise((resolve, reject) => {
				uni.chooseImage({
					count: 10,
					success: res => {
						console.log(res);
						const tempFiles = res.tempFiles; //拿到选择的图片，是一个数组
						resolve(tempFiles);
					},
					fail: err => {
						reject(err);
					}
				});
			})
				//接入风控 通过的图片上传
				.then(pathArrary => {
					console.log('选择图片列表', pathArrary);
					let imgResult = [],
						index = 0;
					return new Promise(async (resolve, reject) => {
						for (let item of pathArrary) {
							const isSaft = await this.safe_dataContentCheck(item, 'img');
							if (isSaft) {
								imgResult.push(await this.uploadFilePromise(item.path));
							}
							index++;
						}
						resolve(imgResult);
					});
				})
				.then(imgResult => {
					imgResult.map(value => {
						this.banner_list.push({ imgUrl: value });
					});
					//添加图片至列表
					uni.showToast({ icon: 'success', title: '图片上传成功' });
				})
				.catch(err => {
					console.log('阻断原因', err);
					uni.showToast({ icon: 'error', title: '图片上传是失败' });
				});
		},

		/* 上传图片 成功返回地址 */
		uploadFilePromise(pathResult) {
			const ossTopPath = 'images/banner/',
				suffix = '.' + pathResult.split('.')[1];
			const fileName = ossTopPath + this.g_ridStr + '_' + uni.$u.guid(10) + suffix;

			this.ossToken.key = fileName;
			return new Promise((resolve, reject) => {
				uni.uploadFile({
					url: this.ossToken.host,
					filePath: pathResult,
					name: 'file',
					formData: this.ossToken,
					success: res => {
						resolve(this.ossToken.host + '/' + fileName);
					}
				});
			});
		},

		/* 点击保存 */
		saveBaner() {
			// 数据异常阻断
			if (this.banner_list.length == 0) {
				uni.showModal({
					showCancel: false,
					content: '需要至少一张图片作为轮播图'
				});
				return;
			}

			// 发送请求
			let imgPara = JSON.stringify(this.banner_list);
			new Promise((resolve, reject) => {
				apiBusinessCardEdit_Put({
					cardId: this.currentRural.cardId,
					images: imgPara
				}).then(res => {
					console.log('地图请求数据', res);
					if (res.data.code == 200 && res.data.msg.indexOf('成功') != -1) {
						this.$store.commit('build/setCurrentRural_banner', imgPara);
						resolve();
					} else {
						reject();
					}
				});
			})
				.then(() => {
					return new Promise((resolve, reject) => {
						uni.showToast({ icon: 'success', title: '轮播图更新完成' });
						setTimeout(() => {
							uni.navigateBack({ delta: 1 });
							resolve();
						}, 1000);
					});
				})
				.catch(() => {
					uni.showToast({ icon: 'error', title: '轮播图更新失败' });
					console.log('错误');
				});
		},
		// 进行其他图片选择
		toPrimg() {
			uni.navigateTo({
				url: '/subpages/build/rural_diy/cubeIcon?type=2'
			});
		},
		// 外部回传图片
		naviChangeImg(url) {
			console.log('响应', url);
			this.banner_list.push({ imgUrl: url });
		}
	},
	onLoad() {
		console.log('乡村数据', this.currentRural);
		uni.$on('naviChangeImg', url => {
			this.naviChangeImg(url);
		});
		if (this.currentRural.images == null) {
			this.banner_list = [];
			return;
		}
		// 解析数据
		try {
			this.banner_list = JSON.parse(this.currentRural.images);
		} catch (e) {
			console.error('轮播图解析异常', this.currentRural.images);
		}
	},
	onUnload() {
		uni.$off('naviChangeImg');
	}
};
</script>

<style lang="scss">
page {
	background: #f1f1f1;
	height: 100%;
	width: 100%;
}
.content_banner {
	margin: 20rpx;
	display: flex;
	flex-flow: wrap;
	margin-bottom: 80rpx;
	.banner_list {
		display: flex;
		flex-direction: column;
		width: 100%;
		padding: 20rpx;
		background: #fff;
		border-radius: 20rpx;
		margin-bottom: 20rpx;
		.list_nav {
			display: flex;
			padding: 15rpx 0 30rpx 0;
			justify-content: space-between;
			align-items: center;
			.navi_control {
				height: 100%;
				display: flex;
				.control_icon {
					padding-left: 2vw;
					padding-right: 2vw;
				}
			}
			.nav_more {
				font-size: 28rpx;
				display: flex;
				align-items: center;
			}
		}
		.list_content {
			display: flex;
			image {
				width: 100%;
				border-radius: 10rpx;
			}
		}
	}
}
.content_bottom {
	position: fixed;
	bottom: 10rpx;
	background: #fff;
	width: 100%;
	.button {
		width: 80%;
		display: flex;
		justify-content: space-around;
		margin: 20rpx auto 40rpx auto;
		.btn_item {
			margin-left: 4vw;
			margin-right: 4vw;
		}
	}
}
</style>
