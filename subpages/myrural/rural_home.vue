<template>
	<view class="page">
		<view class="top_bg">
			<!-- <image src="https://cdn.xiangcunmingpian.com/app/static/login_bg_1.jpg" class="top_bg"  mode="widthFix"></image> -->
			<!-- <view class="box"></view> -->
			<u-swiper :list="bannerimg" radius="0" height="260" @change="change"></u-swiper>
		</view>
		<u-navbar :showAction="false" :placeholder="true" title=" " bgColor="#ffffff00" leftIconColor="#fff" :titleStyle="{ color: '#fff' }">
			<view class="u-nav-slot_left" slot="left" @click="navleft()">
				<view class="name">
					<text>{{ ruralname }}</text>
				</view>
				<view class=""><u-line direction="column" :hairline="false" length="20" margin="0 16rpx" color="#ffffff57"></u-line></view>
				<view class=""><u-icon :name="zhuan" size="18" color="#fff"></u-icon></view>
			</view>
			<view class="u-nav-slot_right" slot="right" :style="'right:' + menuwidth + 'px;bottom:' + menuwidth / 11 + 'px'" @click="ruarlcard()">
				<view class="title"><text>查看名片</text></view>
			</view>
		</u-navbar>
		<view class="plus" @click="pluson()">
			<view class=""><u-icon name="plus" color="#fff" size="18"></u-icon></view>
			<view class=""><text>发布</text></view>
		</view>
		<u-popup :show="plus_show" @close="plusclose()" round="20" bgColor="#ffffffe6">
			<view class="plus_show">
				<view class="show_title"><text>一起丰富乡村名片内容</text></view>
				<view class="show_nav">
					<u-grid :border="false" @click="click" col="4">
						<u-grid-item v-for="(baseListItem, baseListIndex) in baseList" :key="baseListIndex">
							<u-icon :customStyle="{ paddingTop: 20 + 'rpx' }" :name="baseListItem.name" :size="38"></u-icon>
							<text class="nav_text">{{ baseListItem.title }}</text>
						</u-grid-item>
					</u-grid>
				</view>
				<view class="show_close">
					<view class="close_text"><text>关闭</text></view>
				</view>
			</view>
		</u-popup>
		<view class="content_nav">
			<view class="banner_text">
				<view class="description">
					<u-icon name="map" size="16" color="#eaeaea"></u-icon>
					<text>广东惠州市平山镇</text>
				</view>
				<view class="map"><text>导航</text></view>
			</view>
			<view class="right_text" @click="joinbuild()"><text>参与本村建设</text></view>
			<u-grid :border="false" @click="click" col="4">
				<u-grid-item v-for="(baseListItem, baseListIndex) in navList" :key="baseListIndex">
					<u-icon :customStyle="{ paddingTop: 35 + 'rpx' }" :name="baseListItem.name" :size="42"></u-icon>
					<text class="grid-text">{{ baseListItem.title }}</text>
				</u-grid-item>
			</u-grid>
			<u-toast ref="uToast" />
		</view>

		<view class="content_guide">
			<view class="guide_nav">
				<view class="title">
					<text>{{ ruralname }}向导</text>
				</view>
				<view class="more"><text>查看全部</text></view>
			</view>
			<view class="guide_content">
				<u-scroll-list :indicator="false">
					<view class="guide_list" v-for="(item, index) in guidelist" :key="index">
						<view class="img"><image :src="item.imgurl" mode="widthFix"></image></view>
						<view class="title">
							<text>{{ item.name }}</text>
						</view>
					</view>
				</u-scroll-list>
			</view>
		</view>

		<view class="content_news">
			<view class="news_nav">
				<view class="title">
					<text>{{ ruralname }}风采</text>
				</view>
				<view class="more"><text>查看全部</text></view>
			</view>
			<view class="news_content">
				<u-scroll-list :indicator="false">
					<view class="news_list">
						<view class="img"><image src="https://cdn.xiangcunmingpian.com/app/static/rural_news_1.png" mode="aspectFill"></image></view>
						<view class="title"><text>那拉提旅游风景区那拉提旅游风景区</text></view>
					</view>
				</u-scroll-list>
			</view>
		</view>

		<view class="content_tabs">
			<u-tabs
				:list="tabslist"
				@click="click"
				lineColor="#04c354"
				:activeStyle="{ color: '#04c354', fontSize: '36rpx', fontWeight: 'bold', transform: 'scale(1.05)' }"
			></u-tabs>
		</view>
		<view class="content_sort">
			<view class="sort_list"><u-tag text="默认" plain size="mini" bg-color="#04c354" shape="circle" border-color="#04c354" color="#fff"></u-tag></view>
			<view class="sort_list"><u-tag text="距离最近" plain size="mini" bg-color="#fff" shape="circle" border-color="#fff" color="#333"></u-tag></view>
			<view class="sort_list"><u-tag text="人气排序" plain size="mini" bg-color="#fff" shape="circle" border-color="#fff" color="#333"></u-tag></view>
		</view>
		<view class="content_watefall">
			<view class="waterfall-box h-flex-x h-flex-2">
				<view>
					<helang-waterfall
						v-for="(item, index) in leftList"
						:key="index"
						:params="item"
						tag="left"
						:index="index"
						@height="onHeight"
						@click="onClick"
					></helang-waterfall>
				</view>
				<view>
					<helang-waterfall
						v-for="(item, index) in rightList"
						:key="index"
						:params="item"
						@height="onHeight"
						@click="onClick"
						tag="right"
						:index="index"
					></helang-waterfall>
				</view>
			</view>
			<view class="load-txt">{{ ajax.loadTxt }}</view>
		</view>
	</view>
</template>

<script>
const imgBaseUrl = getApp().globalData.imgBaseUrl + '/app' + '/static/';
export default {
	data() {
		return {
			zhuan: imgBaseUrl + 'zhuan.png',
			ruralname: '平安村',
			bannerimg: [
				'https://cdn.xiangcunmingpian.com/app/static/index_banner_2.jpg'
				//'https://cdn.xiangcunmingpian.com/app/static/-imagery-animation.gif',
			],
			navList: [
				{
					name: imgBaseUrl + 'myrural_nav_1.png',
					title: '本村故事'
				},
				{
					name: imgBaseUrl + 'myrural_nav_2.png',
					title: '本村地图'
				},
				{
					name: imgBaseUrl + 'myrural_nav_3.png',
					title: '本村好物'
				},
				{
					name: imgBaseUrl + 'myrural_nav_4.png',
					title: '本村活动'
				}
			],
			guidelist: [
				{
					id: '1',
					name: '那拉提旅游风景区',
					imgurl: 'https://cdn.xiangcunmingpian.com/app/static/rural_guide_1.png',
					type: '1',
					url: ''
				},
				{
					id: '2',
					name: '那拉提旅游风景区',
					imgurl: 'https://cdn.xiangcunmingpian.com/app/static/rural_guide_1.png',
					type: '1',
					url: ''
				},
				{
					id: '3',
					name: '那拉提旅游风景区',
					imgurl: 'https://cdn.xiangcunmingpian.com/app/static/rural_guide_1.png',
					type: '2',
					url: ''
				}
			],
			tabslist: [{ name: '推荐' }, { name: '红色乡村' }, { name: '旅游乡村' }, { name: '古村古寨' }, { name: '产业发展' }, { name: '手艺乡村' }],
			menuwidth: 0,
			show: false,
			//瀑布流参数设置开始
			leftHeight: 0,
			rightHeight: 0,
			leftList: [],
			rightList: [],
			ajax: {
				// 是否可以加载
				load: true,
				// 加载中提示文字
				loadTxt: '',
				// 每页的请求条件
				rows: 10,
				// 页码
				page: 1
			},
			//瀑布流参数设置结束
			plus_show: false,
			baseList: [
				{ name: `${imgBaseUrl}/static/rural_home_nav1.png`, title: '照片视频' },
				{ name: `${imgBaseUrl}/static/rural_home_nav2.png`, title: '发布村志' },
				{ name: `${imgBaseUrl}/static/rural_home_nav4.png`, title: '推荐地点' },
				{ name: `${imgBaseUrl}/static/rural_home_nav7.png`, title: '提供服务' }
			]
		};
	},
	onReady() {
		this.getList();
	},
	// 触底触发
	onReachBottom() {
		this.getList();
	},
	// 下拉刷新
	onPullDownRefresh() {
		// 正常情况下接口返回应该很会很快。故意延迟调用，让用户有在刷新的体验感
		setTimeout(() => {
			this.ajax.page = 1;
			this.leftHeight = 0;
			this.rightHeight = 0;
			this.ajax.load = true;
			this.getList();
		}, 800);
	},
	onLoad() {
		// 获取导航栏高度
		var that = this;
		
		let menu = wx.getMenuButtonBoundingClientRect();
		this.menuwidth = menu.width + menu.width / 7;
		uni.setTabBarItem({
			index: 1,
			text: this.ruralname
		});
	},
	methods: {
		// 监听高度变化
		onHeight(height, tag) {
			if (tag == 'left') {
				this.leftHeight += height;
			} else {
				this.rightHeight += height;
			}
		},
		navleft() {
			uni.navigateTo({
				url: './rural_list'
			});
		},
		ruarlcard() {
			uni.navigateTo({
				url: '../card/card'
			});
		},
		joinbuild() {
			uni.navigateTo({
				url: '../build/build'
			});
		},
		pluson() {
			this.plus_show = true;
			uni.hideTabBar({});
		},
		plusclose() {
			this.plus_show = false;
			uni.showTabBar({});
		},
		// 组件点击事件
		onClick(index, tag) {
			console.log(index, tag);
			// 对应的数据
			if (tag == 'left') {
				console.log(this.leftList[index]);
			} else {
				console.log(this.rightList[index]);
			}
			let direction = {
				left: '左',
				right: '右'
			};
			uni.showToast({
				title: `${direction[tag]}侧列表第${index + 1}个被点击`,
				icon: 'none'
			});
		},
		// 获取数据
		getList() {
			/* 
					无真实数据，当前由 setTimeout 模拟异步请求、
					自行替换 请求方法将数据 传入 addList() 方法中
					自行解决数据格式，自行修改组件内布局和内容绑定
				*/
			if (!this.ajax.load) {
				return;
			}
			this.ajax.load = false;
			this.ajax.loadTxt = '加载中';

			setTimeout(() => {
				// 生成随机数方法
				let random = (min = 0, max) => {
					return Math.floor(Math.random() * max) + min;
				};
				// 待选的图片数据
				let imgs = [];
				// 待选的标题数据
				let titles = ['平安村·龙脊梯田', '东坑村', '大坑村'];

				let res = [];
				for (let i = 0; i < 10; i++) {
					res.push({
						url: `https://cdn.xiangcunmingpian.com/app/static/index_waterfall_${random(1, 4)}.jpg`,
						title: titles[random(0, titles.length)],
						money: random(9, 9999),
						label: '官方自营',
						shop: '广东省惠东县'
					});
				}
				this.addList(res);
			}, 1000);
		},
		addList(res) {
			// 获取到的数据，请注意数据结构
			console.log(res);

			if (!res || res.length < 1) {
				this.ajax.loadTxt = '没有更多了';
				return;
			}

			// 左右列表高度的差
			let differ = this.leftHeight - this.rightHeight;
			// 计算差值，用于确定优先插入那一边
			let differVal = 0;

			// 初始化左右列表的数据
			let i = differ > 0 ? 1 : 0;

			let [left, right] = [[], []];

			// 获取插入的方向
			let getDirection = index => {
				/* 左侧高度大于右侧超过 600px 时，则前3条数据都插入到右边 */
				if (differ >= 600 && index < 3) {
					differVal = 1;
					return 'right';
				}

				/* 右侧高度大于左侧超过 600px 时，则前3条数据都插入到左边 */
				if (differ <= -600 && index < 3) {
					differVal = -1;
					return 'left';
				}

				/* 左侧高度大于右侧超过 350px 时，则前2条数据都插入到右边 */
				if (differ >= 350 && index < 2) {
					return 'right';
				}
				/* 右侧高度大于左侧超过 350px 时，则前2条数据都插入到左边 */
				if (differ <= -350 && index < 2) {
					differVal = -1;
					return 'left';
				}

				/* 当前数据序号为偶数时，则插入到左边 */
				if ((i + differVal) % 2 == 0) {
					return 'left';
				} else {
					/* 当前数据序号为奇数时，则插入到右边 */
					return 'right';
				}
			};

			// 将数据源分为左右两个列表，容错差值请自行根据项目中的数据情况调节
			res.forEach((item, index) => {
				if (getDirection(index) == 'left') {
					//console.log(`差值：${differ},方向：left，序号${index}`)
					left.push(item);
				} else {
					//console.log(`差值：${differ},方向：right，序号${index}`)
					right.push(item);
				}
				i++;
			});

			// 将左右列表的数据插入，第一页时则覆盖
			if (this.ajax.page == 1) {
				this.leftList = left;
				this.rightList = right;
				uni.stopPullDownRefresh();
			} else {
				this.leftList = [...this.leftList, ...left];
				this.rightList = [...this.rightList, ...right];
			}

			this.ajax.load = true;
			this.ajax.loadTxt = '上拉加载更多';
			this.ajax.page++;
		}
	}
};
</script>

<style lang="scss">
page {
	background: #f7f7f7;
	height: 100%;
	width: 100%;
}

.page {
	height: 100%;
	width: 100%;
	position: relative;
}

input {
	background-color: #00000000 !important;
}

.show_title {
	margin-bottom: 60rpx;
	font-size: 36rpx;
	font-family: 'SourceHanSerifCN-Bold';
}

.plus {
	position: fixed;
	bottom: 50rpx;
	right: 30rpx;
	background: #07b60590;
	font-size: 26rpx;
	padding: 20rpx;
	border-radius: 40rpx;
	color: #fff;
	display: flex;
	flex-direction: column;
	text-align: center;
	align-items: center;
	z-index: 10;
	box-shadow: 0 6rpx 18rpx #eee;
}

.plus_show {
	margin: 60rpx 40rpx 20rpx 40rpx;
	height: 400rpx;
	.show_nav {
		.nav_text {
			font-size: 28rpx;
		}
	}
	.show_close {
		display: flex;
		justify-content: center;
		margin-top: 60rpx;
	}
}

.u-nav-slot_left {
	display: flex;
	background: #0006;
	padding: 10rpx 20rpx;
	border-radius: 30rpx;
	color: #fff;
	.name {
		font-size: 28rpx;
		font-family: 'SourceHanSerifCN-Bold';
	}
	.title {
		font-size: 26rpx;
		font-weight: 400;
	}
}

.u-nav-slot_right {
	display: flex;
	background: #0006;
	padding: 10rpx 20rpx;
	border-radius: 30rpx;
	color: #fff;
	position: absolute;
	width: 100rpx;
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

//背景图片
.top_bg {
	width: 100%;
	position: absolute;
	top: 0;
	z-index: -1;
	.box {
		position: absolute;
		background: linear-gradient(#0000ff00 60%, #000000 100%);
		z-index: 1;
		bottom: 0;
		height: 100%;
		width: 100%;
		overflow: hidden;
	}
	.banner_text {
		position: absolute;
		z-index: 2;
		bottom: 65rpx;
		left: 26rpx;
		display: flex;
		overflow: hidden;
		.title {
			font-size: 36rpx;
			font-family: 'SourceHanSerifCN-Bold';
			color: #fff;
			margin-bottom: 10rpx;
		}
		.description {
			font-size: 26rpx;
			color: #eaeaea;
			display: flex;
		}
		.map {
			color: #100f0f;
			border-radius: 32rpx;
			font-size: 22rpx;
			padding: 0rpx 20rpx;
			margin-left: 10rpx;
			line-height: inherit;
			background: #ffffffe3;
		}
	}
	.right_text {
		position: absolute;
		z-index: 8;
		bottom: 60rpx;
		right: 26rpx;
		color: #eaeaea;
		background: #00000085;
		font-size: 24rpx;
		padding: 10rpx 20rpx;
		border-radius: 30rpx;
	}
}

.content_guide {
	margin: 30rpx;
	overflow: hidden;
	.guide_nav {
		display: flex;
		width: 100%;
		justify-content: space-between;
		margin-bottom: 30rpx;
		.title {
			font-size: 32rpx;
			font-family: 'SourceHanSerifCN-Bold';
		}
		.more {
			display: flex;
			font-size: 28rpx;
			height: 38rpx;
		}
	}
	.guide_content {
		.guide_list {
			width: 270rpx;
			background: #fff;
			border-radius: 15rpx;
			margin-right: 20rpx;
			.img {
				display: flex;
			}
			.img image {
				display: flex;
				border-radius: 15rpx 15rpx 0 0;
			}
			.title {
				display: flex;
				padding: 25rpx 10rpx;
				font-size: 28rpx;
				font-family: 'SourceHanSerifCN-Bold';
			}
		}
	}
}

.content_news {
	margin: 30rpx;
	overflow: hidden;
	.news_nav {
		display: flex;
		width: 100%;
		justify-content: space-between;
		margin-bottom: 30rpx;
		.title {
			font-size: 32rpx;
			font-family: 'SourceHanSerifCN-Bold';
		}
		.more {
			display: flex;
			font-size: 28rpx;
			height: 38rpx;
		}
	}
	.news_content {
		.news_list {
			width: 270rpx;
			background: #fff;
			border-radius: 15rpx;
			margin-right: 20rpx;
			.img {
				display: flex;
			}
			.img image {
				display: flex;
				border-radius: 15rpx 15rpx 0 0;
				height: 350rpx;
			}
			.title {
				display: flex;
				padding: 25rpx 10rpx;
				font-size: 28rpx;
				font-family: 'SourceHanSerifCN-Bold';
			}
		}
	}
}

.content_nav {
	margin: 280rpx 20rpx 20rpx 20rpx;
	padding: 0rpx 30rpx 20rpx 30rpx;
	background-color: #fff;
	border-radius: 20rpx;
	z-index: 2;
	position: relative;
	.grid-text {
		font-size: 28rpx;
		color: #232426;
		padding: 20rpx 0 20rpx 0rpx;
	}
	.banner_text {
		position: absolute;
		z-index: 2;
		top: -55rpx;
		left: 26rpx;
		display: flex;
		overflow: hidden;
		.title {
			font-size: 36rpx;
			font-family: 'SourceHanSerifCN-Bold';
			color: #fff;
			margin-bottom: 10rpx;
		}
		.description {
			font-size: 26rpx;
			color: #eaeaea;
			display: flex;
		}
		.map {
			color: #100f0f;
			border-radius: 32rpx;
			font-size: 22rpx;
			padding: 0rpx 20rpx;
			margin-left: 10rpx;
			line-height: inherit;
			background: #ffffffe3;
		}
	}
	.right_text {
		position: absolute;
		z-index: 8;
		top: -62rpx;
		right: 26rpx;
		color: #eaeaea;
		background: #00000085;
		font-size: 24rpx;
		padding: 10rpx 20rpx;
		border-radius: 30rpx;
	}
}

.content_tabs {
	margin: 20rpx 20rpx;
}

.content_sort {
	margin: 20rpx 50rpx 0rpx 50rpx;
	display: flex;
	.sort_list {
		margin-right: 20rpx;
	}
}

.content_watefall {
	margin: 20rpx 10rpx;
	.waterfall-box {
		padding: 20rpx 10rpx;
		box-sizing: border-box;

		> view {
			padding: 0 10rpx;
		}
	}

	.h-flex-x {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: flex-start;
		align-items: flex-start;
		align-content: flex-start;

		&.h-flex-2 {
			> view {
				width: 50%;
			}
		}
	}

	.load-txt {
		padding: 0 0 20rpx 0;
		text-align: center;
		color: #999;
		font-size: 24rpx;
	}
}
</style>
