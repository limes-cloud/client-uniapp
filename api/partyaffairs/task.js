import repuest from "@/library/request"


export const pageTask = (params) => {
	return repuest({
		url: "/partyaffairs/client/v1/tasks",
		method: "get",
		params
	})
}

export const getTask = (params) => {
	return repuest({
		url: "/partyaffairs/client/v1/task",
		method: "get",
		params
	})
}