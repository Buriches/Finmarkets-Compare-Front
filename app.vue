<template>
  <Header/>
  <NuxtPage/>
  <Footer/>
</template>
<script lang="ts" setup>
import { useMarketsStore } from "~/store/markets";
import Footer from "~/components/footer/Footer.vue";
onMounted(async () => {
  await fetch('http://localhost:1500/get/getMarkets')
    .then(res => res.json())
    .then(res => useMarketsStore().markets = res)
})
 </script>
<style lang="scss">
@import "assets/styles/variables";
body{
  margin: 0;
  background-color: #F5F5F5;
  &::-webkit-scrollbar {
    width: 6px;
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: darkgray;
    border-radius: 5px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background-color: $COLOR_PRIMARY;
  }
}
</style>
