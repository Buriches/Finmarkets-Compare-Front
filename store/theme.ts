import { defineStore } from 'pinia';

export const useThemeStore = defineStore('theme', () => {
  const hideCart = ref<boolean>(false);
  function toggleHideCart(){
    hideCart.value = !hideCart.value;
  }
  return  { hideCart, toggleHideCart }
})
