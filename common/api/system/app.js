import repuest from "@/common/request.js"
import config from "@/common/config.js"
export const getAppInfo = () => {
	return repuest({
		url: "/user-center/client/v1/app?keyword=" + config.name,
		method: "get"
	})
}

// export const extraFields = () => {
// 	return repuest({
// 		url: "/user-center/client/v1/fields",
// 		method: "get"
// 	})
// }