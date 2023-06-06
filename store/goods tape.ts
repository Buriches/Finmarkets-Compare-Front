import { defineStore } from 'pinia'
import {IProduct} from "~/types/product";
import {useCategoriesStore} from "~/store/categories";
import {ICategory} from "~/types/category";

export const useTapeStore = defineStore('tape', () => {
  const tape = ref<IProduct[]>([]);
  const from = ref<number>(0);
  watch(() => useCategoriesStore().selectedCategory, async (category) => {
    from.value = 0;
    await downloadProducts(category)
  })

  async function downloadProducts(category: ICategory | undefined = undefined){
    if(category === undefined){
      await download24()
      return
    }
    await download24WithCategory(category)
    return
  }
  async function download24(){
    await fetch(`http://localhost:1500/get/get24?from=${from.value}`)
      .then(response => response.json())
      .then(responseData => {
        tape.value = responseData;
      })
      .catch(error => {
        console.error(error);
      });
    from.value += 24;
  }

  async function download24WithCategory(category: ICategory){
    await fetch(`http://localhost:1500/get/get24withCategory?from=${from.value}&category_id=${category.category_id}`)
      .then(response => response.json())
      .then(responseData => {
        tape.value = responseData;
      })
      .catch(error => {
        console.error(error);
      });
    from.value += 24;
  }

  return { tape }
})