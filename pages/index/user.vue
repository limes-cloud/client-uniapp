<template>
	<view>
		<uv-no-network></uv-no-network>
		<uv-navbar placeholder bgColor="#3792f9" leftIcon title="个人中心" :titleStyle="{ color: '#fff' }"></uv-navbar>
		<view class="header">
			<uv-avatar :size="80" :src="logo"></uv-avatar>
			<text class="username">{{ useUser.name }}</text>
		</view>
		<view class="content">
			<uv-cell-group :border="false">
				<uv-cell icon="phone" title="手机" :value="useUser.phone"></uv-cell>
				<uv-cell icon="email" title="邮箱" :value="useUser.email"></uv-cell>
			</uv-cell-group>
		</view>
	</view>
</template>

<script setup>
import logo from '@/static/logo.png';
import { useUserStore } from '@/library/store/user';
const useUser = useUserStore();
console.log('aa');
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
	background: #3792f9;
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
