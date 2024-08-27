import repuest from "@/library/request"
import config from "@/config"
import {
	getToken,
} from "@/library/auth"
export const SendMessage = async (params, func) => {
	const response = await fetch(config.baseUrl + "/poverty/client/v1/chat/send", {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			"Authorization": "Bearer " + getToken()
		},
		body: JSON.stringify({
			...params
		})
	})

	if (response.body) {
		const reader = response.body.getReader();
		while (true) {
			const {
				value,
				done
			} = await reader.read();
			const msg = new TextDecoder().decode(value);
			if (msg !== "") {
				const arr = msg.split("\n")
				for (var i = 0; i < arr.length; i++) {
					let str = arr[i]
					if (str.trim() === "") {
						continue
					}
					const data = JSON.parse(str)
					if (data.reason && func.error) {
						func.error(data.message)
						break;
					} else if (func.back) {
						func.back(data)
					}
				}
			}

			if (done) {
				if (func.done) {
					func.done()
				}
				break;
			}
		}
	}

}

export const GetChatSetting = () => {
	return repuest({
		url: "/poverty/client/v1/chat/setting",
		method: "get",
	})
}