<template>
	<view>
		<uv-no-network></uv-no-network>
		<uv-navbar border placeholder leftIcon title="任务列表"></uv-navbar>
		<view class="content">
			<template v-for="(item, index) in taskList" :key="index">
				<view class="card">
					<view class="title uv-line-1">{{ item.title }}</view>
					<view class="desc">
						<view v-for="(ite, ind) in item.desc.split('\n')" :key="ind">{{ ite }}</view>
					</view>
					<view class="time">
						<view style="margin-bottom: 10rpx">开始时间：{{ $ft(item.start) }}</view>
						<view style="margin-bottom: 10rpx">结束时间：{{ $ft(item.end) }}</view>
						<view>当前状态：{{ taskStatus(item) }}</view>
					</view>
					<view class="more" @click="open(item)">
						<text>查看详情</text>
						<uv-icon name="arrow-right"></uv-icon>
					</view>
				</view>
			</template>
		</view>
	</view>
</template>

<script setup>
import { onReachBottom } from '@dcloudio/uni-app';
import { ref } from 'vue';
import { pageTask } from '@/common/api/task.js';

const params = ref({ page: 1, page_size: 10 });
const taskList = ref([]);
const loadStatus = ref('loading');

const fetchData = () => {
	pageTask(params.value).then((res) => {
		taskList.value = taskList.value.concat(res.list);
		loadStatus.value = res.total <= params.page_size ? 'nomore' : 'loadmore';
	});
};

fetchData();

const taskStatus = (task) => {
	const nt = new Date().getTime() / 1000;
	if (nt < task.start) {
		return '未开始';
	}
	if (nt > task.end) {
		return '已结束';
	}
	return '进行中';
};

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
.card {
	width: 100%;
	padding: 30rpx;
	box-sizing: border-box;
	border-radius: 8rpx;
	margin-bottom: 30rpx;
	background-color: #ffffff;
	.title {
		margin-bottom: 10rpx;
		font-weight: 600;
	}

	.desc {
		color: #777;
		margin-bottom: 30rpx;
	}
	.time {
		padding-bottom: 30rpx;
		color: #777;
	}
	.more {
		padding-top: 30rpx;
		border-top: 1px solid #f2f2f2;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		text-align: center;
	}
}
</style>
