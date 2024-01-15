import repuest from "../request.js"

export const currentUser = (params) => {
	return repuest({
		url: "/party_affairs/client/v1/user",
		method: "post",
		params
	})
}