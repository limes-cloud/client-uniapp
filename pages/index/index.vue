<template>
	<view>
		<uv-no-network></uv-no-network>
		<uv-navbar border placeholder leftIcon="" title="首页"></uv-navbar>
		<!-- <view class="content">	 -->
		<uv-swiper
			:list="bannerList"
			keyName="image"
			height="350rpx"
			radius="0"
			showTitle
			circular
			:titleStyle="{ paddingLeft: '20rpx' }"
			@click="handleClickBanner"
		></uv-swiper>
		<!-- </view> -->
		<uv-gap height="10" bgColor="#f2f2f2"></uv-gap>
		<view class="content">
			<view class="card-head">
				<view class="title">
					<view class="icon">
						<uv-icon size="35" :name="noticeLogo"></uv-icon>
					</view>
					<view class="text">
						<text class="m-text">未读通知</text>
						<text class="sub-text">Todo Task</text>
					</view>
				</view>
				<view class="more" @click="nav.notice()">
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
						<text class="m-text">待办任务</text>
						<text class="sub-text">Todo Task</text>
					</view>
				</view>
				<view class="more" @click="nav.task()">
					<text class="text">更多</text>
					<uv-icon color="#3c9cff" name="arrow-right"></uv-icon>
				</view>
			</view>
			<view class="task-content">
				<uv-empty v-if="!taskList.length" mode="list" text="暂无待办任务"></uv-empty>
				<TaskCard :list="taskList"></TaskCard>
			</view>
		</view>
		<!-- <uv-gap height="10" bgColor="#f2f2f2"></uv-gap>
		<view class="content">
			<view class="card-head">
				<view class="title">
					<view class="icon">
						<uv-icon size="35" :name="studyLogo"></uv-icon>
					</view>
					<view class="text">
						<text class="m-text">学习任务</text>
						<text class="sub-text">Todo Task</text>
					</view>
				</view>
				<view class="more">
					<text class="text">更多</text>
					<uv-icon color="#3c9cff" name="arrow-right"></uv-icon>
				</view>
			</view>
		</view> -->
		<uv-gap height="10" bgColor="#f2f2f2"></uv-gap>
		<view class="content">
			<view class="card-head">
				<view class="title">
					<view class="icon">
						<uv-icon size="35" :name="newsLogo"></uv-icon>
					</view>
					<view class="text">
						<text class="m-text">党务新闻</text>
						<text class="sub-text">Party Affairs News</text>
					</view>
				</view>
				<view class="more">
					<text class="text" @click="nav.news()">更多</text>
					<uv-icon color="#3c9cff" name="arrow-right"></uv-icon>
				</view>
			</view>
			<view>
				<uv-empty v-if="!newsList.length" mode="news" text="暂未发布新闻"></uv-empty>
				<NewsCard :list="newsList"></NewsCard>
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
import { allBanner } from '@/common/api/banner.js';
import { pageNewsContent } from '@/common/api/news.js';
import { nav } from '@/library/nav';
import { pageNotice } from '@/common/api/notice';
import { pageTask } from '../../common/api/task';

const bannerList = ref([]);
const noticeList = ref([]);
const newsList = ref([]);
const taskList = ref([]);

allBanner().then((res) => {
	res.list.forEach((item, index) => {
		res.list[index].image = formatUrl(item.resource?.src);
	});
	bannerList.value = res.list;
});
pageNewsContent({ page: 1, page_size: 3 }).then((res) => {
	newsList.value = res.list;
});
pageNotice({ page: 1, page_size: 3, not_read: true }).then((res) => {
	noticeList.value = res.list;
});
pageTask({ page: 1, page_size: 3, not_finish: true }).then((res) => {
	taskList.value = res.list;
});

const handleClickBanner = (index) => {
	nav.open(bannerList.value[index].path);
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
		.text {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			justify-content: center;
			.text {
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
