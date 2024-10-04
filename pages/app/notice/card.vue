<template>
	<template v-for="(item, index) in list" :key="item.id">
		<view
			class="notice-card"
			:class="index === list.length - 1 ? 'no-margin' : ''"
			@click="$to('/pages/app/notice/content?id=' + item.id)"
		>
			<view class="title">
				<view class="tag" v-if="item.is_top">
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
				<text class="uv-line-1">{{ item.title }}</text>
			</view>
			<view class="desc">
				<text class="sub-title">
					{{ item.description }}
				</text>
			</view>

			<view class="footer">
				<view class="info">
					<text>{{ item.unit }}</text>
					<text class="time">{{ $ft(item.created_at) }}</text>
				</view>
				<view class="more">
					<uv-icon name="arrow-right" :size="14" color="#909399"></uv-icon>
				</view>
			</view>
		</view>
	</template>
</template>

<script setup>
import formatUrl from '@/library/global/resource.js';
defineProps({
	list: {
		type: Array,
		default: () => []
	}
});
</script>

<style lang="scss" scoped>
.no-margin {
	margin-bottom: 0px !important;
}
.notice-card {
	background-color: #ffffff;
	position: relative;
	margin-bottom: 30rpx;
	border: 1px solid #f2f2f2;
	// box-shadow: 0 0 12px rgba(0, 0, 0, 0.1);
	border-radius: 8rpx;
	padding: 20rpx 30rpx;
	.title {
		display: flex;
		flex-direction: row;
		align-items: center;
		.tag {
			margin-right: 8rpx;
		}
		// border-bottom: 1px solid #f2f2f2;
		padding: 10rpx 0rpx;
	}
	.desc {
		padding: 20rpx 0;
		.sub-title {
			margin-bottom: 10rpx;
			color: #909399;
		}
	}
	.image {
		margin-top: 4rpx;
		margin-bottom: 10rpx;
		width: 100%;
	}

	.footer {
		border-top: 1px solid #f7f7f7;
		padding-top: 20rpx;
		font-size: $font-sm;
		color: #909399;
		display: flex;
		flex: row;
		align-items: center;
		justify-content: space-between;
		.time {
			margin-left: 30rpx;
		}
	}
}
</style>