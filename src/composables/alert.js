import { useAlertStore } from '@/stores/alert';
import { storeToRefs } from 'pinia';

export function useAlert() {
  const store = useAlertStore();
  const { alerts } = storeToRefs(store);
  const { vAlert, vSuccess } = store;

  return {
    alerts,
    vAlert,
    vSuccess,
  };
}
