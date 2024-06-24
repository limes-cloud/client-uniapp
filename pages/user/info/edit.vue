<template>
	<view>
		<uv-toast ref="toast"></uv-toast>
		<uv-no-network></uv-no-network>
		<uv-navbar placeholder title="个人中心" auto-back></uv-navbar>
		<uv-cell-group :border="false" style="margin-top: 30rpx">
			<uv-cell
				:title="form.realName ? form.realName : '匿名用户'"
				:label="form.nickName ? form.nickName : '这家伙很懒,什么都没留下'"
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
						></me-upload>
					</view>
				</template>
			</uv-cell>
		</uv-cell-group>
		<uv-gap height="15" bgColor="#f2f2f2"></uv-gap>
		<view class="form-content">
			<uv-form labelPosition="left" :model="form" :rules="rules" ref="formRef">
				<!-- <uv-form-item label="姓名" prop="name" borderBottom>
					<uv-input v-model="form.realName" border="none"></uv-input>
				</uv-form-item> -->
				<uv-form-item label="昵称" prop="nickname" borderBottom>
					<uv-input v-model="form.nickName" border="none"></uv-input>
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

		<uv-picker ref="genderPickerRef" :columns="[genderList]" key-name="label" @confirm="chooseGender"></uv-picker>
	</view>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useUserStore } from '@/library/store/user';
import { UpdateCurrentUser } from '@/common/api/system/usercenter';

const gender = {
	U: '未知',
	M: '男',
	F: '女'
};

const genderList = [
	{ value: 'M', label: '男' },
	{ value: 'F', label: '女' },
	{ value: 'U', label: '未知' }
];

const toast = ref();
const formRef = ref();
const rules = ref([]);
const genderPickerRef = ref();
const userStore = useUserStore();
const form = reactive({
	realName: userStore.realName,
	nickName: userStore.nickName,
	gender: userStore.gender,
	genderName: gender[userStore.gender],
	avatar: userStore.avatar
});

const submit = async () => {
	await UpdateCurrentUser(form);
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
	if (userStore.avatarUrl) {
		res.push({
			url: uni.$global.$rurl(userStore.avatarUrl, 120, 120),
			sha: userStore.avatar
		});
	}
	console.log(res);
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