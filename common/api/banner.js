import repuest from "../request.js"
export const allBanner = (params) => {
	return repuest({
		url: "/party_affairs/client/v1/banners",
		method: "get",
		params
	})
}