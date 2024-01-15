import {
	getToken
} from "./index.js";

const loginPage = "/pages/login/index"

// 页面白名单，不受拦截
const whiteList = [
	'/pages/login/index',
]

//const funcList = ["navigateTo", "redirectTo", "reLaunch", "switchTab"];

let funcList = [];

function hasPermission(url) {
	const token = getToken()
	console.log(token)
	return whiteList.indexOf(url) !== -1 || token
}

funcList.forEach(item => {
	uni.addInterceptor(item, {
		invoke(e) {
			console.log("e");
			return false;
			// if (!hasPermission(e.url)) {
			// 	uni.reLaunch({
			// 		url: loginPage
			// 	})
			// 	return false
			// }
			// return true
		},
		success(e) {}
	})
})

// 页面跳转前进行拦截, invoke根据返回值进行判断是否继续执行跳转