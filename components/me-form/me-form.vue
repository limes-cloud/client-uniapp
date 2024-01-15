<template>
	<view>
		<uv-picker ref="picker" :columns="pickerColumns" @confirm="pickerConfirm"></uv-picker>
		<view class="form">
			<uv-form ref="form" label-position="top" label-width="auto" :model="formModel" :rules="rules">
				<template v-for="(component, index) in components" :key="index">
					<template v-if="component.type === 'input'">
						<uv-form-item :label="component.config.label" :prop="component.field">
							<uv-input
								v-model="formModel[component.field]"
								clearable
								:disabled="component.config.disabled"
								:placeholder="component.config.placeholder"
								:maxlength="component.config.max_length"
							></uv-input>
						</uv-form-item>
					</template>

					<template v-if="component.type === 'textarea'">
						<uv-form-item :label="component.config.label" :prop="component.field">
							<uv-textarea
								v-model="formModel[component.field]"
								clearable
								count
								:disabled="component.config.disabled"
								:placeholder="component.config.placeholder"
								:maxlength="component.config.max_length"
							></uv-textarea>
						</uv-form-item>
					</template>

					<template v-if="component.type === 'number'">
						<uv-form-item :label="component.config.label" :prop="component.field">
							<uv-number-box
								class="number-box"
								inputWidth="100%"
								buttonSize="37"
								v-model="formModel[component.field]"
								:min="component.config.min"
								:max="component.config.max"
								:step="component.config.step"
								border="bottom"
								:disabled="component.config.disabled"
								:placeholder="component.config.placeholder"
							></uv-number-box>
						</uv-form-item>
					</template>

					<template v-if="component.type === 'password'">
						<uv-form-item :label="component.config.label" :prop="component.field">
							<uv-input
								v-model="formModel[component.field]"
								type="password"
								clearable
								:disabled="component.config.disabled"
								:placeholder="component.config.placeholder"
								:maxlength="component.config.max_length"
							></uv-input>
						</uv-form-item>
					</template>

					<template v-if="component.type === 'radio'">
						<uv-form-item :label="component.config.label" :prop="component.field">
							<uv-radio-group v-model="formModel[component.field]" placement="cloumn">
								<template v-for="(option, optInd) in component.config.options" :key="optInd">
									<uv-radio
										:customStyle="{ padding: '8px 0px' }"
										:label="option"
										:name="option"
									></uv-radio>
								</template>
							</uv-radio-group>
						</uv-form-item>
					</template>

					<template v-if="component.type === 'checkbox'">
						<uv-form-item :label="component.config.label" :prop="component.field">
							<uv-checkbox-group v-model="formModel[component.field]" placement="cloumn">
								<template v-for="(option, optInd) in component.config.options" :key="optInd">
									<uv-checkbox
										:customStyle="{ padding: '8px 0px' }"
										:label="option"
										:name="option"
									></uv-checkbox>
								</template>
							</uv-checkbox-group>
						</uv-form-item>
					</template>

					<template v-if="component.type === 'select'">
						<uv-form-item :label="component.config.label" :prop="component.field">
							<uv-input
								v-model="formModel[component.field]"
								@click="handleSelect(component)"
								suffixIcon="arrow-right"
								readonly
								:disabled="component.config.disabled"
								:placeholder="component.config.placeholder"
								:maxlength="component.config.max_length"
							></uv-input>
						</uv-form-item>
					</template>

					<!-- <template v-if="component.type === 'datetime'">
						<uv-form-item :label="component.config.label" :prop="component.field">
							<uv-input
								v-model="formModel[component.field]"
								@click="handleSelect(component)"
								suffixIcon="arrow-right"
								readonly
								:disabled="component.config.disabled"
								:placeholder="component.config.placeholder"
								:maxlength="component.config.max_length"
							></uv-input>
						</uv-form-item>
					</template> -->
				</template>
				<uv-button type="primary" text="提交" customStyle="margin-top: 10px" @click="submit"></uv-button>
			</uv-form>
		</view>
	</view>
</template>

<script setup>
import { computed, ref } from 'vue';
import { handleModel, handleRules } from './form.js';

const emit = defineEmits(['submit']);
const props = defineProps({
	components: Array,
	value: Object
});
const currentComponent = ref({});
const picker = ref(null);
const pickerColumns = ref([]);

// 组件列表
const modelValue = handleModel(props.components);

// 填写model
const form = ref(null);
const formModel = ref(modelValue);
if (props.value) {
	formModel.value = { ...props.value };
}

// 填写规则
const rules = handleRules(props.components);

// 处理提交
const submit = () => {
	form.value.validate().then((res) => {
		emit('submit', formModel.value);
	});
};

const pickerConfirm = (val) => {
	formModel.value[currentComponent.value.field] = val.value[0];
};

const handleSelect = (component) => {
	if (component.config.disable) {
		return;
	}
	currentComponent.value = component;
	pickerColumns.value = [component.config.options];
	picker.value.open();
};
</script>

<style lang="scss">
.number-box {
	width: 100%;
}
</style>
