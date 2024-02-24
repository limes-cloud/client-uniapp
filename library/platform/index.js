import config from "@/common/config";

export const platform = () => {
	return new Promise((resolve) => {
		resolve(config.platform.yb)
		// #ifdef H5
		document.addEventListener("YibanDeviceReady", () => {
			resolve(config.platform.yb)
		});
		if (window && window.yiban) {
			resolve(config.platform.yb)
		}
		setTimeout(() => {
			resolve(uni.$uv.platform)
		}, 1000)
		// #endif
		// #ifndef H5
		resolve(uni.$uv.platform)
		// #endif
	})
}