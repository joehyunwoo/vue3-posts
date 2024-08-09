<template>
  <AppModal v-model:show="show" title="게시글">
    <template #actions>
      <button
        type="button"
        class="btn btn-secondary"
        data-bs-dismiss="modal"
        @click="closeModal"
      >
        닫기
      </button>
    </template>
    <template #default>
      <div class="row g-3">
        <div class="col-3 text-muted">제목</div>
        <div class="col-9">{{ modalPostTitle }}</div>
        <div class="col-3 text-muted">내용</div>
        <div class="col-9">{{ modalPostContent }}</div>
        <div class="col-3 text-muted">등록일</div>
        <div class="col-9">{{ formattedDateTime(modalPostCreatedAt) }}</div>
      </div>
    </template>
  </AppModal>
</template>

<script setup>
import { computed } from 'vue';
import { useFormattedDateTime } from '@/composables/formattedDateTime';

const formattedDateTime = useFormattedDateTime();

const props = defineProps({
  show: Boolean,
  modalPostTitle: String,
  modalPostContent: String,
  modalPostCreatedAt: [String, Number],
});
const emits = defineEmits(['update:show']);

const closeModal = () => {
  show.value = false;
};

const show = computed({
  get() {
    return props.show;
  },
  set(value) {
    emits('update:show', value);
  },
});
</script>

<style lang="scss" scoped></style>
