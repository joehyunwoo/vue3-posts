<template>
  <AppCard>
    <h5 class="card-title text-truncate">{{ title }}</h5>
    <p class="card-text text-truncate">
      {{ content }}
    </p>
    <p class="text-muted">
      {{ formattedDateTime(createdAt) }}
    </p>
    <template #footer>
      <div class="d-flex flex-row-reverse">
        <button class="btn p-1" @click.stop="$emit('modal')">
          <i class="bi bi-window"></i>
        </button>
        <button class="btn p-1" @click.stop="$emit('preview')">
          <i class="bi bi-clipboard-plus"></i>
        </button>
      </div>
    </template>
  </AppCard>
</template>

<script setup>
import { useFormattedDateTime } from '@/composables/formattedDateTime';

const formattedDateTime = useFormattedDateTime();

defineProps({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: [String, Date, Number],
  },
});
defineEmits(['modal', 'preview']);
</script>

<style lang="scss" scoped></style>
