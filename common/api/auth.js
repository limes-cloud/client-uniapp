import repuest from "../request.js"
export const login = (params) => {
	return repuest({
		url: "/party_affairs/client/v1/login",
		method: "post",
		params
	})
}

export const sendBindEmail = (params) => {
	return repuest({
		url: "/party_affairs/client/v1/bind/email",
		method: "post",
		params
	})
}

export const bind = (params) => {
	return repuest({
		url: "/party_affairs/client/v1/bind",
		method: "post",
		params
	})
}

export const refreshToken = (params) => {
	return repuest({
		url: "/party_affairs/client/v1/refresh_token",
		method: "post",
		params
	})
}