<template>
  <main class="product">
    <div class="wrap">
      <div class="product-wrap" :style="{gridTemplateColumns: useThemeStore().hideCart ? '1fr' : '1.23fr 1fr'}">
        <div></div>
<!--        <Cart v-if="!useThemeStore().hideCart"/>-->
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import {useThemeStore} from "~/store/theme";
import MainList from "~/components/main list/MainList.vue";

const product = ref();
const route = useRoute();

onMounted(async () => {
  const productPath = route.params.path;
  await fetch(`http://localhost:1500/get/get1ByPath?path=${productPath}`)
    .then(response => response.json())
    .then(responseData => {
      product.value = responseData;
    })
    .catch(error => {
      console.error(error);
    });
})
</script>

<style scoped lang="scss">
@import "assets/styles/index";

.product{
  &-wrap{
    display: grid;
    column-gap: 20px;
    margin-top: 15px;
  }
}
</style>