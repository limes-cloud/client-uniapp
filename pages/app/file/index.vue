<template>
	<view>
		<uv-no-network></uv-no-network>
		<uv-navbar
			:fixed="false"
			placeholder
			left-icon-color="#fff"
			title="通知公告"
			bg-color="#f24b46"
			:title-style="{ color: '#fff' }"
		>
			<template v-slot:left>
				<view class="uv-nav-slot">
					<uv-icon name="arrow-left" color="#fff" size="19" @click="$nav.back()"></uv-icon>
					<uv-line direction="column" :hairline="false" length="16" margin="0 8px"></uv-line>
					<uv-icon name="home" color="#fff" size="20" @click="$nav.home()"></uv-icon>
				</view>
			</template>
		</uv-navbar>

		<view class="content">
			<view class="item" v-for="(item, index) in list" :key="index">
				<uv-avatar shape="square" :size="60" :src="logo(item.url)"></uv-avatar>
				<view class="center">
					<view class="title uv-line-1">{{ item.title }}</view>
					<view class="sub-title">
						<view class="size">文件大小：{{ item.size }}KB</view>
						<view class="size">文件类型：{{ item.type }}</view>
					</view>
				</view>
				<view class="button">
					<uv-button
						:hairline="false"
						type="primary"
						@click="downloadFile(item.url)"
						:plain="true"
						text="下载"
						size="small"
					></uv-button>
				</view>
			</view>
			<uv-empty v-if="!list.length" mode="data" style="margin-top: 200rpx"></uv-empty>
			<uv-load-more v-else line :status="loadStatus" />
		</view>
	</view>
</template>

<script setup>
import { onReachBottom } from '@dcloudio/uni-app';
import { ref, onMounted } from 'vue';
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
import { ListFile } from '@/api/poverty/file';

const params = ref({ page: 1, pageSize: 10, title: undefined });
const list = ref([]);
const loadStatus = ref('loading');

const getFile = async () => {
	const data = await ListFile(params.value);
	list.value = list.value.concat(data.list);
	loadStatus.value = data.list.length < params.value.pageSize ? 'nomore' : 'loadmore';
};

const handleSearch = () => {
	list.value = [];
	getFile();
};

onMounted(() => {
	getFile();
});

onReachBottom(() => {
	if (loadStatus.value === 'nomore') {
		return;
	}
	params.value.page++;
	getFile();
});

const logo = (src) => {
	if (!src) return fileLogo;
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
			margin-bottom: 10rpx;
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
