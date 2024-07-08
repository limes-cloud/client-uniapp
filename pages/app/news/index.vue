<template>
	<view>
		<uv-no-network></uv-no-network>
		<uv-navbar border placeholder auto-back title="党务新闻"></uv-navbar>

		<uv-sticky bgColor="#ffffff" offsetTop="1">
			<uv-tabs :list="tabList" @click="handleSwitchTab"></uv-tabs>
		</uv-sticky>
		<view class="content">
			<NewsCard :list="newsList"></NewsCard>
			<uv-empty v-if="!newsList.length" mode="data" style="margin-top: 200rpx"></uv-empty>
			<uv-load-more v-else line :status="loadStatus" />
		</view>
	</view>
</template>

<script setup>
import { onReachBottom } from '@dcloudio/uni-app';
import { ref } from 'vue';
import { pageNewsContent, allNewsClassify } from '@/api/partyaffairs/news.js';
import { nav } from '@/library/nav/index.js';
import NewsCard from '@/pages/app/news/card.vue';

const tabList = ref([{ id: null, name: '全部' }]);
const params = ref({ page: 1, page_size: 10, classify_id: null });
const newsList = ref([]);
const loadStatus = ref('loading');

allNewsClassify().then((res) => {
	tabList.value = tabList.value.concat(res.list);
});

const fetchData = () => {
	pageNewsContent(params.value).then((res) => {
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
	nav.newsContent(id);
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
.content {
	// padding-top: 0px;
}
</style>
