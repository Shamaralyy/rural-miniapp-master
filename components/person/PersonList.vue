<template>
	<view class="project-list">
		<view :class="['project-item','item-'+index]" v-for="item,index in projects" :key="index" @tap="reserve(index)">
			<img :src="item.show?item.imgSrc:''" alt="" mode="aspectFill" />
			<!-- 			<view v-show="!item.show" class="loading-area">
				<u-loading-icon size="36" mode="semicircle"></u-loading-icon>
			</view> -->
			<view class="msg">
				<view class="score">
					{{item.score}}分
				</view>
				<view class="title">
					{{item.title}}
				</view>
				<view class="feature age">
					{{item.age}}岁
				</view>
				<view class="feature gender">
					{{item.gender}}
				</view>
				<view class="detail">
					服务区域：{{item.detail}}
				</view>
				<view class="words">
					"{{item.words}}"
				</view>
				<view class="detail">
					累计服务{{item.orderNum}}单
				</view>
				<button class="reserve-btn">立即预约</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				projects: [{
						imgSrc: 'https://mp-6ee8886e-bdb9-43fa-a027-9714a1deafe6.cdn.bspapp.com/person/p4.png',
						title: '张师傅',
						age: 27,
						gender: '女',
						words: '风吹又日晒，自由又自在。',
						detail: '重庆市忠县',
						score: 4.9,
						orderNum: 105,
						show: false
					},
					{
						imgSrc: 'https://mp-6ee8886e-bdb9-43fa-a027-9714a1deafe6.cdn.bspapp.com/person/p2.png',
						title: '李师傅',
						age: 40,
						gender: '男',
						words: '一半家长里短，一半山川湖海。',
						detail: '重庆市垫江县',
						score: 4.4,
						orderNum: 118,
						show: false
					},
					{
						imgSrc: 'https://mp-6ee8886e-bdb9-43fa-a027-9714a1deafe6.cdn.bspapp.com/person/p3.png',
						title: '王师傅',
						age: 44,
						gender: '男',
						words: '你只管出发，旅途自有风景。',
						detail: '重庆市城口县',
						score: 4.6,
						orderNum: 89,
						show: false
					},
					{
						imgSrc: 'https://mp-6ee8886e-bdb9-43fa-a027-9714a1deafe6.cdn.bspapp.com/person/p1.png',
						title: '刘师傅',
						age: 43,
						gender: '男',
						words: '清醒，自律，知进退，明得失。',
						detail: '重庆市云阳县',
						score: 4.3,
						orderNum: 78,
						show: false
					},
					{
						imgSrc: 'https://mp-6ee8886e-bdb9-43fa-a027-9714a1deafe6.cdn.bspapp.com/person/p7.png',
						title: '孙师傅',
						age: 33,
						gender: '男',
						words: '换个地方看看人间烟火。',
						detail: '重庆市彭水县',
						score: 4.5,
						orderNum: 88,
						show: false
					},
					{
						imgSrc: 'https://mp-6ee8886e-bdb9-43fa-a027-9714a1deafe6.cdn.bspapp.com/person/p5.png',
						title: '周师傅',
						age: 35,
						gender: '女',
						words: '揣着一口袋的开心，满载而归。',
						detail: '重庆市石柱县',
						score: 4.7,
						orderNum: 89,
						show: false
					},
					{
						imgSrc: 'https://mp-6ee8886e-bdb9-43fa-a027-9714a1deafe6.cdn.bspapp.com/person/p6.png',
						title: '严师傅',
						age: 30,
						gender: '女',
						words: '生活的温柔藏在每一阵晚风里。',
						detail: '重庆市垫江县',
						score: 4.5,
						orderNum: 68,
						show: false
					},
					{
						imgSrc: 'https://mp-6ee8886e-bdb9-43fa-a027-9714a1deafe6.cdn.bspapp.com/person/p9.png',
						title: '刘师傅',
						age: 35,
						gender: '男',
						words: '世界会向那些有目标的人让路。',
						detail: '重庆市奉节县',
						score: 4.6,
						orderNum: 126,
						show: false
					},
					{
						imgSrc: 'https://mp-6ee8886e-bdb9-43fa-a027-9714a1deafe6.cdn.bspapp.com/person/p11.png',
						title: '陈师傅',
						age: 28,
						gender: '男',
						words: '再苦再累不掉队，再难再险不放弃。',
						detail: '重庆市秀山县',
						score: 4.4,
						orderNum: 134,
						show: false
					},
					{
						imgSrc: 'https://mp-6ee8886e-bdb9-43fa-a027-9714a1deafe6.cdn.bspapp.com/person/p8.png',
						title: '李师傅',
						age: 29,
						gender: '女',
						words: '不为失败找理由，要为成功想办法。',
						detail: '重庆市石柱县',
						score: 4.9,
						orderNum: 154,
						show: false
					},
					{
						imgSrc: 'https://mp-6ee8886e-bdb9-43fa-a027-9714a1deafe6.cdn.bspapp.com/person/p10.png',
						title: '何师傅',
						age: 25,
						gender: '女',
						words: '生活本痛苦，思想和哲理使其升。',
						detail: '重庆市秀山县',
						score: 4.8,
						orderNum: 143,
						show: false
					},
					{
						imgSrc: 'https://mp-6ee8886e-bdb9-43fa-a027-9714a1deafe6.cdn.bspapp.com/person/p13.webp',
						title: '张师傅',
						age: 50,
						gender: '男',
						words: '当生活给你苦痛，笑对它的面容。',
						detail: '重庆市忠县',
						score: 4.9,
						orderNum: 105,
						show: false
					},
					{
						imgSrc: 'https://mp-6ee8886e-bdb9-43fa-a027-9714a1deafe6.cdn.bspapp.com/person/p12.webp',
						title: '徐师傅',
						age: 43,
						gender: '女',
						words: '相信自己，你将创造奇迹。',
						detail: '重庆市垫江县',
						score: 4.4,
						orderNum: 118,
						show: false
					},
					{
						imgSrc: 'https://mp-6ee8886e-bdb9-43fa-a027-9714a1deafe6.cdn.bspapp.com/person/p14.webp',
						title: '王师傅',
						age: 38,
						gender: '男',
						words: '坚持不懈，成就无限可能。',
						detail: '重庆市城口县',
						score: 4.6,
						orderNum: 89,
						show: false
					},
					{
						imgSrc: 'https://mp-6ee8886e-bdb9-43fa-a027-9714a1deafe6.cdn.bspapp.com/person/p15.webp',
						title: '赵师傅',
						age: 29,
						gender: '女',
						words: '积极的思维塑造积极的未来。',
						detail: '重庆市云阳县',
						score: 4.3,
						orderNum: 78,
						show: false
					},
					{
						imgSrc: 'https://mp-6ee8886e-bdb9-43fa-a027-9714a1deafe6.cdn.bspapp.com/person/p16.webp',
						title: '孙师傅',
						age: 46,
						gender: '男',
						words: '无限的可能存在于勇于尝试。',
						detail: '重庆市彭水县',
						score: 4.5,
						orderNum: 88,
						show: false
					},
					{
						imgSrc: 'https://mp-6ee8886e-bdb9-43fa-a027-9714a1deafe6.cdn.bspapp.com/person/p17.webp',
						title: '周师傅',
						age: 35,
						gender: '女',
						words: '信心驱使，勇往直前。',
						detail: '重庆市石柱县',
						score: 4.7,
						orderNum: 89,
						show: false
					},
					{
						imgSrc: 'https://mp-6ee8886e-bdb9-43fa-a027-9714a1deafe6.cdn.bspapp.com/person/p18.webp',
						title: '郑师傅',
						age: 49,
						gender: '男',
						words: '挑战是成长的阶梯。',
						detail: '重庆市垫江县',
						score: 4.5,
						orderNum: 68,
						show: false
					},
					{
						imgSrc: 'https://mp-6ee8886e-bdb9-43fa-a027-9714a1deafe6.cdn.bspapp.com/person/p19.webp',
						title: '刘师傅',
						age: 27,
						gender: '女',
						words: '心怀感激，活出幸福的人生。',
						detail: '重庆市奉节县',
						score: 4.6,
						orderNum: 126,
						show: false
					},
					{
						imgSrc: 'https://mp-6ee8886e-bdb9-43fa-a027-9714a1deafe6.cdn.bspapp.com/person/p11.png',
						title: '陈师傅',
						age: 28,
						gender: '男',
						words: '用坚持书写辉煌，用汗水追逐梦想。',
						detail: '重庆市秀山县',
						score: 4.4,
						orderNum: 134,
						show: false
					},
					{
						imgSrc: 'https://mp-6ee8886e-bdb9-43fa-a027-9714a1deafe6.cdn.bspapp.com/person/p20.webp',
						title: '李师傅',
						age: 48,
						gender: '男',
						words: '心怀勇气，追逐你的热爱。',
						detail: '重庆市石柱县',
						score: 4.9,
						orderNum: 154,
						show: false
					},
					{
						imgSrc: 'https://mp-6ee8886e-bdb9-43fa-a027-9714a1deafe6.cdn.bspapp.com/person/p21.webp',
						title: '何师傅',
						age: 55,
						gender: '男',
						words: '扬帆启程，踏遍岁月河山。',
						detail: '重庆市秀山县',
						score: 4.8,
						orderNum: 143,
						show: false
					},
					{
						imgSrc: 'https://mp-6ee8886e-bdb9-43fa-a027-9714a1deafe6.cdn.bspapp.com/person/p22.webp',
						title: '曾师傅',
						age: 34,
						gender: '女',
						words: '当你追求梦想时，星辰将为你而舞。',
						detail: '重庆市石柱县',
						score: 4.7,
						orderNum: 89,
						show: false
					},
					{
						imgSrc: 'https://mp-6ee8886e-bdb9-43fa-a027-9714a1deafe6.cdn.bspapp.com/person/p23.webp',
						title: '郑师傅',
						age: 29,
						gender: '男',
						words: '追求真理，探索无尽的可能。',
						detail: '重庆市垫江县',
						score: 4.5,
						orderNum: 68,
						show: false
					},
					{
						imgSrc: 'https://mp-6ee8886e-bdb9-43fa-a027-9714a1deafe6.cdn.bspapp.com/person/p24.webp',
						title: '彭师傅',
						age: 50,
						gender: '男',
						words: '勇敢前行，生命将不再有遗憾。',
						detail: '重庆市奉节县',
						score: 4.6,
						orderNum: 126,
						show: false
					},
					{
						imgSrc: 'https://mp-6ee8886e-bdb9-43fa-a027-9714a1deafe6.cdn.bspapp.com/person/p11.png',
						title: '陈师傅',
						age: 28,
						gender: '男',
						words: '勇敢面对挑战，迎接更好的自己。',
						detail: '重庆市秀山县',
						score: 4.4,
						orderNum: 134,
						show: false
					},
					{
						imgSrc: 'https://mp-6ee8886e-bdb9-43fa-a027-9714a1deafe6.cdn.bspapp.com/person/p25.webp',
						title: '覃师傅',
						age: 24,
						gender: '女',
						words: '每一次坚持，都是迈向成功的一步。',
						detail: '重庆市石柱县',
						score: 4.9,
						orderNum: 154,
						show: false
					},
					{
						imgSrc: 'https://mp-6ee8886e-bdb9-43fa-a027-9714a1deafe6.cdn.bspapp.com/person/p26.webp',
						title: '谢师傅',
						age: 57,
						gender: '男',
						words: '笑对人生。',
						detail: '重庆市秀山县',
						score: 4.8,
						orderNum: 143,
						show: false
					},
					{
						imgSrc: 'https://mp-6ee8886e-bdb9-43fa-a027-9714a1deafe6.cdn.bspapp.com/person/p27.webp',
						title: '袁师傅',
						age: 29,
						gender: '女',
						words: '给梦想一片翅膀，让它飞向远方。',
						detail: '重庆市石柱县',
						score: 4.9,
						orderNum: 154,
						show: false
					},
					{
						imgSrc: 'https://mp-6ee8886e-bdb9-43fa-a027-9714a1deafe6.cdn.bspapp.com/person/p28.webp',
						title: '谭师傅',
						age: 34,
						gender: '女',
						words: '成就独一无二的骄傲。',
						detail: '重庆市忠县',
						score: 4.9,
						orderNum: 105,
						show: false
					},
					{
						imgSrc: 'https://mp-6ee8886e-bdb9-43fa-a027-9714a1deafe6.cdn.bspapp.com/person/p29.webp',
						title: '苏师傅',
						age: 27,
						gender: '女',
						words: '不畏艰辛，追逐内心的声音。',
						detail: '重庆市垫江县',
						score: 4.4,
						orderNum: 118,
						show: false
					},
					{
						imgSrc: 'https://mp-6ee8886e-bdb9-43fa-a027-9714a1deafe6.cdn.bspapp.com/person/p30.webp',
						title: '王师傅',
						age: 28,
						gender: '女',
						words: '时光见证我奋斗的足迹。',
						detail: '重庆市城口县',
						score: 4.6,
						orderNum: 89,
						show: false
					},
					{
						imgSrc: 'https://mp-6ee8886e-bdb9-43fa-a027-9714a1deafe6.cdn.bspapp.com/person/p32.webp',
						title: '马师傅',
						age: 32,
						gender: '男',
						words: '激情燃烧，梦想铸就辉煌的未来。',
						detail: '重庆市云阳县',
						score: 4.3,
						orderNum: 78,
						show: false
					},
					{
						imgSrc: 'https://mp-6ee8886e-bdb9-43fa-a027-9714a1deafe6.cdn.bspapp.com/person/p33.webp',
						title: '孙师傅',
						age: 43,
						gender: '男',
						words: '人生逆境时，切记忍耐。',
						detail: '重庆市彭水县',
						score: 4.5,
						orderNum: 88,
						show: false
					},
					{
						imgSrc: 'https://mp-6ee8886e-bdb9-43fa-a027-9714a1deafe6.cdn.bspapp.com/person/p31.webp',
						title: '周师傅',
						age: 35,
						gender: '女',
						words: '心怀感恩，幸福会陪伴左右。',
						detail: '重庆市石柱县',
						score: 4.7,
						orderNum: 89,
						show: false
					},
					{
						imgSrc: 'https://mp-6ee8886e-bdb9-43fa-a027-9714a1deafe6.cdn.bspapp.com/person/p34.webp',
						title: '柳师傅',
						age: 29,
						gender: '男',
						words: '与时俱进，挑战自我，不断超越。',
						detail: '重庆市垫江县',
						score: 4.5,
						orderNum: 68,
						show: false
					},
					{
						imgSrc: 'https://mp-6ee8886e-bdb9-43fa-a027-9714a1deafe6.cdn.bspapp.com/person/p35.webp',
						title: '袁师傅',
						age: 34,
						gender: '女',
						words: '每一刻都是新的起点。',
						detail: '重庆市奉节县',
						score: 4.6,
						orderNum: 126,
						show: false
					},
					{
						imgSrc: 'https://mp-6ee8886e-bdb9-43fa-a027-9714a1deafe6.cdn.bspapp.com/person/p36.webp',
						title: '陈师傅',
						age: 34,
						gender: '女',
						words: '微笑会为你开启新的大门。',
						detail: '重庆市秀山县',
						score: 4.4,
						orderNum: 134,
						show: false
					},
					{
						imgSrc: 'https://mp-6ee8886e-bdb9-43fa-a027-9714a1deafe6.cdn.bspapp.com/person/p8.png',
						title: '李师傅',
						age: 29,
						gender: '女',
						words: '保持初心，永不放弃。',
						detail: '重庆市石柱县',
						score: 4.9,
						orderNum: 154,
						show: false
					}
				]
			}
		},
		created() {
			this.lazyImg(this.projects);
		},
		methods: {
			reserve(index) {
				uni.navigateTo({
					url: '/pages/person/detail?msg=' + JSON.stringify(this.projects[index])
				})
			},
			lazyImg(proList) {
				for (let i = 0; i < proList.length; i++) {
					this.createIntersectionObserver().relativeToViewport({
						bottom: 20
					}).observe('.item-' + i, (res) => {
						proList[i].show = true
					})
				}
			}
		}
	}
</script>

<style>
	.project-list {
		width: 750rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.project-item {
		position: relative;
		width: 680rpx;
		line-height: 45rpx;
		padding: 20rpx;
		background-color: #fff;
		display: flex;
		border-radius: 30rpx;
		margin-bottom: 20rpx;
	}

	.project-item img {
		width: 240rpx;
		height: 260rpx;
		margin-right: 20rpx;
	}

	/* 	.loading-area {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 240rpx;
		height: 260rpx;
	} */

	.project-item .msg {
		font-size: 24rpx;
	}

	.project-item .msg .title {
		font-size: 35rpx;
		font-weight: 600;
	}

	.project-item .msg .detail {
		color: grey;
	}

	.score {
		position: absolute;
		top: 0;
		right: 0;
		width: 156rpx;
		height: 50rpx;
		line-height: 50rpx;
		background-color: rgb(78, 157, 75);
		color: white;
		text-align: center;
		border-radius: 0 0 20rpx 20rpx;
		font-size: 30rpx;
	}

	.feature {
		display: inline-block;
		height: 20rpx;
		line-height: 20rpx;
		color: white;
		text-align: center;
		padding: 8rpx;
		border-radius: 10rpx;
		font-size: 20rpx;
	}

	.age {
		background-color: rgb(221, 129, 66);
		margin-right: 16rpx;
		padding: 8rpx 20rpx 8rpx 20rpx;
	}

	.gender {
		background-color: rgb(98, 146, 207);
	}

	.words {
		display: inline-block;
		background-color: rgb(251, 226, 194);
		color: rgb(221, 129, 66);
		text-align: center;
		padding: 0 10rpx 0 10rpx;
	}

	.reserve-btn {
		width: 190rpx;
		height: 50rpx;
		line-height: 50rpx;
		border: 1px solid rgb(106, 196, 160);
		border-radius: 30rpx;
		color: rgb(106, 196, 160);
		text-align: center;
		font-size: 28rpx;
		margin: 0rpx 0 0 244rpx;
	}
</style>