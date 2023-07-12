<!-- 魔方地址 -->
<template>
	<view>
		<u-navbar
			:autoBack="true"
			:placeholder="true"
			title="图标图片选择"
			bgColor="#ffffff"
			leftIconColor="#303030"
			:titleStyle="{ color: '#303030' }"
		></u-navbar>
		<view class="" v-if="readlock">
			<u-tabs
				:list="tabslist"
				lineColor="#04c354"
				:current="current"
				@change="clickTags"
				:activeStyle="{
					color: '#04c354',
					fontSize: '32rpx',
					fontWeight: 'bold',
					transform: 'scale(1.05)'
				}"
			></u-tabs>
		</view>
		<view class="cube" v-if="tagName == '通用图标'">
			<u-grid :border="true" col="5">
				<u-grid-item
					@click="iconTap(baseListItem)"
					v-for="(baseListItem, baseListIndex) in baseList"
					:key="baseListIndex"
				>
					<u-icon :customStyle="{ paddingTop: 20 + 'rpx' }" :name="baseListItem.name" :size="32"></u-icon>
					<text class="grid-text">{{ baseListItem.title }}</text>
				</u-grid-item>
			</u-grid>
		</view>
		<view class="cubeMap" v-if="tagName == '坐标图标'">
			<u-grid :border="true" col="5">
				<u-grid-item
					@click="iconTap(baseListItem)"
					v-for="(baseListItem, baseListIndex) in baseList2"
					:key="baseListIndex"
				>
					<u-icon :customStyle="{ paddingTop: 20 + 'rpx' }" :name="baseListItem.name" :size="32"></u-icon>
					<text class="grid-text">{{ baseListItem.title }}</text>
				</u-grid-item>
			</u-grid>
		</view>
		<view class="cubeMap" v-if="tagName == '菜单图标'">
			<u-grid :border="true" col="5">
				<u-grid-item
					@click="iconTap(baseListItem)"
					v-for="(baseListItem, baseListIndex) in baseList3"
					:key="baseListIndex"
				>
					<u-icon :customStyle="{ paddingTop: 20 + 'rpx' }" :name="baseListItem.name" :size="22"></u-icon>
					<text class="grid-text">{{ baseListItem.title }}</text>
				</u-grid-item>
			</u-grid>
		</view>
		<view class="cubeMap" v-show="tagName == '上传图标'">
			<ru-file-upload
				@upPara="getImgData"
				:iniCount="1"
				paraGetMethods="active"
				iniTopPath="images/icon"
			></ru-file-upload>
			<view class=""><button @click="selectSelficon">使用此图标</button></view>
		</view>
		<view class="photo" v-show="type == 2 || type == '2'">
			<view style="margin: 30rpx;">
				<u-empty text="暂无内容~" v-if="news_list.length == 0" :icon="myImgBaseUrl + 'noTags.png'"></u-empty>
			</view>
			<view class="list_top" v-for="(item, index) in news_list">
				<u-swiper
					:list="item.urls | srImg"
					previousMargin="30"
					nextMargin="30"
					circular
					:height="200"
					:autoplay="false"
					radius="5"
					@click="e => selectImg(e, index)"
					bgColor="#ffffff"
				></u-swiper>
			</view>
		</view>
	</view>
</template>

<script>
import { getDefault_icon1, getDefault_icon2,getDefault_icon3 } from '@/utils/defaultIconData.js';
import { apiBusinessAtlasPage_Post } from '@/API/图集.js';
import { cardListPage } from '@/components/mixins/cardList.js';
const imgBaseUrl = getApp().globalData.imgBaseUrl + '/app/static/';
const imgSuffix = getApp().globalData.imgSuffix;
export default {
	mixins: [cardListPage],
	computed: {
		rural_info() {
			return this.$store.state.build.currentRural;
		}
	},
	data() {
		return {
			myImgBaseUrl: imgBaseUrl,
			type: -1,
			current: 0,
			tabslist: [],
			baseList: [],
			baseList2: [],
			baseList3: [],
			readlock: false,
			news_list: [], //图集列表
			tagName: '通用图标',
			selfIcon: '' //选中的图片
		};
	},
	filters: {
		srImg(urlArr) {
			return urlArr.map(value => {
				if (value.indexOf('cdn.xiangcunmingpian.com') != -1) {
					return value + imgSuffix[1];
				} else {
					return value;
				}
			});
		}
	},
	onLoad(option) {
		this.type = option.type || this.type;
		if (option.type) {
			if (option.type == 1 || option.type == '1') {
				this.tabslist = ['通用', '坐标', '菜单', '上传'].map(value => ({ name: value + '图标' }));
				this.initIconList('baseList', getDefault_icon1());
				this.initIconList('baseList2', getDefault_icon2());
				this.initIconList('baseList3', getDefault_icon3());
			} else if (option.type == 2 || option.type == '2') {
				this.tabslist = ['本村'].map(value => ({ name: value + '图集' }));
				this.getNewsList();
			}
		} else {
			this.tabslist = [];
			this.initIconList('baseList', getDefault_icon1());
			this.initIconList('baseList2', getDefault_icon2());
			this.initIconList('baseList3', getDefault_icon3());
		}
		if (option.icon == 'map') {
			this.current = 1;
			this.tagName = '坐标图标';
		}
	},
	onReady() {
		this.readlock = true;
	},
	methods: {
		/** 初始化数据列表
		 *	@param 	{listName} 	列表名
		 * 	@param	{listScour}	数据源
		 * */
		initIconList(listName, listScour) {
			let start = 0 /* 起始索引 */,
				conut = 10 /* 每次读取的个数 */,
				endIndex = start + conut; /* 结束索引 */
			const id = setInterval(() => {
				this[listName] = this[listName].concat(listScour.slice(start, endIndex));
				start += conut;
				endIndex = start + conut > listScour.length - 1 ? listScour.length - 1 : start + conut;
				if (start >= listScour.length) {
					clearInterval(id);
				}
			}, 100);
		},
		//设置图标
		setIcon(icon) {
			this.selfIcon = icon;
		},
		getImgData(e) {
			console.log('上传组件数据', e);
			if (e.length == 0) {
				this.setIcon('');
			} else {
				this.setIcon(e[0]);
			}
		},
		/* 图标点击事件 */
		iconTap(e) {
			console.log('选中图标', e.name);
			this.setIcon(e.name);
			uni.$emit('menuIcon', this.selfIcon);
			this.goBack();
		},
		/* 选择菜单图标 */
		selectSelficon() {
			if (this.selfIcon == '') {
				uni.showToast({ icon: 'none', title: '请先上传图片' });
				return;
			}
			uni.$emit('menuIcon', this.selfIcon);
			this.goBack();
		},
		// 轮播图选择
		selectImg(e, index) {
			console.log(e, index);
			uni.$emit('naviChangeImg', this.news_list[index].urls[e]);
			this.goBack();
		},
		clickTags(e) {
			if (e.index == this.current) return;
			this.current = e.index;
			this.tagName = this.tabslist[e.index].name;
		},
		//返回上一页
		goBack() {
			uni.showToast({ title: '选择成功' });
			setTimeout(() => {
				uni.navigateBack({ delta: 1 });
			}, 500);
		},
		getNewsList() {
			if (this.type != 2 || this.type != '2') return;

			this.loding();
			apiBusinessAtlasPage_Post({
				...this.pagePara,
				cardId: this.rural_info.cardId //乡村ID
				// tagId: this.Pageinput.tagId, //分类ID,
				// status: this.rural_info.status
			})
				.then(res => {
					if (res.data.code == 200) {
						if (res.data.data.records.length == 0) return;

						let temp = res.data.data.records.reverse();
						temp.map(value => {
							try {
								value.urls = JSON.parse(value.urls);
								value.urls = value.urls.map(vImg => {
									if (vImg.imgUrl) {
										return vImg.imgUrl;
									}
									return vImg.url;
								});
							} catch (e) {
								// console.log('x value.urls解析失败', value.urls);
								//TODO handle the exception
							}
						});
						this.news_list = this.news_list.concat(temp);
						console.log('解析结果', this.news_list);
						this.pageChange(res.data.data.records);
					}
				})
				.finally(() => {
					uni.hideLoading();
				});
		}
	}
};
</script>

<style lang="scss">
.grid-text {
	font-size: 14px;
	color: #909399;
	padding: 10rpx 0 20rpx 0rpx;
	/* #ifndef APP-PLUS */
	box-sizing: border-box;
	/* #endif */
}

.cube {
	margin: 30rpx 10rpx;

	.cubeList {
		padding: 50rpx;
		text-align: center;
		display: flex;
		background: #f1f1f1;
		margin-bottom: 30rpx;
		align-items: center;
		justify-content: center;
		border-radius: 20rpx;
	}
}
.photo {
	.list_top {
		margin: 4vh auto;
	}
}
</style>
