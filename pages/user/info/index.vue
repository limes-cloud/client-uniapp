<template>
	<view>
		<uv-no-network></uv-no-network>
		<uv-navbar placeholder bgColor="#3c9cff" leftIcon="" title="个人中心" :titleStyle="{ color: '#fff' }">
			<template v-slot:right>
				<view class="right">
					<uv-icon
						@click="edit"
						name="edit-pen"
						size="22"
						color="#fff"
						label-color="#fff"
						label="编辑"
					></uv-icon>
				</view>
			</template>
		</uv-navbar>
		<view class="header">
			<uv-avatar v-if="userStore.avatar" :size="80" :src="$rurl(userStore.resource.src)"></uv-avatar>
			<uv-avatar v-else :size="80" :src="logo"></uv-avatar>

			<text class="username">{{ userStore.nick_name }}（{{ userStore.real_name }}）</text>
		</view>
		<view class="content">
			<uv-cell-group :border="false">
				<uv-cell icon="woman" title="性别" :value="gender[userStore.gender]"></uv-cell>
				<!-- <uv-cell
					icon="account"
					title="账号"
					:value="userStore.username ? userStore.username : '未绑定'"
				></uv-cell> -->
				<uv-cell icon="phone" title="手机" :value="userStore.phone ? userStore.phone : '未绑定'"></uv-cell>
				<uv-cell icon="email" title="邮箱" :value="userStore.email ? userStore.email : '未绑定'"></uv-cell>
			</uv-cell-group>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import logo from '@/static/logo.png';
import { useUserStore } from '@/library/store/user';
import { getGenderDictValue } from '@/common/api/system/manager.js';

const userStore = useUserStore();
const gender = ref({});

getGenderDictValue().then((res) => {
	gender.value = res.dict;
});

const edit = () => {
	uni.navigateTo({
		url: './edit'
	});
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
	background: #3c9cff;
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
</style>
