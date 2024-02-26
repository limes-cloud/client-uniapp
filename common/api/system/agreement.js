import repuest from "@/common/request.js"
import config from "@/common/config.js"


export const getAgreementContent = (id) => {
	return repuest({
		url: "/user-center/client/v1/agreement/content?id=" + id,
		method: "get"
	})
}

export const getLoginAgreement = () => {
	return repuest({
		url: "/user-center/client/v1/agreement/scene?keyword=" + config.agreement.login,
		method: "get"
	})
}


export const getRegisterAgreement = () => {
	return repuest({
		url: "/user-center/client/v1/agreement/scene?keyword=" + config.agreement.register,
		method: "get"
	})
}