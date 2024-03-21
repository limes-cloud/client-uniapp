<template>
	<view>
		<uv-navbar placeholder leftIcon="" :title="'用户' + typeText"></uv-navbar>
		<view class="content">
			<view class="header">
				<view class="logo">
					<uv-image radius="8rpx" width="130rpx" height="130rpx" :src="$rurl(useApp.logo)"></uv-image>
					<view class="tip" v-if="useApp.allow_registry">
						<text class="disable">没有账号？</text>
						<text class="primary" @click="register">立即注册</text>
					</view>
				</view>

				<view class="app">
					<view class="title">{{ typeText }} {{ useApp.name }}</view>
					<view class="desc">
						{{ useApp.description }}
					</view>
				</view>
				<view class="login">
					<uv-list :customStyle="{ gap: '20rpx' }" padding="30rpx">
						<template v-if="!loading && suggestLoggin.name">
							<uv-list-item
								@click="handleLogin"
								clickable
								:title="suggestLoggin.name + typeText"
								:thumb="$rurl(suggestLoggin.logo)"
								thumb-size="lg"
								show-arrow
								:customStyle="{ backgroundColor: '#f4f5f9' }"
								rightText="推荐"
							></uv-list-item>
						</template>
						<template v-for="(item, index) in useApp.channels" :key="index">
							<template v-if="['password', 'captcha'].includes(item.platform)">
								<uv-list-item
									:title="item.name + typeText"
									:thumb="$rurl(item.logo)"
									thumb-size="lg"
									show-arrow
									link
									:to="item.platform + (type == 'bind' ? '?bind=true' : '')"
									:customStyle="{ backgroundColor: '#f4f5f9' }"
								></uv-list-item>
							</template>
						</template>
					</uv-list>
				</view>
				<!-- <view class="privacy-policy">
					<AgreementRadio
						v-if="!loading"
						v-model="privacyPolicy"
						:agreements="agreement.contents"
					></AgreementRadio>
				</view> -->
				<!-- <view v-if="useApp.channels.length - 2 > 0 && loginInfo.platform == 'h5'">
					<uv-divider text="其他方式"></uv-divider>
					<uv-grid :border="false" :col="useApp.channels.length - 2">
						<template v-for="(item, index) in useApp.channels" :key="index">
							<uv-grid-item v-if="!['password', 'captcha'].includes(item.platform)">
								<view class="oauth">
									<uv-image
										radius="8rpx"
										width="60rpx"
										height="60rpx"
										:src="$rurl(item.logo)"
									></uv-image>
									<text class="desc">{{ item.name }}</text>
								</view>
							</uv-grid-item>
						</template>
					</uv-grid>
				</view>
			 -->
			</view>

			<uv-loading-page :loading="loading" loading-mode="semicircle"></uv-loading-page>
			<uv-toast ref="toast"></uv-toast>
			<uv-no-network></uv-no-network>
		</view>
	</view>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from 'vue';
import { getLoginAgreement } from '@/common/api/system/agreement';
import { oAuthLogin } from '@/common/api/system/auth';
import { getPlatform, setToken, getCode } from '@/library/auth';
import { useAppStore } from '@/library/store/app';
import { useUserStore } from '@/library/store/user';
import { nav } from '@/library/nav';
import AgreementRadio from '../agreement/agreement-radio.vue';

const props = defineProps({ bind: String });
const type = ref(props.bind ? 'bind' : 'login');
const typeText = type.value == 'bind' ? '绑定' : '登录';
const toast = ref();
const useApp = useAppStore();
const userStore = useUserStore();

const loginInfo = {
	code: userStore.loginCode,
	platform: getPlatform()
};

const agreement = ref(null);
const loading = ref(true);
const suggestLoggin = ref({});
const privacyPolicy = ref(false);

const handleSuggestLoggin = () => {
	useApp.channels.forEach((item) => {
		if (item.platform === loginInfo.platform) {
			suggestLoggin.value = item;
		}
	});
};

// 快捷登录
const handleLogin = async () => {
	toast.value.show({ type: 'loading', message: '正在登录中', duration: 10 * 1000 });
	if (!loginInfo) {
		nav.error('授权信息错误，请退出重新登录！');
		return;
	}
	if (!loginInfo.code) {
		loginInfo.code = await getCode();
	}

	if (loginInfo.code) {
		const data = await oAuthLogin({ ...loginInfo });
		setToken(data.token);
		await userStore.userinfo();
		nav.home();
	}
};

const register = () => {
	nav.register();
};

//自动登录回调，自动登录
onMounted(async () => {
	agreement.value = await getLoginAgreement();
	loading.value = false;

	if (type.value == 'bind') {
		loading.value = false;
		return;
	}
	handleSuggestLoggin();
	if (loginInfo.code && suggestLoggin.value) {
		handleLogin();
	}
});
</script>

<style lang="scss" scoped>
.content {
	padding: 0px 30rpx;
	.header {
		.logo {
			padding: 30rpx 0px;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			.tip {
				.disable {
					color: #999;
				}
				.primary {
					color: #165dff;
				}
			}
		}
	}
	.app {
		margin-top: 20rpx;
		.title {
			font-size: 38rpx;
		}
		.desc {
			color: #999;
		}
	}
	.login {
		padding: 30rpx 0rpx;
	}
	.privacy-policy {
		margin-bottom: 60rpx;
	}
	.oauth {
		text-align: center;
		.desc {
			line-height: 50rpx;
		}
	}
}
</style>
