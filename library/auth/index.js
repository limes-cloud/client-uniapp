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