<template>
	<view>
		<uv-navbar placeholder :title="'密码登录' + typeText" auto-back></uv-navbar>
		<view class="content">
			<view class="app">
				<view class="title">{{ typeText }} {{ appStore.name }}</view>
				<view class="desc">
					{{ appStore.description }}
				</view>
			</view>

			<view class="login form">
				<uv-form :model="form" :rules="rules" ref="formRef" labelWidth="0">
					<uv-form-item prop="username">
						<uv-input
							v-model="form.username"
							prefixIcon="account"
							placeholder="请输入账号/邮箱/手机"
							:customStyle="{ padding: '16rpx 10rpx' }"
							:prefixIconStyle="{ fontSize: '38rpx' }"
							clearable
						></uv-input>
					</uv-form-item>
					<uv-form-item prop="password">
						<uv-input
							v-model="form.password"
							password
							prefixIcon="lock"
							placeholder="请输入密码"
							:customStyle="{ padding: '16rpx 10rpx' }"
							:prefixIconStyle="{ fontSize: '38rpx' }"
							clearable
						></uv-input>
					</uv-form-item>
					<uv-form-item prop="captcha">
						<view class="captcha">
							<view class="captcha-input">
								<uv-input
									v-model="form.captcha"
									prefixIcon="empty-permission"
									placeholder="请输入验证码"
									:customStyle="{ padding: '16rpx 10rpx' }"
									:prefixIconStyle="{ fontSize: '38rpx' }"
									clearable
								>
									<template v-slot:suffix></template>
								</uv-input>
							</view>
							<view class="captcha-image" @click="fetchCaptcha">
								<image v-if="captchaBase64" class="image" mode="widthFix" :src="captchaBase64"></image>
							</view>
						</view>
					</uv-form-item>
					<uv-form-item v-if="agreement">
						<AgreementRadio
							ref="arRef"
							v-model="privacyPolicy"
							:agreements="agreement.contents"
						></AgreementRadio>
					</uv-form-item>
					<uv-form-item>
						<view class="submit">
							<uv-button type="primary" :text="typeText" @click="submit"></uv-button>
						</view>
					</uv-form-item>
					<uv-form-item>
						<view class="submit">
							<uv-button
								type="primary"
								:plain="true"
								@click="back"
								:text="'更换' + typeText + '方式'"
							></uv-button>
						</view>
					</uv-form-item>
				</uv-form>
			</view>
			<uv-toast ref="toast"></uv-toast>
			<uv-no-network></uv-no-network>
		</view>
	</view>
</template>

<script setup>
import { ref, reactive, onMounted, watch, onUnmounted } from 'vue';
import { passwordLogin, oAuthBindByPassword, passwordLoginCaptcha, oAuthBindImage } from '@/common/api/system/auth';
import { getLoginAgreement } from '@/common/api/system/agreement';
import { getPlatform, setToken } from '@/library/auth';
import { useAppStore } from '@/library/store/app';
import { useUserStore } from '@/library/store/user';
import { nav } from '@/library/nav';
import AgreementRadio from '../agreement/agreement-radio.vue';

const arRef = ref(null);
const formRef = ref(null);
const agreement = ref(null);
const props = defineProps({ bind: String });
const toast = ref();
const appStore = useAppStore();
const privacyPolicy = ref(false);
const type = ref(props.bind ? 'bind' : 'login');
const typeText = type.value == 'bind' ? '绑定' : '登录';
const captchaBase64 = ref('');
const timeInter = ref(null);

const userStore = useUserStore();

const bindInfo = {
	code: userStore.loginCode,
	platform: getPlatform()
};

const form = ref({
	username: '',
	password: '',
	captcha: '',
	captcha_id: '',
	app: appStore.keyword
});
const rules = ref({
	username: {
		type: 'string',
		required: true,
		message: '请输入账号/邮箱/手机',
		trigger: ['blur', 'change']
	},
	password: {
		type: 'string',
		required: true,
		message: '请输入密码',
		trigger: ['blur', 'change']
	},
	captcha: {
		type: 'string',
		required: true,
		message: '请输入验证码',
		trigger: ['blur', 'change']
	}
});

const getAgreementList = async () => {
	agreement.value = await getLoginAgreement();
};

getAgreementList();

const back = () => {
	uni.navigateBack();
};

// 登录
const submit = async () => {
	if (!privacyPolicy.value) {
		arRef.value.show();
		return;
	}
	await formRef.value.validate();

	var request = null;
	if (type.value == 'bind') {
		request = oAuthBindByPassword({ ...form.value, ...bindInfo });
	} else {
		request = passwordLogin({ ...form.value });
	}
	request
		.then(async (res) => {
			setToken(res.token);
			await userStore.userinfo();
			nav.home();
		})
		.catch(() => {
			fetchCaptcha();
		});
};

const fetchCaptcha = async () => {
	// 清除定时器
	clearInterval(timeInter.value);
	// 请求验证码
	let data = {};
	if (type.value == 'bind') {
		data = await oAuthBindImage();
	} else {
		data = await passwordLoginCaptcha();
	}
	form.value.captcha_id = data.id;
	captchaBase64.value = data.base64;
	// 定时刷新
	timeInter.value = setInterval(() => {
		fetchCaptcha();
	}, data.expire * 1000);
};

onMounted(async () => {
	fetchCaptcha();
});

onUnmounted(() => {
	clearInterval(timeInter.value);
	timeInter.value = null;
});
</script>

<style lang="scss" scoped>
.content {
	padding: 0px 30rpx;

	.app {
		margin-top: 30rpx;
		.title {
			font-size: 38rpx;
		}
		.desc {
			color: #999;
		}
	}
	.login {
		padding: 30rpx 0rpx;
		.submit {
			width: 100%;
		}
		.captcha {
			display: flex;
			width: 100%;
			.captcha-input {
				flex: 1;
			}
			.captcha-image {
				min-width: 120px;
				max-width: 120px;
				max-height: 40px;
				min-height: 40px;
				border: 1px solid #f2f3f5;
				overflow: hidden;
				.image {
					height: 100%;
					width: 100%;
				}
			}
		}
	}
	.privacy-policy {
		margin-bottom: 60rpx;
	}
}
</style>
