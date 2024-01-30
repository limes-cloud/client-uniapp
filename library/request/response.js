/**
 * 响应拦截
 * @param {Object} http 
 */

import {
	refreshToken,
} from "@/common/api/system/auth"

import {
	hasToken,
	removeToken,
	setToken
} from "@/library/auth"
import {
	useAppStore
} from "@/library/store/app"

import {
	nav
} from "@/library/nav"

// 是否正在刷新的标记
let isRefresh = false;
// 重试队列，每一项将是一个待执行的函数形式
let requests = [];

export default (vm) => {
	uni.$uv.http.interceptors.response.use((response) => {
		// 请求成功直接返回
		const data = response.data
		if (data.code === 200) {
			return data.data || {}
		}

		if (response.statusCode === 401) {
			// 未绑定处理
			if (data.reason === 'UnBindError') {
				nav.login();
				return new Promise(() => {})
			}

			// token刷新失败处理
			if (data.reason === 'RefreshTokenError') {
				return Promise.reject(data)
			}

			return new Promise(() => {})
			// token认证失败处理
			if (data.reason === 'UNAUTHORIZED' && hasToken()) {
				if (!isRefresh) {
					isRefresh = true;
					return refreshToken()
						.then((res) => {
							setToken(res.token);
							// 重新请求
							requests.forEach(cb => cb());
							requests = [];
							return uni.$uv.http.request(response.config);
						})
						.catch((e) => {
							removeToken()
							nav.login();
							return new Promise(() => {})
						})
						.finally(() => {
							isRefresh = false;
						});
				}

				return new Promise((resolve) => {
					requests.push(() => {
						resolve(uni.$uv.http.request(response.config))
					});
				});
			}

			nav.login();
			return new Promise(() => {})
		}

		/* 对响应成功做点什么 可使用async await 做异步操作*/
		// 自定义参数
		const custom = response.config?.custom
		if (data.code !== 200) { // 服务端返回的状态码不等于200，则reject()
			// 如果没有显式定义custom的toast参数为false的话，默认对报错进行toast弹出提示
			if (custom.toast !== false) {
				uni.$uv.toast(data.message)
			}
			// 如果需要catch返回，则进行reject
			if (custom?.catch) {
				return Promise.reject(data)
			} else {
				// 否则返回一个pending中的promise
				return new Promise(() => {})
			}
		}
		return data.data || {}
	}, (response) => {
		uni.$uv.toast("服务器开小差了～")
		return Promise.reject(response)
	})
}