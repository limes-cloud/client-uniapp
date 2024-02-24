<template>
	<view>
		<uv-no-network></uv-no-network>
		<uv-navbar border placeholder auto-back title="学习中心"></uv-navbar>
		<view class="content">
			<Card :list="classifyList"></Card>
			<uv-empty v-if="!classifyList.length" mode="data" style="margin-top: 200rpx"></uv-empty>
			<uv-load-more v-else line :status="loadStatus" />
		</view>
	</view>
</template>

<script setup>
import { onReachBottom } from '@dcloudio/uni-app';
import { ref } from 'vue';
import { pageVideoClassify } from '@/common/api/video.js';
import { nav } from '@/library/nav/index.js';
import Card from '@/pages/app/video/card.vue';

const tabList = ref([{ id: null, name: '全部' }]);
const params = ref({ page: 1, page_size: 10 });
const classifyList = ref([]);
const loadStatus = ref('loading');

const fetchData = () => {
	pageVideoClassify(params.value).then((res) => {
		classifyList.value = classifyList.value.concat(res.list);
		loadStatus.value = res.total <= params.value.page_size ? 'nomore' : 'loadmore';
	});
};
fetchData();

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
	background-color: #f2f2f2;
	box-sizing: border-box;
}
</style>
<style lang="scss" scoped>
.content {
	// padding-top: 0px;
}
</style>
