<template>
  <div class="cart-item">
    <div class="cart-item-inner" v-if="isShownAllPrices">
      <div class="cart-item-inner-grid">
        <div class="cart-item-inner-grid-arrow">
          <Icon name="cil:arrow-top" width="33" height="20" :rotate="1" :verticalFlip="true" @click="isShownAllPrices = false" :style="{cursor: 'pointer'}"/>
        </div>
        <hr class="cart-item-inner-grid-line">
        <CartItemInnerItem v-for="market in useMarketsStore().markets" :market="market" :key="market.market_id" :product="props.data?.[1].product"/>
      </div>
    </div>
    <div class="cart-item-image">
      <img :src="`https://cdn.s-cloud.fi/v1/w640_q75/product/ean/${props.data?.[1].product.img}_kuva1.jpg`" alt="product image">
    </div>
    <div class="cart-item-content">
      <div class="cart-item-content-header">
        <div class="cart-item-content-header-offer">
          <span>The best offer:</span>
          <img :src="srcOfImage()" alt="image" v-if="bestOffer().length === 1">
          <span v-else-if="bestOffer().length <=3 && bestOffer().length !== 1">{{bestOffer().slice(0, 2).toString()}}</span>
          <span v-else>{{bestOffer().length}} markets</span>
        </div>
        <button class="cart-item-content-header-compare" @click="isShownAllPrices = true">Compare</button>
      </div>
      <div class="cart-item-content-name"><NuxtLink :to="`/product/${props.data?.[1].product.path}`">{{props.data[1].product.name}}</NuxtLink></div>
      <div class="cart-item-content-underside">
        <div class="cart-item-content-underside-count">
          <button class="cart-item-content-underside-count-button" @click="useCartStore().removeFromCart(props.data?.[1].product)">-</button>
          <span class="cart-item-content-underside-count-span">
                {{cartItemCount}}{{props.data[1].product.prices[0].price_unit}}
              </span>
          <button class="cart-item-content-underside-count-button" @click="useCartStore().addToCart(props.data?.[1].product)">+</button>
        </div>
        <div class="cart-item-content-underside-prices">
          <PriceDifference :product="props.data?.[1].product" />
          <span
            class="cart-item-content-underside-prices-total"
            v-if="cartItemCount > 1">
            <span v-if="useMarketsStore().selectedMarket?.market_id === 0">
              {{(minPrice(props.data[1].product) * cartItemCount).toFixed(2)}} - {{(maxPrice(props.data[1].product) * cartItemCount).toFixed(2)}}€
            </span>
            <span v-else-if="!isNaN(selectedStorePrice)">
              {{(selectedStorePrice * cartItemCount).toFixed(2)}}€
            </span>

          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>

import { useCartStore } from "~/store/cart";
import PriceDifference from "~/components/price difference/PriceDifference.vue";
import { getDecimalPart, getIntegerPart, maxPrice, minPrice } from "~/utils";
import { useMarketsStore } from "~/store/markets";
import CartItemInnerItem from "~/components/cart/cart items/CartItemInnerItem.vue";

const props = defineProps({
  data: {
    type: Array,
    required: true
  }
})

const bestOffer = () => useCartStore().bestOffer(props.data[1].product)
const srcOfImage = () => useMarketsStore().marketImage(bestOffer()[0])


const selectedStorePrice = ref<number>(props.data[1].product.prices.find(item => item.market_id === useMarketsStore().selectedMarket?.market_id)?.price);

watch(() => useMarketsStore().selectedMarket, (newValue) => {
  if (newValue?.market_id === 0) {
    selectedStorePrice.value = 0;
    return;
  }
  selectedStorePrice.value = props.data[1].product.prices.find(item => item.market_id === newValue.market_id)?.price;
})

const isShownAllPrices = ref<boolean>(false);

const cartItemCount = ref(useCartStore().getCartItem(props.data[1].product.good_id).metadata.count);
watch(
  () => useCartStore().getCartItem(props.data[1].product.good_id)?.metadata.count,
  (newCount) => {
    cartItemCount.value = newCount
  }
)
</script>
<style lang="scss" scoped>
@import "assets/styles/variables";
.cart-item{
  background: #FFFFFF;
  border-radius: 5px;
  width: 100%;
  padding: 10px;
  display: flex;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.15);
  position: relative;
  overflow: hidden;
  &-inner{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    padding: 10px 20px;
    &-grid{
      display: flex;
      flex-wrap: wrap;
      column-gap: 21px;
      justify-content: space-between;
      height: 100%;
      position: relative;
      &-arrow{
        height: 35px;
        display: flex;
        align-items: center;
      }
      &-line{
        width: 1px;
        height: 100%;
        position: absolute;
        top: 0;
        left: 50%;
        border: 0;
        background-color: rgba(70, 137, 102, 0.3);
      }
    }

  }
  &-image{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 180px;
    width: 200px;
    & img{
      max-width: 100%;
      max-height: 100%;
    }
  }
  &-content{
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px;

    &-header{
      display: flex;
      justify-content: space-between;
      width: 100%;
      &-offer{
        display: flex;
        column-gap: 3px;
        align-items: center;
        & span{
          font-weight: 400;
          font-size: 13px;
          line-height: 18px;
          color: #777777;
        }
        & img{
          height: 14px;
        }
      }
      &-compare{
        background-color: $COLOR_PRIMARY;
        border-radius: 2px;
        padding: 1px 5px;
        border: 0;
        outline: 0;
        font-weight: 400;
        font-size: 13px;
        line-height: 20px;
        color: #FFFFFF;
        transition-duration: .3s;
        cursor: pointer;
        &:hover{
          background-color: $COLOR_HOVER;
        }
      }
    }
    &-name{
      font-weight: 400;
      font-size: 14px;
      line-height: 17px;
      & a{
        color: #181717;
      }
    }
    &-underside{
      display: flex;
      width: 100%;
      justify-content: space-between;
      align-items: flex-end;
      &-count{
        display: flex;
        column-gap: 10px;
        align-items: center;
        width: 110px;
        justify-content: space-between;
        &-button{
          width: 25px;
          height: 25px;
          background-color: $COLOR_PRIMARY;
          border-radius: 2px;
          border: 0;
          outline: none;
          transition-duration: .3s;
          color: #FFFFFF;
          cursor: pointer;
          &:hover{
            background-color: $COLOR_HOVER;
          }
        }
        &-span{
          text-transform: lowercase;
          font-weight: 400;
          font-size: 14px;
          line-height: 21px;
          color: #777777;
        }
      }
      &-prices{
        display: flex;
        flex-direction: column;
        &-total{
          font-size: 13px;
          margin-top: -5px;
          font-weight: 500;
          color: $COLOR_TEXT_PRIMARY;
        }
      }
    }
  }
}
</style>