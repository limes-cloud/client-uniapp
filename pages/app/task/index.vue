<template>
	<view>
		<uv-no-network></uv-no-network>
		<uv-navbar border placeholder auto-back title="任务列表"></uv-navbar>
		<view class="content">
			<Card :list="taskList"></Card>
			<uv-empty v-if="!taskList.length" mode="data" style="margin-top: 200rpx"></uv-empty>
		</view>
	</view>
</template>

<script setup>
import { onReachBottom } from '@dcloudio/uni-app';
import { ref } from 'vue';
import { pageTask } from '@/api/partyaffairs/task.js';
import Card from './card.vue';

const params = ref({ page: 1, page_size: 10 });
const taskList = ref([]);
const loadStatus = ref('loading');

const fetchData = () => {
	pageTask(params.value).then((res) => {
		taskList.value = taskList.value.concat(res.list);
		console.log(taskList.value);
		loadStatus.value = res.total <= params.page_size ? 'nomore' : 'loadmore';
	});
};

fetchData();

const open = (item) => {
	uni.navigateTo({
		url: '/pages/app/task/content?id=' + item.id
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

<style lang="scss" scoped>
page {
	background: #f2f2f2;
}
</style>
