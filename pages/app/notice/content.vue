<template>
	<uv-navbar autoBack border placeholder :title="title"></uv-navbar>
	<view class="content" v-if="data">
		<view class="title">{{ data.title }}</view>
		<view class="desc">
			<view class="tag">
				<uv-tags
					type="success"
					plain
					plainFill
					borderColor="#ecf5ff"
					icon="pushpin-fill"
					text="置顶"
					size="small"
				></uv-tags>
			</view>
			<view class="text">
				<text class="unit">{{ data.unit }}</text>
				<text class="time">{{ $ft(data.created_at) }}</text>
			</view>
		</view>
		<view class="u-content">
			<uv-parse :content="data.content"></uv-parse>
		</view>
	</view>
	<uv-toast ref="toast"></uv-toast>
	<uv-no-network></uv-no-network>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { getNotice, readNotice } from '@/api/partyaffairs/notice.js';
import { useUserStore } from '@/library/store/user';

const deleteSheetRef = ref();
const toast = ref();
const params = defineProps({ id: String });
const title = ref('通知详情');
const data = ref();

getNotice(params).then((res) => {
	toast.value.loading();
	data.value = res;
	title.value = res.title;
	// readNotice(params);
	toast.value.hide();
});
</script>

<style lang="scss" scoped>
.content {
	.title {
		font-weight: 600;
		margin-bottom: 20rpx;
	}
	.desc {
		display: flex;
		width: 100%;
		flex-direction: row;
		.tag {
			margin-right: 10rpx;
		}
		.text {
			color: #929292;
			.unit {
				margin-right: 10rpx;
			}
		}
		margin-bottom: 30rpx;
	}
	.u-content {
		margin-bottom: 40rpx;
	}

	.footer-unit {
		font-size: 24rpx;
		border-radius: 4rpx;
		margin-right: 10rpx;
		padding: 10rpx 8rpx 5rpx 8rpx;
		background-color: #f2f2f2;
		display: inline-block;
		.text {
			max-width: 200rpx;
		}
	}

	.read-view {
		font-size: $font-xs;
		margin-top: 20rpx;
		display: flex;
		justify-content: space-between;
		.text,
		text {
			color: #999;
		}
	}

	.comment {
		border-top: 1px solid #f6f6f6;
		margin-top: 20rpx;
		padding-top: 20rpx;
		font-size: $font-xs;
		.comment-item {
			margin-bottom: 10rpx;
			.reply-text {
				margin-left: 10rpx;
				margin-right: 10rpx;
			}
			.name {
				color: #3c9cff;
			}
		}
	}

	.reply {
		margin-top: 20rpx;
		display: flex;
		flex-direction: row;
		align-items: center;

		.input {
			flex: 1;
			margin-right: 20rpx;
			.input-placeholder {
				font-size: $font-sm;
			}
		}
	}
}
</style>
