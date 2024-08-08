<template>
  <nav class="mt-5" aria-label="Page navigation example">
    <ul class="pagination justify-content-center">
      <li class="page-item">
        <a
          class="page-link"
          :class="isPrevPage"
          href="#"
          aria-label="Previous"
          @click="$emit('page', currentPage - 1)"
        >
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li v-for="page in pageCnt" :key="page" class="page-item">
        <a
          class="page-link"
          :class="{ active: currentPage === page }"
          href="#"
          @click="$emit('page', page)"
          >{{ page }}</a
        >
      </li>
      <li class="page-item">
        <a
          class="page-link"
          :class="isNextPage"
          href="#"
          aria-label="Next"
          @click="$emit('page', currentPage + 1)"
        >
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  currentPage: {
    type: Number,
    required: true,
  },
  pageCnt: {
    type: Number,
    required: true,
  },
});
defineEmits(['page']);

const isPrevPage = computed(() => ({ disabled: props.currentPage === 1 }));
const isNextPage = computed(() => ({
  disabled: props.currentPage === props.pageCnt,
}));
</script>

<style lang="scss" scoped></style>
