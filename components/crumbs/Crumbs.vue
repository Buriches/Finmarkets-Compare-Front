<template>
  <div class="crumbs">
    <span
      @click="useCategoriesStore().selectedCategory = undefined"
    >
      All products
    </span>
    <div
      class="crumbs-path"
      v-for="category in useCategoriesStore().crumbsSelectedCategory"
      @click="crumbClickHandler(category)"
    >
      <Icon name="iconamoon:arrow-up-2-light" size="20" color="#777777" :rotate="1"/>
      <span>{{category?.name}}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useCategoriesStore } from "~/store/categories";
import {ICategory} from "~/types/category";

function crumbClickHandler(category: ICategory):void{
  useCategoriesStore().selectedCategory = category
}
</script>

<style scoped lang="scss">
@import "assets/styles/variables";
.crumbs{
  height: 50px;
  display: flex;
  column-gap: 15px;
  align-items: center;
  &-path{
    display: flex;
    column-gap: 15px;
    &:last-child{
      & span{
        border-bottom: 1px solid rgba(0, 0, 0, 0.4);
        font-weight: 500;
      }
    }
  }
  & span{
    color: #777777;
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    cursor: pointer;

    &:hover{
      color: $COLOR_HOVER;
    }
  }
}
</style>