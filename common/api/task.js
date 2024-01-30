import repuest from "../request.js"


export const pageTask = (params) => {
	return repuest({
		url: "/party-affairs/client/v1/tasks",
		method: "get",
		params
	})
}

export const getTask = (params) => {
	return repuest({
		url: "/party-affairs/client/v1/task",
		method: "get",
		params
	})
}