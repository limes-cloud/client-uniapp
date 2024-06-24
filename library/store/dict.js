import {
	defineStore,
} from 'pinia';

const initKeys = ["gender"]

export const useDictStore = defineStore('dict', {
	state: () => {
		return {
			dict: {}
		};
	},
	getters: {
		list: (state) => {

		},
		dict: (state) => {
			return {
				bind: '绑定',
				login: '登陆',
				register: '注册'
			}
		}
	},
	actions: {
		async init(info) {
			// const pt = await platform();
			// console.log(pt)
			// // #ifdef H5
			// window.document.title = info.name
			// // #endif
			// this.$patch({
			// 	...info,
			// 	platform: pt,
			// });
		}
	},
});