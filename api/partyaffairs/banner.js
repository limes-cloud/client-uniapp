import repuest from "@/library/request"
export const ListBanner = (params) => {
	return repuest({
		url: "/partyaffairs/client/v1/banners",
		method: "get",
		params: {
			page: 1,
			pageSize: 5,
			status: true
		}
	})
}