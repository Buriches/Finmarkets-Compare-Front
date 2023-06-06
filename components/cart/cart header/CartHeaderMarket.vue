<template>
  <div class="cart-header-right-market" @mouseenter="isHovered = true" @mouseleave="isHovered = false">
    <div class="cart-header-right-market-title">{{useMarketsStore().selectedMarket?.market_id === 0 ? 'Recommended' : 'Selected'}}:</div>
    <div class="cart-header-right-market-image">
      <img v-if="useMarketsStore().selectedMarket?.market_id === 0" :src="imgUrl(useCartStore().findCheapestMarket()?.name || '')" :alt="useCartStore().findCheapestMarket()?.name || ''">
      <img v-else :src="imgUrl(useMarketsStore().selectedMarket?.name || '')" :alt="useMarketsStore().selectedMarket?.name || ''">
      <Icon name="iconamoon:arrow-up-2-light" :verticalFlip="true" size="24" :color="isHovered ? '#3C7959' :'#2D2D2D'"/>
      <div class="cart-header-right-market-inner" v-if="isHovered">
        <div v-for="market in markets" @click="useMarketsStore().selectedMarket = market">
         <div class="cart-header-right-market-inner-item">
           <div v-if="market.market_id === 0" class="cart-header-right-market-inner-item-inner"><b>Recommended</b></div>
           <div v-else class="cart-header-right-market-inner-item-inner"><span>{{market.name}}</span><img :src="imgUrl(market.name)" :alt="market.name"></div>
         </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script setup lang="ts">
import {IMarket, useMarketsStore} from "~/store/markets";
import {useCartStore} from "~/store/cart";

const isHovered = ref<boolean>(false);

const recommendation: IMarket = {market_id: 0, name: 'Recommended'}
const markets = computed<IMarket[]>(() => {
  return [recommendation, ...(useMarketsStore()?.markets || [])]
})

onMounted(() => {
  useMarketsStore().selectedMarket = recommendation
})

function imgUrl (name: string) {
  return new URL(`/static/markets/${name}.png`, import.meta.url).href
}

</script>
<style lang="scss" scoped>
@import "assets/styles/variables";
.cart-header-right-market{
  display: flex;
  column-gap: 5px;
  align-items: center;
  color: $COLOR_TEXT_PRIMARY;
  cursor: pointer;
  &:hover{
    color: $COLOR_HOVER;
  }
  &-title{
    font-weight: 400;
    font-size: 15px;
    line-height: 18px;
  }
  &-image{
    position: relative;
    display: flex;
    align-items: center;
    & img{
      max-width: 65px;
      max-height: 25px;
    }
  }
  &-inner{
    position: absolute;
    top: 100%;
    right: 0;
    z-index: 2;
    background-color: white;
    padding: 10px 0;
    row-gap: 5px;
    display: flex;
    flex-direction: column;
    width: 180px;
    border-radius: 0 0 5px 5px;
    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 90%;
      z-index: -1;
      box-shadow: 0 20px 20px 0 rgba(0, 0, 0, 0.2);
    }
    &-item{
      display: flex;
      column-gap: 5px;
      cursor: pointer;
      transition-duration: .3s;
      font-weight: 400;
      font-size: 15px;
      line-height: 18px;
      color: $COLOR_TEXT_PRIMARY;
      align-items: center;
      border-radius: 3px;
      &:hover{
        color: $COLOR_HOVER;
        background-color: #D4D4D4;
      }
      &-inner{
        display: flex;
        justify-content: space-between;
        width: 100%;
        align-items: center;
        height: 35px;
        padding: 0 10px;
        & img{
          max-height: 35px;
          max-width: 70px;
          object-fit: contain;
        }
      }
    }
  }
}
</style>