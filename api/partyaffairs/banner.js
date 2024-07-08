import repuest from "@/library/request"
export const allBanner = (params) => {
	return repuest({
		url: "/partyaffairs/client/v1/banners",
		method: "get",
		params
	})
}