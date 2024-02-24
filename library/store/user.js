import {
	defineStore
} from 'pinia';

import {
	currentUser
} from "@/common/api/system/user";

export const useUserStore = defineStore('user', {
	state: () => {
		return {
			id: 0,
			loginCode: "",
			real_name: "",
			nick_name: "",
			username: "",
			phone: "",
			email: "",
			avatar: "",
			gender: "",
			extra: {},
			resource: null
		};
	},
	getters: {

	},
	actions: {
		setLoginCode(code) {
			this.loginCode = code
		},
		async userinfo() {
			const data = await currentUser();
			this.setInfo(data);
		},
		setInfo(partial) {
			this.$patch(partial);
		},
	},
});