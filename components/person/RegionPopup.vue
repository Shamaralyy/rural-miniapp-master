<template>
	<view class="">
		<uni-popup ref="popup" background-color="rgba(0,0,0,0)" @change="change">
			<view class="radius">
				<view class="title">
					<view class="tt">
						城市选择
					</view>
					<img @tap="closePopup" class="i_close" src="@/static/person/close.svg" alt="" srcset="" />
				</view>
				<scroll-view scroll-y="true" class="scroll-Y">
					<view class="regions-box">
						<view class="region" @tap="changeRegion(item)" v-for="item,index in regions" :key="index">
							{{item}}
						</view>
					</view>
				</scroll-view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				regions: ["北京", "天津", "上海", "重庆", "石家庄", "唐山", "秦皇岛", "邯郸", "邢台", "保定", "张家口", "承德", "沧州", "廊坊", "衡水",
					"太原", "大同", "阳泉", "长治", "晋城", "朔州", "晋中", "运城", "忻州", "临汾", "吕梁", "呼和浩特", "包头", "乌海", "赤峰", "通辽",
					"鄂尔多斯", "呼伦贝尔", "巴彦淖尔", "乌兰察布", "兴安盟", "阿拉善盟", "沈阳", "大连", "鞍山", "抚顺", "本溪", "丹东", "锦州",
					"营口", "阜新", "辽阳", "盘锦", "铁岭", "朝阳", "葫芦岛", "长春", "吉林", "四平", "辽源", "通化", "白山", "松原", "白城", , "哈尔滨"
				]
			}
		},
		methods: {
			change(e) {
				console.log('当前模式：' + e.type + ',状态：' + e.show);
			},
			openPopup() {
				this.$refs.popup.open('bottom')
			},
			closePopup() {
				this.$refs.popup.close();
			},
			changeRegion(val) {
				this.$refs.popup.close();
			}
		}
	}
</script>

<style lang="scss">
	@mixin flex {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
	}

	@mixin height {
		/* #ifndef APP-NVUE */
		height: 100%;
		/* #endif */
		/* #ifdef APP-NVUE */
		flex: 1;
		/* #endif */
	}

	.popup-content {
		@include flex;
		align-items: center;
		justify-content: center;
		padding: 15px;
		height: 50px;
		background-color: #fff;
	}

	.popup-height {
		@include height;
		width: 200px;
	}

	.radius {
		height: 800rpx;
		/* border-radius: 30rpx 30rpx 0 0; */
		background-color: #fff;
		padding: 15rpx;
	}

	.title {
		position: relative;
		width: 100%;
		height: 70rpx;
		line-height: 70rpx;
		border-bottom: 1px solid rgb(213, 213, 213);
		text-align: center;
		font-size: 33rpx;
		margin-bottom: 20rpx;
	}

	.i_close {
		position: absolute;
		right: 10rpx;
		width: 40rpx;
		height: 40rpx;
		top: 12rpx;
	}

	.scroll-Y {
		height: 720rpx;
	}

	.regions-box {
		display: grid;
		grid-row-gap: 20rpx;
		grid-template-columns: 1fr 1fr 1fr;
		justify-items: center;
	}

	.region {
		width: 200rpx;
		height: 60rpx;
		border-radius: 12rpx;
		background-image: linear-gradient(rgb(43, 220, 130), rgb(23, 195, 106));
		color: #fff;
		font-size: 30rpx;
		text-align: center;
		line-height: 60rpx;
	}
</style>