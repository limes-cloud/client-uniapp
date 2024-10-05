<template>
	<uv-no-network></uv-no-network>
	<uv-navbar border placeholder auto-back title="学子智库·党建智汇"></uv-navbar>

	<uv-sticky bgColor="#ffffff" offsetTop="1">
		<uv-tabs :list="tabList" @click="handleSwitchTab"></uv-tabs>
	</uv-sticky>
	<view class="content">
		<template v-for="item in resourceList" :key="item.id" @click="handleClickResource(item)">
			<view class="item">
				<uv-avatar shape="square" :size="60" :src="logo(item.url)"></uv-avatar>
				<view class="center">
					<view class="title">{{ item.title }}</view>
					<view class="sub-title uv-line-1">{{ item.description }}</view>
				</view>
				<view class="button">
					<uv-button
						:hairline="false"
						type="primary"
						@click="handleDownload($rurl(item.url))"
						:plain="true"
						:text="isPdf(item.url) || isVideo(item.url) ? '打开' : '下载'"
						size="small"
					></uv-button>
				</view>
			</view>
		</template>
		<uv-empty v-if="!resourceList.length" mode="data" style="margin-top: 200rpx"></uv-empty>
		<uv-load-more v-else line :status="loadStatus" />
	</view>
</template>

<script setup>
import { ref } from 'vue';
import { onReachBottom } from '@dcloudio/uni-app';
import { pageResource, allResourceClassify } from '@/api/partyaffairs/resource.js';
import { downloadFile } from '@/library/utils/index.js';
import fileLogo from '@/static/file-icon/file.png';
import docLogo from '@/static/file-icon/doc.png';
import mp4Logo from '@/static/file-icon/mp4.png';
import mp3Logo from '@/static/file-icon/mp3.png';
import pptLogo from '@/static/file-icon/ppt.png';
import pdfLogo from '@/static/file-icon/pdf.png';
import zipLogo from '@/static/file-icon/zip.png';
import xslLogo from '@/static/file-icon/xsl.png';
import pngLogo from '@/static/file-icon/png.png';

const tabList = ref([{ id: undefined, name: '全部' }]);
const params = ref({ page: 1, pageSize: 10, classifyId: undefined });
const resourceList = ref([]);
const loadStatus = ref('loading');

allResourceClassify().then((res) => {
	tabList.value = tabList.value.concat(res.list);
});

const fetchData = () => {
	pageResource(params.value).then((res) => {
		resourceList.value = res.list;
		loadStatus.value = res.list.length <= params.value.pageSize ? 'nomore' : 'loadmore';
	});
};
fetchData();

const handleSwitchTab = (item) => {
	resourceList.value = [];
	params.value = {
		page: 1,
		pageSize: 10,
		classifyId: item.id
	};
	fetchData();
};

const isPdf = (url) => {
	if (!url) return false;
	const arr = url.split('.');
	return ['pdf', 'pdfx'].includes(arr[arr.length - 1]);
};

const isVideo = (url) => {
	if (!url) return false;
	const arr = url.split('.');
	return ['mp4', 'avi', 'wmv', 'mov', 'm4v'].includes(arr[arr.length - 1]);
};

const handleDownload = (url) => {
	if (isPdf(url)) {
		uni.navigateTo({
			url: './pdf?src=' + url
		});
		return;
	}

	if (isVideo(url)) {
		uni.navigateTo({
			url: './video?src=' + url
		});
		return;
	}

	downloadFile(url);
};

onReachBottom(() => {
	if (loadStatus.value === 'nomore') {
		return;
	}
	params.value.page++;
	fetchData();
});

const logo = (src) => {
	if (!src) return fileLogo;
	const type = src.split('.').pop();
	console.log(type);
	switch (type.toLowerCase()) {
		case 'ppt':
		case 'pptx':
			return pptLogo;
		case 'pdf':
		case 'pdfx':
			return pdfLogo;
		case 'doc':
		case 'docx':
			return docLogo;
		case 'xls':
		case 'xlsx':
			return xslLogo;
		case 'png':
		case 'jpg':
		case 'jpeg':
			return pngLogo;
		case 'mp4':
		case 'flv':
		case 'avi':
			return mp4Logo;
		case 'mp3':
		case 'wav':
			return mp3Logo;
		case 'tar':
		case 'rbr':
		case 'zip':
		case '7z':
			return zipLogo;
		default:
			return fileLogo;
	}
};

const readContent = (id) => {
	uni.navigateTo({
		url: '/pages/app/resource/content?id=' + id
	});
};
</script>

<style lang="scss" scoped>
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
			font-size: $font-md;
			margin-bottom: 20rpx;
		}
		.sub-title {
			font-size: $font-sm;
			color: #666;
		}
	}
	.button {
		width: 100rpx;
		height: 55rpx;
		line-height: 55rpx;
		padding: 0 30rpx;
		border-radius: 4rpx;
		font-size: $font-sm !important;
	}
}
</style>
