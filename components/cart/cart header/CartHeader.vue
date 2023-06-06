<template>
  <div class="cart-header">
    <div class="cart-header-total">
      Total:
      <b v-if="useCartStore().getAllCartItems()?.length === 0">0<span>€</span></b>
      <b v-else-if="useMarketsStore().selectedMarket?.market_id === 0">{{ useCartStore().cheapestPrice() }}<span v-if="typeof useCartStore().cheapestPrice() === 'number'">€</span></b>
      <b v-else>{{ useCartStore().selectedPrice() }}<span v-if="typeof useCartStore().selectedPrice() === 'number'">€</span></b>
    </div>
    <div class="cart-header-right">
      <CartHeaderMarket/>
      <Icon
        name="streamline:interface-delete-bin-1-remove-delete-empty-bin-trash-garbage"
        width="18" height="18"
        :color="trashHovered ? '#FF6464' : '#777777'"
        @mouseenter="trashHovered=true"
        @mouseleave="trashHovered=false"
        style="cursor: pointer;"
        @click="useCartStore().clearCart"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import {useCartStore} from "~/store/cart";
import CartHeaderMarket from "~/components/cart/cart header/CartHeaderMarket.vue";
import {useMarketsStore} from "~/store/markets";
const trashHovered = ref<boolean>(false);


</script>
<style lang="scss" scoped>
@import "@/assets/styles/variables";
.cart-header{
  display: flex;
  justify-content: space-between;
  background: #FFFFFF;
  border-radius: 7px;
  align-items: center;
  padding: 0 20px;
  height: 40px;
  gap: 15px;
  flex-shrink: 0;
  &-total{
    font-weight: 400;
    font-size: 15px;
    line-height: 18px;
    color: $COLOR_TEXT_PRIMARY;
    & b{
      font-weight: 500;
      font-size: 15px;
      line-height: 18px;
      color: #000000;
    }
    & span{
      font-weight: 300;
      font-size: 13px;
      line-height: 20px;
      color: #777777;
    }
  }
  &-right{
    display: flex;
    align-items: center;
    column-gap: 25px;
  }
}
</style>