<template>
	<view>
		<uv-no-network></uv-no-network>
		<uv-navbar border placeholder leftIcon="" title="应用广场"></uv-navbar>
		<view class="content">
			<view class="item" v-for="(ite, ind) in appList" :key="ind">
				<uv-avatar :size="48" :src="ite.logo"></uv-avatar>
				<view class="center">
					<view class="title">{{ ite.title }}</view>
					<view class="sub-title uv-line-1">{{ ite.desc }}</view>
				</view>
				<view class="button">
					<uv-button
						:hairline="false"
						type="primary"
						@click="open(ite)"
						:plain="true"
						text="打开"
						size="small"
					></uv-button>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import resourceLogo from '@/static/app-icon/resource.png';
import noticeLogo from '@/static/app-icon/notice.png';
import taskLogo from '@/static/app-icon/task.png';
import studyLogo from '@/static/app-icon/study.png';
import newsLogo from '@/static/app-icon/news.png';
import { nav } from '@/library/nav/index.js';
const appList = [
	{
		title: '党务新闻',
		nav: nav.news,
		desc: '权威发布党建动态，传递基层好声音',
		logo: newsLogo
	},
	{
		title: '系统通知',
		nav: nav.notice,
		desc: '传递最新资讯，及时告知重要信息',
		logo: noticeLogo
	},
	{
		title: '党务资料',
		nav: nav.resource,
		desc: '知识宝库，智慧源泉，助力成长',
		logo: resourceLogo
	},
	{
		title: '党务任务',
		nav: nav.task,
		desc: '事项清单，高效管理，有序推进',
		logo: taskLogo
	},
	{
		title: '学习中心',
		nav: nav.video,
		desc: '知识港湾，智慧灯塔，点亮未来',
		logo: studyLogo
	}
];

const open = (info) => {
	info.nav();
};
</script>

<style scoped lang="scss">
page {
	background-color: #f2f2f2;
}
.content {
	margin-top: 10rpx;
	.item {
		width: 100%;
		display: flex;
		padding: 20rpx;
		box-sizing: border-box;
		flex-direction: row;
		align-items: center;
		box-shadow: 0 0 15px rgba(0, 0, 0, 0.05);
		margin-bottom: 30rpx;
		border-radius: 8 / rpx;
		background-color: #ffffff;
		.center {
			flex: 1;
			padding-left: 20rpx;
			.title {
				margin-bottom: 20rpx;
			}
			.sub-title {
				font-size: $font-xs;
				color: #666;
			}
		}
		.button {
			width: 100rpx;
			height: 55rpx;
			line-height: 55rpx;
			padding: 0 30rpx;
			border-radius: 4rpx;
			font-size: $font-normal !important;
		}
	}
}
</style>
