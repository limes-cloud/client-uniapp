<template>
	<view>
		<uv-no-network></uv-no-network>
		<uv-swiper
			:list="bannerList"
			keyName="src"
			height="420rpx"
			radius="0"
			showTitle
			circular
			:titleStyle="{ paddingLeft: '20rpx' }"
			@click="handleClickBanner"
		></uv-swiper>

		<view class="content">
			<view class="card-head">
				<view class="title">
					<view class="icon">
						<uv-icon size="35" :name="noticeLogo"></uv-icon>
					</view>
					<view class="text">
						<text class="m-text">学子讯通·党务之窗</text>
						<text class="sub-text">Student Communication</text>
					</view>
				</view>
				<view class="more" @click="$to('/pages/app/notice/index')">
					<text class="text">更多</text>
					<uv-icon color="#3c9cff" name="arrow-right"></uv-icon>
				</view>
			</view>
			<view>
				<uv-empty v-if="!noticeList.length" mode="list" text="暂无未读通知"></uv-empty>
				<NoticeCard :list="noticeList"></NoticeCard>
			</view>
		</view>
		<uv-gap height="10" bgColor="#f2f2f2"></uv-gap>
		<view class="content">
			<view class="card-head">
				<view class="title">
					<view class="icon">
						<uv-icon size="35" :name="taskLogo"></uv-icon>
					</view>
					<view class="text">
						<text class="m-text">学子成长·任务之栏</text>
						<text class="sub-text">Todo Task</text>
					</view>
				</view>
				<view class="more" @click="$to('/pages/app/task/index')">
					<text class="text">更多</text>
					<uv-icon color="#3c9cff" name="arrow-right"></uv-icon>
				</view>
			</view>
			<view class="task-content">
				<uv-empty v-if="!taskList.length" mode="list" text="暂无待办任务"></uv-empty>
				<TaskCard :list="taskList"></TaskCard>
			</view>
		</view>
		<uv-gap height="10" bgColor="#f2f2f2"></uv-gap>
		<view class="content">
			<view class="card-head">
				<view class="title">
					<view class="icon">
						<uv-icon size="35" :name="newsLogo"></uv-icon>
					</view>
					<view class="text">
						<text class="m-text">学子讯通·党务之窗</text>
						<text class="sub-text">Party Affairs News</text>
					</view>
				</view>
				<view class="more">
					<text class="text" @click="$to('/pages/app/news/index')">更多</text>
					<uv-icon color="#3c9cff" name="arrow-right"></uv-icon>
				</view>
			</view>
			<view>
				<uv-empty v-if="!informationList.length" mode="news" text="暂未发布新闻"></uv-empty>
				<NewsCard :list="informationList"></NewsCard>
			</view>
		</view>
	</view>
</template>

<script setup>
import noticeLogo from '@/static/app-icon/notice.png';
import taskLogo from '@/static/app-icon/task.png';
import studyLogo from '@/static/app-icon/study.png';
import newsLogo from '@/static/app-icon/news.png';
import formatUrl from '@/library/global/resource.js';
import NewsCard from '@/pages/app/news/card.vue';
import NoticeCard from '@/pages/app/notice/card.vue';
import TaskCard from '@/pages/app/task/card.vue';

import { onMounted, ref } from 'vue';
import { ListBanner } from '@/api/partyaffairs/banner';
import { ListInformation } from '@/api/partyaffairs/information';
import { nav } from '@/library/nav';
import { ListNotice } from '@/api/partyaffairs/notice';
import { pageTask } from '@/api/partyaffairs/task';

const bannerList = ref([]);
const noticeList = ref([]);
const informationList = ref([]);
const taskList = ref([]);

ListBanner().then((res) => {
	res.list.forEach((item, index) => {
		res.list[index].src = formatUrl(item.src, 630, 420);
	});
	bannerList.value = res.list;
});

ListNotice({ page: 1, pageSize: 3, status: true }).then((res) => {
	noticeList.value = res.list;
});

ListInformation({ page: 1, pageSize: 3, status: true }).then((res) => {
	informationList.value = res.list;
});

// pageTask({ page: 1, page_size: 3, not_finish: true }).then((res) => {
// 	taskList.value = res.list;
// });

const handleClickBanner = (index) => {
	const path = bannerList.value[index].path;
	if (path) {
		nav.open(path);
	}
};
</script>

<style lang="scss" scoped>
.card-head {
	padding: 0 0 30rpx 0;
	display: flex;
	flex-direction: row;
	align-items: flex-start;
	justify-content: space-between;
	.title {
		display: flex;
		flex-direction: row;
		align-items: center;
		.icon {
			margin-right: 10rpx;
		}
		.tag {
			display: inline-flex !important;
		}
		.text {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			justify-content: center;
			.m-text {
				font-weight: 500;
				display: flex;
			}
			.sub-text {
				font-size: $font-xs;
				color: #86909c;
			}
		}
	}
	.more {
		display: flex;
		flex-direction: row;
		align-items: center;
		color: #3c9cff;
	}
}

.notice-card {
	position: relative;
	top: -20rpx;
}
</style>
