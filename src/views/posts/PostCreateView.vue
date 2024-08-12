<template>
  <div>
    <h2>게시글 등록</h2>
    <hr class="my-4" />
    <AppError v-if="error" :message="error.message"></AppError>
    <PostForm
      @submit.prevent="save"
      v-model:title="post.title"
      v-model:content="post.content"
    >
      <template #actions>
        <button type="button" class="btn btn-outline-dark" @click="goListPage">
          목록
        </button>
        <button class="btn btn-primary" :disabled="loading">
          <template v-if="loading">
            <span
              class="spinner-grow spinner-grow-sm"
              aria-hidden="true"
            ></span>
            <span class="visually-hidden" role="status">Loading...</span>
          </template>
          <template v-else>저장</template>
        </button>
      </template>
    </PostForm>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAlert } from '@/composables/alert';
import PostForm from '@/components/posts/PostForm.vue';
import { useAxios } from '@/composables/axios';

const router = useRouter();
const post = ref({
  title: null,
  content: null,
});
const { vAlert, vSuccess } = useAlert();

const goListPage = () =>
  router.push({
    name: 'PostList',
  });

const { loading, error, excute } = useAxios(
  '/posts',
  {
    method: 'post',
    data: {
      ...post.value,
      createdAt: Date.now(),
    },
  },
  {
    immediate: false,
    onSuccess: () => {
      vSuccess('저장이 완료되었습니다.');
      router.push({ name: 'PostList' });
    },
    onError: err => {
      vAlert(err.message);
    },
  },
);

const save = async () => {
  excute({
    ...post.value,
    createdAt: Date.now(),
  });
};
</script>

<style lang="scss" scoped></style>
