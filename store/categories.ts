import { defineStore } from 'pinia'
import { ICategory } from "~/types/category";

export const useCategoriesStore = defineStore('categories', () => {
  const category = ref<ICategory[]>([]);
  const selectedCategory = ref<ICategory | undefined>();

  const selectedCategoryPaths = computed<string[] | undefined>(() => {
    if (!selectedCategory.value) return;
    const parts: string[] = selectedCategory.value?.path.split('/');
    let partsOfPath: string[] = [];
    let current: string = '';

    for (let i = 0; i < parts.length; i++) {
      current += (i > 0 ? '/' : '') + parts[i];
      partsOfPath.push(current);
    }
    return partsOfPath;
  })


  function mainCategories() {
    return category.value.filter((str: ICategory) => !str.path.includes('/'))
  }

  const underCategories = (_category: string): ICategory[] => {
    return category.value.filter((str: ICategory) => {
      const searchPattern = `${_category}/`
      return str.path.startsWith(searchPattern) && !str.path.slice(searchPattern.length).includes('/')
    })
  }

  const crumbsSelectedCategory = computed<string[] | undefined>((): any => {
    if (!selectedCategoryPaths.value) return;

    return selectedCategoryPaths.value.map(path => findObjectByPath(category.value, path));
  })

  function findObjectByPath(objects: ICategory[], path: string):ICategory | null {
    return objects.find(obj => obj.path === path) || null;
  }

  function findMainCategory(categories:any) {
    return categories.reduce((prev:any, current:any) => {
      if (current.path.length > prev.path.length) {
        return current;
      } else {
        return prev;
      }
    });
  }

  return { category, mainCategories, underCategories, selectedCategory, crumbsSelectedCategory, findMainCategory }
})