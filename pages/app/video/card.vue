<template>
	<view class="content">
		<view class="item" v-for="(item, ind) in list" :key="ind" @click="open(item)">
			<view class="cover">
				<uv-image height="180rpx" width="180rpx" :src="$rurl(item.resource.src)"></uv-image>
			</view>
			<view class="center">
				<view class="title uv-line-1">{{ item.name }}</view>
				<view class="sub-title uv-line-3">{{ item.desc }}</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { nav } from '@/library/nav';
import formatUrl from '@/library/global/resource.js';
defineProps({
	list: {
		type: Array,
		default: () => []
	}
});

const open = (item) => {
	nav.videoContent(item.id);
};
</script>

<style lang="scss" scoped>
.content {
	padding: 0rpx;
	margin-top: 10rpx;
	.item {
		border-radius: 8rpx;
		overflow: hidden;
		height: 180rpx;
		width: 100%;
		display: flex;
		box-sizing: border-box;
		flex-direction: row;
		align-items: center;
		box-shadow: 0 0 15px rgba(0, 0, 0, 0.05);
		margin-bottom: 30rpx;
		border-radius: 8 / rpx;
		background-color: #ffffff;
		.center {
			flex: 1;
			height: 100%;
			padding-left: 20rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			.title {
				margin-bottom: 10rpx;
			}
			.sub-title {
				font-size: $font-xs;
				color: #666;
			}
			.process {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
			}
		}
		.button {
			display: flex;
			justify-content: center;
			width: 100rpx;
			height: 55rpx;
			line-height: 55rpx;
			padding: 0 30rpx;
			border-radius: 4rpx;
			font-size: $font-normal !important;
		}
	}
}
</style>
