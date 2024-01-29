<template>
	<view>
		<uv-navbar placeholder leftIcon title="用户登录"></uv-navbar>
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
					<view class="title">登录 {{ useApp.name }}</view>
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
								:title="suggestLoggin.name + '登录'"
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
									:title="item.name + '登录'"
									:thumb="$rurl(item.logo)"
									thumb-size="lg"
									show-arrow
									link
									:to="'/pages/login/' + item.platform"
									:customStyle="{ backgroundColor: '#f4f5f9' }"
								></uv-list-item>
							</template>
						</template>
					</uv-list>
				</view>
				<view class="privacy-policy">
					<AgreementRadio
						v-if="!loading"
						v-model="privacyPolicy"
						:agreements="scene.agreements"
					></AgreementRadio>
				</view>
				<view v-if="useApp.channels.length - 2 > 0 && loginInfo.platform == 'h5'">
					<uv-divider text="其他登录方式"></uv-divider>
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
			</view>

			<uv-loading-page :loading="loading" loading-mode="semicircle"></uv-loading-page>
			<uv-toast ref="toast"></uv-toast>
			<uv-no-network></uv-no-network>
		</view>
	</view>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from 'vue';
import { getLoginScene } from '@/common/api/system/scene';
import { getPlatform, setToken } from '@/library/auth';
import { useAppStore } from '@/library/store/app';
import { useUserStore } from '@/library/store/user';
import { nav } from '@/library/nav';
import AgreementRadio from './agreement/agreement-radio.vue';

const toast = ref();
const useApp = useAppStore();
const useUser = useUserStore();

const loginInfo = {
	code: useUser.loginCode,
	platform: getPlatform()
};
const scene = ref(null);
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

	const data = await login({ ...loginInfo });
	setToken(data.token);
	nav.home();
	uni.switchTab({ url: '/pages/index/index' });
};

const register = () => {
	uni.navigateTo({
		url: '/pages/login/register/index'
	});
};

//自动登录回调，自动登录
onMounted(async () => {
	handleSuggestLoggin();
	if (loginInfo.code) {
		handleLogin();
	}
	scene.value = await getLoginScene();
	loading.value = false;
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
