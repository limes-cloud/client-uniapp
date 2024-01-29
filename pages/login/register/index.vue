<template>
	<view>
		<uv-navbar placeholder auto-back title="用户注册"></uv-navbar>
		<view class="content">
			<view class="header">
				<view class="logo">
					<uv-image radius="8rpx" width="130rpx" height="130rpx" :src="$rurl(appStore.logo)"></uv-image>
				</view>

				<view class="app">
					<view class="title">注册 {{ appStore.name }}</view>
					<view class="desc">
						{{ appStore.description }}
					</view>
				</view>
				<view class="login">
					<uv-list :customStyle="{ gap: '20rpx' }" padding="30rpx">
						<template v-for="(item, index) in appStore.channels" :key="index">
							<template v-if="['password', 'captcha'].includes(item.platform)">
								<uv-list-item
									:title="item.name + '注册'"
									:thumb="$rurl(item.logo)"
									thumb-size="lg"
									show-arrow
									link
									:to="'/pages/login/register/' + item.platform"
									:customStyle="{ backgroundColor: '#f4f5f9' }"
								></uv-list-item>
							</template>
						</template>
					</uv-list>
				</view>
			</view>

			<uv-loading-page :loading="loading" loading-mode="semicircle"></uv-loading-page>
			<uv-toast ref="toast"></uv-toast>
			<uv-no-network></uv-no-network>
		</view>
	</view>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { getLoginScene } from '@/common/api/system/scene';
import { useAppStore } from '@/library/store/app';

const toast = ref();
const appStore = useAppStore();

const scene = ref(null);
const loading = ref(true);

onMounted(async () => {
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
