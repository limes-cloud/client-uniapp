import repuest from "@/library/request"
import config from "@/config"

export const ListInformation = (params) => {
	return repuest({
		url: "/poverty/client/v1/informations",
		method: "get",
		params: {
			page: 1,
			pageSize: 3,
			order: 'desc',
			orderBy: 'is_top',
			status: true,
			...params,
		}
	})
}