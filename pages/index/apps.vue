<template>
	<view>
		<uv-no-network></uv-no-network>
		<uv-navbar border placeholder leftIcon title="应用广场"></uv-navbar>
		<view class="content">
			<view class="item" v-for="(ite, ind) in appList" :key="ind">
				<uv-avatar :size="60" :src="ite.logo"></uv-avatar>
				<view class="center">
					<view class="title">{{ ite.title }}</view>
					<view class="sub-title uv-line-1">{{ ite.desc }}</view>
				</view>
				<view class="button">
					<uv-button :hairline="false" type="primary" @click="open(ite)" :plain="true" text="打开" size="small"></uv-button>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import logo from '@/static/logo.png';
const appList = [
	{
		title: '党务新闻',
		page: '/pages/app/news/index',
		desc: '党务新闻党务新闻党务新闻',
		logo: logo
	},
	{
		title: '党务资料',
		page: '/pages/app/resource/index',
		desc: '党务资料党务资料党务资料',
		logo: logo
	},
	{
		title: '党务任务',
		page: '/pages/app/task/index',
		desc: '党务任务党务任务党务任务',
		logo: logo
	},
	{
		title: '校园新闻',
		page: '',
		desc: '校园新闻校园新闻校园新闻',
		logo: logo
	}
];

const open = (info) => {
	console.log(info.page);
	uni.navigateTo({
		url: info.page
	});
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
