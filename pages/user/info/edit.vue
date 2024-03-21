<template>
	<view>
		<uv-toast ref="toast"></uv-toast>
		<uv-no-network></uv-no-network>
		<uv-navbar placeholder title="个人中心" auto-back></uv-navbar>
		<uv-cell-group :border="false" style="margin-top: 30rpx">
			<uv-cell
				:title="form.real_name ? form.real_name : '匿名用户'"
				:label="form.nick_name ? form.nick_name : '这家伙很懒,什么都没留下'"
				:border="false"
			>
				<template v-slot:value>
					<view>
						<me-upload
							:fileList="files()"
							width="60"
							height="60"
							:maxCount="1"
							accept="image"
							@change="uploadSuccess"
							path="user/logo"
							app="UserCenter"
						></me-upload>
					</view>
				</template>
			</uv-cell>
		</uv-cell-group>
		<uv-gap height="15" bgColor="#f2f2f2"></uv-gap>
		<view class="form-content">
			<uv-form labelPosition="left" :model="form" :rules="rules" ref="formRef">
				<uv-form-item label="姓名" prop="name" borderBottom>
					<uv-input v-model="form.real_name" border="none"></uv-input>
				</uv-form-item>
				<uv-form-item label="昵称" prop="nickname" borderBottom>
					<uv-input v-model="form.nick_name" border="none"></uv-input>
				</uv-form-item>
				<uv-form-item label="性别" prop="gender" borderBottom @click="showGenderPicker">
					<uv-input
						v-model="form.genderName"
						disabled
						disabledColor="#ffffff"
						placeholder="请选择性别"
						border="none"
					></uv-input>
					<template v-slot:right>
						<uv-icon name="arrow-right"></uv-icon>
					</template>
				</uv-form-item>
				<uv-button type="primary" text="保存" customStyle="margin-top: 10px" @click="submit"></uv-button>
			</uv-form>
		</view>

		<uv-picker ref="genderPickerRef" :columns="[gender.list]" key-name="label" @confirm="chooseGender"></uv-picker>
	</view>
</template>

<script setup>
import { reactive, ref } from 'vue';
import logo from '@/static/logo.png';
import { useUserStore } from '@/library/store/user';
import formatUrl from '@/library/global/resource.js';
import { getGenderDictValue } from '@/common/api/system/manager.js';
import { updateCurrentUser } from '@/common/api/system/user.js';

const toast = ref();
const formRef = ref();
const rules = ref([]);
const genderPickerRef = ref();
const userStore = useUserStore();
const gender = reactive({ dict: {}, list: [] });
const form = reactive({
	real_name: userStore.real_name,
	nick_name: userStore.nick_name,
	gender: userStore.gender,
	genderName: '',
	avatar: userStore.avatar
});

getGenderDictValue().then((res) => {
	gender.dict = res.dict;
	gender.list = res.list;
	form.genderName = res.dict[form.gender];
});

const submit = async () => {
	await updateCurrentUser(form);
	toast.value.success('保存成功');
	await userStore.userinfo();
};

const showGenderPicker = () => {
	genderPickerRef.value.open();
};

const chooseGender = (item) => {
	const res = item.value[0];
	form.gender = res.value;
	form.genderName = res.label;
};

const files = () => {
	const res = [];
	if (userStore.resource) {
		res.push({
			name: userStore.resource.name,
			url: formatUrl(userStore.resource.src),
			sha: userStore.resource.sha
		});
	}
	return res;
};

const uploadSuccess = (files) => {
	if (!(files && files.length)) {
		return;
	}
	form.avatar = files[0].sha;
};
</script>

<style scoped lang="scss">
.header {
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 360rpx;
	overflow: hidden;
	background: #d81e06;
	background-size: cover;
	.username {
		margin-top: 30rpx;
		color: #ffffff;
	}
	&::after {
		z-index: 100;
		position: absolute;
		bottom: -2px;
		left: 0;
		display: block;
		width: 100%;
		height: 200rpx;
		background: url('@/static/wave.gif') no-repeat;
		background-size: 100% 100%;
		mix-blend-mode: screen;
		content: '';
	}
}

.form-content {
	padding: 40rpx;
}
</style>