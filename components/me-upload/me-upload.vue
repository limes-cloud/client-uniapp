<template>
	<uv-upload :file-list="files" @delete="deleteFile" @afterRead="uploadFile">
		<slot></slot>
	</uv-upload>
</template>

<script setup>
import { ref, reactive, getCurrentInstance } from 'vue';
import config from '@/common/config.js';
import crypto from '@/library/utils/crypto.js';
import formatUrl from '@/library/global/resource.js';
import { prepareUpload, upload } from '@/common/api/system/resource.js';

const props = defineProps({
	fileList: {
		type: Array,
		default: () => []
	},
	listType: {
		type: String,
		default: 'picture-card'
	},
	autoUpload: {
		type: Boolean,
		default: true
	},
	app: {
		type: String,
		require: true,
		default: () => {
			return config.server;
		}
	},
	path: {
		type: String,
		require: true
	}
});

const emit = defineEmits(['change', 'success']);

const files = reactive(props.fileList);

const deleteFile = (event) => {
	files.splice(event.index, 1);
	emit('change', files);
};

const uploadFile = async (event) => {
	const list = [].concat(event.file);
	const flen = files.length;
	list.map((item) => {
		const file = { ...item };
		uploadFactory(file);
	});
};

// const binaryToBase64 = (buffer) => {
// 	let binary = '';
// 	const bytes = new Uint8Array(buffer);
// 	const len = bytes.byteLength;
// 	for (let i = 0; i < len; i += 1) {
// 		binary += String.fromCharCode(bytes[i]);
// 	}
// 	return crypto.base64().btoa(binary);
// };

const binaryToSha = (binary) => {
	return crypto.sha256(binary);
};

const toBinary = async (url) => {
	const response = await uni.request({
		url: url,
		responseType: 'arraybuffer'
	});
	return response.data;
};

const onSuccess = (file, data) => {
	files.forEach((item, index) => {
		if (item.url !== file.url) {
			return;
		}
		files[index].status = 'success';
		files[index].message = '';
		files[index].sha = data.sha;
		files[index].source = formatUrl(data.src);
		emit('change', files);
		emit('success', files[index], index);
	});
};

const onFailed = (file) => {
	files.forEach((item, index) => {
		if (item.url !== file.url) {
			return;
		}
		files[index].status = 'failed';
		files[index].message = '上传失败';
	});
};

const onUploading = (file) => {
	file.status = 'uploading';
	file.message = '上传中';
	files.push(file);
};

const uploadFactory = async (file) => {
	// 设置为上传中
	onUploading(file);
	// 获取文件二进制数据
	const binary = await toBinary(file.url);
	// 获取文件hash
	const hash = binaryToSha(binary);
	// 进行预传
	const data = await prepareUpload({
		directory_path: props.path,
		app: props.app,
		name: file.name,
		sha: hash,
		size: file.size
	}).catch(() => {
		onFailed(file);
	});
	// 上传失败直接返回
	if (!data) {
		return;
	}
	// 触发秒传
	if (data.uploaded) {
		onSuccess(file, data);
		return;
	}
	const count = data.chunk_count;
	const size = data.chunk_size;
	const uploaed = data.upload_chunks;
	const taskArr = [];

	if (count <= 1) {
		taskArr.push(upload(new Blob([binary]), { upload_id: data.upload_id, index: 1 }));
	} else {
		for (let i = 0; i < count; i += 1) {
			if (uploaed.includes(i + 1)) continue;
			let sliceBinary = new ArrayBuffer(0);
			if ((i + 1) * size > binary.byteLength) {
				sliceBinary = binary.slice(i * size, binary.byteLength);
			} else {
				sliceBinary = binary.slice(i * size, (i + 1) * size);
			}
			taskArr.push(upload(new Blob([sliceBinary]), { upload_id: data.upload_id, index: i + 1 }));
		}
	}
	taskArr.forEach((fn, index) => {
		fn.then((res) => {
			if (index + 1 == taskArr.length) {
				onSuccess(file, res);
			}
		}).catch((res) => {
			onFailed(file);
		});
	});
};
</script>

<style lang="scss" scoped></style>