import repuest from "@/library/request"
import config from "@/config"

export const ListBanner = () => {
	return repuest({
		url: "/poverty/client/v1/banners",
		method: "get",
		params: {
			page: 1,
			pageSize: 10,
			order: 'desc',
			orderBy: 'weight',
			status: true
		}
	})
}