<template>
  <div class="categories" @mouseover="isHovered = true" @mouseleave="isHovered = false">
    <span class="categories-title">Categories</span>
    <Icon name="iconamoon:arrow-up-2-light" :verticalFlip="true" size="24" :color="isHovered ? '#3C7959' :'#2D2D2D'"/>
    <div class="categories-dropdown" v-show="isHovered">
      <CategoryList :categories="categoriesStore.mainCategories()"></CategoryList>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import CategoryList from "~/components/header/categories/CategoryList.vue";
import { useCategoriesStore } from "~/store/categories";

const categoriesStore = useCategoriesStore();

const isHovered = ref<boolean>(false);

onMounted(async () => {
  await fetch('http://localhost:1500/get/getAllCategories')
    .then(response => response.json())
    .then(responseData => {
      categoriesStore.category = responseData;
    })
    .catch(error => {
      console.error(error);
    });
})
</script>

<style scoped lang="scss">
@import "assets/styles/variables";
.categories{
  width: fit-content;
  display: flex;
  column-gap: 7px;
  position: relative;
  align-items: center;
  cursor: pointer;
  transition-duration: .3s;
  padding: 10px 0;

  &-title{
    font-weight: 500;
  }
  & svg{
    & path{
      stroke: $COLOR_TEXT_PRIMARY;
    }
  }
  &:hover{
    & .categories-title{
      color: $COLOR_HOVER;
    }
    & svg{
      & path{
        stroke: $COLOR_HOVER;
      }
    }
  }
  &-dropdown{
    position: absolute;
    top: calc(100%);
    z-index: 3;
    width: fit-content;
    max-width: 380px;
    display: flex;
    flex-direction: column;
    row-gap: 12px;
    cursor: default;
    white-space: nowrap;
    transition-duration: 3s;
    padding: 15px 0;
    border: 1px solid $COLOR_TEXT_PRIMARY;
    border-radius: 5px;
    background-color: #FFFFFF;
    &-item{
      display: flex;
      column-gap: 5px;
      color: $COLOR_TEXT_PRIMARY;
      font-weight: 400;
      font-size: 16px;
      line-height: 20px;
      cursor: pointer;
      position: relative;
      width: 100%;
      &:hover{
        & .categories-window-item-name{
          color: $COLOR_HOVER;
        }

      }
    }
  }
}
</style>
