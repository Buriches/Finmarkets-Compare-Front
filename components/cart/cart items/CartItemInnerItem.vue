<template>
  <div class="cart-item-inner-market">
    <div class="cart-item-inner-market-image">
      <img :src="imgUrl()" :alt="props.market.name">
    </div>
    <div class="cart-item-inner-market-price" v-if="unitPrice.price">{{unitPrice.price}} <span>/1{{unitPrice.unit}}</span></div>
    <div class="cart-item-inner-market-price" v-if="referencePrice.price">{{referencePrice.price}}<span>/1{{referencePrice.unit}}</span></div>
    <div
      v-if="!referencePrice.price"
      class="cart-item-inner-market-price-error"
      @click="useCategoriesStore().selectedCategory = mainCategory"
    >
      Not available
    </div>
  </div>
</template>

<script setup lang="ts">
import {useMarketsStore} from "~/store/markets";
import markets from '~/static/markets/'
import {useCategoriesStore} from "~/store/categories";

const props = defineProps({
  market: { required: true },
  product: { required: true }
})

const unitPrice = computed(() => {
  const item = (props.product?.prices.find((item: any) => item.name === props.market.name));
  return { price: item?.price, unit: item?.price_unit};
})



const referencePrice = computed(() => {
  const item = (props.product?.prices.find((item: any) => item.name === props.market.name));
  return { price: item?.price_compare, unit: item?.compare_unit};
})

const mainCategory = useCategoriesStore().findMainCategory(props.product.categories)

function imgUrl () {
  return new URL(`/static/markets/${props.market.name}.png`, import.meta.url).href
}



</script>

<style scoped lang="scss">
@import "@/assets/styles/variables";
.cart-item-inner-market{
  display: flex;
  align-items: center;
  width: calc((100% - 21px) / 2);
  height: calc(100% / 4);
  &-price{
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    color: #000000;
    width: 33%;
    &-error{
      width: 100%;
      text-align: center;
      font-weight: 500;
      font-size: 14px;
      line-height: 17px;
      color: $COLOR_PINK;
      cursor: pointer;
    }
    & span{
      font-weight: 400;
      font-size: 10px;
      line-height: 11px;
      color: #515050;
      text-transform: lowercase;
    }
  }
  &-image{
    height: 100%;
    display: flex;
    align-items: center;
    width: 33%;
    & img{
      object-fit: contain;
      max-height: 45px;
      max-width: 56px;
    }
  }
}
</style>