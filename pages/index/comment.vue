<template>
	<view class="container">
		<view class="content">
			<view class="comment" v-for="i in 10" :key="i">
				<view class="head">
					<uv-avatar :src="$logo" :size="40"></uv-avatar>
					<view class="left">
						<text class="nickname">这是一个昵称</text>
						<text class="time">2024-10-19 10:10:10</text>
					</view>
				</view>
				<view class="body">
					春花秋月何时了，往事知多少？小楼昨夜又东风，故国不堪回首月明中。
					雕栏玉砌应犹在，只是朱颜改。问君能有几多愁？恰似一江春水向东流。
				</view>
			</view>
		</view>
		<view class="bg">
			<view class="bg-1">
				<uv-image width="100%" mode="scaleToFill" :src="bg1"></uv-image>
			</view>
			<view class="bg-2">
				<uv-image width="100%" height="100%" :src="bg2"></uv-image>
			</view>
			<view class="bg-3">
				<uv-image width="100%" mode="scaleToFill" height="100%" :src="bg3"></uv-image>
			</view>
		</view>
	</view>
</template>

<script setup>
import bg1 from '@/static/images/bg-1.png';
import bg2 from '@/static/images/bg-2.png';
import bg3 from '@/static/images/bg-3.png';
</script>

<style lang="scss" scoped>
page {
	height: calc(100vh - 50px);
	overflow: hidden;
	background-color: #fffffe;
}
.container {
	height: calc(100vh - 50px);
	overflow: hidden;
	position: relative;
	.content {
		position: relative;
		height: calc(100vh - 50px);
		overflow: scroll;
		z-index: 100;
	}
	.bg {
		z-index: 10;
		.bg-1 {
			position: absolute;
			bottom: 50px;
			left: 0px;
			width: 100%;
		}

		.bg-2 {
			position: absolute;
			bottom: -20px;
			left: 0px;
			width: 100%;
			height: 400px;
		}
		.bg-3 {
			position: absolute;
			padding: 60rpx;
			box-sizing: border-box;
			top: 200px;
			left: 0px;
			width: 100%;
			height: 340rpx;
		}
	}
}

.comment {
	margin-bottom: 30rpx;
	.head {
		display: flex;
		.left {
			padding: 10rpx;
			margin-left: 20rpx;
			display: flex;
			flex-direction: column;
			height: 40px;
			justify-content: space-around;
			.nickname {
				font-weight: bold;
				color: #cc150d;
			}
			.time {
				color: rgba(204, 21, 13, 0.8);
				font-size: $font-sm;
			}
		}
	}
	.body {
		width: calc(100% - 50px);
		background-color: rgba(204, 21, 13, 0.8);
		padding: 10rpx;
		box-sizing: border-box;
		border-radius: 8rpx;
		margin-left: 55px;
		color: #eee;
	}
}
</style>
