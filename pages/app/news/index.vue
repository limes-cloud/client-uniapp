<template>
	<view>
		<uv-no-network></uv-no-network>
		<uv-navbar border placeholder auto-back title="党务新闻"></uv-navbar>

		<uv-sticky bgColor="#ffffff" offsetTop="1">
			<uv-tabs :list="tabList" @click="handleSwitchTab"></uv-tabs>
		</uv-sticky>
		<view class="content">
			<Card :list="list"></Card>
			<uv-empty v-if="!list.length" mode="data" style="margin-top: 200rpx"></uv-empty>
			<uv-load-more v-else line :status="loadStatus" />
		</view>
	</view>
</template>

<script setup>
import { onReachBottom } from '@dcloudio/uni-app';
import { ref } from 'vue';
import { ListInformation, ListInformationClassify } from '@/api/partyaffairs/information';
import { nav } from '@/library/nav/index.js';
import Card from '@/pages/app/news/card.vue';

const tabList = ref([{ id: null, name: '全部' }]);
const params = ref({ page: 1, pageSize: 10, classifyId: null });
const list = ref([]);
const loadStatus = ref('loading');

ListInformationClassify().then((res) => {
	tabList.value = tabList.value.concat(res.list);
});

const fetchData = () => {
	ListInformation(params.value).then((res) => {
		list.value = list.value.concat(res.list);
		loadStatus.value = res.list.length <= params.value.pageSize ? 'nomore' : 'loadmore';
	});
};
fetchData();

const handleSwitchTab = (item) => {
	list.value = [];
	params.value = {
		page: 1,
		pageSize: 10,
		classifyId: item.id
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
