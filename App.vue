<script>
import config from '@/common/config.js';
import { getAppInfo } from '@/common/api/system/app';
import updrade from '@/library/upgrade';
import { useAppStore } from '@/library/store/app';
import { useUserStore } from '@/library/store/user';
import { hasToken, getPlatform, setPlatform } from '@/library/auth';
import { toUrlQuery } from '@/library/utils';
import { nav } from '@/library/nav';
import { platform } from '@/library/platform';

export default {
	onLaunch: async function (params) {
		const userStore = useUserStore();
		const appStore = useAppStore();

		// 获取系统信息
		uni.showLoading({ title: '加载中', mask: true });
		const data = await getAppInfo();
		appStore.set(data);
		updrade();
		uni.hideLoading();

		// 获取平台名称
		if (!getPlatform()) {
			const pt = await platform();
			setPlatform(pt);
		}

		// 获取yb跳转参数
		if (params.query.verify_request) {
			userStore.setLoginCode(params.query.verify_request);
		}

		// 已经登录则获取用户信息
		if (hasToken()) {
			await userStore.userinfo();
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

.content {
	padding: 30rpx;
}
.margin-top-10 {
	margin-top: 20rpx;
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
</style>
