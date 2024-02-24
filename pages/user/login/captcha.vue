<template>
	<view>
		<uv-navbar placeholder title="验证码登录" auto-back></uv-navbar>

		<view class="content">
			<view class="app">
				<view class="title">{{ type == 'bind' ? '绑定' : '登录' }} {{ appStore.name }}</view>
				<view class="desc">
					{{ appStore.description }}
				</view>
			</view>

			<view class="login form">
				<uv-form labelPosition="left" :model="form" :rules="rules" ref="formRef" labelWidth="0">
					<uv-form-item prop="email">
						<uv-input
							v-model="form.email"
							placeholder="请输入邮箱"
							prefix-icon="email"
							:customStyle="{ padding: '16rpx 10rpx' }"
							:prefixIconStyle="{ fontSize: '38rpx' }"
						></uv-input>
					</uv-form-item>
					<uv-form-item prop="captcha">
						<uv-input
							v-model="form.captcha"
							prefix-icon="empty-permission"
							placeholder="请输入验证码"
							:customStyle="{ padding: '16rpx 10rpx' }"
							:prefixIconStyle="{ fontSize: '38rpx' }"
						>
							<template v-slot:suffix>
								<uv-code
									ref="uCode"
									@end="uCodeSending = false"
									@start="uCodeSending = true"
									@change="codeChange"
									:seconds="captchaSecond"
									changeText="X秒重新后获取"
								></uv-code>

								<uv-tags
									@click="getCode"
									:text="uCodeTips"
									:disabled="uCodeSending"
									plain
									size="mini"
								></uv-tags>
							</template>
						</uv-input>
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
							<uv-button :throttleTime="500" type="primary" text="登录" @click="submit"></uv-button>
						</view>
					</uv-form-item>
					<uv-form-item>
						<view class="submit">
							<uv-button type="primary" :plain="true" @click="back" text="更换登录方式"></uv-button>
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
import { ref, reactive, onMounted, watch } from 'vue';
import { getLoginAgreement } from '@/common/api/system/agreement';
import { oAuthBindEmail, captchaLoginEmail, captchaLogin, oAuthBindByCaptcha } from '@/common/api/system/auth';
import { getPlatform, setToken } from '@/library/auth';
import { useAppStore } from '@/library/store/app';
import { useUserStore } from '@/library/store/user';
import { nav } from '@/library/nav';
import AgreementRadio from '../agreement/agreement-radio.vue';

const arRef = ref(null);
const agreement = ref(null);
const props = defineProps({ bind: String });
const toast = ref();
const appStore = useAppStore();
const uCode = ref();
const uCodeSending = ref(false);
const uCodeTips = ref('');
const type = ref(props.bind ? 'bind' : 'login');
const privacyPolicy = ref(false);
const formRef = ref(null);
const captchaSecond = ref(60);
const useUser = useUserStore();

const bindInfo = {
	code: useUser.loginCode,
	platform: getPlatform()
};

const form = ref({
	email: '',
	captcha: '',
	captcha_id: '',
	app: appStore.keyword
});
const rules = ref({
	email: {
		type: 'email',
		required: true,
		message: '请输入邮箱',
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

const codeChange = (text) => {
	uCodeTips.value = text;
};

const getCode = async () => {
	if (!form.value.email) {
		toast.value.error('请先输入邮箱');
		return;
	}
	const isEmail = uni.$uv.test.email(form.value.email);
	if (uCode.value.canGetCode && isEmail) {
		let data = {};
		if (type.value == 'bind') {
			data = await oAuthBindEmail(form.value.email);
		} else {
			data = await captchaLoginEmail(form.value.email);
		}
		captchaSecond.value = data.expire;
		form.value.captcha_id = data.id;
		toast.value.success('验证码已发送');
		uCode.value.start();
	}
};

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
	if (!form.value.captcha_id) {
		toast.value.error('请先获取验证码');
		return;
	}
	let res = {};
	if (type.value == 'bind') {
		res = await oAuthBindByCaptcha({ ...form.value, ...bindInfo });
	} else {
		res = await captchaLogin({ ...form.value });
	}
	setToken(res.token);
	nav.home();
};
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
	}
	.privacy-policy {
		margin-bottom: 60rpx;
	}
}
</style>
