import config from "@/common/config.js"
const TokenKey = 'uni_app_token';
const PlatformKey = 'uni_app_platform';

export function hasToken() {
	return !!uni.getStorageSync(TokenKey)
}

export function getToken() {
	return uni.getStorageSync(TokenKey)
}

export function setToken(token) {
	return uni.setStorageSync(TokenKey, token)
}

export function removeToken() {
	return uni.removeStorageSync(TokenKey)
}

export function setPlatform(platform) {
	return uni.setStorageSync(PlatformKey, platform)
}

export function getPlatform() {
	return uni.getStorageSync(PlatformKey)
}

export function getCode(info) {
	switch (getPlatform()) {
		case config.platform.yb:
			window.location.href = "https://oauth.yiban.cn/code/html?client_id=" + config.yb.appid + "&redirect_uri=" +
				config.yb.redirect + "&state=STATE"

	}
}