<template>
	<view>
		<web-view :src="src"></web-view>
	</view>
</template>

<script setup>
defineProps({ src: String });
</script>

<style></style>
