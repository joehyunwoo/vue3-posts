<template>
  <AppLoading v-if="loading"></AppLoading>
  <AppError v-else-if="error" :message="error.message"></AppError>
  <div v-else>
    <h2>{{ post.title }}</h2>
    <p>{{ post.content }}</p>
    <p class="text-muted">
      {{ formattedDateTime(post.createdAt) }}
    </p>
    <hr class="my-4" />
    <AppError v-if="removeError" :message="removeError.message"></AppError>
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
        <button
          class="btn btn-outline-danger"
          @click="remove"
          :disabled="removeLoading"
        >
          <template v-if="removeLoading">
            <span
              class="spinner-grow spinner-grow-sm"
              aria-hidden="true"
            ></span>
            <span class="visually-hidden" role="status">Loading...</span>
          </template>
          <template v-else>삭제</template>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, toRef } from 'vue';
import { useRouter } from 'vue-router';
import { useAlert } from '@/composables/alert';
import { useFormattedDateTime } from '@/composables/formattedDateTime';
import { useAxios } from '@/composables/axios';

const { vAlert, vSuccess } = useAlert();
const formattedDateTime = useFormattedDateTime();
const props = defineProps({
  id: [String, Number],
});
const router = useRouter();
const id = toRef(props, 'id');
const url = computed(() => `/posts/${id.value}`);
const { data: post, error, loading } = useAxios(url);
const {
  loading: removeLoading,
  error: removeError,
  excute,
} = useAxios(
  `/posts/${id.value}`,
  { method: 'delete' },
  {
    immediate: false,
    onSuccess: () => {
      vSuccess('삭제가 완료되었습니다.');
      router.push({ name: 'PostList' });
    },
    onError: err => {
      vAlert(err.message);
    },
  },
);

const remove = async () => {
  if (confirm('삭제 하시겠습니까?') === false) {
    return;
  }
  excute();
};

const goListPage = () =>
  router.push({
    name: 'PostList',
  });

const goEditPage = () =>
  router.push({
    name: 'PostEdit',
    params: {
      id: id.value,
    },
  });
</script>

<style lang="scss" scoped></style>
