<template>
  <div>
    <h2>About View</h2>
    <hr />
    <h4>{{ boardSpecMsg }}</h4>
    <button class="btn btn-primary" @click="$router.push('/')">
      Home으로 이동
    </button>
  </div>
</template>

<script setup>
import { ref, inject } from 'vue';
const boardSpecMsg = ref(inject('boardSpec').msg);
</script>

<style lang="scss" scoped></style>
