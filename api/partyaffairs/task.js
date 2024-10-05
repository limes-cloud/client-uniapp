import repuest from "@/library/request"


export const ListTask = (params) => {
	return repuest({
		url: "/partyaffairs/client/v1/tasks",
		method: "get",
		params
	})
}

export const GetTask = (params) => {
	return repuest({
		url: "/partyaffairs/client/v1/task",
		method: "get",
		params
	})
}