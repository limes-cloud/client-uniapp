<template>
	<view>
		<uv-toast ref="toastRef"></uv-toast>
		<uv-no-network></uv-no-network>
		<uv-navbar
			:fixed="false"
			placeholder
			left-icon-color="#fff"
			title="热门活动"
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
		<view class="content card-body">
			<view
				class="card-body-activity"
				v-for="(item, index) in list"
				:key="index"
				@click="$to('./content?id=' + item.id)"
			>
				<view class="card-body-activity-title uv-line-1">{{ item.title }}</view>
				<view class="card-body-activity-desc uv-line-2">{{ item.description }}</view>
				<view class="card-body-activity-image">
					<uv-image :src="item.cover" width="100%" height="100%"></uv-image>
				</view>
				<view class="card-body-activity-footer">
					<text>{{ item.unit }}</text>
					<text style="margin-left: 30rpx">{{ $ft(item.createdAt) }}</text>
				</view>
			</view>
		</view>
		<uv-empty v-if="!list.length" mode="data" style="margin-top: 200rpx"></uv-empty>
		<uv-load-more v-else line :status="loadStatus" />
	</view>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { onReachBottom } from '@dcloudio/uni-app';
import { ListInformation } from '@/api/poverty/information';
const params = ref({ page: 1, pageSize: 10 });
const list = ref([]);
const loadStatus = ref('loading');

const getInformation = async () => {
	const data = await ListInformation(params.value);
	list.value = list.value.concat(data.list);
	loadStatus.value = data.list.length < params.value.pageSize ? 'nomore' : 'loadmore';
};

onMounted(() => {
	getInformation();
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

.card-body-activity {
	background-color: #ffffff;
	border-radius: 8rpx;
	margin-bottom: 30rpx;
	padding: 20rpx;
	&-title {
		font-weight: bold;
		font-size: $font-md;
	}
	&-desc {
		margin-top: 5rpx;
		color: #888;
		margin-bottom: 5rpx;
		font-size: $font-sm;
	}
	&-image {
		width: 100%;
		height: 300rpx;
		border-radius: 8rpx;
		overflow: hidden;
	}
	&-footer {
		margin-top: 10rpx;
		font-size: $font-xs;
		color: #888;
	}
}
</style>
