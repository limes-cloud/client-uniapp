<template>
	<view>
		<uv-toast ref="toastRef"></uv-toast>
		<uv-no-network></uv-no-network>
		<uv-navbar
			:fixed="false"
			placeholder
			left-icon-color="#fff"
			title="资助资讯"
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
			<view class="search">
				<uv-search
					placeholder="请输入搜索内容"
					v-model="params.title"
					:boxStyle="{ background: '#ffffff' }"
					:inputStyle="{ background: '#ffffff' }"
					:showAction="false"
					clearabled
					@search="handleSearch"
					@clear="getInformation"
				></uv-search>
			</view>
			<template v-for="(item, index) in list" :key="index">
				<view class="item" @click="$to('./content?id=' + item.id)">
					<view class="item-cover">
						<uv-image :src="item.cover" width="100%" height="100%"></uv-image>
					</view>
					<view class="item-content">
						<view class="title uv-line-2">
							{{ item.title }}
						</view>
						<view class="desc uv-line-2">
							{{ item.description }}
						</view>
						<view class="time">
							<uv-icon name="clock" color="#777" size="12"></uv-icon>
							<text style="margin-left: 6rpx">{{ $ft(item.createdAt) }}</text>
						</view>
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
import { ListInformation } from '@/api/poverty/information';
const params = ref({ page: 1, pageSize: 10, title: undefined });
const list = ref([]);
const loadStatus = ref('loading');

const getInformation = async () => {
	const data = await ListInformation(params.value);
	list.value = list.value.concat(data.list);
	loadStatus.value = data.list.length < params.value.pageSize ? 'nomore' : 'loadmore';
};

const handleSearch = () => {
	list.value = [];
	getInformation();
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
.search {
	padding-bottom: 20rpx;
}
.item {
	background-color: #ffffff;
	margin-bottom: 30rpx;
	border-radius: 8rpx;
	box-shadow: 0 0 12rpx rgba(0, 0, 0, 0.05);
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	overflow: hidden;
	.item-cover {
		min-width: 280rpx;
		width: 280rpx;
		height: 240rpx;
	}
	.item-content {
		padding: 18rpx;
		box-sizing: border-box;
		display: inline-flex;
		flex-direction: column;

		.desc {
			margin-top: 8rpx;
			color: #777;
			font-size: $font-sm;
			width: 100%;
		}
		.time,
		.unit {
			display: flex;
			align-items: center;
			margin-top: 8rpx;
			display: flex;
			font-size: $font-xs;
			color: #777;
		}
	}
}
</style>
