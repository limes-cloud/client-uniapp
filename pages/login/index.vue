<template>
	<view class="page">
		<image class="bg1" src="@/static/login/bg1.png"></image>
		<image class="bg2" src="@/static/login/bg2.png"></image>
		<view class="logo">
			<uv-image radius="8rpx" width="280rpx" height="280rpx" :src="useApp.logo"></uv-image>
			<view class="title">
				{{ useApp.name }}
				<text class="font-c">{{ useApp.version }}</text>
			</view>
			<view class="desc">
				{{ useApp.desc }}
				<text class="line"></text>
			</view>
		</view>

		<view class="login">
			<uv-button @click="handleLogin" class="button" type="primary" :plain="true" text="授权登录"></uv-button>
		</view>
		<uv-toast ref="toast"></uv-toast>
		<uv-no-network></uv-no-network>
	</view>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { login } from '@/common/api/auth.js';
import { getLoginPlatform, setToken } from '@/library/auth';
import { useAppStore } from '@/library/store/app';
import { useUserStore } from '@/library/store/user';
const toast = ref();
const useApp = useAppStore();
const useUser = useUserStore();
const loginInfo = {
	code: useUser.loginCode,
	platform: getLoginPlatform()
};

// 登录
const handleLogin = async () => {
	toast.value.show({ type: 'loading', message: '正在登录中', duration: 10 * 1000 });
	if (!loginInfo) {
		uni.redirectTo({ url: '/pages/error/index?text=授权信息错误，请退出重新登录！' });
		return;
	}

	const data = await login({ ...loginInfo });
	setToken(data.token);
	uni.switchTab({ url: '/pages/index/index' });
};

//易班回调，自动登录
onMounted(() => {
	if (useUser.loginStatus) {
		return;
	}
	useUser.setLoginStatus(true);
	if (loginInfo) {
		handleLogin();
	}
});
</script>

<style lang="less" scoped>
.page {
	height: 100vh;
	overflow: hidden;
	position: relative;
	.bg1 {
		position: absolute;
		width: 400rpx;
		top: -200rpx;
		right: 0rpx;
	}
	.bg2 {
		position: absolute;
		width: 400rpx;
		height: 420rpx;
		bottom: -200rpx;
		left: -150rpx;
	}
	.logo {
		width: 100%;
		height: calc(100vh - 300rpx - 44px);
		overflow: hidden;
		padding: 0 50rpx;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		.title {
			display: block;
			font-size: 46rpx;
			font-weight: 600;
			margin-top: 20rpx;
			margin-bottom: 5px;
		}

		.desc {
			font-size: 28rpx;
			color: #555;
			position: relative;
		}

		.line {
			position: absolute;
			left: 0px;
			top: 1px;
			display: block;
			width: 10px;
			height: 20px;
			border-radius: 50%;
			box-shadow: 0px 0px 20px #fff;
			background: rgba(255, 255, 255, 0.7);
			animation: line 10s linear infinite;
		}

		.font-c {
			color: transparent;
			-webkit-background-clip: text;
			animation: ran 20s linear infinite;
		}
	}

	.login {
		width: 100%;
		font-size: 36rpx;
		color: #2979ff;
		text-align: center;
		.button {
			width: 280rpx;
			margin: auto;
		}
	}
}
@keyframes ran {
	0% {
		background-image: linear-gradient(45deg, #abdcff 10%, #0396ff 100%);
		backgroud-position: 0 0;
	}

	20% {
		background-image: linear-gradient(45deg, #90f7ec 10%, #32ccbc 100%);
		background-position: 20px 0;
	}

	40% {
		background-image: linear-gradient(45deg, #feb692 10%, #ea5455 100%);
		background-position: 40px 0;
	}

	60% {
		background-image: linear-gradient(45deg, #ce9ffc 10%, #7367f0 100%);
		background-position: 60px 0;
	}

	80% {
		background-image: linear-gradient(45deg, #e2b0ff 10%, #9f44d3 100%);
		background-position: 80px 0;
	}

	100% {
		background-image: linear-gradient(45deg, #fad7a1 10%, #e96d71 100%);
		background-position: 100px 0;
	}
}

@keyframes line {
	form {
		left: 0px;
	}

	to {
		left: 200px;
	}
}
</style>
