<template>
  <div>
    <h2>게시글 등록</h2>
    <hr class="my-4" />
    <PostForm
      @submit.prevent="save"
      v-model:title="post.title"
      v-model:content="post.content"
    >
      <template #actions>
        <button
          type="button"
          class="btn btn-outline-dark me-2"
          @click="goListPage"
        >
          목록
        </button>
        <button class="btn btn-primary">저장</button>
      </template>
    </PostForm>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { createPost } from '@/api/posts';
import { useAlert } from '@/composables/alert';
import PostForm from '@/components/posts/PostForm.vue';

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

const save = () => {
  try {
    createPost({
      ...post.value,
      createdAt: Date.now(),
    });
    vSuccess('저장이 완료되었습니다.');
    router.push({ name: 'PostList' });
  } catch (err) {
    console.log(err);
    vAlert(err.message);
  }
};
</script>

<style lang="scss" scoped></style>
