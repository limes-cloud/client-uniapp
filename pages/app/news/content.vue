<template>
	<uv-navbar autoBack border placeholder :title="title"></uv-navbar>
	<view class="content" v-if="data">
		<view class="title">{{ data.title }}</view>
		<view class="desc">
			<view class="tag" v-if="data.is_top">
				<uv-tags
					type="success"
					plain
					plainFill
					borderColor="#ecf5ff"
					icon="pushpin-fill"
					text="置顶"
					size="small"
				></uv-tags>
			</view>
			<view class="tag">
				<uv-tags
					plain
					plainFill
					borderColor="#ecf5ff"
					icon="tags-fill"
					:text="data.classify.name"
					size="small"
				></uv-tags>
			</view>
			<view class="text">
				<text class="unit">{{ data.unit }}</text>
				<text class="time">{{ $ft(data.created_at) }}</text>
			</view>
		</view>
		<view class="u-content">
			<uv-parse :content="data.content"></uv-parse>
		</view>

		<view class="read-view">
			<view class="text">浏览{{ data.read }}次</view>
			<view class="text">
				<uv-icon
					:label="data.comments ? data.comments.length : 0"
					label-color="#999"
					size="16"
					label-size="12"
					name="chat"
				></uv-icon>
			</view>
		</view>
		<view class="comment" v-if="data.comments && data.comments.length !== 0">
			<view
				v-for="(comment, ind) in data.comments"
				:key="comment.id"
				class="comment-item"
				@longpress="showDeleteComment(comment)"
			>
				<view v-if="!comment.reply">
					<text class="name" @click="showUserinfo(comment.from.id)">{{ username(comment.from) }}</text>
					:
					<text @click.stop="replay(comment.from)">{{ comment.text }}</text>
				</view>
				<view v-else>
					<text class="name" @click="showUserinfo(comment.from.id)">{{ username(comment.from) }}</text>
					<text class="reply-text">回复</text>
					<text class="name" @click="showUserinfo(comment.reply.id)">{{ username(comment.reply) }}</text>
					:
					<text @click.stop="replay(comment.from)">{{ comment.text }}</text>
				</view>
			</view>
		</view>
		<view class="reply form">
			<view class="input">
				<uv-input
					v-model="commentText"
					:focus="inputFocus"
					:autoBlur="true"
					:placeholder="placeText"
					:clearable="true"
					:customStyle="{ height: '36rpx' }"
					@blur="cancelInput"
				/>
			</view>
			<uv-button :disabled="!commentText.trim()" type="primary" size="small" @click="comment">评论</uv-button>
		</view>
	</view>
	<uv-action-sheet
		ref="deleteSheetRef"
		cancelText="取消"
		title="是否确认删除此评论"
		@select="deleteComment"
		:actions="[
			{
				name: '删除',
				color: 'red',
				subText: '你即将删除此评论'
			}
		]"
	></uv-action-sheet>
	<uv-toast ref="toast"></uv-toast>
	<uv-no-network></uv-no-network>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { getNewsContent, addNewsComment, deleteNewsComment } from '@/common/api/news.js';
import { useUserStore } from '@/library/store/user';

const deleteSheetRef = ref();
const toast = ref();
const params = defineProps({ id: String });
const title = ref('文章详情');
const data = ref();
const commentText = ref('');
const placeText = ref('说点什么吧');
const replyUser = ref({});
const userStore = useUserStore();
const curCmtId = ref(0);
const inputFocus = ref();

getNewsContent(params).then((res) => {
	toast.value.loading();
	data.value = res;
	title.value = res.title;
	toast.value.hide();
});

const replay = (reply) => {
	replyUser.value = reply;
	placeText.value = '回复' + reply.nick_name;
	inputFocus.value = true;
};

const showDeleteComment = (comment) => {
	if (comment.from.id != userStore.id) {
		return;
	}
	curCmtId.value = comment.id;
	deleteSheetRef.value.open();
};
const showUserinfo = () => {};

const comment = async () => {
	if (!commentText.value.trim()) {
		toast.value.error('评论内容不能为空');
	}
	const params = {
		content_id: data.value.id,
		reply_uid: replyUser.value.id,
		text: commentText.value
	};
	await addNewsComment(params);
	params.from = { nick_name: userStore.nick_name };
	if (replyUser.value.id) {
		params.reply = { nick_name: replyUser.value.nick_name };
	}
	data.value.comments.push(params);
	commentText.value = '';
	placeText.value = '说点什么吧';
	replyUser.value = {};
	toast.value.success('发布成功');
};

const username = (info) => {
	if (info) {
		return info.nick_name;
	}
	return '已注销用户';
};

const deleteComment = async () => {
	await deleteNewsComment({ id: curCmtId.value });

	data.value.comments.forEach((item, index) => {
		if (item.id === curCmtId.value) {
			data.value.comments.splice(index, 1);
		}
	});
	toast.value.success('删除成功');
};

const cancelInput = () => {
	inputFocus.value = false;
	placeText.value = '说点什么吧';
	replyUser.value = {};
};
</script>

<style lang="scss" scoped>
.content {
	.title {
		font-weight: 600;
		margin-bottom: 20rpx;
	}
	.desc {
		display: flex;
		width: 100%;
		flex-direction: row;
		.tag {
			margin-right: 10rpx;
		}
		.text {
			color: #929292;
			.unit {
				margin-right: 10rpx;
			}
		}
		margin-bottom: 30rpx;
	}
	.u-content {
		margin-bottom: 40rpx;
	}

	.footer-unit {
		font-size: 24rpx;
		border-radius: 4rpx;
		margin-right: 10rpx;
		padding: 10rpx 8rpx 5rpx 8rpx;
		background-color: #f2f2f2;
		display: inline-block;
		.text {
			max-width: 200rpx;
		}
	}

	.read-view {
		font-size: $font-xs;
		margin-top: 20rpx;
		display: flex;
		justify-content: space-between;
		.text,
		text {
			color: #999;
		}
	}

	.comment {
		border-top: 1px solid #f6f6f6;
		margin-top: 20rpx;
		padding-top: 20rpx;
		font-size: $font-xs;
		.comment-item {
			margin-bottom: 10rpx;
			.reply-text {
				margin-left: 10rpx;
				margin-right: 10rpx;
			}
			.name {
				color: #3c9cff;
			}
		}
	}

	.reply {
		margin-top: 20rpx;
		display: flex;
		flex-direction: row;
		align-items: center;

		.input {
			flex: 1;
			margin-right: 20rpx;
			.input-placeholder {
				font-size: $font-sm;
			}
		}
	}
}
</style>
