import repuest from "@/common/request.js"
import config from "@/common/config.js"


export const getAgreement = (id) => {
	return repuest({
		url: "/user-center/client/v1/agreement?id=" + id,
		method: "get"
	})
}