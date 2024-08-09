<template>
  <div>
    <h2>Home View</h2>
    <hr />
    <h4>{{ boardSpecMsg }}</h4>
    <button class="btn btn-primary" @click="goAboutPage()">
      About으로 이동
    </button>
    <p>route name => {{ $route.name }}</p>
    <p>route path => {{ $route.path }}</p>
  </div>
</template>

<script>
export default {
  created() {
    this.$welcomeMsg.welcome();
  },
};
</script>
<script setup>
import { ref, inject } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const boardSpecMsg = ref(inject('boardSpec').msg);

const goAboutPage = () => {
  router.push({
    name: 'About',
  });
};
</script>

<style lang="scss" scoped></style>
