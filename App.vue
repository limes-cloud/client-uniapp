<script>
import config from '@/common/config.js';
import { getAppInfo } from '@/common/api/system/app';
import updrade from '@/library/upgrade';
import { useAppStore } from '@/library/store/app';
import { useUserStore } from '@/library/store/user';
import { hasToken, getPlatform, setPlatform } from '@/library/auth';
import { toUrlQuery } from '@/library/utils';
import { nav } from '@/library/nav';

export default {
	onLaunch: async function (params) {
		const userStore = useUserStore();
		const appStore = useAppStore();

		if (!getPlatform()) {
			setPlatform(uni.$uv.platform);
			// #ifdef H5
			// yb登录
			if (params.query.verify_request) {
				setPlatform(config.platform.yb);
				userStore.setLoginCode(params.query.verify_request);
			}
			// #endif
		}

		// 已经登录则获取用户信息
		if (hasToken()) {
			nav.home();
			await userStore.userinfo();
		} else {
			nav.login();
		}

		// 获取系统信息
		uni.showLoading({ title: '加载中', mask: true });
		const data = await getAppInfo();
		appStore.set(data);
		uni.hideLoading();

		// 版本升级
		updrade();
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
	padding: 20rpx;
}
.margin-top-10 {
	margin-top: 20rpx;
}
</style>
