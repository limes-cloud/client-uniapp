<template>
	<view class="agreement-box">
		<text>我已阅读和同意</text>
		<template v-for="(item, index) in agreements" :key="index">
			<template v-if="!(agreements.length != 1 && index == agreements.length - 1)">
				<text class="agreement" @click.stop="readAgreement(item.id)">
					{{ item.name }}
				</text>
				<text v-if="agreements.length != 1 && index != agreements.length - 2">、</text>
			</template>
		</template>
		<template v-if="agreements.length > 1">
			<text>和</text>
			<text class="agreement" @click.stop="readAgreement(agreements[agreements.length - 1].id)">
				{{ agreements[agreements.length - 1].name }}
			</text>
		</template>
	</view>
</template>

<script setup>
import { ref, watch } from 'vue';
import { nav } from '@/library/nav';
const props = defineProps({
	agreements: {
		type: Array,
		default() {
			return [];
		}
	}
});

const readAgreement = (id) => {
	nav.readAgreement(id);
};
</script>

<style lang="scss" scoped>
.agreement-box {
	width: 100%;
	white-space: pre-line;
	word-break: break-all;
	position: relative;
	top: -4rpx;
	.agreement {
		color: #3c9cff;
		padding: 0px 4rpx;
	}
}
</style>
