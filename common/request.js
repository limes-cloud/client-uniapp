function request(info) {
	var url = info.url;
	var method = info.method;
	var params = info.params ? filterParam(info.params) : {};
	var header = info.header || {};

	if (method === "get") {
		return uni.$uv.http.get(url, {
			params: params,
			header: header
		})
	}

	if (method === "post") {
		return uni.$uv.http.post(url, params, {
			header: header
		})
	}

	if (method === "put") {
		return uni.$uv.http.put(url, params, {
			header: header
		})
	}

	if (method === "delete") { //拼接url 防止delete找不到参数
		return uni.$uv.http.delete(url, {
			params: params,
			header: header
		})
	}
}



function filterParam(param) { //过滤参数
	var data = {}
	for (let i in param) {
		if (param[i] !== null && param[i] !== undefined && param[i] !== "") {
			data[i] = param[i]
		}
	}
	return data;
}

export default request;