<template>
	<view class="login">
		<image class="bg1" src="@/static/login/bg1.png"></image>
		<image class="bg2" src="@/static/login/bg2.png"></image>
		<uv-loading-page :loading="!useApp.hasAppInfo" bgColor="#f2f2f2" loadingText="加载中" fontSize="14" loading-mode="spinner"></uv-loading-page>
		<view class="login-form" v-show="useApp.hasAppInfo">
			<view class="app-title">{{ useApp.name }}</view>
			<view class="app-sub-title">欢迎回来，请先进行用户账户绑定</view>
			<uv-form labelPosition="left" :model="bindForm" :rules="rules" ref="form" labelWidth="0">
				<uv-form-item prop="username">
					<uv-input v-model="bindForm.username" size="large" shape="circle" border="surround" placeholder="请输入邮箱">
						<template v-slot:prefix>
							<uv-icon color="#aaa" name="email" size="20"></uv-icon>
						</template>
					</uv-input>
				</uv-form-item>
				<uv-form-item prop="captcha">
					<uv-input v-model="bindForm.captcha" shape="circle" border="surround" placeholder="请输入验证码">
						<template v-slot:prefix>
							<uv-icon color="#aaa" name="empty-permission" size="20"></uv-icon>
						</template>
						<template v-slot:suffix>
							<uv-code ref="uCode" @end="uCodeSending = false" @start="uCodeSending = true" @change="codeChange" seconds="20" changeText="X秒重新后获取"></uv-code>
							<uv-button @click="getCode" :text="uCodeTips" shape="circle" :disabled="uCodeSending" type="primary" size="mini"></uv-button>
						</template>
					</uv-input>
				</uv-form-item>
				<uv-button class="login-bth" type="primary" size="normal" text="登录" shape="circle" @click="submitLogin"></uv-button>
			</uv-form>
		</view>
		<view class="footer">
			<!-- <uv-divider text="第三方登录" :hairline="true"></uv-divider> -->
		</view>
		<!-- <view class="t-e cl">
			<view class="t-g" @tap="wxLogin()"><image src="@/static/wx.png"></image></view>
			<view class="t-g" @tap="zfbLogin()"><image src="@/static/qq.png"></image></view>
		</view> -->
		<uv-toast ref="toast"></uv-toast>
		<uv-no-network></uv-no-network>
	</view>
</template>

<script setup>
import { useAppStore } from '@/library/store/app';
import { useUserStore } from '@/library/store/user';
import { getLoginPlatform, setToken } from '@/library/auth';
import { ref } from 'vue';
import { bind } from '@/common/api/auth';
import { sendBindEmail } from '@/common/api/auth';
const uCode = ref();
const form = ref();
const toast = ref();
const uCodeSending = ref(false);
const uCodeTips = ref('');
const useApp = useAppStore();
const useUser = useUserStore();

const bindForm = ref({
	username: '',
	captcha: '',
	captcha_id: '',
	code: useUser.loginCode,
	platform: getLoginPlatform()
});

// uni.showLoading({ title: '正在获取验证码', mask: true });

const rules = {
	username: {
		type: 'email',
		required: true,
		message: '请输入邮箱',
		trigger: ['blur', 'change']
	},
	captcha: {
		type: 'string',
		required: true,
		message: '请输入验证码'
	}
};

const codeChange = (text) => {
	uCodeTips.value = text;
};

const getCode = async () => {
	const isEmail = uni.$uv.test.email(bindForm.value.username);
	if (uCode.value.canGetCode && isEmail) {
		toast.value.loading('验证码获取中');
		const data = await sendBindEmail({ email: bindForm.value.username, ...useUser.loginInfo });
		bindForm.value.captcha_id = data.uuid;
		toast.value.success('验证码已发送');
		uCode.value.start();
	}
};

const submitLogin = () => {
	form.value.validate().then(async () => {
		const { token } = await bind(bindForm.value);
		setToken(token);
		uni.switchTab({
			url: '/pages/index/index'
		});
	});
};
</script>

<style lang="less" scoped>
.login {
	width: 100%;
	height: 100vh;
	overflow: hidden;
	padding: 0rpx 40rpx;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: center;
	box-sizing: border-box;

	.bg1 {
		position: absolute;
		width: 100%;
		top: -280rpx;
		right: -100rpx;
	}
	.bg2 {
		position: absolute;
		width: 50%;
		bottom: 0;
		left: -50rpx;
		margin-bottom: -200rpx;
	}
	.login-form {
		width: 100%;
		box-sizing: border-box;
		padding: 60rpx 50rpx;
		// box-shadow: 0 0 12px rgba(0, 0, 0, 0.1);
		border-radius: 8rpx;
		.app-title {
			font-weight: 600;
			font-size: 40rpx;
		}
		.app-sub-title {
			font-size: 28rpx;
			margin-top: 20rpx;
			margin-bottom: 20rpx;
			color: #777;
		}
		.login-bth {
			margin-top: 40rpx;
		}
	}

	.footer {
		width: 100%;
	}
}
</style>
