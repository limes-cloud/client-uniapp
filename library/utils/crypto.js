import cryptoJs from 'crypto-js';
import base64 from "./sdk/base64.js"
export default {
	sha256: (data) => {
		const wordArray = cryptoJs.lib.WordArray.create(data);
		return cryptoJs.SHA256(wordArray).toString();
	},
	base64: () => {
		return base64
	}
}