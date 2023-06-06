<template>
  <div class="categories-list">
    <CategoryItem
      v-for="category in props.categories"
      :key="category.category_id"
      :category="category"
      :parent="category"
      @click.stop="useCategoriesStore().selectedCategory = category"
    />
  </div>

</template>
<script setup lang="ts">
import {PropType} from 'vue';
import CategoryItem from "~/components/header/categories/CategoryItem.vue";
import {ICategory} from "~/types/category";
import { useCategoriesStore } from "~/store/categories";

const props = defineProps({
  categories: {type: Array as PropType<ICategory[]>, required: true}
})
</script>

<style scoped lang="scss">
.categories-list{
  position: relative;
  background-color: #FFFFFF;
}
</style>
