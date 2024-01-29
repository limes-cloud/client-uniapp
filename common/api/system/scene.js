import repuest from "@/common/request.js"
import config from "@/common/config.js"


export const getLoginScene = () => {
	return repuest({
		url: "/user-center/client/v1/scene?keyword=" + config.scene.login,
		method: "get"
	})
}


export const getRegisterScene = () => {
	return repuest({
		url: "/user-center/client/v1/scene?keyword=" + config.scene.register,
		method: "get"
	})
}