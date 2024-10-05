<template>
	<view class="video">
		<video class="video-elem" id="myVideo" :src="url" controls autoplay></video>
	</view>
</template>

<script>
export default {
	data() {
		return {
			url: '' //视频路径
		};
	},
	onLoad(option) {
		this.url = option.src;
		console.log(this.url);
	},
	methods: {}
};
</script>

<style lang="scss">
.video-elem {
	width: 100%;
	height: calc(100vh - 44px);
}
</style>
