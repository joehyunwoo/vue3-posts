import { ref } from 'vue';
const alerts = ref([]);
export function useAlert() {
  //alert
  const vAlert = (alertMsg, alertType = 'error') => {
    alerts.value.push({ alertMsg, alertType });
    setTimeout(() => {
      alerts.value.shift();
    }, 3000);
  };
  const vSuccess = alertMsg => {
    vAlert(alertMsg, 'success');
  };

  return {
    alerts,
    vAlert,
    vSuccess,
  };
}
