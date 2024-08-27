<template>
	<view class="chat">
		<uv-navbar placeholder leftIcon="" :title="title"></uv-navbar>
		<uv-toast ref="toast"></uv-toast>
		<uv-no-network></uv-no-network>
		<view
			class="chat-box"
			:style="{
				height: 'calc(100vh - ' + overHeight + ') '
			}"
		>
			<view class="pre-content" v-if="!sessionId && !msgList.length">
				<uv-image
					:src="logo"
					mode="widthFix"
					:lazy-load="true"
					width="80"
					height="80"
					radius="8"
					:custom-style="{ background: '#fff' }"
				></uv-image>
				<view class="app">{{ app ? app : title }}</view>
				<view class="welcome">
					<view class="welcome-text">{{ desc }}</view>
				</view>
				<view class="guiding" v-if="guiding.length">
					<view class="guiding-header">猜你想问</view>
					<view class="guiding-content">
						<view class="guiding-item" v-for="(item, index) in guiding" :key="index">
							<view class="guiding-text" @click="handleGuiding(item)">
								<template v-if="item.type === 'question'">
									<uv-icon color="#3c9cff" name="question-circle"></uv-icon>
									<text>{{ item.text }}</text>
								</template>
								<!-- 								
								<template v-if="item.type === 'webview'">
									<uv-icon color="#3c9cff" name="question-circle"></uv-icon>
									<text>{{ item.text }}</text>
								</template> -->
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="chat-content" v-else>
				<view class="header-msg">
					<view class="user">
						<uv-image
							:src="logo"
							mode="widthFix"
							:lazy-load="true"
							width="40"
							height="40"
							radius="4"
							:custom-style="{ background: '#fff' }"
						></uv-image>
						<view class="app">{{ app ? app : title }}</view>
					</view>
					<view class="welcome">
						<view class="welcome-text">{{ desc }}</view>
					</view>
				</view>

				<view class="chat-body">
					<view
						v-for="(item, index) in getMsgList()"
						:key="index"
						:class="item.type == 'reply' ? 'left-msg-box' : 'right-msg-box'"
						:id="'last_' + index"
					>
						<view
							v-if="item.type == 'reply'"
							class="left-msg"
							:class="item.status === 'error' ? 'msg-error' : ''"
						>
							<template v-if="isProcess && index == 0">
								<view v-if="!item.text" class="innter-col-flex">
									<uv-image :src="loading" height="12px" width="24px"></uv-image>
									<text class="wait">正在思考中</text>
								</view>
								<view v-else class="chat-parse-content">
									<uv-parse :content="marked(item.text)" :selectable="true"></uv-parse>
									<!-- <text>{{ item.text }}</text> -->
									<uv-image
										class="innter-col-flex"
										:src="loading"
										height="12px"
										width="24px"
									></uv-image>
								</view>
							</template>
							<view v-else class="chat-parse-content">
								<uv-parse :content="marked(item.text)" :selectable="true"></uv-parse>
							</view>
						</view>
						<view v-else class="right-msg">{{ item.text }}</view>
					</view>
				</view>
			</view>
			<view class="chat-footer form">
				<view class="clear">
					<uv-icon
						@click="handleClear"
						name="clear"
						:color="msgList.length && !isProcess ? '#3c9cff' : '#ddd'"
						size="20"
						custom-prefix="custom-icon"
					></uv-icon>
				</view>
				<uv-input
					placeholder="请输入内容"
					border="surround"
					v-model="inputValue"
					@change="handleInput"
					:maxlength="maxlength"
				>
					<template v-slot:suffix>
						<uv-icon
							v-if="isProcess"
							name="blue-pause"
							color="#3e8cfa"
							size="20"
							custom-prefix="custom-icon"
						></uv-icon>
						<uv-icon
							v-else
							@click="handleSend"
							size="20"
							:class="!isSend ? 'gray' : ''"
							:name="sendLogo"
						></uv-icon>
					</template>
				</uv-input>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref, defineProps, defineEmits, defineExpose, nextTick, onMounted, computed } from 'vue';
import sendLogo from './send.png';
import loading from './loading.gif';
import { marked } from 'marked';

const emit = defineEmits(['send']);
const props = defineProps({
	title: String,
	logo: String,
	app: String,
	desc: String,
	guiding: {
		type: Array,
		default: () => {
			return [];
		}
	},
	maxlength: {
		type: Number,
		default: 120
	},
	hasTabbar: {
		type: Boolean,
		default: false
	}
});

const overHeight = computed(() => {
	const sys = uni.$uv.sys();
	// return uni.$uv.addUnit(44 + sys.statusBarHeight, 'px');
	if (props.hasTabbar) {
		return uni.$uv.addUnit(44 + sys.statusBarHeight + 1 * sys.windowBottom, 'px');
	} else {
		return uni.$uv.addUnit(44 + sys.statusBarHeight, 'px');
	}
});

const sessionId = ref('');
const isProcess = ref(false);

const inputValue = ref('');
const isSend = ref(false);
const msgList = ref([]);

const getMsgList = () => {
	return [...msgList.value].reverse();
};

const handleInput = (val) => {
	isSend.value = val.trim() != '';
};

const handleGuiding = (value) => {
	if (value.type === 'question') {
		msgList.value.push({ type: 'send', text: value.text });
		emit('send', sessionId.value, value.text);
		isSend.value = false;
	}
	console.log(value);
};

const handleSend = () => {
	if (!(isSend.value && !isProcess.value)) {
		return;
	}
	msgList.value.push({ type: 'send', text: inputValue.value });
	emit('send', sessionId.value, inputValue.value);
	inputValue.value = '';
	isSend.value = false;
};

const repleier = {
	send: (sid, msg) => {
		sessionId.value = sid;
		const index = msgList.value.length - 1;
		if (isProcess.value) {
			msgList.value[index].text += msg;
		} else {
			console.log('push');
			isProcess.value = true;
			msgList.value.push({ type: 'reply', text: msg, status: 'process' });
		}
	},
	close: () => {
		isProcess.value = false;
		const index = msgList.value.length - 1;
		msgList.value[index].status = 'done';
	},
	error: (msg) => {
		isProcess.value = false;
		const index = msgList.value.length - 1;
		msgList.value[index].status = 'error';
		msgList.value[index].text = msg;
	}
};

const handleClear = () => {
	if (isProcess.value || !msgList.value.length) {
		return;
	}
	msgList.value = [];
	sessionId.value = '';
};

defineExpose({ repleier });
</script>
<style scoped>
.form .uv-input {
	background-color: #fff !important;
	border-radius: 8rpx !important;
}
</style>
<style lang="scss" scoped>
.chat-parse-content {
	width: 100%;
	overflow: hidden;
}
.chat {
	width: 100%;
	height: 100%;
	overflow: hidden;
	.chat-box {
		background-color: #f3f5f9;
		width: 100%;
		position: relative;
		display: flex;
		flex-direction: column;
		overflow: hidden;
		.chat-content {
			height: 100%;
			padding: 40rpx;
			display: flex;
			flex-direction: column;
			overflow: hidden;
			.header-msg {
				padding-bottom: 30rpx;
				margin-bottom: 30rpx;
				border-bottom: 1px solid #e8e9ed;
				.user {
					display: flex;
					align-items: center;
					.app {
						margin-left: 30rpx;
						font-size: $font-lg;
						font-weight: 700;
					}
				}
				.welcome {
					margin-top: 30rpx;
					width: 100%;
					.welcome-text {
						display: inline-block;
						border-radius: 16rpx;
						background: #fff;
						padding: 24rpx;
					}
				}
			}

			.chat-body {
				flex: 1;
				overflow: scroll;
				display: flex;
				flex-direction: column-reverse;
				.left-msg-box,
				.right-msg-box {
					display: block;
					width: 100%;
					padding-bottom: 40rpx;
				}
				.right-msg-box {
					display: flex;
					flex-direction: column;
					align-items: flex-end;
				}
				.left-msg,
				.right-msg {
					display: inline-block;
					border-radius: 16rpx;
					background: #fff;
					box-sizing: border-box;
					padding: 30rpx;
					max-width: 100%;
				}
				.left-msg {
					.innter-col-flex {
						display: inline-flex;
						flex-direction: row;
						align-items: center;
					}
					.wait {
						margin-left: 10rpx;
						color: #84868c;
					}
				}
				.msg-error {
					border: 1px solid red;
					color: red;
				}
				.right-msg {
					background-color: #3c9cff;
					color: #fff;
				}
			}
		}

		.pre-content {
			padding: 40rpx;
			flex: 1;
			display: flex;
			flex-direction: column;
			align-items: center;
			.app {
				padding: 30rpx;
				font-size: $font-lg;
				font-weight: 700;
			}
			.welcome {
				margin-top: 30rpx;
				width: 100%;
				.welcome-text {
					display: inline-block;
					border-radius: 16rpx;
					background: #e7ecf2;
					padding: 30rpx;
				}
			}
			.guiding {
				margin-top: 40rpx;
				width: 100%;
				box-sizing: border-box;
				.guiding-header {
					color: #84868c;
					margin-bottom: 20rpx;
				}
				.guiding-content {
					.guiding-item {
						margin-bottom: 16rpx;
						.guiding-text {
							display: inline-flex;
							padding: 20rpx 20rpx;
							background-color: #fff;
							color: #3c9cff;
							border-radius: 10rpx;

							text {
								margin-left: 10rpx;
							}
						}
					}
				}
			}
		}
		.chat-footer {
			display: flex;
			align-items: center;
			padding: 20rpx 40rpx;
			margin-bottom: 30rpx;
			.clear {
				margin-right: 30rpx;
			}
			.gray {
				filter: grayscale(80%);
				// &:hover {
				// 	filter: grayscale(0%);
				// }
			}
		}
	}
}
</style>
