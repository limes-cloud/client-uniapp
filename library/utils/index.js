import {
	getPlatform
} from "@/library/auth"
import config from "@/common/config.js"
export function toUrlQuery(obj) {
	let arr = []
	for (let key in obj) {
		arr.push(key + "=" + obj[key])
	}
	return arr.join("&")
}

//下载文件
export function downloadFile(url) {
	let isfinsh = true
	uni.showLoading({
		title: "文件下载中...",
		mask: true
	})

	const fileType = (url) => {
		let temp = url.split(".")
		let type = temp[temp.length - 1]
		if (["doc", "docx", "xls", "xlsx", "pdf", "pdfx", "ppt", "pptx"].includes(type)) {
			return "document"
		} else if (["png", "jpg", "jpeg", "gif"].includes(type)) {
			return "image"
		} else if (["mp4", "avi", "mov", "flv"].includes(type)) {
			return "video"
		} else {
			return "other"
		}
	}

	// #ifdef MP
	uni.downloadFile({
		url: url, //仅为示例，并非真实的资源
		success: (res) => {
			if (res.statusCode === 200) {
				let that = this;
				let file = res.tempFilePath
				switch (fileType(url)) {
					case "document":
						uni.openDocument({
							filePath: file,
							fail() {
								isfinsh = false
							}
						});
						break;
					case "image":
						uni.saveImageToPhotosAlbum({
							filePath: file,
							fail() {
								isfinsh = false
							}
						});
						break;
					case "video":
						uni.saveVideoToPhotosAlbum({
							filePath: file,
							fail() {
								isfinsh = false
							}
						});
						break;
					case "other": //设置下载链接到剪贴板，这里需要使用官方的下载通道下载否则会因为防盗链接导致下载失败
						setClipboardData(url).then(res => {
							isfinsh = null;
							uni.showToast({
								title: "此文件微信暂时不支持下载，已经复制下载链接，移步到浏览器下载",
								icon: "none"
							})
						})
				}
				if (isfinsh === true) {
					uni.showToast({
						title: "下载成功"
					})
				} else if (isfinsh === false) {
					uni.showToast({
						title: "下载失败",
						icon: "none"
					})
				}
				uni.hideLoading()
			}
		}
	});
	// #endif

	// #ifdef H5
	const platform = getPlatform()
	if (platform == config.platform.yiban) {
		ybDownload(url)
	}

	if (platform == config.platform.h5) {
		const dload = document.createElement("a");
		dload.download = ''; // 设置下载的文件名，默认是'下载'
		dload.href = url;
		document.body.appendChild(dload);
		dload.click();
		dload.remove(); // 下载之后把创建的元素删除
	}
	uni.hideLoading()
	// #endif
}