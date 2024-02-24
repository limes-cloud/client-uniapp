import repuest from "@/common/request.js"
import config from "@/common/config.js"

export const getDictValue = (keyword) => {
	return repuest({
		url: "/manager/client/v1/dict/value",
		method: "get",
		params: {
			keyword: keyword
		}
	})
}

export const getGenderDictValue = async (keyword) => {
	return getDictValue('gender')
}