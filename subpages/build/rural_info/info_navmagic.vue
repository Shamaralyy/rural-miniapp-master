<template>
	<view class="">
		<u-navbar
			:title="'魔方导航'"
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
				@click="save()"
			>
				<view class="title"><text>保存</text></view>
			</view>
		</u-navbar>
		<view class="top">
			<view class="">
				<text v-if="mode == 0">点击菜单可快速编辑</text>
				<text v-if="mode == 1">可按需求DIY设计菜单</text>
			</view>
			<view class="">
				<u-button text="初始化导航" size="small" shape="circle" @click="defaultNavimagic()"></u-button>
			</view>
		</view>
		<view class="content_default" v-if="mode == 0">
			<view class="content_nav">
				<view class="flex" v-for="(item1, index1) in navList">
					<view class="nav" v-for="(item2, index2) in item1.nav">
						<view
							class="list"
							@click="clicklist(index1, index2, index3)"
							v-for="(item3, index3) in item2.list"
							:style="[bgStyle(item3.bgimg[0].url)]"
						>
							<view class="info">
								<view class="num">
									<text>{{ item3.bgtitle }}</text>
								</view>
								<view class="title">
									<text>{{ item3.title }}</text>
								</view>
								<view class="desc">
									<text>{{ item3.desc }}</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="content_diy" v-if="mode == 1">
			<view class="content_nav">
				<view class="flex" v-for="(item, index) in navList">
					<view class="navmore">
						<!-- <text @click="">编辑</text> -->
						<text @click="moveUp(index)" v-if="index != 0">上移</text>
						<text @click="moveDown(index)" v-if="index != navList.length - 1">下移</text>
						<text @tap="navList.splice(index, 1)">删除</text>
					</view>
					<view class="nav" v-for="(item2, index2) in item.nav">
						<view class="list" v-for="(item3, index3) in item2.list" :style="[bgStyle(item3.bgimg[0].url)]">
							<view class="navmore">
								<!-- <text @click="">编辑</text> -->
								<text @click="threemoveUp(index, index2, index3)" v-if="index3 != 0">上移</text>
								<text
									@click="threemoveDown(index, index2, index3)"
									v-if="index3 != item2.list.length - 1 && item2.list.length != 1"
								>
									下移
								</text>
								<text @click="deletelist(index, index2, index3)">删除</text>
							</view>
							<view class="info" @click="clicklist(index, index2, index3)">
								<view class="num">
									<text>{{ item3.bgtitle }}</text>
								</view>
								<view class="title">
									<text>{{ item3.title }}</text>
								</view>
								<view class="desc">
									<text>{{ item3.desc }}</text>
								</view>
							</view>
						</view>
						<view class="add" @click="addthree(index, index2)"><text>新增菜单模块</text></view>
					</view>
					<view class="addright" v-if="item.nav.length == 1" @click="addtwo(index, index2)">
						<text>增加一列</text>
					</view>
				</view>
				<view class="add" @click="addone(index)"><text>点击新增主导航</text></view>
			</view>
		</view>
		<u-popup :show="show" @close="closCheck" round="16" :closeable="true">
			<view class="form">
				<u--form labelPosition="left" :model="model1" :rules="rules" ref="form1" labelWidth="100">
					<u-form-item label="菜单名称" prop="navInfo.title" borderBottom ref="item1">
						<u--input v-model="model1.navInfo.title" border="none" @change="editNav()"></u--input>
					</u-form-item>
					<u-form-item label="菜单介绍" prop="navInfo.desc" borderBottom ref="item1">
						<u--input v-model="model1.navInfo.desc" border="none" @change="editNav()"></u--input>
					</u-form-item>
					<u-form-item label="菜单链接" prop="navInfo.url" borderBottom ref="item1" @click="toChangePage()">
						<u--input
							v-model="model1.navInfo.url.name"
							disabled
							border="none"
							@change="editNav()"
						></u--input>
					</u-form-item>
					<u-form-item label="背景文字" prop="navInfo.bgtitle" borderBottom ref="item1">
						<u--input v-model="model1.navInfo.bgtitle" border="none" @change="editNav()"></u--input>
					</u-form-item>
					<u-form-item label="背景图片" prop="navInfo.bgimg" borderBottom ref="item1">
						<view class="nav_img">
							<ru-file-upload
								@upPara="getImgData"
								:iniCount="1"
								:initData="[model1.navInfo.bgimg[0].url]"
								paraGetMethods="active"
								iniTopPath="images/naviMagic"
							></ru-file-upload>
							<view class="nav_img_oth" @click="toPrimg">从图集中选择</view>
						</view>
					</u-form-item>
					<!-- <u-form-item label="菜单色调" prop="navInfo.bgcolor" borderBottom ref="item1">
						<u--input v-model="model1.navInfo.bgcolor" border="none" @change="editNav()"></u--input>
					</u-form-item> -->
				</u--form>
			</view>
		</u-popup>
		<view class="content_bottom" style="border-top: 1rpx solid #eee;">
			<!-- <view class="" style="text-align: center;padding: 20rpx 0;font-size: 28rpx;">
					<text v-if="mode==0">点击菜单可快速编辑</text>
					<text v-if="mode==1">目前处于DIY设计模式</text>
				</view> -->
			<view class="button">
				<view class="button" v-if="mode == 0">
					<u-button text="进入魔方DIY设计模式" @click="edit()"></u-button>
				</view>
				<view class="button" v-if="mode == 1">
					<u-button text="退出魔方DIY设计模式" @click="edit()"></u-button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { apiBusinessCardEdit_Put } from '@/API/乡村名片.js';
import { getDefault_navimagic } from '@/utils/defaultData.js';
import { mapState } from 'vuex';
const imgSuffix = getApp().globalData.imgSuffix,
	ossUrl = 'cdn.xiangcunmingpian.com';

export default {
	data() {
		return {
			tempImg: '',
			mySuffix: imgSuffix,
			//0 默认编辑模式  1新增模式
			mode: 0,
			show: false,
			poiIndex: {
				one: 0,
				two: 0,
				three: 0
			},
			model1: {
				navInfo: {
					title: '',
					desc: '',
					url: { name: '' },
					bgtitle: '',
					bgimg: [{ url: '' }],
					bgcolorc: ''
				}
			},
			rules: {
				'unavInfo.name': {
					type: 'string',
					required: true,
					message: '请填写姓名',
					trigger: ['blur', 'change']
				},
				'navInfo.sex': {
					type: 'string',
					max: 1,
					required: true,
					message: '请选择男或女',
					trigger: ['blur', 'change']
				}
			},
			pagesWidth: 0,
			menuwidth: 0,
			navList: null,
			bannerimg: [],
			tempImgObject: [], //组件键
			timerID: 0,
			openLock: false, //初次设定锁
			lock: false //弹框状态锁 开启时无法关闭弹出窗
		};
	},

	onReady() {
		console.log('尝试解析本村navi数据', this.navList);
		try {
			if (this.currentRural.navigationJson != null) {
				let imgJSON = JSON.parse(this.currentRural.images);
				this.bannerimg = imgJSON.map(value => value.imgUrl);
				this.navList = JSON.parse(this.currentRural.navigationJson);
			} else {
				let imgJSON = JSON.parse(this.currentRural.images);
				let bannerimg = imgJSON.map(value => value.imgUrl);
				this.bannerimg = bannerimg;
				this.navList = getDefault_navimagic(bannerimg);
			}
		} catch (e) {
			console.log('xxxxxxx 导航数据渲染失败，使用默认数据');
		}
	},
	onShow() {
		// 当下拉框显示 且 魔方链接参数不为空时 修改魔方链接参数
		if (this.show && this.tempMagicPara.name != undefined) {
			console.log('√ 路径编辑状态', this.tempMagicPara);
			this.model1.navInfo.url = this.tempMagicPara;
			this.editNav();
		} else {
			console.log('x 路径编辑状态,');
		}
	},
	onLoad() {
		uni.$on('naviChangeImg', url => {
			this.naviChangeImg(url);
		});
		var that = this;
		//初始化导航
		uni.getSystemInfo({
			success: function(res) {
				let menu = wx.getMenuButtonBoundingClientRect();
				that.menuwidth = menu.width + menu.width / 7;
				that.pagesWidth = res.windowWidth;
				console.log(that.menuwidth);
			}
		});
	},
	onUnload() {
		uni.$off('naviChangeImg');
	},
	methods: {
		async closCheck() {
			if (this.lock) return;
			if (
				!(await this.safe_dataContentCheck(this.model1.navInfo.title)) ||
				!(await this.safe_dataContentCheck(this.model1.navInfo.bgtitle)) ||
				!(await this.safe_dataContentCheck(this.model1.navInfo.desc))
			) {
				return;
			}
			this.show = false;
		},
		// 初始化导航
		defaultNavimagic() {
			this.navList = getDefault_navimagic(this.bannerimg);
			uni.showToast({ icon: 'none', title: '初始化导航成功' });
		},
		// 保存数据
		async save() {
			let navigationJson = JSON.stringify(this.navList);
			if (!(await this.safe_dataContentCheck(navigationJson))) {
				return;
			}
			new Promise((resolve, reject) => {
				apiBusinessCardEdit_Put({
					navigationJson,
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
						this.$store.commit('build/setCurrentRural_navi', navigationJson);
						uni.showToast({ icon: 'success', title: '信息更新完成' });
						setTimeout(() => {
							uni.navigateBack({ delta: 1 });
							resolve();
						}, 1000);
					});
				})
				.catch(err => {
					uni.showToast({ icon: 'error', title: '信息更新失败' });
					console.log('导航更新错误', err);
				});
		},
		// 获取组件图片数据
		getImgData(para) {
			console.log('接收图片数据', para);
			if (para.length == 0) return;
			const tempImg = para[0];
			// 频闪 以防止请求不到
			let index = 0;
			this.lock = true;
			this.timerID = setInterval(() => {
				if (index % 2) {
					this.setNowImg(this.poiIndex.one, this.poiIndex.two, this.poiIndex.three, [{ url: tempImg }]);
				} else {
					this.setNowImg(this.poiIndex.one, this.poiIndex.two, this.poiIndex.three, [{ url: '' }]);
				}
				index++;
				if (index >= 4) {
					clearInterval(this.timerID);
					this.lock = false;
				}
			}, 350);
		},

		// 设置当前显示的图片
		setNowImg(a, b, c, imgArray) {
			// console.log('设置图片样式', imgArray);
			// this.model1.navInfo.bgimg = imgArray;
			this.navList[a].nav[b].list[c].bgimg = imgArray;
		},

		// 进行页面跳转 选择导航链接路径
		toChangePage() {
			try {
				this.$store.commit('build/setTempVrUrl', this.model1.navInfo.url);
				this.$store.commit('build/setTempOtherApp', this.model1.navInfo.url);
			} catch (e) {
				//TODO handle the exception
			}
			uni.navigateTo({ url: './info_cubeUrl' });
		},
		// 进行其他图片选择
		toPrimg() {
			uni.navigateTo({
				url: '/subpages/build/rural_diy/cubeIcon?type=2'
			});
		},

		deletelist(a, b, c) {
			if (c != 0) {
				this.navList[a].nav[b].list.splice(c, 1);
			} else {
				this.navList[a].nav.splice(b, 1);
			}
		},
		moveUp(e) {
			if (e != 0) {
				this.navList[e] = this.navList.splice(e - 1, 1, this.navList[e])[0];
			}
		},
		moveDown(e) {
			if (e != this.navList.length - 1) {
				this.navList[e] = this.navList.splice(e + 1, 1, this.navList[e])[0];
			}
		},
		threemoveUp(a, b, c) {
			if (c != 0) {
				this.navList[a].nav[b].list[c] = this.navList[a].nav[b].list.splice(
					c - 1,
					1,
					this.navList[a].nav[b].list[c]
				)[0];
			}
		},
		threemoveDown(a, b, c) {
			if (c != this.navList[a].nav[b].list.length - 1) {
				this.navList[a].nav[b].list[c] = this.navList[a].nav[b].list.splice(
					c + 1,
					1,
					this.navList[a].nav[b].list[c]
				)[0];
			}
		},

		// 回传修改图片
		naviChangeImg(url) {
			console.log('响应', url);
			this.model1.navInfo.bgimg[0].url = url;
			this.setNowImg(this.poiIndex.one, this.poiIndex.two, this.poiIndex.three, [{ url: url }]);
		},
		clicklist(a, b, c) {
			console.log(a, b, c);
			this.poiIndex = {
				one: a,
				two: b,
				three: c
			};
			this.model1.navInfo.title = this.navList[a].nav[b].list[c].title;
			this.model1.navInfo.bgcolor = this.navList[a].nav[b].list[c].bgcolor;
			this.model1.navInfo.bgimg = this.navList[a].nav[b].list[c].bgimg;
			this.model1.navInfo.bgtitle = this.navList[a].nav[b].list[c].bgtitle;
			this.model1.navInfo.desc = this.navList[a].nav[b].list[c].desc;
			this.model1.navInfo.url = this.navList[a].nav[b].list[c].url;
			this.show = true;
		},
		edit() {
			this.mode = this.mode == 0 ? 1 : 0;
		},
		editNav() {
			let a = this.poiIndex.one,
				b = this.poiIndex.two,
				c = this.poiIndex.three;
			this.navList[a].nav[b].list[c].title = this.model1.navInfo.title;
			this.navList[a].nav[b].list[c].bgcolor = this.model1.navInfo.bgcolor;
			this.navList[a].nav[b].list[c].bgimg = this.model1.navInfo.bgimg;
			this.navList[a].nav[b].list[c].bgtitle = this.model1.navInfo.bgtitle;
			this.navList[a].nav[b].list[c].desc = this.model1.navInfo.desc;
			this.navList[a].nav[b].list[c].url = this.model1.navInfo.url;
		},
		addone(a, b) {
			var data = {
				nav: [
					{
						list: [
							{
								bgimg: [
									{ url: 'https://cdn.xiangcunmingpian.com/app/static/carddemo.png' }
								],
								title: '新增模块名称',
								desc: '这里是介绍',
								bgtitle: '01',
								url: { name: '' },
								bgcolor: ''
							}
						]
					}
				]
			};
			this.navList = this.navList.concat(data);
		},
		addtwo(a, b) {
			console.log(a, b);
			console.log(this.navList[a].nav);
			var data = {
				list: [
					{
						bgimg: [{ url: 'https://cdn.xiangcunmingpian.com/app/static/carddemo.png' }],
						title: '新增模块名称',
						desc: '这里是介绍',
						bgtitle: '05',
						url: { name: '' },
						bgcolor: ''
					}
				]
			};
			this.navList[a].nav = this.navList[a].nav.concat(data);
		},
		addthree(a, b) {
			console.log(a, b);
			console.log(this.navList[a].nav[b]);
			var data = {
				bgimg: [{ url: 'https://cdn.xiangcunmingpian.com/app/static/carddemo.png' }],
				title: '新增模块名称',
				desc: '这里是介绍',
				bgtitle: '05',
				url: { name: '' },
				bgcolor: ''
			};
			this.navList[a].nav[b].list = this.navList[a].nav[b].list.concat(data);
		}
	},
	computed: {
		...mapState('build', ['currentRural', 'tempMagicPara']),
		bgStyle(imgUrl) {
			return imgUrl => {
				if (imgUrl) {
					let urlStr = 'url(' + imgUrl + imgSuffix[1] + ')';
					if (imgUrl.indexOf(ossUrl) == -1) {
						urlStr = 'url(' + imgUrl + ')';
					}
					return {
						background: urlStr,
						backgroundSize: 'cover'
					};
				} else {
					return {};
				}
			};
		}
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
.top {
	margin: 30rpx 30rpx 10rpx;
	font-size: 29rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.content_bottom {
	position: fixed;
	bottom: 10rpx;
	background: #fff;
	width: 100%;
	.button {
		display: flex;
		width: 80%;
		margin: 10rpx auto 20rpx auto;
	}
}
.form {
	margin: 30rpx;
}
.content_default {
	// margin: 30rpx;
	.content_nav {
		margin: 10rpx 0rpx 20rpx 0rpx;
		padding: 30rpx 30rpx 20rpx 30rpx;
		background-color: #fffffff2;
		border-radius: 20rpx;
		z-index: 2;
		.flex {
			display: flex;
			justify-content: space-between;
			.nav {
				width: 100%;
				display: flex;
				flex-direction: column;
			}
			.nav:nth-child(2) {
				margin-left: 10rpx;
			}
			.nav:nth-child(3) {
				margin-left: 10rpx;
			}
			.list {
				background: #f3f3f3;
				border-radius: 20rpx;
				margin-bottom: 14rpx;
				height: 100%;
				padding: 60rpx 18rpx 18rpx 18rpx;
				font-size: 28rpx;
				display: flex;
				flex-direction: column-reverse;
				background-size: cover;
				position: relative;
				.info {
					display: flex;
					flex-direction: column;
					position: relative;
					.num {
						position: absolute;
						top: -28rpx;
						font-size: 42rpx;
						font-family: 'SourceHanSerifCN-Bold';
						z-index: 2;
						color: #ffffff90;
						box-shadow: 0rpx -6px 0px -1rpx #00000010 inset;
					}
					.title {
						z-index: 3;
						font-size: 32rpx;
						font-family: 'SourceHanSerifCN-Bold';
						color: #fff;
						margin-bottom: 3rpx;
					}
					.desc {
						z-index: 3;
						font-size: 24rpx;
						color: #fff;
					}
				}
			}
			.list::before {
				content: '';
				position: absolute;
				background: linear-gradient(to top right, #1b460b90, #ffffff00);
				width: 100%;
				height: 100%;
				left: 0;
				bottom: 0;
				margin: 0;
				border-radius: 20rpx;
			}
		}
	}
}
.content_diy {
	margin-bottom: 150rpx;
	.content_nav {
		margin: 10rpx 0rpx 20rpx 0rpx;
		padding: 30rpx 20rpx 20rpx 20rpx;
		background-color: #fffffff2;
		border-radius: 20rpx;
		z-index: 2;
		.flex {
			display: flex;
			justify-content: space-between;
			position: relative;
			background: #f1f1f16b;
			margin-bottom: 30rpx;
			padding: 60rpx 20rpx 20rpx 20rpx;
			border-radius: 20rpx;
			.navmore {
				position: absolute;
				right: 22rpx;
				top: 10rpx;
				z-index: 10;
				font-size: 28rpx;
				text {
					margin-left: 30rpx;
				}
			}
			.nav {
				width: 100%;
				display: flex;
				flex-direction: column;
			}
			.nav:nth-child(2) {
				margin-left: 10rpx;
			}
			.nav:nth-child(3) {
				margin-left: 10rpx;
			}
			.list {
				background: #f3f3f3;
				border-radius: 20rpx;
				margin-bottom: 14rpx;
				height: 100%;
				padding: 60rpx 18rpx 18rpx 18rpx;
				font-size: 28rpx;
				display: flex;
				flex-direction: column-reverse;
				background-size: cover;
				position: relative;
				.navmore {
					position: absolute;
					right: 15rpx;
					top: 10rpx;
					z-index: 10;
					font-size: 28rpx;
					text {
						margin-left: 18rpx;
						background: #ffffff90;
						border-radius: 20rpx;
						font-size: 22rpx;
						padding: 4rpx 8rpx;
					}
				}
				.info {
					display: flex;
					flex-direction: column;
					position: relative;
					.num {
						position: absolute;
						top: -28rpx;
						font-size: 42rpx;
						font-family: 'SourceHanSerifCN-Bold';
						z-index: 2;
						color: #ffffff90;
						box-shadow: 0rpx -6px 0px -1rpx #00000010 inset;
					}
					.title {
						z-index: 3;
						font-size: 32rpx;
						font-family: 'SourceHanSerifCN-Bold';
						color: #fff;
						margin-bottom: 3rpx;
					}
					.desc {
						z-index: 3;
						font-size: 24rpx;
						color: #fff;
					}
				}
			}
			.list::before {
				content: '';
				position: absolute;
				background: linear-gradient(to top right, #1b460b90, #ffffff00);
				width: 100%;
				height: 100%;
				left: 0;
				bottom: 0;
				margin: 0;
				border-radius: 20rpx;
			}
		}
		.add {
			display: flex;
			justify-content: center;
			height: 80rpx;
			/* background: #555; */
			border-radius: 20rpx;
			border: 3rpx #a9a9a9 dotted;
			line-height: 80rpx;
			font-size: 28rpx;
			color: #333;
		}
		.addright {
			display: flex;
			justify-content: center;
			width: 10%;
			/* background: #555; */
			border-radius: 20rpx;
			border: 3rpx #a9a9a9 dotted;
			line-height: 80rpx;
			font-size: 28rpx;
			color: #333;
			margin-left: 14rpx;
			writing-mode: vertical-rl;
		}
	}
}
.nav_img {
	display: flex;
	align-items: center;
	.nav_img_oth {
		padding: 1vw;
		border-radius: 1vh;
		margin-left: 20rpx;
		color: $u-success;
		border: 1px solid $u-success;
	}
}
</style>
