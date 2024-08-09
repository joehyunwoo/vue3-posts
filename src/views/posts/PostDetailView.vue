<template>
  <div>
    <h2>{{ post.title }}</h2>
    <p>{{ post.content }}</p>
    <p class="text-muted">
      {{ formattedDateTime(post.createdAt) }}
    </p>
    <hr class="my-4" />
    <div class="row g-2">
      <div class="col-auto">
        <button class="btn btn-outline-dark">이전글</button>
      </div>
      <div class="col-auto">
        <button class="btn btn-outline-dark">다음글</button>
      </div>
      <div class="col-auto me-auto"></div>
      <div class="col-auto">
        <button class="btn btn-outline-dark" @click="goListPage">목록</button>
      </div>
      <div class="col-auto">
        <button class="btn btn-outline-primary" @click="goEditPage">
          수정
        </button>
      </div>
      <div class="col-auto">
        <button class="btn btn-outline-danger" @click="remove">삭제</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { getPostById, deletePost } from '@/api/posts';
import { ref } from 'vue';
import { useFormattedDateTime } from '@/composables/formattedDateTime';

const formattedDateTime = useFormattedDateTime();
const props = defineProps({
  id: String,
});

const router = useRouter();
const id = props.id;
const post = ref({});

const goListPage = () =>
  router.push({
    name: 'PostList',
  });

const goEditPage = () =>
  router.push({
    name: 'PostEdit',
    params: {
      id,
    },
  });

const fetchPost = async () => {
  try {
    ({ data: post.value } = await getPostById(id));
  } catch (err) {
    console.log(err);
  }
};
fetchPost();

const remove = async () => {
  try {
    if (confirm('삭제 하시겠습니까?') === false) {
      return;
    }
    await deletePost(id);
    router.push({ name: 'PostList' });
  } catch (err) {
    console.log(err);
  }
};
</script>

<style lang="scss" scoped></style>
