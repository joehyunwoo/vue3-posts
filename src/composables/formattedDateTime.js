import { inject } from 'vue';
export function useFormattedDateTime() {
  const dayjs = inject('dayjs');
  const formattedDateTime = dateTime =>
    dayjs(dateTime).format('YYYY.MM.DD THH:mm:ss');
  return formattedDateTime;
}
