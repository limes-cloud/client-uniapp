<template>
	<uv-checkbox-group
		v-model="checked"
		@change="change"
		:customStyle="{ display: 'inline-block', verticalAlign: 'top' }"
	>
		<uv-checkbox name="allow" :size="16" :customStyle="{ alignItems: 'flex-start' }">
			<AgreementText :agreements="agreements"></AgreementText>
		</uv-checkbox>
	</uv-checkbox-group>
	<uv-modal ref="modalRef" title="提示" showCancelButton @confirm="confirm">
		<AgreementText :agreements="agreements"></AgreementText>
	</uv-modal>
</template>

<script setup>
import { ref, watch } from 'vue';
import AgreementText from './agreement-text.vue';
const props = defineProps({
	modelValue: {
		type: Boolean,
		default() {
			return false;
		}
	},
	agreements: {
		type: Array,
		default() {
			return [];
		}
	}
});
const emit = defineEmits(['update:modelValue']);
const checked = ref([]);
const modalRef = ref(null);

const change = (val) => {
	emit('update:modelValue', !!checked.value.length);
};

const show = () => {
	modalRef.value.open();
};

const confirm = () => {
	checked.value = ['allow'];
	emit('update:modelValue', true);
};

defineExpose({ show });

watch(
	() => props.modelValue,
	(val) => {
		if (props.modelValue) {
			checked.value = ['allow'];
		}
	},
	{ immediate: true, deep: true }
);
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
