<template>
  <main class="home">
    <div class="wrap">
      <Crumbs/>
      <div class="home-wrap" :style="{gridTemplateColumns: useThemeStore().hideCart ? '1fr' : '1.23fr 1fr'}">
        <MainList/>
        <Cart v-if="!useThemeStore().hideCart"/>
      </div>
    </div>
  </main>
</template>
<script lang="ts" setup>
import MainList from "~/components/main list/MainList.vue";
import {useThemeStore} from "~/store/theme";
</script>
<style scoped lang="scss">
@import "assets/styles/index";

.home{
  &-wrap{
    display: grid;
    column-gap: 20px;
  }
}
</style>
