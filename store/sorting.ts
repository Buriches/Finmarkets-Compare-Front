import { defineStore } from 'pinia'

export const useSortingStore = defineStore('sorting', () => {
  const sorting = ref<'price-up' | 'price-down' | undefined>(undefined);

  function changeSorting(): void {
    switch (sorting.value) {
      case 'price-up':
        sorting.value = 'price-down';
        break;
      case 'price-down':
        sorting.value = undefined;
        break;
      case undefined:
        sorting.value = 'price-up';
        break;
    }
  }
  return { sorting, changeSorting }
})