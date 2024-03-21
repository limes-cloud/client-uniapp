<template>
	<uv-navbar autoBack border placeholder :title="title"></uv-navbar>
	<view class="header" v-if="current">
		<video
			id="video"
			object-fit="fill"
			direction="90"
			class="video"
			@click="handleClickVideo"
			:src="$rurl(current.resource.src)"
			@error="videoErrorCallback"
			@timeupdate="handleTimeUpdate"
			@ended="handleEnd"
			:controls="false"
		></video>
		<view class="cover" v-if="!isPlay" @click="handleClickVideo">
			<uv-icon name="play-circle" color="#ffffff" size="36"></uv-icon>
		</view>
		<view class="full" v-if="isPlay" @click.stop="handleFullcreen">
			<uv-icon name="full-screen" custom-prefix="custom-icon" size="20" color="#fff"></uv-icon>
		</view>
	</view>
	<view class="info" v-if="current">
		<view class="title">
			{{ current.classify.name }}
		</view>
		<view class="desc">
			{{ current.classify.desc }}
		</view>
	</view>
	<uv-gap height="10" bgColor="#f2f2f2"></uv-gap>
	<view class="list">
		<uv-cell-group>
			<template v-for="(item, index) in videoList" :key="index">
				<uv-cell
					clickable
					@click="handlePlay(item)"
					:titleStyle="{ color: '#3c9cff' }"
					icon="play-right"
					:title="item.title"
					:label="item.desc"
				>
					<template v-slot:value>
						<view class="process">进度:{{ process(item) }}%</view>
					</template>
				</uv-cell>
			</template>
		</uv-cell-group>
	</view>
	<uv-empty v-if="!videoList.length" mode="data" style="margin-top: 200rpx"></uv-empty>
	<uv-load-more v-else line :status="loadStatus" />
	<uv-toast ref="toast"></uv-toast>
	<uv-no-network></uv-no-network>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { pageVideoContent, reportProcess } from '@/common/api/video.js';
import { onReachBottom } from '@dcloudio/uni-app';

const toast = ref();
const props = defineProps({ id: String });
const title = ref('视频详情');
const data = ref();
const current = ref();
const videoList = ref([]);
const loadStatus = ref('loading');
const params = reactive({
	page: 1,
	page_size: 20,
	classify_id: props.id
});
const ctx = ref();
const isPlay = ref(false);
const isReporting = ref(false);
const isTask = ref(false);

const fetchData = () => {
	pageVideoContent(params).then((res) => {
		videoList.value = videoList.value.concat(res.list);
		handlePlay(res.list[0]);
		isTask.value = res.list[0].classify.is_task;

		loadStatus.value = res.total <= params.page_size ? 'nomore' : 'loadmore';
		setTimeout(() => {
			playVideo();
		}, 100);
	});
};
fetchData();

onReachBottom(() => {
	if (loadStatus.value === 'nomore') {
		return;
	}
	params.page++;
	fetchData();
});

const videoErrorCallback = () => {
	toast.value.error('视频播放出错');
};

const handlePlay = (item) => {
	if (!current.value || current.value.id != item.id) {
		current.value = item;
		if (!ctx.value) {
			ctx.value = uni.createVideoContext('video');
		}
		if (item.process) {
			ctx.value.play();
		}
		title.value = item.title;
	}
};

const handleFullcreen = () => {
	if (isPlay.value) {
		ctx.value.requestFullScreen();
	}
};

const handleClickVideo = () => {
	isPlay.value ? pauseVideo() : playVideo();
};

const playVideo = () => {
	ctx.value.play();
	isPlay.value = true;
};

const pauseVideo = () => {
	ctx.value.pause();
	isPlay.value = false;
};

const handleTimeUpdate = (t) => {
	const time = Math.ceil(t.detail.currentTime);
	if (time > 0 && !isReporting.value && isTask.value && time % 5 === 0) {
		isReporting.value = true;
		if (current.value.process.time < time) {
			current.value.process.time = time;
		}
		if (t.detail.duration - time < 5) {
			current.value.process = t.detail.duration;
		}
		reportProcess({ video_id: current.value.id, time: time });
		setTimeout(() => {
			isReporting.value = false;
		}, 1000);
	}
};

const process = (item) => {
	if (!item.process) {
		item.process = { time: 0, finish: false };
	}
	return Math.ceil((item.process.time / item.duration) * 100);
};

const handleEnd = () => {};
</script>

<style lang="scss" scoped>
.info {
	padding: 20rpx 30rpx;
	.title {
		margin-bottom: 20rpx;
		font-weight: 700;
	}
}

.header {
	width: 100%;
	position: relative;
	.video {
		width: 100%;
		height: 420rpx;
		object-fit: fill;
	}

	.full {
		position: absolute;
		right: 7px;
		bottom: 5px;
		padding: 10rpx;
	}
	.cover {
		position: absolute;
		background-color: rgba(0, 0, 0, 0.5);
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		display: flex;
		justify-content: center;
		align-items: center;
	}
}
.process {
	color: #777;
	font-size: $font-sm;
}
</style>
