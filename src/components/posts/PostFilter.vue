<template>
  <form @submit.prevent>
    <div class="row g-3">
      <div class="col">
        <input
          :value="searchTitle"
          @input="$emit('update:searchTitle', $event.target.value)"
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
          <option value="3">3개씩 보기</option>
          <option value="6">6개씩 보기</option>
          <option value="9">9개씩 보기</option>
        </select>
      </div>
    </div>
  </form>
</template>

<script setup>
defineProps({
  searchTitle: {
    type: String,
  },
  viewLimit: {
    type: Number,
  },
});
defineEmits(['update:searchTitle', 'update:viewLimit']);
</script>

<style lang="scss" scoped></style>
