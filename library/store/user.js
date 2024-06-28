import {
	defineStore
} from 'pinia';

import {
	GetCurrentUser
} from "@/api/system/usercenter";

export const useUserStore = defineStore('user', {
	state: () => {
		return {
			id: 0,
			realName: "",
			nickName: "",
			username: "",
			phone: "",
			email: "",
			avatar: "",
			avatarUrl: "",
			gender: "",
			isLogin: false,
		};
	},
	getters: {

	},
	actions: {
		async userinfo() {
			const data = await GetCurrentUser();
			this.setInfo({
				...data,
				isLogin: true
			});
		},
		setInfo(partial) {
			this.$patch(partial);
		},
	},
});