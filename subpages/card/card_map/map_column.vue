<template>
	<view class="column">
		<u-loading-page loading-text="名片内容加载中..." :loading="loading"></u-loading-page>
		<list_1
			:newsTitle="newsTitle"
			:list="newsList"
			:rural_info="rural_info"
			v-if="list_style == 'list_1'"
			@goCard="goCard"
			@toInfo="toInfo"
		></list_1>
	</view>
</template>

<script>
const imgBaseUrl = getApp().globalData.imgBaseUrl + '/app/static/';
import { apiBusinessCardInfo_Get } from '@/API/乡村名片.js';
import { apiBusinessInformationInfoinformationId_Get, apiBusinessInformationPage_Post } from '@/API/乡村名片资讯.js';
import { apiBusinessCoordinateTagPage_Post, apiBusinessCoordinateTagInfo_Get } from '@/API/坐标分类62.js'; //标签
import { apiBusinessCoordinatePage_Post } from '@/API/坐标位置.js'; //列表
import { list_1 } from './column_styles/list_1';
import { cardListPage } from '@/components/mixins/cardList.js';
export default {
	mixins: [cardListPage],
	data() {
		return {
			pagesHeight: 1000,
			cardId: -1,
			menuwidth: 0,
			newsList: [],
			columns: [],
			list_style: 'list_1',
			newsTitle: '向导位置',
			loading: true,
			mapDemo:[]
		};
	},
	computed: {
		/* 拿取本乡村数据 */
		rural_info() {
			return this.$store.state.build.currentRural;
		}
	},
	components: { list_1 },
	onLoad(option) {
		new Promise(async (resolve, reject) => {
			try {
				await this.getLocation();
			} catch (e) {}
			resolve();
		}).finally(() => {
			// 需要实现的逻辑
			if (option.cardId) {
				console.log('携带cardID', option);
				this.getruralinfo(option);
			} else {
				console.log('不携带cardID');
				this.getTagInfo(option.tagId);
				this.getNewsList(option.tagId);
				if (option.tagId == null || option.tagId == 0) {
					this.getTagList(option.tagId);
				}
			}
		});

		// 获取导航栏高度
		let menu = wx.getMenuButtonBoundingClientRect();
		this.menuwidth = menu.width + menu.width / 7;

		let sysInfo = getApp().globalData.sysInfo;

		this.pagesWidth = sysInfo.windowWidth;
		this.pagesHeight = sysInfo.windowHeight;
	},
	methods: {
		/* 获取标签列表数据，专门为tag等于0的时候，那个list页面，可以做标签筛选*/
		getTagList(e) {
			apiBusinessCoordinateTagPage_Post({ cardId: e }).then(res => {
				if (res.data.code == 200) {
					this.columns = res.data.data;
				}
			});
		},

		/* 获取标签详情数据,栏目风格、栏目名称 */
		getTagInfo(e) {
			apiBusinessCoordinateTagInfo_Get({ tagId: e }).then(res => {
				console.log('获取栏目数据', res.data.data);
				try {
					if (res.data.data.tabTemplate != null) {
						console.log('有栏目模板', res.data.data);
						this.newsTitle = res.data.data.name;
						this.list_style = JSON.parse(res.data.data.tabTemplate).list_style.name;
					} else {
						this.newsTitle = res.data.data.name;
						console.log('没有栏目模板', res.data.data);
					}
				} catch (e) {
					console.log('xxxxxxx数据异常');
					//TODO handle the exception
				}
			});
		},
		/* 获取乡村数据 */
		getruralinfo(option) {
			apiBusinessCardInfo_Get({ cardId: option.cardId })
				.then(res => {
					// console.log('获取当前乡村数据', res);
					if (res.data.code == 200) {
						this.$store.commit('build/setCurrentRural_all', res.data.data);
						setTimeout(() => {
							this.getTagInfo(option.tagId);
							this.getNewsList(option.tagId);
						}, 1000);
					}
				})
				.catch(err => {
					console.error('乡村数据获取异常', err);
					uni.showToast({ icon: 'error', title: '异常' });
				});
		},
		getNewsList(informationId) {
			this.loding();
			let id = informationId;
			if (id == 0) {
				id = null;
			}
			let para = {
				...this.pagePara,
				cardId: this.rural_info.cardId /** 名片ID    string required:false */,
				tagId: id /** 标签ID    string required:false */,
				coordinateId: null /** 坐标ID    string required:false */,
				status: 1 /** 状态(0:未审核,1:已通过,2:未通过)    string required:false */,
				choiceness: null /** 是否推荐(0:是1:否)    string required:false */
			};
			console.log('标签请求体', para);
			apiBusinessCoordinatePage_Post(para)
				.then(res => {
					console.log('位置结果', res.data.data.records);
					let temp = res.data.data.records;
					temp.map(value => {
						try {
							value.urls = JSON.parse(value.images).map(vImg => {
								if (vImg.imgUrl) {
									return vImg.imgUrl;
								}
								return vImg.url;
							});
						} catch (e) {}
						value['distance'] = this.distance(value);
						
						var demo = {
							name:value.name,
							detail:value.detail,
							mapInfoUrl:"/subpages/card/card_map/map_info?coordinateId="+value.coordinateId,
							latitude:value.latitude,
							longitude:value.longitude
						}
						this.mapDemo = this.mapDemo.concat(demo)
						
					});
					this.loading = false;
					this.newsList = this.newsList.concat(temp);
					this.pageChange(res.data.data.records);
					
					console.log(JSON.stringify(this.mapDemo))
				})
				.finally(() => {
					uni.hideLoading();
				});
		},
		//计算距离 并返回 单位千米
		distance(para) {
			if (!para.latitude || !para.longitude) return null;
			if (this.g_myPosition.longitude == null || this.g_myPosition.latitude == null) return null;
			return this.g_distance(para, this.g_myPosition);
		},
		getLocation() {
			return new Promise((reserve, reject) => {
				//因为获取位置是异步接口所以需要使用promise
				uni.getLocation({
					success(res) {
						console.log('获取位置信息', res);
						reserve({
							longitude: res.longitude,
							latitude: res.latitude
						});
					},
					fail(err) {
						reject(location); //获取失败则返回经纬坐标为0
					}
				});
			}).then(position => {
				this.g_myPosition.longitude = position.longitude;
				this.g_myPosition.latitude = position.latitude;
				console.log('设置自身经纬', this.g_myPosition);
				console.log(typeof this.g_myPosition.longitude);
			});
		},

		goCard() {
			uni.redirectTo({
				url: '/subpages/card/card?cardId=' + this.rural_info.cardId
			});
		},
		clickImg(e) {
			// console.log('点击事件', e);
			uni.previewImage({
				urls: this.bannerimg,
				current: e
			});
		},
		toInfo(id) {
			console.log('传递数据', id);
			uni.navigateTo({
				url: './map_info?coordinateId=' + id
			});
		}
	}
};
</script>

<style lang="scss">
page {
	height: 100%;
	background: #f1f1f1;
}
.page {
	background: #f1f1f1;
	height: 100%;
	background-repeat: repeat;
}
</style>
