<template>
  <div class="cart">
    <div ref="stickyBlock" class="cart-inner" :style="{height: dynamicHeight}">
      <CartHeader/>
      <CartItemList/>
    </div>
  </div>
</template>
<script setup lang="ts">
import CartItemList from "~/components/cart/cart items/CartItemList.vue";
import { onMounted, onUnmounted, ref } from "vue";
import CartHeader from "~/components/cart/cart header/CartHeader.vue";

const stickyBlock = ref<HTMLElement | null>(null);

const dynamicHeight = ref('');

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

function handleScroll(): void{
  dynamicHeight.value = `calc(100vh - ${stickyBlock.value ? +stickyBlock.value.getBoundingClientRect().top : 0}px`;
}
</script>
<style scoped lang="scss">
.cart {
  position: relative;
  &-inner{
    position: sticky;
    top: 20px;
    height: calc(100vh - 20px);
    overflow-y: scroll;
    padding-right: 2px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
}
</style>
