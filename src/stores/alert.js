import { defineStore } from 'pinia';

export const useAlertStore = defineStore('alert', {
  state: () => ({
    alerts: [],
  }),
  actions: {
    //alert
    vAlert(alertMsg, alertType = 'error') {
      this.alerts.push({ alertMsg, alertType });
      setTimeout(() => {
        this.alerts.shift();
      }, 3000);
    },
    vSuccess(alertMsg) {
      this.vAlert(alertMsg, 'success');
    },
  },
});
