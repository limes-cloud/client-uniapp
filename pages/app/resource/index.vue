<template>
	<view>
		<uv-no-network></uv-no-network>
		<uv-navbar border placeholder auto-back title="党务资料"></uv-navbar>

		<uv-sticky bgColor="#ffffff" offsetTop="1">
			<uv-tabs :list="tabList" @click="handleSwitchTab"></uv-tabs>
		</uv-sticky>
		<view class="content">
			<template v-for="item in resourceList" :key="item.id" @click="handleClickResource(item)">
				<view class="item" v-for="(ite, ind) in resourceList" :key="ind">
					<uv-avatar shape="square" :size="60" :src="logo(item.resource.src)"></uv-avatar>
					<view class="center">
						<view class="title">{{ ite.title }}</view>
						<view class="sub-title uv-line-1">{{ ite.desc }}</view>
					</view>
					<view class="button">
						<uv-button
							:hairline="false"
							type="primary"
							@click="handleDownload($rurl(ite.resource.src))"
							:plain="true"
							text="下载"
							size="small"
						></uv-button>
					</view>
				</view>
			</template>
			<uv-empty v-if="!resourceList.length" mode="data" style="margin-top: 200rpx"></uv-empty>
			<uv-load-more v-else line :status="loadStatus" />
		</view>
	</view>
</template>

<script setup>
import { onReachBottom } from '@dcloudio/uni-app';
import { ref } from 'vue';
import { pageResource, allResourceClassify } from '@/common/api/resource.js';
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

const tabList = ref([{ id: 0, name: '全部' }]);
const params = ref({ page: 1, page_size: 10, classify_id: 0 });
const resourceList = ref([]);
const loadStatus = ref('loading');

allResourceClassify().then((res) => {
	tabList.value = tabList.value.concat(res.list);
});

const fetchData = () => {
	pageResource(params.value).then((res) => {
		resourceList.value = res.list;
		loadStatus.value = res.total <= params.page_size ? 'nomore' : 'loadmore';
	});
};
fetchData();

const handleSwitchTab = (item) => {
	resourceList.value = [];
	params.value = {
		page: 1,
		page_size: 10,
		classify_id: item.id
	};
	fetchData();
};

const handleDownload = (url) => {
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
	const type = src.split('.').pop();
	switch (type.toLowerCase()) {
		case ('ppt', 'pptx'):
			return pptLogo;
		case ('pdf', 'pdfx'):
			return pdfLogo;
		case ('doc', 'docx'):
			return docLogo;
		case ('xls', 'xlsx'):
			return xslLogo;
		case ('png', 'jpg', 'jpeg'):
			return pdfLogo;
		case ('mp4', 'flv', 'avi'):
			return mp4Logo;
		case ('mp3', 'wav'):
			return mp3Logo;
		case ('tar', 'rbr', 'zip', '7z'):
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
