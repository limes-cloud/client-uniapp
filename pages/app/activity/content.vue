<template>
	<uv-toast ref="toast"></uv-toast>
	<uv-no-network></uv-no-network>
	<uv-navbar
		:fixed="false"
		placeholder
		left-icon-color="#fff"
		:title="title"
		bg-color="#f24b46"
		:title-style="{ color: '#fff' }"
	>
		<template v-slot:left>
			<view class="uv-nav-slot">
				<uv-icon name="arrow-left" color="#fff" size="19" @click="$nav.back()"></uv-icon>
				<uv-line direction="column" :hairline="false" length="16" margin="0 8px"></uv-line>
				<uv-icon name="home" color="#fff" size="20" @click="$nav.home()"></uv-icon>
			</view>
		</template>
	</uv-navbar>

	<view class="content" v-if="data">
		<view class="title">{{ data.title }}</view>
		<view class="desc">
			<view class="tag" v-if="data.isTop">
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
				<text class="time">{{ $ft(data.createdAt) }}</text>
			</view>
		</view>
		<view class="description">
			<uv-alert title="活动简介" type="info" :description="data.description"></uv-alert>
		</view>
		<view class="u-content">
			<uv-parse :content="data.content"></uv-parse>
		</view>
	</view>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { GetNotice } from '@/api/poverty/notice';
import { onReady } from '@dcloudio/uni-app';

const toast = ref();
const props = defineProps({ id: String });
const title = ref('通知详情');

const data = ref();

onReady(async () => {
	toast.value.loading('加载中');
	const res = await GetNotice(props.id);
	title.value = res.title;
	data.value = res;
	setTimeout(() => {
		toast.value.hide();
	}, 100);
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

	.description {
		margin-bottom: 20rpx;
	}
}
</style>
