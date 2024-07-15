<template>
	<template v-for="(item, index) in list" :key="item.id">
		<view
			class="news-card"
			:class="index === list.length - 1 ? 'no-margin' : ''"
			@click="$to('/pages/app/news/content?id=' + item.id)"
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
				<view class="tag" v-if="!item.is_read">
					<uv-tags
						plain
						plainFill
						borderColor="#ecf5ff"
						icon="tags-fill"
						:text="item.classify.name"
						size="small"
					></uv-tags>
				</view>

				<text class="uv-line-1">{{ item.title }}</text>
			</view>
			<text class="sub-title uv-line-2">{{ item.desc }}</text>
			<view class="image">
				<uv-image
					width="100%"
					height="300rpx"
					radius="4"
					lazyLoad
					observeLazyLoad
					:src="$rurl(item.resource.url)"
				></uv-image>
			</view>
			<view class="footer">
				<text>{{ item.unit }}</text>
				<text class="time">{{ $ft(item.created_at) }}</text>
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
</script>

<style lang="scss" scoped>
.no-margin {
	margin-bottom: 0px;
}
.news-card {
	position: relative;
	margin-bottom: 30rpx;
	// padding: 30rpx 0;
	// border-bottom: 1px solid #f2f2f2;
	.title {
		display: flex;
		flex-direction: row;
		align-items: center;
		.tag {
			margin-right: 8rpx;
			display: inline-flex;
		}
		margin-bottom: 6rpx;
	}
	.sub-title {
		margin-bottom: 10rpx;
		// font-size: $font-sm;
		color: #909399;
	}
	.image {
		margin-top: 4rpx;
		margin-bottom: 10rpx;
		width: 100%;
	}

	.footer {
		font-size: $font-sm;
		color: #909399;
		.time {
			margin-left: 30rpx;
		}
	}
}
</style>
