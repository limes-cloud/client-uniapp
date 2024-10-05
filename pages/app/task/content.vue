<template>
	<view>
		<uv-no-network></uv-no-network>
		<uv-navbar autoBack border placeholder title="任务详情"></uv-navbar>
		<uv-toast ref="toast"></uv-toast>

		<view class="content">
			<template v-if="!loading">
				<template v-if="hasProcess()">
					<view class="title uv-line-1">{{ data.title }}</view>
					<view class="desc">
						<view v-for="(ite, ind) in data.description.split('\n')" :key="ind">{{ ite }}</view>
					</view>
					<me-form
						:id="data.title"
						:files="files"
						:value="formModel"
						:components="components"
						@submit="formSubmit"
					></me-form>
				</template>
				<uv-empty v-else mode="data" style="margin-top: 200rpx" :text="tip"></uv-empty>
			</template>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import { AddTaskValue, GetTaskValue, UpdateTaskValue } from '@/api/partyaffairs/taskValue.js';
import { GetTask } from '@/api/partyaffairs/task';
import { GetFileBySha } from '@/api/system/resource';
import formatUrl from '@/library/global/resource.js';
const toast = ref();
const loading = ref(true);
const tip = ref('');
const components = ref([]);
const props = defineProps({ id: String });
const data = ref();
const formModel = ref({});
const isWrite = ref(false);
const files = ref({});

const fetchData = async () => {
	const data = await GetTaskValue({ taskId: props.id });
	if (data && data.value) {
		formModel.value = JSON.parse(data.value);
		isWrite.value = true;
	}
	files.value = await handleFiles(components.value, formModel.value);
};

GetTask({ id: props.id }).then((res) => {
	data.value = res;
	const config = JSON.parse(res.config);
	components.value = config;
	fetchData();
});

const handleFiles = async (components, formValue) => {
	const fileset = {};
	const taskArr = [];
	for (let i in components) {
		const item = components[i];
		if (item.type === 'upload' && formValue[item.field]) {
			try {
				const data = await GetFileBySha(formValue[item.field]);
				fileset[item.field] = [
					{
						name: data.name,
						url: data.url,
						sha: data.sha
					}
				];
			} catch (e) {
				toast.value.error('文件资源丢失，请重新上传');
			}
		}
	}

	files.value = fileset;
	loading.value = false;
};

const hasProcess = () => {
	const nt = new Date().getTime() / 1000;
	const is = nt > data.value.start && nt < data.value.end;
	if (!is) {
		tip.value = '请在任务规定时间内进行填写';
		return false;
	}
	if (isWrite.value && !data.value.isUpdate) {
		tip.value = '您已完成此任务，请勿重复填写';
		return false;
	}
	return true;
};

const formSubmit = async (value) => {
	const params = {
		taskId: Number(props.id),
		value: JSON.stringify(value)
	};
	if (isWrite.value) {
		await UpdateTaskValue(params);
	} else {
		await AddTaskValue(params);
	}
	toast.value.success('提交成功');
};
</script>

<style lang="scss" scoped>
.title {
	padding-top: 20rpx;
	margin-bottom: 20rpx;
	font-weight: 600;
}

.desc {
	color: #909399;
	margin-bottom: 30rpx;
}
</style>
