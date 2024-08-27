<template>
	<view>
		<uv-toast ref="toastRef"></uv-toast>
		<uv-no-network></uv-no-network>
		<uv-navbar
			:fixed="false"
			placeholder
			left-icon=""
			:title="app.name"
			bg-color="#f24b46"
			:title-style="{ color: '#fff' }"
		></uv-navbar>
		<view class="header">
			<view class="header-bg"></view>
			<view class="header-body">
				<uv-swiper
					:list="banners"
					keyName="src"
					showTitle
					circular
					height="160"
					:title-style="{ paddingLeft: '20rpx' }"
					:autoplay="false"
				></uv-swiper>
			</view>
		</view>

		<view class="content grid">
			<uv-grid
				:border="false"
				:col="4"
				:custom-style="{
					padding: '30rpx 0',
					background: '#fff',
					borderRadius: '8rpx'
				}"
			>
				<uv-grid-item @click="$to('/pages/app/notice/index')">
					<uv-image width="45" height="45" :src="noticeIcon"></uv-image>
					<text class="grid-text">通知公告</text>
				</uv-grid-item>
				<uv-grid-item @click="$to('/pages/app/information/index')">
					<uv-image width="45" height="45" :src="informationIcon"></uv-image>
					<text class="grid-text">资助资讯</text>
				</uv-grid-item>
				<uv-grid-item @click="$to('/pages/app/activity/index')">
					<uv-image width="45" height="45" :src="activityIcon"></uv-image>
					<text class="grid-text">热门活动</text>
				</uv-grid-item>
				<uv-grid-item @click="$to('/pages/app/file/index')">
					<uv-image width="45" height="45" :src="fileIcon"></uv-image>
					<text class="grid-text">常用文件</text>
				</uv-grid-item>
			</uv-grid>
		</view>

		<view class="content">
			<!-- 	color="#fff"
			bgColor="#f25e59" -->
			<uv-notice-bar
				:text="notices"
				direction="column"
				mode="link"
				@click="$to('/pages/app/notice/index')"
				color="#fff"
				bgColor="#f25e59"
				:customStyle="{ padding: '30rpx 20rpx', borderRadius: '8rpx' }"
			></uv-notice-bar>

			<uv-gap height="20" bgColor="#f5f7fb"></uv-gap>
			<view class="card">
				<view class="card-header">
					<view class="card-header-title">
						<view class="card-header-title-main">
							<view class="card-header-title-main-icon"></view>
							<view class="card-header-title-main-text">资助资讯</view>
						</view>
						<view class="card-header-title-sub">Funding Information</view>
					</view>
					<view class="caed-header-icon">
						<uv-icon
							@click="$to('/pages/app/information/index')"
							name="arrow-right"
							label="更多"
							labelPos="left"
							labelColor="#f24b46"
							labelSize="14px"
							color="#f24b46"
							size="16"
						></uv-icon>
					</view>
				</view>
				<uv-gap height="10" bgColor="#f5f7fb"></uv-gap>
				<view class="card-body">
					<uv-scroll-list :indicator="informations.length > 2">
						<view
							class="card-body-list"
							:class="[informations.length == 1 && 'card-body-list-one']"
							style="flex-direction: row"
						>
							<view
								class="card-body-list-item"
								v-for="(item, index) in informations"
								:key="index"
								:class="informationsClass(index, informations.length)"
								@click="$to('/pages/app/information/content?id=' + item.id)"
							>
								<view class="card-body-list-item-image">
									<uv-image :src="item.cover" width="100%" height="100%"></uv-image>
								</view>

								<view style="padding: 10rpx">
									<text class="card-body-list-item-title uv-line-2">{{ item.title }}</text>
									<view class="card-body-list-item-time">
										<uv-icon name="clock" color="#777" size="12"></uv-icon>
										<text style="margin-left: 10rpx">{{ $ft(item.createdAt) }}</text>
									</view>
								</view>
							</view>
						</view>
					</uv-scroll-list>
				</view>
			</view>

			<uv-gap height="10" bgColor="#f5f7fb"></uv-gap>
			<view class="card">
				<view class="card-header">
					<view class="card-header-title">
						<view class="card-header-title-main">
							<view class="card-header-title-main-icon"></view>
							<view class="card-header-title-main-text">热门活动</view>
						</view>
						<view class="card-header-title-sub">Popular Activities</view>
					</view>
					<view class="caed-header-icon">
						<uv-icon
							@click="$to('/pages/app/activity/index')"
							name="arrow-right"
							label="更多"
							labelPos="left"
							labelColor="#f24b46"
							labelSize="14px"
							color="#f24b46"
							size="16"
						></uv-icon>
					</view>
				</view>
				<uv-gap height="10" bgColor="#f5f7fb"></uv-gap>
				<view class="card-body">
					<view
						class="card-body-activity"
						v-for="(item, index) in activities"
						:key="index"
						@click="$to('/pages/app/activity/content?id=' + item.id)"
					>
						<view class="card-body-activity-title uv-line-1">{{ item.title }}</view>
						<view class="card-body-activity-desc uv-line-2">{{ item.description }}</view>
						<view class="card-body-activity-image">
							<uv-image :src="item.cover" width="100%" height="100%"></uv-image>
						</view>
						<view class="card-body-activity-footer">
							<text>{{ item.unit }}</text>
							<text style="margin-left: 30rpx">{{ $ft(item.createdAt) }}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useAppStore } from '@/library/store/app';
import { ListBanner } from '@/api/poverty/banner';
import { ListNotice } from '@/api/poverty/notice';
import { ListInformation } from '@/api/poverty/information';
import { ListActivity } from '@/api/poverty/activity';

import noticeIcon from '@/static/app-icon/notice.png';
import activityIcon from '@/static/app-icon/activity.png';
import fileIcon from '@/static/app-icon/file.png';
import informationIcon from '@/static/app-icon/information.png';

const app = useAppStore();
const banners = ref([]);
const notices = ref([]);
const informations = ref([]);
const activities = ref([]);

const informationsClass = (index, length) => {
	if (length === 1) {
		return 'card-body-list-item-one';
	}
	if (index === length - 1) {
		return 'card-body-list-item-last';
	}
	return '';
};

onMounted(async () => {
	// 获取轮播图
	const bannerData = await ListBanner();
	banners.value = bannerData.list;

	// 获取通知
	const noticeData = await ListNotice();
	noticeData.list.forEach((item) => {
		notices.value.push(item.title + ' — ' + item.unit);
	});

	// 获取资讯
	const informationData = await ListInformation();
	informations.value = informationData.list;

	// 获取活动
	const activityData = await ListActivity();
	activities.value = activityData.list;
});
</script>

<style lang="scss" scoped>
page {
	background-color: #f5f7fb;
}
.grid {
	padding-bottom: 0px !important;
	.grid-text {
		margin-top: 20rpx;
		color: #333;
	}
}

.header {
	background-color: #f5f7fb;
	position: relative;
	&-bg {
		position: absolute;
		width: 100%;
		height: 220rpx;
		background: linear-gradient(to bottom, #f24b46, #f5f7fb);
	}
	&-body {
		padding: 0rpx 30rpx;
	}
}
.content {
	background-color: #f5f7fb;
	.card-header {
		width: 100%;
		display: flex;
		flex-flow: row;
		align-items: center;
		&-title {
			flex: 1;
			&-main {
				font-size: $font-lg;
				font-weight: bold;
				position: relative;
				&-text {
					position: relative;
					z-index: 10 !important;
				}
				&-icon {
					position: absolute;
					bottom: 0px;
					left: 0px;
					z-index: 0;
					width: 80px;
					height: 10px;
					background: linear-gradient(to right, #f24b46, #ffffff);
				}
			}
			&-sub {
				font-size: $font-sm;
				color: #aaa;
			}
		}
	}

	.card-body {
		&-list {
			@include flex(column);
			&-one {
				width: 100% !important;
				.card-body-list-item-image {
					width: 100%;
					height: 300rpx;
					border-radius: 4px;
					overflow: hidden;
				}
			}

			&-item {
				margin-right: 20px;
				background-color: #ffffff;
				box-shadow: 0 0 12px rgba(0, 0, 0, 0.05);
				border-radius: 8rpx;
				width: 50%;

				&-last {
					margin-right: 0px !important;
				}
				&-one {
					width: 100% !important;
					margin-right: 0px !important;
				}
				&-image {
					width: 100%;
					height: 200rpx;
					border-radius: 4px;
					overflow: hidden;
				}
				&-title {
					font-size: $font-sm;
				}
				&-time {
					display: flex;
					flex-direction: row;
					justify-content: flex-start;
					align-items: center;
					color: #777;
					text-align: center;
					font-size: $font-xs;
					margin-top: 5px;
				}
			}
		}
	}

	.card-body-activity {
		background-color: #ffffff;
		border-radius: 8rpx;
		margin-bottom: 30rpx;
		padding: 20rpx;
		&-title {
			font-weight: bold;
			font-size: $font-md;
		}
		&-desc {
			margin-top: 5rpx;
			color: #888;
			margin-bottom: 5rpx;
			font-size: $font-sm;
		}
		&-image {
			width: 100%;
			height: 300rpx;
			border-radius: 8rpx;
			overflow: hidden;
		}
		&-footer {
			margin-top: 10rpx;
			font-size: $font-xs;
			color: #888;
		}
	}
}

@mixin flex($direction: row) {
	/* #ifndef APP-NVUE */
	display: flex;
	/* #endif */
	flex-direction: $direction;
}
</style>
