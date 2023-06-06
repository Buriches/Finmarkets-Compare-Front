<template>
  <div class="cart-item-list">
    <CartItem v-for="item in useCartStore().getAllCartItems()" :data="item" :key="item[1].product.good_id">{{item}}</CartItem>
  </div>
</template>
<script setup lang="ts">
import { useCartStore } from "~/store/cart";
import CartItem from "~/components/cart/cart items/CartItem.vue";
</script>
<style lang="scss" scoped>
.cart-item-list{
  display: flex;
  flex-direction: column;
  row-gap: 10px;
}
</style>