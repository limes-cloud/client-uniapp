import {
	defineStore
} from 'pinia';

import {
	currentUser
} from "@/common/api/system/user";

export const useUserStore = defineStore('user', {
	state: () => {
		return {
			loginCode: "",
			name: "",
			nickname: "",
			phone: "",
			email: ""
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