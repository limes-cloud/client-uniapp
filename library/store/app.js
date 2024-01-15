import {
	defineStore,
} from 'pinia';


export const useAppStore = defineStore('app', {
	state: () => {
		return {
			hasAppInfo: false,
			name: "",
			logo: "",
			desc: "",
			version: ""
		};
	},
	getters: {
		// double: (state) => state.count * 2,
	},
	actions: {
		set(info) {
			this.hasAppInfo = true;
			this.name = info.name;
			this.logo = info.logo;
			this.desc = info.desc;
			this.version = info.version;
		},
	},
});