<template>
	<view class="item" v-for="(item, ind) in list" :key="ind" @click="$to('/pages/app/video/content?id=' + item.id)">
		<view class="cover">
			<uv-image height="100%" width="100%" :src="$rurl(item.resource?.url)"></uv-image>
		</view>
		<view class="body">
			<view class="title uv-line-1">{{ item.name }}</view>
			<view class="sub-title uv-line-1">{{ item.desc }}</view>
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
</script>

<style lang="scss" scoped>
.item {
	border-radius: 8rpx;
	overflow: hidden;
	height: 380rpx;
	width: 100%;
	box-shadow: 0 0 15px rgba(0, 0, 0, 0.05);
	margin-bottom: 30rpx;
	position: relative;
	.cover {
		position: absolute;
		top: 0px;
		left: 0px;
		width: 100%;
		height: 100%;
	}
	.body {
		position: absolute;
		left: 0px;
		bottom: 0px;
		padding: 20rpx;
		background-color: rgba(0, 0, 0, 0.3);
		color: #fff;
		z-index: 99;
		.title {
			margin-bottom: 10rpx;
		}
		.title,
		.sub-title {
			font-size: $font-xs;
		}
	}
}
</style>
