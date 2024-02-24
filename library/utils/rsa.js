import JSEncrypt from 'jsencrypt/bin/jsencrypt.min';

import config from "@/common/config.js"


//加密
export function rsaEncode(params) {
	var encrypt = new JSEncrypt();
	encrypt.setPublicKey(config.rsa.publicKey);
	return encrypt.encrypt(typeof params === 'object' ? JSON.stringify(params) : params);
}

//解密 
export function rsaDecode(params) {
	var decrypt = new JSEncrypt();
	decrypt.setPrivateKey(config.rsa.privateKey);
	return decrypt.decrypt(typeof params === 'object' ? JSON.stringify(params) : params);
}

//生成密钥对
function generateKeys() {
	var crypt = new JSEncrypt({
		default_key_size: 1024
	});
	crypt.getKey();
	var publicKey = crypt.getPublicKey();
	var privateKey = crypt.getPrivateKey();
	// 去除-----*** RSA **** KEY----- 和空格换行
	publicKey = (publicKey.split('-----'))[2];
	publicKey = publicKey.replace(/\n/g, "").replace(/\r/g, "").replace(/\t/g, "").replace(/\s*/g, "");
	privateKey = (privateKey.split('-----'))[2];
	privateKey = privateKey.replace(/\n/g, "").replace(/\r/g, "").replace(/\t/g, "").replace(/\s*/g, "");
	// 返回生成的秘钥对
	return [publicKey, privateKey];
}

export default null;