<script>
import config from '@/common/config.js';
import { getAppInfo } from '@/common/api/app';
import updrade from '@/library/upgrade';
import { useAppStore } from '@/library/store/app';
import { useUserStore } from '@/library/store/user';
import { hasToken, setLoginPlatform } from '@/library/auth';
import { toUrlQuery } from '@/library/utils';

export default {
	onLaunch: async function (params) {
		const useUserApp = useUserStore();

		// 易班登录
		// #ifdef H5
		if (params.query.verify_request) {
			setLoginPlatform(config.platform.yiban);
			useUserApp.setLoginCode(params.query.verify_request);
		}
		// #endif

		// #ifndef H5
		setLoginPlatform(uni.$uv.platform);
		// #endif

		// 已经登录则获取用户信息
		if (hasToken()) {
			await useUserApp.userinfo();
		} else {
			uni.reLaunch({ url: '/pages/login/index' });
		}

		// 获取系统信息
		// uni.showLoading({ title: '加载中', mask: true });
		// const data = await getAppInfo();
		// useAppStore().set(data);
		// uni.hideLoading();

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
// @import '@/static/form.scss';
page {
	background-color: #ffffff;
	box-sizing: border-box;
	width: 100%;
}

.content {
	padding: 20rpx;
}
.margin-top-10 {
	margin-top: 20rpx;
}
</style>
