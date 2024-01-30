import {
	defineStore,
} from 'pinia';


export const useAppStore = defineStore('app', {
	state: () => {
		return {
			name: "",
			logo: "",
			keyword: "",
			channels: [],
			description: "",
			resource: {
				src: "",
			},
			allow_registry: false,
		};
	},
	getters: {
		// double: (state) => state.count * 2,
	},
	actions: {
		set(info) {
			// #ifdef H5
			window.document.title = info.name
			// #endif
			info.logo = info.resource.src
			this.$patch({
				...info,
			});
		},
	},
});