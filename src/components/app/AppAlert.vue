<template>
  <div class="app-alert">
    <TransitionGroup name="slide">
      <div
        v-for="({ alertMsg, alertType }, index) in alerts"
        :key="index"
        class="alert"
        :class="typeStyle(alertType)"
        role="alert"
      >
        {{ alertMsg }}
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup>
import { useAlert } from '@/composables/alert';

const { alerts } = useAlert();
const typeStyle = alertType =>
  alertType === 'success' ? 'alert-primary' : 'alert-danger';
</script>

<style scoped>
.app-alert {
  position: fixed;
  top: 9px;
  right: 9px;
}
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s ease;
}
.slide-enter-to,
.slide-leave-from {
  opacity: 1;
  transform: translateY(0px);
}
</style>
