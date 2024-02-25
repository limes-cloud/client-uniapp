<template>
	<template v-for="(item, index) in list" :key="item.id">
		<view class="card">
			<view class="title uv-line-1">{{ item.title }}</view>
			<view class="desc">
				<view v-for="(ite, ind) in item.desc.split('\n')" :key="ind">{{ ite }}</view>
			</view>
			<view class="time">
				<view style="margin-bottom: 10rpx">开始时间：{{ $pt(item.start) }}</view>
				<view style="margin-bottom: 10rpx">结束时间：{{ $pt(item.end) }}</view>
				<view>当前状态：{{ taskStatus(item) }}</view>
			</view>
			<view class="more" @click="open(item)">
				<text>查看详情</text>
				<uv-icon name="arrow-right"></uv-icon>
			</view>
		</view>
	</template>
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

const taskStatus = (task) => {
	const nt = new Date().getTime() / 1000;
	if (nt < task.start) {
		return '未开始';
	}
	if (nt > task.end) {
		return '已结束';
	}
	return '进行中';
};

const open = (item) => {
	nav.taskContent(item.id);
};
</script>

<style lang="scss" scoped>
.card {
	width: 100%;
	padding: 30rpx;
	box-sizing: border-box;
	border-radius: 8rpx;
	margin-bottom: 30rpx;
	background-color: #ffffff;
	border: 1px solid #f2f2f2;
	// box-shadow: 0 0 12px rgba(0, 0, 0, 0.1);
	.title {
		margin-bottom: 10rpx;
		font-weight: 600;
	}

	.desc {
		color: #777;
		margin-bottom: 30rpx;
	}
	.time {
		padding-bottom: 30rpx;
		color: #777;
	}
	.more {
		padding-top: 30rpx;
		border-top: 1px solid #f2f2f2;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		text-align: center;
	}
}
</style>
