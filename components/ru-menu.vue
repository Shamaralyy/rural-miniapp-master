<template>
	<view>
		<view class="menu_view" :class="menuBg ? '' : 'white'">
			<view class="view_content" :class="menuMr ? 'Mr' : ''" v-if="menuType == 0">
				<u-scroll-list :indicator="false">
					<view class="menuList" v-for="(item, index) in menuList" :key="index" @click="menuItemTap(item)">
						<view class="icon">
							<u-icon v-if="item.imgUrl" :name="item.imgUrl" :size="item.size"></u-icon>
						</view>
						<view class="title">
							<text>{{ item.title }}</text>
						</view>
					</view>
				</u-scroll-list>
			</view>
			<view class="view_content" :class="menuMr ? 'Mr' : ''" v-if="menuType != 0">
				<u-grid :border="false" :col="menuNum">
					<u-grid-item
						v-for="(listItem, listIndex) in menuList"
						:key="listIndex"
						@click="menuItemTap(listItem)"
					>
						<u-icon
							:name="listItem.imgUrl"
							:customStyle="{ paddingTop: 20 + 'rpx' }"
							:size="listItem.size"
						></u-icon>
						<text class="grid-text">{{ listItem.title }}</text>
					</u-grid-item>
				</u-grid>
			</view>
		</view>
	</view>
</template>

<script>
import { getDefault_menu } from '@/utils/defaultData.js';
export default {
	name: 'ru-menu',
	props: ['content'],
	data() {
		return {
			menuType: 0, //显示行数
			menuNum: 4,
			menuList: [],
			menuBg: true,
			menuMr: false
		};
	},
	mounted() {
		// this._setInitData();
	},
	watch: {
		content: {
			immediate: true,
			handler(newValue) {
				// console.log('content值', newValue);
				if (newValue) {
					this.menuMr = newValue.menuMr;
					this.menuBg = newValue.menuBg;
					this.menuNum = newValue.menuNum;
					this.menuType = newValue.menuType;
					this.menuList = newValue.menuList;
				} else {
					this._setInitData();
				}
			}
		}
	},
	methods: {
		_setInitData() {
			// console.log('首页模块数据', hasMenu(this.currentRural.module));

			let DefaultData = getDefault_menu();
			// console.log(DefaultData);
			this.menuMr = DefaultData.menuMr;
			this.menuBg = DefaultData.menuBg;
			this.menuNum = DefaultData.menuNum;
			this.menuType = DefaultData.menuType;
			this.menuList = DefaultData.menuList;
		},
		menuItemTap(e) {
			this.$emit('menuItemTap', e.url);
		}
	}
};
</script>

<style lang="scss" scoped>
.menu_view {
	display: flex;
	margin: 50rpx 0;

	.Mr {
		padding: 20rpx 0 40rpx 0;
		margin: 0 30rpx;
		border-radius: 20rpx;
		background: #fff;
	}
	.view_content {
		display: inherit;
		width: 100%;
		padding: 20rpx 0;
		// justify-content: space-evenly;
		overflow: scroll;
		.menuList {
			display: flex;
			width: 18vw;
			margin-right: 30rpx;
			flex-direction: column;
			.icon {
				display: flex;
				justify-content: center;
			}
			.title {
				text-align: center;
				font-size: 28rpx;
			}
		}
		.u-grid-item {
			display: flex;
			width: 20vw;
			flex-direction: column;
			.u-icon {
				display: flex;
				justify-content: center;
			}
			.grid-text {
				text-align: center;
				font-size: 28rpx;
			}
		}
	}
}
.white {
	background: #fff;
}
</style>
