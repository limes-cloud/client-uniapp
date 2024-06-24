<template>
	<view>
		<uv-no-network></uv-no-network>
		<uv-navbar
			placeholder
			bgColor="#3c9cff"
			:auto-back="false"
			left-icon=""
			title="个人中心"
			:titleStyle="{ color: '#fff' }"
		>
			<template v-slot:right>
				<view class="right">
					<uv-icon
						@click="$to('./edit')"
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
			<uv-avatar v-if="userStore.avatarUrl" :size="80" :src="$rurl(userStore.avatarUrl)"></uv-avatar>
			<uv-avatar v-else :size="80" :src="$logo"></uv-avatar>

			<text class="username">{{ userStore.nickName }}</text>
		</view>
		<view class="content">
			<uv-cell-group :border="false">
				<uv-cell icon="woman" title="性别" :value="gender[userStore.gender]"></uv-cell>
				<uv-cell
					icon="account"
					title="账号"
					:value="userStore.username ? userStore.username : '未绑定'"
				></uv-cell>
				<uv-cell icon="phone" title="手机" :value="userStore.phone ? userStore.phone : '未绑定'"></uv-cell>
				<uv-cell icon="email" title="邮箱" :value="userStore.email ? userStore.email : '未绑定'"></uv-cell>
			</uv-cell-group>
		</view>
	</view>
</template>

<script setup>
import { ref, getCurrentInstance } from 'vue';
import { useUserStore } from '@/library/store/user';

const userStore = useUserStore();
const gender = {
	U: '未知',
	M: '男',
	F: '女'
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
