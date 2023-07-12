<!-- mini导航信息 -->
<template>
	<view>
		<u-popup :show="state" @close="state = false">
			<view class="plus_show">
				<view>{{ Info.name }}</view>
				<view class="" @click="toInfo">点击查看</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
import { apiBusinessCoordinateInfocoordinateId_Get } from '@/API/坐标位置.js';
export default {
	name: 'miniMapInfo',
	data() {
		return {
			state: false,
			id: -1,
			Info: {}
		};
	},
	methods: {
		getInfo(id) {
			apiBusinessCoordinateInfocoordinateId_Get({ coordinateId: id })
				.then(res => {
					console.log('mapInfo请求结果', res.data.data);
					this.Info = res.data.data;
				})
				.then(() => {
					this.id = id;
				});
		},
		/* 跳转详情页 */
		toInfo() {
			if (this.id == -1) return;
			uni.navigateTo({
				url: '/subpages/card/card_map/map_info?coordinateId=' + this.id
			});
			this.state = false;
		}
	},
	computed: {
		/* 拿取本乡村数据 */
		rural_info() {
			return this.$store.state.build.currentRural;
		}
	},
	mounted() {
		uni.$on('getInfo', id => {
			this.state = true;
			this.getInfo(id);
		});
	},
	// 卸载
	unmounted() {
		uni.$off('getInfo');
	}
};
</script>

<style scoped lang="scss">
.plus_show {
	height: 30vh;
}
</style>
