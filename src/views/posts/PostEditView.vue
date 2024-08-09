<template>
  <div>
    <h2>게시글 수정</h2>
    <hr class="my-4" />
    <PostForm
      @submit.prevent="update"
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
        <button class="btn btn-primary">수정</button>
      </template>
    </PostForm>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import PostForm from '@/components/posts/PostForm.vue';
import { useRoute, useRouter } from 'vue-router';
import { getPostById, updatePost } from '@/api/posts';
import { useAlert } from '@/composables/alert';

const router = useRouter();
const route = useRoute();
const id = route.params.id;
const post = ref({});
const { vAlert, vSuccess } = useAlert();

const goDetailPage = () =>
  router.push({
    name: 'PostDetail',
    params: {
      id,
    },
  });

const fetchPost = async () => {
  try {
    ({ data: post.value } = await getPostById(id));
  } catch (err) {
    console.log(err);
    vAlert('네트워크오류');
  }
};
fetchPost();

const update = async () => {
  try {
    await updatePost(id, post.value);
    vSuccess('수정이 완료되었습니다!');
    router.push({ name: 'PostDetail', params: id });
  } catch (err) {
    console.log(err);
    vAlert('수정오류');
  }
};
</script>

<style lang="scss" scoped></style>
