import repuest from "@/library/request"
import config from "@/config"

export const ListFile = (params) => {
	return repuest({
		url: "/poverty/client/v1/resources",
		method: "get",
		params: {
			page: 1,
			pageSize: 10,
			status: true,
			...params
		}
	})
}