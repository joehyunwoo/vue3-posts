<template>
  <AppLoading v-if="loading"></AppLoading>
  <AppError v-else-if="error" :message="error.message"></AppError>
  <div v-else>
    <h2>게시글 수정</h2>
    <hr class="my-4" />
    <AppError v-if="editError" :message="editError.message"></AppError>
    <PostForm
      @submit.prevent="edit"
      v-model:title="post.title"
      v-model:content="post.content"
    >
      <template #actions>
        <button
          type="button"
          class="btn btn-outline-danger"
          @click="goDetailPage"
        >
          취소
        </button>
        <button class="btn btn-primary" :disabled="editLoading">
          <template v-if="editLoading">
            <span
              class="spinner-grow spinner-grow-sm"
              aria-hidden="true"
            ></span>
            <span class="visually-hidden" role="status">Loading...</span>
          </template>
          <template v-else>수정</template>
        </button>
      </template>
    </PostForm>
  </div>
</template>

<script setup>
import PostForm from '@/components/posts/PostForm.vue';
import { useRoute, useRouter } from 'vue-router';
import { useAlert } from '@/composables/alert';
import { useAxios } from '@/composables/axios';

const router = useRouter();
const route = useRoute();
const id = route.params.id;
const { vAlert, vSuccess } = useAlert();
const { data: post, error, loading } = useAxios(`/posts/${id}`);
const {
  loading: editLoading,
  error: editError,
  excute,
} = useAxios(
  `posts/${id}`,
  { method: 'patch' },
  {
    immediate: false,
    onSuccess: () => {
      vSuccess('수정이 완료되었습니다!');
      router.push({ name: 'PostDetail', params: id });
    },
    onError: err => {
      vAlert(err.message);
    },
  },
);

const edit = () => {
  excute({
    ...post.value,
  });
};

const goDetailPage = () =>
  router.push({
    name: 'PostDetail',
    params: {
      id,
    },
  });
</script>

<style lang="scss" scoped></style>
