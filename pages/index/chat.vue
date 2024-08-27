<template>
	<view class="chat">
		<me-ai-chat
			ref="chatRef"
			has-tabbar
			:title="setting.name"
			:logo="setting.logo"
			:desc="setting.desc"
			:guiding="setting.guiding"
			@send="handleSend"
		></me-ai-chat>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import { GetChatSetting, SendMessage } from '@/api/poverty/chat';

const setting = ref({});
const chatRef = ref();

const handleSend = async (sid, val) => {
	chatRef.value.repleier.send('', '');
	SendMessage(
		{ sessionId: sid, message: val },
		{
			back: (data) => {
				chatRef.value.repleier.send(data.sessionId, data.message);
			},
			error: (e) => {
				chatRef.value.repleier.error(e);
			},
			done: () => {
				chatRef.value.repleier.close();
			}
		}
	);
};

const getSetting = async () => {
	const data = await GetChatSetting();
	setting.value = data;
};

getSetting();
</script>

<style lang="less" scoped>
page {
}
.chat {
	overflow: hidden;
	height: 100%;
}
</style>
