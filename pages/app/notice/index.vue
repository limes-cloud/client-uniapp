<template>
	<view>
		<uv-no-network></uv-no-network>
		<uv-toast ref="toastRef"></uv-toast>
		<uv-navbar border placeholder auto-back title="学子讯通·党务之窗"></uv-navbar>

		<!-- <uv-sticky bgColor="#ffffff" offsetTop="1">
			<uv-subsection mode="button" :list="tabList" :current="current" @change="handleSwitchTab"></uv-subsection>
		</uv-sticky> -->
		<view class="content">
			<NoticeCard :list="noticeList"></NoticeCard>
			<uv-empty v-if="!noticeList.length" mode="data" style="margin-top: 200rpx"></uv-empty>
			<uv-load-more v-else line :status="loadStatus" />
		</view>
	</view>
</template>

<script setup>
import { onReachBottom } from '@dcloudio/uni-app';
import { ref } from 'vue';
import { ListNotice } from '@/api/partyaffairs/notice';
import NoticeCard from './card.vue';

const toastRef = ref();
const current = ref(0);
const tabList = ref(['全部', '未读']);
const params = ref({ page: 1, pageSize: 10 });
const noticeList = ref([]);
const loadStatus = ref('loading');

const fetchData = () => {
	ListNotice(params.value).then((res) => {
		noticeList.value = noticeList.value.concat(res.list);
		loadStatus.value = res.total <= params.value.page_size ? 'nomore' : 'loadmore';
	});
};
fetchData();

const handleSwitchTab = (cur) => {
	toastRef.value.loading('加载中');
	current.value = cur;
	noticeList.value = [];
	params.value = {
		page: 1,
		page_size: 10,
		not_read: cur === 1
	};
	fetchData();
	toastRef.value.hide();
};

const readContent = (id) => {
	uni.navigateTo({
		url: '/pages/app/notice/content?id=' + id
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
.content {
	// padding-top: 0px;
}
page {
	background: #f2f2f2;
}
</style>
