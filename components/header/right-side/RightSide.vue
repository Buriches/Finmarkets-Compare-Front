<template>
<div class="right-side">
  <div class="right-side-about"><NuxtLink to="/about">About us</NuxtLink></div>
  <div class="right-side-user">
    <Icon name="ri:user-line" color="#292d32" size="20"/>
    <span class="right-side-user-name"><span class="right-side-user-name-button">Login</span> / <span class="right-side-user-name-button">Register</span></span>
  </div>
  <div class="right-side-cart">
    <Icon name="ci:shopping-cart-02" color="#292d32" size="20" @click="useThemeStore().toggleHideCart()"/>
  </div>
</div>
</template>

<script setup lang="ts">
import { useThemeStore } from "~/store/theme";
</script>

<style scoped lang="scss">
@import "assets/styles/variables";
.right-side{
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 60px;
  user-select: none;
  &-about{
    & a{
      color: $COLOR_TEXT_PRIMARY;
      font-weight: 400;
      font-size: 18px;
      line-height: 22px;
      &:hover{
        color: $COLOR_HOVER;
      }
    }
  }
  &-user{
    display: flex;
    align-items: center;
    column-gap: 4px;
    &-name{
      color: $COLOR_TEXT_PRIMARY;
      font-weight: 500;
      font-size: 14px;
      line-height: 17px;
      text-align: center;
      &-button{
        transition-duration: .3s;
        cursor: pointer;
        &:hover{
          color: $COLOR_HOVER;

        }
      }
    }
  }
  &-cart{
    display: flex;
    column-gap: 8px;
    color: $COLOR_TEXT_PRIMARY;
    align-items: center;
    cursor: pointer;
  }
}
</style>