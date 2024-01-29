import repuest from "@/common/request.js"

export const currentUser = (params) => {
	return repuest({
		url: "/user-center/client/v1/user",
		method: "get",
		params
	})
}