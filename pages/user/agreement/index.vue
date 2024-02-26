<template>
	<view>
		<uv-no-network></uv-no-network>
		<uv-navbar autoBack border placeholder :title="title"></uv-navbar>
		<view class="content" v-if="content">
			<view class="u-content">
				<uv-parse :content="content"></uv-parse>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import { getAgreementContent } from '@/common/api/system/agreement';

const params = defineProps({ id: String });
const title = ref('协议内容');
const content = ref('');

getAgreementContent(params.id).then((res) => {
	title.value = res.name;
	content.value = res.content;
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
