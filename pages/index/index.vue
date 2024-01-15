<template>
	<view>
		<uv-no-network></uv-no-network>
		<uv-navbar border placeholder leftIcon title="首页"></uv-navbar>
		<view class="content">
			<view>
				<uv-swiper :list="bannerList" keyName="image" height="400rpx" showTitle circular :titleStyle="{ paddingLeft: '20rpx' }"></uv-swiper>
			</view>
			<view class="card">
				<view class="item">
					<view class="title-box">
						<text class="title">校园新闻</text>
						<text class="sub-title">School News</text>
					</view>
					<me-tip v-if="!newsList.length" type="empty" title="暂无校园新闻" size="small"></me-tip>
					<template v-for="item in newsList" :key="item.id" @click="handleClickNews(item)">
						<view class="news-card">
							<view class="title uv-line-1">{{ item.title }}</view>
							<text class="sub-title uv-line-2">{{ item.desc }}</text>
							<view class="image">
								<uv-image width="100%" height="300rpx" radius="4" lazyLoad observeLazyLoad :src="item.image"></uv-image>
							</view>
							<view class="footer">
								<text>{{ item.unit }}</text>
								<text class="time">{{ $ft(item.created_at) }}</text>
							</view>
						</view>
					</template>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref, getCurrentInstance } from 'vue';
import { allBanner } from '@/common/api/banner.js';
import { pageNews } from '@/common/api/news.js';
const { proxy } = getCurrentInstance();
const bannerList = ref([]);
const newsList = ref([]);

allBanner().then((res) => {
	res.list.forEach((item, index) => {
		res.list[index].image = proxy.$rurl(item.resource.src, 300, 200);
	});
	bannerList.value = res.list;
});

pageNews({ page: 1, page_size: 10 }).then((res) => {
	res.list.forEach((item, index) => {
		res.list[index].image = proxy.$rurl(item.resource.src, 300, 200);
	});
	newsList.value = res.list;
});

const handleClickNews = (news) => {
	console.log(news);
};
</script>

<style lang="scss" scoped>
.card {
	margin-top: 60rpx;
	.item {
		margin-bottom: 30rpx;
		.title-box {
			display: flex;
			flex-direction: column;
			align-items: center;
			.title {
				font-size: $font-md;
			}
			.sub-title {
				color: #909399;
			}
			margin-bottom: 20rpx;
		}
		.news-card {
			position: relative;
			padding: 20rpx 0rpx;
			.title {
				font-size: $font-normal;
			}
			.sub-title {
				margin-top: 10rpx;
				font-size: $font-sm;
				color: #909399;
			}
			.image {
				margin-top: 4rpx;
				margin-bottom: 10rpx;
				width: 100%;
			}

			.footer {
				font-size: $font-xs;
				color: #909399;
				.time {
					margin-left: 30rpx;
				}
			}
		}
	}
}
</style>
