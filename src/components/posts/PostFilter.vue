<template>
  <form @submit.prevent>
    <div class="row g-3">
      <div class="col">
        <input
          :value="searchTitle"
          @input="changeSearchTitle"
          type="text"
          class="form-control"
          placeholder="제목으로 검색해주세요."
        />
      </div>
      <div class="col-3">
        <select
          :value="viewLimit"
          @input="$emit('update:viewLimit', $event.target.value)"
          class="form-select"
        >
          <option value="6">6개씩 보기</option>
          <option value="12">12개씩 보기</option>
          <option value="18">18개씩 보기</option>
        </select>
      </div>
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue';

defineProps({
  searchTitle: {
    type: String,
  },
  viewLimit: {
    type: [Number, String],
  },
});
const emit = defineEmits(['update:searchTitle', 'update:viewLimit']);

const valid = ref(true);
const changeSearchTitle = event => {
  if (valid.value === false) {
    return;
  }
  valid.value = false;
  setTimeout(() => {
    emit('update:searchTitle', event.target.value);
    valid.value = true;
  }, 500);
};
</script>

<style lang="scss" scoped></style>
