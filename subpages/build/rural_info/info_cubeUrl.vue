<!-- 魔方地址 -->
<template>
	<view>
		<u-navbar
			:autoBack="true"
			:placeholder="true"
			title="名片链接选择"
			bgColor="#ffffff"
			leftIconColor="#303030"
			:titleStyle="{ color: '#303030' }"
		></u-navbar>
		<view class="cube">
			<view class="navTitle"><text>名片链接</text></view>
			<view v-for="(item, index) in urlList">
				<view class="cubeList">
					<view>
						<text>{{ item.name }}</text>
					</view>
					<view><u-button text="选择" size="small" shape="circle" @click="select(item)"></u-button></view>
				</view>
			</view>
		</view>
		<!-- 弹出输入框 -->
		<u-popup :show="isShow" mode="bottom" closeable="true" @close="popClose()">
			<!-- VR全景 -->
			<view class="camter" v-if="popType == 2">
				<u--input placeholder="请输入乡村名片全景平台全景作品链接" border="surround" v-model="value"></u--input>
				<text style="font-size: 26rpx;margin-top: 10rpx;">乡村名片全景平台(vr.xiangcunmingpian.com)</text>
				<view class="button">
					<u-button color="#56a96e" text="确认" @click="confirm" :disabled="disabled"></u-button>
				</view>
			</view>
			<!-- 外部APP -->
			<view class="camter" v-show="popType == 8">
				<u--form labelPosition="left" :model="otherApp" :rules="otherAppRules" ref="uForm" :labelWidth="65">
					<u-form-item label="AppID" prop="appId">
						<u-input
							placeholder="请输入外部小程序AppID"
							border="surround"
							v-model="otherApp.appId"
						></u-input>
					</u-form-item>
					<u-form-item label="path" prop="path">
						<u-input
							placeholder="请输入外部小程序跳转路径"
							border="surround"
							v-model="otherApp.path"
						></u-input>
					</u-form-item>
				</u--form>
				<view class="button"><u-button color="#56a96e" text="确认" @click="checkSubmit"></u-button></view>
			</view>
		</u-popup>
		<view class="cube">
			<view class="navTitle"><text>栏目链接</text></view>
			<view v-for="(item, index) in tagsList">
				<view class="cubeList">
					<view>
						<text>{{ item.name }}</text>
					</view>
					<view><u-button text="选择" size="small" shape="circle" @click="submitTags(item)"></u-button></view>
				</view>
				<view class="cubeList1" v-for="(item1, index1) in item.list">
					<view>
						<text>{{ item1.name }}</text>
					</view>
					<view>
						<u-button text="选择" size="small" shape="circle" @click="submitTags(item, item1)"></u-button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { uniTrim } from '@/utils/Utils-tool.js';
import { apiBusinessCoordinateTagTagLabel_Get } from '@/API/坐标分类62.js';
import { apiBusinessInformationTagTagLabel_Get } from '@/API/资讯标签.js';
import { apiBusinessCommodityTagTagLabel_Get } from '@/API/好物标签.js';
import { apiBusinessAtlasTagTagLabel_Get } from '@/API/图集标签.js';
import { mapState } from 'vuex';
import { getRule, getTagList } from './rules.js';
export default {
	watch: {
		value(e) {
			e ? (this.disabled = false) : (this.disabled = true);
		},
		popType(newvalue) {
			if (newvalue == 8) {
				this.$refs.uForm.setRules(this.otherAppRules);
			}
		}
	},
	computed: {
		...mapState('build', ['currentRural', 'tempMagicPara'])
	},
	data() {
		return {
			/**
			 * |-name	用于魔方跳转路径的显示 掩盖真实程序路径
			 * |-type	页面类型
			 * 		|-0	本村本card跳转tabbar	其他待定
			 * 			|-page	跳转目标
			 * 		|-1	本村本card跳转其他固定页面
			 * 			|-page	不同page不同页面 如：page:0 关于本村页
			 * 		|-2	自定义全景url 跳至webView
			 * 			|-url	全景地址
			 * 		|-3	自定义小程序URL
			 * 			|-url	整个小程序万能URL 支持加参数
			 * 		|-4 news资讯
			 * 			|-tag标签分类id
			 * 		|-5 map位置
			 * 			|-tag标签分类id
			 * 		|-6 service好物
			 * 			|-tag标签分类id
			 * 		|-7 photo图集
			 * 			|-tag标签分类id
			 * 		|-8 外部小程序
			 * 			|-appId ,
			 *  		|-path  跳转路径,
			 * */
			urlList: [
				{ name: '向导页', type: 0, page: 1 },
				// { name: '发现页', type: 0, page: 2 },
				{ name: '我的页', type: 0, page: 3 },
				{ name: '关于本村页', type: 1, page: 0 },
				{ name: '全景链接', type: 2, url: '' },
				{ name: '外部小程序', type: 8, appId: '', path: '' }
			],
			tagsList: getTagList(),
			otherApp: { appId: '', path: '' },
			otherAppRules: getRule(),
			cardId: 0,
			value: '', //链接内容
			disabled: true, //按钮置灰
			isShow: false, //弹出框状态
			popType: -1 //弹出类型
			// currentRural:{
			// 	cardId:89314
			// }
		};
	},
	onLoad(option) {
		//标签
		this.mapTagList1();
		this.mapTagList2();
		this.mapTagList3();
		this.mapTagList4();
	},
	onReady() {
		this.value = this.$store.state.build.tempVrUrl;
		this.otherApp = this.$store.state.build.tempOtherApp;
	},
	methods: {
		//关闭弹出框
		popClose() {
			this.isShow = false;
			this.popType = -1;
		},
		mapTagList1() {
			apiBusinessCoordinateTagTagLabel_Get({
				cardId: this.currentRural.cardId //名片
			}).then(res => {
				// console.log('坐标分类获取结果', res);
				if (res.data.code == 200) {
					this.tagsList[1].list = res.data.data;
				}
			});
		},
		//标签
		mapTagList2() {
			apiBusinessInformationTagTagLabel_Get({
				cardId: this.currentRural.cardId //名片
			}).then(res => {
				// console.log('坐标分类获取结果', res);
				if (res.data.code == 200) {
					if (res.data.code == 200) {
						this.tagsList[0].list = res.data.data;
					}
				}
			});
		},
		//标签
		mapTagList3() {
			apiBusinessCommodityTagTagLabel_Get({
				cardId: this.currentRural.cardId //名片
			}).then(res => {
				// console.log('坐标分类获取结果', res);
				if (res.data.code == 200) {
					if (res.data.code == 200) {
						this.tagsList[2].list = res.data.data;
					}
				}
			});
		},
		mapTagList4() {
			apiBusinessAtlasTagTagLabel_Get({
				cardId: this.currentRural.cardId //名片
			}).then(res => {
				// console.log('坐标分类获取结果', res);
				if (res.data.code == 200) {
					if (res.data.code == 200) {
						this.tagsList[3].list = res.data.data;
					}
				}
			});
		},
		/* 校验外部App相关输入 */
		checkSubmit() {
			this.$refs.uForm
				.validate()
				.then(res => {
					uni.$u.toast('填写成功');
					let tempItem = this.urlList.filter(value => value.type == 8)[0];
					tempItem.appId = this.otherApp.appId;
					tempItem.path = this.otherApp.path;
					console.log('选中数据', tempItem);
					this.submit(tempItem);
				})
				.catch(errors => {
					uni.$u.toast('请完善信息');
				});
		},
		/* 选中 */
		select(item) {
			if (item.type == 2) {
				this.popType = 2;
				this.isShow = true;
				return;
			} else if (item.type == 8) {
				this.popType = 8;
				this.isShow = true;
				return;
			}
			this.submit(item);
		},
		// 输入确认
		confirm() {
			if (uniTrim(this.value) == '') {
				uni.showToast({ icon: 'none', title: '自定义链接不能为空' });
				return;
			}
			if (this.value.indexOf('xiangcunmingpian.com') == -1) {
				uni.showToast({ icon: 'error', title: '自定义链接不合法' });
				return;
			}
			let tempItem = this.urlList.filter(value => value.type == 2)[0];
			tempItem.url = this.value;
			this.submit(tempItem);
		},
		submitTags(item, item1) {
			console.log(item, item1);
			if (item1 == undefined || item1 == null) {
				var selectData = {
					name: item.name + '全部内容',
					type: item.type,
					tag: 0
				};
				console.log(selectData);
				this.$store.commit('build/setTempMagicPara', selectData);
				uni.showToast({
					title: '选择成功'
				});
				setTimeout(() => {
					uni.navigateBack({
						delta: 1
					});
				}, 500);
			} else {
				let data = item;
				if (data.type == 4) {
					data.tags = item1.infoTagId;
				}
				if (data.type == 5) {
					data.tags = item1.coordinateTagId;
				}
				if (data.type == 6) {
					data.tags = item1.infoTagId;
				}
				if (data.type == 7) {
					data.tags = item1.infoTagId;
				}
				var selectData = {
					name: item.name + ' - ' + item1.name,
					type: item.type,
					tag: data.tags
				};
				console.log(selectData);
				this.$store.commit('build/setTempMagicPara', selectData);
				uni.showToast({
					title: '选择成功'
				});
				setTimeout(() => {
					uni.navigateBack({
						delta: 1
					});
				}, 500);
			}
		},
		submit(item) {
			this.$store.commit('build/setTempMagicPara', item);
			uni.showToast({ title: '选择成功' });
			setTimeout(() => {
				uni.navigateBack({ delta: 1 });
			}, 500);
		}
	}
};
</script>

<style scoped lang="scss">
.cube {
	margin: 10rpx 30rpx;
	.navTitle {
		margin-bottom: 20rpx;
	}
	.cubeList {
		padding: 10rpx 30rpx;
		text-align: center;
		display: flex;
		background: #f1f1f1;
		margin-bottom: 10rpx;
		align-items: center;
		justify-content: space-between;
		border-radius: 20rpx;
	}

	.cubeList1 {
		padding: 10rpx 30rpx;
		text-align: center;
		display: flex;
		background: #f1f1f1;
		margin-bottom: 10rpx;
		align-items: center;
		justify-content: space-between;
		border-radius: 20rpx;
		margin-left: 60rpx;
	}
}
.camter {
	padding: 0 35rpx;
	padding-top: 102rpx;
}
.button {
	padding: 60rpx 10%;
}
</style>
