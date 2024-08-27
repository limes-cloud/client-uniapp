<template>
	<view>
		<uv-toast ref="toastRef"></uv-toast>
		<uv-no-network></uv-no-network>
		<uv-navbar
			:fixed="false"
			placeholder
			left-icon-color="#fff"
			title="通知公告"
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
		<view class="content">
			<template v-for="(item, index) in list" :key="index">
				<view class="item" @click="$to('./content?id=' + item.id)">
					<view class="title">
						<view class="tag" v-if="item.isTop">
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
						<view class="uv-line-1">{{ item.title }}</view>
					</view>
					<view class="desc uv-line-2">
						{{ item.description }}
					</view>
					<view class="footer">
						<view class="unit">{{ item.unit }}</view>
						<view class="time">{{ $ft(item.createdAt) }}</view>
					</view>
				</view>
			</template>
		</view>
		<uv-empty v-if="!list.length" mode="data" style="margin-top: 200rpx"></uv-empty>
		<uv-load-more v-else line :status="loadStatus" />
	</view>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { onReachBottom } from '@dcloudio/uni-app';
import { ListNotice } from '@/api/poverty/notice';
const params = ref({ page: 1, pageSize: 10 });
const list = ref([]);
const loadStatus = ref('loading');

const getNotice = async () => {
	const data = await ListNotice(params.value);
	list.value = list.value.concat(data.list);
	loadStatus.value = data.list.length < params.value.pageSize ? 'nomore' : 'loadmore';
};

onMounted(() => {
	getNotice();
});

onReachBottom(() => {
	if (loadStatus.value === 'nomore') {
		return;
	}
	params.value.page++;
	fetchData();
});
</script>

<style lang="scss" scoped>
page {
	background-color: #f5f7fb;
	height: 100%;
}

.item {
	background-color: #ffffff;
	padding: 30rpx;
	margin-bottom: 30rpx;
	border-radius: 8rpx;
	box-shadow: 0 0 12rpx rgba(0, 0, 0, 0.05);
	.title {
		display: flex !important;
		.tag {
			margin-right: 10rpx;
		}
		.text {
			color: #929292;
			.unit {
				margin-right: 10rpx;
			}
		}
	}
	.desc {
		margin-top: 10rpx;
		color: #777;
		font-size: $font-sm;
		width: 100%;
	}
	.footer {
		margin-top: 20rpx;
		display: flex;
		font-size: $font-xs;
		color: #777;
		.time {
			margin-left: 20rpx;
		}
	}
}
</style>
