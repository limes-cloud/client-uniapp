import {
	defineStore
} from 'pinia';

import {
	currentUser
} from "@/common/api/user.js";

export const useUserStore = defineStore('user', {
	state: () => {
		return {
			loginCode: "",
			loginStatus: false,
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
		setLoginStatus(status) {
			this.loginStatus = status
		},
	},
});