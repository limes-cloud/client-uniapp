<template>
	<view class="mian">
		<!-- <navbar :leftIcon="require('@/static/image/icon/back.png')" :title="title" @clickLeft="back"></navbar> -->
		<view class="content">
			<web-view style="padding: 0px; margin-top: 10rpx" :src="url"></web-view>
		</view>
	</view>
</template>

<script>
import { reportProcess } from '@/common/api/video.js';
export default {
	data() {
		return {
			url: '', //PDF路径
			viewerUrl: '/static/hybrid/html/pdf-reader/index.html'
		};
	},
	onLoad(option) {
		const url = this.$rurl(option.src);
		this.url = this.viewerUrl + '?file=' + encodeURIComponent(url);
		reportProcess({ video_id: option.id, time: 60 });
	},
	methods: {}
};
</script>

<style>
.mian {
	overflow: hidden;
}
.content {
	max-height: 92vh;
	overflow: auto;
}
</style>
