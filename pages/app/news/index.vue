<template>
	<view>
		<uv-no-network></uv-no-network>
		<uv-navbar border placeholder leftIcon title="校园新闻"></uv-navbar>

		<uv-sticky bgColor="#ffffff" offsetTop="1">
			<uv-tabs :list="tabList" @click="handleSwitchTab"></uv-tabs>
		</uv-sticky>
		<view class="content">
			<template v-for="item in newsList" :key="item.id" @click="handleClickNews(item)">
				<view class="news-card" @click="readContent(item.id)">
					<view class="title uv-line-1">{{ item.title }}</view>
					<text class="sub-title uv-line-2">{{ item.desc }}</text>
					<view class="image">
						<uv-image width="100%" height="300rpx" radius="4" lazyLoad observeLazyLoad :src="$rurl(item.resource.src)"></uv-image>
					</view>
					<view class="footer">
						<text>{{ item.unit }}</text>
						<text class="time">{{ $ft(item.created_at) }}</text>
					</view>
				</view>
			</template>

			<me-tip v-if="!newsList.length" type="empty" title="暂无校园新闻" size="small"></me-tip>
			<uv-load-more v-else line :status="loadStatus" />
		</view>
	</view>
</template>

<script setup>
import { onReachBottom } from '@dcloudio/uni-app';
import { ref } from 'vue';
import { pageNews, allNewsClassify } from '@/common/api/news.js';
const tabList = ref([{ id: 0, name: '全部' }]);
const params = ref({ page: 1, page_size: 10, classify_id: 0 });
const newsList = ref([]);
const loadStatus = ref('loading');

allNewsClassify().then((list) => {
	tabList.value = tabList.value.concat(list);
});

const fetchData = () => {
	pageNews(params.value).then((res) => {
		newsList.value = newsList.value.concat(res.list);
		loadStatus.value = res.total <= params.value.page_size ? 'nomore' : 'loadmore';
	});
};
fetchData();

const handleSwitchTab = (item) => {
	newsList.value = [];
	params.value = {
		page: 1,
		page_size: 10,
		classify_id: item.id
	};
	fetchData();
};

const readContent = (id) => {
	uni.navigateTo({
		url: '/pages/app/news/content?id=' + id
	});
};

onReachBottom(() => {
	if (loadStatus.value === 'nomore') {
		return;
	}
	params.value.page++;
	fetchData();
});
</script>
<style>
page {
	background-color: #ffffff;
	box-sizing: border-box;
}
</style>
<style lang="scss" scoped>
.news-card {
	position: relative;
	padding: 20rpx 0rpx;
	.title {
		font-size: $font-md;
	}
	.sub-title {
		margin-top: 10rpx;
		font-size: $font-sm;
		color: #909399;
	}
	.image {
		margin-top: 4rpx;
		margin-bottom: 10rpx;
		width: 100%;
	}

	.footer {
		font-size: $font-xs;
		color: #909399;
		.time {
			margin-left: 30rpx;
		}
	}
}
</style>
