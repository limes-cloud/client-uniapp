<template>
	<view>
		<uv-navbar placeholder title="验证码注册" auto-back></uv-navbar>

		<view class="content">
			<view class="app">
				<view class="title">注册 {{ appStore.name }}</view>
				<view class="desc">
					{{ appStore.description }}
				</view>
			</view>

			<view class="login form">
				<uv-form labelPosition="left" :model="form" :rules="rules" ref="formRef" labelWidth="0">
					<uv-form-item prop="username">
						<uv-input
							v-model="form.username"
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
							<uv-button :throttleTime="500" type="primary" text="注册" @click="submit"></uv-button>
						</view>
					</uv-form-item>
					<uv-form-item>
						<view class="submit">
							<uv-button type="primary" :plain="true" @click="back" text="更换注册方式"></uv-button>
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
import { getRegisterAgreement } from '@/common/api/system/agreement';
import { captchaRegisterEmail, captchaRegister } from '@/common/api/system/auth';
import { setToken } from '@/library/auth';
import { useAppStore } from '@/library/store/app';
import { nav } from '@/library/nav';
import AgreementRadio from '../agreement/agreement-radio.vue';

const captchaSecond = ref(60);
const arRef = ref(null);
const agreement = ref(null);
const props = defineProps({ id: String });
const toast = ref();
const appStore = useAppStore();
const userStore = useUserStore();
const uCode = ref();
const uCodeSending = ref(false);
const uCodeTips = ref('');
const privacyPolicy = ref(false);
const formRef = ref(null);
const form = ref({
	username: '',
	captcha: '',
	captcha_id: '',
	app: appStore.keyword
});
const rules = ref({
	username: {
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
	agreement.value = await getRegisterAgreement();
};

getAgreementList();

const codeChange = (text) => {
	uCodeTips.value = text;
};

const getCode = async () => {
	if (!form.value.username) {
		toast.value.error('请先输入邮箱');
		return;
	}
	const isEmail = uni.$uv.test.email(form.value.username);
	if (uCode.value.canGetCode && isEmail) {
		const data = await captchaRegisterEmail(form.value.username);
		form.value.captcha_id = data.id;
		captchaSecond.value = data.expire;
		toast.value.success('验证码已发送');
		uCode.value.start();
	}
};

const back = () => {
	uni.navigateBack();
};
// 注册
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
	const res = await captchaRegister({ ...form.value });
	setToken(res.token);
	await userStore.userinfo();
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
