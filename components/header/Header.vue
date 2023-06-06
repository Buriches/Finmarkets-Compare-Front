<template>
  <header>
    <div class="wrap">
      <div class="header">
        <div class="header-icon">
          <div class="header-icon-wrap">
            <NuxtLink to="/"><img src="../../static/icon-header.png" alt="logo" @click=""></NuxtLink>
          </div>
        </div>
        <Categories/>
        <Search/>
        <RightSide/>
        <div class="header-right-side"></div>
      </div>
    </div>
  </header>
</template>
<script lang="ts" setup>

import Search from "~/components/header/search/Search.vue";
import Categories from "~/components/header/categories/Categories.vue";
import RightSide from "~/components/header/right-side/RightSide.vue";
</script>
<style lang="scss" scoped>
@import "@/assets/styles/variables";
header{
  background: rgba(255, 255, 255, 0.97);
}
.header{
  width: 100%;
  display: flex;
  padding: 20px 0;
  align-items: center;
  justify-content: space-between;
  height: 80px;
  &-icon{
    overflow: hidden;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    &-wrap{
      width: 86px;
      height: 86px;
      border-radius: 50%;
      background-color: $COLOR_PRIMARY;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }
  }
}
</style>
