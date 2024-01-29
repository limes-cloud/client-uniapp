<template>
	<uv-navbar autoBack border placeholder :title="title"></uv-navbar>
	<view>
		<view class="content" v-if="data">
			<view class="title">
				{{ data.title }}
			</view>
			<view class="u-content">
				<uv-parse :content="data.content"></uv-parse>
			</view>
		</view>
	</view>
	<uv-no-network></uv-no-network>
</template>

<script setup>
import { ref } from 'vue';
import { getNews } from '@/common/api/news.js';

const params = defineProps({ id: Number });
const title = ref('文章详情');
const data = ref();

getNews(params).then((res) => {
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
