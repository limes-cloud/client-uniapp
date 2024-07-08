<template>
	<view>
		<uv-no-network></uv-no-network>
		<uv-navbar autoBack border placeholder :title="title"></uv-navbar>
		<view class="content" v-if="data">
			<view class="title">
				{{ data.title }}
			</view>
			<view class="unit-info">
				<text class="unit">{{ data.unit }}</text>
				<text class="time">{{ $ft(data.created_at) }}</text>
			</view>
			<view class="u-content">
				<uv-parse :content="data.content"></uv-parse>
			</view>
			<view class="u-font-sm read">阅读：{{ data.read }}</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import { getNewsContent } from '@/api/partyaffairs/news.js';

const params = defineProps({ id: Number });
const title = ref('资源详情');
const data = ref();

getNewsContent(params).then((res) => {
	data.value = res;
});
</script>

<style lang="scss" scoped>
.content {
	.title {
		font-weight: 600;
		margin-bottom: 30rpx;
	}
	.unit-info {
		font-size: $font-sm;
		margin-bottom: 30rpx;
		.unit {
			color: #2979ff;
		}
		.time {
			margin-left: 30rpx;
			color: #999;
		}
	}
	.read {
		margin-top: 30rpx;
		color: #999;
	}
}
</style>
