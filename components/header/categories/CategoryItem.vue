<template>
  <div class="categories-item" @mouseover="localHover = true" @mouseleave="localHover = false">
    <span>{{ category.name }}</span>
    <div class="categories-item-children" v-show="localHover && categoriesStore.underCategories(props.category.path).length > 0">
      <CategoryList :categories="categoriesStore.underCategories(props.category.path)"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ICategory } from '~/types/category';
import CategoryList from "~/components/header/categories/CategoryList.vue";
import {useCategoriesStore} from "~/store/categories";
const localHover = ref<boolean>(false);
const props = defineProps<{ category: ICategory}>();

const categoriesStore = useCategoriesStore();
</script>

<style scoped lang="scss">
@import "assets/styles/variables";
.categories-item {
  position: relative;
  padding: 2px 15px;
  cursor: pointer;
  transition-duration: .3s;
  &:hover{
    background-color: #D4D4D4;
    & > span:first-child{
      color: $COLOR_HOVER;
    }
  }
  &-children {
    position: absolute;
    top: 50%;
    left: calc(100% + 1px);
    transform: translate(0, -50%);
    background-color: #ffffff;
    border-width: 1px 1px 1px 0;
    border-style: solid;
    border-color: $COLOR_TEXT_PRIMARY;
    border-radius: 0 5px 5px 0;
    padding: 20px 0;
    transition-duration: 3s;
  }
}
</style>
