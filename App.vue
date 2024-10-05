<script>
import config from '@/config';
import updrade from '@/library/upgrade';
import { GetApp } from '@/api/system/application';
import { useAppStore } from '@/library/store/app';
import { useUserStore } from '@/library/store/user';
import { hasToken } from '@/library/auth';
import { nav } from '@/library/nav';

export default {
	onLaunch: async function (params) {
		const userStore = useUserStore();
		const appStore = useAppStore();
		appStore.set({});
		// 获取系统信息
		uni.showLoading({ title: '加载中', mask: true });
		const data = await GetApp();
		if (!data.status) {
			uni.hideLoading();
			nav.error(data.disableDesc);
			return;
		}
		appStore.set({ ...data, query: params.query });
		updrade();
		uni.hideLoading();

		// 已经登录则获取用户信息
		if (hasToken()) {
			userStore.userinfo().catch(() => {
				nav.login();
			});
		} else {
			nav.login();
		}
	},
	onShow: function () {},
	onHide: function () {},
	methods: {}
};
</script>

<style lang="scss">
/* #ifndef APP-NVUE */
@import '@/static/iconfont.css';
/* #endif */

@import '@/static/ext-icon/iconfont.css';
@import '@/uni_modules/uv-ui-tools/index.scss';
/*每个页面公共css */
@import '@/static/form.scss';
page {
	background-color: #ffffff;
	box-sizing: border-box;
	width: 100%;
	font-size: 28rpx;
}

//uni-page-wrapper {
//	// 第三方跳转过来的时候会出现滑动异常
//	overflow-y: scroll;
//}

.content {
	padding: 30rpx;
}
.margin-top-10 {
	margin-top: 20rpx;
}
.margin-top-20 {
	margin-top: 40rpx;
}
.uv-tags--small {
	height: 14px;
	line-height: 14px;
	font-size: $font-xs;
	padding: 4rpx 6rpx;

	.uv-tags__icon {
		margin-right: 0px !important;
	}

	span {
		white-space: nowrap;
	}
}

.uv-cell {
	.uv-line {
		border-bottom: 1px solid #e9ecf0 !important;
	}
}

.circle-upload {
	.uv-upload__wrap__preview__image,
	.uv-upload__status {
		border-radius: 50% !important;
		overflow: hidden;
	}
}

.no-margin-upload {
	.uv-upload__wrap {
		height: 100%;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.uv-upload__wrap__preview {
		margin: 0px !important;
	}
}
</style>
